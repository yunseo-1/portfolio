create table if not exists public.projects (
  id               uuid primary key default gen_random_uuid(),
  slug             text unique not null,
  title            text not null,
  thumbnail_url    text,
  role             text not null,
  member_count     int  not null default 1,
  period           text not null,
  stack            text[] not null default '{}',
  summary          text not null,
  demo_url         text,
  github_url       text,
  -- 회고(retrospective)
  overview         text,
  responsibilities text[] not null default '{}',
  implementations  text[] not null default '{}',
  troubleshooting  text,
  learnings        text,
  sort_order       int not null default 0,
  created_at       timestamptz not null default now()
);

create table if not exists public.activities (
  id          uuid primary key default gen_random_uuid(),
  type        text not null check (type in ('해커톤','공모전','대외활동','스터디','밋업','대회')),
  date        text not null,
  title       text not null,
  description text not null,
  sort_order  int not null default 0,
  created_at  timestamptz not null default now()
);

create table if not exists public.career (
  id          uuid primary key default gen_random_uuid(),
  date        text not null,
  title       text not null,         
  description text not null,
  sort_order  int not null default 0,
  created_at  timestamptz not null default now()
);

create table if not exists public.posts (
  id           uuid primary key default gen_random_uuid(),
  title        text not null,
  description  text not null,          -- 목록에 보이는 한 줄 요약
  platform     text not null check (platform in ('벨로그','노션')),
  published_on text not null,          -- '2025.08'
  url          text not null,
  excerpt      text,                   -- 모달에서 "상세보기" 전에 노출되는 윗내용 일부
  content      text,                   -- "상세보기" 시 조회되는 전체 본문 (문단은 빈 줄로 구분)
  sort_order   int not null default 0,
  created_at   timestamptz not null default now()
);

create table if not exists public.skills (
  id             text primary key,     -- 'react', 'springboot' ... (아이콘 파일명과 매칭)
  category       text not null,        -- 'Frontend' | 'Backend' | 'Data & DevOps'
  category_order int  not null default 0,
  name           text not null,
  description    text not null,
  abilities      text[] not null default '{}',
  libraries      text[] not null default '{}',
  sort_order     int not null default 0,
  created_at     timestamptz not null default now()
);

create table if not exists public.keyword_questions (
  id         uuid primary key default gen_random_uuid(),
  keyword    text unique not null,   -- WordCloud 단어와 정확히 일치
  intro      text not null,          -- 키워드 클릭 시 챗봇 초기 메시지
  questions  text[] not null default '{}',
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

alter table public.projects           enable row level security;
alter table public.activities         enable row level security;
alter table public.career             enable row level security;
alter table public.posts              enable row level security;
alter table public.skills             enable row level security;
alter table public.keyword_questions  enable row level security;

create policy "public read" on public.projects          for select using (true);
create policy "public read" on public.activities        for select using (true);
create policy "public read" on public.career            for select using (true);
create policy "public read" on public.posts             for select using (true);
create policy "public read" on public.skills            for select using (true);
create policy "public read" on public.keyword_questions for select using (true);
