import { saveActivity } from "../service/activities.service.js";
import { findActivityById } from "../service/activities.service.js";
import { updateActivity } from "../service/activities.service.js";
import { deleteActivity } from "../service/activities.service.js";
import { findAllActivities } from "../service/activities.service.js";
import BadRequest from "../error/error.js";


export const createActivity = async (req, res, next) => {
    try{
       const {title, description, startDate, endDate} = req.body;

       const savedActivity = await saveActivity(title, description, startDate, endDate);
        if(!savedActivity) throw new BadRequest('Failed to save activity');

       res.status(201).json(savedActivity);
    }catch(error){
        next(error);
    }
}

export const getActivityById = async(req, res, next) => {
    try{
      const activityId = req.params.id;

      const activity = await findActivityById(activityId);
      if(!activity) throw new BadRequest('Activity not found');

      res.status(200).json(activity);
    }catch(error){
        next(error);
    }
}

export const getAllActivities = async(req, res, next) => {
    try{
       const activities = await findAllActivities();

       res.status(200).json(activities);
    }catch(error){
        next(error);
    }
}

export const updateAnActivity = async(req, res, next) => {
    try{
      const {activityId,title, description, startDate, endDate} = req.body;

      const updatedActivity = await updateActivity(activityId, title, description, startDate, endDate);
      if(!updatedActivity) throw new BadRequest('Failed to update activity');

      res.status(200).json(updatedActivity);
    }catch(error){
        next(error);
    }
}

export const deleteAnActivity = async(req, res, next) => {
    try{
      const activityId = req.params.id;

      const deletedActivity = await deleteActivity(activityId);

      res.status(200).json(deletedActivity);
    }catch(error){
        next(error);
    }
}