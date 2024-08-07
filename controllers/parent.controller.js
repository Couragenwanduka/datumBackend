import { saveParent, findByEmail } from "../service/parent.service.js";
import { validateParentGuardian } from "../utils/validator.js";
import { validateLogin } from "../utils/validator.js";
import { comparePassword } from "../utils/bcrypt.js";

export const createParent = async(firstName, lastName, relationship, contactNumber, email, password) => {
    try {
        // Validate the registration data
        const { error } = validateParentGuardian(firstName, lastName, relationship, contactNumber, email, password);
        if (error) return res.status(400).send(error.details[0].message);

        // Check if a parent guardian with the same email already exists
        const existingParentGuardian = await findByEmail(email);
        if (existingParentGuardian) return res.status(400).send("A parent guardian with the same email already exists.");

        // Save the parent guardian
        const parentGuardian = await saveParent(firstName, lastName, relationship, contactNumber, email, password);

        // Return the saved parent guardian
        res.send(parentGuardian);
    } catch (error) {
        res.status(500).send(`Error creating parent guardian: ${error.message}`);
    }
}

export const LoginParent = async(req, res) => {
    try{
       const { email, password } = req.body;

       // Validate the registration data
       const { error } = validateLogin(email, password);
       if(error) return res.status(400).send(error.details[0].message);

      // check if a parent is already registered
      const existingParentGuardian = await findByEmail(email); 
      if(!existingParentGuardian) return res.status(400).send('user does not exist, please meet the Admin for more information');

      const checkPassword = await comparePassword(password,existingParentGuardian.password);
      if(!checkPassword) return res.status(400).send('Invalid password');
      
      res.status(200).send('message: user successfully logged in')
    }catch(error){
        res.status(500).send(`Error logging in parent: ${error.message}`)
    }
}