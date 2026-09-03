import styles from './NavBar.module.css';

const navItems = [
  { id: 'home', label: 'About' },
  { id: 'wordcloud', label: 'Word Cloud' },
  { id: 'skills', label: 'Skills' },
  { id: 'activity', label: 'Activity' },
  { id: 'projects', label: 'Projects' },
  { id: 'blog', label: 'Blog' },
  { id: 'closing', label: 'Contact' },
];

export default function NavBar() {
  const handleClick = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={styles.navbar}>
      {navItems.map(item => (
        <button
          key={item.id}
          className={styles.navButton}
          onClick={() => handleClick(item.id)}
        >
          {item.label}
        </button>
      ))}
    </nav>
  );
}