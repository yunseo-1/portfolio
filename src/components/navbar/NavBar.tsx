import { useTheme } from '../../lib/useTheme';
import styles from './NavBar.module.css';

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'wordcloud', label: 'About' },
  { id: 'skills', label: 'Skill' },
  { id: 'activity', label: 'Activity' },
  { id: 'projects', label: 'Project' },
  { id: 'blog', label: 'Blog' },
  { id: 'closing', label: 'Contact' },
];

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
  const { theme, toggleTheme } = useTheme();

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
