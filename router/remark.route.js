import express from 'express';
const remarkRouter = express.Router();
import { createRemark } from '../controllers/remark.controller.js';
import { getAllRemarks } from '../controllers/remark.controller.js';
import { getRemarkByStudentId } from '../controllers/remark.controller.js';
import { updateRemarkById } from '../controllers/remark.controller.js';
import { deleteRemarkById } from '../controllers/remark.controller.js';
import { remarkId } from '../schema/remark.joi.js';
import { updateRemarkSchema } from '../schema/remark.joi.js';
import { validator } from '../middlewares/validator.middleware.js';
import { remarkSchema } from '../schema/remark.joi.js';


// Create a new remark
remarkRouter.post('/createRemark', [validator(remarkSchema)],createRemark);

// Get all remarks
remarkRouter.get('/getAllRemarks', getAllRemarks);

// Get remarks by student id
remarkRouter.get('/getRemarkByStudentId/:id', [validator(remarkId, 'params')],getRemarkByStudentId);

// Update a remark by id
remarkRouter.put('/updateRemarkById',[validator(updateRemarkSchema)] ,updateRemarkById);

// Delete a remark by id
remarkRouter.delete('/deleteRemarkById/:id', [validator(remarkId, 'params')],deleteRemarkById);

export default remarkRouter;