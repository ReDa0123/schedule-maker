import { EMAIL_ADDRESS, EMAIL_PASSWORD } from '../../config/variables';
import { createTransport } from 'nodemailer';

const transporter = createTransport({
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
  console.log(`Password reset message sent: ${info.messageId}`);
};

export default sendResetEmail;
