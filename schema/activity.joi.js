import Joi from "joi";
import { capitalizeFirstLetter } from "../utils/capitalize.js";

export const activitySchema = Joi.object({
    title: Joi.string().required().custom(capitalizeFirstLetter, 'First letter must be capitalised').messages({
        'string.base': 'Title should be a type of string',
        'any.required': 'Title is required'
    }),
    description: Joi.string().required().custom(capitalizeFirstLetter, 'First letter must be capitalised').messages({
        'string.base': 'Description should be a type of string',
        'any.required': 'Description is required'
    }),
    startDate: Joi.date().required().messages({
        'date.base': 'Start date should be a type of date',
        'any.required': 'Start date is required'
    }),
    endDate: Joi.date().required().messages({
        'date.base': 'End date should be a type of date',
        'any.required': 'End date is required'
    })
})
export const activityId = Joi.object({
    activityId:Joi.string().required().messages({
        'string.base': 'Activity ID should be a type of string',
        'any.required': 'Activity ID is required'
    })
})

export const updateActivitySchema = Joi.object({
    activityId: Joi.string().required().messages({
        'string.base': 'Activity ID should be a type of string',
        'any.required': 'Activity ID is required'
    }),
    title: Joi.string().custom(capitalizeFirstLetter, 'First letter must be capitalised').messages({
        'string.base': 'Title should be a type of string',
        'any.required': 'Title is required'
    }),
    description: Joi.string().custom(capitalizeFirstLetter, 'First letter must be capitalised').messages({
        'string.base': 'Description should be a type of string',
        'any.required': 'Description is required'
    }),
    startDate: Joi.date().required(),
    endDate: Joi.date().required()
})