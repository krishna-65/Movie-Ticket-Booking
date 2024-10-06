const nodemailer = require('nodemailer');
require('dotenv').config(); // Load environment variables from .env file

// Create a transporter object using Gmail service
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER, // Your Gmail address
        pass: process.env.GMAIL_PASS  // Your Gmail password or app-specific password
    }
});

// Function to send email
const sendEmail = async (recipient, subject, message) => {
    try {
        // Email options
        const mailOptions = {
            from: process.env.GMAIL_USER,  // Sender's email address
            to: recipient,                 // Recipient's email address
            subject: subject,              // Subject of the email
            html: message                  // Email content in HTML format
        };

        // Send email using the transporter
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', info.response);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

module.exports = sendEmail;
