import emailjs from '@emailjs/browser';

/**
 * Sends an enquiry. Two delivery paths, chosen by environment variables:
 *
 * 1. VITE_ENQUIRY_ENDPOINT set (local development, see .env.development):
 *    POST to the project's own API (backend/), which stores the enquiry and
 *    emails it when SMTP is configured.
 * 2. Otherwise EmailJS, using VITE_EMAILJS_* (the current production setup).
 *
 * Resolves only when the message is accepted; rejects otherwise, so the UI
 * never shows success for a message that was not delivered.
 */
export async function sendEnquiry({ name, email, phone = '', message, sourcePage = 'contact' }) {
    const endpoint = import.meta.env.VITE_ENQUIRY_ENDPOINT;

    if (endpoint) {
        const res = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name,
                email,
                phone: phone.replace(/\D/g, ''),
                message,
                sourcePage,
            }),
        });
        const body = await res.json().catch(() => ({}));
        if (!res.ok || body.success === false) {
            throw new Error(body.message || `Enquiry endpoint returned ${res.status}`);
        }
        return body;
    }

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
    else if (message.trim().length > 4500) errors.message = 'Please keep your brief under 4,500 characters. You can send more detail by email.';
    return errors;
}
