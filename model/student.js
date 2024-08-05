import pool from '../db/connectDb.js';

const createStudentsTableQuery = `
  CREATE TABLE IF NOT EXISTS students (
    studentId SERIAL PRIMARY KEY,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    dateOfBirth DATE NOT NULL,
    gender VARCHAR(10) NOT NULL,
    nationality VARCHAR(50) NOT NULL,
    currentAddress TEXT NOT NULL,
    permanentAddress TEXT NOT NULL,
    enrollmentDate Text NOT NULL,
    gradeLevel NOT NULL,
    classSection NOT NULL,
    photo TEXT
  );
`;
const insertStudentQuery = `
  INSERT INTO students(
    firstName, lastName, dateOfBirth, gender, nationality, currentAddress, permanentAddress, photo
  ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
  RETURNING studentId;
`;

export const createTable = async () => {
    const client = await pool.connect();
    try {
      await client.query(createStudentsTableQuery);
      console.log('Table "students" created successfully or already exists');
    } catch (err) {
      console.error('Error creating table', err.stack);
    } finally {
      client.release();
    }
  };

  export const insertStudent = async (studentData) => {
    const client = await pool.connect();
    try {
      const res = await client.query(insertStudentQuery, studentData);
      return res.rows[0];
    } catch (err) {
      console.error('Error inserting student', err.stack);
    } finally {
      client.release();
    }
  };