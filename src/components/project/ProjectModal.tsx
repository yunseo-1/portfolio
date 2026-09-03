import { useState } from 'react';
import type { ProjectItem } from '../../data/projects';
import styles from './ProjectModal.module.css';

interface Props {
  project: ProjectItem;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: Props) {
  const [showDetail, setShowDetail] = useState(false);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>✕</button>

        <div className={styles.header}>
          <h2 className={styles.title}>{project.title}</h2>
          <div className={styles.icons}>
            {project.links.demo && <span className={styles.iconBtn}>🔗</span>}
            {project.links.github && <span className={styles.iconBtn}>🐙</span>}
          </div>
        </div>

        <div className={styles.tagRow}>
          {project.stack.map(tech => (
            <span key={tech} className={styles.tag}>{tech}</span>
          ))}
        </div>

        <p className={styles.meta}>
          {project.role} · {project.memberCount}인 · {project.period}
        </p>

        <p className={styles.summary}>{project.summary}</p>

        <div className={styles.imageRow}>
          {[0, 1, 2].map(i => (
            <div key={i} className={styles.imagePlaceholder} />
          ))}
        </div>

        <button
          className={styles.toggleBtn}
          onClick={() => setShowDetail(prev => !prev)}
        >
          {showDetail ? '상세 설명 접기 ▲' : '상세 설명 보기 (회고록) ▼'}
        </button>

        {showDetail && (
          <div className={styles.detailBox}>
            <p className={styles.detailParagraph}>{project.retrospective.overview}</p>

            <p className={styles.sectionLabel}>담당 역할</p>
            <ul className={styles.list}>
              {project.retrospective.responsibilities.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>

            <p className={styles.sectionLabel}>주요 구현 내용</p>
            <ul className={styles.list}>
              {project.retrospective.implementations.map((im, i) => (
                <li key={i}>{im}</li>
              ))}
            </ul>

            <p className={styles.sectionLabel}>트러블슈팅</p>
            <p className={styles.detailParagraph}>{project.retrospective.troubleshooting}</p>

            <p className={styles.sectionLabel}>배운 점</p>
            <p className={styles.detailParagraph}>{project.retrospective.learnings}</p>
          </div>
        )}
      </div>
    </div>
  );
}