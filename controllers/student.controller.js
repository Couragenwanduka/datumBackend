import { saveStudent,findAllStudents, findStudentById,  } from "../service/student.service.js";
import { assignStudentsToParent } from "../service/parent.service.js";
import { createPassword } from "../utils/password.js";
import { sendOnboardingMessage } from "../helper/nodemailer.js";
import { hashPassword } from "../utils/bcrypt.js";
import { createParent } from "../service/parent.service.js";
import { getParentByEmail } from "../service/parent.service.js";
import { findTeacherByEmail } from "../service/admin.service.js";
import { findStudentsByParentEmail } from "../service/student.service.js";
import BadRequest from "../error/error.js";


export const createStudent = async(req, res, next) => {
    try{
         const { parent, students } = req.body;

         const { email } = parent;

          // Check if a parent guardian with the same email already exists
         const existingParentGuardian = await getParentByEmail(email);
         if (existingParentGuardian)  throw new BadRequest("A parent guardian with the same email already exists.");

         const checkForEmail = await findTeacherByEmail(email)
         if (checkForEmail) throw new BadRequest("A teacher with the same email already exists.");

         const password = createPassword()
         const hashedPassword = await hashPassword(password);
 
          // Save the parent guardian
         await createParent(parent,hashedPassword);

          // send onborading mail
         const sendMail = sendOnboardingMessage(email, password)
         if(!sendMail) console.log('mail did not send');

         await saveStudent(students, email);

         const studentId = findStudentsByParentEmail(email)
         // Add the student to the parent guardian
         await assignStudentsToParent(studentId, email);
         res.status(201).json('Parent and student created successfully');
    }catch(error){
         next(error);
    }
}

export const getAllStudents = async(req, res) => {
    try{
        const students = await findAllStudents();
        res.status(200).json(students);
    }catch(error){
        console.log(error)
        res.status(500).json(`Error getting all students: ${error.message}`);
    }
}

export const getStudentById = async(req, res) => {
    try{
        const studentId = req.params.id;
        if(!studentId) return res.status(400).json('Invalid student id');

        let id = parseInt(studentId, 10)
        const student = await findStudentById(id);
        if(!student) return res.status(404).json('Student not found');
        res.status(200).json(student);
    }catch(error){
        console.log(error)
        res.status(500).json(`Error getting student by id: ${error.message}`);
    }
}

