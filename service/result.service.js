import prisma from '../prisma/dbconnect.js'

const saveResult = async(subject, assignment, test, exam, grade,  gradelevel, classSection, term, teacher, studentId) => {
   try{
    const result = await prisma.Result.create({
        data:{
         subject,
         assignment,
         test,
         exam,
         grade,
         gradelevel,
         classSection,
         term,
         teacher,
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

export { saveResult, viewResultByGradelevelAndTerm, viewingResultsByGradelevelAndTeacher, viewResultByStudentId }