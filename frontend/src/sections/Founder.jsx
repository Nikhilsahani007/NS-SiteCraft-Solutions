import { founder, reviews } from '../content/site';
import { Arrow, goTo } from './parts';
import styles from './home.module.css';

const initials = founder.name
  .split(' ')
  .map((w) => w[0])
  .join('');

const Founder = () => (
  <section className={styles.section} id="about" aria-labelledby="about-title">
    <div className={styles.container}>
      <p className={styles.label} data-reveal>
        <b>06</b>
        The studio
      </p>
      <h2 className={styles.srOnly} id="about-title">
        About the founder
      </h2>

      <div className={styles.founderGrid}>
        <figure className={styles.quote} data-reveal>
          <blockquote>
            <p>“{founder.quote}”</p>
          </blockquote>
          <figcaption>
            <div className={styles.quoteBy}>
              <span className={styles.monogram} aria-hidden="true">
                {initials}
              </span>
              <span>
                <cite>{founder.name}</cite>
                <small>{founder.role}</small>
              </span>
            </div>
          </figcaption>
        </figure>

        <ul className={styles.points} data-reveal style={{ '--i': 1 }}>
          {founder.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </div>

      <aside className={styles.reviews} aria-labelledby="reviews-title" data-reveal>
        <h3 className={styles.reviewsTitle} id="reviews-title">
          {reviews.title}
        </h3>
        <p className={styles.reviewsText}>{reviews.text}</p>
        <a className={styles.textLink} href="#contact" onClick={goTo('contact')}>
          Get in touch
          <Arrow size={14} />
        </a>
      </aside>
    </div>
  </section>
);

export default Founder;
