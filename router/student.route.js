import express from 'express';
const router = express.Router();
import { idSchema } from '../schema/user.joi.js';
import { verifyAdmin } from '../middlewares/authoriation.js';
import { getAllStudentCvsData } from '../controllers/student.controller.js';
import { studentRegistrationSchema } from '../schema/user.joi.js';
import {validator} from '../middlewares/validator.middleware.js';
import { createStudent, getAllStudents, getStudentById } from '../controllers/student.controller.js';


// Create a new student
router.post('/createStudent', [validator(studentRegistrationSchema)], createStudent);

// Get all students
router.get('/getAllStudents',  getAllStudents);

// Get a single student by id
router.get('/getStudentById/:id',[validator(idSchema)], getStudentById);

// Get all student CVs data in CSV format
router.get('/getAllStudentCvsData', getAllStudentCvsData);



export default router;



