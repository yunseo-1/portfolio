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

// 스킬 id → 아이콘 컴포넌트 매핑표. DB 엔 아이콘을 못 담으니 여기서 id 로 연결한다.
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

// 스킬 카드 하나. 부모(SkillRow)가 item 을 prop 으로 내려준다.
export default function SkillCard({ item }: { item: SkillItem }) {
  // 대문자로 받아야 JSX 에서 <Icon /> 처럼 컴포넌트로 쓸 수 있다. 없으면 undefined.
  const Icon = skillIcons[item.id];

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        {/* 매핑에 아이콘이 있으면 그걸, 없으면 빈 자리표시자를 보여준다 */}
        {Icon ? (
          <Icon className={styles.icon} aria-hidden />
        ) : (
          <div className={styles.iconPlaceholder} />
        )}
        <span className={styles.name}>{item.name}</span>
      </div>

      <p className={styles.description}>{item.description}</p>

      {/* A && B : A 가 참일 때만 B 를 그린다. 목록이 비면 이 블록은 아예 안 나온다. */}
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
