-- ============================================
-- Booking_Freelance MVP — Schema iniziale
-- Eseguire nell'SQL Editor della dashboard Supabase
-- ============================================

-- Abilita UUID generation
create extension if not exists "uuid-ossp";

-- ============================================
-- TABELLE
-- ============================================

-- 1. Freelancers (professionisti)
create table BF_Freelancers (
  id                   uuid primary key default uuid_generate_v4(),
  email                text unique not null,
  slug                 text unique not null,
  first_name           text not null,
  last_name            text not null,
  business_name        text,
  description          text,
  profile_image        text,
  google_access_token  text,
  google_refresh_token text,
  calendar_id          text default 'primary',
  created_at           timestamptz default now(),
  updated_at           timestamptz default now()
);

-- 2. Servizi offerti dai freelancer
create table BF_Services (
  id                uuid primary key default uuid_generate_v4(),
  professional_id   uuid not null references BF_Freelancers(id) on delete cascade,
  name              text not null,
  description       text,
  duration_minutes  int not null,
  price             numeric(10,2) not null,
  color             text,
  is_active         boolean default true,
  created_at        timestamptz default now()
);

-- 3. Prenotazioni
create table BF_Bookings (
  id                uuid primary key default uuid_generate_v4(),
  professional_id   uuid not null references BF_Freelancers(id) on delete cascade,
  service_id        uuid not null references BF_Services(id) on delete cascade,
  client_name       text not null,
  client_email      text not null,
  client_phone      text,
  date              timestamptz not null,
  end_date          timestamptz not null,
  notes             text,
  status            text default 'confirmed' check (status in ('confirmed', 'cancelled', 'completed')),
  google_event_id   text,
  created_at        timestamptz default now()
);

-- 4. Disponibilità settimanale
create table BF_Availability (
  id                uuid primary key default uuid_generate_v4(),
  professional_id   uuid not null references BF_Freelancers(id) on delete cascade,
  day_of_week       int not null check (day_of_week between 0 and 6),
  start_time        text not null,    -- es. "09:00"
  end_time          text not null,    -- es. "18:00"
  is_active         boolean default true,
  unique(professional_id, day_of_week)
);

-- ============================================
-- INDICI per performance
-- ============================================

create index idx_services_professional on BF_Services(professional_id);
create index idx_bookings_professional on BF_Bookings(professional_id);
create index idx_bookings_date on BF_Bookings(date);
create index idx_bookings_status on BF_Bookings(status);
create index idx_availability_professional on BF_Availability(professional_id);
create index idx_freelancers_slug on BF_Freelancers(slug);

-- ============================================
-- FUNZIONE updated_at automatico
-- ============================================

create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_updated_at
  before update on BF_Freelancers
  for each row
  execute function update_updated_at_column();

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================
-- Per l'MVP usiamo il service_role key lato server (bypassa RLS).
-- Le tabelle hanno RLS disabilitato — tutto il controllo accessi
-- avviene nel middleware Express JWT.
-- In futuro si può abilitare RLS per accesso diretto dal frontend.

-- ============================================
-- NOTA: i google_access_token e google_refresh_token sono
-- dati sensibili. In produzione, cripta questi campi o
-- usa un vault separato (es. Supabase Vault).
-- ============================================
