import { useState } from 'react';
import { projectsData, type ProjectItem } from '../../data/projects';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import styles from './ProjectsSection.module.css';

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  return (
    <section className={styles.section}>
      <span className={styles.label}>PROJECTS</span>
      <h2 className={styles.heading}>프로젝트</h2>

      <div className={styles.list}>
        {projectsData.map(project => (
          <ProjectCard key={project.id} project={project} onClick={setSelectedProject} />
        ))}
      </div>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}