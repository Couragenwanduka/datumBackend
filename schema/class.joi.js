import Joi from "joi";

export const classSchema = Joi.object({
    name: Joi.string().required().valid('Jss1' ,'Jss2','Jss3', 'Sss1', 'Sss2','Sss3').messages({
        'string.base': 'Class name should be a type of string',
        'any.required': 'Class name is required'
    })
})