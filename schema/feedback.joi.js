import { Class } from "@prisma/client";
import Joi from "joi";

export const createFeedbackSchema = Joi.object({
    term: Joi.string().required().valid('FirstTerm','SecondTerm','ThirdTerm').messages({
        'string.base': 'Term should be a type of string',
        'any.required': 'Term is required'
    }),
    email: Joi.string().required().email().messages({
        'string.base': 'Email should be a type of string',
        'string.email': 'Email must be a valid email',
        'any.required': 'Email is required'
    })
})

export const getAllFeedbackSchema = Joi.object({
    term: Joi.string().required().valid('FirstTerm','SecondTerm','ThirdTerm').messages({
        'string.base': 'Term should be a type of string',
        'any.required': 'Term is required'
    })
})

export const getFeedbackByStudentIdandTermSchema = Joi.object({
    studentId:Joi.string().required().messages({
        'number.base': 'Student ID should be a type of number',
        'any.required': 'Student ID is required'
    }),
    Class:Joi.string().required().messages({
        'string.base': 'Class should be a type of string',
        'any.required': 'Class is required'
    }),
    term: Joi.string().required().valid('FirstTerm','SecondTerm','ThirdTerm').messages({
        'string.base': 'Term should be a type of string',
        'any.required': 'Term is required'
    })
})

