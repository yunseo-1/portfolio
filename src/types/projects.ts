export interface ProjectItem {
  id: string;
  title: string;
  image: string;
  role: string;
  memberCount: number;
  period: string;
  stack: string[];
  summary: string;
  links: {
    demo?: string;
    github?: string;
  };
  retrospective: {
    overview: string;
    responsibilities: string[];
    implementations: string[];
    troubleshooting: string;
    learnings: string;
  };
}
