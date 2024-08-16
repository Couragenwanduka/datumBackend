import prisma from "../prisma/dbconnect.js";

// Create a new subject
export const createSubject = async (name, code) => {
    try {
        const subject = await prisma.subject.create({
            data: {
                name,
                code,
            },
        });
        return subject;
    } catch (error) {
        console.error(`Error creating subject: ${error.message}`);
        throw error;
    }
};

// Get all subjects
export const getAllSubjects = async () => {
    try {
        const subjects = await prisma.subject.findMany();
        return subjects;
    } catch (error) {
        console.error(`Error fetching subjects: ${error.message}`);
        throw error;
    }
};

// Get a subject by ID
export const getSubjectById = async (id) => {
    try {
        const subject = await prisma.subject.findUnique({
            where: { id },
        });
        return subject;
    } catch (error) {
        console.error(`Error fetching subject by ID: ${error.message}`);
        throw error;
    }
};

// Update a subject by ID
export const updateSubject = async (id, name, code) => {
    try {
        const updatedSubject = await prisma.subject.update({
            where: { id },
            data: {
                name,
                code,
            },
        });
        return updatedSubject;
    } catch (error) {
        console.error(`Error updating subject: ${error.message}`);
        throw error;
    }
};

// Delete a subject by ID
export const deleteSubject = async (id) => {
    try {
        await prisma.subject.delete({
            where: { id },
        });
        return { message: "Subject deleted successfully" };
    } catch (error) {
        console.error(`Error deleting subject: ${error.message}`);
        throw error;
    }
};