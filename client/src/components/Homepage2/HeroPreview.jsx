import {
  HERO_PREVIEW_NAV_ITEMS,
  HERO_PREVIEW_STATS,
  HERO_PREVIEW_CHART_DATA,
  HERO_PREVIEW_BOOKINGS,
} from '@/constants/home2'

export default function HeroPreview() {
  return (
    <div className="h2-reveal relative mt-15 mx-auto max-w-[1080px] px-6 md:px-12 z-[2]">
      <div
        className="relative rounded-[20px] p-px shadow-[0_60px_120px_-30px_rgba(99,102,241,0.3),0_30px_80px_-20px_rgba(0,0,0,0.5)]"
        style={{ background: 'linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))' }}
      >
        {/* Frame inner */}
        <div
          className="bg-[#0D0D10] rounded-[19px] overflow-hidden grid min-h-[520px]"
          style={{ gridTemplateColumns: '220px 1fr 280px' }}
        >
          {/* Sidebar */}
          <div className="bg-[#0A0A0C] border-r border-neutral-800 p-5 px-[14px] flex flex-col gap-1">
            <div className="flex items-center gap-2 px-[10px] pb-4 border-b border-neutral-800 mb-3">
              <div
                className="w-6 h-6 rounded-[6px] flex items-center justify-center text-xs font-extrabold text-white"
                style={{ background: 'var(--volta-gradient)' }}
              >
                V
              </div>
              <span className="text-sm font-bold tracking-[-0.02em]">volta</span>
            </div>
            {HERO_PREVIEW_NAV_ITEMS.map((item) => (
              <div
                key={item.n}
                className={`flex items-center gap-[10px] px-[10px] py-2 rounded-lg text-[12.5px] font-medium ${
                  item.active ? 'bg-primary/[0.12] text-primary-300' : 'text-neutral-500'
                }`}
              >
                <div className="w-[14px] h-[14px] rounded-[3px] bg-current opacity-80 flex-shrink-0" />
                {item.n}
              </div>
            ))}
          </div>

          {/* Main panel */}
          <div className="p-6 flex flex-col gap-4">
            <div className="flex justify-between items-start">
              <div>
                <div className="text-[15px] font-bold tracking-[-0.01em]">Dashboard</div>
                <div className="text-[11px] text-neutral-500 mt-0.5">Panoramica della settimana</div>
              </div>
              <div className="flex items-center gap-1 px-2 py-[3px] rounded-full bg-green-400/[0.12] text-green-400 text-[10px] font-bold">
                <span className="w-[5px] h-[5px] rounded-full bg-green-400 animate-glow-pulse" />
                LIVE
              </div>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-3 gap-[10px]">
              {HERO_PREVIEW_STATS.map((s) => (
                <div key={s.label} className="bg-[#15151A] border border-neutral-800 rounded-[10px] p-3">
                  <div className="text-[10px] text-neutral-500 uppercase tracking-[0.05em] font-semibold mb-1.5">{s.label}</div>
                  <div className="text-[20px] font-extrabold tracking-[-0.02em]">{s.val}</div>
                  <div className="text-[10px] text-green-400 mt-0.5 font-semibold">{s.delta}</div>
                </div>
              ))}
            </div>

            {/* Chart */}
            <div className="bg-[#15151A] border border-neutral-800 rounded-[10px] p-4 flex-1">
              <div className="flex justify-between items-center mb-[14px]">
                <div className="text-xs font-bold">Prenotazioni per giorno</div>
                <div className="flex gap-[10px] text-[10px] text-neutral-500">
                  <span><span className="inline-block w-[7px] h-[7px] rounded-[2px] mr-1 align-middle" style={{ background: '#6366F1' }} />Confermate</span>
                  <span><span className="inline-block w-[7px] h-[7px] rounded-[2px] mr-1 align-middle" style={{ background: '#22D3EE' }} />AI follow-up</span>
                </div>
              </div>
              <div className="flex items-end gap-2 h-[120px]">
                {HERO_PREVIEW_CHART_DATA.map((b, i) => (
                  <div key={b.d} className="flex-1 flex flex-col items-center gap-1">
                    <div className="flex gap-[2px] w-full items-end h-[100px]">
                      <div
                        className="flex-1 bg-primary rounded-t-[3px] origin-bottom animate-bar-grow"
                        style={{ height: b.h + '%', animationDelay: (0.05 * i) + 's' }}
                      />
                      <div
                        className="flex-1 bg-accent opacity-70 rounded-t-[3px] origin-bottom animate-bar-grow"
                        style={{ height: b.a + '%', animationDelay: (0.05 * i + 0.1) + 's' }}
                      />
                    </div>
                    <div className="text-[9px] text-neutral-500">{b.d}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right panel */}
          <div className="bg-[#0A0A0C] border-l border-neutral-800 p-5 px-[18px] flex flex-col gap-[14px]">
            <div className="text-xs font-bold uppercase tracking-[0.08em] text-neutral-500">Oggi · 5 appuntamenti</div>
            {HERO_PREVIEW_BOOKINGS.map((b, i) => (
              <div
                key={i}
                className={`flex gap-[10px] p-[10px] bg-[#15151A] border rounded-[10px] relative overflow-hidden ${
                  b.isNew ? 'border-primary/40 animate-cell-flash' : 'border-neutral-800'
                }`}
              >
                <div className="w-[42px] flex-shrink-0 text-center">
                  <div className="text-[13px] font-extrabold tracking-[-0.02em]">{b.h}</div>
                  <div className="text-[9px] text-neutral-500 uppercase">{b.m}</div>
                </div>
                <div className="flex-1 border-l border-neutral-800 pl-[10px]">
                  <div className="text-xs font-bold">{b.name}</div>
                  <div className="text-[10px] text-neutral-500 mt-0.5">{b.srv}</div>
                  <div
                    className="inline-block mt-1 px-1.5 py-[2px] rounded text-[9px] font-bold"
                    style={{ background: `${b.c}22`, color: b.c }}
                  >
                    {b.tag}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notification popup */}
        <div className="absolute right-[-16px] top-10 bg-[#15151A] border border-neutral-800 rounded-xl px-[14px] py-[10px] flex items-center gap-[10px] text-xs min-w-[220px] shadow-[0_16px_40px_rgba(0,0,0,0.5)] animate-h2-float">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center text-sm flex-shrink-0"
            style={{ background: 'var(--volta-gradient)' }}
          >
            ✓
          </div>
          <div>
            <strong className="text-xs block">Nuova prenotazione</strong>
            <span className="text-[11px] text-neutral-500">Marco C. · domani 11:00</span>
          </div>
        </div>
      </div>
    </div>
  )
}
