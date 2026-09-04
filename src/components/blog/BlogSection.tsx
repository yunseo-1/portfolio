import { useState } from 'react';
import { getPosts } from '../../api/posts';
import { useSupabaseQuery } from '../../lib/useSupabaseQuery';
import type { BlogItem } from '../../types/blogs';
import BlogModal from './BlogModal';
import styles from './BlogSection.module.css';

export default function BlogSection() {
  const { data } = useSupabaseQuery('posts', getPosts);
  const posts = data ?? [];

  const [selectedBlog, setSelectedBlog] = useState<BlogItem | null>(null);

  return (
    <section className={styles.section}>
      <span className={styles.label}>BLOGS</span>
      <h2 className={styles.heading}>공부하고 기록한 글들</h2>

      <div className={styles.list}>
        {posts.map(blog => (
          <button
            key={blog.id}
            type="button"
            className={styles.item}
            onClick={() => setSelectedBlog(blog)}
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
          </button>
        ))}
      </div>

      {selectedBlog && (
        <BlogModal blog={selectedBlog} onClose={() => setSelectedBlog(null)} />
      )}
    </section>
  );
}
