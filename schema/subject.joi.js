import Joi from "joi";

export const subjectSchema = Joi.object({
    name: Joi.string().required().messages({
        'string.base': 'Subject name should be a type of string',
        'any.required': 'Subject name is required'
    }),
    gradeLevel: Joi.number().required().messages({
        'number.base': 'Grade level should be a type of number',
        'number.required': 'Grade level is required'
    })
})

export const subjectIdSchema =  Joi.object({
    subjectId: Joi.string().required().messages({
        'string.base': 'Subject ID should be a type of string',
        'any.required': 'Subject ID is required'
    })
})

export const updateSubjectSchema = Joi.object({
    subjectId: Joi.string().required().messages({
        'string.base': 'Subject ID should be a type of string',
        'any.required': 'Subject ID is required'
    }),
    name: Joi.string().required().messages({
        'string.base': 'Subject name should be a type of string',
        'any.required': 'Subject name is required'
    }),
    gradeLevel: Joi.number().required().messages({
        'number.base': 'Grade level should be a type of number',
        'number.required': 'Grade level is required'
    })
})