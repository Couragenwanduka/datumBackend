import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const saveSubject = async(subjectName, code, code, enrollments, attendance, createdAt, updatedAt) => {
    try {
        const subject = await prisma.subject.create({
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
        return subject.id;
    } catch (error) {
        console.error(`Error creating subject: ${error.message}`);
        throw error;
    }
}