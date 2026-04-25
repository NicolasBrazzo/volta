export default function CTASection() {
  return (
    <section id="h2-cta" className="pb-[120px]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <div className="relative bg-[#111114] border border-neutral-800 rounded-[28px] px-16 py-[100px] text-center overflow-hidden h2-reveal">
          {/* Grid background */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: 'linear-gradient(rgba(99,102,241,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(99,102,241,0.06) 1px,transparent 1px)',
              backgroundSize: '48px 48px',
              maskImage: 'radial-gradient(ellipse 60% 70% at 50% 50%,black 10%,transparent 80%)',
              WebkitMaskImage: 'radial-gradient(ellipse 60% 70% at 50% 50%,black 10%,transparent 80%)',
            }}
          />
          {/* Conic gradient */}
          <div
            className="absolute -top-1/2 left-1/2 -translate-x-1/2 w-[120%] h-[200%] pointer-events-none animate-conic-spin"
            style={{
              background: 'conic-gradient(from 90deg at 50% 50%,transparent 0deg,rgba(99,102,241,0.18) 60deg,rgba(34,211,238,0.1) 120deg,transparent 180deg,rgba(99,102,241,0.12) 240deg,transparent 340deg)',
              maskImage: 'radial-gradient(ellipse 40% 30% at 50% 30%,black 0%,transparent 70%)',
              WebkitMaskImage: 'radial-gradient(ellipse 40% 30% at 50% 30%,black 0%,transparent 70%)',
            }}
          />

          <div className="relative z-[2]">
            <div className="inline-flex items-center gap-2 px-3 py-[5px] rounded-full bg-primary/10 border border-primary/25 text-[12px] font-semibold text-primary-300 tracking-[0.02em] mb-7">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-glow-pulse" />
              Operativo in 5 minuti
            </div>

            <h2 className="text-[clamp(40px,6vw,72px)] font-extrabold tracking-[-0.04em] leading-[1.02] mb-5">
              Il tuo ufficio digitale<br />
              <span className="volta-gradient-text">apre oggi.</span>
            </h2>

            <p className="text-[19px] text-neutral-400 max-w-[520px] mx-auto mb-10">
              Smetti di inseguire clienti e conferme. Volta lo fa per te. Gratis, da subito.
            </p>

            <div className="flex gap-3 justify-center flex-wrap mb-5">
              <a
                href="#"
                className="inline-flex items-center gap-2 px-7 py-[14px] rounded-full text-[15px] font-semibold text-white no-underline bg-primary transition-all duration-200 hover:bg-primary-600 hover:-translate-y-0.5 shadow-[0_8px_24px_-8px_rgba(99,102,241,0.6)]"
              >
                Inizia gratis — è gratis →
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-2 px-7 py-[14px] rounded-full text-[15px] font-semibold text-neutral-50 no-underline border border-white/10 bg-white/[0.03] backdrop-blur-[10px] transition-all duration-200 hover:border-white/25 hover:bg-white/[0.06] hover:-translate-y-px"
              >
                Prenota una demo
              </a>
            </div>

            <div className="text-[13px] text-neutral-500">
              Nessuna carta di credito · Setup in 5 minuti · Cancella quando vuoi
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
