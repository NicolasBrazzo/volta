-- ============================================
-- Migration: Crea tabella bf_waitlist
-- Per raccogliere email durante la beta
-- ============================================

create table bf_waitlist (
  id         uuid primary key default uuid_generate_v4(),
  email      text unique not null,
  created_at timestamptz default now()
);
