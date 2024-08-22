import Joi from 'joi';

export const resultSchema = Joi.object({
    studentId: Joi.string().required().messages({
        'string.base': 'Student ID should be a type of string',
        'any.required': 'Student ID is required'
    }),
    surName: Joi.string().required().messages({
        'string.base': 'Surname should be a type of string',
        'any.required': 'Surname is required'
    }),
    firstName: Joi.string().required().messages({
        'string.base': 'First name should be a type of string',
        'any.required': 'First name is required'
    }),
    otherName: Joi.string().required().messages({
        'string.base': 'Other name should be a type of string',
        'any.required': 'Other name is required'
    }),
    subject: Joi.string().required().messages({
        'string.base': 'Subject should be a type of string',
        'any.required': 'Subject is required'
    }),
    Class: Joi.string().required().messages({
        'string.base': 'Class should be a type of string',
        'any.required': 'Class is required'
    }),
    term: Joi.string().required().messages({
        'string.base': 'Term should be a type of string',
        'any.required': 'Term is required'
    }),
    test: Joi.string().required().messages({
        'string.base': 'Test should be a type of string',
        'any.required': 'Test is required'
    }), 
    assignment: Joi.string().required().messages({
        'string.base': 'Assignment should be a type of string',
        'any.required': 'Assignment is required'
    }),
    midTermTest: Joi.string().required().messages({
        'string.base': 'Midterm test should be a type of string',
        'any.required': 'Midterm test is required'
    }),
    exam: Joi.string().required().messages({
        'string.base': 'Exam should be a type of string',
        'any.required': 'Exam is required'
    }),
    total:Joi.string().required().messages({
        'string.base': 'Total should be a type of string',
        'any.required': 'Total is required'
    }),
    average:Joi.string().required().messages({
         'string.base': 'Average should be a type of string',
        'any.required': 'Average is required'
    }),
    position:Joi.string().required().messages({
        'string.base': 'Position should be a type of string',
        'any.required': 'Position is required'
    }),
    grade:Joi.string().required().messages({
        'string.base': 'Grade should be a type of string',
        'any.required': 'Grade is required'
    }),
    teacherId: Joi.string().required().messages({
        'string.base': 'Teacher should be a type of string',
        'any.required': 'Teacher is required'
    })
});


export const validateResult = async( studentId, surName, firstName, otherName, subject, Class, term, test, assignment, midTermTest, exam, total, average, position, grade,teacherId ) => {
    try{
        const resultData = {studentId, surName, firstName, otherName, subject, Class, term, test, assignment, midTermTest, exam, total, average, position,grade, teacherId};

        const validatedResult = await resultSchema.validateAsync(resultData);

        return validatedResult;
    }catch(error){
        throw new Error(`Validation error: ${error.message}`);
    }
}
