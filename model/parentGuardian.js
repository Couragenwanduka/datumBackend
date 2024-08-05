import pool from '../db/connectDb.js';

const createParentsTable = `
   CREATE TABLE IF NOT EXISTS parents (
     parentId serial primary key
     firstName VARCHAR(50) NOT NULL,
     lastName VARCHAR(50) NOT NULL,
     relationship VARCHAR(50) NOT NULL,
     contactNumber VARCHAR(20) NOT NULL,
     email VARCHAR(100) NOT NULL,
     password VARCHAR(255) NOT NULL,
     studentId VARCHAR(255)[] NOT NULL,
);`;
    
export const createTable = async () => {
    const client = await pool.connect();
    try {
      await client.query(createParentsTable);
      console.log('Table "parents" created successfully or already exists');
    } catch (err) {
      console.error('Error creating table', err.stack);
    } finally {
      client.release();
    }
  };

export const insertParentQuery = `
  INSERT INTO parents(
   firstName, lastName, relationship, contactNumber, email, password, student_id
  ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
  RETURNING *;
`;

export const insertParent = async (parentData) => {
    const client = await pool.connect();
    try {
      const res = await client.query(insertParentQuery, parentData);
      return res.rows[0];
    } catch (err) {
      console.error('Error inserting parent', err.stack);
    } finally {
      client.release();
    }
  };

  export const findParentByEmail = async (email) => {
    const client = await pool.connect();
    try {
      const res = await client.query('SELECT * FROM parents WHERE email = $1', [email]);
      return res.rows[0];
    } catch (err) {
      console.error('Error finding parent by email', err.stack);
    } finally {
      client.release();
    }
  };

  export const addStudentToParent = async (email, newStudentId) => {
    const client = await pool.connect();
    try {
      // Begin a transaction
      await client.query('BEGIN');
  
      // Find the parent by email
      const findParentQuery = 'SELECT * FROM parents WHERE email = $1';
      const parentResult = await client.query(findParentQuery, [email]);
  
      if (parentResult.rows.length === 0) {
        throw new Error('Parent not found');
      }
  
      const parent = parentResult.rows[0];
  
      // Update the student_id array
      const updateParentQuery = `
        UPDATE parents
        SET student_id = array_append(student_id, $1)
        WHERE email = $2
        RETURNING *;
      `;
      const updateResult = await client.query(updateParentQuery, [newStudentId, email]);
  
      // Commit the transaction
      await client.query('COMMIT');
  
      return updateResult.rows[0];
    } catch (err) {
      // Rollback the transaction in case of error
      await client.query('ROLLBACK');
      throw new Error(`Error adding student to parent: ${err.message}`);
    } finally {
      client.release();
    }
  };