import { useEffect, useRef, useState } from 'react';
import { useSupabaseQuery } from '../../lib/useSupabaseQuery';
import { getKeywordQuestions } from '../../api/keywordQuestions';
import { sendChatMessage, type ChatTurn } from '../../api/chat';
import type { KeywordQuestion } from '../../types/keywordQuestions';
import styles from './ChatBot.module.css';

interface ChatBotProps {
  
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

// DB(keyword_questions)에 그 키워드가 없을 때 대신 쓸 기본 문구를 생성
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
  // 키워드별 추천 질문 목록(DB). : keywordMap 은 구조분해하면서 이름만 바꾼 것.
  const { data: keywordMap } = useSupabaseQuery('keyword-questions', getKeywordQuestions);

  // 이 컴포넌트가 관리하는 4가지 상태
  const [messages, setMessages] = useState<ChatTurn[]>([GREETING]); // 대화 내역
  const [suggestions, setSuggestions] = useState<string[]>(DEFAULT_SUGGESTIONS); // 추천 질문 칩
  const [input, setInput] = useState(''); // 입력창 텍스트
  const [loading, setLoading] = useState(false); // 답변 대기 중 여부

  const scrollRef = useRef<HTMLDivElement>(null); // 메시지 영역 DOM (자동 스크롤용)

  // 워드클라우드에서 키워드를 누르면 selected prop 이 바뀐다. 그때 대화를 그 키워드용으로 리셋한다.
  // "언제 처리했는지"를 handledAt 에 기록해두고, selected.at 과 다를 때만 한 번 실행한다.
  // (prop 변화에 맞춰 state 를 맞추는 경우라 useEffect 대신 렌더 중에 처리 — React 공식 권장 패턴)
  const [handledAt, setHandledAt] = useState(0);
  if (selected && selected.at !== handledAt) {
    // DB 에서 키워드 항목을 찾고, 없으면 fallback 문구 사용
    const entry =
      keywordMap?.find(k => k.keyword === selected.keyword) ?? fallbackEntry(selected.keyword);
    setHandledAt(selected.at); // 이번 클릭은 처리 완료 표시
    setMessages([{ role: 'bot', text: entry.intro }]);
    setSuggestions(entry.questions);
    setInput('');
    setLoading(false);
  }

  // messages 나 loading 이 바뀔 때마다 스크롤을 맨 아래로 내린다 (새 말풍선이 보이도록).
  // useEffect(콜백, [의존성]) : 의존성 값이 바뀐 뒤 콜백이 실행된다.
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, loading]);

  // 질문 전송: 입력칸 엔터, 전송 버튼, 추천 칩 클릭이 모두 이 함수를 부른다.
  async function send(raw: string) {
    const text = raw.trim();
    if (!text || loading) return; // 빈 값이거나 이미 대기 중이면 무시

    // 상태(배열)는 직접 바꾸지 않고, 새 배열을 만들어 통째로 교체한다 (...스프레드)
    const next: ChatTurn[] = [...messages, { role: 'user', text }];
    setMessages(next);
    setInput('');
    setSuggestions([]);
    setLoading(true);

    try {
      const answer = await sendChatMessage(next); // Gemini 호출 (api/chat.ts)
      // m => [...m, ...] : 최신 상태를 받아서 갱신. 비동기 뒤엔 이 형태가 안전하다.
      setMessages(m => [...m, { role: 'bot', text: answer }]);
    } catch (err) {
      console.error('[ChatBot] sendChatMessage 실패', err);
      setMessages(m => [
        ...m,
        { role: 'bot', text: '답변 생성 중 문제가 발생했어요. 잠시 후 다시 시도해주세요.' },
      ]);
    } finally {
      setLoading(false); // 성공/실패 관계없이 대기 상태 해제
    }
  }

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <span className={styles.dot} />
        질문 챗봇
      </div>

      <div className={styles.messages} ref={scrollRef}>
        {/* 대화 내역을 말풍선으로. 역할(user/bot)에 따라 클래스가 달라져 좌우로 갈림 */}
        {messages.map((m, i) => (
          <div
            key={i}
            className={`${styles.bubble} ${m.role === 'user' ? styles.user : styles.bot}`}
          >
            {m.text}
          </div>
        ))}
        {/* 대기 중이면 "작성 중" 말풍선 표시 */}
        {loading && <div className={`${styles.bubble} ${styles.bot} ${styles.typing}`}>답변 작성 중…</div>}
      </div>

      {/* 추천 질문이 있을 때만 칩 목록 표시 */}
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

      {/* form 의 기본 동작은 페이지 새로고침이라 preventDefault() 로 막고 직접 처리 */}
      <form
        className={styles.inputRow}
        onSubmit={e => {
          e.preventDefault();
          send(input);
        }}
      >
        {/* 제어 컴포넌트: input 의 값을 state(input)가 쥐고 있고,
            타이핑(onChange)마다 state 를 갱신 → 다시 그 값이 화면에 반영된다 */}
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
