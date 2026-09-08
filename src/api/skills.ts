import { supabase } from '../lib/supabase';
import type { SkillCategory, SkillItem } from '../types/skills';

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

  // category 문자열 → 그 카테고리에 속한 스킬 배열. Map 으로 같은 카테고리끼리 모은다.
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
    if (bucket) bucket.push(item); // 이미 있으면 뒤에 추가
    else groups.set(row.category, [item]); // 처음 보는 카테고리면 새 배열로 시작
  }

  // Map → [{ category, items }] 배열로. 이미 category_order 순으로 정렬돼 들어왔으므로 순서 유지됨.
  return [...groups.entries()].map(([category, items]) => ({ category, items }));
}
