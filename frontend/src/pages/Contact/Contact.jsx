import { afterEnquiry, company } from '../../content/site';
import { PageShell } from '../../sections/PageShell';
import ContactSection from '../../sections/Contact';
import { pad } from '../../sections/parts';
import styles from '../../sections/home.module.css';

const seo = {
  title: 'Contact: Start a Project',
  description:
    'Tell NS SiteCraft Solutions about your website or software project. Based in Hyderabad, India. Send a brief, email or call.',
  canonicalPath: '/contact',
  keywords: 'contact web developer Hyderabad, software development enquiry, hire developer India',
  structuredData: {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: `Contact ${company.name}`,
    url: 'https://ns-sitecraft-solutions.vercel.app/contact',
    mainEntity: {
      '@type': 'Organization',
      name: company.name,
      email: company.email,
      telephone: '+91-93909-69461',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Hyderabad',
        addressRegion: 'Telangana',
        addressCountry: 'IN',
      },
    },
  },
};

const Contact = () => (
  <PageShell seo={seo}>
    <ContactSection no="01" as="h1" top />

    <section className={`${styles.section} ${styles.paper}`} aria-labelledby="next-title">
      <div className={styles.container}>
        <header className={styles.head}>
          <div data-reveal>
            <p className={styles.label}>
              <b>02</b>
              After you write
            </p>
            <h2 className={styles.title} id="next-title">
              What happens <em>next.</em>
            </h2>
          </div>
        </header>
        <ol className={styles.industries}>
          {afterEnquiry.map((step, i) => (
            <li className={styles.industry} key={step.title} data-reveal>
              <span className={styles.industryNo} aria-hidden="true">
                {pad(i + 1)}
              </span>
              <h3 className={styles.industryName}>{step.title}</h3>
              <p className={styles.industryText}>{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  </PageShell>
);

export default Contact;
