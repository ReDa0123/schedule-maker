import { EMAIL_ADDRESS, EMAIL_PASSWORD } from '../../config/variables';
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.seznam.cz',
  port: 465,
  secure: true,
  auth: {
    user: EMAIL_ADDRESS,
    pass: EMAIL_PASSWORD,
  },
});

const sendResetEmail = async (email, code) => {
  const info = await transporter.sendMail({
    from: EMAIL_ADDRESS,
    to: email,
    subject: 'ScheduleMaker - Reset of your password',
    text: 'Enter this code to reset your password: ' + code,
  });
  console.log('Password reset for ' + email + ' was set to ' + code);
  console.log('Password reset message sent: %s', info.messageId);
};

export default sendResetEmail;
