import { HOW_STEPS } from '@/constants/home2'

function StepIllustration({ index }) {
  if (index === 0) {
    return (
      <div className="relative w-4/5 p-3 bg-[#15151A] rounded-[10px] flex items-center gap-[10px]"
        style={{ outline: '1px dashed rgba(99,102,241,0.4)', outlineOffset: '8px', borderRadius: '16px', animation: 'glow-pulse 2s ease-in-out infinite' }}
      >
        <div className="w-9 h-9 rounded-[10px] flex-shrink-0" style={{ background: 'var(--volta-gradient)' }} />
        <div className="flex flex-col gap-1 flex-1">
          <div className="h-2 bg-neutral-700 rounded" />
          <div className="h-2 bg-neutral-700 rounded max-w-[50%]" />
        </div>
      </div>
    )
  }
  if (index === 1) {
    return (
      <div className="grid grid-cols-4 gap-1 w-4/5">
        {Array.from({ length: 16 }).map((_, i) => {
          const isFilled = i === 5 || i === 6 || i === 10
          const isAccent = i === 9 || i === 14
          return (
            <div
              key={i}
              className={`aspect-square rounded-[4px] ${isFilled ? 'bg-primary animate-cell-flash' : isAccent ? 'bg-accent' : 'bg-neutral-800'}`}
              style={isFilled ? { animationDelay: `${i * 0.1}s` } : undefined}
            />
          )
        })}
      </div>
    )
  }
  return (
    <div
      className="w-10 h-10 rounded-full flex items-center justify-center text-lg animate-pulse-ring"
      style={{ background: 'var(--volta-gradient)' }}
    >
      ⚡
    </div>
  )
}

export default function HowSection() {
  return (
    <section id="h2-how" className="py-[120px]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <div className="text-center max-w-[720px] mx-auto mb-[72px] h2-reveal">
          <div className="inline-flex items-center gap-2 px-3 py-[5px] rounded-full bg-primary/10 border border-primary/25 text-[12px] font-semibold text-primary-300 tracking-[0.02em] mb-5">
            Come funziona
          </div>
          <h2 className="text-[clamp(36px,5vw,56px)] font-extrabold tracking-[-0.035em] leading-[1.05] mb-5">
            Tre passi.<br />Zero complicazioni.
          </h2>
          <p className="text-lg text-neutral-400 leading-relaxed max-w-[560px] mx-auto">
            Da zero a operativo in meno di 10 minuti. Nessuna configurazione infinita, nessun manuale da leggere.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {HOW_STEPS.map((s, i) => (
            <div
              key={i}
              className={`bg-[#111114] border border-neutral-800 rounded-[20px] p-8 relative overflow-hidden transition-all duration-300 hover:border-primary/30 hover:-translate-y-1 hover:bg-[#16161A] h2-reveal h2-reveal-delay-${i + 1}`}
            >
              {/* Top line on hover */}
              <div className="absolute top-0 left-0 right-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: 'linear-gradient(90deg,transparent,rgba(99,102,241,0.4),transparent)' }} />

              <div
                className="h-[140px] mb-5 rounded-xl bg-[#0D0D10] border border-neutral-800 flex items-center justify-center overflow-hidden"
              >
                <StepIllustration index={i} />
              </div>

              <div className="text-[13px] font-extrabold text-neutral-500 tracking-[0.08em] mb-5">{s.n}</div>
              <div className="text-[19px] font-bold tracking-[-0.02em] mb-2.5">{s.title}</div>
              <div className="text-sm text-neutral-400 leading-relaxed">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
