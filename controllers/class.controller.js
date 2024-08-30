import { createClass } from "../service/class.service.js";
import { findAllClasses } from "../service/class.service.js";
import { findClassByName } from "../service/class.service.js";
import { deleteClass } from "../service/class.service.js";
import BadRequest from "../error/error.js";


export const createClassController = async(req, res, next) => {
    try{
        const { name } = req.body;

        const exisitingClass = await findClassByName(name);
        if(exisitingClass) throw new BadRequest('Class already exists');

        const createdClass = await createClass(name);
        if(!createdClass) throw new BadRequest('Failed to create class');
        res.status(201).json(createdClass);
    }catch(error){
        next(error);
    }
}

export const getAllClassesController = async(req, res, next) => {
    try{
        const classes = await findAllClasses();
        if(!classes) throw new BadRequest('No classes found');
        res.json(classes);
    }catch(error){
        next(error);
    }
}

export const deleteAClass = async(req, res, next) => {
    try{
        const { name } = req.params;

        const deletedClass = await deleteClass(name);
        if(!deletedClass) throw new BadRequest('Failed to delete class');
        res.json(deletedClass);
    }catch(error){
        next(error);
    }
}