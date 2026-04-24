import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { cn } from '@/utils/cnFunc'
import { fadeInUp, stagger } from '@/constants/animations'
import BrowserChrome from '@/components/homePage/BrowserChrome'
import GoogleIcon from '@/components/icons/GoogleIcon'

const sectionStagger = stagger()

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
      <BrowserChrome url="volta.app/mario" />

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
              className={cn(
                'px-4 py-2 text-xs cursor-pointer transition-colors',
                i === 0
                  ? 'bg-primary-700 text-white rounded-r-lg'
                  : 'text-primary-300 hover:text-white'
              )}
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
                    className={cn(
                      'text-center text-xs py-1 rounded',
                      day !== null && (highlighted.includes(day)
                        ? 'bg-primary-600 text-white font-semibold'
                        : 'text-neutral-700 hover:bg-primary-100')
                    )}
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
  const navigate = useNavigate()
  return (
    <section className="py-20 lg:py-28 bg-white dark:bg-neutral-950 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: text */}
          <motion.div
            variants={sectionStagger}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeInUp}>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent-DEFAULT bg-accent-DEFAULT/10 rounded-full px-3 py-1 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-DEFAULT animate-pulse" />
                Il tuo tempo, automatizzato
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-5xl font-bold tracking-tight text-neutral-900 dark:text-white leading-tight"
            >
              Prenotazioni intelligenti.{' '}
              <span className="text-primary-600">Zero pensieri.</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-xl text-neutral-600 dark:text-neutral-300 mt-4 max-w-lg leading-relaxed"
            >
              I tuoi clienti prenotano in 30 secondi. Tu li ritrovi su Google Calendar. Il resto? Lo gestisce Volta, mentre tu fai il tuo lavoro.
            </motion.p>

            <motion.div variants={fadeInUp} className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="gap-2" onClick={() => navigate('/early-access')}>
                <GoogleIcon className="w-5 h-5" />
                Inizia gratis con Google
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="#come-funziona">Guarda come funziona</a>
              </Button>
            </motion.div>

            <motion.div variants={fadeInUp} className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-neutral-500 dark:text-neutral-400">
              {[
                'Pronto in due minuti',
                'Nessuna carta richiesta',
                'Sincronizzato con Google Calendar',
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
