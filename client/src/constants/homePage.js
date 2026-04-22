import { LogIn, CalendarCheck, Link2, Briefcase, Clock, Sparkles } from 'lucide-react'
import { Home, Link, Settings } from 'lucide-react'

// Navbar
export const navLinks = [
  { label: 'Funzionalità', href: '#features' },
  { label: 'Come funziona', href: '#come-funziona' },
  { label: 'Prezzi', href: '#prezzi' },
]

// SocialProofBar
export const categories = [
  { emoji: '✂️', label: 'Parrucchieri' },
  { emoji: '💅', label: 'Estetiste' },
  { emoji: '💻', label: 'Consulenti' },
  { emoji: '🎨', label: 'Designer' },
  { emoji: '📚', label: 'Tutor' },
  { emoji: '🏋️', label: 'Personal Trainer' },
  { emoji: '📸', label: 'Fotografi' },
  { emoji: '🧘', label: 'Coach' },
  { emoji: '✨', label: 'e molti altri' },
]

// MultiTenantExplainer
export const multiTenantCards = [
  {
    icon: Home,
    title: 'Il tuo spazio',
    desc: 'Un workspace pensato solo per te. I tuoi clienti, i tuoi appuntamenti, le tue regole.',
  },
  {
    icon: Link,
    title: 'Un link, ovunque',
    desc: 'Un URL personale da mettere in bio, nelle email, su WhatsApp. I clienti prenotano in un tap.',
  },
  {
    icon: Settings,
    title: 'Configurazione in libertà',
    desc: 'Servizi, orari, pause, disponibilità. Cambi quando vuoi, senza chiedere permesso a nessuno.',
  },
]

// Features
export const features = [
  {
    icon: LogIn,
    title: 'Accesso con Google',
    desc: 'Un click e sei dentro. Nessuna password da ricordare, nessun form infinito.',
  },
  {
    icon: CalendarCheck,
    title: 'Google Calendar, sincronizzato',
    desc: 'Ogni prenotazione finisce dritta nel tuo calendario. Niente doppie prenotazioni, mai più.',
  },
  {
    icon: Link2,
    title: 'Il tuo link personale',
    desc: 'Un URL solo tuo da condividere con chi vuoi. Lo aprono, scelgono, prenotano.',
  },
  {
    icon: Briefcase,
    title: 'Servizi su misura',
    desc: 'Aggiungi, modifica, metti in pausa. Durata e prezzo li decidi tu, in qualsiasi momento.',
  },
  {
    icon: Clock,
    title: 'Disponibilità intelligente',
    desc: 'Dici quando lavori, noi facciamo il resto. Slot calcolati in automatico, niente sovrapposizioni.',
  },
  {
    icon: Sparkles,
    title: 'Zero pensieri',
    desc: 'Promemoria, conferme, follow-up. Tu fai il tuo lavoro, a tutto il resto pensa Volta.',
  },
]

// HowItWorks
export const steps = [
  {
    number: '1',
    title: 'Accedi con Google',
    desc: 'Un tap e il tuo workspace è pronto. Niente setup tecnico, niente carte di credito, niente attese.',
  },
  {
    number: '2',
    title: 'Disegna la tua agenda',
    desc: 'Aggiungi i tuoi servizi, imposta gli orari. Due minuti e sei online, con stile.',
  },
  {
    number: '3',
    title: 'Condividi il link',
    desc: 'Il tuo URL personale va dove vai tu. I clienti prenotano, Volta aggiorna il calendario, tu respiri.',
  },
]

// DashboardMockup
export const checkItems = [
  'Workspace pronto al primo accesso',
  'Calendario con tutti i tuoi appuntamenti',
  'Servizi con prezzi e durate personalizzabili',
  'Disponibilità giorno per giorno',
  'Sincronizzazione Google Calendar',
  'Link personale da condividere ovunque',
]

// Testimonials
export const testimonials = [
  {
    initials: 'MR',
    name: 'Marco R.',
    profession: 'Parrucchiere',
    quote:
      'Prima passavo le serate a rispondere a WhatsApp per fissare appuntamenti. Ora condivido il mio link e me ne dimentico. È un altro lavoro.',
  },
  {
    initials: 'LT',
    name: 'Laura T.',
    profession: 'Personal Trainer',
    quote:
      'In cinque minuti ero online. Il link gira sui miei social, le prenotazioni arrivano da sole. Mi sembra magia.',
  },
  {
    initials: 'DM',
    name: 'Davide M.',
    profession: 'Consulente',
    quote:
      'Finalmente un tool che sembra fatto per me, non per aziende con team di venti persone. Semplice, diretto, bello da usare.',
  },
]

// Pricing
export const freeFeatures = [
  'Il tuo workspace personale',
  '1 servizio attivo',
  'Fino a 20 appuntamenti al mese',
  'Link personale condivisibile',
  'Sincronizzazione Google Calendar',
]

export const proFeatures = [
  'Servizi illimitati',
  'Appuntamenti senza limiti',
  'Promemoria email automatici',
  'Pagina di prenotazione personalizzata',
  'Statistiche e insights',
  'Supporto prioritario',
]

// Footer
export const productLinks = [
  { label: 'Funzionalità', href: '#features' },
  { label: 'Come funziona', href: '#come-funziona' },
  { label: 'Prezzi', href: '#prezzi' },
]

export const legalLinks = [
  { label: 'Privacy', href: '#' },
  { label: 'Termini', href: '#' },
  { label: 'GDPR', href: '#' },
]
