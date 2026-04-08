# TODO — Booking Freelancer MVP

> Checklist per arrivare al primo MVP lanciabile.
> Ogni sezione è ordinata per priorità. Le task marcate con `[BLOCKER]` impediscono il lancio.

---

## 1. Flusso di Prenotazione Pubblica `[BLOCKER]`

Questo è il cuore del prodotto: un cliente riceve dal freelancer un link con codice univoco, vede la disponibilità e prenota.

**Contesto**: ogni freelancer genera il proprio codice condivisibile dalla pagina **Settings** (`CodeCreator`). Il codice ha formato `slug-random` (es. `mario-rossi-a3f8k2`) ed è salvato nel campo `unique_freelance_code` della tabella `bf_freelancers`. Il codice è già parzialmente implementato nel branch `dev` (`POST /api/freelancers/code`).

- [ ] **Completare generazione codice** — Il flusso `Settings.jsx → CodeCreator → POST /api/freelancers/code` esiste nel branch `dev`; verificare che gestisca correttamente la rigenerazione e la collision di codici duplicati
- [ ] **Implementare `GET /api/public/:code`** — Cercare il freelancer tramite `unique_freelance_code`, restituire profilo + servizi attivi
- [ ] **Implementare `GET /api/public/:code/slots`** — Calcolare e restituire slot disponibili per data e servizio
- [ ] **Implementare `POST /api/public/:code/book`** — Creare una prenotazione dal form pubblico
- [ ] **Implementare `calculateAvailableSlots()` in `server/utils/slots.js`**
  - Leggere disponibilità settimanale del professionista per il giorno richiesto
  - Generare tutti gli slot possibili in base alla durata del servizio
  - Rimuovere slot sovrapposti con prenotazioni esistenti (`bf_bookings`)
  - Rimuovere slot sovrapposti con eventi Google Calendar (se collegato)
  - Rimuovere slot nel passato (se il giorno è oggi)
- [ ] **Completare la pagina `BookingPublic.jsx`** — Form con selezione servizio, data, slot orario, dati cliente (nome, email, telefono, note)
- [ ] **Pagina di conferma post-prenotazione** — Riepilogo con dettagli della prenotazione avvenuta

---

## 2. Google Calendar Integration `[BLOCKER]`

Senza calendario sincronizzato, il freelancer gestisce tutto a mano e rischia doppie prenotazioni.

- [ ] **Implementare `createCalendarEvent()`** in `server/services/googleCalendar.js` — Creare evento su Google Calendar quando viene confermata una prenotazione
- [ ] **Implementare `deleteCalendarEvent()`** — Rimuovere evento quando una prenotazione viene cancellata
- [ ] **Implementare `getCalendarEvents()`** — Leggere eventi esistenti per escludere slot occupati dal calcolo disponibilità
- [ ] **Gestire il refresh automatico dei token Google** quando scadono

---

## 3. Notifiche Email `[BLOCKER]`

Il cliente e il freelancer devono sapere che una prenotazione è stata creata/modificata.

- [ ] **Integrare un servizio email** (Resend, SendGrid, o nodemailer con SMTP)
- [ ] **Email di conferma al cliente** — Riepilogo prenotazione con data, ora, servizio, contatti
- [ ] **Email di notifica al freelancer** — Nuova prenotazione ricevuta
- [ ] **Email di cancellazione** — Notifica a entrambi quando una prenotazione viene annullata

---

## 4. Validazione Input & Sicurezza `[BLOCKER]`

Senza validazione, qualsiasi utente può inviare dati arbitrari al database.

- [ ] **Aggiungere `zod` come libreria di validazione**
- [ ] **Validare tutti gli endpoint**:
  - `POST /api/services` — name (string, max 100), duration_minutes (int > 0), price (number >= 0)
  - `PUT /api/services/:id` — stessi vincoli
  - `POST /api/public/:code/book` — client_name, client_email (email valida), date (ISO string), service_id (UUID)
  - `PUT /api/availability` — day_of_week (0-6), start_time/end_time (formato HH:MM), coerenza orari
  - `PUT /api/freelancers/profile` — business_name (max 100), description (max 1000)
- [ ] **Aggiungere `helmet`** per security headers HTTP
- [ ] **Aggiungere `express-rate-limit`** — Limitare richieste per IP (es. 100/min globale, 10/min su `/book`)
- [ ] **Sanitizzare output errori** — Non esporre dettagli interni del database nelle risposte

---

## 5. Stabilità Frontend

- [ ] **Aggiungere un componente `ErrorBoundary`** globale che catturi errori React e mostri un fallback
- [ ] **Rimuovere tutti i `console.log` di debug** (es. `Dashboard.jsx:10` logga l'intero oggetto user)
- [ ] **Sostituire `console.error` con gestione silenziosa o toast** nei service files

---

## 6. Configurazione & Deploy

- [ ] **Creare `.env.example`** nella root con tutte le variabili necessarie (server + client)
- [ ] **Creare `README.md`** nella root del progetto con:
  - Descrizione del progetto
  - Requisiti (Node >= 20, account Supabase, Google Cloud project)
  - Istruzioni setup locale (server + client)
  - Variabili d'ambiente documentate
- [ ] **Aggiungere endpoint `/api/health`** per monitoring base

---

## 7. Funzione `seedDefaults` `[BLOCKER]`

- [ ] **Implementare `seedDefaults()`** chiamata dopo la registrazione — Creare disponibilità di default (Lun-Ven, 09:00-18:00) così il freelancer ha subito un calendario funzionante

---

## 8. Pulizia Codice per Produzione

- [ ] **Rimuovere/sostituire i 50+ `console.log/error`** nel server con un logger (`pino` o `winston`)
- [ ] **Criptare `google_access_token` e `google_refresh_token`** nel database (o usare Supabase Vault)
- [ ] **Aggiungere gestione errori nel middleware globale** di Express con risposte uniformi

---

## 9. Testing Minimo

Non serve coverage al 100%, ma i flussi critici devono essere testati.

- [ ] **Setup test runner** (`vitest` per client, `jest` o `vitest` per server)
- [ ] **Test unitari `calculateAvailableSlots()`** — Casi: giorno lavorativo, giorno non lavorativo, slot occupati, slot nel passato
- [ ] **Test integrazione flusso prenotazione** — `POST /api/public/:code/book` con dati validi e invalidi
- [ ] **Test validazione input** — Verificare che dati malformati vengano rifiutati

---

## POST-MVP (Fase 2 — dopo il lancio)

Queste feature NON servono per il Day 1 ma saranno importanti per crescere.

- [ ] Sistema di recensioni e rating
- [ ] Pagamenti online (Stripe)
- [ ] Admin panel per gestione piattaforma
- [ ] Ricerca e directory pubblica dei freelancer
- [ ] Notifiche real-time (WebSocket)
- [ ] Internazionalizzazione (i18n)
- [ ] Upload immagine profilo personalizzata
- [ ] Email di promemoria pre-appuntamento
- [ ] Dashboard analytics per il freelancer
- [ ] CI/CD pipeline (GitHub Actions)
- [ ] Docker + docker-compose per deploy
