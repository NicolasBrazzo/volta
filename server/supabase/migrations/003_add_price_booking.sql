-- ============================================
-- Aggiunge il campo price_booking alla tabella BF_Bookings
-- Permette di memorizzare il prezzo del servizio al momento
-- della prenotazione, in modo che variazioni future del prezzo
-- del servizio non influenzino prenotazioni già effettuate.
-- ============================================

alter table BF_Bookings
  add column if not exists price_booking numeric(10,2);
