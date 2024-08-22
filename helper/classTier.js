import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const classlistPath = path.join(__dirname, 'classlist.json');

// Function to assign classes using round-robin
export const addClassTier = async (gradeLevel) => {
    try {
        const data = await fs.promises.readFile(classlistPath, 'utf8');
        const students = JSON.parse(data);

        // Log the data to ensure it’s in the expected format
        // console.log('Current students data:', students);

        // Ensure the provided gradeLevel exists in the data
        if (!students[gradeLevel]) {
            console.error(`Grade level '${gradeLevel}' does not exist in the data.`);
            return null;
        }

        // Find the class with the smallest number of students for the given grade level
        let leastPopulatedClass = null;
        let minCount = Infinity;

        for (const classTier of Object.keys(students[gradeLevel])) {
            if (students[gradeLevel][classTier] < minCount) {
                minCount = students[gradeLevel][classTier];
                leastPopulatedClass = classTier;
            }
        }

        // console.log('Least populated class tier:', leastPopulatedClass);

        if (leastPopulatedClass) {
            // Increment the count for the least populated class
            students[gradeLevel][leastPopulatedClass] += 1;

            // Write the updated data back to the file
            await fs.promises.writeFile(classlistPath, JSON.stringify(students, null, 2), 'utf8');
            // console.log('Class tier successfully incremented and updated');
        } else {
            console.log('No class tier found to increment.');
        }

        return leastPopulatedClass;
    } catch (error) {
        console.error('Error processing class tiers:', error.message);
    }
};
