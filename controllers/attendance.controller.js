import { saveAttendance } from '../service/attendance.service.js';  // Importing saveAttendance from Attendance service

// Create a new Attendance
export const createAttendance = async (req, res) => {
    const { subjectName, code, enrollments, attendance } = req.body;

    try {
        const createdAt = new Date();
        const updatedAt = createdAt;

        const subjectId = await saveAttendance(subjectName, code, enrollments, attendance, createdAt, updatedAt);
        
        res.status(201).json({
            message: 'Attendance created successfully',
            subjectId: subjectId,
        });
    } catch (error) {
        console.error(`Error in createAttendance controller: ${error.message}`);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get all Attendance
export const getAllAttendance = async (req, res) => {
    try {
        const attendance = await prisma.attendance.findMany({
            include: {
                enrollments: true,
                attendance: true,
            },
        });

        res.status(200).json(attendance);
    } catch (error) {
        console.error(`Error in getAllAttendance controller: ${error.message}`);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Get a single Attendance by ID
export const getAttendanceById = async (req, res) => {
    const { id } = req.params;

    try {
        const attendant = await prisma.attendant.findUnique({
            where: { id: parseInt(id, 10) },
            include: {
                enrollments: true,
                attendance: true,
            },
        });

        if (!attendant) {
            return res.status(404).json({ error: 'Attendant not found' });
        }

        res.status(200).json(attendant);
    } catch (error) {
        console.error(`Error in getAttendanceById controller: ${error.message}`);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Update an Attendance
export const updateAttendance = async (req, res) => {
    const { id } = req.params;
    const { subjectName, code, enrollments, attendance } = req.body;

    try {
        const updatedAt = new Date();

        const updateAttendance = await prisma.attendant.update({
            where: { id: parseInt(id, 10) },
            data: {
                subjectName,
                code,
                enrollments,
                attendance,
                updatedAt,
            },
        });

        res.status(200).json({
            message: 'Attendance updated successfully',
            subject: updateAttendance,
        });
    } catch (error) {
        console.error(`Error in updateAttendance controller: ${error.message}`);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Delete an Attendance
export const deleteAttendance = async (req, res) => {
    const { id } = req.params;

    try {
        await prisma.attendant.delete({
            where: { id: parseInt(id, 10) },
        });

        res.status(200).json({ message: 'Attendance deleted successfully' });
    } catch (error) {
        console.error(`Error in deleteAttendance controller: ${error.message}`);
        res.status(500).json({ error: 'Internal server error' });
    }
};