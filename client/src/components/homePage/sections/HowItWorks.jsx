import { motion } from 'framer-motion'

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

const steps = [
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

export default function HowItWorks() {
  return (
    <section id="come-funziona" className="py-24 bg-neutral-50 dark:bg-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-neutral-900 dark:text-white">Parti in 3 semplici passi</h2>
          <p className="text-neutral-600 dark:text-neutral-300 mt-3 max-w-md mx-auto">
            Dal primo accesso al tuo link di prenotazione in meno di 2 minuti.
          </p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16"
        >
          {/* Desktop stepper */}
          <div className="hidden md:flex items-start">
            {steps.map((step, idx) => (
              <div key={step.number} className="flex items-start flex-1">
                <div className="flex flex-col items-center flex-1">
                  <motion.div variants={fadeInUp} className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold text-lg shrink-0">
                      {step.number}
                    </div>
                    <div className="mt-4 text-center px-4">
                      <h3 className="font-semibold text-neutral-900 dark:text-white mb-2">{step.title}</h3>
                      <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-xs">{step.desc}</p>
                    </div>
                  </motion.div>
                </div>
                {idx < steps.length - 1 && (
                  <div className="h-px flex-shrink-0 w-12 bg-primary-200 mt-5" />
                )}
              </div>
            ))}
          </div>

          {/* Mobile vertical stepper */}
          <div className="flex md:hidden flex-col gap-8">
            {steps.map((step) => (
              <motion.div key={step.number} variants={fadeInUp} className="flex gap-5">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-primary-600 text-white flex items-center justify-center font-bold text-lg shrink-0">
                    {step.number}
                  </div>
                  <div className="w-px flex-1 bg-primary-200 mt-2" />
                </div>
                <div className="pb-4">
                  <h3 className="font-semibold text-neutral-900 dark:text-white mb-2">{step.title}</h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
