import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.googleUsername,
    pass: process.env.googlePassword,
  },
});

export const sendOnboardingMessage = async(email, password) => {
    try {
      const info = transporter.sendMail({
        from: process.env.googleUsername,
        to: email,
        subject: "Welcome to Courage Secondary school!",
        body:`Welcome to CIS , Here are your login details${email}, ${password}`,
      });
      console.log("Message sent: %s", info.messageId);
    } catch (error) {
      console.error("Error sending email: %s", error.message);
    }
};
