-- Create contact messages table
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz not null default now()
);

alter table public.contact_messages enable row level security;

-- Allow anyone (anon or authenticated) to insert contact messages
create policy if not exists "Public can insert contact messages"
on public.contact_messages
for insert
to public
with check (true);

-- Create newsletter subscribers table
create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz not null default now()
);

alter table public.newsletter_subscribers enable row level security;

-- Allow anyone (anon or authenticated) to insert newsletter subscribers
create policy if not exists "Public can insert newsletter subscribers"
on public.newsletter_subscribers
for insert
to public
with check (true);