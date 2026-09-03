export interface ProjectItem {
  id: string;
  title: string;
  image: string;
  role: string;
  memberCount: number;
  period: string;
  stack: string[];
  summary: string;
  links: {
    demo?: string;
    github?: string;
  };
  retrospective: {
    overview: string;
    responsibilities: string[];
    implementations: string[];
    troubleshooting: string;
    learnings: string;
  };
}

export const projectsData: ProjectItem[] = [
  {
    id: 'portfolio',
    title: 'Portfolio Project',
    image: '',
    role: '프론트엔드 리드',
    memberCount: 4,
    period: '2026.07 ~ 2026.09',
    stack: ['React', 'TypeScript', 'JavaScript'],
    summary: '현대오토에버 모빌리티 SW 스쿨 첫 번째 프로젝트, 개인 포트폴리오 만들기',
    links: {
      demo: 'https://example.vercel.app',
      github: 'https://github.com/yunseo-1/portfolio',
    },
    retrospective: {
      overview:
        '이 프로젝트는 현대오토에버 모빌리티 SW스쿨 웹/앱 4기 첫 번째 팀 프로젝트로, 4인 팀에서 프론트엔드 리드를 맡아 진행했습니다. 목표는 깔끔한 1인 개발자 포트폴리오 사이트를 React 기반으로 구현하는 것이었습니다.',
      responsibilities: [
        '전체 컴포넌트 구조 설계 및 팀원 작업 분배 (Hero, Career, Stack, Activity, Projects, Blog 6개 섹션)',
        '디자인 토큰(색상, 타이포그래피, 스페이싱)을 CSS 변수로 시스템화해 팀원 전원이 동일한 기준으로 작업하도록 정리',
        'Git 브랜치 전략 수립 및 PR 리뷰 프로세스 운영',
      ],
      implementations: [
        'Activity 섹션의 스크롤 반응형 애니메이션을 IntersectionObserver로 구현',
        '카테고리 필터 기능에서 상태에 따라 항목을 숨기지 않고 opacity와 grayscale 필터로 시각적으로만 흐리게 처리',
        '프로젝트 카드의 상세 토글을 프로젝트별 독립 상태로 관리해 여러 카드를 동시에 펼쳐도 서로 간섭하지 않도록 설계',
      ],
      troubleshooting:
        '프로젝트 카드를 인라인으로 확장하는 초기 설계에서, 카드가 늘어날 때 아래 카드들이 밀리면서 사용자가 보던 위치를 잃어버리는 문제가 있었습니다. 이를 모달(오버레이) 방식으로 전환해 배경 컨텍스트를 유지하면서 상세 정보를 보여주는 구조로 개선했습니다.',
      learnings:
        '디자인 시스템을 코드보다 먼저 문서(디자인 토큰, 컴포넌트 스펙)로 확정해두는 것이 팀 작업 속도와 일관성에 얼마나 큰 영향을 미치는지 체감했습니다.',
    },
  },
  {
    id: 'roommate-community',
    title: '자취생 커뮤니티 앱',
    image: '',
    role: '풀스택 개발',
    memberCount: 3,
    period: '2022.06 ~ 2022.08',
    stack: ['React', 'Spring Boot', 'MySQL'],
    summary: '같은 동네 자취생끼리 생활 정보와 공동구매를 나누는 커뮤니티 서비스',
    links: {
      demo: 'https://example.vercel.app',
      github: 'https://github.com/yunseo-1/roommate-community',
    },
    retrospective: {
      overview: '자취생들이 동네 정보를 공유하고 공동구매를 진행할 수 있는 커뮤니티 서비스를 기획하고 개발했습니다.',
      responsibilities: ['프론트/백엔드 API 설계 및 구현', '게시판 CRUD 기능 개발'],
      implementations: ['JWT 기반 로그인 구현', '지역 기반 게시글 필터링 기능'],
      troubleshooting: '초기 DB 스키마 설계에서 게시글-댓글 관계를 잘못 설계해 조회 성능 이슈가 있었고, 인덱스를 추가해 해결했습니다.',
      learnings: 'DB 설계 단계에서 예상 트래픽과 조회 패턴을 미리 고려하는 것의 중요성을 배웠습니다.',
    },
  },
  {
    id: 'junction-asia',
    title: 'JUNCTION ASIA 2024 해커톤',
    image: '',
    role: 'Backend Developer',
    memberCount: 5,
    period: '2024.05',
    stack: ['Spring Boot', 'MySQL', 'OCR API'],
    summary: 'OCR 기반 데이터 처리 API 구현 및 공공데이터 API 연동',
    links: {
      demo: 'https://junction-asia-demo.vercel.app',
      github: 'https://github.com/yunseo-1/junction-asia-2024',
    },
    retrospective: {
      overview: '24시간 해커톤에서 OCR 기반 영수증 인식 서비스를 백엔드 개발자로 참여해 구현했습니다.',
      responsibilities: ['OCR API 연동 및 데이터 처리 로직 구현', '공공데이터 API 연동'],
      implementations: ['외부 OCR API 응답을 파싱해 정형 데이터로 변환하는 파이프라인 구축'],
      troubleshooting: '짧은 시간 내 API 연동 문서가 부실해 시행착오가 많았고, Postman으로 직접 응답을 확인하며 스펙을 역으로 정리했습니다.',
      learnings: '제한된 시간 안에서 우선순위를 정해 핵심 기능부터 완성하는 경험을 했습니다.',
    },
  },
];