import express from 'express';
const  activityRouter = express.Router();
import {validator} from '../middlewares/validator.middleware.js';
import { activitySchema } from '../schema/activity.joi.js';
import { createActivity } from '../controllers/activities.controller.js';
import { getActivityById } from '../controllers/activities.controller.js';
import { getAllActivities } from '../controllers/activities.controller.js';
import { updateAnActivity } from '../controllers/activities.controller.js';
import { deleteAnActivity } from '../controllers/activities.controller.js';
import { activityId } from '../schema/activity.joi.js';
import { updateActivitySchema } from '../schema/activity.joi.js';



//   create activity
activityRouter.post('/createActivity', [validator(activitySchema)],createActivity)

//   get activity by id
activityRouter.get('/activity/:id',[validator(activityId)], getActivityById)

//   get all activities
activityRouter.get('/getAllActivities', getAllActivities)

//   update activity by id
activityRouter.patch('/updateActivity/', [validator(updateActivitySchema)],updateAnActivity)

//   delete activity by id
activityRouter.delete('/deleteActivity/:id', [validator(activityId)],deleteAnActivity)

export default activityRouter;