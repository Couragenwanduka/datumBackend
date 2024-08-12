import prisma from "../prisma/dbconnect.js";

export const saveStudent = async (firstName, lastName, dateOfBirth, gender, nationality, currentAddress, permanentAddress, enrollmentDate, gradeLevel, classSection, photo, parentEmail) => {
    try {
        const student = await prisma.student.create({
            data: {
                firstName,
                lastName,
                dateOfBirth: new Date(dateOfBirth),
                gender,
                nationality,
                currentAddress,
                permanentAddress,
                enrollmentDate: new Date(enrollmentDate),
                gradeLevel,
                classSection,
                photo, 
                parent: {
                    connect: {
                        email: parentEmail,
                    },
                },
            },
        });
        return student.id;
    } catch (error) {
        throw new Error(`Error creating student: ${error.message}`);
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

