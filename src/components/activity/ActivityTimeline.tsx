import { useState } from 'react';
import { getActivities } from '../../api/activities';
import { useSupabaseQuery } from '../../lib/useSupabaseQuery';
import styles from './ActivityTimeline.module.css';

export default function ActivityTimeline() {
  // 지금 마우스가 올라가 있는 activity 항목의 id
  // 이 값이 바뀌면 컴포넌트가 다시 렌더돼서 강조/흐림 클래스가 갱신됨
  const [activeId, setActiveId] = useState<string | null>(null);

  const { data } = useSupabaseQuery('activities', getActivities);
  const items = data ?? [];

  return (
    <section className={styles.section}>
      <span className={styles.label}>활동</span>
      <h2 className={styles.heading}>Activity</h2>

      <div className={styles.timeline}>
        <div className={styles.line} />

        {items.map(item => {
          const isActive = item.id === activeId;
          return (
            <div
              key={item.id}
              // 마우스가 들어오면 이 항목 id 를 저장, 나가면 비운다
              onMouseEnter={() => setActiveId(item.id)}
              onMouseLeave={() => setActiveId(null)}
              // 백틱으로 클래스 문자열을 조합: 항상 item + (활성일 때 active / 아닐 때 inactive)
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