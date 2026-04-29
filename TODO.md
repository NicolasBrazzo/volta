# TODO — Volta MVP

> Ordinato per priorità. Completare dall'alto verso il basso.

---

## Blockers critici


- [x] **`TOKEN_ENCRYPTION_KEY` nel `.env.example`** — Variabile necessaria per cifrare i token Google OAuth. Il server crasha senza di essa. Aggiungere con istruzioni: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`.
- [ ] **Smoke test flusso completo** — Testare manualmente: registrazione freelancer → disponibilità → codice → link pubblico → prenotazione cliente → evento Google Calendar → email ricevuta. Non lanciare senza averlo fatto end-to-end almeno una volta.

---

## Qualità e stabilità

- [x] **Bloccare rotte finché `first_access` è false** — Un freelancer appena registrato può navigare senza aver completato il profilo. Bloccare `/dashboard`, `/services`, `/availability`, `/bookings`, `/settings` finché il profilo non è completato in `CreateFreelanceProfile`.
- [ ] **Sistemare `Availability.jsx`** — Revisione e fix della pagina disponibilità.

---

## Testing

- [ ] **Setup test runner** — `vitest` per client, `jest` o `vitest` per server.
- [ ] **Test unitari `calculateAvailableSlots()`** — Casi: giorno lavorativo, non lavorativo, slot occupati, slot nel passato.
- [ ] **Test integrazione flusso prenotazione** — `POST /api/public/:code/book` con dati validi e invalidi.
- [ ] **Test validazione input** — Verificare che dati malformati vengano rifiutati.

---

## Branding

- [ ] **Design logo definitivo** — Wordmark "volta" + simbolo "V"; varianti dark, light, monochrome, favicon.
- [ ] **Applicare brand alla pagina pubblica** (`/book/:code`) — Il cliente la vede per primo: deve riflettere il brand, non un template generico.
- [ ] **Template email con brand** — Logo, colori e tono di voce Volta su tutte le email (conferma, cancellazione, follow-up).
- [ ] **OG image e meta tag social** — Anteprima con brand, titolo e descrizione quando condiviso su WhatsApp/social.
- [ ] **Validare disponibilità dominio** — `volta.app`, `getvolta.app`, `volta.it`.
- [ ] **Validare disponibilità handle social** — `@volta` su Instagram, X, LinkedIn.
- [ ] **Brand Guidelines v1** — Documento PDF/Notion con regole d'uso di logo, colori, font e tono di voce.
- [ ] **Social media kit** — Template post, stories, cover.

---

## Legale

- [ ] **Pagina Privacy Policy** — Obbligatoria (GDPR): dati raccolti (email, nome, telefono cliente), trattamento, titolare.
- [ ] **Pagina Termini di Servizio** — Condizioni d'uso per i freelancer.
- [ ] **Cookie banner** — Consenso esplicito per cookie non tecnici prima dell'attivazione.

---

## Deploy

- [ ] **Setup ambiente di produzione** — Hosting (Render/Railway per server, Vercel per client); configurare tutte le variabili d'ambiente reali; verificare `FRONTEND_URL` e `GOOGLE_REDIRECT_URI`.
- [ ] **Dominio definitivo** — Acquistare e configurare il dominio. Aggiornare `GOOGLE_REDIRECT_URI` su Google Cloud Console.

---

## POST-MVP (dopo il lancio)

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
- [ ] Pagina di prenotazione brandizzabile per ogni professionista (mini landing page)
- [ ] Follow-up automatici intelligenti con AI (post-appuntamento)
- [ ] Integrazione WhatsApp per notifiche e follow-up
- [ ] **Email notifiche prenotazione** — Integrare `resend`; creare `server/services/email.js`; configurare `RESEND_API_KEY`. Inviare al cliente (nome freelancer, servizio, data/ora, contatti) e al freelancer (nome/contatti cliente, servizio, data/ora) dopo `POST /api/public/:code/book`. Inviare email di cancellazione a entrambi su `DELETE /api/bookings/:id`.

---

## Completato

- [x] Cifrare `google_access_token` e `google_refresh_token` — AES-256-GCM in `server/utils/tokenEncryption.js`
- [x] Gestione errori middleware globale — `server/server.js` con risposta uniforme `{ ok: false, error }`
- [x] Definire strategia di brand (posizionamento, archetipo, target)
- [x] Scegliere il nome: **Volta**
- [x] Definire palette colori e direzione visiva
- [x] Creare visualizzazione palette (`brand/volta-palette.html`)
- [x] Aggiornare design tokens CSS con la nuova palette Volta
- [x] Aggiornare componenti Shadcn (bottoni, card, badge) con nuovi colori
- [x] Redesign sidebar e layout con la nuova identità
- [x] Creare dark mode come esperienza primaria
- [x] Definire tagline definitiva
- [x] Riscrivere copy landing page (Hero, Features, HowItWorks, Pricing)
- [x] Riscrivere microcopy dell'app (labels, tooltip, stati vuoti, errori)
- [x] Riscrivere copy onboarding (CreateFreelanceProfile)
- [x] Rinominare il progetto: titoli, meta tag, manifest, package.json
