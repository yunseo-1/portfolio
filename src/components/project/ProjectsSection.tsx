import { useState } from 'react';
import type { ProjectItem } from '../../data/projects';
import { getProjects } from '../../api/projects';
import { useSupabaseQuery } from '../../lib/useSupabaseQuery';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import styles from './ProjectsSection.module.css';

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const { data } = useSupabaseQuery('projects', getProjects);
  const projects = data ?? [];

  return (
    <section className={styles.section}>
      <span className={styles.label}>PROJECTS</span>
      <h2 className={styles.heading}>프로젝트</h2>

      <div className={styles.list}>
        {projects.map(project => (
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