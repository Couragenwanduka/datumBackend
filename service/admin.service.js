import prisma from "../prisma/dbconnect.js";
import { generateId } from "../utils/id.js";

const saveAdminstrator = async(admin) =>{
    try{
        const savedData = await prisma.Administrator.create({
            data:{
                id:generateId(),
                surName: admin.surName,
                firstName: admin.firstName,
                otherName: admin.otherName,
                gender:admin.gender,
                bloodGroup:admin.bloodGroup,
                dateOfBirth: new Date(admin.dateOfBirth),
                nationality: admin.nationality,
                email: admin.email,
                password: admin.hashedPassword,
                phoneNumber: admin.phoneNumber,
                address: admin.address,
                stateOfOrign: admin.stateOfOrigin,
                localGovernment: admin.localGovernment,
                employmentRole: admin.employmentRole,
                employmentDate: new Date(),
                qualification: admin.qualification,
                picture: admin.photo,
                role: admin.role,
                gradeLevel: admin.gradeLevel,
                step: admin.step
            }
        });
        return savedData;
    }catch(error){
        throw new Error(`Error creating admin: ${error.message}`);
    }
}

const findTeacherByEmail = async(email) => {
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