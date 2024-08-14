import { saveAdminstrator } from "../service/admin.service.js";
import { findTeacherByEmail } from "../service/admin.service.js";
import { getParentByEmail } from "../service/parent.service.js";
import { hashPassword } from "../utils/bcrypt.js";
import { createPassword } from "../utils/password.js";
import uploadToCloudinary from "../middlewares/multer.js";
import fs from 'fs'
import { sendOnboardingTeacherMessage } from "../helper/nodemailer.js";
import BadRequest from "../error/error.js";

/**
 * This function creates a new admin account.
 * It performs validation, checks for existing records, hashes the password,
 * saves the new admin to the database, and sends an onboarding email.
 */
export const createAdmin = async (req, res, next) => {
  try {
    const { firstName, lastName, gender, dateOfBirth, email, contactNumber, currentAddress, permanentAddress, subject, hireDate, qualification, role} = req.body;
   
    const file = req.file;
    if(!file) return res.status(404).json({ status: 'No file uploaded' });
   
    const photo = await uploadToCloudinary(file.path);
    if(!photo) {
      fs.unlinkSync(file.path);
      throw new BadRequest('Photo upload failed: Received undefined URL')
    }
   
    // Check if an admin (or teacher) with the same email already exists in the database
    const existingTeacher = await findTeacherByEmail(email);
    if (existingTeacher) throw new BadRequest("A teacher with this email already exists.");
    
    // Check if an admin with the same email exists in another collection
    const checkForEmail = await getParentByEmail(email);
    if (checkForEmail) throw new BadRequest("A parent with this email already exists.");
    
    // Generate a password for the new admin
    const password = createPassword();
    // Hash the generated password before saving it to the database
    const hashedPassword = await hashPassword(password);

    const admin = {
      firstName,
      lastName,
      gender,
      dateOfBirth,
      email,
      contactNumber,
      hashedPassword,
      currentAddress,
      permanentAddress,
      subject,
      hireDate,
      qualification,
      role, 
      photo
    }
    
    // Save the new admin's details, including the hashed password, to the database
    await saveAdminstrator(admin);
    fs.unlinkSync(file.path);
    
    // Send an onboarding email to the new admin with their credentials
    const sendMail = sendOnboardingTeacherMessage(email, password,firstName,subject);
    if (!sendMail) return 'Mail did not send';

    res.status(201).json('Adminstrator created successfully');
  } catch (error) {
    next(error);
  }
};
