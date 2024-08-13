import { studentRegistrationSchema, parentGuardianRegistrationSchema, LoginSchema, teacherSchema, resultSchema, linkParentAndStudentSchema} from "./joi.js";

export const validateRegistration = async (req) => {
    try {
        // Extract and validate student data
        const studentData = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            dateOfBirth: req.body.dateOfBirth,
            gender: req.body.gender,
            nationality: req.body.nationality,
            currentAddress: req.body.currentAddress,
            permanentAddress: req.body.permanentAddress,
            phone: req.body.phone,
            email: req.body.email,
            photo: req.body.photo,
            enrollmentDate: req.body.enrollmentDate,
            gradeLevel: req.body.gradeLevel,
            classSection: req.body.classSection
        };
        const validatedStudent = await studentRegistrationSchema.validateAsync(studentData);

        return  validatedStudent
            
    } catch (error) {
        throw new Error(`Validation error: ${error.message}`);
    }
};

export const validateParentGuardian = async (firstName, lastName, relationship, contactNumber, email) => {
    try {
        // Create the data object to be validated
        const parentGuardianData = { firstName, lastName, relationship, contactNumber, email};

        // Validate the parent/guardian data using Joi schema
        const validatedParentGuardian = await parentGuardianRegistrationSchema.validateAsync(parentGuardianData);

        return validatedParentGuardian;
    } catch (error) {
        throw new Error(`Validation error: ${error.message}`);
    }
};

export const validateLogin = async(email, password) => {
    try{
       const loginData = {email, password};

       const login = await LoginSchema.validateAsync(loginData);

       return login
    }catch(error) {
        throw new Error(`Validation error: ${error.message}`);
    }
}

export const validateTeacher = async(firstName, lastName, gender, dateOfBirth, email, contactNumber, currentAddress, permanentAddress, subject, hireDate, qualification, photo, role) => {
   try{
        const teacherData = {firstName, lastName, gender, dateOfBirth, email, contactNumber, currentAddress, permanentAddress, subject, hireDate, qualification, photo, role};

        const validatedTeacher = await teacherSchema.validateAsync(teacherData);

        return validatedTeacher;
   }catch(error){
     throw new Error(`Validation error: ${error.message}`);
   }
}

export const validateResult = async( firstName, lastName, subject, assignment, test, exam, grade, gradeLevel, classSection, term, teacher, studentId ) => {
    try{
        const resultData = {firstName, lastName, subject, assignment, test, exam, grade, gradeLevel, classSection, term, teacher, studentId};

        const validatedResult = await resultSchema.validateAsync(resultData);

        return validatedResult;
    }catch(error){
        throw new Error(`Validation error: ${error.message}`);
    }
}

export const validateLinkParentAndStudent = async(studentId, parentGuardianId) => {
    try{
        const linkData = {studentId, parentGuardianId};

        const validatedLink = await linkParentAndStudentSchema.validateAsync(linkData);

        return validatedLink;
    }catch(error){
        throw new Error(`Validation error: ${error.message}`);
    }
}