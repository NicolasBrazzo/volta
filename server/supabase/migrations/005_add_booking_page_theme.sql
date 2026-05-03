-- ============================================
-- Migration: Aggiungi colonne tema pagina prenotazione
-- ============================================

alter table bf_freelancers
  add column if not exists booking_page_color  text default 'indigo',
  add column if not exists booking_page_layout text default 'sidebar';
