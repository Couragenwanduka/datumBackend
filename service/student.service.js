import prisma from "../prisma/dbconnect.js";

export const  saveStudent = async(studentsArray, email) => {
    const transaction = await prisma.$transaction();
    try {
        // Prepare the data for batch insert
        const studentsData = studentsArray.flatMap(studentGroup =>
            Object.values(studentGroup).map(student => ({
                firstName: student.firstName,
                lastName: student.lastName,
                dateOfBirth: student.dateOfBirth,
                gender: student.gender,
                nationality: student.nationality,
                currentAddress: student.currentAddress,
                permanentAddress: student.permanentAddress,
                enrollmentDate: student.enrollmentDate,
                gradeLevel: student.gradeLevel,
                classSection: student.classSection,
                photo: student.photo,
                parentEmail: email, 
            }))
        );

        // Batch create students
        const createdStudents = await prisma.student.createMany({
            data: studentsData,
            skipDuplicates: true, // Optionally skip duplicates if necessary
            transaction
        });

        // Commit the transaction
        await transaction.commit();

        return createdStudents.id;

    } catch (error) {
        console.error('Error processing students:', error);

        // Rollback the transaction in case of an error
        await transaction.rollback();
    }
}

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

