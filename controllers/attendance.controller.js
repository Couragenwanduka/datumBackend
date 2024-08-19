import BadRequest from '../error/error.js';
import { recordAttendance } from '../service/attendance.service.js'; 
import { getAllAttendance } from '../service/attendance.service.js';
import { findAllAttendanceByDate } from '../service/attendance.service.js';
import { updateAttendance } from '../service/attendance.service.js';
import { deleteAttendance } from '../service/attendance.service.js';
import { existingAttendance } from '../service/attendance.service.js';
    

// Create a new Attendance
export const createAttendance = async (req, res, next) => {
    try {
        const { attendance } = req.body;
        
        const existing = await existingAttendance(attendance)
        if(existing) throw new BadRequest('Attendance already exists for this student on this date');
        
        const saveAttendance = await recordAttendance(attendance);
        if(!saveAttendance) throw new BadRequest('An Error has occurred while taking attendance')
        
        res.status(201).json({ message: 'Attendance created successfully'});
    } catch (error) {
       console.error(`Error in createAttendance controller: ${error.message}`);
       next(error)
    }
};

export const getAllAttendances = async(req, res, next) => {
    try{
        const attendants = await getAllAttendance();
        res.status(200).json(attendants);
    }catch(error){
        console.log(error)
        next(error);
    }
}

export const getAllAttendanceByDate = async(req, res, next) => {
    try{
      const {date} = req.params
      const attendants = await findAllAttendanceByDate(date);

      if(!attendants) throw new BadRequest('No attendance records found for the specified date');
      res.status(200).json(attendants);
    }catch(error){
        console.log(error)
        next(error);
    }
}

// Update an Attendance
export const updateStudentAttendance = async (req, res, next) => {
    try {
        const { id, status } = req.params;

        const update = await updateAttendance(id, status);
        if (!update) throw new BadRequest('Attendance not found');

        res.status(200).json({message: 'Attendance updated successfully', subject: updateAttendance });
    } catch (error) {
        console.error(`Error in updateAttendance controller: ${error.message}`);
        next(error);
    }
};

// Delete an Attendance
export const deleteStudentAttendance = async (req, res, next) => {
    try {
        const { id } = req.params;

        const deleteResult = await deleteAttendance(id);
        if (!deleteResult) throw new BadRequest('Attendance not found');

        res.status(200).json({ message: 'Attendance deleted successfully' });
    } catch (error) {
        console.error(`Error in deleteAttendance controller: ${error.message}`);
        next(error);
    }
};