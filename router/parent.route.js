import express from 'express';
const parentRouter = express.Router();
import { LoginParent } from '../controllers/parent.controller.js';

// Login a parent guardian
parentRouter.post('/login', LoginParent);

export default parentRouter;