import prisma from "../prisma/dbconnect.js";

// Enroll a student in a subject
export const enrollStudent = async (studentId, subjectId) => {
    try {
        const enrollment = await prisma.enrollment.create({
            data: {
                studentId,
                subjectId,
            },
        });
        return enrollment;
    } catch (error) {
        console.error(`Error enrolling student: ${error.message}`);
        throw error;
    }
};

// Get all enrollments
export const getAllEnrollments = async () => {
    try {
        const enrollments = await prisma.enrollment.findMany({
            include: {
                student: true,
                subject: true,
            },
        });
        return enrollments;
    } catch (error) {
        console.error(`Error fetching enrollments: ${error.message}`);
        throw error;
    }
};

// Get enrollment by ID
export const getEnrollmentById = async (id) => {
    try {
        const enrollment = await prisma.enrollment.findUnique({
            where: { id },
            include: {
                student: true,
                subject: true,
            },
        });
        return enrollment;
    } catch (error) {
        console.error(`Error fetching enrollment by ID: ${error.message}`);
        throw error;
    }
};

// Delete an enrollment by ID
export const deleteEnrollment = async (id) => {
    try {
        await prisma.enrollment.delete({
            where: { id },
        });
        return { message: "Enrollment deleted successfully" };
    } catch (error) {
        console.error(`Error deleting enrollment: ${error.message}`);
        throw error;
    }
};