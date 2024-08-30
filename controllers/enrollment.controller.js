import { createEnrollments } from "../service/enrollment.service.js";
import { getAllEnrollment } from "../service/enrollment.service.js";
import { deleteEnrollment } from "../service/enrollment.service.js";
import { getEnrollmentByStudentId } from "../service/enrollment.service.js";
import BadRequest from "../error/error.js";


export const createEnrollmentController = async(req, res, next) => {
    try{
        const { studentId, classId, tierId, academicYear } = req.body;

        const existingEnrollment = await getEnrollmentByStudentId(studentId, classId, academicYear);
        if(existingEnrollment) throw new BadRequest('Enrollment already exists');

        const createdEnrollment = await createEnrollments(studentId, classId, tierId, academicYear);
        res.status(201).json(createdEnrollment);
    }catch(error){
        next(error);
    }
}

export const getAllEnrollmentsController = async(req, res, next) => {
    try{
        const enrollments = await getAllEnrollment();
        if(!enrollments) throw new BadRequest('No enrollments found');
        res.json(enrollments);
    }catch(error){
        next(error);
    }
}

export const deleteEnrollmentController = async(req, res, next) => {
    try{
        const { studentId, classId, academicYear } = req.params;

        const deletedEnrollment = await deleteEnrollment(studentId, classId, academicYear);
        res.status(200).json(deletedEnrollment);
    }catch(error){
        next(error);
    }
}