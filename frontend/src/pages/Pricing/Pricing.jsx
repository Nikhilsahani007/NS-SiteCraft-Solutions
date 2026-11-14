import { Link } from 'react-router-dom';
import { pricing } from '../../content/site';
import { PageShell, PageHero, CtaBand } from '../../sections/PageShell';
import { Arrow } from '../../sections/parts';
import styles from '../../sections/home.module.css';

const seo = {
  title: 'Pricing for Websites, Web Apps and Custom Software',
  description:
    'Starting prices for websites, web applications and custom software from NS SiteCraft Solutions. Every project gets a written scope and quote before work begins.',
  canonicalPath: '/pricing',
  keywords:
    'web development pricing Hyderabad, software development cost India, website design pricing, custom software pricing',
};

const Pricing = () => (
  <PageShell seo={seo}>
    <PageHero
      label="Pricing"
      title={
        <>
          Starting prices, <em>stated plainly.</em>
        </>
      }
      lede="Three starting points to help you budget. Your actual quote is written against your scope, and you see it before any work begins."
    />

    <section className={styles.sectionTight} aria-label="Packages">
      <div className={styles.container}>
        <ul className={styles.plans}>
          {pricing.packages.map((pkg, i) => (
            <li className={styles.plan} key={pkg.name} data-reveal style={{ '--i': i }}>
              <h2 className={styles.planName}>{pkg.name}</h2>
              <p className={styles.planPrice}>
                <span>Starting from</span>
                {pkg.price}
              </p>
              <p className={styles.planFor}>{pkg.audience}</p>
              <ul className={styles.planList}>
                {pkg.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <Link className={styles.textLink} to="/contact" aria-label={`Ask about the ${pkg.name} package`}>
                Ask about {pkg.name}
                <Arrow size={14} />
              </Link>
            </li>
          ))}
        </ul>
        <p className={styles.note} style={{ marginTop: 36 }}>
          {pricing.note}
        </p>
      </div>
    </section>

    <CtaBand
      title={
        <>
          Need a quote for <em>your project?</em>
        </>
      }
      text="Every project is different. Describe yours and we will reply with a written scope and price."
    />
  </PageShell>
);

export default Pricing;
