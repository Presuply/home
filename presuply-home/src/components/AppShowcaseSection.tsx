import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'
import { ButtonLink } from './ui/ButtonLink'
import { Icon } from './ui/Icon'

const bullets = [
  'Presupuesta en la obra, sin volver a casa',
  'Precios BCCA y los tuyos, siempre a mano',
  'PDF, Excel o BC3 desde el móvil',
]

const screens = [
  { title: 'Dashboard', accent: 'bg-orange-500/15 text-orange-600' },
  { title: 'Crear presupuesto', accent: 'bg-navy-900/10 text-navy-900' },
  { title: 'Historial', accent: 'bg-orange-500/15 text-orange-600' },
  { title: 'Clientes', accent: 'bg-navy-900/10 text-navy-900' },
  { title: 'PDF generado', accent: 'bg-orange-500/15 text-orange-600' },
]

function PhoneMock({
  title,
  className,
  badgeClass,
}: {
  title: string
  className: string
  badgeClass: string
}) {
  return (
    <div
      className={`relative aspect-[9/18] w-[210px] rounded-[2rem] border border-border bg-white shadow-soft ${className}`}
      style={{
        transform:
          'perspective(1200px) rotateX(6deg) rotateY(-10deg) rotateZ(-4deg)',
      }}
    >
      <div className="absolute left-1/2 top-2 h-5 w-20 -translate-x-1/2 rounded-full bg-navy-900/10" />
      <div className="absolute inset-[10px] rounded-[1.6rem] bg-bg-light p-4">
        <div className="flex items-center justify-between">
          <div className={`rounded-full px-2 py-1 text-[10px] font-extrabold ${badgeClass}`}>
            {title}
          </div>
          <div className="grid h-8 w-8 place-items-center rounded-2xl bg-orange-500 text-white shadow-softer">
            <Icon name="bolt" className="h-4 w-4" />
          </div>
        </div>

        <div className="mt-4 space-y-3">
          <div className="h-2 w-10/12 rounded-full bg-navy-900/10" />
          <div className="h-2 w-9/12 rounded-full bg-navy-900/10" />
          <div className="h-2 w-11/12 rounded-full bg-navy-900/10" />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="rounded-2xl border border-border bg-white p-3 shadow-softer">
              <div className="h-12 rounded-xl bg-[linear-gradient(135deg,rgba(11,28,45,0.10),rgba(255,90,0,0.12))]" />
              <div className="mt-2 h-2 w-8/12 rounded-full bg-navy-900/10" />
            </div>
            <div className="rounded-2xl border border-border bg-white p-3 shadow-softer">
              <div className="flex items-center justify-between text-[10px] font-semibold text-navy-900/70">
                <span>Estado</span>
                <span className="text-orange-600">OK</span>
              </div>
              <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-navy-900/10">
                <div className="h-full w-[70%] rounded-full bg-orange-500" />
              </div>
              <div className="mt-2 h-2 w-7/12 rounded-full bg-navy-900/10" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function AppShowcaseSection() {
  const rootRef = useRef<HTMLElement | null>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()

      mm.add('(min-width: 768px)', () => {
        const cards = gsap.utils.toArray<HTMLElement>('[data-mock]')
        cards.forEach((el, i) => {
          gsap.to(el, {
            y: (i % 2 === 0 ? -1 : 1) * (24 + i * 6),
            ease: 'none',
            scrollTrigger: {
              trigger: rootRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          })
        })
      })

      mm.add('(max-width: 767px)', () => {
        gsap.fromTo(
          '[data-mock]',
          { y: 18, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.08,
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
    <section ref={rootRef} className="overflow-x-hidden py-14 md:py-20">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-10 px-4 md:grid-cols-12 md:gap-8 md:px-6">
        <div className="md:col-span-5">
          <h2 className="text-balance text-3xl font-extrabold tracking-tight text-navy-900 sm:text-4xl">
            Hecha para la obra, no para la oficina.
          </h2>
          <ul className="mt-6 space-y-3">
            {bullets.map((b) => (
              <li key={b} className="flex items-start gap-3 text-base">
                <span className="mt-0.5 grid h-7 w-7 place-items-center rounded-full bg-orange-500/15 text-orange-600">
                  <Icon name="check" className="h-4 w-4" />
                </span>
                <span className="text-text-secondary">{b}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <ButtonLink href="https://app.presuply.app/pricing" variant="primary">
              Ver todas las funciones <span className="text-white/80">→</span>
            </ButtonLink>
          </div>
        </div>

        <div className="relative md:col-span-7">
          <div className="relative mx-auto h-[660px] max-w-[520px] md:h-[560px]">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -left-12 top-10 h-52 w-52 rounded-full bg-orange-500/10 blur-3xl" />
              <div className="absolute -right-14 bottom-6 h-64 w-64 rounded-full bg-navy-900/10 blur-3xl" />
            </div>

            {screens.map((s, i) => (
              <div
                key={s.title}
                data-mock
                className="absolute left-1/2 top-1/2"
                style={{
                  transform: `translate(-50%, -50%) translate(${(i - 2) * 64}px, ${(i - 2) * 10}px)`,
                  zIndex: 10 + i,
                }}
              >
                <PhoneMock
                  title={s.title}
                  badgeClass={s.accent}
                  className={i === 4 ? 'ring-1 ring-orange-500/25' : ''}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
