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

export const sendOnboardingMessage = async (email, password) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.googleUsername,
      to: email,
      subject: "Welcome to Courage Secondary School!",
      text: `Welcome to CIS, Here are your login details:\nEmail: ${email}\nPassword: ${password}`,
      // Optionally, you could use `html` for HTML content
      // html: `<p>Welcome to CIS, Here are your login details:</p><p>Email: ${email}</p><p>Password: ${password}</p>`,
    });
    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.log(error)
    console.log("Error sending email: %s", error.message);
  }
};
