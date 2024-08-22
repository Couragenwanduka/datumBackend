import Joi from 'joi';
import { capitalizeFirstLetter } from '../utils/capitalize.js';

const Schema = Joi.object({
    surName: Joi.string().required().messages({
       'string.base': 'Surname should be a type of string',
       'any.required': 'Surname is required'}),
    firstName: Joi.string().required().messages({
       'string.base': 'First name should be a type of string',
       'any.required': 'First name is required'
   }),
    otherName: Joi.string().required().messages({
       'string.base': 'Other name should be a type of string',
       'any.required': 'Other name is required'
   }),
   gender: Joi.string().valid('Male', 'Female', 'Other').required().messages({
       'string.base': 'Gender should be a type of string',
       'any.required': 'Gender is required',
       'any.only': 'Gender must be Male, Female, or Other'
   }),
   bloodGroup: Joi.date().required().messages({
     'date.base': 'Blood group should be a type of string',
     'any.required': 'Blood group is required'
   }),
    dateOfBirth: Joi.date().required().messages({
       'date.base': 'Date of birth should be a valid date',
       'any.required': 'Date of birth is required'
   }),
   nationality:  Joi.string().required().custom(capitalizeFirstLetter, 'First letter must be capitalised').messages({
       'string.base': 'Nationality should be a type of string',
       'any.required': 'Nationality is required'
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
   address: Joi.string().required().messages({
       'string.base': 'Address should be a type of string',
       'any.required': 'Address is required'
   }),
    stateOfOrigin: Joi.string().required().custom(capitalizeFirstLetter, 'First letter must be capitalised').messages({
        'string.base': 'State of origin should be a type of string',
       'any.required': 'State of origin is required'
    }),
    localGovernment: Joi.string().required().custom(capitalizeFirstLetter, 'First letter must be capitalised').messages({
        'string.base': 'Local government should be a type of string',
       'any.required': 'Local government is required'
    }),
   employmentRole: Joi.string().required().messages({
       'string.base': 'EmploymentRole should be a type of string',
       'any.required': 'EmploymentRoleis required'
   }),
   employmentDate: Joi.string().required().messages({
       'date.base': 'EmploymentDate should be a valid date',
       'any.required': 'EmploymentDateis required'
    }),
    qualification: Joi.string().required().messages({
       'string.base': 'Qualification should be a type of string',
       'any.required': 'Qualification is required'
    }),
    picture: Joi.string().required().messages({
       'string.base': 'Photo URL should be a type of string',
       'any.required': 'Photo URL is required'
   }),
   role: Joi.string().required().valid('Admin', "Teacher").messages({
       'string.base': 'Role should be a type of string',
       'any.required': 'Role is required'
   }),
   gradeLevel: Joi.string().required().messages({
     'string.base': 'Grade level should be a type of string',
       'any.required': 'Grade level is required'
   }),
   step: Joi.string().required().messages({
       'string.base': 'Step should be a type of string',
       'any.required': 'Step is required'
   })
}) 

export const adminSchema = Joi.object({
    admin:Schema
})
