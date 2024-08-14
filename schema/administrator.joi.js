import Joi from 'joi';

const Schema = Joi.object({
    firstName: Joi.string().required().messages({
       'string.base': 'First name should be a type of string',
       'any.required': 'First name is required'
   }),
    lastName: Joi.string().required().messages({
       'string.base': 'Last name should be a type of string',
       'any.required': 'Last name is required'
   }),
   gender: Joi.string().valid('Male', 'Female', 'Other').required().messages({
       'string.base': 'Gender should be a type of string',
       'any.required': 'Gender is required',
       'any.only': 'Gender must be Male, Female, or Other'
   }),
    dateOfBirth: Joi.date().required().messages({
       'date.base': 'Date of birth should be a valid date',
       'any.required': 'Date of birth is required'
   }),
   email: Joi.string().email().required().messages({
       'string.base': 'Email should be a type of string',
       'string.email': 'Email must be a valid email',
       'any.required': 'Email is required'
   }),
    contactNumber: Joi.string().required().messages({
       'string.base': 'Contact number should be a type of string',
       'any.required': 'Contact number is required'
   }),
   currentAddress: Joi.string().required().messages({
       'string.base': 'Current address should be a type of string',
       'any.required': 'Current address is required'
   }),
    permanentAddress: Joi.string().required().messages({
       'string.base': 'Permanent address should be a type of string',
       'any.required': 'Permanent address is required'
   }),
   subject: Joi.string().required().messages({
       'string.base': 'Subject should be a type of string',
       'any.required': 'Subject is required'
   }),
    hireDate: Joi.string().required().messages({
       'date.base': 'Hire date should be a valid date',
       'any.required': 'Hire date is required'
    }),
    qualification: Joi.string().required().messages({
       'string.base': 'Qualification should be a type of string',
       'any.required': 'Qualification is required'
    }),
    photo: Joi.string().required().messages({
       'string.base': 'Photo URL should be a type of string',
       'any.required': 'Photo URL is required'
   }),
   role: Joi.string().required().messages({
       'string.base': 'Role should be a type of string',
       'any.required': 'Role is required'
   })
}) 

export const adminSchema = Joi.object({
    admin:Schema
})
