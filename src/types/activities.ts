export interface ActivityItem {
  id: string;
  type: '해커톤' | '공모전' | '대외활동' | '스터디' | '밋업' | '대회';
  date: string;
  title: string;
  description: string;
}
