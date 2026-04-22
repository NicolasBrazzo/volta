# TODO — Booking Freelancer MVP

> Checklist per arrivare al primo MVP lanciabile.
> Ogni sezione è ordinata per priorità. Le task marcate con `[BLOCKER]` impediscono il lancio.

---

## 1. Flusso di Prenotazione Pubblica `[BLOCKER]`

Questo è il cuore del prodotto: un cliente riceve dal freelancer un link con codice univoco, vede la disponibilità e prenota.

**Contesto**: ogni freelancer genera il proprio codice condivisibile dalla pagina **Settings** (`CodeCreator`). Il codice ha formato `slug-random` (es. `mario-rossi-a3f8k2`) ed è salvato nel campo `unique_freelance_code` della tabella `bf_freelancers`. Il codice è già parzialmente implementato nel branch `dev` (`POST /api/freelancers/code`).

- [x] **Completare generazione codice** — Il flusso `Settings.jsx → CodeCreator → POST /api/freelancers/code` esiste nel branch `dev`; verificare che gestisca correttamente la rigenerazione e la collision di codici duplicati
- [x] **Implementare `GET /api/public/:code`** — Cercare il freelancer in `bf_freelancers` tramite `unique_freelance_code`; restituire `business_name`, `description`, `slug` e lista dei servizi attivi (`bf_services` dove `is_active = true`); rispondere 404 se il codice non esiste
- [x] **Implementare `GET /api/public/:code/slots`** — Ricevere query params `date` (YYYY-MM-DD) e `serviceId` (UUID); validare entrambi; chiamare `calculateAvailableSlots()`; restituire array di slot liberi in formato `"HH:MM"`; rispondere 400 se i parametri sono mancanti o invalidi
- [x] **Implementare `POST /api/public/:code/book`** — Ricevere body con `service_id`, `date`, `time`, `client_name`, `client_email`, `client_phone` (opzionale), `notes` (opzionale); validare tutti i campi obbligatori; creare il record in `bf_bookings`; chiamare `createCalendarEvent()` e salvare il `google_event_id`; rispondere 201 con i dettagli della prenotazione creata
- [x] **Implementare `calculateAvailableSlots(professional, date, service)`** in `server/utils/slots.js`
  - [x] Recuperare la disponibilita settimanale del freelancer per il `day_of_week` corrispondente alla data richiesta (0=Dom, 1=Lun, …); se non configurata, restituire array vuoto
  - [x] Generare tutti gli slot possibili nell'orario di disponibilita, suddivisi in blocchi di `service.duration_minutes` minuti
  - [x] Caricare le prenotazioni esistenti del freelancer per quella data da `bf_bookings` e rimuovere i slot che si sovrappongono
  - [x] Chiamare `getCalendarEvents()` per la stessa data e rimuovere i slot che si sovrappongono con eventi Google Calendar esistenti (utile per blocchi fuori-app: riunioni, impegni personali)
  - [x] Se la data e oggi, rimuovere tutti gli slot con orario gia passato
  - [x] Restituire array di stringhe in formato `"HH:MM"` degli slot ancora liberi
- [x] **Completare la pagina `BookingPublic.jsx`** — Attualmente e uno stub che mostra solo il titolo; va implementata come form multi-step:
  1. Mostrare profilo freelancer e lista servizi attivi (fetch da `GET /api/public/:code`)
  2. Selezione servizio → selezione data (date picker, no giorni nel passato)
  3. Fetch slot disponibili da `GET /api/public/:code/slots?date=YYYY-MM-DD&serviceId=xxx`
  4. Selezione slot orario tra quelli disponibili
  5. Form dati cliente: nome, email, telefono (opzionale), note (opzionale)
  6. Submit verso `POST /api/public/:code/book`
- [x] **Pagina di conferma post-prenotazione** — Riepilogo con dettagli: nome freelancer, servizio prenotato, data/ora, dati cliente inseriti; mostrata dopo il submit riuscito

---

## 2. Google Calendar Integration `[BLOCKER]`

Senza calendario sincronizzato, il freelancer gestisce tutto a mano e rischia doppie prenotazioni.

L'autenticazione OAuth 2.0 e lo storage dei token (`google_access_token`, `google_refresh_token`) sono **gia implementati** in `server/controllers/auth.controller.js` e `server/config/google.js`. Il refresh automatico dei token e **gia gestito** in `getAuthenticatedClient()` tramite l'evento `'tokens'` dell'OAuth2 client. Mancano solo le operazioni CRUD sul calendario.

- [x] **Implementare `createCalendarEvent(professional, booking, service)`** in `server/services/googleCalendar.js`
  - Ottenere client OAuth autenticato tramite `getAuthenticatedClient(professional)`
  - Creare evento con `calendar.events.insert()` sul `professional.calendar_id` (default: `"primary"`)
  - Impostare `summary` = nome del servizio, `description` con nome e contatti del cliente, `start`/`end` in base a data e durata servizio
  - Aggiungere il cliente come attendee (`attendees: [{ email: booking.client_email }]`)
  - Configurare un reminder via email a 60 minuti dall'appuntamento (`reminders.overrides`)
  - Salvare il `google_event_id` restituito dall'API nel campo `google_event_id` della tabella `bf_bookings`

- [x] **Implementare `deleteCalendarEvent(professional, google_event_id)`** in `server/services/googleCalendar.js`
  - Ottenere client OAuth autenticato tramite `getAuthenticatedClient(professional)`
  - Chiamare `calendar.events.delete()` con il `google_event_id` salvato nella prenotazione
  - Gestire il caso in cui l'evento non esista piu sul calendario (errore 404 da ignorare silenziosamente)
  - Chiamare questa funzione dal controller `DELETE /api/bookings/:id` prima di eliminare il record dal DB

- [x] **Implementare `getCalendarEvents(professional, timeMin, timeMax)`** in `server/services/googleCalendar.js`
  - Chiamare `calendar.events.list()` con `timeMin` e `timeMax` in formato ISO 8601
  - Filtrare eventi con `singleEvents: true` e `orderBy: 'startTime'`
  - Restituire array di oggetti `{ start, end }` per il confronto con gli slot disponibili
  - Usare questa funzione dentro `calculateAvailableSlots()` per escludere slot occupati da eventi Google Calendar non generati dall'app

- [x] **Collegare `createCalendarEvent()` al controller prenotazioni** — In `POST /api/public/:code/book`, dopo aver creato il record in `bf_bookings`, chiamare `createCalendarEvent()` e aggiornare il record con il `google_event_id` ottenuto

- [x] **Collegare `deleteCalendarEvent()` al controller prenotazioni** — In `DELETE /api/bookings/:id`, leggere prima il `google_event_id` dalla prenotazione, chiamare `deleteCalendarEvent()`, poi eliminare il record dal DB

---

## 3. Notifiche Email `[BLOCKER]`

Il cliente e il freelancer devono sapere che una prenotazione è stata creata/modificata.

- [x] **Integrare un servizio email** — Aggiungere `resend` (consigliato per semplicita) o `nodemailer` con SMTP; configurare le credenziali nelle variabili d'ambiente (`RESEND_API_KEY` o `SMTP_HOST`, `SMTP_USER`, `SMTP_PASS`)
- [x] **Email di conferma al cliente** — Inviata subito dopo `POST /api/public/:code/book`; contenuto: nome freelancer, nome servizio, data e ora appuntamento, indirizzo/link (se configurato), contatti del freelancer
- [x] **Email di notifica al freelancer** — Inviata in parallelo all'email cliente; contenuto: nome e contatti del cliente, servizio prenotato, data e ora
- [x] **Email di cancellazione** — Inviata a entrambi (cliente e freelancer) quando viene chiamato `DELETE /api/bookings/:id`; includere breve motivazione se disponibile

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

La funzione `seedDefaults()` e **gia chiamata** in `server/controllers/auth.controller.js` al termine del callback OAuth, ma **non e mai stata definita**, causando un errore runtime al primo accesso di ogni nuovo freelancer.

- [x] **Definire e implementare `seedDefaults(freelancerId)`** — La funzione deve creare la disponibilita settimanale di default per il freelancer appena registrato
  - Inserire record in `bf_availability` per i giorni Lunedi-Venerdi (day_of_week: 1-5) con orario `09:00 - 18:00`
  - Usare `upsert` (non `insert`) per evitare errori se la funzione viene chiamata piu volte per lo stesso utente
  - Importare la funzione nel file `auth.controller.js` e assicurarsi che venga chiamata solo alla **prima registrazione** (non ai login successivi), verificando tramite `GET /auth/firstAccess`

---

## 8. Pulizia Codice per Produzione

- [ ] **Rimuovere/sostituire i 50+ `console.log/error`** nel server con un logger (`pino` o `winston`)
- [ ] **Criptare `google_access_token` e `google_refresh_token`** nel database — Attualmente i token sono salvati in plaintext nella tabella `bf_freelancers`; usare Supabase Vault o cifrare i valori con `crypto` (AES-256) prima di scriverli, con chiave di cifratura in variabile d'ambiente
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
- [ ] Quando atterro sulla pagina /client/src/pages/CreateFreelanceProfile.jsx tutte le rotte devono essere chiuse finché non inserisce i dati descritti 

---

## BRANDING — Rebrand "Volta"

> Roadmap per trasformare "Booking Freelance" in **Volta** — un brand con identità vera.
> Palette, tono di voce e direzione visiva sono definiti in `brand/volta-palette.html`.

### Fase 1 — Fondamenta Brand
- [x] Definire strategia di brand (posizionamento, archetipo, target)
- [x] Scegliere il nome: **Volta**
- [x] Definire palette colori e direzione visiva
- [x] Creare visualizzazione palette (`brand/volta-palette.html`)
- [ ] Validare disponibilità dominio (volta.app, getvolta.app, volta.it)
- [ ] Validare disponibilità handle social (@volta su IG, X, LinkedIn)
- [ ] Creare Brand Guidelines v1 (documento PDF/Notion con regole d'uso)

### Fase 2 — Visual Identity
- [ ] Design logo definitivo (wordmark "volta" + simbolo "V")
- [ ] Creare varianti logo (dark, light, monochrome, favicon)
- [x] Aggiornare design tokens CSS nell'app con la nuova palette Volta
- [x] Aggiornare componenti Shadcn (bottoni, card, badge) con nuovi colori
- [x] Redesign sidebar e layout con la nuova identità
- [x] Creare dark mode come esperienza primaria

### Fase 3 — Verbal Identity & Copy
- [x] Definire tagline definitiva
- [x] Riscrivere copy della landing page (Hero, Features, HowItWorks, Pricing)
- [x] Riscrivere microcopy dell'app (labels, tooltip, stati vuoti, errori)
- [x] Riscrivere copy onboarding (CreateFreelanceProfile)
- [x] Rinominare il progetto: titoli, meta tag, manifest, package.json

### Fase 4 — Presenza Digitale
- [ ] Creare social media kit (template post, stories, cover)
- [ ] Applicare brand alla pagina di prenotazione pubblica (`/book/:slug`)
- [ ] Creare template email coerenti con il brand (conferma, cancellazione, follow-up)
- [ ] Creare OG image e meta tag social per la landing page

### Fase 5 — Differenziazione (post-MVP)
- [ ] Pagina di prenotazione "brandizzabile" per ogni professionista (mini landing page)
- [ ] Follow-up automatici intelligenti con AI (messaggi personalizzati post-appuntamento)
- [ ] Integrazione WhatsApp per notifiche e follow-up
