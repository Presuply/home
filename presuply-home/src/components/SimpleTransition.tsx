import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'
import { Icon } from './ui/Icon'

const chaos = [
  { label: 'Foto', icon: 'note' as const },
  { label: 'Audio', icon: 'whatsapp' as const },
  { label: 'Tarifas', icon: 'price' as const },
  { label: 'PDF', icon: 'pdf' as const },
  { label: 'Cambios', icon: 'changes' as const },
]

export function SimpleTransition() {
  const rootRef = useRef<HTMLElement | null>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>('[data-chaos]')
      const banner = gsap.utils.toArray<HTMLElement>('[data-simple-banner]')

      gsap.set(banner, { opacity: 0, y: 16, scale: 0.98 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top 75%',
          end: 'top 35%',
          scrub: true,
        },
      })

      tl.to(items, {
        x: (i) => (i - (items.length - 1) / 2) * 6,
        y: 0,
        rotate: 0,
        scale: 0.7,
        opacity: 0,
        ease: 'power2.out',
        stagger: 0.06,
      }).to(
        banner,
        { opacity: 1, y: 0, scale: 1, ease: 'power2.out' },
        0.15,
      )
    }, rootRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={rootRef} className="py-10 md:py-14">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="relative overflow-hidden rounded-4xl border border-border bg-white shadow-soft">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute left-1/2 top-1/2 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/10 blur-3xl" />
          </div>

          {chaos.map((c, i) => (
            <div
              key={c.label}
              data-chaos
              className="absolute hidden rounded-3xl border border-border bg-white px-4 py-3 shadow-softer md:flex md:items-center md:gap-2"
              style={{
                left: `${12 + i * 15}%`,
                top: `${18 + ((i * 37) % 44)}%`,
                transform: `translate(-50%, -50%) rotate(${i % 2 === 0 ? -14 : 14}deg)`,
              }}
            >
              <span className="grid h-9 w-9 place-items-center rounded-2xl bg-orange-500/12 text-orange-600">
                <Icon name={c.icon} className="h-5 w-5" />
              </span>
              <span className="text-sm font-extrabold text-navy-900">
                {c.label}
              </span>
            </div>
          ))}

          <div className="relative px-6 py-10 md:px-12 md:py-12">
            <div
              data-simple-banner
              className="mx-auto grid max-w-4xl grid-cols-1 items-center gap-6 rounded-4xl border border-border bg-bg-light px-6 py-8 shadow-softer md:grid-cols-12 md:px-10 md:py-10"
            >
              <div className="md:col-span-8">
                <p className="inline-flex items-center gap-2 text-sm font-semibold text-navy-900/70">
                  <span className="grid h-9 w-9 place-items-center rounded-2xl bg-orange-500 text-white shadow-softer">
                    <Icon name="bolt" className="h-5 w-5" />
                  </span>
                  Presuply lo convierte en algo{' '}
                  <span className="text-orange-500">simple</span>.
                </p>
                <p className="mt-2 text-pretty text-base leading-relaxed text-text-secondary sm:text-lg">
                  Del desorden al presupuesto en 3 pasos.
                </p>
              </div>

              <div className="md:col-span-4">
                <div className="grid grid-cols-3 gap-2">
                  {['Foto', 'IA', 'PDF'].map((t) => (
                    <div
                      key={t}
                      className="rounded-2xl border border-border bg-white px-3 py-3 text-center text-xs font-extrabold text-navy-900 shadow-softer"
                    >
                      {t}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

