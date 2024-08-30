import Joi from "joi";

export const teirSchema = Joi.object({
    name: Joi.string().required().valid('Purity','Peace','Love','Wisdom','Joy').messages({
        'string.base': 'Tier name should be a type of string',
        'any.required': 'Tier name is required'
    }),
    classLevel: Joi.number().required().valid('JuniorSecondarySchool', 'SeniorSecondarySchool').messages({
        'number.base': 'Class level should be a type of number',
        'number.required': 'Class level is required'
    }),
    className: Joi.string().required().messages({
        'string.base': 'Class should be a type of string',
        'any.required': 'Class  is required, please create a class first'
    })
})
