export default function FooterSection() {
  return (
    <footer className="border-t border-neutral-800 py-12">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 flex justify-between items-center flex-wrap gap-6">
        <div
          className="text-[20px] font-extrabold tracking-[-0.04em]"
          style={{ background: 'var(--volta-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
        >
          volta
        </div>
        <ul className="flex gap-7 list-none">
          {['Privacy', 'Termini', 'Contatti', 'Blog'].map((l) => (
            <li key={l}>
              <a href="#" className="text-[13px] text-neutral-500 no-underline transition-colors duration-200 hover:text-neutral-50">
                {l}
              </a>
            </li>
          ))}
        </ul>
        <div className="text-[13px] text-neutral-500">© 2025 Volta. Tutti i diritti riservati.</div>
      </div>
    </footer>
  )
}
