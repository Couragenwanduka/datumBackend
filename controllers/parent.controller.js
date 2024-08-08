import jwt from 'jsonwebtoken';
import { validateLogin } from "../utils/validator.js";
import { comparePassword } from "../utils/bcrypt.js";
import { findTeacherByEmail } from "../service/admin.service.js";
import { findByEmail, getStudentsByParentEmail } from "../service/parent.service.js";


export const LoginParent = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate the login data
    const { error } = validateLogin(email, password);
    if (error) return res.status(400).json(error.details[0].message);

    // Check if a parent or teacher is registered
    const existingParentGuardian = await findByEmail(email);
    const existingTeacher = await findTeacherByEmail(email);

    // If a parent is found, validate and return student details
    if (existingParentGuardian) {
      // Check password for parent
      const checkPassword = await comparePassword(password, existingParentGuardian.parent.password);
      if (!checkPassword) return res.status(400).json('Invalid password');

      // Get student details
      const parentWithStudents = await getStudentsByParentEmail(email);

      // Create JWT token
      const token = jwt.sign({ id: existingParentGuardian.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

      // Send response for parent
      return res.status(200).send({
        message: 'User successfully logged in',
        students: parentWithStudents,
        token,
      });
    }

    // If a teacher is found, validate and return teacher details
    if (existingTeacher) {
      // Check password for teacher
      const checkPassword = await comparePassword(password, existingTeacher.teacher.password);
      if (!checkPassword) return res.status(400).json('Invalid password');

      // Create JWT token
      const token = jwt.sign({ id: existingTeacher.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

      // Send response for teacher
      return res.status(200).json({
        message: 'User successfully logged in',
        token,
      });
    }

    // If neither parent nor teacher found
    res.status(400).json('User does not exist, please meet the Admin for more information');

  } catch (error) {
    res.status(500).json(`Error logging in: ${error.message}`);
  }
};
