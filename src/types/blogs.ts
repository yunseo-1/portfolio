export interface BlogItem {
  id: string;
  title: string;
  description: string;
  platform: '벨로그' | '노션';
  date: string;
  url: string;
  excerpt: string;
  content: string;
}
