import { motion } from 'framer-motion'
import { CalendarDays } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { fadeInUp, stagger } from '@/constants/animations'
import GoogleIcon from '@/components/icons/GoogleIcon'

const sectionStagger = stagger(0.12)

export default function FinalCTA() {
  return (
    <section className="py-24 bg-primary-900 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-primary-800 opacity-40 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-accent-DEFAULT/20 opacity-40 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={sectionStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-col items-center text-center"
        >
          <motion.div variants={fadeInUp}>
            <div className="w-14 h-14 rounded-2xl bg-primary-800 flex items-center justify-center mb-6 mx-auto">
              <CalendarDays className="w-7 h-7 text-accent-DEFAULT" />
            </div>
          </motion.div>

          <motion.h2
            variants={fadeInUp}
            className="text-4xl font-bold text-white max-w-2xl leading-tight"
          >
            Pronto a costruire il tuo spazio di prenotazione online?
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="text-xl text-primary-200 mt-4 max-w-xl leading-relaxed"
          >
            Registrati con Google e ottieni il tuo workspace in 2 minuti. Il tuo
            link. I tuoi clienti. I tuoi appuntamenti.
          </motion.p>

          <motion.div variants={fadeInUp} className="mt-8">
            <Button
              variant="accent"
              size="lg"
              className="px-8 py-4 text-lg gap-2 shadow-lg shadow-accent-DEFAULT/30 hover:shadow-accent-DEFAULT/50 transition-shadow"
            >
              <GoogleIcon className="w-5 h-5" variant="white" />
              Crea il tuo workspace gratis
            </Button>
          </motion.div>

          <motion.p
            variants={fadeInUp}
            className="text-primary-400 text-sm mt-4"
          >
            · Setup in 2 minuti ·
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
