export interface SkillItem {
  id: string;
  name: string;
  description: string;
  abilities: string[];
  libraries: string[];
}

export interface SkillCategory {
  category: string;
  items: SkillItem[];
}

export const skillsData: SkillCategory[] = [
  {
    category: 'Frontend',
    items: [
      {
        id: 'react',
        name: 'React',
        description: '상태 관리와 컴포넌트 설계에 능숙합니다.',
        abilities: ['컴포넌트 재사용 구조 설계', '커스텀 훅으로 로직 분리', '렌더링 최적화(memo, useCallback)'],
        libraries: ['React Query', 'Redux Toolkit', 'React Router'],
      },
      {
        id: 'typescript',
        name: 'TypeScript',
        description: 'Props 타입 정의와 제네릭 활용 경험이 있습니다.',
        abilities: ['인터페이스 기반 타입 설계', '제네릭으로 재사용 가능한 컴포넌트 작성'],
        libraries: [],
      },
    ],
  },
  {
    category: 'Backend',
    items: [
      {
        id: 'java',
        name: 'Java',
        description: '객체지향 설계와 자료구조 활용에 익숙합니다.',
        abilities: ['클래스 설계 및 상속/다형성 활용', '컬렉션 프레임워크 기반 자료처리'],
        libraries: [],
      },
      {
        id: 'springboot',
        name: 'Spring Boot',
        description: 'REST API 설계와 계층 분리에 능숙합니다.',
        abilities: ['Controller-Service-Repository 계층 설계', '예외처리 및 공통 응답 포맷 구성', 'JWT 기반 인증 흐름 구현'],
        libraries: ['Spring Data JPA', 'Spring Security'],
      },
      {
        id: 'mysql',
        name: 'MySQL',
        description: '쿼리 최적화와 스키마 설계 기초를 갖췄습니다.',
        abilities: ['정규화된 테이블 설계', '인덱스를 활용한 쿼리 튜닝'],
        libraries: [],
      },
    ],
  },
  {
    category: 'Data & DevOps',
    items: [
      {
        id: 'git',
        name: 'Git',
        description: '브랜치 전략과 충돌 해결에 익숙합니다.',
        abilities: ['Git Flow 기반 브랜치 관리', 'merge conflict 해결 경험'],
        libraries: [],
      },
      {
        id: 'docker',
        name: 'Docker',
        description: '컨테이너 기반 배포 환경 구성에 익숙합니다.',
        abilities: ['Dockerfile 작성 및 이미지 빌드', 'docker-compose로 멀티 컨테이너 환경 구성'],
        libraries: [],
      },
    ],
  },
];