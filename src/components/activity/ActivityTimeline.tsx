import { useState } from 'react';
import { getActivities } from '../../api/activities';
import { useSupabaseQuery } from '../../lib/useSupabaseQuery';
import styles from './ActivityTimeline.module.css';

export default function ActivityTimeline() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const { data } = useSupabaseQuery('activities', getActivities);
  const items = data ?? [];

  return (
    <section className={styles.section}>
      <span className={styles.label}>ACTIVITY</span>
      <h2 className={styles.heading}>활동</h2>

      <div className={styles.timeline}>
        <div className={styles.line} />

        {items.map(item => {
          const isActive = item.id === activeId;
          return (
            <div
              key={item.id}
              onMouseEnter={() => setActiveId(item.id)}
              onMouseLeave={() => setActiveId(null)}
              className={`${styles.item} ${isActive ? styles.active : styles.inactive}`}
            >
              <span className={styles.dot} /> 
              <div className={styles.content}>
                <div className={styles.meta}>
                  <span className={styles.tag}>{item.type}</span>
                  <span className={styles.date}>{item.date}</span>
                </div>
                <p className={styles.title}>{item.title}</p>
                <p className={styles.description}>{item.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}