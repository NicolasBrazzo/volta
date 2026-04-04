import { motion } from 'framer-motion'
import { Home, Link, Settings } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const cards = [
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

export default function MultiTenantExplainer() {
  return (
    <section id="multi-tenant" className="py-24 dark:bg-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-neutral-900 dark:text-white">
            La tua attività. Il tuo spazio. Solo tuo.
          </h2>
          <p className="text-neutral-600 dark:text-neutral-300 mt-3 max-w-xl mx-auto">
            Multi-tenant significa che ogni professionista opera in un ambiente completamente separato e indipendente.
          </p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12"
        >
          {cards.map(({ icon: Icon, title, desc }) => (
            <motion.div key={title} variants={fadeInUp}>
              <Card className="p-8 h-full hover:shadow-md transition-shadow">
                <CardContent className="p-0">
                  <div className="w-12 h-12 rounded-xl bg-accent-DEFAULT/10 flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6 text-accent-DEFAULT" />
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">{title}</h3>
                  <p className="text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed">{desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
