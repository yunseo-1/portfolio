import { useState } from 'react';
import type { ProjectItem } from '../../types/projects';
import { getProjects } from '../../api/projects';
import { useSupabaseQuery } from '../../lib/useSupabaseQuery';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import styles from './ProjectsSection.module.css';

// BlogSection 과 같은 구조: 목록을 카드로 보여주고, 클릭하면 모달을 연다.
export default function ProjectsSection() {
  // null 이면 모달 닫힘, 프로젝트가 들어 있으면 그 프로젝트로 모달이 열린다
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const { data } = useSupabaseQuery('projects', getProjects);
  const projects = data ?? [];

  return (
    <section className={styles.section}>
      <span className={styles.label}>프로젝트</span>
      <h2 className={styles.heading}>Project</h2>

      <div className={styles.list}>
        {/* onClick 으로 setSelectedProject 함수를 그대로 넘긴다.
            카드가 onClick(project) 를 호출하면 그 프로젝트가 상태에 담긴다. */}
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