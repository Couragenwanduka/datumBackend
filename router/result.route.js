import express from 'express';
const resultRouter = express.Router();
import { upload } from '../middlewares/multer.js';
import { createResult, getResultByGradeLevelAndTerm, getResultByStudentId, getResultByGradelevelAndTeacher, getAllResult } from '../controllers/result.controller.js';

// Create a new result
resultRouter.post('/createResult',upload.single('file'), createResult);

// Get results by grade level and term
resultRouter.get('/getResultByGradeLevelAndTerm/:gradeLevel/:term', getResultByGradeLevelAndTerm);

// Get result by student id
resultRouter.get('/getResultByStudentId/:studentId', getResultByStudentId);

// Get result by grade level and teacher
resultRouter.get('/getResultByGradelevelAndTeacher/:gradeLevel/:teacher', getResultByGradelevelAndTeacher);

// Get all results
resultRouter.get('/getAllResults', getAllResult);

export default resultRouter;
