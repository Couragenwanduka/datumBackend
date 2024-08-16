import prisma from "../prisma/dbconnect.js";

export const recordAttendance = async (studentId, status) => {
    try {
        const attendance = await prisma.attendance.create({
            data: {
                date: new Date.now(),
                status,
                studentId,
            },
        });
        return attendance;
    } catch (error) {
        console.error(`Error recording attendance: ${error.message}`);
        throw error;
    }
};

export const getAllAttendance = async () => {
    try {
        const attendanceRecords = await prisma.attendance.findMany({
            include: {
                student: true,
                subject: true,
            },
        });
        return attendanceRecords;
    } catch (error) {
        console.error(`Error fetching attendance records: ${error.message}`);
        throw error;
    }
};

export const getAttendanceById = async (id) => {
    try {
        const attendance = await prisma.attendance.findUnique({
            where: { id },
            include: {
                student: true,
                subject: true,
            },
        });
        return attendance;
    } catch (error) {
        console.error(`Error fetching attendance by ID: ${error.message}`);
        throw error;
    }
};

export const updateAttendance = async (id, date, status) => {
    try {
        const updatedAttendance = await prisma.attendance.update({
            where: { id },
            data: {
                date,
                status,
            },
        });
        return updatedAttendance;
    } catch (error) {
        console.error(`Error updating attendance: ${error.message}`);
        throw error;
    }
};

export const deleteAttendance = async (id) => {
    try {
        await prisma.attendance.delete({
            where: { id },
        });
        return { message: "Attendance record deleted successfully" };
    } catch (error) {
        console.error(`Error deleting attendance: ${error.message}`);
        throw error;
    }
};