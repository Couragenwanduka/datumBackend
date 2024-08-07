import { saveStudent } from "../service/student.service.js";
import { addStudent } from "../service/parent.service.js";
import { createParent } from "./parent.controller.js";
import { createPassword } from "../utils/password.js";
import { sendOnboardingMessage } from "../helper/nodemailer.js";
import { hashPassword } from "../utils/bcrypt.js";

export const createStudent = async(req, res) => {
    try{
        const { parent, students } = req.body;

        // Create the parent guardian
        const {firstName, lastName, relationship, contactNumber, email} = parent;
        const password = createPassword()
        const hashedPassword = await hashPassword(password);
        await createParent(firstName, lastName, relationship, contactNumber, email, hashedPassword);

        // send onborading mail
        const sendMail = sendOnboardingMessage(email, password)
        if(!sendMail) return 'mail did not send'

        // Add the student(s) to the parent guardian
         for(const student of students){
            const { firstName, lastName, dateOfBirth, gender, nationality, currentAddress, permanentAddress, enrollmentDate, gradeLevel, classSection, photo } = student;
            const studentId = await saveStudent(firstName, lastName, dateOfBirth, gender, nationality, currentAddress, permanentAddress, enrollmentDate, gradeLevel, classSection, photo);
            await addStudent(email, studentId);
         }
    }catch(error){
        res.status(500).send(`Error creating parent guardian: ${error.message}`);
    }
}