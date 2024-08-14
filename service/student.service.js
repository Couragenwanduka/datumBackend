import prisma from "../prisma/dbconnect.js";

export const saveStudent = async (studentsArray, email) => {
  try {

    const studentsData = studentsArray.map(student => ({
      firstName: student.firstName,
      lastName: student.lastName,
      dateOfBirth: new Date(student.dateOfBirth), // Ensure date is in the correct format
      gender: student.gender,
      nationality: student.nationality,
      currentAddress: student.currentAddress,
      permanentAddress: student.permanentAddress,
      enrollmentDate: new Date(student.enrollmentDate), // Ensure date is in the correct format
      gradeLevel: student.gradeLevel,
      classSection: student.classSection,
      photo: student.photo,
      parentEmail: email,
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
export const deleteAllStudent = () => {
    try {
      const result = prisma.student.deleteMany();
      return result;
    } catch (error) {
      throw new Error(`Error deleting all parents: ${error.message}`);
    }
  }

