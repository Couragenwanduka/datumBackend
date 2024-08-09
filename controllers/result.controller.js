import { readCsv } from "../utils/readCsv.js";
import { saveResult, viewResultByGradelevelAndTerm, viewingResultsByGradelevelAndTeacher, viewResultByStudentId } from '../service/result.service.js';
import { findStudentById } from "../service/student.service.js";

// Create a new result
export const createResult = async (req, res) => {
  try {
    const file = req.file;
    if (!file) return res.status(400).send('No file uploaded.');

    const data = await readCsv(file.path);
    const invalidData = [];

    const results = await Promise.all(
      data.map(async (result) => {
        const { firstName, lastName, subject, assignment, test, exam, grade, gradelevel, classSection, term, teacher, studentId } = result;

        try {
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
        } catch (error) {
          invalidData.push(`Error processing student ID: ${studentId} - ${error.message}`);
          return null;
        }
      })
    );

    // Filter out null results (errors)
    const successfulResults = results.filter(result => result !== null);

    if (invalidData.length > 0) {
      return res.status(400).json({ message: "Some records were not processed", errors: invalidData });
    }

    return res.status(201).json({ message: "Results created successfully", results: successfulResults });
    
  } catch (error) {
    console.log('Error creating result:', error.message);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};
