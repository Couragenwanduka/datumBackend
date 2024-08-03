import { studentRegistrationSchema, parentGuardianRegistrationSchema } from "./joi";

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

export const validateParentGuardian = async (firstName, lastName, relationship, contactNumber, email, password) => {
    try {
        // Create the data object to be validated
        const parentGuardianData = { firstName, lastName, relationship, contactNumber, email, password };

        // Validate the parent/guardian data using Joi schema
        const validatedParentGuardian = await parentGuardianRegistrationSchema.validateAsync(parentGuardianData);

        return validatedParentGuardian;
    } catch (error) {
        throw new Error(`Validation error: ${error.message}`);
    }
};