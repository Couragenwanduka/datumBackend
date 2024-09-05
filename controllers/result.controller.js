import { readCsv } from "../utils/readCsv.js";
import fs from 'fs'
import { validateResult } from "../schema/result.joi.js";
import { sendSuccessMessage } from "../helper/nodemailer.js";
import { findStudentById } from "../service/student.service.js";
import { sendFailedUploadMessage } from "../helper/nodemailer.js";
import { saveResult, viewResultByClassAndTerm, viewingResultsByClassAndTeacher, viewResultByStudentId, getAllResults  } from '../service/result.service.js';


export const createResult = async (req, res) => {
  try {

    const {email} = req.body; 
    if (email === ' ') return res.status(400).send('Email is required.');

    const file = req.file;
    if (!file) return res.status(400).send('No file uploaded.');

    const data = await readCsv(file.path);
   
    const invalidData = [];

    const results = await Promise.all(
      data.map(async (result) => {
        const { studentId, surName, firstName, otherName, subject, Class, term, test, assignment, midTermTest, exam, total, average, position, grade,teacherId } = result;
          const {error} = validateResult( studentId, surName, firstName, otherName, subject, Class, term, test, assignment, midTermTest, exam, total, average, position, grade,teacherId )
          if (error) {
            invalidData.push(`Validation error for student ID: ${studentId}, Error: ${error.message}`);
            return null;
          }
          let id = parseInt(studentId, 10);
          const match = await findStudentById(id);
          if (!match) {
            invalidData.push(`No student found with ID: ${studentId}`);
            return null;
          }

          if (match.firstName !== firstName || match.surName !== surName) {
            invalidData.push(`Name mismatch for student ID: ${studentId}`);
            return null;
          }

          return await saveResult(studentId, surName, firstName, otherName, subject, Class, term, test, assignment, midTermTest, exam, total, average, position, grade,teacherId );
      })
    );
    // Filter out null results (errors)
    const successfulResults = results.filter(result => result !== null);

    if (invalidData.length > 0) {
       await sendFailedUploadMessage(email, invalidData)
       console.log(invalidData)
      return res.status(400).json({ message: "Some records were not processed", errors: invalidData });
    }
    fs.unlink(file.path, (err) => {
      if (err) {
          console.error(`Error deleting file: ${err.message}`);
          throw err;
      }
      // Continue with the rest of your code
  });

    return res.status(201).json({ message: "Results created successfully", results: successfulResults });
    
  } catch (error) {
    console.log('Error creating result:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};


export const getResultByClassAndTerm = async(req, res) => {
  try{
    const { gradeLevel, term } = req.params;
    if(gradeLevel === ' '|| term === ' ')  return res.status(400).json({message:'invalid grade level specified'});

    const results = await viewResultByClassAndTerm(gradeLevel, term);
    res.status(200).json({results})
  }catch(error){
    console.log('Error getting result:', error.message)
    return res.status(500).json({ error: 'Internal Server Error' });
  }

}


export const getResultByStudentId = async(req, res) => {
  try{
    const { studentId, Class, term } = req.params;
    console.log(Class)
    if(studentId ===' ' )  return res.status(400).json({message:'invalid student ID specified'});
    if( Class === ' ' )  return res.status(400).json({message:'invalid Class  specified'});
    if( term === '')  return res.status(400).json({message:'invalid Term specified'});

    const result = await viewResultByStudentId(studentId,Class, term);
    res.status(200).json({result})
  }catch(error){
    console.log('Error getting result:', error.message)
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}


export const getResultByClassAndTeacher = async(req, res) => {
  try{
    const { gradelevel, teacher } = req.params;
    if(gradelevel ===' '|| teacher ===' ')  return res.status(400).json({message:'invalid grade level or teacher specified'});
    
    const results = await viewingResultsByClassAndTeacher(gradelevel, teacher);
    res.status(200).json({results})
  }catch(error){
    console.log('Error getting result:', error.message)
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}


export const getAllResult = async(req, res) => {
  try{
    const results = await getAllResults();
    res.status(200).json(results);
  }catch(error){
    console.log('Error getting all results:', error.message)
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
