export const NAV_LINKS = [
  { label: 'Come funziona', href: '#h2-how' },
  { label: 'Funzionalità', href: '#h2-features' },
  { label: 'Testimonianze', href: '#h2-proof' },
  { label: 'Prezzi', href: '#h2-pricing' },
]

export const HERO_AVATARS = [
  { bg: 'linear-gradient(135deg,#6366F1,#4F46E5)', letter: 'M' },
  { bg: 'linear-gradient(135deg,#22D3EE,#0891B2)', letter: 'S' },
  { bg: 'linear-gradient(135deg,#10B981,#047857)', letter: 'L' },
  { bg: 'linear-gradient(135deg,#F59E0B,#D97706)', letter: 'A' },
]

export const HERO_PREVIEW_NAV_ITEMS = [
  { n: 'Dashboard', active: true },
  { n: 'Prenotazioni', active: false },
  { n: 'Servizi', active: false },
  { n: 'Clienti', active: false },
  { n: 'Follow-up AI', active: false },
  { n: 'Analytics', active: false },
  { n: 'Impostazioni', active: false },
]

export const HERO_PREVIEW_STATS = [
  { label: 'Prenotazioni', val: '48', delta: '↗ +12% vs scorsa' },
  { label: 'Revenue', val: '€4.2k', delta: '↗ +23%' },
  { label: 'Occupazione', val: '87%', delta: '↗ +5%' },
]

export const HERO_PREVIEW_CHART_DATA = [
  { d: 'Lun', h: 40, a: 20 },
  { d: 'Mar', h: 60, a: 30 },
  { d: 'Mer', h: 80, a: 45 },
  { d: 'Gio', h: 55, a: 25 },
  { d: 'Ven', h: 95, a: 60 },
  { d: 'Sab', h: 100, a: 70 },
  { d: 'Dom', h: 35, a: 15 },
]

export const HERO_PREVIEW_BOOKINGS = [
  { h: '09', m: 'AM', name: 'Giulia Martinelli', srv: 'UI/UX Review · 45min', tag: 'Confermato', c: '#6366F1' },
  { h: '11', m: 'AM', name: 'Marco Conti', srv: 'Consulenza · 60min', tag: 'Confermato', c: '#22D3EE', isNew: true },
  { h: '02', m: 'PM', name: 'Sofia Bianchi', srv: 'Sprint planning · 90min', tag: 'AI follow-up', c: '#10B981' },
  { h: '04', m: 'PM', name: 'Andrea Russo', srv: 'Review · 30min', tag: 'In attesa', c: '#F59E0B' },
]

export const STATS = [
  { target: 2400, suffix: '+', label: 'Professionisti attivi' },
  { target: 180000, suffix: '+', label: 'Prenotazioni gestite', fmt: (v) => Math.round(v / 1000) + 'k' },
  { target: 4.9, suffix: '/5', label: 'Rating medio', decimals: 1 },
  { target: 30, suffix: 's', label: 'Tempo per prenotare' },
]

export const HOW_STEPS = [
  {
    n: 'STEP 01',
    title: 'Crea il tuo profilo',
    desc: 'In 5 minuti hai la tua pagina di prenotazione personalizzata. Foto, servizi, prezzi — tutto al posto giusto.',
  },
  {
    n: 'STEP 02',
    title: 'I clienti prenotano',
    desc: "Il tuo link funziona 24/7. Il cliente sceglie il servizio, l'orario libero, paga se vuoi — tutto da solo.",
  },
  {
    n: 'STEP 03',
    title: 'Volta gestisce tutto',
    desc: 'Google Calendar si sincronizza. Il promemoria parte in automatico. Il follow-up AI chiude il cerchio.',
  },
]

export const TESTIMONIALS = [
  { text: "Prima usavo Calendly ma sembrava un tool americano generico. Con Volta ho una pagina che sembra fatta da un designer. I clienti mi fanno i complimenti.", name: "Luca Ferri", role: "Designer freelance · Roma", bg: "linear-gradient(135deg,#6366F1,#4F46E5)", letter: "L" },
  { text: "I follow-up automatici mi hanno fatto recuperare 3 clienti al mese. Ora li vedo tornare senza fare niente.", name: "Sara Vitale", role: "Personal trainer · Milano", bg: "linear-gradient(135deg,#22D3EE,#0891B2)", letter: "S" },
  { text: "Finalmente ho smesso di rispondere a WhatsApp alle 23 per confermare appuntamenti. Volta gestisce tutto.", name: "Andrea Conti", role: "Fisioterapista · Torino", bg: "linear-gradient(135deg,#10B981,#047857)", letter: "A" },
  { text: "Ho mandato il link ai miei clienti e in una settimana avevo 12 prenotazioni nuove. Zero sforzo.", name: "Martina Greco", role: "Nutrizionista · Napoli", bg: "linear-gradient(135deg,#F59E0B,#D97706)", letter: "M" },
  { text: "Usavo fogli Excel e SMS manuali. Ora ho tutto su Google Calendar in automatico. Rivoluzionario.", name: "Paolo Russo", role: "Coach aziendale · Bologna", bg: "linear-gradient(135deg,#EC4899,#DB2777)", letter: "P" },
  { text: "Il piano free è già potentissimo. Sono passato al Pro dopo 2 mesi e non tornerei indietro.", name: "Chiara Mancini", role: "Consulente HR · Firenze", bg: "linear-gradient(135deg,#8B5CF6,#7C3AED)", letter: "C" },
]

export const PRICING_FREE_FEATURES = [
  'Pagina di prenotazione personalizzata',
  'Fino a 3 servizi',
  'Sincronizzazione Google Calendar',
  'Notifiche email automatiche',
  '20 prenotazioni/mese',
]

export const PRICING_PRO_FEATURES = [
  'Tutto del piano Free',
  'Servizi illimitati',
  'Follow-up AI personalizzati',
  'Analytics e report',
  'Branding personalizzato',
  'Prenotazioni illimitate',
  'Supporto prioritario',
]
