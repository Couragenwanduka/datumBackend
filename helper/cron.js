import cron from 'node-cron';
import { findAllStudents, updateAllstudent } from '../service/student.service.js';

/**
 * Schedules a task to automatically promote students to the next grade level and term
 * at the end of specific months (May 1st, September 1st, and December 1st).
 * 
 * This function uses the `node-cron` library to set up a cron job that runs at midnight
 * on the 1st day of May, September, and December. It performs the following steps:
 * 
 * 1. **Fetch All Students**:
 *    - Retrieves a list of all students from the database using `findAllStudents`.
 * 
 * 2. **Promote Each Student**:
 *    - Iterates over each student and updates their grade level and term based on their current term:
 *      - If the term is `'Third-Term'`, the student is promoted to the next grade level and the term is reset to `'First-Term'`.
 *      - If the term is `'First-Term'`, it is updated to `'Second-Term'`.
 *      - If the term is `'Second-Term'`, it is updated to `'Third-Term'`.
 * 
 * 3. **Update Database**:
 *    - Updates each student's record in the database with the new grade level and term using `updateAllstudent`.
 * 
 * 4. **Error Handling**:
 *    - Catches and logs any errors that occur during the process.
 * 
 * This function is intended to automate the promotion process, ensuring that all students are correctly advanced to the next grade level and term according to the academic calendar.
 */
const promoteStudents = async () => {
    cron.schedule('0 0 1 5,9,12 *', async () => {
        try {
            const students = await findAllStudents();

            for (const student of students) {
                let { gradeLevel, term } = student;

                // Promotion logic
                if (term === 'Third-Term') {
                    gradeLevel += 1;
                    term = 'First-Term';
                } else if (term === 'First-Term') {
                    term = 'Second-Term';
                } else if (term === 'Second-Term') {
                    term = 'Third-Term';
                }

                // Update student with new grade level and term
                await updateAllstudent(student.id, gradeLevel, term);
            }

            console.log('Students promoted successfully');

        } catch (error) {
            console.log('Error promoting students:', error.message);
        }
    });
};

export default promoteStudents;
