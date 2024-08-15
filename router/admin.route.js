import express from 'express';
const adminRouter = express.Router();
import { createAdmin } from '../controllers/admin.controller.js';


// Create a new admin
adminRouter.post('/createAdmin', createAdmin);

export default adminRouter;