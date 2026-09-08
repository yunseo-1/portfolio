import { getCareer } from '../../api/career';
import { useSupabaseQuery } from '../../lib/useSupabaseQuery';
import { useHorizontalWheelScroll } from '../../lib/useHorizontalWheelScroll';
import styles from './CareerTimeline.module.css';

export default function CareerTimeline() {
  // Supabase 에서 경력 목록을 불러온다. 첫 렌더 땐 data 가 null 이라
  // ?? [] 로 빈 배열을 대신 써서 아래 .map 이 안전하게 돌아가게 한다.
  const { data } = useSupabaseQuery('career', getCareer);
  const items = data ?? [];

  // 타임라인이 가로로 길어서 세로 휠을 가로 스크롤로 바꿔준다.
  // 훅이 돌려준 ref 를 스크롤 컨테이너 div 에 연결한다 (아래 ref={timelineRef}).
  const timelineRef = useHorizontalWheelScroll<HTMLDivElement>();

  return (
    <section className={styles.career}>
      <span className={styles.label}>Career</span>
      <h2 className={styles.heading}>지금까지의 여정</h2>

      <div className={styles.timeline} ref={timelineRef}>
        {items.map(item => (
          <div key={item.id} className={styles.item}>
            <span className={styles.date}>{item.date}</span>
            <p className={styles.title}>
              {/* title 안의 줄바꿈 문자(\n)를 실제 <br> 로 바꿔 그린다 */}
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
