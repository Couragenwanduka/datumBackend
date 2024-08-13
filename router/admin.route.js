import express from 'express';
const adminRouter = express.Router();
import { createAdmin } from '../controllers/admin.controller.js';
import { verifyAdmin } from '../middlewares/authoriation.js';
import { upload } from '../middlewares/multer.js';

// Create a new admin
adminRouter.post('/createAdmin', upload.single('file') ,createAdmin);

export default adminRouter;

