import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

function BrowserMockup() {
  const days = ['Lu', 'Ma', 'Me', 'Gi', 'Ve', 'Sa', 'Do']
  const dates = [
    [null, null, 1, 2, 3, 4, 5],
    [6, 7, 8, 9, 10, 11, 12],
    [13, 14, 15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24, 25, 26],
    [27, 28, 29, 30, null, null, null],
  ]
  const highlighted = [9, 14, 22]

  return (
    <div className="rounded-xl border border-neutral-200 shadow-xl overflow-hidden w-full max-w-lg">
      {/* Browser chrome */}
      <div className="bg-neutral-100 h-8 flex items-center px-3 gap-2">
        <span className="w-3 h-3 rounded-full bg-red-400" />
        <span className="w-3 h-3 rounded-full bg-yellow-400" />
        <span className="w-3 h-3 rounded-full bg-green-400" />
        <div className="ml-2 flex-1 bg-white rounded text-xs text-neutral-400 px-2 py-0.5 max-w-48">
          bookingfreelance.app/mario
        </div>
      </div>

      {/* App content */}
      <div className="flex bg-white" style={{ minHeight: '320px' }}>
        {/* Sidebar */}
        <div className="w-36 bg-primary-900 text-white flex flex-col py-4 gap-1 shrink-0">
          <div className="px-4 py-1.5 text-xs font-semibold text-primary-400 uppercase tracking-wider mb-2">
            Menu
          </div>
          {['Dashboard', 'Servizi', 'Disponibilità', 'Reportistica'].map((item, i) => (
            <div
              key={item}
              className={`px-4 py-2 text-xs cursor-pointer transition-colors ${
                i === 0
                  ? 'bg-primary-700 text-white rounded-r-lg'
                  : 'text-primary-300 hover:text-white'
              }`}
            >
              {item}
            </div>
          ))}
        </div>

        {/* Main area */}
        <div className="flex-1 p-4 overflow-hidden">
          <p className="text-xs font-semibold text-neutral-900 mb-3">Aprile 2025</p>
          {/* Calendar grid */}
          <div className="bg-primary-50 rounded-lg p-3 mb-3">
            <div className="grid grid-cols-7 gap-0.5 mb-1">
              {days.map((d) => (
                <div key={d} className="text-center text-xs text-neutral-400 font-medium py-0.5">
                  {d}
                </div>
              ))}
            </div>
            {dates.map((week, wi) => (
              <div key={wi} className="grid grid-cols-7 gap-0.5">
                {week.map((day, di) => (
                  <div
                    key={di}
                    className={`text-center text-xs py-1 rounded ${
                      day === null
                        ? ''
                        : highlighted.includes(day)
                        ? 'bg-primary-600 text-white font-semibold'
                        : 'text-neutral-700 hover:bg-primary-100'
                    }`}
                  >
                    {day ?? ''}
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Appointment cards */}
          <div className="space-y-2">
            {[
              { time: '10:00', name: 'Giulia R.', service: 'Taglio + Piega' },
              { time: '14:30', name: 'Marco T.', service: 'Consulenza' },
            ].map((appt) => (
              <div
                key={appt.time}
                className="flex items-center gap-2 bg-white border border-neutral-200 rounded-lg px-3 py-2 border-l-4"
                style={{ borderLeftColor: '#06B6D4' }}
              >
                <div>
                  <p className="text-xs font-semibold text-neutral-900">{appt.time} — {appt.name}</p>
                  <p className="text-xs text-neutral-500">{appt.service}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Hero() {
  return (
    <section className="py-20 lg:py-28 bg-white dark:bg-neutral-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: text */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeInUp}>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent-DEFAULT bg-accent-DEFAULT/10 rounded-full px-3 py-1 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-DEFAULT animate-pulse" />
                Piattaforma multi-tenant per professionisti
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-5xl font-bold tracking-tight text-neutral-900 dark:text-white leading-tight"
            >
              Accetta prenotazioni online.{' '}
              <span className="text-primary-600">Automaticamente.</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-xl text-neutral-600 dark:text-neutral-300 mt-4 max-w-lg leading-relaxed"
            >
              Crea il tuo workspace su Booking Freelance, collega Google Calendar e condividi il tuo link — ogni professionista ha il suo ambiente dedicato e indipendente.
            </motion.p>

            <motion.div variants={fadeInUp} className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="gap-2">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Inizia gratis con Google
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="#come-funziona">Guarda come funziona</a>
              </Button>
            </motion.div>

            <motion.div variants={fadeInUp} className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-neutral-500 dark:text-neutral-400">
              {[
                'Workspace personale e isolato',
                'Setup in 2 minuti',
                'Sync automatica con Google Calendar',
              ].map((badge) => (
                <span key={badge} className="flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-accent-DEFAULT" />
                  {badge}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: browser mockup */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
            className="flex justify-center lg:justify-end"
          >
            <BrowserMockup />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
