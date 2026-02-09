const { sendEmail } = require('../config/email');
const logger = require('../config/logger');

/**
 * Email Service - Handle all email notifications
 */

// Send new inquiry notification to admin
const sendNewInquiryNotification = async (inquiry) => {
    const adminEmail = process.env.ADMIN_EMAIL;

    if (!adminEmail) {
        logger.warn('ADMIN_EMAIL not configured. Skipping inquiry notification.');
        return { success: false, message: 'Admin email not configured' };
    }

    const subject = `New Inquiry from ${inquiry.name}`;

    const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #06B6D4;">New Inquiry Received</h2>
      
      <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
        <p><strong>Name:</strong> ${inquiry.name}</p>
        <p><strong>Email:</strong> <a href="mailto:${inquiry.email}">${inquiry.email}</a></p>
        ${inquiry.phone ? `<p><strong>Phone:</strong> ${inquiry.phone}</p>` : ''}
        <p><strong>Source Page:</strong> ${inquiry.sourcePage}</p>
        <p><strong>Date:</strong> ${new Date(inquiry.createdAt).toLocaleString('en-IN')}</p>
      </div>

      <div style="margin: 20px 0;">
        <h3>Message:</h3>
        <p style="white-space: pre-wrap;">${inquiry.message}</p>
      </div>

      <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
      
      <p style="color: #666; font-size: 12px;">
        This is an automated notification from NS SiteCraft Solutions website.
      </p>
    </div>
  `;

    const text = `
New Inquiry Received

Name: ${inquiry.name}
Email: ${inquiry.email}
${inquiry.phone ? `Phone: ${inquiry.phone}` : ''}
Source Page: ${inquiry.sourcePage}
Date: ${new Date(inquiry.createdAt).toLocaleString('en-IN')}

Message:
${inquiry.message}

---
This is an automated notification from NS SiteCraft Solutions website.
  `;

    return await sendEmail({
        to: adminEmail,
        subject,
        text,
        html,
    });
};

// Send inquiry confirmation to user (optional)
const sendInquiryConfirmation = async (inquiry) => {
    const subject = 'Thank you for contacting NS SiteCraft Solutions';

    const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #06B6D4;">Thank You for Reaching Out!</h2>
      
      <p>Hi ${inquiry.name},</p>
      
      <p>We've received your inquiry and will get back to you within 24 hours.</p>

      <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
        <h3>Your Message:</h3>
        <p style="white-space: pre-wrap;">${inquiry.message}</p>
      </div>

      <p>If you have any urgent questions, feel free to reach out to us directly at 
        <a href="mailto:info@nssitecraft.com">info@nssitecraft.com</a>
      </p>

      <p>Best regards,<br>NS SiteCraft Solutions Team</p>

      <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
      
      <p style="color: #666; font-size: 12px;">
        NS SiteCraft Solutions | Hyderabad, India
      </p>
    </div>
  `;

    const text = `
Thank You for Reaching Out!

Hi ${inquiry.name},

We've received your inquiry and will get back to you within 24 hours.

Your Message:
${inquiry.message}

If you have any urgent questions, feel free to reach out to us directly at info@nssitecraft.com

Best regards,
NS SiteCraft Solutions Team

---
NS SiteCraft Solutions | Hyderabad, India
  `;

    return await sendEmail({
        to: inquiry.email,
        subject,
        text,
        html,
    });
};

module.exports = {
    sendNewInquiryNotification,
    sendInquiryConfirmation,
};
