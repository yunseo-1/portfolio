export interface BlogItem {
  id: string;
  title: string;
  description: string;
  platform: '벨로그' | '노션';
  date: string;
  url: string;
}

export const blogsData: BlogItem[] = [
  {
    id: '1',
    title: '디자인시스템 컴포넌트 네이밍 원칙 정리',
    description: '팀 프로젝트에서 컴포넌트 이름을 통일하며 배운 네이밍 규칙',
    platform: '벨로그',
    date: '2025.08',
    url: 'https://velog.io/@yunseo/design-system-naming',
  },
  {
    id: '2',
    title: 'IntersectionObserver로 스크롤 애니메이션 구현하기',
    description: '뷰포트 진입 감지로 부드러운 타임라인 인터랙션 만든 과정',
    platform: '벨로그',
    date: '2025.08',
    url: 'https://velog.io/@yunseo/intersection-observer',
  },
  {
    id: '3',
    title: 'CSS 모듈과 전역 스타일 분리 전략',
    description: '팀 프로젝트에서 스타일 충돌을 방지한 방법 정리',
    platform: '노션',
    date: '2025.07',
    url: 'https://notion.so/example',
  },
  {
    id: '4',
    title: 'Spring Boot 예외 처리 공통화하기',
    description: 'ControllerAdvice로 에러 응답 포맷을 통일한 경험',
    platform: '벨로그',
    date: '2025.06',
    url: 'https://velog.io/@yunseo/spring-exception-handling',
  },
];