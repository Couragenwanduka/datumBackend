import Joi from "joi";


// Define validation schema for student registration
export const attendanceSchema = Joi.object({
    studentId: Joi.string().required().messages({
        'string.base': 'Student ID should be a type of string',
        'any.required': 'Student ID is required'
    }),
    status: Joi.string().required().valid('Present','Absent','Late').messages({
        'string.base': 'Status should be a type of string',
        'any.required': 'Status is required'
    })
})

export const updateAttendanceSchema = Joi.object({
    id: Joi.string().required().messages({
        'string.base': 'ID should be a type of string',
        'any.required': 'ID is required'
    }),
    status: Joi.string().required().valid('Present','Absent','Late').messages({
        'string.base': 'Status should be a type of string',
        'any.required': 'Status is required'
    })
})

export const idSchema = Joi.string().required().messages({
    'string.base': 'ID should be a type of string',
    'any.required': 'ID is required'
})

export  const dateSchema = Joi.string().required().messages({
    'string.base': 'Date should be a type of string',
    'any.required': 'Date is required'
});