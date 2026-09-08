import { useState } from 'react';
import type { BlogItem } from '../../types/blogs';
import styles from './BlogModal.module.css';

interface Props {
  blog: BlogItem;
  onClose: () => void;
}

export default function BlogModal({ blog, onClose }: Props) {
  // 처음엔 발췌문만 보여주고, 상세보기를 누르면 본문 전체를 편다
  const [showFull, setShowFull] = useState(false);

  // 빈 줄(\n\n) 기준으로 본문을 문단 배열로 나눈다. filter(Boolean) 로 빈 조각 제거.
  const paragraphs = blog.content.split('\n\n').filter(Boolean);

  return (
    // overlay(어두운 배경) 클릭 = 닫기.
    // 클릭 이벤트는 자식 → 부모로 번져 올라가는데, 모달 안을 클릭하면 여기까지 번져서 같이 닫혀버림
    // 그래서 안쪽 div 에서 stopPropagation() 으로 번짐을 끊는다.
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose} aria-label="닫기">✕</button>

        <h2 className={styles.title}>{blog.title}</h2>
        <p className={styles.meta}>{blog.platform} · {blog.date}</p>

        {/* 접힌 상태에서만 발췌문 표시 */}
        {!showFull && <p className={styles.excerpt}>{blog.excerpt}</p>}

        {/* 펼침 상태면 본문+원문링크, 아니면 "상세보기" 버튼 */}
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
