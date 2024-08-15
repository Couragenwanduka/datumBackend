import prisma from "../prisma/dbconnect.js";
import { generateId } from "../utils/id.js";

const saveAdminstrator = async(admin) =>{
    try{
        const saveData = await prisma.Administrator.create({
            data:{
                id: generateId(),
                firstName: admin.firstName,
                lastName: admin.lastName,
                gender: admin.gender,
                dateOfBirth: new Date(admin.dateOfBirth),
                email:admin.email,
                password: admin.hashedPassword,
                contactNumber: admin.contactNumber,
                currentAddress: admin.currentAddress,
                permanentAddress: admin.permanentAddress,
                subject: admin.subject,
                hireDate:admin.hireDate,
                qualification:admin.qualification,
                photo:admin.photo,
                role:admin.role,
            }
        });
        return saveData;
    }catch(error){
        throw new Error(`Error creating admin: ${error.message}`);
    }
}

const findTeacherByEmail =async(email) => {
    try{
      const teacher = await prisma.Administrator.findUnique({
         where: {
           email,
         },
       })
       return teacher;
    }catch(error){
      throw new Error(`Error finding teacher: ${error.message}`);
    }
 }

const findAllTeachers = async() => {
    try{
        const teachers = await prisma.Administrator.findMany({
          where: {
            role: 'teacher',
          }
        });
        return teachers;
      }catch(error){
        throw new Error(`Error finding all teachers: ${error.message}`);
      }
}

const deleteAllAdmin = () => {
  try {
    const result = prisma.Administrator.deleteMany();
    return result;
  } catch (error) {
    throw new Error(`Error deleting all parents: ${error.message}`);
  }
}

export { saveAdminstrator, findTeacherByEmail, findAllTeachers, deleteAllAdmin};