export default function FeaturesSection() {
  return (
    <section id="h2-features" className="pb-[120px]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <div className="text-center max-w-[720px] mx-auto mb-[72px] h2-reveal">
          <div className="inline-flex items-center gap-2 px-3 py-[5px] rounded-full bg-primary/10 border border-primary/25 text-[12px] font-semibold text-primary-300 tracking-[0.02em] mb-5">
            Funzionalità
          </div>
          <h2 className="text-[clamp(36px,5vw,56px)] font-extrabold tracking-[-0.035em] leading-[1.05] mb-5">
            Tutto quello che serve.<br />Niente che non serva.
          </h2>
          <p className="text-lg text-neutral-400 leading-relaxed max-w-[560px] mx-auto">
            Costruito per chi lavora davvero. Zero fronzoli, massimo risultato.
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-6 auto-rows-[minmax(220px,auto)] gap-4">
          {/* Large card — Presenza digitale */}
          <div className="md:col-span-4 md:row-span-2 bg-[#111114] border border-neutral-800 rounded-[22px] p-7 relative overflow-hidden transition-all duration-300 hover:border-primary/35 hover:-translate-y-0.5 h2-reveal">
            <div className="before:absolute before:top-0 before:left-0 before:right-0 before:h-px before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300" style={{ '--before-bg': 'linear-gradient(90deg,transparent,rgba(99,102,241,0.5),transparent)' }} />
            <div className="text-[11px] font-bold text-primary-300 uppercase tracking-[0.08em] mb-3">Presenza digitale</div>
            <div className="text-[30px] font-bold tracking-[-0.025em] leading-[1.15] mb-2.5">La tua vetrina professionale, sempre aperta.</div>
            <div className="text-sm text-neutral-400 leading-relaxed">Non hai un sito? Non ti serve. Con Volta hai una pagina che è biglietto da visita, portfolio e booking engine — tutto in uno.</div>
            <div className="mt-5">
              <div className="bg-[#0D0D10] border border-neutral-800 rounded-xl p-[14px] font-mono text-sm flex items-center gap-2">
                <span className="text-green-400">●</span>
                <span className="text-neutral-500">volta.app/</span>
                <span className="text-primary-300 font-semibold relative after:content-['|'] after:text-accent after:ml-0.5 typing-cursor-after">marco-bianchi</span>
              </div>
              <div className="mt-[14px] flex gap-2 flex-wrap">
                {['Consulenza Web · €120', 'UI/UX Review · €90', 'Sprint · €200', 'Audit · €60'].map((t) => (
                  <div key={t} className="px-3 py-1.5 bg-[#15151A] border border-neutral-800 rounded-full text-xs text-neutral-400">
                    {t}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Stat card */}
          <div className="md:col-span-2 md:row-span-2 bg-[#111114] border border-neutral-800 rounded-[22px] p-7 relative overflow-hidden transition-all duration-300 hover:border-primary/35 hover:-translate-y-0.5 h2-reveal h2-reveal-delay-1">
            <div className="text-[11px] font-bold text-primary-300 uppercase tracking-[0.08em] mb-3">Risultati</div>
            <div
              className="text-[56px] font-extrabold tracking-[-0.04em] leading-none mb-1"
              style={{ background: 'var(--volta-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
            >
              +3x
            </div>
            <div className="text-lg font-bold mt-2">Prenotazioni in più</div>
            <div className="text-sm text-neutral-400 leading-relaxed">rispetto a Calendly, in media nei primi 30 giorni.</div>
            <div className="mt-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex gap-1.5 mb-1.5">
                  {[0, 1, 2, 3].map((j) => (
                    <div
                      key={j}
                      className={`flex-1 h-[26px] rounded-[6px] border ${
                        (i === 0 && j === 0) || (i === 1 && j === 2) || (i === 2 && j === 2)
                          ? 'bg-primary border-primary'
                          : (i === 0 && j === 2) || (i === 1 && j === 0) || (i === 2 && j === 3)
                          ? 'bg-primary/40 border-primary/50'
                          : 'bg-[#15151A] border-neutral-800'
                      }`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* AI follow-up */}
          <div className="md:col-span-4 bg-[#111114] border border-neutral-800 rounded-[22px] p-7 relative overflow-hidden transition-all duration-300 hover:border-primary/35 hover:-translate-y-0.5 h2-reveal h2-reveal-delay-2">
            <div className="text-[11px] font-bold text-accent uppercase tracking-[0.08em] mb-3">AI Integrata</div>
            <div className="text-[22px] font-bold tracking-[-0.025em] leading-[1.15] mb-2.5">Follow-up automatici che sembrano scritti da te.</div>
            <div className="text-sm text-neutral-400 leading-relaxed">Messaggi generati dall'AI, adattati al contesto e al cliente. Invio via email o WhatsApp dopo ogni appuntamento.</div>
            <div className="mt-5 bg-[#0D0D10] border border-neutral-800 rounded-xl p-[14px] flex flex-col gap-[10px]">
              <div className="self-start bg-[#1C1C20] border border-neutral-700 px-3 py-2 rounded-xl text-[12.5px] leading-relaxed max-w-[85%]">
                Ciao! Ieri è andato tutto benissimo 🙏
              </div>
              <div>
                <div className="text-[9px] font-extrabold text-accent tracking-[0.1em] mb-1 text-right">⚡ AI DRAFT</div>
                <div className="self-end bg-primary/[0.12] border border-primary/25 text-primary-200 px-3 py-2 rounded-xl text-[12.5px] leading-relaxed max-w-[85%] ml-auto">
                  Ciao Giulia! Felice che la sessione sia stata utile. Vuoi prenotare un follow-up tra 2 settimane?
                </div>
              </div>
            </div>
          </div>

          {/* Calendar sync */}
          <div className="md:col-span-2 bg-[#111114] border border-neutral-800 rounded-[22px] p-7 relative overflow-hidden transition-all duration-300 hover:border-primary/35 hover:-translate-y-0.5 h2-reveal h2-reveal-delay-3">
            <div className="text-[11px] font-bold text-primary-300 uppercase tracking-[0.08em] mb-3">Integrazioni</div>
            <div className="text-[22px] font-bold tracking-[-0.025em] leading-[1.15] mb-2.5">Google Calendar, nativo.</div>
            <div className="text-sm text-neutral-400 leading-relaxed">Sincronizzazione bidirezionale in tempo reale.</div>
            <div className="flex items-center justify-center gap-5 py-5">
              <div className="w-14 h-14 rounded-[14px] flex items-center justify-center text-2xl font-extrabold text-white" style={{ background: 'var(--volta-gradient)' }}>V</div>
              <div className="relative w-[60px] h-0.5" style={{ background: 'linear-gradient(90deg,#6366F1,#FAFAF9)' }}>
                <span className="absolute top-1/2 left-0 w-2 h-2 rounded-full -translate-y-1/2 bg-primary shadow-[0_0_10px_#6366F1]" />
                <span className="absolute top-1/2 right-0 w-2 h-2 rounded-full -translate-y-1/2 bg-neutral-50 shadow-[0_0_10px_rgba(250,250,249,0.8)]" />
              </div>
              <div className="w-14 h-14 rounded-[14px] bg-neutral-50 flex items-center justify-center text-2xl font-extrabold text-neutral-900">G</div>
            </div>
          </div>

          {/* Payments */}
          <div className="md:col-span-2 bg-[#111114] border border-neutral-800 rounded-[22px] p-7 relative overflow-hidden transition-all duration-300 hover:border-primary/35 hover:-translate-y-0.5 h2-reveal h2-reveal-delay-4">
            <div className="text-[11px] font-bold text-primary-300 uppercase tracking-[0.08em] mb-3">Pagamenti</div>
            <div className="text-[22px] font-bold tracking-[-0.025em] leading-[1.15] mb-2.5">Stripe integrato.</div>
            <div className="text-sm text-neutral-400 leading-relaxed">Acconti, pagamenti anticipati o a fine seduta.</div>
            <div className="mt-5">
              <div className="bg-[#0D0D10] border border-neutral-800 rounded-xl p-[14px] flex justify-between items-center">
                <div>
                  <div className="text-[10px] text-neutral-500 mb-1">TOTALE</div>
                  <div className="text-[22px] font-extrabold tracking-[-0.02em]">€120,00</div>
                </div>
                <div className="px-4 py-2 rounded-full text-xs font-bold text-white" style={{ background: 'var(--volta-gradient)' }}>
                  Paga ora →
                </div>
              </div>
            </div>
          </div>

          {/* Analytics */}
          <div className="md:col-span-2 bg-[#111114] border border-neutral-800 rounded-[22px] p-7 relative overflow-hidden transition-all duration-300 hover:border-primary/35 hover:-translate-y-0.5 h2-reveal h2-reveal-delay-5">
            <div className="text-[11px] font-bold text-primary-300 uppercase tracking-[0.08em] mb-3">Analytics</div>
            <div className="text-[22px] font-bold tracking-[-0.025em] leading-[1.15] mb-2.5">Dati che contano.</div>
            <div className="text-sm text-neutral-400 leading-relaxed">Visualizzi entrate, retention e conversione.</div>
            <div className="flex items-end gap-1.5 h-[60px] mt-5">
              {[30, 45, 25, 70, 55, 85, 65].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-[3px] animate-bar-grow origin-bottom"
                  style={{ height: h + '%', background: i === 5 ? '#6366F1' : '#27272A', animationDelay: (i * 0.08) + 's' }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
