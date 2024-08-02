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

        // Extract and validate parent/guardian data
        const parentGuardianData = {
            studentId: req.body.studentId,
            firstName: req.body.parentFirstName,
            lastName: req.body.parentLastName,
            relationship: req.body.relationship,
            contactNumber: req.body.contactNumber,
            email: req.body.parentEmail,
            occupation: req.body.occupation
        };
        const validatedParentGuardian = await parentGuardianRegistrationSchema.validateAsync(parentGuardianData);

        // Return validated data
        return {
            student: validatedStudent,
            parentGuardian: validatedParentGuardian
        };
    } catch (error) {
        // Handle validation errors
        throw new Error(`Validation error: ${error.message}`);
    }
};
