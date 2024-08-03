import ParentGuardian from "../model/parentGuardian";

export const saveParent = async(firstName, lastName, relationship, contactNumber, email, password) => {
    try{
        const parentGuardian = new ParentGuardian({
            firstName,
            lastName,
            relationship,
            contactNumber,
            email,
            password
        });
    
        await parentGuardian.save();
        return parentGuardian;
    }catch(error){
        throw new Error(`Error saving parent guardian: ${error.message}`);
    }
}

export const addStudent = async(email,id) => {
    try{
        const parentGuardian = await ParentGuardian.findByIdAndUpdate(email, { $push: { studentId: id } }, { new: true });
        return parentGuardian;
    }catch(error){
        throw new Error(`Error adding student to parent guardian: ${error.message}`);
    }
}

export const findByEmail = async(email) => {
    try{
       const parentGuardian = await ParentGuardian.findOne({email});
       return parentGuardian;
    }catch(error){
        throw new Error(`Error finding parent guardian: ${error.message}`);
    }
}

