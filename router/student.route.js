import express from 'express';
const router = express.Router();
import { createStudent, getAllStudents, getStudentById } from '../controllers/student.controller.js';
import { verifyAdmin } from '../middlewares/authoriation.js';
import { studentRegistrationSchema } from '../schema/user.joi.js';
import {validator} from '../middlewares/validator.middleware.js';

// Create a new student
router.post('/createStudent', [validator(studentRegistrationSchema)], createStudent);

// Get all students
router.get('/getAllStudents',  getAllStudents);

// Get a single student by id
router.get('/getStudentById/:id', getStudentById);


export default router;



