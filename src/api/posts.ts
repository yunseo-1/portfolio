import { supabase } from '../lib/supabase';
import type { BlogItem } from '../types/blogs';

// 패턴 설명은 api/activities.ts 참고. (DB 테이블명은 posts, 앱에서는 Blog 로 부른다)
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
    date: row.published_on, // 컬럼명(published_on) → 앱에서 쓰는 이름(date)
    url: row.url,
    // ?? = 앞이 null/undefined 면 뒤 값 사용. 발췌문/본문이 없으면 description 으로 대체
    excerpt: row.excerpt ?? row.description,
    content: row.content ?? row.description,
  }));
}
