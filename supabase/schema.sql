-- Guestbook: ตารางเดียวสำหรับคำอวยพร
create table public.wishes (
  id uuid not null default gen_random_uuid() primary key,
  name text not null check (char_length(trim(name)) between 1 and 60),
  message text not null check (char_length(trim(message)) between 1 and 500),
  created_at timestamptz not null default now()
);

grant select, insert on public.wishes to anon;
grant select, insert, delete on public.wishes to authenticated;
grant all on public.wishes to service_role;

alter table public.wishes enable row level security;

-- แขก (anon): อ่านได้ + เขียนได้ / แก้ไข-ลบ ไม่ได้
create policy "Anyone can read wishes" on public.wishes for select to anon, authenticated using (true);
create policy "Anyone can post a wish" on public.wishes for insert to anon, authenticated with check (true);
-- แอดมิน (ผู้ที่ login แล้วเท่านั้น): ลบได้
create policy "Admin can delete wishes" on public.wishes for delete to authenticated using (true);

create index wishes_created_at_idx on public.wishes (created_at desc);
