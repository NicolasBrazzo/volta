import { motion } from 'framer-motion'

const categories = [
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

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export default function SocialProofBar() {
  return (
    <section className="bg-neutral-50 dark:bg-neutral-900 border-y border-neutral-100 dark:border-neutral-800 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.p
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-sm text-neutral-500 dark:text-neutral-400 text-center mb-4"
        >
          Una piattaforma multi-tenant. Un workspace dedicato per ogni professionista.
        </motion.p>
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex overflow-x-auto gap-3 pb-2 justify-start md:justify-center"
          style={{ scrollbarWidth: 'none' }}
        >
          {categories.map((cat) => (
            <span
              key={cat.label}
              className="shrink-0 rounded-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 px-4 py-2 text-sm text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5 whitespace-nowrap"
            >
              <span>{cat.emoji}</span>
              <span>{cat.label}</span>
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
