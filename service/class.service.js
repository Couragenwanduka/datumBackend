import prisma from "../prisma/dbconnect.js";

export const createClass = async(name) => {
    try{
        const createdClass = await prisma.classTable.create({
            data:{
                name,
            }
        });
        return createdClass;
    }catch(error){
        throw new Error(`Error creating class: ${error.message}`);
    }
}

export const findAllClasses = async() => {
    try{
        const classes = await prisma.classTable.findMany();
        return classes;
    }catch(error){
        throw new Error(`Error fetching all classes: ${error.message}`);
    }
}

export const findClassByName = async(name) =>{
    try{
        const classObj = await prisma.classTable.findUnique({
            where:{
                name,
            }
        });
        return classObj;
    }catch(error){
        throw new Error(`Error fetching class by name: ${error.message}`);
    }
}

export const deleteClass = async(name)=> {
    try{
        await prisma.classTable.delete({
            where:{
                name,
            }
        });
        return { message: "Class deleted successfully" };
    }catch(error){
        throw new Error(`Error deleting class: ${error.message}`);
    }
}