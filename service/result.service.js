import prisma from '../prisma/dbconnect.js'

const saveResult = async(studentId, surName, firstName, otherName, subject, Class, term, test, assignment, midTermTest, exam, total, average, position, grade,teacher ) => {
   try{
    const result = await prisma.result.create({
        data:{
         surName,
         firstName,
         otherName,
         subject,
         class: Class,
         term,
         test,
         assignment,
         midTermTest,
         exam,
         total,
         average,
         position,
         grade, 
         teacher:{
             connect:{
                 id: parseInt(teacher,10),
             },
         },
         student:{
             connect:{
                 id: parseInt(studentId,10),
             },
         }
        }
     })
    return result.id
   }catch(error){
     console.log('Error creating result:', error.message)
   }
}

const viewResultByClassAndTerm = async(Class, term) => {
    try{
        const result = await prisma.Result.findMany({
            where:{
                class:Class,
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

const viewingResultsByClassAndTeacher = async(Class, teacher) => {
  try{
      const result = await prisma.Result.findMany({
          where:{
              class:Class,
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

const viewResultByStudentId = async(studentId,Class,term) => {
    try{
        const result = await prisma.Result.findMany({
            where:{
               studentId: parseInt(studentId,10),
                class: Class,
                term
            },
        })
        return result
    }catch(error){
        console.log('Error viewing results:', error.message)
    }
}

const getAllResults = async() => {
    try{
        const result = await prisma.result.findMany()
        return result
    }catch(error){
        console.log('Error getting all results:', error.message)
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

export { saveResult, viewResultByClassAndTerm, viewingResultsByClassAndTeacher, viewResultByStudentId, deleteAllResults,  getAllResults  }