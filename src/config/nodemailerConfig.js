// config/nodemailerConfig.js
const nodemailer = require('nodemailer');
require('dotenv').config(); // Load environment variables from .env file

// Create and export Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // You can use other email services or an SMTP server
  auth: {
    user: process.env.EMAIL_USER, // Your email from .env file
    pass: process.env.EMAIL_PASS, // Your password from .env file (use app password if using Gmail)
  },
});

// Verify the transporter setup
transporter.verify((error, success) => {
  if (error) {
    console.error('Error setting up transporter:', error);
  } else {
    console.log('Nodemailer transporter ready to send emails.');
  }
});

module.exports = transporter;
