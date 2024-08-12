import { readCsv } from "../utils/readCsv.js";
import { validateResult } from "../utils/validator.js";
import { sendSuccessMessage } from "../helper/nodemailer.js";
import { findStudentById } from "../service/student.service.js";
import { sendFailedUploadMessage } from "../helper/nodemailer.js";
import { saveResult, viewResultByGradelevelAndTerm, viewingResultsByGradelevelAndTeacher, viewResultByStudentId } from '../service/result.service.js';

/**
 * This function handles the creation of student results by processing a CSV file uploaded through the request.
 * 
 * The steps involved are as follows:
 * 
 * 1. **File Upload Validation**: 
 *    - Checks if a file has been uploaded through the request. If no file is found, it returns a 400 error response.
 * 
 * 2. **CSV File Parsing**:
 *    - Reads and parses the CSV file into an array of result objects using the `readCsv` utility function.
 * 
 * 3. **Data Validation and Processing**:
 *    - Iterates over the parsed data and performs the following operations for each record:
 *      a. **Validation**: 
 *         - Validates the data using the `validateResult` function. If validation fails, it logs the error and skips the record.
 *      b. **Student Existence Check**: 
 *         - Verifies if the student exists in the database using the `findStudentById` function. If the student is not found, it logs an error and skips the record.
 *      c. **Name Matching**:
 *         - Confirms that the student’s `firstName` and `lastName` match the records in the database. If there is a mismatch, it logs the error and skips the record.
 *      d. **Result Saving**: 
 *         - If all validations pass, the result is saved to the database using the `saveResult` function.
 * 
 * 4. **Error Handling and Response**:
 *    - Collects all invalid records and, if any errors occurred, returns a 400 response with the error details.
 *    - If all records are successfully processed, it returns a 201 response with the saved results.
 * 
 * 5. **Error Logging**:
 *    - In case of any unexpected errors during the process, it logs the error and returns a 500 response indicating an internal server error.
 * 
 * @param {Object} req - The request object containing the uploaded CSV file.
 * @param {Object} res - The response object used to send back the appropriate HTTP response.
 */


export const createResult = async (req, res) => {
  try {

    const {email} = req.body; 
    if (!email) return res.status(400).send('Email is required.');

    const file = req.file;
    if (!file) return res.status(400).send('No file uploaded.');

    const data = await readCsv(file.path);
    const invalidData = [];

    const results = await Promise.all(
      data.map(async (result) => {
        const { firstName, lastName, subject, assignment, test, exam, grade, gradelevel, classSection, term, teacher, studentId } = result;
          const {error} = validateResult( firstName, lastName, subject, assignment, test, exam, grade, gradelevel, classSection, term, teacher, studentId )
          if (error) {
            invalidData.push(`Validation error for student ID: ${studentId}, Error: ${error.message}`);
            return null;
          }
          const match = await findStudentById(studentId);
          if (!match) {
            invalidData.push(`No student found with ID: ${studentId}`);
            return null;
          }

          if (match.firstName !== firstName || match.lastName !== lastName) {
            invalidData.push(`Name mismatch for student ID: ${studentId}`);
            return null;
          }

          return await saveResult(firstName, lastName, subject, assignment, test, exam, grade, gradelevel, classSection, term, teacher, studentId);
      })
    );

    // Filter out null results (errors)
    const successfulResults = results.filter(result => result !== null);

    if (invalidData.length > 0) {
       await sendFailedUploadMessage(email, invalidData)
      return res.status(400).json({ message: "Some records were not processed", errors: invalidData });
    }else{
      await sendSuccessMessage(email, successfulResults.length)
    }

    return res.status(201).json({ message: "Results created successfully", results: successfulResults });
    
  } catch (error) {
    console.log('Error creating result:', error.message);
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
