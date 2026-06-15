import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'
import { ButtonLink } from './ui/ButtonLink'

export function FinalCTA() {
  const rootRef = useRef<HTMLElement | null>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set('[data-line]', { scaleX: 0, transformOrigin: 'left center' })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top 80%',
        },
      })

      tl.fromTo(
        '[data-cta-inner]',
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' },
      ).to(
        '[data-line]',
        { scaleX: 1, duration: 1.1, ease: 'power3.out', stagger: 0.12 },
        '-=0.65',
      )
    }, rootRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={rootRef}
      className="relative overflow-hidden bg-navy-950 py-16 text-white md:py-20"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-8 h-96 w-96 rounded-full bg-orange-500/15 blur-3xl" />
        <div className="absolute -right-40 bottom-24 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 md:px-6">
        <div className="relative">
          <div
            data-line
            className="absolute -left-2 top-4 hidden h-[3px] w-44 rounded-full bg-orange-500 md:block"
          />
          <div
            data-line
            className="absolute -right-6 top-20 hidden h-[3px] w-56 rounded-full bg-orange-500 md:block"
          />
          <div
            data-line
            className="absolute left-10 bottom-8 hidden h-[3px] w-40 rounded-full bg-orange-500 md:block"
          />
        </div>

        <div
          data-cta-inner
          className="relative mx-auto max-w-4xl rounded-4xl border border-white/10 bg-white/5 p-8 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-md md:p-12"
        >
          <h2 className="text-balance text-3xl font-extrabold tracking-tight sm:text-4xl">
            Tu próximo presupuesto puede estar listo en minutos.
          </h2>
          <p className="mt-3 text-pretty text-base leading-relaxed text-white/70 sm:text-lg">
            Deja de perder tiempo pasando notas a limpio. Hazlo desde una foto,
            revísalo y envíalo.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="#precios" variant="primary">
              Empezar ahora gratis <span className="text-white/80">→</span>
            </ButtonLink>
            <ButtonLink
              href="#demo"
              variant="secondary"
              className="border-white/20 bg-white/10 text-white hover:bg-white/15"
            >
              Ver demo
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  )
}
