import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { fadeInUp, stagger } from '@/constants/animations'
import { freeFeatures, proFeatures } from '@/constants/homePage'

const sectionStagger = stagger(0.15)

export default function Pricing() {
  return (
    <section id="prezzi" className="py-24 bg-white dark:bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-neutral-900 dark:text-white">Semplice. Trasparente.</h2>
          <p className="text-neutral-500 dark:text-neutral-400 mt-3">Ogni piano include un workspace personale e isolato.</p>
        </motion.div>

        <motion.div
          variants={sectionStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mt-12"
        >
          {/* FREE */}
          <motion.div variants={fadeInUp}>
            <Card className="p-8 h-full flex flex-col">
              <CardContent className="p-0 flex flex-col flex-1">
                <span className="inline-block bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 text-xs font-semibold rounded-full px-3 py-1 mb-5 w-fit">
                  Starter
                </span>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-bold text-neutral-900 dark:text-white">€0</span>
                  <span className="text-neutral-500 dark:text-neutral-400">/mese</span>
                </div>
                <ul className="space-y-3 flex-1">
                  {freeFeatures.map((feature) => (
                    <li key={feature} className="flex items-center gap-2.5 text-sm text-neutral-700 dark:text-neutral-300">
                      <Check className="w-4 h-4 text-accent-DEFAULT shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button variant="outline" className="w-full mt-8">
                  Crea il tuo workspace gratis
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* PRO */}
          <motion.div variants={fadeInUp}>
            <Card className="p-8 h-full flex flex-col border-2 border-primary-600 relative overflow-visible">
              {/* Popular badge */}
              <div className="absolute left-1/2 -translate-x-1/2 -top-3.5">
                <span className="bg-primary-600 text-white rounded-full px-4 py-1 text-sm font-semibold whitespace-nowrap shadow-sm">
                  Più popolare
                </span>
              </div>
              <CardContent className="p-0 flex flex-col flex-1">
                <span className="inline-block bg-primary-50 text-primary-700 text-xs font-semibold rounded-full px-3 py-1 mb-5 w-fit">
                  Pro
                </span>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-bold text-neutral-900 dark:text-white">€9</span>
                  <span className="text-neutral-500 dark:text-neutral-400">/mese</span>
                </div>
                <ul className="space-y-3 flex-1">
                  {proFeatures.map((feature) => (
                    <li key={feature} className="flex items-center gap-2.5 text-sm text-neutral-700 dark:text-neutral-300">
                      <Check className="w-4 h-4 text-primary-600 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button className="w-full mt-8">
                  Prova gratis 14 giorni
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
