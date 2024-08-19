import express from 'express';
const attendanceRouter = express.Router();
import { createAttendance } from '../controllers/attendance.controller.js';
import { validator } from '../middlewares/validator.middleware.js';
import { idSchema } from '../schema/user.joi.js';
import { dateSchema } from '../schema/attendance.joi.js';
import { updateAttendanceSchema } from '../schema/attendance.joi.js';
import { validateAttendanceSChema } from '../schema/attendance.joi.js';
import { getAllAttendances } from '../controllers/attendance.controller.js';
import { getAllAttendanceByDate } from '../controllers/attendance.controller.js';
import { updateStudentAttendance, deleteStudentAttendance } from '../controllers/attendance.controller.js';

// Record attendance for a student
attendanceRouter.post('/attendance', [validator(validateAttendanceSChema)], createAttendance);

// // Get all attendance records
attendanceRouter.get('/attendance', getAllAttendances);

// // Get an attendance record by ID
attendanceRouter.get('/attendance/:id', [validator(dateSchema)], getAllAttendanceByDate);

// // Update an attendance record by ID
attendanceRouter.patch('/attendance/:id', [validator(updateAttendanceSchema)], updateStudentAttendance);

// // Delete an attendance record by ID
attendanceRouter.delete('/attendance/:id',[validator(idSchema)], deleteStudentAttendance);

export default attendanceRouter;