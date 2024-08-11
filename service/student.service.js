import prisma from "../prisma/dbconnect.js";

export const saveStudent = async (firstName, lastName, dateOfBirth, gender, nationality, currentAddress, permanentAddress, enrollmentDate, gradeLevel, classSection, photo, parentEmail) => {
    try {
        const student = await prisma.student.create({
            data: {
                firstName,
                lastName,
                dateOfBirth: new Date(dateOfBirth),
                gender,
                nationality,
                currentAddress,
                permanentAddress,
                enrollmentDate: new Date(enrollmentDate),
                gradeLevel,
                classSection,
                photo, 
                parent: {
                    connect: {
                        email: parentEmail, 
                    },
                },
            },
        });
        return student.id;
    } catch (error) {
        throw new Error(`Error creating student: ${error.message}`);
    }
}