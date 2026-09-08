import { supabase } from '../lib/supabase';
import type { CareerItem } from '../types/career';

// 패턴 설명은 api/activities.ts 참고.
interface CareerRow {
  id: string;
  date: string;
  title: string;
  description: string;
}

export async function getCareer(): Promise<CareerItem[]> {
  const { data, error } = await supabase
    .from('career')
    .select('*')
    .order('sort_order', { ascending: true });

  if (error) throw error;
  return (data as CareerRow[]).map(row => ({
    id: row.id,
    date: row.date,
    title: row.title,
    description: row.description,
  }));
}
