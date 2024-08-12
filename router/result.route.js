import express from 'express';
const resultRouter = express.Router();
import { createResult, getResultByGradeLevelAndTerm, getResultByStudentId, getResultByGradelevelAndTeacher} from '../controllers/result.controller';

// Create a new result
resultRouter.post('/createResult', createResult);

// Get results by grade level and term
resultRouter.get('/getResultByGradeLevelAndTerm/:gradeLevel/:term', getResultByGradeLevelAndTerm);

// Get result by student id
resultRouter.get('/getResultByStudentId/:studentId', getResultByStudentId);

// Get result by grade level and teacher
resultRouter.get('/getResultByGradelevelAndTeacher/:gradeLevel/:teacher', getResultByGradelevelAndTeacher);

export default resultRouter;
