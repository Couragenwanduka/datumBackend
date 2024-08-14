import jwt from 'jsonwebtoken';
import { comparePassword } from "../utils/bcrypt.js";
import { assignStudentsToParent, findAllParents,  deleteAllParent } from '../service/parent.service.js';
import { findTeacherByEmail } from "../service/admin.service.js";
import { getParentByEmail,  getStudentsForParent } from "../service/parent.service.js";

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingParentGuardian = await getParentByEmail(email);
    const existingTeacher = await findTeacherByEmail(email);

    if (existingParentGuardian) {
      const checkPassword = await comparePassword(password, existingParentGuardian.password);
      if (!checkPassword) return res.status(400).json('Invalid password');

      const parentWithStudents = await getStudentsForParent(email);
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
        Administrator: existingTeacher,
        token,
      });
    }

    res.status(400).json('User does not exist, please meet the Admin for more information');
  } catch (error) {
    res.status(500).json(`Error logging in: ${error.message}`);
  }
};

export const linkStudentToParent = async (req, res) => {
  try {
    const { email, studentId } = req.body;
    const parent = await assignStudentsToParent(email, studentId);
    return res.status(200).json({ message: 'Student linked successfully', parent });
  } catch (error) {
    console.log('Error linking student:', error.message);
    res.status(500).json(`Error linking student: ${error.message}`);
  }
};

export const deleteAllParents = async (req, res) => {
  try {
    await deleteAllParent();
    return res.status(200).json({ message: 'All parents deleted successfully' });
  } catch (error) {
    console.log('Error deleting all parents:', error.message);
    res.status(500).json(`Error deleting all parents: ${error.message}`);
  }
};

export const getAllParents = async (req, res) => {
  try {
    const parents = await findAllParents();
    return res.status(200).json(parents);
  } catch (error) {
    console.log('Error getting all parents:', error.message);
    res.status(500).json(`Error getting all parents: ${error.message}`);
  }
};
