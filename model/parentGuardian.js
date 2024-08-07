import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createParentTable = async(firstName, lastName, relationship, contactNumber, email, password) => {
    try {
        const parent = await prisma.student.create({
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
        console.error(`Error creating student: ${error.message}`);
        throw error;
    }
}

export const findByEmail = async(email) => {
  try {
    const parent = await prisma.student.findUnique({
      where: {
        email,
      },
    });
    return parent;
  } catch (error) {
    console.error(`Error finding parent: ${error.message}`);
    throw error;
  }
}