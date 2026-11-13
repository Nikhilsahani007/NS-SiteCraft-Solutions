import { useRef } from 'react';
import SEOHead from '../../components/SEOHead/SEOHead';
import { useReveal } from '../../hooks/useReveal';
import Hero from '../../sections/Hero';
import Statement from '../../sections/Statement';
import { Services, Expertise, Industries } from '../../sections/Services';
import Work from '../../sections/Work';
import Process from '../../sections/Process';
import Founder from '../../sections/Founder';
import Contact from '../../sections/Contact';
import SiteFooter from '../../sections/SiteFooter';
import styles from '../../sections/home.module.css';

const professionalService = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'NS SiteCraft Solutions',
  description:
    'Technology studio in Hyderabad building websites, web and mobile applications, e-commerce platforms, custom software and AI integrations.',
  url: 'https://ns-sitecraft-solutions.vercel.app',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Hyderabad',
    addressRegion: 'Telangana',
    addressCountry: 'IN',
  },
};

const HomePage = () => {
  const pageRef = useRef(null);
  useReveal(pageRef);

  return (
    <div className={styles.page} ref={pageRef}>
      <SEOHead
        title="Websites, Apps and Custom Software in Hyderabad"
        description="NS SiteCraft Solutions designs and builds websites, web and mobile apps, e-commerce platforms, custom software and AI integrations for schools, startups, healthcare providers and growing businesses."
        canonicalPath="/"
        keywords="web development Hyderabad, custom software, web application, mobile app development, e-commerce, AI integration"
        structuredData={[professionalService]}
      />
      <main id="main">
        <Hero />
        <Statement />
        <Services />
        <Expertise />
        <Industries />
        <Work />
        <Process />
        <Founder />
        <Contact />
      </main>
      <SiteFooter />
    </div>
  );
};

export default HomePage;
