import Joi from 'joi';

export const studentRegistrationSchema = Joi.object({
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
});


export const parentGuardianRegistrationSchema = Joi.object({
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

export const teacherSchema = Joi.object({
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
    gradelevel: Joi.string().required().messages({
        'string.base': 'Grade level should be a type of string',
        'any.required': 'Grade level is required'
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


export const linkParentAndStudentSchema = Joi.object({
    email: Joi.string().required().messages({
        'string.base': 'Email should be a type of string',
        'any.required': 'Email is required'
    }),
    studentId: Joi.string().required().messages({
        'string.base': 'Student ID should be a type of string',
        'any.required': 'Student ID is required'
    })  
})