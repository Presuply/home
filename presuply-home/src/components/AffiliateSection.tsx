import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'
import { ButtonLink } from './ui/ButtonLink'

export function AffiliateSection() {
  const rootRef = useRef<HTMLElement | null>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          '[data-affiliate-text]',
          { y: 22, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: rootRef.current,
              start: 'top 80%',
            },
          },
        )
        gsap.fromTo(
          '[data-affiliate-cta]',
          { y: 16, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'power3.out',
            delay: 0.15,
            scrollTrigger: {
              trigger: rootRef.current,
              start: 'top 80%',
            },
          },
        )
      })

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.fromTo(
          '[data-affiliate-text], [data-affiliate-cta]',
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.4,
            scrollTrigger: {
              trigger: rootRef.current,
              start: 'top 80%',
            },
          },
        )
      })

      return () => mm.revert()
    }, rootRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={rootRef} className="bg-navy-900 py-12 md:py-14">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between md:gap-12">
          <div data-affiliate-text className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.15em] text-orange-400">
              Programa de afiliados
            </p>
            <p className="mt-2 text-pretty text-2xl font-extrabold leading-snug text-white sm:text-3xl">
              ¿Conoces autónomos o empresas de construcción?{' '}
              Gana un{' '}
              <span className="text-orange-500">25&nbsp;%</span>{' '}
              de comisión durante 6 meses por cada cliente que se suscriba.
            </p>
          </div>

          <div data-affiliate-cta className="shrink-0">
            {/* TODO: actualizar href cuando esté disponible la página/formulario del programa de afiliados */}
            <ButtonLink href="#" variant="primary">
              Hazte afiliado →
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  )
}
