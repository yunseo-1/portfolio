import { getSkills } from '../../api/skills';
import { useSupabaseQuery } from '../../lib/useSupabaseQuery';
import SkillCard from './SkillCard';
import styles from './SkillsSection.module.css';

export default function SkillsSection() {
  const { data } = useSupabaseQuery('skills', getSkills);
  const groups = data ?? [];

  return (
    <section className={styles.section}>

      <h2 className={styles.heading}>이런 기술로 만듭니다</h2>
      <p className={styles.subtitle}>프론트엔드를 중심으로, 필요하면 백엔드와 데이터까지 직접 다룹니다.</p>

      {groups.map(group => (
        <div key={group.category} className={styles.categoryBlock}>
          <h3 className={styles.categoryTitle}>{group.category}</h3>
          <div className={styles.cardGrid}>
            {group.items.map(item => (
              <SkillCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}