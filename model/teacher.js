import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const saveTeacher = async(firstName, lastName, dateOfBirth, gender, nationality, currentAddress, permanentAddress, enrollmentDate, subject, photo) => {
    try {
        const student = await prisma.teacher.create({
            data: {
                firstName,
                lastName,
                dateOfBirth,
                gender,
                nationality,
                currentAddress,
                permanentAddress,
                enrollmentDate,
               subject,
                photo,
            },
        });
        return teacher.id;
    } catch (error) {
        console.error(`Error creating teacher: ${error.message}`);
        throw error;
    }
}