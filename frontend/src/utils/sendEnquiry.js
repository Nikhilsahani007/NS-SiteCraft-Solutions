import emailjs from '@emailjs/browser';

/**
 * Sends an enquiry through the EmailJS template already used by /contact.
 *
 * Resolves only when EmailJS accepts the message; rejects otherwise, so the UI
 * never shows success for a message that was not sent. Interim solution until
 * the server-side enquiry endpoint (Phase 6) replaces it.
 */
export async function sendEnquiry({ name, email, phone = '', message }) {
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
        throw new Error('Enquiry service is not configured');
    }

    return emailjs.send(
        serviceId,
        templateId,
        { from_name: name, from_email: email, phone, message },
        publicKey
    );
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Returns an object of field -> error message; empty when valid. */
export function validateEnquiry({ name, email, type, message }) {
    const errors = {};
    if (!name || name.trim().length < 2) errors.name = 'Please enter your name.';
    if (!email || !EMAIL_RE.test(email.trim())) errors.email = 'Please enter a valid email address.';
    if (type !== undefined && !type) errors.type = 'Please choose a project type.';
    if (!message || message.trim().length < 10) errors.message = 'Please add a few words about your project (at least 10 characters).';
    return errors;
}
