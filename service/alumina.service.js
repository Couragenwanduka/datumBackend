import prisma from "../prisma/dbconnect.js";

export const createAlumina = async(studentId, graduationYear) => {
    try{
        const savedAlumna = await prisma.alumni.create({
            data:{
                studentId,
                graduationYear,
            }
        });
        return savedAlumna;
    }catch(error){
        throw new Error(`Error creating alumni: ${error.message}`);
    }
}

export const getAlumina = async() => {
    try{
        const alumni = await prisma.alumni.findMany();
        return alumni;
    }catch(error){
        throw new Error(`Error fetching all alumni: ${error.message}`);
    }
}