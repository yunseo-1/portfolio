import { getSkills } from '../../api/skills';
import { useSupabaseQuery } from '../../lib/useSupabaseQuery';
import { useHorizontalWheelScroll } from '../../lib/useHorizontalWheelScroll';
import type { SkillItem } from '../../types/skills';
import SkillCard from './SkillCard';
import styles from './SkillsSection.module.css';

// 카테고리 한 줄(백,프론트,데이터) 훅은 컴포넌트당 한 세트만 쓸 수 있어서, 줄마다 별도 ref 가 필요하면
// 이렇게 줄을 작은 컴포넌트로 떼어내 각자 useHorizontalWheelScroll 을 갖게 한다.
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
  // getSkills 가 [{ category, items: [...] }] 형태로 카테고리별로 묶어서 준다
  const { data } = useSupabaseQuery('skills', getSkills);
  const groups = data ?? [];

  return (
    <section className={styles.section}>

      <h2 className={styles.heading}>Skill</h2>
      <p className={styles.subtitle}>백엔드를 중심으로, 필요하면 프론트엔드와 데이터까지 직접 다룹니다.</p>

      {/* 카테고리마다 제목 + 그 안의 카드 줄(SkillRow)을 그린다 */}
      {groups.map(group => (
        <div key={group.category} className={styles.categoryBlock}>
          <h3 className={styles.categoryTitle}>{group.category}</h3>
          <SkillRow items={group.items} />
        </div>
      ))}
    </section>
  );
}
