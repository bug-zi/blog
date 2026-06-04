create table if not exists public.site_stats (
  key text primary key,
  total bigint not null default 0,
  updated_at timestamptz not null default now()
);

alter table public.site_stats enable row level security;

drop policy if exists "Public can read site stats" on public.site_stats;
create policy "Public can read site stats"
on public.site_stats
for select
to anon, authenticated
using (true);

insert into public.site_stats (key, total)
values ('home_views', 0)
on conflict (key) do nothing;

create or replace function public.increment_view_count()
returns bigint
language sql
security definer
set search_path = public
as $$
  insert into public.site_stats as stats (key, total, updated_at)
  values ('home_views', 1, now())
  on conflict (key)
  do update set
    total = stats.total + 1,
    updated_at = now()
  returning total;
$$;

grant execute on function public.increment_view_count() to service_role;
