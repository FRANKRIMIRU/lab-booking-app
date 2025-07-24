import nodemailer from 'nodemailer';

export const sendEmail = async (to, subject, html) => {
  // 1. Create transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail', // You can also use 'Outlook', 'Yahoo', or SMTP
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // 2. Mail options
  const mailOptions = {
    from: `"Lab Booking Support" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  };

  // 3. Send the email
  await transporter.sendMail(mailOptions);
};
