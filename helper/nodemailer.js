import path from 'path';
import fs from "fs/promises"; 
import nodemailer from "nodemailer";
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const htmlFilePath = path.join(__dirname, '../public', 'onboarding.html');
const teacherHtmlFilePath = path.join(__dirname, '../public', 'onboardingTeacher.html');
const failedResultMessageHtmlFilePath = path.join(__dirname, '../public', 'failedResult.html');
const successResultMessageHtmlFilePath = path.join(__dirname, '../public', 'resultSuccess.html');


const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, 
  auth: {
    user: process.env.googleUsername, 
    pass: process.env.googlePassword, 
  },
});


// Function to generate the HTML message
const onboardingmessage = async (email, password) => {
  try {
   
    const data = await fs.readFile(htmlFilePath, 'utf8');
    const html = data.replace('{{email}}', email).replace('{{password}}', password);
    return html;
  } catch (err) {
    console.log('Error reading file:', err);
    throw new Error('Failed to generate email content');
  }
};

const onboardingTeacherMessage = async (email, password,firstName,subject) => {
   try{
    const data = await fs.readFile(teacherHtmlFilePath, 'utf8');
    const html = data.replace('{{email}}', email).replace('{{password}}', password).replace("{{Teacher's Name}}",firstName).replace('{{Subject}}',subject);
    return html;
   }catch(error){
     console.log('Error sending email:', error);
     throw new Error('Failed to generate email content');
   }
}


export const sendOnboardingTeacherMessage = async (email, password,firstName,subject) => {
  try {
    const htmlContent = await onboardingTeacherMessage(email, password,firstName,subject);
    
    const info = await transporter.sendMail({
      from: process.env.googleUsername, 
      to: email,
      subject: "Welcome to Courage Secondary School!", // Updated subject to match the school name
      text: `Welcome to Courage Secondary School! Your account has been set up. Please find the details attached.`, // Provide a meaningful fallback text
      html: htmlContent, 
    });

    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error.message); // Changed to console.error for better clarity
    console.error(error.stack); // Log the stack trace for better debugging
  }
};

export const sendOnboardingMessage = async (email, password) => {
  try {
   
    const htmlContent = await onboardingmessage(email, password);
    
    // Send the email
    const info = await transporter.sendMail({
      from: process.env.googleUsername,
      to: email,
      subject: "Welcome to Courage Secondary School!",
      text: `Welcome to CIS!`,
      html: htmlContent, 
    });

    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.log("Error sending email: %s", error.message);
  }
};

const FailedUploadMessage = async (failed) => {
  try {
   
    const data = await fs.readFile(failedResultMessageHtmlFilePath, 'utf8');
  
    const html = data.replace('{{error}}', failed);
    return html;
  } catch (err) {
    console.log('Error reading file:', err);
    throw new Error('Failed to generate email content');
  }
}

export const sendFailedUploadMessage = async (email,failed) => {
  try{
   
    const htmlContent = await FailedUploadMessage(failed);
    
    // Send the email
    const info = await transporter.sendMail({
      from: process.env.googleUsername,
      to: email,
      subject: "Failed Upload",
      text: `Failed to upload result`,
      html: htmlContent, 
    });

    console.log("Message sent: %s", info.messageId);
  }catch(error){
    console.log("Error sending email: %s", error.message);
  }
}
const successMessage = async() => {
  try {
   
    const data = await fs.readFile('html/successResult.html', 'utf8');
  
    const html = data;
    return html;
  } catch (err) {
    console.log('Error reading file:', err);
    throw new Error('Failed to generate email content');
  }
}


export const sendSuccessMessage = async (email) => {
  try{
   
    const htmlContent = await successMessage(email);
    
    // Send the email
    const info = await transporter.sendMail({
      from: process.env.googleUsername,
      to: email,
      subject: "Successful Upload",
      text: `Result uploaded successfully`,
      html: htmlContent, 
    });

    console.log("Message sent: %s", info.messageId);
  }catch(error){
    console.log("Error sending email: %s", error.message);
  }
}



