import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { fadeInUp, stagger } from '@/constants/animations'
import { features } from '@/constants/homePage'

const sectionStagger = stagger(0.08)

export default function Features() {
  return (
    <section id="features" className="py-24 bg-white dark:bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-neutral-900 dark:text-white">
            Tutto quello che ti serve, già incluso
          </h2>
          <p className="text-neutral-600 dark:text-neutral-300 mt-3 max-w-xl mx-auto">
            Ogni funzionalità è progettata per il professionista indipendente. Nessun compromesso, nessuna condivisione.
          </p>
        </motion.div>

        <motion.div
          variants={sectionStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16"
        >
          {features.map(({ icon: Icon, title, desc }) => (
            <motion.div key={title} variants={fadeInUp}>
              <Card className="p-6 h-full hover:shadow-md transition-shadow cursor-default">
                <CardContent className="p-0">
                  <div className="rounded-lg bg-primary-50 dark:bg-primary-900/30 p-2 w-10 h-10 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-primary-600" />
                  </div>
                  <h3 className="font-semibold text-neutral-900 dark:text-white mb-1.5">{title}</h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">{desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
