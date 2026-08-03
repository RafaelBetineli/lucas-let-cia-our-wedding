create table public.rsvp_responses (
  id uuid primary key default gen_random_uuid(),
  full_name text not null
    check (char_length(btrim(full_name)) between 2 and 120),
  phone text not null
    check (char_length(btrim(phone)) between 8 and 30),
  email text
    check (email is null or char_length(email) <= 254),
  guest_count smallint not null
    check (guest_count between 1 and 5),
  dietary_restrictions text
    check (dietary_restrictions is null or char_length(dietary_restrictions) <= 500),
  message text
    check (message is null or char_length(message) <= 2000),
  created_at timestamptz not null default now()
);

alter table public.rsvp_responses enable row level security;

revoke all on table public.rsvp_responses from anon, authenticated;
grant insert on table public.rsvp_responses to anon;

create policy "Public visitors can submit RSVP responses"
  on public.rsvp_responses
  for insert
  to anon
  with check (true);

create index rsvp_responses_created_at_idx
  on public.rsvp_responses (created_at desc);

comment on table public.rsvp_responses is
  'Wedding attendance confirmations submitted through the public RSVP form.';
