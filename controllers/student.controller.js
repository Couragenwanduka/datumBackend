import { saveStudent } from "../service/student.service";
import { addStudent } from "../service/parent.service";
import { createParent } from "./parent.controller";


export const createStudent = async(req, res) => {
    try{
        const { parent, students } = req.body;

        // Create the parent guardian
        const {firstName, lastName, relationship, contactNumber, email, password} = parent;
        await createParent(firstName, lastName, relationship, contactNumber, email, password);

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