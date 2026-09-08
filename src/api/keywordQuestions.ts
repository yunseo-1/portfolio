import { supabase } from '../lib/supabase';
import type { KeywordQuestion } from '../types/keywordQuestions';

// 패턴 설명은 api/activities.ts 참고.
interface KeywordQuestionRow {
  keyword: string;
  intro: string;
  questions: string[] | null; // DB 에서 비어 있을 수 있어 null 허용 → 아래에서 [] 로 보정
}

export async function getKeywordQuestions(): Promise<KeywordQuestion[]> {
  const { data, error } = await supabase
    .from('keyword_questions')
    .select('*')
    .order('sort_order', { ascending: true });

  if (error) throw error;
  return (data as KeywordQuestionRow[]).map(row => ({
    keyword: row.keyword,
    intro: row.intro,
    questions: row.questions ?? [],
  }));
}
