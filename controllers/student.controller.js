import { saveStudent } from "../service/student.service.js";
import { addStudent } from "../service/parent.service.js";
import { createPassword } from "../utils/password.js";
import { sendOnboardingMessage } from "../helper/nodemailer.js";
import { hashPassword } from "../utils/bcrypt.js";
import { saveParent } from "../service/parent.service.js";
import { validateParentGuardian } from "../utils/validator.js";
import { findByEmail } from "../service/parent.service.js";

export const createStudent = async(req, res) => {
    try{
        const { parent, students } = req.body;

        // Create the parent guardian
         const {firstName, lastName, relationship, contactNumber, email} = parent;
         const { error } = validateParentGuardian(firstName, lastName, relationship, contactNumber, email);
         if (error) return res.status(400).send(error.details[0].message);
 
         // Check if a parent guardian with the same email already exists
        //  const existingParentGuardian = await findByEmail(email);
        //  if (existingParentGuardian) return res.status(400).send("A parent guardian with the same email already exists.");

         const password = createPassword()
         const hashedPassword = await hashPassword(password);
 
         // Save the parent guardian
        //  const parentGuardian = await saveParent(firstName, lastName, relationship, contactNumber, email, hashedPassword,new Date('2005-03-14'));

         // send onborading mail
        //  const sendMail = sendOnboardingMessage(email, password)
        //  if(!sendMail) return 'mail did not send';

         const studentsArray = [students]
         // Add the student(s) to the parent guardian
        
        
         for (const studentGroup of studentsArray) {
            for (const student of Object.values(studentGroup)) {
              const { firstName, lastName, dateOfBirth, gender, nationality, currentAddress, permanentAddress, enrollmentDate, gradeLevel, classSection, photo } = student;
              console.log(firstName, lastName, dateOfBirth, gender, nationality, currentAddress, permanentAddress, enrollmentDate, gradeLevel, classSection, photo);
      
              const studentId = await saveStudent(firstName, lastName, dateOfBirth, gender, nationality, currentAddress, permanentAddress, enrollmentDate, gradeLevel, classSection, photo,email);
              await addStudent(email, studentId);
            }
        }
    }catch(error){
        console.log(error)
        res.status(500).send(`Error creating parent and student: ${error.message}`);
    }
}