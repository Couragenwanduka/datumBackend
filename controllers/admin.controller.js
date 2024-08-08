import { saveAdminstrator } from "../service/admin.service.js";
import { findTeacherByEmail } from "../service/admin.service.js";
import { findByEmail } from "../service/parent.service.js";
import { validateTeacher } from "../utils/validator.js";
import { hashPassword } from "../utils/bcrypt.js";
import { createPassword } from "../utils/password.js";
import { sendOnboardingMessage } from "../helper/nodemailer.js";

// Create a new admin account
export const createAdmin = async (req, res) => {
  try{
    const { firstName, lastName, gender, dateOfBirth, email, contactNumber, currentAddress, permanentAddress, subject, hireDate, qualification, photo, role } = req.body;

    console.log( {firstName, lastName, gender, dateOfBirth, email, contactNumber, currentAddress, permanentAddress, subject, hireDate, qualification, photo, role} )

    // Validate the teacher data
    const { error } = validateTeacher(firstName, lastName, gender, dateOfBirth, email, contactNumber, currentAddress, permanentAddress, subject, hireDate, qualification, photo, role);
    if (error) return res.status(400).json(error.details[0].message);

    // Check if a teacher with the same email already exists
    const existingTeacher = await findTeacherByEmail(email);
    if (existingTeacher) return res.status(400).json("email already exists.");

    const checkForEmail = await findByEmail(email)
    if (checkForEmail) return res.status(400).json("email already exists.");

    const password = createPassword()

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Save the teacher
    await saveAdminstrator(firstName, lastName, gender, dateOfBirth, email, hashedPassword, contactNumber, currentAddress, permanentAddress, subject, hireDate, qualification, photo, role);

    // Send onboarding email
    const sendMail = sendOnboardingMessage(email, password)
    if(!sendMail) return 'mail did not send';

    res.status(201).json('Admin created successfully');
  }catch(error){
    console.log(error)
    res.status(500).json(`Error creating admin: ${error.message}`);
  }
}

