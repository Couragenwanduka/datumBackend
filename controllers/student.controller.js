import { saveStudent,findAllStudents, findStudentById } from "../service/student.service.js";
import { createPassword } from "../utils/password.js";
import { sendOnboardingMessage } from "../helper/nodemailer.js";
import { hashPassword } from "../utils/bcrypt.js";
import { createParent } from "../service/parent.service.js";
import { getParentByEmail } from "../service/parent.service.js";
import { findTeacherByEmail } from "../service/admin.service.js";
import BadRequest from "../error/error.js";
import { Readable } from 'stream';
import { findAllStudentCvsData } from "../service/student.service.js";

export const createStudent = async(req, res, next) => {
    try{
         const { parent, students } = req.body;

         const { email } = parent;

          // Check if a parent guardian with the same email already exists
         const existingParentGuardian = await getParentByEmail(email);
         if (existingParentGuardian)  throw new BadRequest("A parent guardian with the same email already exists.");

         const checkForEmail = await findTeacherByEmail(email)
         if (checkForEmail) throw new BadRequest("A teacher with the same email already exists.");

         // Create a password for the parent guardian
         const password = createPassword()
         const hashedPassword = await hashPassword(password);
 
          // Save the parent guardian
         const savedParent = await createParent(parent,hashedPassword);
         if(!savedParent) throw new BadRequest('Parent guardian not created');

         // send onborading mail
         const sendMail = sendOnboardingMessage(email, password)
         if(!sendMail) console.log('mail did not send');

         const savedStudent = await saveStudent(students, email);
         if(!savedStudent) throw new BadRequest('No students created');

         
         res.status(201).json('Parent and student created successfully');
    }catch(error){
         next(error);
    }
}

export const getAllStudents = async(req, res, next) => {
    try{
        const students = await findAllStudents();
        res.status(200).json(students);
    }catch(error){
        console.log(error)
        next(error);
    }
}

export const getStudentById = async(req, res, next) => {
    try{
        const studentId = req.params.id;
        
        let id = parseInt(studentId, 10)
        const student = await findStudentById(id);
        if(!student) throw new BadRequest('Student not found');

        res.status(200).json(student);
    }catch(error){
        console.log(error)
       next(error);
    }
}

export const getAllStudentCvsData = async(req, res, next) => {
   try{
       const students = await findAllStudentCvsData();
       const stream = Readable.from(students);
       res.setHeader('Content-disposition', 'attachment; filename=students.csv');
       res.setHeader('Content-type', 'text/csv');
       stream.pipe(res);
   }catch(error){
    console.log(error)
    next(error);
   }
}

