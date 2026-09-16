-- Zenith Hackers Intelligence — shared public blog schema
-- Run this entire script once in Supabase SQL Editor.
-- It creates public posts/comments with RLS and basic moderation support.

create extension if not exists pgcrypto;

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(title) between 3 and 180),
  slug text not null unique,
  excerpt text not null default '' check (char_length(excerpt) <= 500),
  content text not null check (char_length(content) >= 20),
  author_name text not null default 'Zenith Community' check (char_length(author_name) between 2 and 80),
  category text not null default 'Cybersecurity',
  cover_image text,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.posts(id) on delete cascade,
  author_name text not null check (char_length(author_name) between 2 and 80),
  content text not null check (char_length(content) between 2 and 2000),
  approved boolean not null default true,
  created_at timestamptz not null default now()
);

create index if not exists posts_created_at_idx on public.posts(created_at desc);
create index if not exists posts_category_idx on public.posts(category);
create index if not exists comments_post_id_idx on public.comments(post_id);
create index if not exists comments_created_at_idx on public.comments(created_at);

alter table public.posts enable row level security;
alter table public.comments enable row level security;

drop policy if exists "Public can read published posts" on public.posts;
create policy "Public can read published posts"
on public.posts for select
to anon, authenticated
using (published = true);

drop policy if exists "Public can create posts" on public.posts;
create policy "Public can create posts"
on public.posts for insert
to anon, authenticated
with check (
  published = true
  and char_length(title) between 3 and 180
  and char_length(author_name) between 2 and 80
  and char_length(content) >= 20
);

drop policy if exists "Public can read approved comments" on public.comments;
create policy "Public can read approved comments"
on public.comments for select
to anon, authenticated
using (approved = true);

drop policy if exists "Public can create comments" on public.comments;
create policy "Public can create comments"
on public.comments for insert
to anon, authenticated
with check (
  approved = true
  and char_length(author_name) between 2 and 80
  and char_length(content) between 2 and 2000
);

-- Keep a simple updated_at trigger available for future edits.
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists posts_set_updated_at on public.posts;
create trigger posts_set_updated_at
before update on public.posts
for each row execute function public.set_updated_at();

-- Seed one official Zenith article.
insert into public.posts (title, slug, excerpt, content, author_name, category, published)
select
  'Ethical Hacking: What an Authorized Security Assessment Really Does',
  'ethical-hacking-authorized-security-assessment',
  'A practical introduction to authorized security testing, evidence, reporting, remediation and retesting.',
  $$An authorized security assessment is a structured process for identifying weaknesses before they become incidents.

A professional engagement begins with written authorization and a clearly defined scope. The tester documents what systems may be assessed, when testing may occur, which techniques are permitted, and how sensitive evidence must be handled.

During testing, the goal is not simply to find a vulnerability. The goal is to establish useful evidence, understand potential impact, reduce unnecessary risk, and provide practical remediation guidance.

After findings are reported, remediation can be verified through retesting. This closes the loop between discovery and improvement.

For asset tracing and investigations, results can vary substantially depending on the available evidence, identifiers, access to records, jurisdiction, and time elapsed. Tracking information should therefore never be presented as a guarantee of recovery.$$,
  'Zenith Hackers Intelligence',
  'Ethical Hacking',
  true
where not exists (
  select 1 from public.posts where slug = 'ethical-hacking-authorized-security-assessment'
);
