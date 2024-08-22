import Joi from "joi";

// Define validation schema for student registration
const attendanceSchema = Joi.array().items(
    Joi.object({
        teacherId : Joi.string().required().messages({
            'string.base': 'Teacher ID should be a type of string',
            'any.required': 'Teacher ID is required'
        }),
        class: Joi.string().required().messages({
            'string.base': 'Class should be a type of string',
            'any.required': 'Class is required'
        }),
        classTier: Joi.string().required().messages({
            'string.base': 'Class Tier should be a type of string',
            'any.required': 'Class Tier is required'
        }),
        studentId: Joi.string().required().messages({
            'string.base': 'Student ID should be a type of string',
            'any.required': 'Student ID is required'
        }),
        status: Joi.string().required().valid('Present', 'Absent', 'Late').messages({
            'string.base': 'Status should be a type of string',
            'any.required': 'Status is required'
        })
    })
);

export const  validateAttendanceSChema = Joi.object({
    attendance: attendanceSchema
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