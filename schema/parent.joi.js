import Joi from "joi"

export const linkParentAndStudentSchema = Joi.object({
    email: Joi.string().required().messages({
        'string.base': 'Email should be a type of string',
        'any.required': 'Email is required'
    }),
    studentId: Joi.string().required().messages({
        'string.base': 'Student ID should be a type of string',
        'any.required': 'Student ID is required'
    })  
})