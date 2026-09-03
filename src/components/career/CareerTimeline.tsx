import { getCareer } from '../../api/career';
import { useSupabaseQuery } from '../../lib/useSupabaseQuery';
import styles from './CareerTimeline.module.css';

export default function CareerTimeline() {
  const { data } = useSupabaseQuery('career', getCareer);
  const items = data ?? [];

  return (
    <section className={styles.career}>
      <span className={styles.label}>CAREER</span>
      <h2 className={styles.heading}>지금까지의 여정</h2>

      <div className={styles.timeline}>
        {items.map(item => (
          <div key={item.id} className={styles.item}>
            <span className={styles.date}>{item.date}</span>
            <p className={styles.title}>
              {item.title.split('\n').map((line, i) => (
                <span key={i}>
                  {line}
                  <br />
                </span>
              ))}
            </p>
            <p className={styles.description}>{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
