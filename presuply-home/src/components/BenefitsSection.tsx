import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'
import { Icon } from './ui/Icon'

const benefits = [
  { title: 'Ahorra tiempo administrativo', icon: 'clock' as const },
  { title: 'Reduce errores en partidas', icon: 'shield' as const },
  { title: 'Mejora tu imagen ante el cliente', icon: 'spark' as const },
  { title: 'Centraliza todos tus presupuestos', icon: 'folder' as const },
  { title: 'Crea PDFs profesionales', icon: 'template' as const },
  { title: 'Trabaja desde donde quieras', icon: 'device' as const },
]

export function BenefitsSection() {
  const rootRef = useRef<HTMLElement | null>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-benefit]',
        { y: 26, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          stagger: 0.08,
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top 75%',
          },
        },
      )
    }, rootRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={rootRef} className="py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-balance text-3xl font-extrabold tracking-tight text-navy-900 sm:text-4xl">
            Pensado para reformistas, albañiles y pequeñas empresas de obra.
          </h2>
          <p className="mt-3 text-pretty text-base text-text-secondary sm:text-lg">
            Un flujo simple, plantillas cuidadas y un PDF que transmite
            confianza.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b) => (
            <div
              key={b.title}
              data-benefit
              className="rounded-4xl border border-border bg-white p-6 shadow-softer"
            >
              <div className="flex items-center gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-3xl bg-orange-500/12 text-orange-600">
                  <Icon name={b.icon} className="h-6 w-6" />
                </span>
                <h3 className="text-base font-extrabold text-navy-900">
                  {b.title}
                </h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                Automatiza la parte repetitiva y dedica el tiempo a cerrar
                obras.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

