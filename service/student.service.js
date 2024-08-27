import prisma from "../prisma/dbconnect.js";
import { parse } from 'json2csv';
import { generateId } from "../utils/id.js";
import { addClassTier } from "../helper/classTier.js";

export const saveStudent = async (studentsArray, email) => {
  try {
    
    // Iterate through the studentsArray and process each student individually
    const studentsData = await Promise.all(studentsArray.map(async (student) => {
      try {
        // Call addClassTier for each student inside the map
        const tier = await addClassTier(student.class);

        return {
          id: generateId(),
          surName: student.surName,
          firstName: student.firstName,
          otherName: student.otherName,
          dateOfBirth: new Date(student.dateOfBirth),
          bloodGroup: student.bloodGroup,
          gender: student.gender,
          nationality: student.nationality,
          stateOfOrigin: student.stateOfOrigin,
          localGovernment: student.localGovernment,
          address: student.address,
          enrollmentDate: new Date(),
          class: student.class,
          classTier: tier,
          term: student.term,
          picture: student.picture,
          previousSchool: student.previousSchool,
          parentEmail: email,
        };
      } catch (error) {
        console.error(`Error processing student ${student.firstName} ${student.surName}:`, error);
        throw error; // Ensure errors in the map are propagated
      }
    }));

    // Use Prisma transaction to handle batch operations
    const createdStudents = await prisma.$transaction([
      prisma.student.createMany({
        data: studentsData,
        skipDuplicates: true, // Skip duplicates if necessary
      })
    ]);

    // Since createMany doesn't return IDs, you'd need to query for them if needed
    const insertedStudentIds = await prisma.student.findMany({
      where: { parentEmail: email },
      select: { id: true }
    });

    return insertedStudentIds.map(student => student.id);

  } catch (error) {
    console.error('Error processing students:', error);
    throw error; // Rethrow error to be caught by the calling function
  }
};


export const findStudentsByParentEmail = async(email) => {
    try{
       const studentId = await prisma.student.findMany({
        where: {
            parentEmail: email,
        },
        select: { id: true }
       })
       return studentId;
    }catch(error){
        console.error('Error fetching students by parent email:', error);
    }
}


export const findStudentById = async(studentId) => {
    try {
        const student = await prisma.student.findUnique({
            where: {
                id: studentId,
            },
            include:{
               parent: true,
               remarks: {
                   orderBy: {
                       createdAt: 'desc',
                   },
               },
               attendance: true,
            }
        });
        return student;
    } catch (error) {
        throw new Error(`Error finding student: ${error.message}`);
    }
}

export const findAllStudents = async() => {
    try{
        const students = await prisma.student.findMany();
        return students;
    }catch(error){
        throw new Error(`Error fetching all students: ${error.message}`);
    }
}

export const updateAllstudent = async(studentId,gradeLevel, term) => {
    try{
        const students = await prisma.student.updateMany({
            where: {
                id: studentId,
            },
            data: {
                gradeLevel,
                term,
            },
        });
        return students.count;
    }catch(error){
        throw new Error(`Error updating students: ${error.message}`);
    }
}
export const deleteAllStudent = async() => {
    try {
      const result = await prisma.student.deleteMany();
      return result;
    } catch (error) {
      throw new Error(`Error deleting all parents: ${error.message}`);
    }
  }

export const findAllStudentCvsData = async() => {
  try {
    const students = await prisma.student.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
      },
    });
    const cvs = parse(students)
    return cvs;
  } catch (error) {
    throw new Error(`Error fetching student CVs data: ${error.message}`);
  }
}

