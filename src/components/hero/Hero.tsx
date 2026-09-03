import heroImg from '../../assets/hero.png';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.left}>
        <h1 className={styles.headline}>
          <span className={styles.underline}>사용자의 시간을 아껴주는</span>
          <br />
          <span className={styles.underline}>인터페이스를 만듭니다</span>
        </h1>

        <span className={styles.role}>Frontend Developer</span>

        <p className={styles.description}>
          안녕하세요, 김윤서입니다. React/TypeScript 기반 프로덕트를 만들고
          데이터로 검증하는 일을 좋아합니다. 작은 디테일이 큰 신뢰를 만든다고 믿어요.
        </p>

        <div className={styles.contacts}>
          <a href="mailto:example@gmail.com" className={styles.chip}>· example@gmail.com</a>
          <a href="https://github.com/yunseo-1" className={styles.chip}>· GitHub</a>
          <a href="https://kimyunseo112.tistory.com/" className={styles.chip}>· velog</a>
          <a href="https://www.linkedin.com/in/%EC%9C%A4%EC%84%9C-%EA%B9%80-941b5631b/" className={styles.chip}>· LinkedIn</a>
        </div>
      </div>

      <div className={styles.right}>
        <img src={heroImg} alt="프로필 사진" className={styles.profileImg} />
      </div>
    </section>
  );
}