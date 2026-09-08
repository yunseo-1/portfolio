import { useTheme } from '../../lib/theme-context';
import styles from './NavBar.module.css';

// 메뉴 목록을 데이터로 두고 아래에서 .map 으로 버튼을 찍는다.
// id 는 HomePage 의 <section id="..."> 와 짝이 맞아야 스크롤이 동작한다.
const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'wordcloud', label: 'About' },
  { id: 'skills', label: 'Skill' },
  { id: 'activity', label: 'Activity' },
  { id: 'projects', label: 'Project' },
  { id: 'blog', label: 'Blog' },
  { id: 'closing', label: 'Contact' },
];

// 아이콘도 그냥 작은 컴포넌트. JSX 를 반환하면 <SunIcon /> 처럼 태그로 쓸 수 있다.
function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
    </svg>
  );
}

export default function NavBar() {
  // Context 에서 현재 테마와 토글 함수를 꺼낸다 (ThemeProvider 가 값을 제공)
  const { theme, toggleTheme } = useTheme();

  // 메뉴 클릭 시 해당 id의 섹션으로 부드럽게 스크롤.
  // ?. = 그런 id 의 요소가 없으면 그냥 아무 일도 안 하고 넘어감
  const handleClick = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={styles.navbar}>
      <button
        type="button"
        className={styles.brand}
        onClick={() => handleClick('home')}
        aria-label="맨 위로"
      >
        <span className={styles.brandName}>김윤서's portfolio</span>
      </button>

      <div className={styles.links}>
        {/* 배열을 .map 으로 돌려 요소 목록을 만든다. key 는 React 가 각 항목을
            구분하는 표식이라 형제끼리 겹치지 않는 고정값(여기선 id)을 준다. */}
        {navItems.map(item => (
          <button
            key={item.id}
            className={styles.navButton}
            onClick={() => handleClick(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* 테마 토글. 조건부(삼항)로 지금 테마에 맞는 아이콘과 라벨을 고른다. */}
      <button
        type="button"
        className={styles.themeToggle}
        onClick={toggleTheme}
        aria-label={theme === 'dark' ? '라이트 모드로 전환' : '다크 모드로 전환'}
        title={theme === 'dark' ? '라이트 모드' : '다크 모드'}
      >
        {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
      </button>
    </nav>
  );
}
