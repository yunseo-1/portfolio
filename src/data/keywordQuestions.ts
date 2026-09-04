export interface KeywordQuestion {
  /** WordCloud에 표시되는 키워드 텍스트와 정확히 일치해야 매칭된다 */
  keyword: string;
  /** 키워드 클릭 시 챗봇 초기 상태로 교체되는 봇 메시지 */
  intro: string;
  /** 추천 질문 버블 (클릭하면 그대로 전송된다) */
  questions: string[];
}
