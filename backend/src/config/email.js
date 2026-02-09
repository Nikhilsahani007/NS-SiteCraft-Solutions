const nodemailer = require('nodemailer');
const logger = require('./logger');

// Create reusable transporter
const createTransporter = () => {
    // Check if email is configured
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER) {
        logger.warn('Email configuration missing. Email notifications will be disabled.');
        return null;
    }

    try {
        const transporter = nodemailer.createTransporter({
            host: process.env.SMTP_HOST,
            port: parseInt(process.env.SMTP_PORT) || 587,
            secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        // Verify connection configuration
        transporter.verify((error, success) => {
            if (error) {
                logger.error('Email transporter verification failed:', error);
            } else {
                logger.info('✅ Email server is ready to send messages');
            }
        });

        return transporter;
    } catch (error) {
        logger.error('Failed to create email transporter:', error);
        return null;
    }
};

const transporter = createTransporter();

// Send email function
const sendEmail = async (options) => {
    if (!transporter) {
        logger.warn('Email transporter not configured. Skipping email send.');
        return { success: false, message: 'Email not configured' };
    }

    try {
        const mailOptions = {
            from: `${process.env.SMTP_FROM_NAME || 'NS SiteCraft'} <${process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER}>`,
            to: options.to,
            subject: options.subject,
            text: options.text,
            html: options.html,
        };

        const info = await transporter.sendMail(mailOptions);
        logger.info(`Email sent: ${info.messageId}`);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        logger.error('Failed to send email:', error);
        return { success: false, error: error.message };
    }
};

module.exports = { sendEmail };
