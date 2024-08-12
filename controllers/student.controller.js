import { saveStudent,findAllStudents, findStudentById,  } from "../service/student.service.js";
import { addStudent } from "../service/parent.service.js";
import { createPassword } from "../utils/password.js";
import { sendOnboardingMessage } from "../helper/nodemailer.js";
import { hashPassword } from "../utils/bcrypt.js";
import { saveParent } from "../service/parent.service.js";
import { validateParentGuardian } from "../utils/validator.js";
import { findByEmail } from "../service/parent.service.js";
import { findTeacherByEmail } from "../service/admin.service.js";


/**
 * This function handles the creation of a new parent guardian and their associated student(s).
 * It performs the following key steps:
 * 
 * 1. **Extract Data from Request**:
 *    - Extracts the `parent` and `students` data from the request body.
 * 
 * 2. **Parent Guardian Validation and Creation**:
 *    - Destructures the necessary fields from the `parent` object.
 *    - Validates the parent guardian data using the `validateParentGuardian` function. If validation fails, it returns a 400 error response with the validation message.
 *    - Checks if a parent guardian with the same email already exists using the `findByEmail` function. If a match is found, it returns a 400 error response.
 *    - Checks if a teacher with the same email already exists using the `findTeacherByEmail` function. If a match is found, it returns a 400 error response.
 *    - Generates a password and hashes it using the `hashPassword` function.
 *    - Saves the parent guardian details in the database using the `saveParent` function.
 * 
 * 3. **Send Onboarding Email**:
 *    - Sends an onboarding email with the generated password to the parent guardian using the `sendOnboardingMessage` function. If the email fails to send, it logs an error message.
 * 
 * 4. **Student Creation and Association**:
 *    - Iterates over the `students` array (which may contain multiple student objects) and performs the following for each student:
 *      a. Destructures the necessary fields from each student object.
 *      b. Saves the student details in the database using the `saveStudent` function, which returns the `studentId`.
 *      c. Associates the student with the parent guardian by calling the `addStudent` function with the parent's email and the student's `studentId`.
 *    - If any error occurs during student processing, it logs the error and exits.
 * 
 * 5. **Response Handling**:
 *    - If all operations are successful, it returns a 201 status code with a success message.
 *    - If any error occurs during the parent or student creation process, it logs the error and returns a 500 status code with an error message.
 * 
 * @param {Object} req - The request object containing the parent and student data in the body.
 * @param {Object} res - The response object used to send back the appropriate HTTP response.
 */

export const createStudent = async(req, res) => {
    try{
         const { parent, students } = req.body;

          // Create the parent guardian
         const {firstName, lastName, relationship, contactNumber, email} = parent;
         const { error } = validateParentGuardian(firstName, lastName, relationship, contactNumber, email);
         if (error) return res.status(400).send(error.details[0].message);
 
          // Check if a parent guardian with the same email already exists
         const existingParentGuardian = await findByEmail(email);
         if (existingParentGuardian) return res.status(400).send("A parent guardian with the same email already exists.");

         const checkForEmail = await findTeacherByEmail(email)
         if (checkForEmail) return res.status(400).send("A teacher with the same email already exists.");

         const password = createPassword()
         const hashedPassword = await hashPassword(password);
 
          // Save the parent guardian
         await saveParent(firstName, lastName, relationship, contactNumber, email, hashedPassword,new Date('2005-03-14'));

          // send onborading mail
         const sendMail = sendOnboardingMessage(email, password)
         if(!sendMail) return 'mail did not send';

         const studentsArray = [students]
         // Add the student(s) to the parent guardian
        
         for (const studentGroup of studentsArray) {
            for (const student of Object.values(studentGroup)) {
                try {
                    const { firstName, lastName, dateOfBirth, gender, nationality, currentAddress, permanentAddress, 
                        enrollmentDate, gradeLevel, classSection, photo } = student;
                    // Call saveStudent and log the studentId
                    const studentId = await saveStudent(firstName, lastName, dateOfBirth, gender, nationality, currentAddress, permanentAddress, 
                    enrollmentDate, gradeLevel, classSection, photo, email);
                   
                    // Call addStudent to associate the student
                    await addStudent(email, studentId);
                } catch (error) {
                    console.error('Error processing student:', error);
                    return
                }
            }
        }
        
         res.status(201).json('Parent and student created successfully');
    }catch(error){
        console.log(error)
        res.status(500).json(`Error creating parent and student: ${error.message}`);
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
        const studentId = req.params;
        if(!studentId) return res.status(400).json('Invalid student id');

        const student = await findStudentById(studentId);
        if(!student) return res.status(404).json('Student not found');
        res.status(200).json(student);
    }catch(error){
        console.log(error)
        res.status(500).json(`Error getting student by id: ${error.message}`);
    }
}

