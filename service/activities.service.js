import prisma from "../prisma/dbconnect.js";

export const saveActivity = async(title, description, startDate, endDate) => {
    try{
        const savedActivity = await prisma.activity.create({
            data:{
                title,
                description,
                startDate: new Date(startDate),
                endDate: new Date(endDate),
            }
        });
        return savedActivity;
    }catch(error){
        throw new Error(`Error saving activity: ${error.message}`);
    }
}

export const findAllActivities = async() => {
    try{
        const activities = await prisma.activity.findMany();
        return activities;
    }catch(error){
        throw new Error(`Error fetching all activities: ${error.message}`);
    }
}

export const findActivityById = async(activityId) => {
    try{
        const activity = await prisma.activity.findUnique({
            where:{
                id: activityId,
            }
        });
        return activity;
    }catch(error){
        throw new Error(`Error fetching activity by id: ${error.message}`);
    }
}

export const updateActivity = async(activityId, title, description, startDate, endDate) => {
    try{
        const updatedActivity = await prisma.activity.update({
            where:{
                id: activityId,
            },
            data:{
                title,
                description,
                startDate: new Date(startDate),
                endDate: new Date(endDate),
            }
        });
        return updatedActivity;
    }catch(error){
        throw new Error(`Error updating activity: ${error.message}`);
    }
}

export const deleteActivity = async(activityId) => {
    try{
        await prisma.activity.delete({
            where:{
                id: activityId,
            }
        });
        return { message: "Activity deleted successfully" };
    }catch(error){
        throw new Error(`Error deleting activity: ${error.message}`);
    }
}