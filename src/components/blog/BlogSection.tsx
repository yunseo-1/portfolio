import { useState } from 'react';
import { getPosts } from '../../api/posts';
import { useSupabaseQuery } from '../../lib/useSupabaseQuery';
import type { BlogItem } from '../../types/blogs';
import BlogModal from './BlogModal';
import styles from './BlogSection.module.css';

export default function BlogSection() {
  const { data } = useSupabaseQuery('posts', getPosts);
  const posts = data ?? [];

  // "지금 열려 있는 글". null 이면 모달 닫힘, 값이 있으면 그 글로 모달이 열린다.
  // 이렇게 상태 하나로 "열림 여부 + 어떤 데이터인지"를 동시에 표현하는 패턴이 흔하다.
  const [selectedBlog, setSelectedBlog] = useState<BlogItem | null>(null);

  return (
    <section className={styles.section}>
      <span className={styles.label}>공부하고 기록한 글들</span>
      <h2 className={styles.heading}>Blog</h2>

      <div className={styles.list}>
        {posts.map(blog => (
          <button
            key={blog.id}
            type="button"
            className={styles.item}
            onClick={() => setSelectedBlog(blog)} // 클릭한 글을 상태에 넣으면 아래 모달이 열림
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

      {/* selectedBlog 가 있을 때만 모달 렌더. 닫기 콜백은 상태를 null 로 돌린다. */}
      {selectedBlog && (
        <BlogModal blog={selectedBlog} onClose={() => setSelectedBlog(null)} />
      )}
    </section>
  );
}
