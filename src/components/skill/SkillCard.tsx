import type { IconType } from 'react-icons';
import {
  SiReact,
  SiTypescript,
  SiSpringboot,
  SiMysql,
  SiGit,
  SiDocker,
  SiNextdotjs,
  SiVite,
  SiTailwindcss,
  SiNodedotjs,
  SiPostgresql,
  SiGithubactions,
  SiVercel,
} from 'react-icons/si';
import { FaJava, FaAws } from 'react-icons/fa';
import type { SkillItem } from '../../types/skills';
import styles from './SkillCard.module.css';

const skillIcons: Record<string, IconType> = {
  react: SiReact,
  typescript: SiTypescript,
  java: FaJava,
  springboot: SiSpringboot,
  mysql: SiMysql,
  git: SiGit,
  docker: SiDocker,
  nextjs: SiNextdotjs,
  vite: SiVite,
  tailwind: SiTailwindcss,
  nodejs: SiNodedotjs,
  postgresql: SiPostgresql,
  'github-actions': SiGithubactions,
  vercel: SiVercel,
  aws: FaAws,
};

export default function SkillCard({ item }: { item: SkillItem }) {
  const Icon = skillIcons[item.id];

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        {Icon ? (
          <Icon className={styles.icon} aria-hidden />
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
