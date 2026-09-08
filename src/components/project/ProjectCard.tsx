import type { ProjectItem } from '../../types/projects';
import ProjectLinks from './ProjectLinks';
import styles from './ProjectCard.module.css';

interface Props {
  project: ProjectItem;
  onClick: (project: ProjectItem) => void; // 카드를 누르면 부모에게 어떤 프로젝트인지 알린다
}

export default function ProjectCard({ project, onClick }: Props) {
  return (
    <div className={styles.card} onClick={() => onClick(project)}>
      <div className={styles.imageBox}>
        {project.image ? (
          <img src={project.image} alt={project.title} className={styles.image} />
        ) : (
          <div className={styles.imagePlaceholder} />
        )}
      </div>

      <div className={styles.content}>
        <div className={styles.titleRow}>
          <h3 className={styles.title}>{project.title}</h3>
          <ProjectLinks links={project.links} />
        </div>

        <p className={styles.meta}>
          {project.role} · {project.memberCount}인 · {project.period}
        </p>

        <div className={styles.tagRow}>
          {/* 기술 스택 배열을 태그로. 값 자체가 고유하므로 key 로 tech 문자열을 쓴다 */}
          {project.stack.map(tech => (
            <span key={tech} className={styles.tag}>{tech}</span>
          ))}
        </div>

        <p className={styles.summary}>{project.summary}</p>
      </div>
    </div>
  );
}