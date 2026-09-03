import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { blogsData, type BlogItem } from '../data/blogs';

interface PostRow {
  id: string;
  title: string;
  description: string;
  platform: BlogItem['platform'];
  published_on: string;
  url: string;
}

export async function getPosts(): Promise<BlogItem[]> {
  if (!isSupabaseConfigured) return blogsData;

  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('sort_order', { ascending: true });

  if (error) throw error;
  return (data as PostRow[]).map(row => ({
    id: row.id,
    title: row.title,
    description: row.description,
    platform: row.platform,
    date: row.published_on,
    url: row.url,
  }));
}
