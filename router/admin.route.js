import express from 'express';
const adminRouter = express.Router();
import { createAdmin } from '../controllers/admin.controller.js';
import { verifyAdmin } from '../middlewares/authoriation.js';

// Create a new admin
adminRouter.post('/createAdmin', verifyAdmin,createAdmin);

export default adminRouter;

