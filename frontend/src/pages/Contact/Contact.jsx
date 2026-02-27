import { useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import Button from '../../components/Button/Button';
import SEOHead from '../../components/SEOHead/SEOHead';
import styles from './Contact.module.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        } else if (formData.name.trim().length < 2) {
            newErrors.name = 'Name must be at least 2 characters';
        }

        const emailRegex = /^\S+@\S+\.\S+$/;
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        if (formData.phone && !/^[0-9]{10,15}$/.test(formData.phone.replace(/\s/g, ''))) {
            newErrors.phone = 'Please enter a valid phone number';
        }

        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
        } else if (formData.message.trim().length < 10) {
            newErrors.message = 'Message must be at least 10 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);
        setSubmitStatus(null);

        try {
            await emailjs.send(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                {
                    from_name: formData.name,
                    from_email: formData.email,
                    phone: formData.phone,
                    message: formData.message,
                },
                import.meta.env.VITE_EMAILJS_PUBLIC_KEY
            );

            setSubmitStatus({
                type: 'success',
                message: "Thanks for reaching out. We'll get back to you soon."
            });

            setFormData({
                name: '',
                email: '',
                phone: '',
                message: ''
            });

        } catch (error) {
            console.error(error);
            setSubmitStatus({
                type: 'error',
                message: 'Failed to send message. Please try again.'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const contactSchema = {
        '@context': 'https://schema.org',
        '@type': 'ContactPage',
        'name': 'Contact NS SiteCraft Solutions',
        'description': 'Get in touch for a free consultation about your web development or software project.',
        'url': 'https://ns-sitecraft-solutions.vercel.app/contact',
        'mainEntity': {
            '@type': 'Organization',
            'name': 'NS SiteCraft Solutions',
            'email': 'nssitecraftsolution@gmail.com',
            'telephone': '+91-93909-69461',
            'address': {
                '@type': 'PostalAddress',
                'addressLocality': 'Hyderabad',
                'addressRegion': 'Telangana',
                'addressCountry': 'IN'
            }
        }
    };

    return (
        <>
            <SEOHead
                title="Contact Us - Free Consultation"
                description="Contact NS SiteCraft Solutions for a free consultation about your web development or software project. Based in Hyderabad, India. Email, phone, or fill out our contact form. We respond within 24 hours."
                canonicalPath="/contact"
                keywords="contact web developer Hyderabad, free consultation software development, hire developer India, web development inquiry"
                structuredData={contactSchema}
            />
            <div className={styles.contact}>
                <section className={styles.contactSection}>
                    <div className="container">

                        <div className={styles.contactGrid}>
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className={styles.contactInfo}
                            >
                                <h2 className={styles.infoTitle}>Get in touch</h2>
                                <p className={styles.infoText}>We'll respond within 24 hours.</p>

                                <div className={styles.infoItems}>
                                    <div className={styles.infoItem}>
                                        <div className={styles.infoIcon}>📧</div>
                                        <div>
                                            <h3 className={styles.infoLabel}>Email</h3>
                                            <p className={styles.infoValue}>nssitecraftsolution@gmail.com</p>
                                        </div>
                                    </div>

                                    <div className={styles.infoItem}>
                                        <div className={styles.infoIcon}>📱</div>
                                        <div>
                                            <h3 className={styles.infoLabel}>Phone</h3>
                                            <p className={styles.infoValue}>+91 93909 69461</p>
                                        </div>
                                    </div>

                                    <div className={styles.infoItem}>
                                        <div className={styles.infoIcon}>📍</div>
                                        <div>
                                            <h3 className={styles.infoLabel}>Location</h3>
                                            <p className={styles.infoValue}>Hyderabad, India</p>
                                        </div>
                                    </div>
                                </div>

                                <div className={styles.consultationBanner}>
                                    <h3 className={styles.bannerTitle}>Free consultation</h3>
                                    <p className={styles.bannerText}>
                                        No cost. No commitment. Just clarity.
                                    </p>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className={styles.formContainer}
                            >
                                <form onSubmit={handleSubmit} className={styles.form}>
                                    <div className={styles.formGroup}>
                                        <label className={styles.label}>Name *</label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                                            placeholder="Your full name"
                                        />
                                        {errors.name && <span className={styles.errorText}>{errors.name}</span>}
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label className={styles.label}>Email *</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                                            placeholder="your.email@example.com"
                                        />
                                        {errors.email && <span className={styles.errorText}>{errors.email}</span>}
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label className={styles.label}>Phone</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className={`${styles.input} ${errors.phone ? styles.inputError : ''}`}
                                            placeholder="+91 XXXXX XXXXX"
                                        />
                                        {errors.phone && <span className={styles.errorText}>{errors.phone}</span>}
                                    </div>

                                    <div className={styles.formGroup}>
                                        <label className={styles.label}>Message *</label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            rows="6"
                                            className={`${styles.textarea} ${errors.message ? styles.inputError : ''}`}
                                            placeholder="Tell us about your project..."
                                        />
                                        {errors.message && <span className={styles.errorText}>{errors.message}</span>}
                                    </div>

                                    {submitStatus && (
                                        <div className={`${styles.statusMessage} ${styles[submitStatus.type]}`}>
                                            {submitStatus.message}
                                        </div>
                                    )}

                                    <Button type="submit" size="large" fullWidth disabled={isSubmitting}>
                                        {isSubmitting ? 'Sending...' : 'Send message'}
                                    </Button>
                                </form>
                            </motion.div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default Contact;
