import heroImg from '../../assets/hero.jpeg';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.left}>
        <h1 className={styles.headline}>
          <span className={styles.underline}>사용자가 불편하지 않도록</span>
          <br />
          <span className={styles.underline}>동작하는 서버를 만듭니다.</span>
        </h1>

        <span className={styles.role}>Backend Developer</span>

        <p className={styles.description}>
           안녕하세요, 김윤서입니다. Java/Spring Boot 기반으로 안정적인 API를 설계하고, 문제가 생기면 끝까지 파고드는 개발자입니다.
        </p>

        <ul className={styles.contacts}>
          <li><a href="mailto:yunseo1229@naver.com" className={styles.chip}>email</a></li>
          <li><a href="https://github.com/yunseo-1" className={styles.chip}>GitHub</a></li>
          <li><a href="https://kimyunseo112.tistory.com/" className={styles.chip}>tistory</a></li>
          <li><a href="https://www.linkedin.com/in/%EC%9C%A4%EC%84%9C-%EA%B9%80-941b5631b/" className={styles.chip}>LinkedIn</a></li>
        </ul>
      </div>

      <div className={styles.right}>
        <img src={heroImg} alt="프로필 사진" className={styles.profileImg} />
      </div>
    </section>
  );
}