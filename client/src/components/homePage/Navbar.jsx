import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, Sun, Moon } from 'lucide-react'
import logoWhite from '@/assets/logoWhite.png'
import logoBlack from '@/assets/logoBlack.png'
import { useDarkMode } from '@/hooks/useDarkMode'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { cn } from '@/lib/utils'

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'Come funziona', href: '#come-funziona' },
  { label: 'Prezzi', href: '#prezzi' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { isDark, toggle } = useDarkMode()

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/80 dark:bg-neutral-900/80 border-b border-neutral-100 dark:border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#"
          className="flex items-center gap-2 font-bold text-xl text-neutral-900 dark:text-white hover:opacity-80 transition-opacity"
        >
          <img src={isDark ? logoBlack : logoWhite} alt="Booking Freelance" className="h-10 w-auto" />
          <span>Booking Freelance</span>
        </a>

        {/* Desktop nav links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-neutral-600 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={toggle}
            aria-label={isDark ? 'Attiva modalità chiara' : 'Attiva modalità scura'}
            className="p-2 rounded-md text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <Button variant="ghost" size="sm" asChild>
            <Link to="/login">Accedi</Link>
          </Button>
          <Button size="sm" asChild>
            <Link to="/login">Inizia gratis</Link>
          </Button>
        </div>

        {/* Mobile: CTAs + hamburger */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggle}
            aria-label={isDark ? 'Attiva modalità chiara' : 'Attiva modalità scura'}
            className="p-2 rounded-md text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <Button variant="ghost" size="sm" className="text-xs px-3" asChild>
            <Link to="/dashboard">Accedi</Link>
          </Button>
          <Button size="sm" className="text-xs px-3" asChild>
            <Link to="/login">Inizia gratis</Link>
          </Button>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                className={cn(
                  'ml-1 p-2 rounded-md text-neutral-600 hover:bg-neutral-100 transition-colors',
                )}
                aria-label="Apri menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <img
                    src={isDark ? logoBlack : logoWhite}
                    alt="Booking Freelance"
                    className="h-6 w-auto"
                  />
                  Booking Freelance
                </SheetTitle>
              </SheetHeader>
              <nav className="mt-8 flex flex-col gap-4">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="text-base font-medium text-neutral-700 hover:text-primary-600 transition-colors py-2 border-b border-neutral-100"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </SheetContent>
          </Sheet>  
        </div>
      </div>
    </header>
  )
}
