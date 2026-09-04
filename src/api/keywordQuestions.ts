import { supabase } from '../lib/supabase';
import type { KeywordQuestion } from '../types/keywordQuestions';

interface KeywordQuestionRow {
  keyword: string;
  intro: string;
  questions: string[] | null;
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
