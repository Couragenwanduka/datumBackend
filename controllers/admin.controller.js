import { saveAdminstrator } from "../service/admin.service.js";
import { findTeacherByEmail } from "../service/admin.service.js";
import { findByEmail } from "../service/parent.service.js";
import { validateTeacher } from "../utils/validator.js";
import { hashPassword } from "../utils/bcrypt.js";
import { createPassword } from "../utils/password.js";
import uploadToCloudinary from "../middlewares/multer.js";
import fs from 'fs'
import { sendOnboardingTeacherMessage } from "../helper/nodemailer.js";

/**
 * This function creates a new admin account.
 * It performs validation, checks for existing records, hashes the password,
 * saves the new admin to the database, and sends an onboarding email.
 */
export const createAdmin = async (req, res) => {
  try {
    const { firstName, lastName, gender, dateOfBirth, email, contactNumber, currentAddress, permanentAddress, subject, hireDate, qualification, role } = req.body;

    const file = req.file;
    if(!file) return res.status(404).json({ status: 'No file uploaded' });

    const photo = await uploadToCloudinary(file.path);

    // This ensures that all required fields meet the specified criteria
    const { error } = validateTeacher(firstName, lastName, gender, dateOfBirth, email, contactNumber, currentAddress, permanentAddress, subject, hireDate, qualification, photo, role);
    if (error) return res.status(400).json(error.details[0].message);

    // Check if an admin (or teacher) with the same email already exists in the database
    const existingTeacher = await findTeacherByEmail(email);
    if (existingTeacher) return res.status(400).json("A teacher with this email already exists.");
    
    // Check if an admin with the same email exists in another collection (if applicable)
    const checkForEmail = await findByEmail(email);
    if (checkForEmail) return res.status(400).json("A parent with this email already exists.");
    
    // Generate a password for the new admin
    const password = createPassword();
    // Hash the generated password before saving it to the database
    const hashedPassword = await hashPassword(password);

    // Save the new admin's details, including the hashed password, to the database
    await saveAdminstrator(firstName, lastName, gender, dateOfBirth, email, hashedPassword, contactNumber, currentAddress, permanentAddress, subject, hireDate, qualification, photo, role);
    fs.unlinkSync(file.path);
    
    // Send an onboarding email to the new admin with their credentials
    const sendMail = sendOnboardingTeacherMessage(email, password,firstName,subject);
    if (!sendMail) return 'Mail did not send';

    res.status(201).json('Adminstrator created successfully');
  } catch (error) {
    console.log(error);
    res.status(500).json(`Error creating admin: ${error.message}`);
  }
};
