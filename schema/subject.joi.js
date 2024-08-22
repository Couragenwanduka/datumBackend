import Joi from "joi";

export const subjectSchema = Joi.object({
    name: Joi.string().required().messages({
        'string.base': 'Subject name should be a type of string',
        'any.required': 'Subject name is required'
    }),
    classLevel: Joi.string().required().messages({
        'number.base': 'class level should be a type of number',
        'number.required': 'class level is required'
    })
})

export const subjectIdSchema =  Joi.object({
    id: Joi.string().required().messages({
        'string.base': ' ID should be a type of string',
        'any.required': ' ID is required'
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
    classLevel: Joi.string().required().messages({
        'number.base': 'Class level should be a type of number',
        'number.required': 'Class level is required'
    })
})