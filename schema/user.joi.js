import Joi from 'joi';
import { capitalizeFirstLetter } from '../utils/capitalize.js';

const students = Joi.array().items(
    Joi.object({
        surName:  Joi.string().required().custom(capitalizeFirstLetter, 'First letter must be capitalised').messages({
            'string.base': 'Surname should be a type of string',
            'any.required': 'Surname is required'
        }),
        firstName:  Joi.string().required().custom(capitalizeFirstLetter, 'First letter must be capitalised').messages({
            'string.base': 'First name should be a type of string',
            'any.required': 'First name is required'
        }),
        otherName:  Joi.string().required().custom(capitalizeFirstLetter, 'First letter must be capitalised').messages({
            'string.base': 'Other name should be a type of string',
            'any.required': 'Other name is required'
        }),
        dateOfBirth: Joi.date().required().messages({
            'date.base': 'Date of birth should be a valid date',
            'any.required': 'Date of birth is required'
        }),
        bloodGroup: Joi.string().required().messages({
            'string.base': 'Blood group should be a type of string',
            'any.required': 'Blood group is required'
        }),
        gender: Joi.string().valid('Male', 'Female', 'Other').required().messages({
            'string.base': 'Gender should be a type of string',
            'any.required': 'Gender is required',
            'any.only': 'Gender must be Male, Female, or Other'
        }),
        nationality:  Joi.string().required().custom(capitalizeFirstLetter, 'First letter must be capitalised').messages({
            'string.base': 'Nationality should be a type of string',
            'any.required': 'Nationality is required'
        }),
        stateOfOrigin:  Joi.string().required().custom(capitalizeFirstLetter, 'First letter must be capitalised').messages({
            'string.base': 'State of origin should be a type of string',
            'any.required': 'State of origin is required'
        }),
        localGovernment:  Joi.string().required().custom(capitalizeFirstLetter, 'First letter must be capitalised').messages({
            'string.base': 'Local government should be a type of string',
            'any.required': 'Local government is required'
        }),
        address:  Joi.string().required().custom(capitalizeFirstLetter, 'First letter must be capitalised').messages({
            'string.base': 'Current address should be a type of string',
            'any.required': 'Current address is required'
        }),
        term: Joi.string().required().valid('FirstTerm','SecondTerm','ThirdTerm').messages({
            'string.base': 'Term should be a type of string',
            'any.required': 'Term is required'
        }),
        picture: Joi.string().required().messages({
            'string.base': 'Photo URL should be a type of string',
            'any.required': 'Photo URL is required'
        }),
        previousSchool: Joi.string().required().custom(capitalizeFirstLetter, 'First letter must be capitalised').messages({
            'string.base': 'Previous school should be a type of string',
            'any.required': 'Previous school is required'
        })
    })
)


const parentGuardianRegistrationSchema = Joi.object({
    surName: Joi.string().required().custom(capitalizeFirstLetter, 'First letter must be capitalised').messages({
        'string.base': 'Surname should be a type of string',
        'any.required': 'Surname is required'
    }),
    firstName: Joi.string().required().custom(capitalizeFirstLetter, 'First letter must be capitalised').messages({
        'string.base': 'First name should be a type of string',
        'any.required': 'First name is required'
    }),
    otherName: Joi.string().required().custom(capitalizeFirstLetter, 'First letter must be capitalised').messages({
        'string.base': 'other name should be a type of string',
        'any.required': 'other name is required'
    }),
    email: Joi.string().email().required().messages({
        'string.base': 'Email should be a type of string',
        'string.email': 'Email must be a valid email',
        'any.required': 'Email is required'
    }),
    phoneNumber: Joi.string().required().messages({
        'string.base': 'Phone number should be a type of string',
        'any.required': 'Phone number is required'
    }),
    relationship: Joi.string().required().valid('Father', 'Mother', 'Guardian')
    .custom(capitalizeFirstLetter, 'First letter must be capitalised').messages({
        'string.base': 'Relationship should be a type of string',
        'any.required': 'Relationship is required'
    })
    
    
});

export const studentRegistrationSchema = Joi.object({
    parent: parentGuardianRegistrationSchema,
    students
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

export const idSchema = Joi.object().required().messages({
    'any.required': 'ID is required'
});