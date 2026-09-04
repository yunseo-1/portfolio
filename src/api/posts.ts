import { supabase } from '../lib/supabase';
import type { BlogItem } from '../types/blogs';

interface PostRow {
  id: string;
  title: string;
  description: string;
  platform: BlogItem['platform'];
  published_on: string;
  url: string;
  excerpt: string | null;
  content: string | null;
}

export async function getPosts(): Promise<BlogItem[]> {
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
    excerpt: row.excerpt ?? row.description,
    content: row.content ?? row.description,
  }));
}
