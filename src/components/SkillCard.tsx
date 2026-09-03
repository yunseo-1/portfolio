import type { SkillItem } from '../data/skills';
import styles from './SkillCard.module.css';

export default function SkillCard({ item }: { item: SkillItem }) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.iconPlaceholder} />
        <span className={styles.name}>{item.name}</span>
      </div>

      <p className={styles.description}>{item.description}</p>

      {item.abilities.length > 0 && (
        <div className={styles.block}>
          <p className={styles.blockLabel}>할 수 있는 것</p>
          <ul className={styles.list}>
            {item.abilities.map((a, i) => (
              <li key={i}>{a}</li>
            ))}
          </ul>
        </div>
      )}

      {item.libraries.length > 0 && (
        <div className={styles.block}>
          <p className={styles.blockLabel}>함께 쓴 라이브러리</p>
          <div className={styles.tagRow}>
            {item.libraries.map((lib, i) => (
              <span key={i} className={styles.tag}>{lib}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}