import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { activitiesData, type ActivityItem } from '../data/activities';

interface ActivityRow {
  id: string;
  type: ActivityItem['type'];
  date: string;
  title: string;
  description: string;
}

export async function getActivities(): Promise<ActivityItem[]> {
  if (!isSupabaseConfigured) return activitiesData;

  const { data, error } = await supabase
    .from('activities')
    .select('*')
    .order('sort_order', { ascending: true });

  if (error) throw error;
  return (data as ActivityRow[]).map(row => ({
    id: row.id,
    type: row.type,
    date: row.date,
    title: row.title,
    description: row.description,
  }));
}
