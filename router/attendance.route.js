import express from 'express';
const router = express.Router();
import { createAttendance } from '../controllers/attendance.controller.js';
import { getAllAttendance } from '../controllers/attendance.controller.js';
import { getAttendanceById } from '../controllers/attendance.controller.js';
import { updateAttendance } from '../controllers/attendance.controller.js';
import { deleteAttendance } from '../controllers/attendance.controller.js';

// Create a new subject
router.post('/createAttendance', createAttendance);
router.get('/getAllAttendance', getAllAttendance);
router.get('/getAttendanceById', getAttendanceById);
router.put('/updateAttendance', updateAttendance);
router.put('/deleteAttendance', deleteAttendance);

export default router;