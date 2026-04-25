import { useEffect, useRef } from 'react'
import { HERO_AVATARS } from '@/constants/home2'
import HeroPreview from './HeroPreview'
import { Link } from 'react-router-dom'

export default function HeroSection() {
  const heroRef = useRef(null)
  const spotRef = useRef(null)

  useEffect(() => {
    const hero = heroRef.current
    const spot = spotRef.current
    if (!hero || !spot) return
    const onMove = (e) => {
      const r = hero.getBoundingClientRect()
      spot.style.left = e.clientX - r.left + 'px'
      spot.style.top = e.clientY - r.top + 'px'
    }
    hero.addEventListener('mousemove', onMove)
    return () => hero.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <section id="h2-hero" ref={heroRef} className="relative min-h-screen pt-[100px] overflow-hidden">
      {/* Grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(99,102,241,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(99,102,241,0.05) 1px,transparent 1px)',
          backgroundSize: '72px 72px',
          maskImage: 'radial-gradient(ellipse 80% 70% at 50% 45%,black 20%,transparent 90%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 45%,black 20%,transparent 90%)',
        }}
      />

      {/* Conic gradient */}
      <div
        className="absolute -top-[40%] left-1/2 -translate-x-1/2 w-[140vw] aspect-square pointer-events-none animate-conic-spin"
        style={{
          background: 'conic-gradient(from 180deg at 50% 50%,transparent 0deg,rgba(99,102,241,0.12) 60deg,rgba(34,211,238,0.06) 120deg,transparent 180deg,rgba(99,102,241,0.08) 240deg,transparent 320deg)',
          maskImage: 'radial-gradient(ellipse 50% 50% at 50% 50%,black 0%,transparent 65%)',
          WebkitMaskImage: 'radial-gradient(ellipse 50% 50% at 50% 50%,black 0%,transparent 65%)',
        }}
      />

      {/* Orbs */}
      <div className="absolute -top-[100px] left-[calc(50%-60%)] w-[560px] h-[560px] rounded-full pointer-events-none blur-[90px] animate-glow-pulse" style={{ background: 'radial-gradient(circle,rgba(99,102,241,0.28) 0%,transparent 70%)' }} />
      <div className="absolute top-[35%] right-[3%] w-[420px] h-[420px] rounded-full pointer-events-none blur-[90px]" style={{ animationDelay: '1s', background: 'radial-gradient(circle,rgba(34,211,238,0.14) 0%,transparent 70%)', animation: 'glow-pulse 7s ease-in-out infinite 1s' }} />
      <div className="absolute bottom-[5%] left-[3%] w-[340px] h-[340px] rounded-full pointer-events-none blur-[90px]" style={{ background: 'radial-gradient(circle,rgba(99,102,241,0.12) 0%,transparent 70%)', animation: 'glow-pulse 6s ease-in-out infinite 2s' }} />

      {/* Mouse spotlight */}
      <div
        ref={spotRef}
        className="absolute w-[600px] h-[600px] rounded-full pointer-events-none blur-[40px] -translate-x-1/2 -translate-y-1/2 transition-[left,top] duration-200"
        style={{ background: 'radial-gradient(circle,rgba(165,180,252,0.15) 0%,transparent 60%)', left: '50%', top: '50%' }}
      />

      {/* Hero content */}
      <div className="relative z-[2] max-w-[920px] mx-auto px-6 md:px-12 pt-[60px] pb-[120px] text-center">
        <div className="inline-flex items-center gap-2 px-3 pl-[12px] py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-[13px] font-medium text-neutral-400 mb-8 backdrop-blur-[10px] animate-fade-up">
          <span
            className="px-[10px] py-[3px] rounded-full text-[11px] font-bold text-white uppercase tracking-[0.02em]"
            style={{ background: 'var(--volta-gradient)' }}
          >
            New
          </span>
          <span>Follow-up AI ora disponibile</span>
          <span className="text-neutral-500 text-[11px] ml-1">→</span>
        </div>

        <h1 className="text-[clamp(44px,6.5vw,88px)] font-extrabold tracking-[-0.04em] leading-[0.98] mb-7 animate-fade-up animate-delay-1">
          <span className="h2-shimmer-text">Prenotazioni intelligenti.</span><br />
          <span className="volta-gradient-text">Zero pensieri.</span>
        </h1>

        <p className="text-[19px] text-neutral-400 leading-[1.55] mb-10 max-w-[580px] mx-auto animate-fade-up animate-delay-2">
          Il tuo tempo, automatizzato. I tuoi clienti prenotano in 30 secondi. Tu li ritrovi su Google Calendar. Il follow-up parte da solo.
        </p>

        <div className="flex gap-3 flex-wrap mb-14 justify-center animate-fade-up animate-delay-3">
          <Link to="/early-access"
            className="inline-flex items-center gap-2 px-7 py-[14px] rounded-full text-[15px] font-semibold text-white no-underline bg-primary relative overflow-hidden transition-all duration-200 hover:bg-primary-600 hover:-translate-y-0.5 shadow-[0_8px_24px_-8px_rgba(99,102,241,0.6)]"
          >
            Inizia gratis →
          </Link>
          <a
            href="#h2-how"
            className="inline-flex items-center gap-2 px-7 py-[14px] rounded-full text-[15px] font-semibold text-neutral-50 no-underline border border-white/10 bg-white/[0.03] backdrop-blur-[10px] transition-all duration-200 hover:border-white/25 hover:bg-white/[0.06] hover:-translate-y-px"
          >
            Guarda la demo
          </a>
        </div>

        <div className="inline-flex items-center justify-center gap-4 text-[13px] text-neutral-500 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.06] animate-fade-up animate-delay-4">
          <div className="flex">
            {HERO_AVATARS.map((a, i) => (
              <div
                key={i}
                className="w-7 h-7 rounded-full border-2 border-neutral-950 text-[11px] font-bold flex items-center justify-center text-white"
                style={{ background: a.bg, marginLeft: i === 0 ? 0 : '-8px' }}
              >
                {a.letter}
              </div>
            ))}
          </div>
          <span>Usato da <strong className="text-neutral-50">+2.400</strong> professionisti in Italia</span>
        </div>
      </div>

      <HeroPreview />
    </section>
  )
}
