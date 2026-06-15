import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'
import { ButtonLink } from './ui/ButtonLink'
import { Icon } from './ui/Icon'

function CurvedArrow({ className }: { className: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 120 70"
      aria-hidden="true"
      fill="none"
    >
      <path
        d="M8 60C40 16 76 10 110 18"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M104 8 112 18l-12 6"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function HeroSection() {
  const rootRef = useRef<HTMLElement | null>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const phone = '[data-hero-phone]'
      const cards = '[data-hero-card]'
      const msgEls = gsap.utils.toArray<HTMLElement>('[data-hero-msg]').sort((a, b) => {
        const ao = Number(a.dataset.heroOrder || 0)
        const bo = Number(b.dataset.heroOrder || 0)
        return ao - bo
      })

      gsap.set(msgEls, { y: 10, opacity: 0 })

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.fromTo(
        phone,
        { y: 120, opacity: 0, rotate: -10 },
        { y: 0, opacity: 1, rotate: -6, duration: 1.05 },
      )
        .fromTo(
          cards,
          { x: (i) => (i % 2 === 0 ? 70 : -70), y: 20, opacity: 0 },
          { x: 0, y: 0, opacity: 1, duration: 0.7, stagger: 0.12 },
          '-=0.55',
        )
        .fromTo(
          msgEls,
          { y: 10, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.45, stagger: 0.12 },
          '-=0.4',
        )

      gsap.to(cards, {
        y: (i) => (i % 2 === 0 ? -10 : 10),
        duration: 2.4,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        stagger: 0.2,
        delay: 1.2,
      })
    }, rootRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="top"
      ref={rootRef}
      className="relative overflow-hidden pb-10 pt-10 md:pb-16 md:pt-16"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-10 h-80 w-80 rounded-full bg-orange-500/10 blur-3xl" />
        <div className="absolute -right-24 top-32 h-96 w-96 rounded-full bg-navy-900/10 blur-3xl" />
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 md:grid-cols-12 md:gap-8 md:px-6">
        <div className="relative z-10 md:col-span-6">
          <p className="inline-flex items-center gap-2 rounded-full border border-border bg-white/70 px-4 py-2 text-xs font-semibold text-navy-900/80 shadow-softer">
            <span className="grid h-6 w-6 place-items-center rounded-full bg-orange-500/15 text-orange-500">
              <Icon name="bolt" className="h-4 w-4" />
            </span>
            Del input al PDF, sin fricción
          </p>

          <h1 className="mt-5 text-balance text-4xl font-extrabold tracking-tight text-navy-900 sm:text-5xl">
            Presupuestos de obra en{' '}
            <span className="text-orange-500">minutos</span>, no en horas.
          </h1>
          <p className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-text-secondary sm:text-lg">
            Sube una foto, un mensaje o una nota de obra. Presuply organiza la
            información y genera presupuestos profesionales listos para enviar.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ButtonLink href="https://app.presuply.app/pricing" variant="primary">
              Probar Presuply gratis
              <span className="text-white/80">→</span>
            </ButtonLink>
            <ButtonLink href="#demo" variant="secondary">
              Ver demo
            </ButtonLink>
          </div>

          <div className="mt-8 flex items-center gap-3 text-sm text-text-secondary">
            <div className="flex -space-x-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="h-9 w-9 rounded-full border border-border bg-gradient-to-br from-white to-bg-light shadow-softer"
                />
              ))}
            </div>
            <span className="text-sm">
              +500 profesionales ya ahorran tiempo cada día
            </span>
          </div>
        </div>

        <div className="relative z-10 md:col-span-6">
          <div className="relative mx-auto w-full max-w-[520px]">
            <div className="pointer-events-none absolute inset-0">
              <CurvedArrow className="absolute left-0 top-6 h-16 w-28 -rotate-12 text-orange-500 md:left-6" />
              <CurvedArrow className="absolute right-0 top-24 h-16 w-28 rotate-[22deg] text-orange-500 md:right-4" />
            </div>

            <div className="relative">
              <div
                data-hero-phone
                className="relative mx-auto aspect-[9/18] w-[260px] rounded-[2.2rem] border border-border bg-white shadow-soft sm:w-[330px]"
                style={{
                  transform:
                    'perspective(1200px) rotateX(6deg) rotateY(-6deg) rotateZ(-6deg)',
                }}
              >
                <div className="absolute left-1/2 top-2 h-5 w-24 -translate-x-1/2 rounded-full bg-navy-900/10" />
                <div className="absolute inset-[10px] rounded-[1.8rem] bg-bg-light p-4">
                  <div className="relative h-full">
                    <div
                      data-hero-msg
                      data-hero-order="1"
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2">
                        <div className="grid h-9 w-9 place-items-center rounded-2xl border border-border bg-white shadow-softer">
                          <img
                            src="/presuply_logo_compacto.svg"
                            alt=""
                            className="h-6 w-6"
                            aria-hidden="true"
                            decoding="async"
                          />
                        </div>
                        <span className="text-sm font-extrabold text-navy-900">
                          Presupuestos
                        </span>
                      </div>
                      <div className="grid h-9 w-9 place-items-center rounded-2xl border border-border bg-white text-navy-900/50 shadow-softer">
                        <Icon name="dots" className="h-4 w-4" />
                      </div>
                    </div>

                    <div
                      data-hero-msg
                      data-hero-order="2"
                      className="mt-4 flex items-center gap-2"
                    >
                      <div className="flex flex-1 items-center gap-2 rounded-2xl border border-border bg-white px-3 py-2 text-[11px] text-text-secondary shadow-softer">
                        <Icon name="search" className="h-4 w-4" />
                        <span>Buscar…</span>
                      </div>
                      <div className="rounded-2xl border border-border bg-white px-3 py-2 text-[11px] font-semibold text-navy-900/80 shadow-softer">
                        Carpeta
                      </div>
                      <div className="rounded-2xl bg-orange-500 px-3 py-2 text-[11px] font-extrabold text-white shadow-softer">
                        Nuevo
                      </div>
                    </div>

                    <div
                      data-hero-msg
                      data-hero-order="3"
                      className="mt-4 grid grid-cols-2 gap-3"
                    >
                      {[
                        {
                          title: 'Andres',
                          count: '1 presupuesto',
                          accent: 'bg-orange-500/12 text-orange-600',
                        },
                        {
                          title: 'Carpeta p…',
                          count: '7 presupuestos',
                          accent: 'bg-emerald-500/12 text-emerald-700',
                        },
                        {
                          title: 'Madrid',
                          count: '24 presupuestos',
                          accent: 'bg-orange-500/12 text-orange-600',
                        },
                        {
                          title: 'Presu',
                          count: '0 presupuestos',
                          accent: 'bg-navy-900/10 text-navy-900',
                        },
                      ].map((f) => (
                        <div
                          key={f.title}
                          className="rounded-3xl border border-border bg-white p-3 shadow-softer"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <span
                              className={`grid h-9 w-9 place-items-center rounded-2xl ${f.accent}`}
                            >
                              <Icon name="folder" className="h-5 w-5" />
                            </span>
                            <span className="flex items-center gap-1 text-navy-900/35">
                              <Icon name="chevronDown" className="h-4 w-4" />
                              <Icon name="dots" className="h-4 w-4" />
                            </span>
                          </div>
                          <p className="mt-2 truncate text-[12px] font-extrabold text-navy-900">
                            {f.title}
                          </p>
                          <p className="text-[10px] text-text-secondary">
                            {f.count}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-5 pb-20">
                      <div
                        data-hero-msg
                        data-hero-order="4"
                        className="text-[10px] font-extrabold tracking-wide text-navy-900/50"
                      >
                        Presupuestos
                      </div>

                      <div className="mt-3 space-y-3">
                        {[
                          {
                            id: '#13',
                            title: 'Presupuesto 2088',
                            client: 'Josefina',
                            date: '12/06/2026',
                            amount: '26.049,68 €',
                          },
                          {
                            id: '#12',
                            title: 'Autónomo Madrid',
                            client: '—',
                            date: '09/06/2026',
                            amount: '5553,30 €',
                          },
                        ].map((p) => (
                          <div
                            key={p.id}
                            data-hero-msg
                            data-hero-order={p.id === '#13' ? '5' : '6'}
                            className="rounded-4xl border border-border bg-white p-4 shadow-softer"
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <div className="flex items-center gap-2 text-[10px] font-semibold text-text-secondary">
                                  <span>{p.id}</span>
                                  <span className="inline-flex items-center gap-1 rounded-full bg-navy-900/5 px-2 py-1 text-[10px] font-extrabold text-navy-900/70">
                                    <span className="h-1.5 w-1.5 rounded-full bg-navy-900/35" />
                                    Borrador
                                  </span>
                                </div>
                                <p className="mt-2 text-[12px] font-extrabold text-navy-900">
                                  {p.title}
                                </p>
                                <p className="mt-1 text-[10px] text-text-secondary">
                                  {p.client}
                                </p>
                                <p className="mt-0.5 text-[10px] text-text-secondary">
                                  {p.date}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="text-[14px] font-extrabold text-navy-900">
                                  {p.amount}
                                </p>
                                <div className="mt-2 flex justify-end">
                                  <span className="grid h-8 w-8 place-items-center rounded-2xl bg-bg-light text-navy-900/40">
                                    <Icon name="dots" className="h-4 w-4" />
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div
                      data-hero-msg
                      data-hero-order="7"
                      className="absolute bottom-0 left-0 right-0 px-2 pb-1"
                    >
                      <div className="rounded-4xl border border-border bg-white/90 px-4 py-3 shadow-soft backdrop-blur">
                        <div className="flex items-center justify-between">
                          <div className="flex flex-col items-center gap-1 text-[10px] font-extrabold text-navy-900">
                            <Icon name="home" className="h-5 w-5" />
                            Presupuestos
                          </div>
                          <div className="grid h-12 w-12 place-items-center rounded-full border border-border bg-white shadow-softer">
                            <Icon name="plus" className="h-6 w-6 text-navy-900" />
                          </div>
                          <div className="flex flex-col items-center gap-1 text-[10px] font-extrabold text-text-secondary">
                            <Icon name="user" className="h-5 w-5" />
                            Mi perfil
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                data-hero-card
                className="absolute left-2 top-2 w-[180px] rounded-3xl border border-border bg-white p-3 shadow-soft sm:-left-8 sm:top-8 sm:w-[220px] sm:p-4"
              >
                <div className="flex items-center justify-between">
                  <p className="text-xs font-extrabold text-navy-900">
                    Partidas detectadas
                  </p>
                  <span className="grid h-8 w-8 place-items-center rounded-2xl bg-orange-500/15 text-orange-600">
                    <Icon name="list" className="h-4 w-4" />
                  </span>
                </div>
                <ul className="mt-3 space-y-2 text-xs text-text-secondary">
                  {['Demolición', 'Alicatado', 'Fontanería', 'Pintura'].map(
                    (t) => (
                      <li key={t} className="flex items-center gap-2">
                        <span className="grid h-5 w-5 place-items-center rounded-full bg-orange-500/15 text-orange-600">
                          <Icon name="check" className="h-3.5 w-3.5" />
                        </span>
                        <span>{t}</span>
                      </li>
                    ),
                  )}
                </ul>
              </div>

              <div
                data-hero-card
                className="absolute right-2 top-40 w-[195px] rounded-3xl border border-border bg-white p-3 shadow-soft sm:-right-10 sm:top-52 sm:w-[240px] sm:p-4"
              >
                <div className="flex items-center justify-between">
                  <p className="text-xs font-extrabold text-navy-900">
                    Presupuesto generado
                  </p>
                  <span className="rounded-full bg-orange-500 px-2 py-1 text-[10px] font-extrabold text-white">
                    PDF
                  </span>
                </div>
                <div className="mt-3 flex items-end justify-between">
                  <div className="text-2xl font-extrabold tracking-tight text-navy-900">
                    1.336,50 €
                  </div>
                  <div className="text-xs font-semibold text-text-secondary">
                    IVA incl.
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-navy-900/70">
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-orange-500/15 text-orange-600">
                    <Icon name="check" className="h-4 w-4" />
                  </span>
                  Listo para enviar
                </div>
              </div>

              <div
                data-hero-card
                className="absolute bottom-2 left-10 hidden w-[200px] rounded-3xl border border-border bg-white p-4 shadow-soft sm:block"
              >
                <div className="flex items-center gap-2">
                  <span className="grid h-9 w-9 place-items-center rounded-2xl bg-orange-500 text-white">
                    <Icon name="doc" className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-xs font-extrabold text-navy-900">
                      Listo para enviar
                    </p>
                    <p className="text-xs text-text-secondary">
                      Cliente + obra guardados
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="demo" className="sr-only" />
    </section>
  )
}
