import express from 'express';
const classRouter = express.Router();
import { createClassController } from '../controllers/class.controller.js';
import { getAllClassesController } from '../controllers/class.controller.js';
import { deleteAClass } from '../controllers/class.controller.js';
import { validator } from '../middlewares/validator.middleware.js';
import { classSchema } from '../schema/class.joi.js';


classRouter.post('/class', [validator(classSchema)],createClassController)
classRouter.get('/class', getAllClassesController)
classRouter.delete('/class/:name', deleteAClass)

export default classRouter;
