import type { ProjectItem } from '../data/projects';
import styles from './ProjectCard.module.css';

interface Props {
  project: ProjectItem;
  onClick: (project: ProjectItem) => void;
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
          <div className={styles.icons}>
            {project.links.demo && <span className={styles.iconBtn}>🔗</span>}
            {project.links.github && <span className={styles.iconBtn}>🐙</span>}
          </div>
        </div>

        <p className={styles.meta}>
          {project.role} · {project.memberCount}인 · {project.period}
        </p>

        <div className={styles.tagRow}>
          {project.stack.map(tech => (
            <span key={tech} className={styles.tag}>{tech}</span>
          ))}
        </div>

        <p className={styles.summary}>{project.summary}</p>
      </div>
    </div>
  );
}