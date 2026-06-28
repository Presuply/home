import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import { gsap } from '../lib/gsap'
import { ButtonLink } from './ui/ButtonLink'
import { Icon } from './ui/Icon'

type Billing = 'mensual' | 'anual'

const plans = [
  {
    key: 'autonomo',
    title: 'Autónomo',
    priceMonthly: 49,
    popular: false,
    features: [
      '1 usuario',
      'Hasta 20 presupuestos al mes',
      'Generación desde foto, PDF o texto de WhatsApp',
      'Extracción de partidas con IA',
      'Capítulos en el presupuesto',
      'Editor con recálculo automático',
      'Expansión de descripciones con IA',
      'PDF profesional descargable',
      'IGIC / IVA configurable',
      'Plantilla con tu logo y datos',
    ],
  },
  {
    key: 'profesional',
    title: 'Profesional',
    priceMonthly: 99,
    popular: true,
    features: [
      'Hasta 3 usuarios',
      'Hasta 50 presupuestos al mes',
      'Todo lo de Autónomo, más:',
      'Carpetas para organizar presupuestos',
      'Soporte prioritario',
    ],
  },
  {
    key: 'empresa',
    title: 'Empresa',
    priceMonthly: 249,
    popular: false,
    features: [
      'Usuarios ilimitados',
      'Presupuestos ilimitados',
      'Todo lo de Profesional, más:',
      'Panel de administrador (próximamente)',
      'Integraciones / API (próximamente)',
      'Gestor de cuenta dedicado',
    ],
  },
] as const

export function PricingSection() {
  const rootRef = useRef<HTMLElement | null>(null)
  const [billing, setBilling] = useState<Billing>('mensual')

  const items = useMemo(() => {
    const discount = 0.8
    return plans.map((p) => {
      const monthly = p.priceMonthly
      const annualEquivalent = Math.round(monthly * discount)
      return {
        ...p,
        price: billing === 'mensual' ? monthly : annualEquivalent,
      }
    })
  }, [billing])

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-price-card]',
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.12,
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
    <section id="precios" ref={rootRef} className="py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-balance text-3xl font-extrabold tracking-tight text-navy-900 sm:text-4xl">
            Elige tu plan
          </h2>
          <p className="mt-3 text-pretty text-base text-text-secondary sm:text-lg">
            3 presupuestos gratis. Cancela cuando quieras.
          </p>

          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-border bg-white p-1 shadow-softer">
            <button
              type="button"
              onClick={() => setBilling('mensual')}
              className={`rounded-full px-4 py-2 text-sm font-extrabold transition ${
                billing === 'mensual'
                  ? 'bg-bg-light text-navy-900 shadow-softer'
                  : 'text-text-secondary hover:text-navy-900'
              }`}
            >
              Mensual
            </button>
            <button
              type="button"
              onClick={() => setBilling('anual')}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-extrabold transition ${
                billing === 'anual'
                  ? 'bg-bg-light text-navy-900 shadow-softer'
                  : 'text-text-secondary hover:text-navy-900'
              }`}
            >
              Anual
              <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-xs font-extrabold text-emerald-700">
                -20%
              </span>
            </button>
          </div>
        </div>

        <p className="mt-4 text-center text-xs text-text-secondary">
          Los precios no incluyen impuestos.{' '}
          <span className="font-semibold text-navy-900/70">Compatible con IGIC (Canarias) e IVA.</span>
        </p>

        <div className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-3">
          {items.map((p) => (
            <div
              key={p.key}
              data-price-card
              className={`relative overflow-hidden rounded-4xl border bg-white p-8 shadow-soft ${
                p.popular ? 'border-orange-500/50' : 'border-border'
              }`}
            >
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-orange-500/10 blur-3xl" />
              </div>

              <div className="relative">
                {p.popular && (
                  <div className="inline-flex rounded-full bg-orange-500 px-3 py-1 text-xs font-extrabold text-white">
                    Más popular
                  </div>
                )}

                <h3 className="mt-4 text-2xl font-extrabold tracking-tight text-navy-900">
                  {p.title}
                </h3>

                <div className="mt-4 flex items-end gap-2">
                  <div className="text-5xl font-extrabold tracking-tight text-navy-900">
                    {p.price}€
                  </div>
                  <div className="pb-2 text-base font-semibold text-text-secondary">
                    /mes
                  </div>
                </div>

                <p className="mt-2 text-sm text-text-secondary">
                  {billing === 'mensual'
                    ? 'Cancela cuando quieras.'
                    : 'Equivalente mensual · facturado anualmente.'}
                </p>

                <ul className="mt-6 space-y-3">
                  {p.features.map((x) => (
                    <li key={x} className="flex items-start gap-3 text-sm">
                      <span className="mt-0.5 grid h-7 w-7 place-items-center rounded-full bg-orange-500/15 text-orange-600">
                        <Icon name="check" className="h-4 w-4" />
                      </span>
                      <span className="text-navy-900/80">{x}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <ButtonLink
                    href="https://app.presuply.app/pricing"
                    variant={p.popular ? 'primary' : 'secondary'}
                    className="w-full"
                  >
                    Empezar prueba gratuita
                  </ButtonLink>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
