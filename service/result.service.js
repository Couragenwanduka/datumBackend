import prisma from '../prisma/dbconnect.js'

const saveResult = async(firstName, lastName, subject, assignment, test, exam, grade, gradeLevel, classSection, term, teacher, studentId) => {
   try{
    const result = await prisma.result.create({
        data:{
         firstName,
         lastName,
         subject,
         assignment,
         test,
         exam,
         grade,
         gradeLevel,
         classSection,
         term,
         teacher:{
             connect:{
                 email: teacher,
             },
         },
         student:{
             connect:{
                 id: studentId,
             },
         }
        }
     })
    return result.id
   }catch(error){
     console.log('Error creating result:', error.message)
   }
}

const viewResultByGradelevelAndTerm = async(gradelevel, term) => {
    try{
        const result = await prisma.Result.findMany({
            where:{
                gradelevel,
                term,
            },
            include:{
                student:{
                    include:{
                        parent:true,
                    },
                },
            },
        })
        return result
    }catch(error){
        console.log('Error viewing results:', error.message)
    }
}

const viewingResultsByGradelevelAndTeacher = async(gradelevel, teacher) => {
  try{
      const result = await prisma.Result.findMany({
          where:{
              gradelevel,
              teacher,
          },
          include:{
              student: true,
          },
      })
      return result
  }catch(error){
      console.log('Error viewing results:', error.message)
  }
}

const viewResultByStudentId = async(studentId) => {
    try{
        const result = await prisma.Result.findMany({
            where:{
                studentId,
            },
            include:{
                student:{
                    include:{
                        parent:true,
                    },
                },
            },
        })
        return result
    }catch(error){
        console.log('Error viewing results:', error.message)
    }
}

const deleteAllResults = async() => {
    try{
        await prisma.result.deleteMany()
        console.log('All results deleted successfully')
    }catch(error){
        console.log('Error deleting all results:', error.message)
    }
}

export { saveResult, viewResultByGradelevelAndTerm, viewingResultsByGradelevelAndTeacher, viewResultByStudentId, deleteAllResults }