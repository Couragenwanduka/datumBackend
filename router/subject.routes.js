import express from 'express';
import { createSubject, getAllSubjects, getSubjectById, updateSubject, deleteSubject } from '../service/subject.service.js';

const router = express.Router();

router.post('/subjects', async (req, res) => { 
    try {
        const { name, code } = req.body;
        const subject = await createSubject(name, code);
        res.status(201).json(subject);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/subjects', async (req, res) => {
    try {
        const subjects = await getAllSubjects();
        res.status(200).json(subjects);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/subjects/:id', async (req, res) => {
    try {
        const subject = await getSubjectById(parseInt(req.params.id));
        res.status(200).json(subject);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/subjects/:id', async (req, res) => {
    try {
        const { name, code } = req.body;
        const updatedSubject = await updateSubject(parseInt(req.params.id), name, code);
        res.status(200).json({ message: "Subject updated successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/subjects/:id', async (req, res) => {
    try {
        await deleteSubject(parseInt(req.params.id));
        res.status(200).json({ message: "Subject deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;