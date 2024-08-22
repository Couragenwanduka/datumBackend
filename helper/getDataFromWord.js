import  fs from 'fs';
import path from 'path';
import mammoth  from 'mammoth';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const wordDoc = path.join(__dirname,  'word.docx');

const extractTextFromDocx = async () => {
    try {
        const { value: text } = await mammoth.extractRawText({ path: wordDoc });
        console.log(text);
    } catch (error) {
        console.error('Error extracting text from Word document:', error);
    }
};

// Example usage
// const filePath = 'path/to/your/document.docx';
