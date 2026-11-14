import { useState } from 'react';
import { company, projectTypes } from '../content/site';
import { sendEnquiry, validateEnquiry } from '../utils/sendEnquiry';
import { Arrow } from './parts';
import styles from './home.module.css';

const empty = { name: '', email: '', type: '', message: '' };

const Contact = ({ no = '07', as: Heading = 'h2', top = false }) => {
  const [values, setValues] = useState(empty);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [trap, setTrap] = useState('');

  const change = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
  };

  // Success is shown only after the email service accepts the message.
  const submit = async (e) => {
    e.preventDefault();
    if (status === 'sending') return;

    const found = validateEnquiry(values);
    if (Object.keys(found).length) {
      setErrors(found);
      document.getElementById(`contact-${Object.keys(found)[0]}`)?.focus();
      return;
    }
    if (trap) return; // bots fill hidden fields

    setStatus('sending');
    try {
      const typeLabel = projectTypes.find((t) => t.value === values.type)?.label || values.type;
      await sendEnquiry({
        name: values.name.trim(),
        email: values.email.trim(),
        message: `Project type: ${typeLabel}\n\n${values.message.trim()}`,
      });
      setValues(empty);
      setStatus('sent');
    } catch (err) {
      console.error('Enquiry failed to send', err);
      setStatus('error');
    }
  };

  const fieldProps = (name) => ({
    id: `contact-${name}`,
    name,
    value: values[name],
    onChange: change,
    required: true,
    'aria-invalid': errors[name] ? 'true' : undefined,
    'aria-describedby': errors[name] ? `contact-${name}-error` : undefined,
  });

  const error = (name) =>
    errors[name] && (
      <p className={styles.fieldError} id={`contact-${name}-error`}>
        {errors[name]}
      </p>
    );

  return (
    <section
      className={`${styles.section} ${styles.surface} ${top ? styles.sectionTop : ''}`}
      id="contact" aria-labelledby="contact-title">
      <div className={`${styles.container} ${styles.contactGrid}`}>
        <div data-reveal>
          <p className={styles.label}>
            <b>{no}</b>
            Start a project
          </p>
          <Heading className={top ? styles.pageTitle : styles.title} id="contact-title">
            Tell us what you <em>need built.</em>
          </Heading>
          <p className={styles.lede}>
            Describe your organisation and the idea. We reply with clear next steps and a written quote, with no
            pressure.
          </p>

          <ul className={styles.contactList}>
            <li>
              <span>Email</span>
              <a href={`mailto:${company.email}`}>{company.email}</a>
            </li>
            <li>
              <span>Phone</span>
              <a href={company.phoneHref}>{company.phone}</a>
            </li>
            <li>
              <span>Studio</span>
              <address>{company.location}</address>
            </li>
          </ul>
        </div>

        <div data-reveal style={{ '--i': 1 }}>
          {status === 'sent' ? (
            <div className={styles.formDone} role="status">
              <h3>Message sent.</h3>
              <p>Thank you. We will read your brief and reply by email with next steps.</p>
            </div>
          ) : (
            <form className={styles.form} onSubmit={submit} noValidate aria-label="Project enquiry">
              <div className={styles.field}>
                <label htmlFor="contact-name">Name</label>
                <input type="text" autoComplete="name" placeholder="Your name" {...fieldProps('name')} />
                {error('name')}
              </div>
              <div className={styles.field}>
                <label htmlFor="contact-email">Email</label>
                <input type="email" autoComplete="email" placeholder="you@organisation.com" {...fieldProps('email')} />
                {error('email')}
              </div>
              <div className={`${styles.field} ${styles.fieldWide}`}>
                <label htmlFor="contact-type">Project type</label>
                <select {...fieldProps('type')}>
                  <option value="" disabled>
                    Choose one
                  </option>
                  {projectTypes.map((t) => (
                    <option key={t.value} value={t.value}>
                      {t.label}
                    </option>
                  ))}
                </select>
                {error('type')}
              </div>
              <div className={`${styles.field} ${styles.fieldWide}`}>
                <label htmlFor="contact-message">Project brief</label>
                <textarea
                  rows={5}
                  placeholder="What do you need, who is it for, and when do you need it?"
                  {...fieldProps('message')}
                />
                {error('message')}
              </div>

              <div className={styles.honeypot} aria-hidden="true">
                <label htmlFor="contact-website">Website</label>
                <input
                  id="contact-website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={trap}
                  onChange={(e) => setTrap(e.target.value)}
                />
              </div>

              {status === 'error' && (
                <p className={styles.formAlert} role="alert">
                  Sorry, your message could not be sent. Please try again, or email us at{' '}
                  <a href={`mailto:${company.email}`}>{company.email}</a>.
                </p>
              )}

              <div className={styles.formFoot}>
                <button className={styles.btn} type="submit" id="contact-submit-btn" disabled={status === 'sending'}>
                  {status === 'sending' ? 'Sending…' : 'Send project brief'}
                  <Arrow />
                </button>
                <p className={styles.formNote}>We only use these details to reply to you.</p>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contact;
