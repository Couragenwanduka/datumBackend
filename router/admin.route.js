import express from 'express';
const adminRouter = express.Router();

import { upload } from '../middlewares/multer.js';
import { adminSchema } from '../schema/administrator.joi.js';
import { verifyAdmin } from '../middlewares/authoriation.js';
import { createAdmin } from '../controllers/admin.controller.js';
import {validator} from '../middlewares/validator.middleware.js';
import { deleteEverything } from '../controllers/deleteForTest.js';

// Create a new admin
adminRouter.post('/createAdmin', [validator(adminSchema)], upload.single('file') ,createAdmin);

// Delete everything in the database
adminRouter.delete('/deleteEverything', deleteEverything);

export default adminRouter;

import { createAdmin } from '../controllers/admin.controller.js';


// Create a new admin
adminRouter.post('/createAdmin', createAdmin);


