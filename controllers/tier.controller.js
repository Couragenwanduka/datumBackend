import { createTeir } from "../service/teir.service.js";
import { getAllTier } from "../service/teir.service.js";
import { findTeirByName } from "../service/teir.service.js";
import { findClassByName } from "../service/class.service.js";
import BadRequest from "../error/error.js";


export const createTierController = async(req, res, next) => {
    try{
        const { name, classLevel, className} = req.body;

        const exisitingClass = await findClassByName(className);
        const classId = exisitingClass.id;
        console.log(exisitingClass)

        const exisitingTier = await findTeirByName(name,classId);
        if(exisitingTier) throw new BadRequest('Tier already exists');

        if(!exisitingClass) throw new BadRequest('Class not found');

        const createdTier = await createTeir(name, classLevel, classId);
        if(!createdTier) throw new BadRequest('Failed to create tier');
        res.status(201).json(createdTier);
    }catch(error){
        next(error);
    }
}

export const getAllTiersController = async(req, res, next) => {
    try{
        const tiers = await getAllTier();
        if(!tiers) throw new BadRequest('No tiers found');
        res.json(tiers);
    }catch(error){
        next(error);
    }
}

