import prisma from "../prisma/dbconnect.js";

export const saveSubject = async(name, classLevel) => {
    try{
        const savedSubject = await prisma.subject.create({
            data:{
                name,
                classLevel,
            }
        });
        return savedSubject;
    }catch(error){
        throw new Error(`Error saving subject: ${error.message}`);
    }
}

export const findAllSubjects = async() => {
    try{
        const subjects = await prisma.subject.findMany();
        return subjects;
    }catch(error){
        throw new Error(`Error fetching all subjects: ${error.message}`);
    }
}

export const findSubjectById = async(subjectId) => {
    try{
        const subject = await prisma.subject.findUnique({
            where:{
                id: parseInt(subjectId,10),
            }
        });
        return subject;
    }catch(error){
        throw new Error(`Error fetching subject by id: ${error.message}`);
    }
}

export const updateSubject = async(subjectId, name, classLevel) => {
    try{
        const updatedSubject = await prisma.subject.update({
            where:{
                id: parseInt(subjectId,10),
            },
            data:{
                name,
                classLevel,
            }
        });
        return updatedSubject;
    }catch(error){
        throw new Error(`Error updating subject: ${error.message}`);
    }
}

export const deleteSubject = async(subjectId) => {
    try{
        await prisma.subject.delete({
            where:{
                id:parseInt(subjectId,10),
            }
        });
        return { message: "Subject deleted successfully" };
    }catch(error){
        throw new Error(`Error deleting subject: ${error.message}`);
    }
}