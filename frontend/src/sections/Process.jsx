import { useRef } from 'react';
import { process } from '../content/site';
import { useScrollProgress } from '../hooks/useScrollProgress';
import { Arrow, ContactLink, pad } from './parts';
import styles from './home.module.css';

const Process = ({ no = '05' }) => {
  const listRef = useRef(null);

  useScrollProgress(
    listRef,
    (p) => {
      const list = listRef.current;
      if (!list) return;
      list.style.setProperty('--p', p.toFixed(3));
      const steps = list.children;
      for (let i = 0; i < steps.length; i += 1) {
        steps[i].dataset.done = p >= i / steps.length + 0.02 ? 'true' : 'false';
      }
    },
    { start: 0.7, end: 0.55 }
  );

  return (
    <section className={`${styles.section} ${styles.paper}`} id="process" aria-labelledby="process-title">
      <div className={`${styles.container} ${styles.processGrid}`}>
        <div className={styles.processIntro} data-reveal>
          <p className={styles.label}>
            <b>{no}</b>
            How we work
          </p>
          <h2 className={styles.title} id="process-title">
            From first call to launch, <em>step by step.</em>
          </h2>
          <p className={styles.lede}>
            You always know what is being built, what it costs and what happens next. Each step ends with
            something you can see and approve.
          </p>
          <p style={{ marginTop: 28 }}>
            <ContactLink className={styles.textLink}>
              Talk through your project
              <Arrow size={14} />
            </ContactLink>
          </p>
        </div>

        <ol className={styles.steps} ref={listRef}>
          {process.map((step, i) => (
            <li className={styles.step} key={step.title} data-done="true">
              <span className={styles.stepNo} aria-hidden="true">
                {pad(i + 1)}
              </span>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepText}>{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default Process;
