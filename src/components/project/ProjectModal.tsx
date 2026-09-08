import { useState } from 'react';
import type { ProjectItem } from '../../types/projects';
import ProjectLinks from './ProjectLinks';
import styles from './ProjectModal.module.css';

interface Props {
  project: ProjectItem;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: Props) {
  // 회고록(상세 설명) 펼침 여부. BlogModal 의 showFull 과 같은 아이디어.
  const [showDetail, setShowDetail] = useState(false);

  return (
    // overlay 클릭 = 닫기 / 안쪽 클릭은 stopPropagation 으로 번짐을 막아 안 닫히게 함
    // (자세한 설명은 BlogModal.tsx 참고)
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>✕</button>

        <div className={styles.header}>
          <h2 className={styles.title}>{project.title}</h2>
          <ProjectLinks links={project.links} />
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

        {project.image ? (
          <img src={project.image} alt={project.title} className={styles.modalImage} />
        ) : (
          // 이미지 없을 때: 자리표시자 3개. [0,1,2] 를 map 해서 반복 요소를 만든다.
          <div className={styles.imageRow}>
            {[0, 1, 2].map(i => (
              <div key={i} className={styles.imagePlaceholder} />
            ))}
          </div>
        )}

        <button
          className={styles.toggleBtn}
          // prev => !prev : 이전 값을 뒤집어 펼침/접힘 토글
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