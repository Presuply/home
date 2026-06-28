import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'
import { Icon } from './ui/Icon'

type IconName = 'list' | 'doc' | 'shield' | 'user'

const blocks: {
  title: string
  icon: IconName
  badge: string | null
  desc: string
  note: string | null
}[] = [
  {
    title: 'Base de precios BCCA',
    icon: 'list',
    badge: '12.554 partidas',
    desc: 'con precios reales de construcción, no de memoria.',
    note: null,
  },
  {
    title: 'Exportación BC3 / FIEBDC-3',
    icon: 'doc',
    badge: 'BC3 / FIEBDC-3',
    desc: 'Compatible con los programas de medición y arquitectura que ya usan tus colaboradores.',
    note: null,
  },
  {
    title: 'Estados de presupuesto',
    icon: 'shield',
    badge: null,
    desc: 'Borrador, enviado, aprobado. Sabes en qué punto está cada uno sin tener que preguntar.',
    note: null,
  },
  {
    title: 'Equipos multiusuario',
    icon: 'user',
    badge: null,
    desc: 'Roles de propietario y miembro — todo el equipo trabaja sobre los mismos presupuestos.',
    note: 'Disponible desde el plan Profesional.',
  },
]

export function ProfessionalRigorSection() {
  const rootRef = useRef<HTMLElement | null>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          '[data-rigor-card]',
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'power3.out',
            stagger: 0.1,
            scrollTrigger: {
              trigger: rootRef.current,
              start: 'top 75%',
            },
          },
        )
      })

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.fromTo(
          '[data-rigor-card]',
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.4,
            stagger: 0.06,
            scrollTrigger: {
              trigger: rootRef.current,
              start: 'top 75%',
            },
          },
        )
      })

      return () => mm.revert()
    }, rootRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={rootRef} className="py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-balance text-3xl font-extrabold tracking-tight text-navy-900 sm:text-4xl">
            Detrás de la simplicidad,{' '}
            <span className="text-orange-500">rigor de verdad</span>.
          </h2>
          <p className="mt-3 text-pretty text-base text-text-secondary sm:text-lg">
            No es un generador de PDFs. Es la herramienta con la que trabajan
            los profesionales.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-2">
          {blocks.map((b) => (
            <div
              key={b.title}
              data-rigor-card
              className="rounded-4xl border border-border bg-white p-6 shadow-softer"
            >
              <div className="flex items-center gap-3">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-3xl bg-orange-500/12 text-orange-600">
                  <Icon name={b.icon} className="h-6 w-6" />
                </span>
                <h3 className="text-base font-extrabold text-navy-900">
                  {b.title}
                </h3>
              </div>

              <div className="mt-4">
                {b.badge && (
                  <span className="mb-2 inline-flex items-center rounded-md border border-navy-900/12 bg-navy-900/5 px-2 py-0.5 font-mono text-[11px] font-bold tracking-wider text-navy-900/80">
                    {b.badge}
                  </span>
                )}
                <p className="text-sm leading-relaxed text-text-secondary">
                  {b.desc}
                </p>
                {b.note && (
                  <p className="mt-2 text-xs text-text-secondary/70">
                    {b.note}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
