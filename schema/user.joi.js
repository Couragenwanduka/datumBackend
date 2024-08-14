import Joi from 'joi';

const students = Joi.array().items(
    Joi.object({
        firstName: Joi.string().required().messages({
            'string.base': 'First name should be a type of string',
            'any.required': 'First name is required'
        }),
        lastName: Joi.string().required().messages({
            'string.base': 'Last name should be a type of string',
            'any.required': 'Last name is required'
        }),
        dateOfBirth: Joi.date().required().messages({
            'date.base': 'Date of birth should be a valid date',
            'any.required': 'Date of birth is required'
        }),
        gender: Joi.string().valid('Male', 'Female', 'Other').required().messages({
            'string.base': 'Gender should be a type of string',
            'any.required': 'Gender is required',
            'any.only': 'Gender must be Male, Female, or Other'
        }),
        nationality: Joi.string().required().messages({
            'string.base': 'Nationality should be a type of string',
            'any.required': 'Nationality is required'
        }),
        currentAddress: Joi.string().required().messages({
            'string.base': 'Current address should be a type of string',
            'any.required': 'Current address is required'
        }),
        permanentAddress: Joi.string().required().messages({
            'string.base': 'Permanent address should be a type of string',
            'any.required': 'Permanent address is required'
        }),
        photo: Joi.string().required().messages({
            'string.base': 'Photo URL should be a type of string',
            'any.required': 'Photo URL is required'
        }),
        enrollmentDate: Joi.date().required().messages({
            'date.base': 'Enrollment date should be a valid date',
            'any.required': 'Enrollment date is required'
        }),
        gradeLevel: Joi.string().required().messages({
            'string.base': 'Grade level should be a type of string',
            'any.required': 'Grade level is required'
        }),
        classSection: Joi.string().required().messages({
            'string.base': 'Class section should be a type of string',
            'any.required': 'Class section is required'
        })
    })
)


const parentGuardianRegistrationSchema = Joi.object({
    firstName: Joi.string().required().messages({
        'string.base': 'First name should be a type of string',
        'any.required': 'First name is required'
    }),
    lastName: Joi.string().required().messages({
        'string.base': 'Last name should be a type of string',
        'any.required': 'Last name is required'
    }),
    relationship: Joi.string().required().messages({
        'string.base': 'Relationship should be a type of string',
        'any.required': 'Relationship is required'
    }),
    contactNumber: Joi.string().required().messages({
        'string.base': 'Contact number should be a type of string',
        'any.required': 'Contact number is required'
    }),
    email: Joi.string().email().required().messages({
        'string.base': 'Email should be a type of string',
        'string.email': 'Email must be a valid email',
        'any.required': 'Email is required'
    }),
});

export const studentRegistrationSchema = Joi.object({
    students,
    parent: parentGuardianRegistrationSchema
});
export const LoginSchema = Joi.object({
    email: Joi.string().required().messages({
        'string.base': 'Email should be a type of string',
        'string.email': 'Email must be a valid email',
        'any.required': 'Email is required'
    }),
    password: Joi.string().required().messages({
        'string.base': 'Password must be a type of string',
          'any.required': 'Password is required'
    })
})