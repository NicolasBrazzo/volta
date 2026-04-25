import { useEffect, useRef, useState } from 'react'
import { STATS } from '@/constants/home2'
import { useCountUp } from '@/hooks/Home2/useCountUp'

function StatCell({ target, suffix, label, fmt, decimals = 0, start }) {
  const val = useCountUp(target, 1800, start)
  const display = fmt ? fmt(val) : (decimals ? val.toFixed(decimals) : Math.round(val).toLocaleString('it-IT'))
  return (
    <div className="px-6 py-9 text-center border-r border-neutral-800 last:border-r-0">
      <div
        className="text-[48px] font-extrabold tracking-[-0.04em] leading-none mb-1.5"
        style={{ background: 'linear-gradient(180deg,#FAFAF9 0%,#A1A1AA 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
      >
        {display}{suffix}
      </div>
      <div className="text-[13px] text-neutral-500">{label}</div>
    </div>
  )
}

export default function StatsSection() {
  const [inView, setInView] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const io = new IntersectionObserver(
      (e) => { if (e[0].isIntersecting) { setInView(true); io.disconnect() } },
      { threshold: 0.3 }
    )
    if (ref.current) io.observe(ref.current)
    return () => io.disconnect()
  }, [])

  return (
    <section className="py-20 pb-10" ref={ref}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 border-t border-b border-neutral-800">
          {STATS.map((s, i) => (
            <StatCell key={i} {...s} start={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}
