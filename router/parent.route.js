import express from 'express';
const parentRouter = express.Router();
import { Login, linkstudentToParent } from '../controllers/parent.controller.js';

// Login a parent guardian
parentRouter.post('/login', Login);

// Link a student to a parent guardian
parentRouter.post('/linkstudentToParent', linkstudentToParent);

export default parentRouter;