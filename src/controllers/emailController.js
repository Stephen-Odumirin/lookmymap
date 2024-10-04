// controllers/emailController.js
const transporter = require('../config/nodemailerConfig');

// Controller function to handle email sending
exports.sendEmail = (req, res) => {
  const { email, message } = req.body;

  // Email options
  const mailOptions = {
    from: email, // Sender's email address (user input)
    to: 'info@lookmymap.com', // Your predefined recipient email
    subject: 'New Feedback from Contact Form',
    text: message, // User's feedback message
  };

  // Send email using Nodemailer
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ message: 'Error sending email' });
    }
    console.log('Email sent:', info.response);
    return res.status(200).json({ message: 'Email sent successfully' });
  });
};
