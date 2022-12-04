const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.seznam.cz',
  port: 465,
  secure: true,
  auth: {
    user: 'gregor.nejezchleba@seznam.cz',
    pass: 'WK9TLtihgpy9jAogJ8n8',
  },
});

const sendResetEmail = async (email, code) => {
  const info = await transporter.sendMail({
    from: 'gregor.nejezchleba@seznam.cz',
    to: email,
    subject: 'ScheduleMaker - Reset of your password',
    text: 'Enter this code to reset your password: ' + code,
  });
  console.log('Password reset message sent: %s', info.messageId);
};

export default sendResetEmail;
