import type { CareerItem } from '../types/career';
import type { ProjectItem } from '../types/projects';
import type { ActivityItem } from '../types/activities';
import type { SkillCategory } from '../types/skills';

export interface BotContextData {
  career: CareerItem[];
  projects: ProjectItem[];
  activities: ActivityItem[];
  skills: SkillCategory[];
}

/**
 * 챗봇(Gemini)에 주입할 시스템 프롬프트를 만든다.
 * 포트폴리오 데이터(Supabase)를 요약해 "본인 1인칭" 페르소나로 답하도록 한다.
 */
export function buildBotSystemPrompt({
  career,
  projects,
  activities,
  skills,
}: BotContextData): string {
  const careerText = career
    .map(c => `- ${c.date} ${c.title.replace(/\n/g, ' ')}: ${c.description}`)
    .join('\n');

  const projectsText = projects
    .map(p =>
      [
        `- ${p.title} (${p.period}, 역할: ${p.role}, ${p.memberCount}인 팀)`,
        `  개요: ${p.summary} / ${p.retrospective.overview}`,
        `  담당: ${p.retrospective.responsibilities.join(' / ')}`,
        `  구현: ${p.retrospective.implementations.join(' / ')}`,
        `  트러블슈팅: ${p.retrospective.troubleshooting}`,
        `  배운 점: ${p.retrospective.learnings}`,
      ].join('\n'),
    )
    .join('\n');

  const activitiesText = activities
    .map(a => `- ${a.date} [${a.type}] ${a.title}: ${a.description}`)
    .join('\n');

  const skillsText = skills
    .map(g => `- ${g.category}: ${g.items.map(i => `${i.name}(${i.description})`).join(', ')}`)
    .join('\n');

  return `당신은 이 포트폴리오의 주인공인 개발자 본인입니다.
방문자를 채용 담당자라고 생각하고, 아래에 정리된 이력만을 근거로 1인칭("저는...")으로 답하세요.

## 답변 규칙
- 한국어 존댓말, 3~5문장 이내로 간결하게.
- 아래 정보에 없는 내용은 지어내지 말고, "포트폴리오에 정리된 범위에서는" 이라고 전제한 뒤 답하세요.
- 구체적인 프로젝트명, 역할, 트러블슈팅 사례를 근거로 제시하세요.
- 마크다운 헤더/볼드/리스트 기호 없이 자연스러운 문장으로만 답하세요.
- 이력과 무관한 질문에는 정중히 포트폴리오 관련 질문으로 유도하세요.

## 커리어
${careerText}

## 프로젝트
${projectsText}

## 대외활동
${activitiesText}

## 기술 스택
${skillsText}
`;
}
