import express from 'express';
const router = express.Router();
import { createStudent, findAllStudents, getStudentById } from '../controllers/student.controller.js';
import { verifyAdmin } from '../middlewares/authoriation.js';

// Create a new student
router.post('/createStudent', verifyAdmin, createStudent);

// Get all students
router.get('/getAllStudents', verifyAdmin, findAllStudents);

// Get a single student by id
router.get('/getStudentById/:id', verifyAdmin, getStudentById);


export default router;



