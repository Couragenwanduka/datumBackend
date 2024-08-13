import express from 'express';
import {
    recordAttendance,
    getAllAttendance,
    getAttendanceById,
    updateAttendance,
    deleteAttendance
} from '../service/attendance.service.js'; 

const router = express.Router();

// Record attendance for a student
router.post('/attendance', async (req, res) => {
    try {
        const { studentId, subjectId, date, status } = req.body;
        const attendance = await recordAttendance(studentId, subjectId, date, status);
        res.status(201).json(attendance);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all attendance records
router.get('/attendance', async (req, res) => {
    try {
        const attendanceRecords = await getAllAttendance();
        res.status(200).json(attendanceRecords);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get an attendance record by ID
router.get('/attendance/:id', async (req, res) => {
    try {
        const attendance = await getAttendanceById(parseInt(req.params.id));
        res.status(200).json(attendance);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update an attendance record by ID
router.put('/attendance/:id', async (req, res) => {
    try {
        const { date, status } = req.body;
        const updatedAttendance = await updateAttendance(parseInt(req.params.id), date, status);
        res.status(200).json(updatedAttendance);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete an attendance record by ID
router.delete('/attendance/:id', async (req, res) => {
    try {
        await deleteAttendance(parseInt(req.params.id));
        res.status(200).json({ message: "Attendance record deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;