import nodemailer from "nodemailer";
import fs from "fs/promises"; 

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
const message = async (email, password) => {
  try {
   
    const data = await fs.readFile('html/onboarding.html', 'utf8');
  
    const html = data.replace('{{email}}', email).replace('{{password}}', password);
    return html;
  } catch (err) {
    console.log('Error reading file:', err);
    throw new Error('Failed to generate email content');
  }
};

export const sendOnboardingMessage = async (email, password) => {
  try {
   
    const htmlContent = await message(email, password);
    
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
