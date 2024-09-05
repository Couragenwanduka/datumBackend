import { generateFeedback } from "../service/feedback.service.js";
import { getAllFeedbackOnMongoDb } from "../service/feedback.service.js";
import { getAllFeedbackOnPostgres } from "../service/feedback.service.js";
import { getFeedbackByStudentIdAndTermOnMongodb } from "../service/feedback.service.js";
import { getFeedbackByStudentIdAndTermOnPostgress } from "../service/feedback.service.js";
import BadRequest from "../error/error.js";


export const createFeedback = async(req, res, next) => {
    try{
        const {term, email} = req.body;

        const feedback = await generateFeedback(term,email);
        res.status(200).send({message:"Feedback System initiated successfully"})
    }catch(error){
        next(error);
    }
}

export const getAllFeedback = async(req, res, next) => {
    try{

        const {term} = req.body;
        const feedbackOnMongoDb = await getAllFeedbackOnMongoDb(term);
        const feedbackOnPostgres = await getAllFeedbackOnPostgres(term);

        if(feedbackOnMongoDb.length === 0 && feedbackOnPostgres.length === 0){
            throw new BadRequest("No feedback found")
        }

        res.status(200).json({feedbackOnMongoDb, feedbackOnPostgres})
    }catch(error){
        next(error);
    }
}


export const getFeedbackByStudentIdAndTerm = async(req, res, next) => {
    try{
        const {studentId, term, Class} = req.params;

        // const feedbackOnMongoDb = await getFeedbackByStudentIdAndTermOnMongodb(studentId, Class,term);
        const feedbackOnPostgres = await getFeedbackByStudentIdAndTermOnPostgress(studentId, Class,term);

        res.status(200).json({ feedbackOnPostgres})
    }catch(error){
        next(error);
    }
}
