# TODO — Booking Freelancer MVP


## 🚀 PRE-LANCIO — Checklist Finale

> Tutto quello che manca per passare dalla raccolta email al lancio reale.
> Ordinato per priorità. Completare dall'alto verso il basso.

### Blockers critici (il prodotto non funziona senza questi)

- [ ] **Email notifiche prenotazione** `[BLOCKER]` — Nessun servizio email è implementato. Aggiungere `resend` + email di conferma al cliente e al freelancer al momento della prenotazione. Vedere sezione 3 per i dettagli.
- [ ] **`TOKEN_ENCRYPTION_KEY` nel `.env.example`** `[BLOCKER]` — La variabile è necessaria per cifrare i token Google OAuth ma manca dal file `.env.example`. Il server crasha all'avvio senza di essa. Aggiungere con istruzioni su come generarla (`node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`).
- [ ] **Smoke test del flusso completo** `[BLOCKER]` — Testare manualmente l'intero percorso in staging/produzione: registrazione freelancer → configurazione disponibilità → generazione codice → apertura link pubblico → prenotazione cliente → comparsa evento su Google Calendar → email ricevuta. Non lanciare senza averlo fatto almeno una volta end-to-end.

### Qualità e stabilità

- [ ] **Rimuovere `console.log/error`** nel server — Ancora presenti in tutti i controller. Sostituire con logger silenzioso o `pino`. Impedisce di capire cosa succede in produzione.
- [ ] **Test integrazione flusso prenotazione** — Almeno un test `POST /api/public/:code/book` con dati validi e uno con dati invalidi. Vedere sezione 9.
- [ ] **`CreateFreelanceProfile` blocca le altre rotte** — Un freelancer appena registrato può navigare il dashboard senza aver completato il profilo. Bloccare tutte le rotte `/dashboard`, `/services`, `/availability` finché `first_access` è false.

### Branding minimo per il lancio

- [ ] **Logo e favicon** — Almeno un wordmark "volta" + favicon SVG. Senza logo il prodotto non sembra serio.
- [ ] **Applicare brand Volta alla pagina pubblica** (`/book/:code`) — Il cliente la vede per primo: deve riflettere il brand, non un template generico.
- [ ] **Template email con brand** — Le email di conferma devono avere logo, colori e tono di voce Volta, non essere testo plain.
- [ ] **OG image e meta tag social** — Quando qualcuno condivide volta.app su WhatsApp/social, deve apparire un'anteprima con brand, titolo e descrizione.

### Legale (obbligatorio per il mercato italiano)

- [ ] **Pagina Privacy Policy** — Obbligatoria per legge (GDPR). Descrivere quali dati si raccolgono (email cliente, nome, telefono), come vengono trattati, chi è il titolare del trattamento. Usare un generatore se necessario.
- [ ] **Pagina Termini di Servizio** — Condizioni d'uso per i freelancer che si registrano sulla piattaforma.
- [ ] **Cookie banner** — Se usi analytics o qualsiasi cookie non tecnico, serve il consenso esplicito prima che siano attivati.

### Deploy e configurazione

- [ ] **Setup ambiente di produzione** — Scegliere hosting (Render/Railway per il server, Vercel per il client), configurare tutte le variabili d'ambiente reali, verificare che `FRONTEND_URL` e `GOOGLE_REDIRECT_URI` puntino ai domini definitivi.
- [ ] **Dominio definitivo** — Acquistare e configurare il dominio (volta.app, getvolta.app o volta.it). Aggiornare `GOOGLE_REDIRECT_URI` su Google Cloud Console con il dominio di produzione.

---

## 3. Notifiche Email `[BLOCKER]`

Il cliente e il freelancer devono sapere che una prenotazione è stata creata/modificata.

- [ ] **Integrare un servizio email** — Aggiungere `resend` (consigliato per semplicità) come dipendenza; creare `server/services/email.js`; configurare `RESEND_API_KEY` nelle variabili d'ambiente
- [ ] **Email di conferma al cliente** — Inviata subito dopo `POST /api/public/:code/book`; contenuto: nome freelancer, nome servizio, data e ora appuntamento, contatti del freelancer
- [ ] **Email di notifica al freelancer** — Inviata in parallelo all'email cliente; contenuto: nome e contatti del cliente, servizio prenotato, data e ora
- [ ] **Email di cancellazione** — Inviata a entrambi (cliente e freelancer) quando viene chiamato `DELETE /api/bookings/:id`

---

## 8. Pulizia Codice per Produzione

- [ ] **Rimuovere/sostituire i `console.log/error`** nel server con un logger strutturato (`pino`) — ancora presenti in tutti i controller
- [x] **Cifrare `google_access_token` e `google_refresh_token`** — Implementato con AES-256-GCM in `server/utils/tokenEncryption.js`; `encrypt`/`decrypt` già usati in `googleCalendar.js`
- [x] **Gestione errori nel middleware globale** — Implementato in `server/server.js` (righe 50-53) con risposta uniforme `{ ok: false, error }`

---

## 9. Testing Minimo

Non serve coverage al 100%, ma i flussi critici devono essere testati.

- [ ] **Setup test runner** (`vitest` per client, `jest` o `vitest` per server)
- [ ] **Test unitari `calculateAvailableSlots()`** — Casi: giorno lavorativo, giorno non lavorativo, slot occupati, slot nel passato
- [ ] **Test integrazione flusso prenotazione** — `POST /api/public/:code/book` con dati validi e invalidi
- [ ] **Test validazione input** — Verificare che dati malformati vengano rifiutati


## Pagine da sistemare / miglirare 
- [ ] Availaility.jsx
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
