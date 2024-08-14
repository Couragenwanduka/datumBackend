import express from 'express';
const parentRouter = express.Router();
import { LoginSchema } from '../schema/user.joi.js';
import { validator } from '../middlewares/validator.middleware.js';
import { linkParentAndStudentSchema } from '../schema/parent.joi.js';
import { Login, linkStudentToParent } from '../controllers/parent.controller.js';

// Login a parent guardian
parentRouter.post('/login', [validator(LoginSchema)],Login);

// Link a student to a parent guardian
parentRouter.post('/linkstudentToParent',[validator(linkParentAndStudentSchema)], linkStudentToParent);

export default parentRouter;