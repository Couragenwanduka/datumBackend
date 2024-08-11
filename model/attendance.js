import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const saveAttendance = async(subjectName, code, enrollments, attendance, createdAt, updatedAt) => {
    try {
        const atendance = await prisma.attendance.create({
            data: {
                id,
                subjectName,
                code,
                enrollments,
                attendance,
                createdAt,
                updatedAt, 
            },
        });
        return atendance.id;
    } catch (error) {
        console.error(`Error creating attendance: ${error.message}`);
        throw error;
    }
}