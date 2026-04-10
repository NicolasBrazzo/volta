# CLAUDE.md — Booking Freelancer

## Panoramica Progetto

App di prenotazione per freelancer. Stack: **Express + Supabase** (server), **React + Vite + Tailwind CSS v4** (client).

---

## Database (Supabase / PostgreSQL)

### Schema

Il file sorgente della struttura DB e' `server/supabase/migrations/001_initial_schema.sql`.

#### Tabelle

| Tabella | Descrizione | Colonne principali |
|---|---|---|
| `BF_Freelancers` | Profilo del professionista | `id` (UUID PK), `email` (unique), `slug` (unique), `first_name`, `last_name`, `business_name`, `business_type`, `description`, `profile_image`, `google_access_token`, `google_refresh_token`, `calendar_id`, `created_at`, `updated_at` |
| `BF_Services` | Servizi offerti | `id` (UUID PK), `professional_id` (FK -> BF_Freelancers), `name`, `description`, `duration_minutes` (int), `price` (numeric), `color`, `is_active` (bool), `created_at` |
| `BF_Bookings` | Prenotazioni | `id` (UUID PK), `professional_id` (FK), `service_id` (FK -> BF_Services), `client_name`, `client_email`, `client_phone`, `date` (timestamptz), `end_date` (timestamptz), `notes`, `status` ('confirmed'\|'cancelled'\|'completed'), `google_event_id`, `created_at` |
| `BF_Availability` | Disponibilita' settimanale | `id` (UUID PK), `professional_id` (FK), `day_of_week` (0-6, 0=Domenica), `start_time` (es. "09:00"), `end_time` (es. "18:00"), `is_active` (bool). Vincolo UNIQUE su `(professional_id, day_of_week)` |

#### Relazioni (tutte ON DELETE CASCADE)

- `BF_Services.professional_id` -> `BF_Freelancers.id`
- `BF_Bookings.professional_id` -> `BF_Freelancers.id`
- `BF_Bookings.service_id` -> `BF_Services.id`
- `BF_Availability.professional_id` -> `BF_Freelancers.id`

### Modelli (Data Access Layer)

I modelli si trovano in `server/models/` e usano il client Supabase (PostgREST):

| File | Tabella | Funzioni esportate |
|---|---|---|
| `server/models/freelancer.model.js` | BF_Freelancers | `findByEmail`, `findById`, `findBySlug`, `create`, `updateById` |
| `server/models/services.model.js` | BF_Services | `findByProfessionalId`, `findActiveByProfessionalId`, `findById`, `create`, `updateById`, `deleteById` |
| `server/models/bookings.model.js` | BF_Bookings | `findByProfessionalId` (join con servizi), `findById`, `findByDateRange`, `create`, `updateById`, `deleteById` |
| `server/models/availability.model.js` | BF_Availability | `findByProfessionalId`, `findByDay`, `upsert` (onConflict professional_id + day_of_week) |

### Connessione DB

- **File**: `server/config/db_connection.js`
- **Env vars**: `SUPABASE_URL`, `SUPABASE_KEY`

---

## Backend (Express)

### Entry point

`server/server.js` — Avvia Express, registra le rotte, CORS, error handler globale.

### Routes & Controllers

| Rotta base | Controller | Auth |
|---|---|---|
| `/auth` | `server/controllers/auth.controller.js` | Pubblica (login/register) |
| `/api/services` | `server/controllers/services.controller.js` | JWT |
| `/api/availability` | `server/controllers/availability.controller.js` | JWT |
| `/api/bookings` | `server/controllers/bookings.controller.js` | JWT |
| `/api/public` | `server/controllers/public.controller.js` | No auth |

### Middleware & Config

- `server/middleware/auth.js` — JWT authentication middleware
- `server/config/jwt.js` — Configurazione JWT
- `server/config/google.js` — Configurazione OAuth Google
- `server/config/db_connection.js` — Client Supabase

### Servizi & Utility

- `server/services/googleCalendar.js` — Integrazione Google Calendar (da completare, vedi TODO.md sez. 2)
- `server/utils/slots.js` — Calcolo slot disponibili (da implementare, vedi TODO.md sez. 1)

---

## Frontend (React + Vite)

### Regola DRY: Componente Loader

Esiste gia' un componente `Loader` riutilizzabile. **NON creare nuovi spinner o loading indicator**. Usare sempre:

```jsx
import { Loader } from '@/components/Loader';

// Default (medium, centrato)
<Loader />

// Full screen overlay
<Loader fullScreen />

// Piccolo (per bottoni)
<Loader size="small" />

// Con testo
<Loader text="Caricamento..." />

// Custom color
<Loader color="#06B6D4" />
```

**Props disponibili:**
- `size`: `'small'` | `'medium'` (default) | `'large'`
- `color`: stringa CSS colore (default `'#3b82f6'`)
- `text`: testo opzionale sotto lo spinner
- `fullScreen`: `true` per overlay a tutto schermo (z-50)

**File**: `client/src/components/Loader.jsx`

### Design & Branding

Tutta la documentazione grafica e' in `client/src/docs/DESIGN.md`. Consultare SEMPRE quel file prima di creare o modificare componenti UI.

#### Riferimenti rapidi

- **Colori CSS variables**: definiti in `client/src/index.css` (sezione `:root` e `.dark`)
- **Palette primaria**: Navy Blue `#2563EB` (primary-600), hover `#1D4ED8`
- **Palette accento**: Cyan `#06B6D4`
- **Neutri**: Slate Gray (da `#F8FAFC` a `#0F172A`)
- **Font**: Inter Variable (`@fontsource-variable/inter`), pesi 400-800
- **Framework CSS**: Tailwind CSS v4 con plugin Vite (`@tailwindcss/vite`)
- **Componenti UI base**: `client/src/components/ui/` (shadcn/radix-nova: Button, Card, Badge, Input, Textarea, Label, Select, Avatar, Sheet)
- **Utility classi**: `cn()` da `client/src/utils/cnFunc.js` (clsx + tailwind-merge)
- **Icone**: Lucide React (`lucide-react`)
- **Animazioni**: Framer Motion (`framer-motion`)
- **Varianti componenti**: CVA (`class-variance-authority`)
- **Tema chiaro/scuro**: `client/src/context/ThemeContext.jsx` + `client/src/hooks/useTheme.js`
- **Logo**: `client/src/assets/logoBlack.png` (chiaro) e `client/src/assets/logoWhite.png` (scuro)

### Struttura Pagine

| Pagina | File | Descrizione |
|---|---|---|
| Home (landing) | `client/src/pages/HomePage.jsx` | Landing page pubblica |
| Login | `client/src/pages/Login.jsx` | Autenticazione Google OAuth |
| Dashboard | `client/src/pages/Dashboard.jsx` | Pannello principale freelancer |
| Servizi | `client/src/pages/Services.jsx` | CRUD servizi offerti |
| Disponibilita' | `client/src/pages/Availability.jsx` | Gestione orari settimanali |
| Prenotazioni | `client/src/pages/Bookings.jsx` | Lista prenotazioni |
| Dettaglio Prenotazione | `client/src/pages/BookingDetails.jsx` | Dettaglio singola prenotazione |
| Prenotazione Pubblica | `client/src/pages/BookingPublic.jsx` | Form pubblico di prenotazione (da completare) |
| Impostazioni | `client/src/pages/Settings.jsx` | Profilo + codice condivisibile |
| Setup Profilo | `client/src/pages/CreateFreelanceProfile.jsx` | Onboarding nuovo freelancer |

### Servizi API (client)

| File | Scopo |
|---|---|
| `client/src/services/freelanceSerivce.js` | API freelancer (profilo, codice) |
| `client/src/services/servicesService.js` | CRUD servizi |
| `client/src/services/availabilityService.js` | Disponibilita' settimanale |
| `client/src/services/bookingsService.js` | Prenotazioni |
| `client/src/services/publicService.js` | Endpoint pubblici (prenotazione) |

### Contesti & Hooks

- `client/src/context/AuthContext.jsx` — Stato autenticazione utente
- `client/src/context/ThemeContext.jsx` — Tema chiaro/scuro
- `client/src/hooks/useTheme.js` — Hook per toggle tema

### Layout

- `client/src/layouts/AppLayout.jsx` — Layout con sidebar per pagine autenticate
- `client/src/components/Side.jsx` — Sidebar di navigazione
- `client/src/components/Modal.jsx` — Componente modale riutilizzabile

### Costanti

- `client/src/constants/availability.js` — Struttura default disponibilita' (giorni della settimana)
- `client/src/constants/businessTypes.js` — Tipologie di business per selezione profilo

---

## Convenzioni

- Lingua codice: inglese per nomi variabili/funzioni, italiano per testi UI e commenti
- Import alias: `@/` punta a `client/src/`
- Stile CSS: utility-first Tailwind, mai CSS inline
- Stato server: React Query per fetch/cache, `useState` solo per stato locale UI
- Validazione form: lato client per UX, **lato server obbligatoria** per sicurezza (vedi TODO.md sez. 4)
