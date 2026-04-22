# Volta

Piattaforma di booking per freelancer. Ogni professionista genera un link personale che i clienti usano per vedere disponibilità e prenotare appuntamenti, con sincronizzazione automatica su Google Calendar.

---

## Requisiti

- **Node.js** >= 20
- Account **Supabase** (database + auth)
- **Google Cloud Project** con OAuth 2.0 e Calendar API abilitata

---

## Setup locale

### 1. Clona il repository

```bash
git clone <repo-url>
cd volta
```

### 2. Configura le variabili d'ambiente

Crea il file `server/.env` (vedi [Variabili d'ambiente](#variabili-dambiente)):

```bash
cp server/.env.example server/.env
```

Crea il file `client/.env`:

```bash
echo "VITE_API_URL=http://localhost:3000" > client/.env
```

### 3. Installa le dipendenze

```bash
cd server && npm install
cd ../client && npm install
```

### 4. Avvia il progetto

Apri due terminali separati:

```bash
# Terminale 1 — server (porta 3000)
cd server && npm run dev

# Terminale 2 — client (porta 5173)
cd client && npm run dev
```

L'app sarà disponibile su `http://localhost:5173`.

---

## Variabili d'ambiente

### `server/.env`

| Variabile | Descrizione |
|-----------|-------------|
| `SUPABASE_URL` | URL del progetto Supabase (es. `https://xxx.supabase.co`) |
| `SUPABASE_KEY` | Service role key di Supabase (da Project Settings → API) |
| `JWT_SECRET` | Stringa segreta per firmare i JWT (min. 32 caratteri casuali) |
| `FRONTEND_URL` | URL del client in sviluppo (`http://localhost:5173`) |
| `PORT` | Porta del server Express (default: `3000`) |
| `GOOGLE_CLIENT_ID` | Client ID dell'app Google Cloud (OAuth 2.0) |
| `GOOGLE_CLIENT_SECRET` | Client Secret dell'app Google Cloud |
| `GOOGLE_REDIRECT_URI` | URI di callback OAuth (`http://localhost:3000/auth/google/callback`) |

### `client/.env`

| Variabile | Descrizione |
|-----------|-------------|
| `VITE_API_URL` | URL base del server Express (`http://localhost:3000`) |

---

## Google Cloud — configurazione OAuth

1. Vai su [console.cloud.google.com](https://console.cloud.google.com)
2. Crea un nuovo progetto (o seleziona uno esistente)
3. Abilita le API: **Google Calendar API** e **Google People API**
4. Vai su **Credenziali → Crea credenziali → ID client OAuth 2.0**
5. Tipo applicazione: **Applicazione web**
6. Aggiungi URI di reindirizzamento autorizzato: `http://localhost:3000/auth/google/callback`
7. Copia **Client ID** e **Client Secret** nel file `server/.env`

---

## Stack

| Layer | Tecnologia |
|-------|------------|
| Frontend | React 18, Vite, React Router v7, TanStack Query |
| UI | shadcn/ui, Tailwind CSS |
| Backend | Node.js, Express |
| Database | Supabase (PostgreSQL) |
| Auth | Google OAuth 2.0, JWT |
| Calendar | Google Calendar API |
| Validazione | Zod |
