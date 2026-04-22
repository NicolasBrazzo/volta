import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { fadeInUp, stagger } from '@/constants/animations'
import { testimonials } from '@/constants/homePage'

const sectionStagger = stagger(0.12)

export default function Testimonials() {
  return (
    <section className="py-24 bg-neutral-50 dark:bg-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-neutral-900 dark:text-white">Chi usa Volta, lavora meglio.</h2>
          <p className="text-neutral-600 dark:text-neutral-300 mt-3 max-w-md mx-auto">
            Professionisti che hanno smesso di rincorrere appuntamenti e hanno ricominciato a godersi il lavoro.
          </p>
        </motion.div>

        <motion.div
          variants={sectionStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12"
        >
          {testimonials.map(({ initials, name, profession, quote }) => (
            <motion.div key={name} variants={fadeInUp}>
              <Card className="p-6 h-full hover:shadow-md transition-shadow">
                <CardContent className="p-0 flex flex-col h-full">
                  {/* Stars */}
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-neutral-700 dark:text-neutral-300 italic leading-relaxed flex-1">"{quote}"</p>
                  <div className="flex items-center gap-3 mt-5 pt-4 border-t border-neutral-100 dark:border-neutral-700">
                    <Avatar>
                      <AvatarFallback>{initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-semibold text-neutral-900 dark:text-white">{name}</p>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400">{profession}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
