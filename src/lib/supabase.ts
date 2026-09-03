import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

/**
 * .env.local(로컬) / Vercel 환경변수에 VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY가
 * 채워져 있으면 true. false일 때 api 레이어는 src/data의 하드코딩 값으로 폴백한다.
 */
export const isSupabaseConfigured = Boolean(url && anonKey);

// 미설정 시에도 import는 깨지지 않도록 placeholder로 생성 (실제 호출은 api 레이어에서 막음)
export const supabase = createClient(
  url ?? 'http://localhost',
  anonKey ?? 'public-anon-key',
);
