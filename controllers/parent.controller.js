import { findByEmail, getStudentsByParentEmail } from "../service/parent.service.js";
import { validateLogin } from "../utils/validator.js";
import { comparePassword } from "../utils/bcrypt.js";


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

      // get student details
      const parentWithStudents = await getStudentsByParentEmail(email);

      // send the response
      res.status(200).send({
        message: 'user successfully logged in',
        students: parentWithStudents
      });
      
      res.status(200).send('message: user successfully logged in')
    }catch(error){
        res.status(500).send(`Error logging in parent: ${error.message}`)
    }
}