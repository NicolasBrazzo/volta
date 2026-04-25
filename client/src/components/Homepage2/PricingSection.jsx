import { PRICING_FREE_FEATURES, PRICING_PRO_FEATURES } from '@/constants/home2'

function CheckMark() {
  return (
    <span className="w-[18px] h-[18px] rounded-full bg-green-400/15 flex items-center justify-center text-[10px] flex-shrink-0 text-green-400">
      ✓
    </span>
  )
}

export default function PricingSection() {
  return (
    <section id="h2-pricing" className="pb-[120px]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <div className="text-center max-w-[720px] mx-auto mb-[72px] h2-reveal">
          <div className="inline-flex items-center gap-2 px-3 py-[5px] rounded-full bg-primary/10 border border-primary/25 text-[12px] font-semibold text-primary-300 tracking-[0.02em] mb-5">
            Prezzi
          </div>
          <h2 className="text-[clamp(36px,5vw,56px)] font-extrabold tracking-[-0.035em] leading-[1.05] mb-5">
            Inizia gratis.<br />Scala quando vuoi.
          </h2>
          <p className="text-lg text-neutral-400 leading-relaxed max-w-[560px] mx-auto">
            Nessuna carta di credito per iniziare. Aggiorna quando ne hai bisogno.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-[860px] mx-auto">
          {/* Free */}
          <div className="bg-[#111114] border border-neutral-800 rounded-[22px] p-9 relative overflow-hidden transition-all duration-300 hover:border-neutral-700 hover:-translate-y-1 h2-reveal">
            <div className="text-sm font-bold text-neutral-500 uppercase tracking-[0.1em] mb-4">Free</div>
            <div className="text-[56px] font-extrabold tracking-[-0.04em] leading-none">
              €0<span className="text-base text-neutral-500 font-medium">/sempre</span>
            </div>
            <div className="text-[13px] text-neutral-500 mt-2 mb-7">Perfetto per iniziare</div>
            <ul className="flex flex-col gap-3 mb-8 list-none">
              {PRICING_FREE_FEATURES.map((f) => (
                <li key={f} className="flex items-center gap-[10px] text-sm text-neutral-400">
                  <CheckMark />
                  {f}
                </li>
              ))}
            </ul>
            <button className="w-full py-[14px] rounded-full text-sm font-semibold bg-white/[0.08] text-neutral-50 border border-white/10 cursor-pointer transition-all duration-200 hover:bg-white/[0.12]">
              Inizia gratis
            </button>
          </div>

          {/* Pro */}
          <div
            className="relative rounded-[22px] p-9 overflow-hidden transition-all duration-300 hover:border-primary/50 hover:-translate-y-1 h2-reveal h2-reveal-delay-1"
            style={{ borderColor: 'rgba(99,102,241,0.4)', border: '1px solid rgba(99,102,241,0.4)', background: 'linear-gradient(180deg,rgba(99,102,241,0.08) 0%,rgba(99,102,241,0.02) 100%)' }}
          >
            {/* Top gradient line */}
            <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: 'var(--volta-gradient)' }} />

            <div className="absolute top-5 right-5 px-[10px] py-1 rounded-full text-[10px] font-extrabold text-white uppercase tracking-[0.08em]" style={{ background: 'var(--volta-gradient)' }}>
              Più scelto
            </div>

            <div className="text-sm font-bold text-neutral-500 uppercase tracking-[0.1em] mb-4">Pro</div>
            <div className="text-[56px] font-extrabold tracking-[-0.04em] leading-none volta-gradient-text">
              €19<span className="text-base font-medium" style={{ color: 'var(--muted-foreground)', WebkitTextFillColor: 'var(--muted-foreground)' }}>/mese</span>
            </div>
            <div className="text-[13px] text-neutral-500 mt-2 mb-7">Fatturazione annuale</div>
            <ul className="flex flex-col gap-3 mb-8 list-none">
              {PRICING_PRO_FEATURES.map((f) => (
                <li key={f} className="flex items-center gap-[10px] text-sm text-neutral-400">
                  <CheckMark />
                  {f}
                </li>
              ))}
            </ul>
            <button className="w-full py-[14px] rounded-full text-sm font-semibold text-white cursor-pointer transition-all duration-200 hover:bg-primary-600 hover:-translate-y-px shadow-[0_8px_24px_-8px_rgba(99,102,241,0.6)] bg-primary">
              Inizia gratis →
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
