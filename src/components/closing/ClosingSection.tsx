import styles from './ClosingSection.module.css';

const EMAIL = 'kimyunseo112@gmail.com';

export default function ClosingSection() {
  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>여기까지 봐주셔서 감사합니다</h2>
      <p className={styles.description}>
        안정적인 서비스를 만드는 과정을 좋아하는 신입 백엔드 개발자입니다. 함께 성장해갈 기회를 주시면 감사하겠습니다.
      </p>

      <a href={`mailto:${EMAIL}`} className={styles.emailBtn}>
        이메일 보내기
      </a>
    </section>
  );
}