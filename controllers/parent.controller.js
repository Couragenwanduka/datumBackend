import jwt from 'jsonwebtoken';
import { comparePassword } from "../utils/bcrypt.js";
import { assignStudentsToParent, findAllParents,  deleteAllParent } from '../service/parent.service.js';
import { findTeacherByEmail } from "../service/admin.service.js";
import { getParentByEmail,  getStudentsForParent } from "../service/parent.service.js";
import BadRequest from "../error/error.js";

export const Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const existingParentGuardian = await getParentByEmail(email);
    const existingTeacher = await findTeacherByEmail(email);

    if (existingParentGuardian) {
      const checkPassword = await comparePassword(password, existingParentGuardian.password);
      if (!checkPassword) throw new BadRequest('Invalid password');

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
      if (!checkPassword) throw new BadRequest('Invalid password');

      const token = jwt.sign({ id: existingTeacher.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

      return res.status(200).json({
        message: 'User successfully logged in',
        Administrator: existingTeacher,
        token,
      });
    }

    throw new BadRequest('User does not exist, please meet the Admin for more information');
  } catch (error) {
    next(error);
  }
};

export const linkStudentToParent = async (req, res, next) => {
  try {
    const { email, studentId } = req.body;
    const parent = await assignStudentsToParent(email, studentId);
    return res.status(200).json({ message: 'Student linked successfully', parent });
  } catch (error) {
    console.log('Error linking student:', error.message);
    next(error);
  }
};

export const deleteAllParents = async (req, res, next) => {
  try {
    await deleteAllParent();
    return res.status(200).json({ message: 'All parents deleted successfully' });
  } catch (error) {
    console.log('Error deleting all parents:', error.message);
   next(error);
  }
};

export const getAllParents = async (req, res, next) => {
  try {
    const parents = await findAllParents();
    return res.status(200).json(parents);
  } catch (error) {
    console.log('Error getting all parents:', error.message);
    next(error);
  }
};
