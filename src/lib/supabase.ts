import { createClient } from '@supabase/supabase-js';

// VITE_ 접두사가 붙은 값만 프론트 코드에서 읽을 수 있음
const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

if (!url || !anonKey) {
  throw new Error(
    'Supabase 환경변수가 없습니다. .env.local 에 VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY 를 설정하세요.',
  );
}

// 앱 전체가 공유하는 Supabase 클라이언트 하나. api/ 폴더의 함수들이 가져다 쓰는거
export const supabase = createClient(url, anonKey);
