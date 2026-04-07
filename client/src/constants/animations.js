export const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

export const stagger = (delay = 0.1) => ({
  hidden: {},
  visible: { transition: { staggerChildren: delay } },
})
