truncate table public.projects, public.activities, public.career, public.posts, public.skills, public.keyword_questions;

-- ---------- projects ----------
insert into public.projects
  (slug, title, thumbnail_url, role, member_count, period, stack, summary, demo_url, github_url,
   overview, responsibilities, implementations, troubleshooting, learnings, sort_order)
values
  ('portfolio', 'Portfolio Project', null, '프론트엔드 리드', 4, '2026.07 ~ 2026.09',
   array['React','TypeScript','JavaScript'],
   '현대오토에버 모빌리티 SW 스쿨 첫 번째 프로젝트, 개인 포트폴리오 만들기',
   'https://example.vercel.app', 'https://github.com/yunseo-1/portfolio',
   '이 프로젝트는 현대오토에버 모빌리티 SW스쿨 웹/앱 4기 첫 번째 팀 프로젝트로, 4인 팀에서 프론트엔드 리드를 맡아 진행했습니다. 목표는 깔끔한 1인 개발자 포트폴리오 사이트를 React 기반으로 구현하는 것이었습니다.',
   array[
     '전체 컴포넌트 구조 설계 및 팀원 작업 분배 (Hero, Career, Stack, Activity, Projects, Blog 6개 섹션)',
     '디자인 토큰(색상, 타이포그래피, 스페이싱)을 CSS 변수로 시스템화해 팀원 전원이 동일한 기준으로 작업하도록 정리',
     'Git 브랜치 전략 수립 및 PR 리뷰 프로세스 운영'
   ],
   array[
     'Activity 섹션의 스크롤 반응형 애니메이션을 IntersectionObserver로 구현',
     '카테고리 필터 기능에서 상태에 따라 항목을 숨기지 않고 opacity와 grayscale 필터로 시각적으로만 흐리게 처리',
     '프로젝트 카드의 상세 토글을 프로젝트별 독립 상태로 관리해 여러 카드를 동시에 펼쳐도 서로 간섭하지 않도록 설계'
   ],
   '프로젝트 카드를 인라인으로 확장하는 초기 설계에서, 카드가 늘어날 때 아래 카드들이 밀리면서 사용자가 보던 위치를 잃어버리는 문제가 있었습니다. 이를 모달(오버레이) 방식으로 전환해 배경 컨텍스트를 유지하면서 상세 정보를 보여주는 구조로 개선했습니다.',
   '디자인 시스템을 코드보다 먼저 문서(디자인 토큰, 컴포넌트 스펙)로 확정해두는 것이 팀 작업 속도와 일관성에 얼마나 큰 영향을 미치는지 체감했습니다.',
   0),

  ('roommate-community', '자취생 커뮤니티 앱', null, '풀스택 개발', 3, '2022.06 ~ 2022.08',
   array['React','Spring Boot','MySQL'],
   '같은 동네 자취생끼리 생활 정보와 공동구매를 나누는 커뮤니티 서비스',
   'https://example.vercel.app', 'https://github.com/yunseo-1/roommate-community',
   '자취생들이 동네 정보를 공유하고 공동구매를 진행할 수 있는 커뮤니티 서비스를 기획하고 개발했습니다.',
   array['프론트/백엔드 API 설계 및 구현', '게시판 CRUD 기능 개발'],
   array['JWT 기반 로그인 구현', '지역 기반 게시글 필터링 기능'],
   '초기 DB 스키마 설계에서 게시글-댓글 관계를 잘못 설계해 조회 성능 이슈가 있었고, 인덱스를 추가해 해결했습니다.',
   'DB 설계 단계에서 예상 트래픽과 조회 패턴을 미리 고려하는 것의 중요성을 배웠습니다.',
   1),

  ('junction-asia', 'JUNCTION ASIA 2024 해커톤', null, 'Backend Developer', 5, '2024.05',
   array['Spring Boot','MySQL','OCR API'],
   'OCR 기반 데이터 처리 API 구현 및 공공데이터 API 연동',
   'https://junction-asia-demo.vercel.app', 'https://github.com/yunseo-1/junction-asia-2024',
   '24시간 해커톤에서 OCR 기반 영수증 인식 서비스를 백엔드 개발자로 참여해 구현했습니다.',
   array['OCR API 연동 및 데이터 처리 로직 구현', '공공데이터 API 연동'],
   array['외부 OCR API 응답을 파싱해 정형 데이터로 변환하는 파이프라인 구축'],
   '짧은 시간 내 API 연동 문서가 부실해 시행착오가 많았고, Postman으로 직접 응답을 확인하며 스펙을 역으로 정리했습니다.',
   '제한된 시간 안에서 우선순위를 정해 핵심 기능부터 완성하는 경험을 했습니다.',
   2);

-- ---------- activities ----------
insert into public.activities (type, date, title, description, sort_order) values
  ('해커톤', '2021.03', 'HackDay 2023 최우수상', '글로벌 해커톤 본선 진출', 0),
  ('해커톤', '2024.05', 'JUNCTION ASIA 2024 해커톤', 'OCR 기반 데이터 처리 API 구현, 공공데이터 API 연동', 1),
  ('스터디', '2023.02', '알고리즘 스터디 8기', '매주 3회 코딩테스트 문제풀이 및 리뷰', 2),
  ('공모전', '2022.11', '교내 캡스톤 프로젝트 대상', '자취생 커뮤니티 앱 기획 및 개발', 3),
  ('밋업', '2024.08', 'DevCamp 네트워킹 밋업', '동료 개발자들과 프로젝트 회고 공유', 4);

-- ---------- career (title의 \n = 실제 줄바꿈, E'' 문자열) ----------
insert into public.career (date, title, description, sort_order) values
  ('2021.03', E'한국공학대학교\n컴퓨터공학과 입학', '웹 프로그래밍 동아리 활동 시작', 0),
  ('2022.07', '걸음마 시작', '자취생 커뮤니티 앱 기획 개발', 1),
  ('2023.01', E'데브캠프\n8기 수료', '6개월 간 6단계 팀 프로젝트 수행', 2),
  ('2023.09', E'(주)파랑새\n프론트엔드 인턴', '결제 프로덕트 팀 합류', 3),
  ('2024.03', E'현대오토에버\n프론트엔드 인턴', '프론트엔드 개발 팀 합류', 4);

-- ---------- posts ----------
insert into public.posts (title, description, platform, published_on, url, sort_order) values
  ('디자인시스템 컴포넌트 네이밍 원칙 정리', '팀 프로젝트에서 컴포넌트 이름을 통일하며 배운 네이밍 규칙', '벨로그', '2025.08', 'https://velog.io/@yunseo/design-system-naming', 0),
  ('IntersectionObserver로 스크롤 애니메이션 구현하기', '뷰포트 진입 감지로 부드러운 타임라인 인터랙션 만든 과정', '벨로그', '2025.08', 'https://velog.io/@yunseo/intersection-observer', 1),
  ('CSS 모듈과 전역 스타일 분리 전략', '팀 프로젝트에서 스타일 충돌을 방지한 방법 정리', '노션', '2025.07', 'https://notion.so/example', 2),
  ('Spring Boot 예외 처리 공통화하기', 'ControllerAdvice로 에러 응답 포맷을 통일한 경험', '벨로그', '2025.06', 'https://velog.io/@yunseo/spring-exception-handling', 3);

-- ---------- skills ----------
insert into public.skills (id, category, category_order, name, description, abilities, libraries, sort_order) values
  ('react', 'Frontend', 0, 'React', '상태 관리와 컴포넌트 설계에 능숙합니다.',
   array['컴포넌트 재사용 구조 설계','커스텀 훅으로 로직 분리','렌더링 최적화(memo, useCallback)'],
   array['React Query','Redux Toolkit','React Router'], 0),
  ('typescript', 'Frontend', 0, 'TypeScript', 'Props 타입 정의와 제네릭 활용 경험이 있습니다.',
   array['인터페이스 기반 타입 설계','제네릭으로 재사용 가능한 컴포넌트 작성'],
   '{}', 1),
  ('java', 'Backend', 1, 'Java', '객체지향 설계와 자료구조 활용에 익숙합니다.',
   array['클래스 설계 및 상속/다형성 활용','컬렉션 프레임워크 기반 자료처리'],
   '{}', 0),
  ('springboot', 'Backend', 1, 'Spring Boot', 'REST API 설계와 계층 분리에 능숙합니다.',
   array['Controller-Service-Repository 계층 설계','예외처리 및 공통 응답 포맷 구성','JWT 기반 인증 흐름 구현'],
   array['Spring Data JPA','Spring Security'], 1),
  ('mysql', 'Backend', 1, 'MySQL', '쿼리 최적화와 스키마 설계 기초를 갖췄습니다.',
   array['정규화된 테이블 설계','인덱스를 활용한 쿼리 튜닝'],
   '{}', 2),
  ('git', 'Data & DevOps', 2, 'Git', '브랜치 전략과 충돌 해결에 익숙합니다.',
   array['Git Flow 기반 브랜치 관리','merge conflict 해결 경험'],
   '{}', 0),
  ('docker', 'Data & DevOps', 2, 'Docker', '컨테이너 기반 배포 환경 구성에 익숙합니다.',
   array['Dockerfile 작성 및 이미지 빌드','docker-compose로 멀티 컨테이너 환경 구성'],
   '{}', 1);

-- ---------- keyword_questions (작은따옴표는 '' 로 이스케이프) ----------
insert into public.keyword_questions (keyword, intro, questions, sort_order) values
  ('협업', '''협업''을 선택하셨네요. 팀 프로젝트에서 제가 사람들과 어떻게 일했는지 아래 질문으로 확인해보세요.',
   array['팀 프로젝트에서 협업을 어떻게 했나요?','팀원 간 의견이 갈렸을 때 어떻게 조율했나요?','리드 역할을 맡았을 때 작업 분배는 어떤 기준으로 했나요?'], 0),
  ('팀워크', '''팀워크''를 선택하셨네요. 4인·5인 팀에서 제가 맡았던 역할과 협력 방식을 물어보실 수 있어요.',
   array['팀에서 주로 어떤 역할을 맡았나요?','PR 리뷰 프로세스는 어떻게 운영했나요?','팀 작업 속도를 높이기 위해 시도한 것이 있나요?'], 1),
  ('커뮤니케이션', '''커뮤니케이션''을 선택하셨네요. 팀 안에서 정보를 맞추고 문제를 공유한 방식을 물어보세요.',
   array['팀원들과 기준을 어떻게 맞췄나요?','설계 의도를 팀에 어떻게 전달했나요?','문서화는 어느 정도까지 하는 편인가요?'], 2),
  ('도전', '''도전''을 선택하셨네요. 해커톤·인턴 등 익숙하지 않은 환경에 뛰어든 경험을 물어보실 수 있어요.',
   array['가장 도전적이었던 경험은 무엇인가요?','해커톤에서 어떤 문제를 풀었나요?','처음 맡아본 역할에서 어떻게 적응했나요?'], 3),
  ('실행력', '''실행력''을 선택하셨네요. 제한된 시간 안에서 우선순위를 정하고 완성한 사례를 물어보세요.',
   array['제한된 시간에 어떻게 우선순위를 정하나요?','아이디어를 실제 결과물로 만든 경험이 있나요?','24시간 해커톤에서 무엇을 먼저 했나요?'], 4),
  ('성장', '''성장''을 선택하셨네요. 프로젝트를 거치며 무엇을 배우고 어떻게 바뀌었는지 물어보실 수 있어요.',
   array['최근 가장 크게 배운 것은 무엇인가요?','실패에서 배운 경험이 있나요?','개발자로서 어떤 방향으로 성장하고 싶나요?'], 5),
  ('문제해결', '''문제해결''을 선택하셨네요. 실제로 막혔던 지점과 그걸 어떻게 풀었는지 물어보세요.',
   array['가장 기억에 남는 트러블슈팅 경험은?','성능 이슈를 해결한 사례가 있나요?','문서가 부실한 API를 어떻게 다뤘나요?'], 6),
  ('꾸준함', '''꾸준함''을 선택하셨네요. 스터디·알고리즘 등 오래 유지한 습관을 물어보실 수 있어요.',
   array['꾸준히 이어온 활동이 있나요?','알고리즘 스터디는 어떻게 진행했나요?','학습 루틴을 어떻게 유지하나요?'], 7),
  ('성실함', '''성실함''을 선택하셨네요. 맡은 일을 어떻게 끝까지 챙기는지 물어보세요.',
   array['맡은 일을 끝까지 챙기는 자신만의 방법이 있나요?','반복적인 작업은 어떻게 관리하나요?'], 8),
  ('몰입', '''몰입''을 선택하셨네요. 한 문제에 깊게 빠져 해결한 경험을 물어보실 수 있어요.',
   array['한 가지 문제에 오래 매달린 경험이 있나요?','집중이 필요한 작업은 어떻게 환경을 만드나요?'], 9),
  ('개발', '''개발''을 선택하셨네요. 어떤 개발자인지, 어떤 방식으로 코드를 짜는지 물어보세요.',
   array['어떤 개발자라고 소개하고 싶나요?','코드를 짤 때 가장 중요하게 생각하는 것은?','가장 자신 있는 작업은 무엇인가요?'], 10),
  ('프론트엔드', '''프론트엔드''를 선택하셨네요. 컴포넌트 설계·상태 관리·최적화 경험을 물어보실 수 있어요.',
   array['컴포넌트 구조를 설계할 때 기준은 무엇인가요?','렌더링 최적화를 어떻게 하나요?','상태 관리는 어떤 방식을 선호하나요?'], 11),
  ('백엔드', '''백엔드''를 선택하셨네요. API 설계, 계층 분리, DB 경험을 물어보실 수 있어요.',
   array['백엔드에서 어떤 작업을 해봤나요?','REST API 설계는 어떤 계층 구조로 하나요?','DB 스키마 설계에서 신경 쓰는 부분은?'], 12),
  ('데브옵스', '''데브옵스''를 선택하셨네요. Git 전략과 Docker 기반 배포 환경 경험을 물어보세요.',
   array['Git 브랜치 전략은 어떻게 세우나요?','Docker로 어떤 환경을 구성해봤나요?','merge conflict는 어떻게 해결하나요?'], 13),
  ('React', '''React''를 선택하셨네요. 실제 프로젝트에서의 React 활용을 물어보실 수 있어요.',
   array['React로 만든 프로젝트를 소개해주세요.','커스텀 훅으로 로직을 분리한 경험이 있나요?','IntersectionObserver 같은 브라우저 API를 React와 어떻게 엮었나요?'], 14),
  ('TypeScript', '''TypeScript''를 선택하셨네요. 타입 설계와 제네릭 활용 경험을 물어보세요.',
   array['TypeScript로 재사용 가능한 컴포넌트를 어떻게 설계하나요?','제네릭을 실제로 활용한 사례가 있나요?'], 15),
  ('JavaScript', '''JavaScript''를 선택하셨네요. 기본기와 실전 활용에 대해 물어보실 수 있어요.',
   array['JavaScript에서 자신 있는 부분은 무엇인가요?','비동기 처리는 어떻게 다루나요?'], 16);
