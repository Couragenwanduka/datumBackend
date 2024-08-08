import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const saveStudent = async(firstName, lastName, dateOfBirth, gender, nationality, currentAddress, permanentAddress, enrollmentDate, gradeLevel, classSection, photo) => {
    try {
        const student = await prisma.student.create({
            data: {
                firstName,
                lastName,
                dateOfBirth,
                gender,
                nationality,
                currentAddress,
                permanentAddress,
                enrollmentDate,
                gradeLevel,
                classSection,
                photo,
            },
        });
        return student.id;
    } catch (error) {
        console.error(`Error creating student: ${error.message}`);
        throw error;
    }
}