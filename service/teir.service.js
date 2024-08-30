import prisma from "../prisma/dbconnect.js";


export const createTeir = async(name,classLevel,classId) => {
    try{
        const savedTier = await prisma.tier.create({
            data:{
                teir: name,
                classLevel,
                classId,
            }
        });
        return savedTier;
    }catch(error){
        throw new Error(`Error creating tier: ${error.message}`);
    }
}

export const getAllTier = async() =>{
    try{
        const tiers = await prisma.tier.findMany();
        return tiers;
    }catch(error){
        throw new Error(`Error fetching all tiers: ${error.message}`);
    }
}

export const findTeirByName = async (name, classId) => {
    try {
        const tier = await prisma.tier.findFirst({
            where: {
                teir: name, // Ensure 'name' corresponds to a valid ClassDivision value
                classId: classId // This is correct
            }
        });
        return tier;
    } catch (error) {
        throw new Error(`Error fetching tier by name: ${error.message}`);
    }
}
