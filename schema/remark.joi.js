import Joi from "joi"
import { capitalizeFirstLetter } from "../utils/capitalize.js"

export const remarkSchema = Joi.object({
    studentId: Joi.number().required().messages({
        'string.base': 'Student ID should be a type of string',
        'any.required': 'Student ID is required'
    }),
    remark: Joi.string().required().custom(capitalizeFirstLetter).messages({
        'string.base': 'Remark should be a type of string',
        'any.required': 'Remark is required'
    }),
    Class: Joi.string().required().valid('Jss1','Jss2','Jss3','Sss1','Sss2','Sss3').messages({
        'string.base': 'Class should be a type of string',
        'any.required': 'Class is required'
    }),
    term: Joi.string().required().valid('FirstTerm','SecondTerm','ThirdTerm').messages({
        'string.base': 'Term should be a type of string',
        'any.required': 'Term is required'
    }),
    subject: Joi.string().required().messages({
        'string.base': 'Subject should be a type of string',
        'any.required': 'Subject is required'
    })
})

export const updateRemarkSchema = Joi.object({
    remarkId: Joi.string().required().messages({
        'string.base': 'Student ID should be a type of string',
        'any.required': 'Student ID is required'
    }),
    remark: Joi.string().required().custom(capitalizeFirstLetter).messages({
        'string.base': 'Remark should be a type of string',
        'any.required': 'Remark is required'
    }),
    Class: Joi.string().required().messages({
        'string.base': 'Class should be a type of string',
        'any.required': 'Class is required'
    }),
    term: Joi.string().required().messages({
        'string.base': 'Term should be a type of string',
        'any.required': 'Term is required'
    }),
    subject: Joi.string().required().messages({
        'string.base': 'Subject should be a type of string',
        'any.required': 'Subject is required'
    })
})

export const remarkId = Joi.object({
    id: Joi.string().required().messages({
        'string.base': 'Remark ID should be a type of string',
        'any.required': 'Remark ID is required'
    })
})

