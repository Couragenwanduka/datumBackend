import { readCsv } from "../utils/readCsv.js";
import fs from 'fs'
import { validateResult } from "../schema/result.joi.js";
import { sendSuccessMessage } from "../helper/nodemailer.js";
import { findStudentById } from "../service/student.service.js";
import { sendFailedUploadMessage } from "../helper/nodemailer.js";
import { saveResult, viewResultByGradelevelAndTerm, viewingResultsByGradelevelAndTeacher, viewResultByStudentId } from '../service/result.service.js';


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
        const { firstName, lastName, subject, assignment, test, exam, grade, gradeLevel, classSection, term, teacher, studentId } = result;
          const {error} = validateResult( firstName, lastName, subject, assignment, test, exam, grade, gradeLevel, classSection, term, teacher, studentId )
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

          if (match.firstName !== firstName || match.lastName !== lastName) {
            invalidData.push(`Name mismatch for student ID: ${studentId}`);
            return null;
          }

          return await saveResult(firstName, lastName, subject, assignment, test, exam, grade, gradeLevel, classSection, term, teacher, id);
      })
    );
    fs.unlink(file.path)
    // Filter out null results (errors)
    const successfulResults = results.filter(result => result !== null);

    if (invalidData.length > 0) {
       await sendFailedUploadMessage(email, invalidData)
       console.log(invalidData)
      return res.status(400).json({ message: "Some records were not processed", errors: invalidData });
    }
    fs.unlink(file.path)

    return res.status(201).json({ message: "Results created successfully", results: successfulResults });
    
  } catch (error) {
    console.log('Error creating result:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};


export const getResultByGradeLevelAndTerm = async(req, res) => {
  try{
    const { gradeLevel, term } = req.params;
    if(gradeLevel === ' '|| term === ' ')  return res.status(400).json({message:'invalid grade level specified'});

    const results = await viewResultByGradelevelAndTerm(gradeLevel, term);
    return results;
  }catch(error){
    console.log('Error getting result:', error.message)
  }

}


export const getResultByStudentId = async(req, res) => {
  try{
    const { studentId } = req.params;
    if(studentId ===' ')  return res.status(400).json({message:'invalid student ID specified'});

    const result = await viewResultByStudentId(studentId);
    return result;
  }catch(error){
    console.log('Error getting result:', error.message)
  }
}


export const getResultByGradelevelAndTeacher = async(req, res) => {
  try{
    const { gradelevel, teacher } = req.params;
    if(gradelevel ===' '|| teacher ===' ')  return res.status(400).json({message:'invalid grade level or teacher specified'});
    
    const results = await viewingResultsByGradelevelAndTeacher(gradelevel, teacher);
    return results;
  }catch(error){
    console.log('Error getting result:', error.message)
  }
}
