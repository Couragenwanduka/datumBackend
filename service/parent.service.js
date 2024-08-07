import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const saveParent = async (firstName, lastName, relationship, contactNumber, email, password) => {
  try {
    const parent = await prisma.parent.create({
      data: {
        firstName,
        lastName,
        relationship,
        contactNumber,
        email,
        password,
      },
    });
    return parent;
  } catch (error) {
    throw new Error(`Error creating student: ${error.message}`);
  }
};

export const findByEmail = async (email) => {
  try {
    const parent = await prisma.parent.findUnique({
      where: {
        email,
      },
    });
    return parent;
  } catch (error) {
    throw new Error(`Error finding parent: ${error.message}`);
  }
};

export const addStudent = async (email, studentId) => {
  try {
    const parent = await prisma.parent.update({
      where: {
        email,
      },
      data: {
        students: {
          connect: {
            id: studentId,
          },
        },
      },
    });
    console.log(parent);
    return parent;
  } catch (error) {
    throw new Error(`Error adding student: ${error.message}`);
  }
};

export const getStudentsByParentEmail = async (email) => {
  try {
    const parentWithStudents = await prisma.parent.findUnique({
      where: {
        email,
      },
      include: {
        students: true, // Include students related to this parent
      },
    });

    if (!parentWithStudents) {
      throw new Error('Parent not found');
    }
    return parentWithStudents;
  } catch (error) {
    console.error('Error:', error);
    throw new Error(`Error fetching students: ${error.message}`);
  }
};
