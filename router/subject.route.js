import express from 'express';
const subjectRouter = express.Router();
import { createSubject } from "../controllers/subject.controller.js";
import { getAllSubjects } from "../controllers/subject.controller.js";
import { getSubjectById } from "../controllers/subject.controller.js";
import { updateSubjectById } from "../controllers/subject.controller.js";
import { deleteSubjectById } from "../controllers/subject.controller.js";
import { validator } from '../middlewares/validator.middleware.js';
import { subjectSchema } from '../schema/subject.joi.js';
import { subjectIdSchema } from '../schema/subject.joi.js';
import { updateSubjectSchema } from '../schema/subject.joi.js';

// Create a new subject
subjectRouter.post('/createSubject', [validator(subjectSchema)],createSubject);

// Get all subjects
subjectRouter.get('/getAllSubjects', getAllSubjects);

// Get a single subject by id
subjectRouter.get('/getSubjectById/:id', [validator(subjectIdSchema)],getSubjectById);

// Update a subject by id
subjectRouter.put('/updateSubjectById/:id', [validator(updateSubjectSchema)],updateSubjectById);

// Delete a subject by id
subjectRouter.delete('/deleteSubjectById/:id', [validator(subjectIdSchema)],deleteSubjectById);

export default subjectRouter;
