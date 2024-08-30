import fs from 'fs';
import BadRequest from "../error/error.js";
import { hashPassword } from "../utils/bcrypt.js";
import { createPassword } from "../utils/password.js";
import uploadToCloudinary from "../middlewares/multer.js";
import { saveAdminstrator } from "../service/admin.service.js";
import { findTeacherByEmail } from "../service/admin.service.js";
import { getParentByEmail } from "../service/parent.service.js";
import { sendOnboardingTeacherMessage } from "../helper/nodemailer.js";
import { getAllTeachers } from '../service/admin.service.js';

/**
 * This function creates a new admin account.
 * It performs validation, checks for existing records, hashes the password,
 * saves the new admin to the database, and sends an onboarding email.
 */
export const createAdmin = async (req, res, next) => {
  try {
    const { surName, firstName, otherName, gender, bloodGroup, dateOfBirth, nationality, email, phoneNumber, address, stateOfOrigin, localGovernment, 
            employmentRole, employmentDate, qualification, role, gradeLevel ,step } = req.body;

    const file = req.file;
    if(!file) throw new BadRequest( 'No file uploaded' );

    const photo = await uploadToCloudinary(file.path);
    if (!photo) {
      fs.unlinkSync(file.path);
      throw new BadRequest('File upload failed')
    }

    // Check if an admin (or teacher) with the same email already exists in the database
    const existingTeacher = await findTeacherByEmail(email);
    if (existingTeacher) throw new BadRequest("A teacher with this email already exists.");
    
    // Check if an admin with the same email exists in another collection (if applicable)
    const checkForEmail = await getParentByEmail(email);
    if (checkForEmail) throw new BadRequest("A parent with this email already exists.");
    
    // Generate a password for the new admin
    const password = createPassword();
    // Hash the generated password before saving it to the database
    const hashedPassword = await hashPassword(password);
    
    const admin = {
       surName,
       firstName,
       otherName,
       gender,
       bloodGroup,
       dateOfBirth,
       nationality,
       email,
       phoneNumber,
       address,
       stateOfOrigin,
       localGovernment,
       employmentRole,
       employmentDate,
       qualification,
       photo,
       role,
       gradeLevel,
       step, 
       hashedPassword, // hashed password is stored in the database for security reasons
    }
    // Save the new admin's details, including the hashed password, to the database
    await saveAdminstrator(admin);
    fs.unlinkSync(file.path);
    
    // Send an onboarding email to the new admin with their credentials
    const sendMail = sendOnboardingTeacherMessage(email, password,firstName,employmentRole);
    if (!sendMail) return 'Mail did not send';

    res.status(201).json('Adminstrator created successfully');
  } catch (error) {
    console.log(error);
    next(error);
  }
};

/**
 * This function retrieves all teachers from the database.
 */
export const getAllAdmin = async (req, res, next) => {
  try {
    const teachers = await getAllTeachers();
    res.status(200).json(teachers);
  } catch (error) {
    console.log(error);
    next(error);
  }
};