import { deleteAllAdmin } from "../service/admin.service.js"
import { deleteAllParent } from "../service/parent.service.js"
import { deleteAllStudent } from "../service/student.service.js"
import { deleteAllResults } from "../service/result.service.js"
import { deleteAllFeedback } from "../service/feedback.service.js"

export const deleteEverything = async(req, res) => {
    try{
      // await deleteAllResults()
      // await deleteAllStudent()
      // await deleteAllParent()
      // await deleteAllAdmin()
      await deleteAllFeedback()

      res.status(200).json('Everything deleted successfully')
    }catch(error){
        console.log('Error deleting everything:', error.message)
        res.status(500).json({message: 'Internal Server Error'})
    }
}