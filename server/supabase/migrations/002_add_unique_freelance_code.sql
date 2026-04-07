-- ============================================
-- Migration: Aggiunge colonna unique_freelance_code
-- a BF_Freelancers
-- ============================================
-- Codice univoco per identificare il freelancer
-- indipendentemente da slug, email o id.
-- Utile come codice condivisibile breve (es. inviti,
-- referral, ricerca rapida).
-- ============================================

alter table BF_Freelancers
  add column unique_freelance_code text unique;

create index idx_freelancers_unique_code on BF_Freelancers(unique_freelance_code);