import styles from './ClosingSection.module.css';

const EMAIL = 'example@gmail.com';

export default function ClosingSection() {
  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>여기까지 봐주셔서 감사합니다</h2>
      <p className={styles.description}>
        더 나은 제품을 만드는 과정을 좋아합니다. 함께 일하고 싶으시다면 편하게 연락 주세요.
      </p>

      <a href={`mailto:${EMAIL}`} className={styles.emailBtn}>
        이메일 보내기
      </a>
    </section>
  );
}