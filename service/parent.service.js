import prisma from "../prisma/dbconnect.js";

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

export const findAllParents = () => {
  try {
    const parents = prisma.parent.findMany();
    return parents;
  } catch (error) {
    throw new Error(`Error fetching all parents: ${error.message}`);
  }
}

export const deleteAllParent = () => {
  try {
    const result = prisma.parent.deleteMany();
    return result;
  } catch (error) {
    throw new Error(`Error deleting all parents: ${error.message}`);
  }
}