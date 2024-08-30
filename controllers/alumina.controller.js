import { createAlumina } from "../service/alumina.service";
import { getAlumina } from "../service/alumina.service";



export const createAlumniController = async(req, res, next) => {
    try{
        const { studentId, graduationYear } = req.body;

        const createdAlumni = await createAlumina(studentId, graduationYear);
        res.status(201).json(createdAlumni);
    }catch(error){
        next(error);
    }
}

export const getAllAlumniController = async(req, res, next) => {
    try{
        const alumni = await getAlumina();
        if(!alumni) throw new BadRequest('No alumni found');
        res.json(alumni);
    }catch(error){
        next(error);
    }
}