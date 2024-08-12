import express from 'express';
const router = express.Router();
import { createStudent, getAllStudents, getStudentById } from '../controllers/student.controller.js';
import { verifyAdmin } from '../middlewares/authoriation.js';

// Create a new student
router.post('/createStudent',  createStudent);

// Get all students
router.get('/getAllStudents',  getAllStudents);

// Get a single student by id
router.get('/getStudentById/:id', getStudentById);


export default router;



