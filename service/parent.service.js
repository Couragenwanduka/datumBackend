import { insertParent, findParentByEmail, addStudentToParent } from "../model/parentGuardian";

export const saveParent = async(firstName, lastName, relationship, contactNumber, email, password) => {
    try{
        const parentData = [
            firstName,
            lastName,
            relationship,
            contactNumber,
            email,
            password,
            []
        ];
    
       const parentGuardian = await insertParent(parentData);
       return parentGuardian;
    }catch(error){
        throw new Error(`Error saving parent guardian: ${error.message}`);
    }
}

export const addStudent = async(email, studentId) => {
    try{
        const parentGuardian = await addStudentToParent(email,studentId);
        return parentGuardian;
    }catch(error){
        throw new Error(`Error adding student to parent guardian: ${error.message}`);
    }
}

export const findByEmail = async(email) => {
    try{
       const parentGuardian = await findParentByEmail(email);
       return parentGuardian;
    }catch(error){
        throw new Error(`Error finding parent guardian: ${error.message}`);
    }
}

