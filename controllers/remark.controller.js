import { saveRemark } from "../service/remark.service.js";
import { findAllRemarks } from "../service/remark.service.js";
import { findRemarkByStudentId } from "../service/remark.service.js";
import { updateRemark } from "../service/remark.service.js";
import { deleteRemark } from "../service/remark.service.js";
import BadRequest from "../error/error.js";
import { findStudentById } from "../service/student.service.js";
import { findRemarById } from "../service/remark.service.js";


export const createRemark = async(req, res, next) => {
    try{
         const { studentId,remark, Class, term, subject} = req.body;

         const student = await findStudentById(studentId);
         if(!student) throw new BadRequest('Student not found');

         const savedRemark = await saveRemark(studentId, remark, Class, term, subject);

         res.status(201).json(savedRemark);
    }catch(error){
        next(error);
    }
}

export const getAllRemarks = async(req, res, next) => {
    try{
        const remarks = await findAllRemarks();
        res.status(200).json(remarks);
    }catch(error){
        next(error);
    }
}

export const getRemarkByStudentId = async(req, res, next) => {
    try{
        const studentId = req.params.id;
        const remarks = await findRemarkByStudentId(studentId);
        res.status(200).json(remarks);
    }catch(error){
        next(error);
    }
}

export const updateRemarkById = async(req, res, next) => {
    try{
        const { remarkId ,remark, Class, term, subject} = req.body;

        const exisitingRemark = await findRemarById(remarkId);
        if(!exisitingRemark) throw new BadRequest('Remark not found');

        const updatedRemark = await updateRemark(remarkId, remark, Class, term, subject);

        res.status(200).json(updatedRemark);

    }catch(error){
        next(error);
    }
}

export const deleteRemarkById = async(req, res, next) => {
    try{
        const remarkId = req.params.id;

        const exisitingRemark = await findRemarById(remarkId);
        if(!exisitingRemark) throw new BadRequest('Remark not found');

        const deletedRemark = await deleteRemark(remarkId);

        res.status(200).json(deletedRemark);

    }catch(error){
        next(error);
    }
}