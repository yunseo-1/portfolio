export interface ActivityItem {
  id: string;
  type: '해커톤' | '공모전' | '대외활동' | '스터디' | '밋업' | '대회';
  date: string;
  title: string;
  description: string;
}

export const activitiesData: ActivityItem[] = [
  {
    id: '1',
    type: '해커톤',
    date: '2021.03',
    title: 'HackDay 2023 최우수상',
    description: '글로벌 해커톤 본선 진출',
  },
  {
    id: '2',
    type: '해커톤',
    date: '2024.05',
    title: 'JUNCTION ASIA 2024 해커톤',
    description: 'OCR 기반 데이터 처리 API 구현, 공공데이터 API 연동',
  },
  {
    id: '3',
    type: '스터디',
    date: '2023.02',
    title: '알고리즘 스터디 8기',
    description: '매주 3회 코딩테스트 문제풀이 및 리뷰',
  },
  {
    id: '4',
    type: '공모전',
    date: '2022.11',
    title: '교내 캡스톤 프로젝트 대상',
    description: '자취생 커뮤니티 앱 기획 및 개발',
  },
  {
    id: '5',
    type: '밋업',
    date: '2024.08',
    title: 'DevCamp 네트워킹 밋업',
    description: '동료 개발자들과 프로젝트 회고 공유',
  },
];