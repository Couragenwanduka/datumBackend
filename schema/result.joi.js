import Joi from 'joi';

export const resultSchema = Joi.object({
    firstName: Joi.string().required().messages({
        'string.base': 'First name should be a type of string',
        'any.required': 'First name is required'
    }),
    lastName: Joi.string().required().messages({
        'string.base': 'Last name should be a type of string',
        'any.required': 'Last name is required'
    }),
    subject: Joi.string().required().messages({
        'string.base': 'Subject should be a type of string',
        'any.required': 'Subject is required'
    }),
    assignment: Joi.string().required().messages({
        'string.base': 'Assignment should be a type of string',
        'any.required': 'Assignment is required'
    }),
    test: Joi.string().required().messages({
        'string.base': 'Test should be a type of string',
        'any.required': 'Test is required'
    }),   
    exam: Joi.string().required().messages({
        'string.base': 'Exam should be a type of string',
        'any.required': 'Exam is required'
    }),
    grade: Joi.number().required().messages({
        'number.base': 'Grade should be a type of number',
        'any.required': 'Grade is required'
    }),
    gradeLevel: Joi.string().required().messages({
        'string.base': 'Grade level should be a type of string',
        'any.required': 'Grade level is required'
    }),
    classSection: Joi.string().required().messages({
         'string.base': 'classSection should be a type of string',
        'any.required': 'classSection  is required'
    }),
    term: Joi.string().required().messages({
        'string.base': 'Term should be a type of string',
        'any.required': 'Term is required'
    }),
    teacher: Joi.string().required().messages({
        'string.base': 'Teacher should be a type of string',
        'any.required': 'Teacher is required'
    }),
    studentId: Joi.string().required().messages({
        'string.base': 'Student ID should be a type of string',
        'any.required': 'Student ID is required'
    })
});


export const validateResult = async( firstName, lastName, subject, assignment, test, exam, grade, gradeLevel, classSection, term, teacher, studentId ) => {
    try{
        const resultData = {firstName, lastName, subject, assignment, test, exam, grade, gradeLevel, classSection, term, teacher, studentId};

        const validatedResult = await resultSchema.validateAsync(resultData);

        return validatedResult;
    }catch(error){
        throw new Error(`Validation error: ${error.message}`);
    }
}
