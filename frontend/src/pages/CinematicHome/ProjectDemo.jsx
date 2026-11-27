/**
 * ProjectDemo — a small, self-playing card that shows how a project moves
 * through our four steps. It is an illustration, labelled as such: no real
 * client, dates or numbers are shown.
 */
import { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from '../../utils/motion';
import styles from './ProjectDemo.module.css';

const steps = [
  { name: 'Discover', note: 'Brief and fixed quote agreed' },
  { name: 'Design', note: 'Homepage design approved' },
  { name: 'Develop', note: 'Staging link shared for review' },
  { name: 'Launch', note: 'Live, tested and handed over' },
];

const STEP_MS = 2200;

const ProjectDemo = () => {
  const ref = useRef(null);
  // active = index of the step in progress; steps before it are done.
  const [active, setActive] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (prefersReducedMotion()) {
      setActive(2);
      return undefined;
    }
    const io = new IntersectionObserver(
      ([entry]) => setRunning(entry.isIntersecting),
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!running) return undefined;
    const t = setInterval(() => {
      // Hold on the finished state for one extra beat, then loop.
      setActive((a) => (a >= steps.length ? 0 : a + 1));
    }, STEP_MS);
    return () => clearInterval(t);
  }, [running]);

  const done = Math.min(active, steps.length);
  const pct = Math.round((done / steps.length) * 100);
  const current = steps[Math.min(active, steps.length - 1)];

  return (
    <div className={styles.card} ref={ref} aria-label="Illustration of how a project moves through our four steps">
      <div className={styles.top}>
        <span className={styles.dots} aria-hidden="true"><i /><i /><i /></span>
        <span className={styles.tag}>Example project</span>
      </div>

      <div className={styles.head}>
        <span className={styles.title}>Business website</span>
        <span className={styles.pct} aria-hidden="true">{pct}%</span>
      </div>
      <div className={styles.bar} aria-hidden="true">
        <span style={{ transform: `scaleX(${pct / 100})` }} />
      </div>

      <ol className={styles.list}>
        {steps.map((s, i) => {
          const state = i < active ? 'done' : i === active ? 'now' : 'next';
          return (
            <li key={s.name} className={styles[state]}>
              <span className={styles.mark} aria-hidden="true">
                {state === 'done' ? (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2.5 6.2l2.2 2.2L9.5 3.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : null}
              </span>
              <span className={styles.name}>{s.name}</span>
              <span className={styles.state}>
                {state === 'done' ? 'Done' : state === 'now' ? 'In progress' : 'Next'}
              </span>
            </li>
          );
        })}
      </ol>

      <div className={styles.feed} aria-live="off">
        <span className={styles.pulse} aria-hidden="true" />
        <span key={active} className={styles.feedText}>
          {active >= steps.length ? 'Project complete. Support period starts.' : current.note}
        </span>
      </div>
    </div>
  );
};

export default ProjectDemo;
