const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.googleUsername,
    pass: process.env.googlePassword,
  },
});

export const sendOnboardingMessage = async(email,) => {
    try {
      const info = await transporter.sendMail({
        from: process.env.googleUsername,
        to: email,
        subject: "Welcome to Courage Secondary school!",
        html:'',
      });
      console.log("Message sent: %s", info.messageId);
    } catch (error) {
      console.error("Error sending email: %s", error.message);
    }
};
