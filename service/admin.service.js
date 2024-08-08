import prisma from "../prisma/dbconnect.js";

const saveAdminstrator = async(firstName, lastName, gender, dateOfBirth, email, password, contactNumber, currentAddress, permanentAddress, subject, hireDate, qualification, photo, role) =>{
    try{
        const admin = await prisma.Administrator.create({
            data:{
                firstName,
                lastName,
                gender,
                dateOfBirth: new Date(dateOfBirth),
                email,
                password,
                contactNumber,
                currentAddress,
                permanentAddress,
                subject,
                hireDate,
                qualification,
                photo,
                role,
            }
        });
        return admin.id;
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

export { saveAdminstrator, findTeacherByEmail };