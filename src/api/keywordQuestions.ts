import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { keywordQuestionsData, type KeywordQuestion } from '../data/keywordQuestions';

interface KeywordQuestionRow {
  keyword: string;
  intro: string;
  questions: string[] | null;
}

export async function getKeywordQuestions(): Promise<KeywordQuestion[]> {
  if (!isSupabaseConfigured) return keywordQuestionsData;

  const { data, error } = await supabase
    .from('keyword_questions')
    .select('*')
    .order('sort_order', { ascending: true });

  // keyword_questions 테이블은 순수 정적 콘텐츠라, 아직 마이그레이션 전이거나
  // 조회에 실패해도 로컬 데이터로 폴백해 기능이 끊기지 않도록 한다.
  if (error || !data || data.length === 0) {
    if (error) console.warn('[getKeywordQuestions] Supabase 조회 실패 → 로컬 폴백', error.message);
    return keywordQuestionsData;
  }

  return (data as KeywordQuestionRow[]).map(row => ({
    keyword: row.keyword,
    intro: row.intro,
    questions: row.questions ?? [],
  }));
}
