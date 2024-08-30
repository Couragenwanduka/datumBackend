import prisma from "../prisma/dbconnect.js";
import { findClassByName } from "./class.service.js";
import { findTeirByName } from "./teir.service.js";


export const createEnrollments = async(studentId, classId, tierId, academicYear) => {
  try{
    const existingClass = await findClassByName(classId);
    const existingTier = await findTeirByName(tierId, existingClass.id);
    const savedEnrollment = await prisma.ClassEnrollment.create({
      data:{
        studentId,
        classId: existingClass.id,
        tierId: existingTier.id,
        academicYear:new Date().getFullYear(),
      }
    });
    return savedEnrollment;
  }catch(error){
    throw new Error(`Error creating enrollments: ${error.message}`);
  }
} 

export const deleteEnrollment = async(studentId, classId, academicYear) => {
    try{
      await prisma.ClassEnrollment.delete({
        where:{
          studentId,
          classId,
          academicYear,
        }
      });
      return { message: "Enrollment deleted successfully" };
    }catch(error){
      throw new Error(`Error deleting enrollments: ${error.message}`);
    }
  
}

export const getAllEnrollment =async() =>{
    try{
      const enrollments = await prisma.ClassEnrollment.findMany();
      return enrollments;
    }catch(error){
      throw new Error(`Error fetching all enrollments: ${error.message}`);
    }
}

export const getEnrollmentByStudentId = async(studentId) => {
  try{
    const enrollments = await prisma.ClassEnrollment.findMany({
      where:{
        studentId,
      }
    });
    return enrollments;
  }catch(error){
    throw new Error(`Error fetching enrollments by studentId: ${error.message}`);
  }

}