import prisma from "../prisma/dbconnect.js";

export const saveRemark = async(studentId, remark, Class, term, subject) => {
   try{
    const remarks = await prisma.remarks.create({
        data:{
         studentId,
         remark,
         class: Class,
         term,
         subject,
        }
    })
    return remarks;

   }catch(error){
     throw new Error(`Error saving remark: ${error.message}`);
   }
}

export const findAllRemarks = async() => {
    try{
        const remarks = await prisma.remarks.findMany({
            include: {
                student: true,
            }
        });
        return remarks;
    }catch(error){
        throw new Error(`Error fetching all remarks: ${error.message}`);
    }
}

export const findRemarkByStudentId = async(studentId) => {
    try{
        const remark = await prisma.remarks.findMany({
            where: {
                studentId: parseInt(studentId),
            },
            include: {
                student: true, // Include the student data
            },
        });
        return remark;
    }catch(error){
        throw new Error(`Error fetching remark by studentId: ${error.message}`);
    }
}

export const updateRemark = async(remarkId, remark, classLevel, term, subject) => {
    try{
        const updatedRemark = await prisma.remarks.update({
            where:{
                id: parseInt(remarkId),
            },
            data:{
                remark,
                class: classLevel,
                term,
                subject,
            }
        });
        return updatedRemark;
    }catch(error){
        throw new Error(`Error updating remark: ${error.message}`);
    }
}

export const deleteRemark = async(remarkId) => {
    try{
        await prisma.remarks.delete({
            where:{
                id: parseInt(remarkId),
            }
        });
        return { message: "Remark deleted successfully" };
    }catch(error){
        throw new Error(`Error deleting remark: ${error.message}`);
    }
}

export const findRemarById = async(remarkId) => {
    try{
        const remark = await prisma.remarks.findUnique({
            where:{
                id: parseInt(remarkId),
            }
        });
        return remark;
    }catch(error){
        throw new Error(`Error fetching remark by id: ${error.message}`);
    }
}