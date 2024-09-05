import express from 'express';
const feedbackRouter = express.Router();
import { createFeedback } from '../controllers/feedback.controller.js';
import { getAllFeedback } from '../controllers/feedback.controller.js';
import { getFeedbackByStudentIdAndTerm } from '../controllers/feedback.controller.js';
import { validator } from '../middlewares/validator.middleware.js';
import { createFeedbackSchema } from '../schema/feedback.joi.js';
import { getAllFeedbackSchema } from '../schema/feedback.joi.js';
import { getFeedbackByStudentIdandTermSchema  } from '../schema/feedback.joi.js';


feedbackRouter.post('/feedback', [validator(createFeedbackSchema)],createFeedback)
feedbackRouter.get('/feedback/all', [validator(getAllFeedbackSchema)],getAllFeedback)
feedbackRouter.get('/feedback/:studentId/:Class/:term', [validator(getFeedbackByStudentIdandTermSchema, 'params')],getFeedbackByStudentIdAndTerm)

export default feedbackRouter;
