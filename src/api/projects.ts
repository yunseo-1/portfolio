import { supabase } from '../lib/supabase';
import type { ProjectItem } from '../data/projects';

interface ProjectRow {
  slug: string;
  title: string;
  thumbnail_url: string | null;
  role: string;
  member_count: number;
  period: string;
  stack: string[] | null;
  summary: string;
  demo_url: string | null;
  github_url: string | null;
  overview: string | null;
  responsibilities: string[] | null;
  implementations: string[] | null;
  troubleshooting: string | null;
  learnings: string | null;
}

function fromRow(row: ProjectRow): ProjectItem {
  return {
    id: row.slug,
    title: row.title,
    image: row.thumbnail_url ?? '',
    role: row.role,
    memberCount: row.member_count,
    period: row.period,
    stack: row.stack ?? [],
    summary: row.summary,
    links: {
      demo: row.demo_url ?? undefined,
      github: row.github_url ?? undefined,
    },
    retrospective: {
      overview: row.overview ?? '',
      responsibilities: row.responsibilities ?? [],
      implementations: row.implementations ?? [],
      troubleshooting: row.troubleshooting ?? '',
      learnings: row.learnings ?? '',
    },
  };
}

export async function getProjects(): Promise<ProjectItem[]> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('sort_order', { ascending: true });

  if (error) throw error;
  return (data as ProjectRow[]).map(fromRow);
}
