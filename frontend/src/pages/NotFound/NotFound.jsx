import { Link } from 'react-router-dom';
import { PageShell, PageHero } from '../../sections/PageShell';
import { Arrow } from '../../sections/parts';
import styles from '../../sections/home.module.css';

const seo = {
  title: 'Page not found',
  description: 'The page you are looking for does not exist or has moved.',
  canonicalPath: '/',
};

const NotFound = () => (
  <PageShell seo={seo}>
    <PageHero
      label="Error 404"
      title={
        <>
          This page is <em>not here.</em>
        </>
      }
      lede="The page you are looking for does not exist or has moved. These will get you back on track."
    >
      <div className={styles.heroCtas}>
        <Link className={styles.btn} to="/">
          Go to the homepage
          <Arrow />
        </Link>
        <Link className={styles.textLink} to="/contact">
          Contact us
          <Arrow size={14} />
        </Link>
      </div>
    </PageHero>
  </PageShell>
);

export default NotFound;
