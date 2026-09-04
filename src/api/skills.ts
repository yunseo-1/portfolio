import { supabase } from '../lib/supabase';
import type { SkillCategory, SkillItem } from '../data/skills';

interface SkillRow {
  id: string;
  category: string;
  category_order: number;
  name: string;
  description: string;
  abilities: string[] | null;
  libraries: string[] | null;
}

export async function getSkills(): Promise<SkillCategory[]> {
  const { data, error } = await supabase
    .from('skills')
    .select('*')
    .order('category_order', { ascending: true })
    .order('sort_order', { ascending: true });

  if (error) throw error;

  const groups = new Map<string, SkillItem[]>();
  for (const row of data as SkillRow[]) {
    const item: SkillItem = {
      id: row.id,
      name: row.name,
      description: row.description,
      abilities: row.abilities ?? [],
      libraries: row.libraries ?? [],
    };
    const bucket = groups.get(row.category);
    if (bucket) bucket.push(item);
    else groups.set(row.category, [item]);
  }

  return [...groups.entries()].map(([category, items]) => ({ category, items }));
}
