import { BOT_SYSTEM_PROMPT } from '../data/botContext';

/**
 * Gemini 직접 호출 (프론트엔드).
 * VITE_GEMINI_API_KEY 가 번들에 포함되므로 데모/개발용이다.
 * 운영에서는 이 함수 본문만 서버리스 프록시(/api/chat) 호출로 교체하면 된다.
 */
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY as string | undefined;
const MODEL = 'gemini-3.6-flash';
const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

export interface ChatTurn {
  role: 'user' | 'bot';
  text: string;
}

export const isChatConfigured = Boolean(API_KEY);

interface GeminiPart {
  text?: string;
}

export async function sendChatMessage(history: ChatTurn[]): Promise<string> {
  if (!API_KEY) {
    return 'AI 응답 기능이 아직 연결되지 않았어요. (VITE_GEMINI_API_KEY 를 설정하면 활성화됩니다.)';
  }

  // Gemini contents 는 첫 턴이 user 여야 하므로 앞쪽 봇 인사말은 제외한다.
  const turns = [...history];
  while (turns.length && turns[0].role === 'bot') turns.shift();

  const contents = turns.map(t => ({
    role: t.role === 'user' ? 'user' : 'model',
    parts: [{ text: t.text }],
  }));

  const res = await fetch(`${ENDPOINT}?key=${API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      system_instruction: { parts: [{ text: BOT_SYSTEM_PROMPT }] },
      contents,
      // thinking 토큰도 maxOutputTokens에 포함되므로 넉넉히 잡고,
      // 응답 지연을 줄이기 위해 thinking을 최소로 낮춘다.
      // (thinkingBudget:0 은 gemini-3.6-flash에서 400을 반환)
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 2048,
        thinkingConfig: { thinkingLevel: 'low' },
      },
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    throw new Error(`Gemini API ${res.status}: ${detail.slice(0, 300)}`);
  }

  const data = await res.json();
  const parts: GeminiPart[] = data?.candidates?.[0]?.content?.parts ?? [];
  const text = parts.map(p => p.text ?? '').join('').trim();
  if (text) return text;

  const reason = data?.candidates?.[0]?.finishReason;
  console.warn('[sendChatMessage] 빈 응답', { finishReason: reason, data });
  return '답변을 생성하지 못했어요. 다시 시도해주세요.';
}
