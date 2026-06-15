import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'
import { Logo } from './Logo'
import { Icon } from './ui/Icon'

function buildFooterPath(curveY: number) {
  return `M0,0 C360,${curveY} 1080,${curveY} 1440,0 L1440,220 L0,220 Z`
}

export function Footer() {
  const rootRef = useRef<HTMLElement | null>(null)
  const pathRef = useRef<SVGPathElement | null>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const path = pathRef.current
      if (!path) return

      const wave = { curve: 0 }
      path.setAttribute('d', buildFooterPath(0))

      const bounceWave = (velocity: number) => {
        const speed = Math.abs(velocity)
        const curve = gsap.utils.clamp(40, 160, 60 + speed / 18)
        const amplitude = velocity >= 0 ? curve : -curve

        gsap.fromTo(
          wave,
          { curve: amplitude },
          {
            curve: 0,
            duration: 2.05,
            ease: `elastic.out(${gsap.utils.clamp(1.25, 1.9, 1.35 + speed / 4500)}, 0.55)`,
            overwrite: true,
            onUpdate: () => path.setAttribute('d', buildFooterPath(wave.curve)),
          },
        )
      }

      gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top bottom',
          end: 'bottom top',
          onEnter: (self) => bounceWave(self.getVelocity()),
          onEnterBack: (self) => bounceWave(self.getVelocity()),
        },
      })
    }, rootRef)

    return () => ctx.revert()
  }, [])

  return (
    <footer
      id="contacto"
      ref={rootRef}
      className="relative bg-[#FF6500] text-navy-950"
    >
      <div className="pointer-events-none absolute inset-x-0 -top-[110px] z-0 h-[220px] md:-top-[120px] md:h-[240px]">
        <svg
          preserveAspectRatio="none"
          viewBox="0 0 1440 220"
          className="h-full w-full overflow-visible"
          aria-hidden="true"
        >
          <path ref={pathRef} fill="#FF6500" />
        </svg>
      </div>

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 bottom-0 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
      </div>

      <div className="relative z-10 px-4 pb-10 pt-10 md:px-10 md:pb-12 md:pt-12">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-8 md:grid-cols-12 md:gap-8">
            <div className="text-center sm:col-span-2 md:col-span-5 md:text-left">
              <Logo variant="large" className="h-9" />
              <p className="mt-4 max-w-md text-sm leading-relaxed text-navy-950/75">
                Presuply transforma fotos, notas, audios y mensajes en presupuestos
                profesionales listos para enviar. Hecho con amor por gente que entiende
                el ritmo real de la obra.
              </p>
              <div className="mt-5 flex items-center justify-center gap-3 md:justify-start">
                {[
                  { href: '#', icon: 'linkedin' as const, label: 'LinkedIn' },
                  { href: '#', icon: 'instagram' as const, label: 'Instagram' },
                  { href: '#', icon: 'xSocial' as const, label: 'X' },
                  { href: 'mailto:hola@presuply.com', icon: 'mail' as const, label: 'Email' },
                ].map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    aria-label={item.label}
                    className="grid h-11 w-11 place-items-center rounded-2xl border border-navy-950/15 bg-white/25 text-navy-950/80 transition hover:border-navy-950/25 hover:bg-white/35 hover:text-navy-950"
                  >
                    <Icon name={item.icon} className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>

            <div className="md:col-span-2">
              <p className="text-sm font-extrabold text-navy-950">Producto</p>
              <div className="mt-4 space-y-3 text-sm text-navy-950/75">
                <a href="#funciones" className="block transition hover:text-navy-950">
                  Funciones
                </a>
                <a
                  href="https://app.presuply.app/pricing"
                  className="block transition hover:text-navy-950"
                >
                  Precios
                </a>
                <a href="#demo" className="block transition hover:text-navy-950">
                  Demo
                </a>
              </div>
            </div>

            <div className="md:col-span-2">
              <p className="text-sm font-extrabold text-navy-950">Empresa</p>
              <div className="mt-4 space-y-3 text-sm text-navy-950/75">
                <a href="#blog" className="block transition hover:text-navy-950">
                  Blog
                </a>
                <a href="#contacto" className="block transition hover:text-navy-950">
                  Contacto
                </a>
                <a href="#" className="block transition hover:text-navy-950">
                  Privacidad
                </a>
              </div>
            </div>

            <div className="sm:col-span-2 md:col-span-3">
              <p className="text-sm font-extrabold text-navy-950">Contacto</p>
              <div className="mt-4 space-y-3 text-sm text-navy-950/75">
                <p>hola@presuply.com</p>
                <p>Soporte por email de lunes a viernes</p>
                <p>Madrid, España</p>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-2 border-t border-navy-950/15 pt-6 text-center text-xs text-navy-950/70 md:flex-row md:items-center md:justify-between md:text-left">
            <p>© 2026 Presuply. Todos los derechos reservados.</p>
            <p>Hecho con amor, criterio y mucho menos trabajo administrativo.</p>
          </div>
        </div>

        <div id="blog" className="sr-only" />
      </div>
    </footer>
  )
}
