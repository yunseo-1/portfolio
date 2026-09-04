import { useState } from 'react';
import type { BlogItem } from '../../data/blogs';
import styles from './BlogModal.module.css';

interface Props {
  blog: BlogItem;
  onClose: () => void;
}

export default function BlogModal({ blog, onClose }: Props) {
  const [showFull, setShowFull] = useState(false);

  const paragraphs = blog.content.split('\n\n').filter(Boolean);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose} aria-label="닫기">✕</button>

        <h2 className={styles.title}>{blog.title}</h2>
        <p className={styles.meta}>{blog.platform} · {blog.date}</p>

        {!showFull && <p className={styles.excerpt}>{blog.excerpt}</p>}

        {showFull ? (
          <div className={styles.contentBox}>
            {paragraphs.map((p, i) => (
              <p key={i} className={styles.paragraph}>{p}</p>
            ))}
            <a
              href={blog.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.originLink}
            >
              원문 보기 ↗
            </a>
          </div>
        ) : (
          <button className={styles.toggleBtn} onClick={() => setShowFull(true)}>
            상세보기 ▼
          </button>
        )}
      </div>
    </div>
  );
}
