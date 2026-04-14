import { CalendarDays, Github, Linkedin, Twitter } from 'lucide-react'
import { productLinks, legalLinks } from '@/constants/homePage'

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-400 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Logo + tagline */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 text-white font-extrabold text-xl tracking-tight mb-3 lowercase">
              <CalendarDays className="w-5 h-5 text-primary-400" />
              volta
            </div>
            <p className="text-sm text-neutral-500 leading-relaxed">
              Il tuo tempo, automatizzato. Prenotazioni online per chi lavora da solo e vuole sembrare un team di dieci.
            </p>
          </div>

          {/* Prodotto */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4">Prodotto</h4>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm hover:text-white transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legale */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4">Legale</h4>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm hover:text-white transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contatti */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4">Contatti</h4>
            <a
              href="mailto:hello@volta.app"
              className="text-sm hover:text-white transition-colors"
            >
              hello@volta.app
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-neutral-800 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-neutral-500">
            © 2026 Volta — Semplice. Efficace. Bella.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" aria-label="GitHub" className="hover:text-white transition-colors">
              <Github className="w-4 h-4" />
            </a>
            <a href="#" aria-label="LinkedIn" className="hover:text-white transition-colors">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-white transition-colors">
              <Twitter className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
