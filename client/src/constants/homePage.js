import { LogIn, CalendarCheck, Link2, Briefcase, Clock, BarChart2 } from 'lucide-react'
import { Home, Link, Settings } from 'lucide-react'

// Navbar
export const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'Come funziona', href: '#come-funziona' },
  { label: 'Prezzi', href: '#prezzi' },
]

// SocialProofBar
export const categories = [
  { emoji: '✂️', label: 'Parrucchieri' },
  { emoji: '🔧', label: 'Meccanici' },
  { emoji: '💻', label: 'Sviluppatori' },
  { emoji: '🎨', label: 'Designer' },
  { emoji: '📚', label: 'Tutor' },
  { emoji: '🏋️', label: 'Personal Trainer' },
  { emoji: '📸', label: 'Fotografi' },
  { emoji: '🧘', label: 'Coach' },
  { emoji: '✨', label: '+ altri' },
]

// MultiTenantExplainer
export const multiTenantCards = [
  {
    icon: Home,
    title: 'Workspace isolato',
    desc: 'Ogni professionista ha il proprio ambiente dedicato. I tuoi dati, i tuoi clienti, le tue prenotazioni — solo tuoi.',
  },
  {
    icon: Link,
    title: 'Link personale unico',
    desc: 'Ottieni un URL del tipo bookingfreelance.app/tuonome da condividere ovunque.',
  },
  {
    icon: Settings,
    title: 'Configurazione indipendente',
    desc: 'Servizi, orari, disponibilità e report completamente autonomi. Nessuna interferenza con altri utenti.',
  },
]

// Features
export const features = [
  {
    icon: LogIn,
    title: 'Login con Google',
    desc: 'Registrati in un click. Il tuo workspace viene creato automaticamente.',
  },
  {
    icon: CalendarCheck,
    title: 'Sync Google Calendar',
    desc: 'Appuntamenti sincronizzati in tempo reale, solo nel tuo tenant.',
  },
  {
    icon: Link2,
    title: 'Link di prenotazione',
    desc: 'Un URL unico. I clienti vedono solo te, non gli altri utenti.',
  },
  {
    icon: Briefcase,
    title: 'Gestione Servizi',
    desc: 'Aggiungi servizi con durata e prezzo nel tuo spazio personale.',
  },
  {
    icon: Clock,
    title: 'Gestione Disponibilità',
    desc: 'Orari, pause e giorni di chiusura. Ogni tenant indipendente.',
  },
  {
    icon: BarChart2,
    title: 'Reportistica',
    desc: 'Grafici e dati esclusivi del tuo workspace. Decidi con i numeri.',
  },
]

// HowItWorks
export const steps = [
  {
    number: '1',
    title: 'Registrati con Google',
    desc: 'Un click con il tuo account Google e il tuo workspace personale viene creato istantaneamente. Nessun form, nessuna configurazione tecnica.',
  },
  {
    number: '2',
    title: 'Configura il tuo spazio',
    desc: 'Inserisci i tuoi servizi, imposta gli orari e personalizza la pagina di prenotazione nel tuo ambiente isolato.',
  },
  {
    number: '3',
    title: 'Condividi il tuo link',
    desc: 'Invia bookingfreelance.app/tuonome via WhatsApp o email. I clienti prenotano, tu ricevi la notifica su Google Calendar.',
  },
]

// DashboardMockup
export const checkItems = [
  'Workspace personale creato automaticamente al login',
  'Vista calendario con tutti i tuoi appuntamenti',
  'Gestione servizi con prezzi e durate',
  'Disponibilità personalizzabile giorno per giorno',
  'Report e grafici del tuo andamento',
  'Link booking: bookingfreelance.app/tuonome',
]

// Testimonials
export const testimonials = [
  {
    initials: 'MR',
    name: 'Marco R.',
    profession: 'Parrucchiere',
    quote:
      'Ho il mio spazio tutto mio. I clienti prenotano dal mio link e io li trovo direttamente in Google Calendar. Ho azzerato i messaggi su WhatsApp.',
  },
  {
    initials: 'LT',
    name: 'Laura T.',
    profession: 'Personal Trainer',
    quote:
      'In 5 minuti avevo già il workspace attivo e il link da mandare. Zero configurazioni tecniche.',
  },
  {
    initials: 'DM',
    name: 'Davide M.',
    profession: 'Consulente IT',
    quote:
      'Apprezzo molto che ogni professionista abbia il proprio ambiente separato. Professionale e sicuro.',
  },
]

// Pricing
export const freeFeatures = [
  '1 workspace personale',
  '1 servizio',
  'Fino a 20 appuntamenti/mese',
  'Link bookingfreelance.app/tuonome',
  'Sync Google Calendar',
]

export const proFeatures = [
  'Workspace dedicato',
  'Servizi illimitati',
  'Appuntamenti illimitati',
  'Reportistica avanzata',
  'Supporto prioritario',
  'Personalizzazione pagina booking',
]

// Footer
export const productLinks = [
  { label: 'Features', href: '#features' },
  { label: 'Prezzi', href: '#prezzi' },
  { label: 'Dashboard', href: '#dashboard' },
]

export const legalLinks = [
  { label: 'Privacy Policy', href: '#' },
  { label: 'Termini', href: '#' },
  { label: 'GDPR', href: '#' },
]
