import prisma from "../prisma/dbconnect.js";

export const createParent = async (parent,hashedPassword) => {
  try {
    const saveedparent = await prisma.parent.create({
      data: {
        firstName:parent.firstName,
        lastName:parent.lastName,
        relationship:parent.relationship,
        contactNumber:parent.contactNumber,
        email:parent.email,
        password:hashedPassword,
      },
    });
    return saveedparent;
  } catch (error) {
    throw new Error(`Error creating parent: ${error.message}`);
  }
};

export const getParentByEmail = async (email) => {
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

export const assignStudentsToParent = async (email, studentIds) => {
  try {
    const parent = await prisma.parent.update({
      where: {
        email,
      },
      data: {
        students: {
          connect: studentIds.map(id => ({ id })),
        },
      },
    });
    return parent;
  } catch (error) {
    throw new Error(`Error adding students: ${error.message}`);
  }
};

export const getStudentsForParent = async (email) => {
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

export const findAllParents = async () => {
  try {
    const parents = await prisma.parent.findMany();
    return parents;
  } catch (error) {
    throw new Error(`Error fetching all parents: ${error.message}`);
  }
};

export const deleteAllParent = async () => {
  try {
    const result = await prisma.parent.deleteMany();
    return result;
  } catch (error) {
    throw new Error(`Error deleting all parents: ${error.message}`);
  }
};
