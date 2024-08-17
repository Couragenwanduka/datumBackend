import prisma from "../prisma/dbconnect.js";

export const recordAttendance = async (studentId, status) => {
    try {
        const attendance = await prisma.attendance.create({
            data: {
                date: new Date.now(),
                dayOfWeek: new Date().toLocaleString('en-US', { weekday: 'long' }),
                time: new Date().toLocaleString(' en-US', { hour: '2-digit', minute: '2-digit' }),
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

export const findAllAttendanceByDate = async (date) => {
    try {
        const attendanceRecords = await prisma.attendance.findMany({
            where:{
                date,
            },
            include: {
                student: true,
            },
        });
        return attendanceRecords;
    } catch (error) {
        console.error(`Error fetching attendance records: ${error.message}`);
        throw error;
    }
};

export const getAllAttendance = async () => {
    try {
        const attendanceRecords = await prisma.attendance.findMany({
            include: {
                student: true,
            },
        });
        return attendanceRecords;
    } catch (error) {
        console.error(`Error fetching all attendance records: ${error.message}`);
        throw error;
    }
}

export const updateAttendance = async (id, status) => {
    try {
        const updatedAttendance = await prisma.attendance.update({
            where: { id },
            data: {
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