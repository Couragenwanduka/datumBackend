import { saveParent, findByEmail } from "../service/parent.service";
import { validateParentGuardian } from "../utils/validator";
import { createPassword } from "../utils/password";

export const createParent = async(firstName, lastName, relationship, contactNumber, email) => {
    try {
        const password = createPassword()
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