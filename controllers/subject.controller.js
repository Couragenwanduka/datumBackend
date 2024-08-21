import { saveSubject } from "../service/subject.service.js";
import { findAllSubjects } from "../service/subject.service.js";
import { findSubjectById } from "../service/subject.service.js";
import { updateSubject } from "../service/subject.service.js";
import { deleteSubject } from "../service/subject.service.js";
import BadRequest from "../error/error.js";

export const createSubject = async(req, res, next) => {
    try{
       const {name, classLevel} = req.body;

       const savedSubject = await saveSubject(name, classLevel);
        if(!savedSubject) throw new BadRequest('Failed to save subject');

        res.status(201).json(savedSubject);
    }catch(error){
         next(error);
    }
}

export const getAllSubjects = async(req, res, next) => {
    try{
       const subjects = await findAllSubjects();

       res.status(200).json(subjects);
    }catch(error){
        next(error);
    }
}

export const getSubjectById = async(req, res, next) => {
    try{
       const subjectId = req.params.id;

       const subject = await findSubjectById(subjectId);
       if(!subject) throw new BadRequest('Subject not found');

       res.status(200).json(subject);
    }catch(error){
        next(error);
    }
}

export const updateSubjectById = async(req, res, next) => {
    try{
       const {subjectId ,name, classLevel} = req.body;

       const subject = await findSubjectById(subjectId);
       if(!subject) throw new BadRequest('Subject not found');

       const updatedSubject = await updateSubject(subjectId, name, classLevel);
       if(!updatedSubject) throw new BadRequest('Failed to update subject');

       res.status(200).json(updatedSubject);
    }catch(error){
        next(error);
    }
}

export const deleteSubjectById = async(req, res, next) => {
    try{
       const subjectId = req.params.id;

       const subject = await findSubjectById(subjectId);
       if(!subject) throw new BadRequest('Subject not found');

       const deletedSubject = await deleteSubject(subjectId);

       res.status(200).json(deletedSubject);
    }catch(error){
        next(error);
    }
}