import nodemailer from "nodemailer";

export default async function sendEmail(to, subject, content) {
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: process.env.MAIN_EMAIL_ADDRESS,
      pass: process.env.MAIN_EMAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
    secure: false,
  });

  const mailOptions = {
    from: `"MediApp - No Country C7-27" <${process.env.MAIN_EMAIL_ADDRESS}>`,
    to: to,
    subject: subject,
    html: content,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent successfully`);
  } catch (e) {
    console.log(e);
  }
}
