import { useEffect, useRef, useState } from 'react';
import { useSupabaseQuery } from '../../lib/useSupabaseQuery';
import { getKeywordQuestions } from '../../api/keywordQuestions';
import { sendChatMessage, type ChatTurn } from '../../api/chat';
import type { KeywordQuestion } from '../../data/keywordQuestions';
import styles from './ChatBot.module.css';

interface ChatBotProps {
  /** WordCloud 키워드 클릭 시 전달되는 선택값 (at: 같은 키워드 재클릭도 감지하기 위한 타임스탬프) */
  selected: { keyword: string; at: number } | null;
}

const GREETING: ChatTurn = {
  role: 'bot',
  text: '안녕하세요! 저에 대해 궁금한 점을 물어보세요. 왼쪽 워드클라우드의 키워드를 누르면 관련 질문을 추천해드려요.',
};

const DEFAULT_SUGGESTIONS = [
  '어떤 개발자라고 소개하고 싶나요?',
  '가장 기억에 남는 프로젝트는 무엇인가요?',
  '팀 프로젝트에서 협업을 어떻게 했나요?',
];

function fallbackEntry(keyword: string): KeywordQuestion {
  return {
    keyword,
    intro: `'${keyword}'에 대해 궁금하시군요. 아래 질문을 눌러보시거나 직접 물어보세요.`,
    questions: [
      `${keyword} 관련 경험을 알려주세요.`,
      `${keyword}(을)를 보여준 프로젝트가 있나요?`,
    ],
  };
}

export default function ChatBot({ selected }: ChatBotProps) {
  const { data: keywordMap } = useSupabaseQuery('keyword-questions', getKeywordQuestions);

  const [messages, setMessages] = useState<ChatTurn[]>([GREETING]);
  const [suggestions, setSuggestions] = useState<string[]>(DEFAULT_SUGGESTIONS);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  // 키워드 클릭 → 챗봇 초기 상태 교체.
  // prop 변화에 맞춰 state를 조정하는 경우라 effect 대신 렌더 중 갱신한다
  // (React 공식 권장 패턴: "이전 렌더 정보 저장하기").
  const [handledAt, setHandledAt] = useState(0);
  if (selected && selected.at !== handledAt) {
    const entry =
      keywordMap?.find(k => k.keyword === selected.keyword) ?? fallbackEntry(selected.keyword);
    setHandledAt(selected.at);
    setMessages([{ role: 'bot', text: entry.intro }]);
    setSuggestions(entry.questions);
    setInput('');
    setLoading(false);
  }

  // 새 메시지마다 하단으로 스크롤
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, loading]);

  async function send(raw: string) {
    const text = raw.trim();
    if (!text || loading) return;

    const next: ChatTurn[] = [...messages, { role: 'user', text }];
    setMessages(next);
    setInput('');
    setSuggestions([]);
    setLoading(true);

    try {
      const answer = await sendChatMessage(next);
      setMessages(m => [...m, { role: 'bot', text: answer }]);
    } catch (err) {
      console.error('[ChatBot] sendChatMessage 실패', err);
      setMessages(m => [
        ...m,
        { role: 'bot', text: '답변 생성 중 문제가 발생했어요. 잠시 후 다시 시도해주세요.' },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <span className={styles.dot} />
        질문 챗봇
      </div>

      <div className={styles.messages} ref={scrollRef}>
        {messages.map((m, i) => (
          <div
            key={i}
            className={`${styles.bubble} ${m.role === 'user' ? styles.user : styles.bot}`}
          >
            {m.text}
          </div>
        ))}
        {loading && <div className={`${styles.bubble} ${styles.bot} ${styles.typing}`}>답변 작성 중…</div>}
      </div>

      {suggestions.length > 0 && (
        <div className={styles.suggestions}>
          {suggestions.map(q => (
            <button
              key={q}
              type="button"
              className={styles.chip}
              onClick={() => send(q)}
              disabled={loading}
            >
              {q}
            </button>
          ))}
        </div>
      )}

      <form
        className={styles.inputRow}
        onSubmit={e => {
          e.preventDefault();
          send(input);
        }}
      >
        <input
          className={styles.input}
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="직접 질문해보세요"
          disabled={loading}
        />
        <button type="submit" className={styles.sendBtn} disabled={loading || !input.trim()}>
          전송
        </button>
      </form>
    </div>
  );
}
