import express from 'express';
const adminRouter = express.Router();
import { upload } from '../middlewares/multer.js';
import { adminSchema } from '../schema/administrator.joi.js';
import { verifyAdmin } from '../middlewares/authoriation.js';
import { createAdmin } from '../controllers/admin.controller.js';
import {validator} from '../middlewares/validator.middleware.js';

// Create a new admin
adminRouter.post('/createAdmin', [validator(adminSchema)],upload.single('file') ,createAdmin);

export default adminRouter;

