import { useEffect, useMemo, useState } from 'react'
import { Logo } from './Logo'
import { ButtonLink } from './ui/ButtonLink'

const nav = [
  { label: 'Funciones', href: '#funciones' },
  { label: 'Precios', href: '#precios' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contacto', href: '#contacto' },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const className = useMemo(() => {
    const base = 'sticky top-0 z-50 border-b transition backdrop-blur-md'
    const idle = 'bg-white/70 border-transparent'
    const active = 'bg-white/80 border-border shadow-[0_10px_30px_rgba(7,24,39,0.10)]'
    return `${base} ${scrolled ? active : idle}`
  }, [scrolled])

  return (
    <header className={className}>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-6">
        <a href="#top" className="shrink-0">
          <Logo />
        </a>

        <nav className="hidden items-center gap-6 text-sm font-semibold text-navy-900/80 md:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="transition hover:text-navy-900"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ButtonLink
            href="https://app.presuply.app/login"
            variant="ghost"
            className="hidden md:inline-flex"
          >
            Iniciar sesión
          </ButtonLink>
          {/* TODO: actualizar href cuando estén disponibles los enlaces de App Store / Google Play */}
          <ButtonLink href="#descarga" variant="primary">
            Descargar app
          </ButtonLink>
        </div>
      </div>
    </header>
  )
}
