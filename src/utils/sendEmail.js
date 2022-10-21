import mail from "@sendgrid/mail";

const API_KEY = process.env.SENDGRID_API_KEY

mail.setApiKey(API_KEY);

export default async function sendEmail(userEmail, subject, emailContent) {
  const data = {
    to: userEmail,
    from: process.env.MAIN_EMAIL_ADDRESS,
    subject,
    text: emailContent,
    html: emailContent,
  };

  mail.send(data);
}
