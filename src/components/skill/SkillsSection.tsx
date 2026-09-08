import { getSkills } from '../../api/skills';
import { useSupabaseQuery } from '../../lib/useSupabaseQuery';
import { useHorizontalWheelScroll } from '../../lib/useHorizontalWheelScroll';
import type { SkillItem } from '../../types/skills';
import SkillCard from './SkillCard';
import styles from './SkillsSection.module.css';

function SkillRow({ items }: { items: SkillItem[] }) {
  const rowRef = useHorizontalWheelScroll<HTMLDivElement>();
  return (
    <div className={styles.cardGrid} ref={rowRef}>
      {items.map(item => (
        <SkillCard key={item.id} item={item} />
      ))}
    </div>
  );
}

export default function SkillsSection() {
  const { data } = useSupabaseQuery('skills', getSkills);
  const groups = data ?? [];

  return (
    <section className={styles.section}>

      <h2 className={styles.heading}>Skill</h2>
      <p className={styles.subtitle}>백엔드를 중심으로, 필요하면 프론트엔드와 데이터까지 직접 다룹니다.</p>

      {groups.map(group => (
        <div key={group.category} className={styles.categoryBlock}>
          <h3 className={styles.categoryTitle}>{group.category}</h3>
          <SkillRow items={group.items} />
        </div>
      ))}
    </section>
  );
}
