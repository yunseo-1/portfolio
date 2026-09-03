import styles from './CareerTimeline.module.css';

interface CareerItem {
  id: string;
  date: string;
  title: string;
  description: string;
}

const careerData: CareerItem[] = [
  {
    id: '1',
    date: '2021.03',
    title: '한국공학대학교\n컴퓨터공학과 입학',
    description: '웹 프로그래밍 동아리 활동 시작',
  },
  {
    id: '2',
    date: '2022.07',
    title: '걸음마 시작',
    description: '자취생 커뮤니티 앱 기획 개발',
  },
  {
    id: '3',
    date: '2023.01',
    title: '데브캠프\n8기 수료',
    description: '6개월 간 6단계 팀 프로젝트 수행',
  },
  {
    id: '4',
    date: '2023.09',
    title: '(주)파랑새\n프론트엔드 인턴',
    description: '결제 프로덕트 팀 합류',
  },
  {
    id: '5',
    date: '2024.03',
    title: '현대오토에버\n프론트엔드 인턴',
    description: '프론트엔드 개발 팀 합류',
  }
];

export default function CareerTimeline() {
  return (
    <section className={styles.career}>
      <span className={styles.label}>CAREER</span>
      <h2 className={styles.heading}>지금까지의 여정</h2>

      <div className={styles.timeline}>
        {careerData.map(item => (
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