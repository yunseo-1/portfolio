// src/components/BlogSection.tsx
import { blogsData } from '../data/blogs';
import styles from './BlogSection.module.css';

export default function BlogSection() {
  return (
    <section className={styles.section}>
      <span className={styles.label}>BLOGS</span>
      <h2 className={styles.heading}>공부하고 기록한 글들</h2>

      <div className={styles.list}>
        {blogsData.map(blog => (
          <a
            key={blog.id}
            href={blog.url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.item}
          >
            <div className={styles.textBox}>
              <h3 className={styles.title}>{blog.title}</h3>
              <p className={styles.description}>{blog.description}</p>
              <span className={styles.meta}>{blog.platform} · {blog.date}</span>
            </div>

            <span className={styles.arrow}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="1.5" />
                <path d="M9 16L15 12L9 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}