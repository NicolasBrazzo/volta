import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'
import { cn } from '@/utils/cnFunc'
import { fadeInUp, stagger } from '@/constants/animations'
import { checkItems } from '@/constants/homePage'
import BrowserChrome from '@/components/homePage/BrowserChrome'

const sectionStagger = stagger()

function DashboardMockupPreview() {
  return (
    <div className="rounded-xl border border-neutral-200 shadow-xl overflow-hidden w-full max-w-lg">
      <BrowserChrome url="bookingfreelance.app/dashboard" />

      {/* App content */}
      <div className="flex bg-white" style={{ minHeight: '300px' }}>
        {/* Sidebar */}
        <div className="w-36 bg-primary-900 text-white flex flex-col py-4 gap-1 shrink-0">
          {['Dashboard', 'Servizi', 'Disponibilità', 'Reportistica'].map((item, i) => (
            <div
              key={item}
              className={cn(
                'px-4 py-2 text-xs cursor-pointer',
                i === 3
                  ? 'bg-primary-700 text-white rounded-r-lg'
                  : 'text-primary-300 hover:text-white'
              )}
            >
              {item}
            </div>
          ))}
        </div>

        {/* Main: mini analytics */}
        <div className="flex-1 p-4">
          <p className="text-xs font-semibold text-neutral-900 mb-3">Reportistica — Aprile 2025</p>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            {[
              { label: 'Prenotazioni', value: '38' },
              { label: 'Nuovi clienti', value: '12' },
              { label: 'Entrate', value: '€740' },
            ].map((stat) => (
              <div key={stat.label} className="bg-primary-50 rounded-lg p-2 text-center">
                <p className="text-xs text-neutral-500 mb-0.5">{stat.label}</p>
                <p className="text-sm font-bold text-primary-700">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Bar chart mockup */}
          <div className="bg-white border border-neutral-100 rounded-lg p-3">
            <p className="text-xs text-neutral-400 mb-2">Prenotazioni per giorno</p>
            <div className="flex items-end gap-1 h-16">
              {[4, 7, 5, 9, 6, 8, 3, 10, 7, 5, 8, 6, 9, 4].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t"
                  style={{
                    height: `${(h / 10) * 100}%`,
                    backgroundColor: i % 3 === 0 ? '#06B6D4' : '#DBEAFE',
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function DashboardMockup() {
  return (
    <section id="dashboard" className="py-24 bg-white dark:bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: text */}
          <motion.div
            variants={sectionStagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeInUp}>
              <span className="inline-block text-xs font-semibold text-accent-DEFAULT bg-accent-DEFAULT/10 rounded-full px-3 py-1 mb-4">
                Il tuo workspace
              </span>
            </motion.div>
            <motion.h2 variants={fadeInUp} className="text-3xl font-bold text-neutral-900 dark:text-white">
              Una dashboard dedicata. Solo per te.
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-neutral-600 dark:text-neutral-300 mt-3">
              Ogni professionista accede al proprio workspace indipendente.
            </motion.p>

            <motion.ul variants={sectionStagger} className="mt-8 flex flex-col gap-4">
              {checkItems.map((item) => (
                <motion.li key={item} variants={fadeInUp} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 mt-0.5 shrink-0 text-accent-DEFAULT" />
                  <span className="text-neutral-700 dark:text-neutral-300">{item}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Right: mockup */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            viewport={{ once: true }}
            className="flex justify-center lg:justify-end"
          >
            <DashboardMockupPreview />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
