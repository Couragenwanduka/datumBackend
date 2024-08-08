import express from 'express';
const router = express.Router();
import { createStudent } from '../controllers/student.controller.js';

// Create a new student
router.post('/createStudent', createStudent);

export default router;



