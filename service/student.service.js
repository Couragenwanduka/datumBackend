import { insertStudent } from "../model/student";

export const saveStudent = async (firstName, lastName, dateOfBirth, gender, nationality, currentAddress, permanentAddress, enrollmentDate, gradeLevel, classSection, photo) => {
    try{
        const studentData = [
            firstName,
            lastName,
            dateOfBirth,
            gender,
            nationality,
            currentAddress,
            permanentAddress,
            enrollmentDate,
            gradeLevel,
            classSection,
            photo,
        ];
    
       const student = await insertStudent(studentData);
       return student;
    }catch(error){
        throw new Error(`Error saving student: ${error.message}`);
    }
}