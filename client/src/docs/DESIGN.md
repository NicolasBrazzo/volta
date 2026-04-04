# DESIGN.md — Booking Freelance Landing Page

Documentazione grafica completa del sito. Serve come riferimento per chiunque lavori su layout, stile, colori e componenti visivi.

---

## 1. Sistema di Colori

### Palette Primaria — Navy Blue
Il colore primario è un blu navy professionale. Usato per CTA, link attivi, sidebar, badge e sfondi scuri.

| Token             | Hex       | Uso principale                              |
|-------------------|-----------|---------------------------------------------|
| `primary-50`      | `#EFF6FF` | Sfondi chiari, icon background              |
| `primary-100`     | `#DBEAFE` | Hover su elementi chiari, badge             |
| `primary-400`     | `#60A5FA` | Testi secondari su sfondo scuro             |
| `primary-600`     | `#2563EB` | **CTA principale**, bottoni, link attivi    |
| `primary-700`     | `#1D4ED8` | Hover state sui bottoni primari             |
| `primary-800`     | `#1E3A5F` | Superfici scure (sidebar mockup)            |
| `primary-900`     | `#0A1628` | Sfondo sezione FinalCTA, base scura         |

### Palette Accento — Cyan
Il cyan è usato per elementi Google Calendar, checkmark, bordi sinistri delle card appuntamento e dettagli decorativi.

| Token            | Hex       | Uso principale                                    |
|------------------|-----------|---------------------------------------------------|
| `accent`         | `#06B6D4` | Icone sezioni, CheckCircle, bordi appuntamenti    |
| `accent-light`   | `#CFFAFE` | Sfondo sezione MultiTenantExplainer (`#F0FDFE`)   |
| `accent-dark`    | `#164E63` | Testi su sfondo accent chiaro                     |

### Palette Neutri — Slate Gray
Usata per tutto il testo, sfondi alternati e bordi.

| Token          | Hex       | Uso principale                              |
|----------------|-----------|---------------------------------------------|
| `neutral-50`   | `#F8FAFC` | Sfondo sezioni alternate (SocialProofBar)   |
| `neutral-100`  | `#F1F5F9` | Bordi, sfondo top bar browser mockup        |
| `neutral-400`  | `#94A3B8` | Testi placeholder, label secondari          |
| `neutral-600`  | `#475569` | Corpo testo, descrizioni                    |
| `neutral-800`  | `#1E293B` | Testo headings secondari                    |
| `neutral-900`  | `#0F172A` | Sfondo Footer                               |

### CSS Variables (`:root` in `index.css`)
```css
--color-primary:        #2563EB;
--color-primary-hover:  #1D4ED8;
--color-accent:         #06B6D4;
--color-accent-light:   #CFFAFE;
--color-surface-dark:   #1E3A5F;
--color-base-dark:      #0A1628;
```

---

## 2. Tipografia

### Font
**Inter** — caricato da Google Fonts con i pesi `400`, `500`, `600`, `700`, `800`.

```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" />
```

Definita come font-family di default nel `tailwind.config.ts`:
```ts
fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'] }
```

### Scala Tipografica

| Elemento              | Classi Tailwind                                  | Dimensione |
|-----------------------|--------------------------------------------------|------------|
| H1 (Hero headline)    | `text-4xl sm:text-5xl font-bold tracking-tight`  | 36–48px    |
| H2 (section title)    | `text-3xl font-bold`                             | 30px       |
| H2 grande (FinalCTA)  | `text-4xl font-bold`                             | 36px       |
| Sottotitolo hero      | `text-xl text-neutral-600`                       | 20px       |
| Sottotitolo sezione   | `text-base text-neutral-600`                     | 16px       |
| Corpo card/lista      | `text-sm text-neutral-600`                       | 14px       |
| Label / Badge         | `text-xs font-semibold`                          | 12px       |

---

## 3. Spaziatura e Layout

### Container
Tutte le sezioni usano lo stesso container centrato:
```html
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
```
Larghezza massima: `1280px`. Padding laterale: `16px` mobile → `32px` tablet → `32px` desktop.

### Padding verticale delle sezioni
- Sezioni principali: `py-24` (96px sopra e sotto)
- SocialProofBar: `py-6` (compatta, separatore visivo)
- Hero: `py-20 lg:py-28`

### Sfondo alternato delle sezioni (zebra layout)
Le sezioni alternano sfondo per creare separazione visiva senza bordi:

| Sezione               | Sfondo                           |
|-----------------------|----------------------------------|
| Hero                  | `bg-white`                       |
| SocialProofBar        | `bg-neutral-50`                  |
| MultiTenantExplainer  | `#F0FDFE` (cyan chiarissimo)     |
| Features              | `bg-white`                       |
| HowItWorks            | `bg-neutral-50`                  |
| DashboardPreview      | `bg-white`                       |
| Testimonials          | `bg-neutral-50`                  |
| Pricing               | `bg-white`                       |
| FinalCTA              | `bg-primary-900` (scuro)         |
| Footer                | `bg-neutral-900`                 |

---

## 4. Componenti UI

### Button
Quattro varianti definite con `class-variance-authority`:

| Variante   | Sfondo        | Testo   | Hover             | Uso                          |
|------------|---------------|---------|-------------------|------------------------------|
| `default`  | `primary-600` | white   | `primary-700`     | CTA principali               |
| `outline`  | transparent   | `primary-600` | `primary-50` | CTA secondari, "Accedi"      |
| `ghost`    | transparent   | `neutral-600` | `neutral-100` | Link di navigazione          |
| `accent`   | `accent`      | white   | `accent/90`       | FinalCTA, accento cyan       |

Tre size: `sm` (h-8), `default` (h-10), `lg` (h-12).  
Border radius: `rounded-lg` (8px).

### Card
Contenitore standard con:
```
rounded-xl border border-neutral-200 bg-white shadow-sm
```
Hover effect sulle feature cards: `hover:shadow-md transition-shadow`.  
Le card Pricing Pro hanno: `border-2 border-primary-600`.

### Avatar
Cerchio `w-10 h-10 rounded-full` con fallback iniziali:
```
bg-primary-100 text-primary-700 text-sm font-semibold
```

### Sheet (Mobile Drawer)
Pannello laterale destro che scorre su mobile (`side="right"`).  
Overlay semitrasparente `bg-black/50`.  
Contenuto: links di navigazione stacked verticalmente con `border-b border-neutral-100`.

---

## 5. Sezioni — Dettaglio Visivo

### Navbar
```
sticky top-0 z-50
backdrop-blur-md bg-white/80 border-b border-neutral-100
height: h-16
```
- **Sinistra**: logo (`CalendarDays` icon cyan + testo bold)
- **Centro** (solo desktop): 3 link di navigazione, `text-sm font-medium text-neutral-600`
- **Destra**: ghost button "Accedi" + filled button "Inizia gratis"
- **Mobile**: solo i 2 bottoni CTA + hamburger che apre lo Sheet

---

### Hero
Layout a **2 colonne** su desktop (`grid-cols-1 lg:grid-cols-2`), stacked su mobile.

**Colonna sinistra:**
- Badge pill cyan in cima (antenna pulsante animata)
- `h1` con parola chiave in `text-primary-600`
- Paragrafo descrittivo max-width `max-w-lg`
- 2 bottoni (primary + outline), layout `flex-col sm:flex-row`
- 3 trust badge con `CheckCircle` in cyan, testo `text-neutral-500`

**Colonna destra — Browser Mockup:**
```
rounded-xl border border-neutral-200 shadow-xl overflow-hidden
```
Struttura interna:
1. **Top bar**: `bg-neutral-100 h-8` con 3 cerchi colorati (rosso/giallo/verde) + barra URL fake
2. **Sidebar**: `w-36 bg-primary-900` con voci di menu, voce attiva `bg-primary-700`
3. **Area principale**: `bg-primary-50` con griglia calendario (7 col × 5 righe), celle highlight in `bg-primary-600`, card appuntamenti con `border-l-4` in `accent`

---

### SocialProofBar
Striscia compatta orizzontale.  
Testo centrato sopra, poi scroll orizzontale di pill:
```
rounded-full bg-white border border-neutral-200 px-4 py-2 text-sm
```
Scrollbar nascosta (`scrollbar-hide`), centrati su desktop con `justify-center`.

---

### MultiTenantExplainer
Sfondo `#F0FDFE` (cyan quasi bianco). 3 card affiancate su desktop.

Ogni card:
- Icon container: `w-12 h-12 rounded-xl bg-accent/10` con icona in `text-accent`
- Titolo `text-lg font-semibold`
- Descrizione `text-sm text-neutral-600`
- Hover: `hover:shadow-md transition-shadow`

---

### Features
6 card in griglia responsive (`1 → 2 → 3 colonne`).

Ogni card:
- Icon container: `rounded-lg bg-primary-50 p-2 w-10 h-10`, icona `text-primary-600`
- Titolo `font-semibold text-neutral-900`
- Descrizione `text-sm text-neutral-600`

---

### HowItWorks
**Desktop**: stepper orizzontale con connettori.
- Badge numero: `w-10 h-10 rounded-full bg-primary-600 text-white font-bold`
- Connettore: `h-px w-12 bg-primary-200` posizionato a `mt-5`
- Testo centrato sotto ogni step

**Mobile**: stepper verticale con linea `w-px bg-primary-200` che scende tra i passi.

---

### DashboardPreview
Layout a **2 colonne** inverso (testo a sinistra, mockup a destra).

**Colonna sinistra:**
- Badge pill cyan
- Titolo H2 + sottotitolo
- Lista checklist: `CheckCircle` in `text-accent` + testo `text-neutral-700`

**Colonna destra — Analytics Mockup:**
- Stessa struttura del browser mockup Hero
- Sidebar con voce "Reportistica" attiva
- 3 stat card `bg-primary-50` con valore in `text-primary-700 font-bold`
- Grafico a barre fake: div `flex items-end gap-1 h-16`, barre alternate cyan/light-blue

---

### Testimonials
3 card affiancate su desktop.

Ogni card:
- 5 stelle gialle `text-yellow-400`
- Testo citazione `italic text-neutral-700`
- Divider `border-t border-neutral-100`
- Avatar con iniziali `bg-primary-100 text-primary-700` + nome + professione

---

### Pricing
2 card centrate (`max-w-4xl mx-auto`).

**Card Free (Starter):**
- Badge `bg-neutral-100 text-neutral-600`
- Prezzo `text-4xl font-bold` + `/mese text-neutral-500`
- Check icons in `text-accent`
- Bottone `variant="outline"`

**Card Pro:**
- `border-2 border-primary-600` — bordo più spesso e colorato
- Badge "Più popolare" assoluto centrato in cima: `bg-primary-600 text-white rounded-full`
- Badge "Pro" `bg-primary-50 text-primary-700`
- Check icons in `text-primary-600`
- Bottone `variant="default"`

---

### FinalCTA
Sfondo `bg-primary-900`. Due blob decorativi (`blur-3xl`) posizionati angoli opposti:
- In alto a sinistra: `bg-primary-800 opacity-40`
- In basso a destra: `bg-accent/20 opacity-40`

Contenuto centrato:
- Icona `CalendarDays` in contenitore `bg-primary-800 rounded-2xl`
- Titolo `text-4xl font-bold text-white`
- Sottotitolo `text-xl text-primary-200`
- Bottone `variant="accent"` con ombra `shadow-accent/30`
- Riga legale sotto: `text-primary-400 text-sm`

---

### Footer
Layout `grid-cols-1 md:grid-cols-4`:
- Colonna 1 (2/4): logo + tagline `text-neutral-500`
- Colonna 2–4: liste link (`text-sm hover:text-white transition-colors`)

Bottom bar:
- `border-t border-neutral-800 mt-12 pt-6`
- Testo copyright a sinistra, 3 icone social (GitHub, LinkedIn, Twitter) a destra
- Icone: `w-4 h-4 hover:text-white`

---

## 6. Animazioni (Framer Motion)

### Variante base — `fadeInUp`
Applicata a ogni sezione e ai singoli elementi interni:
```ts
const fadeInUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
}
```

### Stagger — `stagger`
Applicata ai container per animare i figli in sequenza:
```ts
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
}
```

### Utilizzo standard su ogni sezione
```tsx
<motion.div
  variants={fadeInUp}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
>
```
`viewport={{ once: true }}` — l'animazione parte una sola volta quando l'elemento entra nel viewport.

### Animazioni speciali
- **Hero colonna destra**: slide da destra `{ x: 32 → 0, opacity: 0 → 1 }` con `delay: 0.2s`
- **Hero colonna sinistra**: stagger dei figli `staggerChildren: 0.1`
- **DashboardPreview mockup**: slide da destra identico all'Hero
- **Badge pill Hero**: cerchio cyan pulsante con `animate-pulse` di Tailwind

---

## 7. Responsive Breakpoints

Tailwind CSS usa Mobile-First. I breakpoint usati:

| Breakpoint | Larghezza | Comportamento principale                         |
|------------|-----------|--------------------------------------------------|
| (default)  | 0px+      | Single column, stacked layout                    |
| `sm`       | 640px+    | Bottoni Hero affiancati, footer bottom row flex  |
| `md`       | 768px+    | Grid 2–3 col per card (Features, Pricing, ecc.)  |
| `lg`       | 1024px+   | Layout 2 colonne Hero e DashboardPreview         |

### Comportamenti chiave per mobile
- Navbar: link nascosti, visibili solo 2 CTA + hamburger
- Hero: testo sopra, mockup sotto (stacked)
- HowItWorks: stepper verticale invece che orizzontale
- SocialProofBar: scroll orizzontale con `overflow-x-auto`
- Footer: 1 colonna, poi 4 colonne su `md`

---

## 8. Icone

Libreria: **Lucide React** (`lucide-react`).

| Icona          | Usata in                                  |
|----------------|-------------------------------------------|
| `CalendarDays` | Navbar logo, FinalCTA                     |
| `Check`        | Trust badge Hero, Pricing feature list    |
| `CheckCircle`  | DashboardPreview checklist                |
| `Home`         | MultiTenantExplainer card 1               |
| `Link`         | MultiTenantExplainer card 2               |
| `Settings`     | MultiTenantExplainer card 3               |
| `LogIn`        | Features card 1                           |
| `CalendarCheck`| Features card 2                           |
| `Link2`        | Features card 3                           |
| `Briefcase`    | Features card 4                           |
| `Clock`        | Features card 5                           |
| `BarChart2`    | Features card 6                           |
| `Menu`         | Navbar hamburger mobile                   |
| `X`            | Sheet close button                        |
| `Github`       | Footer social                             |
| `Linkedin`     | Footer social                             |
| `Twitter`      | Footer social                             |

---

## 9. Browser Mockup (pattern riutilizzabile)

Il mockup è costruito interamente con `div` + Tailwind (nessuna immagine esterna).  
Usato in **Hero** (calendario) e **DashboardPreview** (analytics).

Struttura:
```
┌─────────────────────────────────────────────┐
│ ●  ●  ●   [bookingfreelance.app/...]        │  ← top bar neutral-100
├──────────┬──────────────────────────────────┤
│ sidebar  │  contenuto principale            │
│ primary- │  (calendario / stats + grafici)  │
│ 900      │                                  │
└──────────┴──────────────────────────────────┘
```

- Outer: `rounded-xl border border-neutral-200 shadow-xl overflow-hidden`
- Top bar: `h-8 bg-neutral-100` con 3 dot `w-3 h-3 rounded-full` rosso/giallo/verde
- Sidebar: `w-36 bg-primary-900`, voce attiva `bg-primary-700 rounded-r-lg`
- Contenuto calendario: griglia 7 col con `bg-primary-50`, celle highlight `bg-primary-600`
- Card appuntamenti: `border-l-4` con `borderLeftColor: '#06B6D4'` (accent inline style)

---

## 10. Convenzioni di Codice

- `cn()` da `lib/utils.ts` per classi condizionali (wrappa `clsx` + `tailwind-merge`)
- Nessuna altezza fissa (`h-*`) sui container principali — il contenuto definisce l'altezza
- Tutti i colori personalizzati via token Tailwind (`text-primary-600`, non `text-[#2563EB]`)
- Eccezione: `borderLeftColor` inline style sulle card appuntamento (Tailwind non supporta `border-l-color` arbitrario affidabilmente)
- Smooth scroll globale: `html { scroll-behavior: smooth }` in `index.css`
- Tutti i `section` hanno `id` per il routing anchor della Navbar
