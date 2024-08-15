import express from 'express';
import {
    enrollStudent,
    getAllEnrollments,
    getEnrollmentById,
    deleteEnrollment
} from '../service/enrollment.service.js';

const router = express.Router();

// Enroll a student in a subject
router.post('/enrollments', async (req, res) => {
    try {
        const { studentId, subjectId } = req.body;
        const enrollment = await enrollStudent(studentId, subjectId);
        res.status(201).json(enrollment); { "Enrollment deleted successfully" };
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all enrollments
router.get('/enrollments', async (req, res) => {
    try {
        const enrollments = await getAllEnrollments();
        res.status(200).json(enrollments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get an enrollment by ID
router.get('/enrollments/:id', async (req, res) => {
    try {
        const enrollment = await getEnrollmentById(parseInt(req.params.id));
        res.status(200).json(enrollment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete an enrollment by ID
router.delete('/enrollments/:id', async (req, res) => {
    try {
        await deleteEnrollment(parseInt(req.params.id));
        res.status(200).json({ message: "Enrollment deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;