import prisma from "../prisma/dbconnect.js";

export const saveAttendance = async (subjectName, code, erollments, attendance, createdAt, updatedAt) => {
    try {
        const attendance = await prisma.attendance.create({
            data: {
                subjectName,
                code,
                erollments,
                attendance,
                createdAt,
                updatedAt,               
            },
        });
        return attendance.id;
    } catch (error) {
        throw new Error(`Error creating attendance: ${error.message}`);
    }
}