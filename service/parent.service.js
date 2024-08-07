import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const saveParent = async(firstName, lastName, relationship, contactNumber, email, password) => {
    try {
        const parent = await prisma.parent.create({
            data: {
              firstName, 
              lastName, 
              relationship, 
              contactNumber,
              email, 
              password
            },
        });
        return parent;
    } catch (error) {
        throw new Error (`Error creating student: ${error.message}`)
    }
}

export const findByEmail = async(email) => {
  try {
    const parent = await prisma.parent.findUnique({
      where: {
        email,
      },
    });
    return parent;
  } catch (error) {
    throw new Error (`Error finding parent: ${error.message}`);
  }
}

export const addStudent = async (email, studentId) => {
    try {
        const parent = await prisma.parent.update({
            where: {
                email,
            },
            data: {
                students: {
                    connect: {
                        id: studentId
                    }
                }
            }
        });
        return parent;
    } catch (error) {
        throw new Error(`Error adding student: ${error.message}`);
    }
};
