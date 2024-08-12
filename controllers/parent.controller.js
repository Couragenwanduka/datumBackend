import jwt from 'jsonwebtoken';
import { comparePassword } from "../utils/bcrypt.js";
import { validateLogin } from "../utils/validator.js";
import { addStudent,findAllParents, deleteAllParent } from '../service/parent.service.js';
import { findTeacherByEmail } from "../service/admin.service.js";
import { validateLinkParentAndStudent } from '../utils/validator.js';
import { findByEmail, getStudentsByParentEmail } from "../service/parent.service.js";

/**
 * This function handles the login process for both parent guardians and teachers.
 * It performs the following key steps:
 * 
 * 1. **Extract Data from Request**:
 *    - Extracts the `email` and `password` from the request body.
 * 
 * 2. **Input Validation**:
 *    - Validates the login credentials using the `validateLogin` function. If validation fails, it returns a 400 error response with the validation message.
 * 
 * 3. **User Lookup**:
 *    - Checks if the email belongs to an existing parent guardian using the `findByEmail` function.
 *    - If not found, it checks if the email belongs to an existing teacher using the `findTeacherByEmail` function.
 * 
 * 4. **Parent Guardian Login**:
 *    - If the email belongs to a parent guardian, it compares the provided password with the stored hashed password using the `comparePassword` function.
 *    - If the password is incorrect, it returns a 400 error response.
 *    - If the password is correct, it retrieves the parent guardian's students using `getStudentsByParentEmail` and generates a JWT token.
 *    - Returns a 200 response with the parent guardian's information, their students, and the token.
 * 
 * 5. **Teacher Login**:
 *    - If the email belongs to a teacher, it compares the provided password with the stored hashed password using the `comparePassword` function.
 *    - If the password is incorrect, it returns a 400 error response.
 *    - If the password is correct, it generates a JWT token.
 *    - Returns a 200 response with the teacher's information and the token.
 * 
 * 6. **User Not Found**:
 *    - If the email does not match any parent guardian or teacher, it returns a 400 error response indicating that the user does not exist.
 * 
 * 7. **Error Handling**:
 *    - In case of any unexpected errors during the login process, it returns a 500 error response with the error message.
 * 
 * @param {Object} req - The request object containing the email and password in the body.
 * @param {Object} res - The response object used to send back the appropriate HTTP response.
 */

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const { error } = validateLogin(email, password);
    if (error) return res.status(400).json(error.details[0].message);

    const existingParentGuardian = await findByEmail(email);
    const existingTeacher = await findTeacherByEmail(email);

    if (existingParentGuardian) {

      const checkPassword = await comparePassword(password, existingParentGuardian.password);
      if (!checkPassword) return res.status(400).json('Invalid password');

      const parentWithStudents = await getStudentsByParentEmail(email);

      const token = jwt.sign({ id: existingParentGuardian.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

      return res.status(200).send({
        message: 'User successfully logged in',
        parent: parentWithStudents,
        token,
      });
    }

    if (existingTeacher) {

      const checkPassword = await comparePassword(password, existingTeacher.teacher.password);
      if (!checkPassword) return res.status(400).json('Invalid password');

      const token = jwt.sign({ id: existingTeacher.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

      return res.status(200).json({
        message: 'User successfully logged in',
        Adminstrator:existingTeacher,
        token,
      });
    }
    res.status(400).json('User does not exist, please meet the Admin for more information');

  } catch (error) {
    res.status(500).json(`Error logging in: ${error.message}`);
  }
};

export const linkstudentToParent = async(res, req) => {
    try {
      const { email, studentId } = req.body;

      const { error } = validateLinkParentAndStudent(email, studentId);
      if (error) return res.status(400).json(error.details[0].message);

      const parent = await addStudent(email, studentId);
      return res.status(200).json({ message: 'Student linked successfully', parent });
    } catch (error) {
      console.log('Error linking student:', error.message);
      res.status(500).json(`Error linking student: ${error.message}`);
    }
}

export const deleteAllParents = async(req, res) => {
  try {
    await deleteAllParent();
    return res.status(200).json({ message: 'All parents deleted successfully' });
  } catch (error) {
    console.log('Error deleting all parents:', error.message);
    res.status(500).json(`Error deleting all parents: ${error.message}`);
  }
}
export const getAllParents = async (req, res) => {
  try {
    const parents = await findAllParents();
    return res.status(200).json(parents);
  } catch (error) {
    console.log('Error getting all parents:', error.message);
    res.status(500).json(`Error getting all parents: ${error.message}`);
  }
}



