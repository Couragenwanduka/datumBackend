import express from 'express';
const router = express.Router();
import { createStudent } from '../controllers/student.controller.js';
import { verifyAdmin } from '../middlewares/authoriation.js';

// Create a new student
router.post('/createStudent', verifyAdmin, createStudent);

export default router;



