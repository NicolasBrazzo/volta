import { TESTIMONIALS } from '@/constants/home2'

const doubled = [...TESTIMONIALS, ...TESTIMONIALS]

export default function ProofSection() {
  return (
    <section id="h2-proof" className="pb-[120px]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <div className="text-center max-w-[720px] mx-auto mb-[72px] h2-reveal">
          <div className="inline-flex items-center gap-2 px-3 py-[5px] rounded-full bg-primary/10 border border-primary/25 text-[12px] font-semibold text-primary-300 tracking-[0.02em] mb-5">
            Testimonianze
          </div>
          <h2 className="text-[clamp(36px,5vw,56px)] font-extrabold tracking-[-0.035em] leading-[1.05] mb-5">
            Usato da chi<br />fa sul serio.
          </h2>
          <p className="text-lg text-neutral-400 leading-relaxed max-w-[560px] mx-auto">
            Professionisti che non hanno tempo da perdere e clienti da tenere.
          </p>
        </div>
      </div>

      {/* Marquee */}
      <div
        className="relative mt-16 overflow-hidden group"
        style={{
          maskImage: 'linear-gradient(90deg,transparent,black 10%,black 90%,transparent)',
          WebkitMaskImage: 'linear-gradient(90deg,transparent,black 10%,black 90%,transparent)',
        }}
      >
        <div className="flex gap-5 w-max animate-marquee-left group-hover:[animation-play-state:paused]">
          {doubled.map((t, i) => (
            <div key={i} className="w-[360px] bg-[#111114] border border-neutral-800 rounded-[18px] p-6 flex flex-col gap-[14px] flex-shrink-0">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, j) => (
                  <span key={j} className="text-[#F59E0B] text-[13px]">★</span>
                ))}
              </div>
              <div className="text-sm text-neutral-400 leading-[1.65] flex-1">"{t.text}"</div>
              <div className="flex items-center gap-[10px]">
                <div
                  className="w-9 h-9 rounded-[10px] flex items-center justify-center font-bold text-sm text-white"
                  style={{ background: t.bg }}
                >
                  {t.letter}
                </div>
                <div>
                  <div className="text-sm font-semibold">{t.name}</div>
                  <div className="text-xs text-neutral-500">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
