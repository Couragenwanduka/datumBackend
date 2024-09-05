import express from 'express';
const resultRouter = express.Router();
import { upload } from '../middlewares/multer.js';
import { createResult, getResultByClassAndTerm, getResultByStudentId, getResultByClassAndTeacher, getAllResult } from '../controllers/result.controller.js';

// Create a new result
resultRouter.post('/createResult',upload.single('file'), createResult);

// Get results by grade level and term
resultRouter.get('/getResultByGradeLevelAndTerm/:class/:term', getResultByClassAndTerm);

// Get result by student id
resultRouter.get('/getResultByStudentId/:studentId/:Class/:term', getResultByStudentId);

// Get result by grade level and teacher
resultRouter.get('/getResultByGradelevelAndTeacher/:class/:teacher', getResultByClassAndTeacher);

// Get all results
resultRouter.get('/getAllResults', getAllResult);

export default resultRouter;
