import prisma from "../prisma/dbconnect.js";

export const recordAttendance = async (attendanceArray) => {
    try {
       const attendance = await Promise.all(attendanceArray.map(async (attendance) =>{
            return {
                date: new Date(),
                dayOfWeek: new Date().toLocaleString('en-US', { weekday: 'long' }),
                time: new Date().toLocaleString('en-US', { hour: '2-digit', minute: '2-digit' }),
                teacherId : parseInt(attendance.teacherId),
                class: attendance.class,
                classTier: attendance.classTier,
                status: attendance.status,
                studentId: parseInt(attendance.studentId,10),
            };
            
        }))
        const  saveAttendance = await prisma.$transaction([
            prisma.attendance.createMany({
                data: attendance,
                skipDuplicates: true,
            })
        ])
        return saveAttendance;
    } catch (error) {
        console.error(`Error recording attendance: ${error.message}`);
        throw error;
    }
};

export const existingAttendance = async (attendanceArray) => {
    try {
        const today = new Date().toISOString().slice(0, 10); // Get today's date in YYYY-MM-DD format

        // Extract student IDs from attendanceArray and ensure they are integers
        const studentIds = attendanceArray
            .map(attendance => parseInt(attendance.studentId, 10))
            .filter(id => !isNaN(id)); // Remove any non-numeric IDs

        if (studentIds.length === 0) {
            return false; // No valid student IDs, so no duplicates can exist
        }

        // Check for existing attendance records for these students today
        const existingRecords = await prisma.attendance.findMany({
            where: {
                studentId: {
                    in: studentIds // Use `in` to check multiple IDs
                },
                date: {
                    gte: new Date(today + "T00:00:00Z"), // Start of today
                    lt: new Date(today + "T23:59:59Z")   // End of today
                }
            },
            select: {
                studentId: true
            }
        });

        // Create a Set of existing student IDs for quick lookup
        const existingStudentIds = new Set(existingRecords.map(record => record.studentId));

        // Check if any attendance already exists for students in attendanceArray
        const hasDuplicates = attendanceArray
            .map(attendance => parseInt(attendance.studentId, 10))
            .some(studentId => existingStudentIds.has(studentId));

        return hasDuplicates;
    } catch (error) {
        console.error(`Error checking existing attendance: ${error.message}`);
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