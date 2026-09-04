import type { SkillItem } from '../../types/skills';
import styles from './SkillCard.module.css';

const iconModules = import.meta.glob('../../assets/skills/*.{svg,png,webp,jpg,jpeg}', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

const iconMap: Record<string, string> = {};
for (const path in iconModules) {
  const fileName = path.split('/').pop()!.replace(/\.[^.]+$/, '');
  iconMap[fileName] = iconModules[path];
}

export default function SkillCard({ item }: { item: SkillItem }) {
  const iconSrc = iconMap[item.id];

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        {iconSrc ? (
          <img src={iconSrc} alt={item.name} className={styles.icon} />
        ) : (
          <div className={styles.iconPlaceholder} />
        )}
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
