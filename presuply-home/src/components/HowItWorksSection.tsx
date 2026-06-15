import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'
import { Icon } from './ui/Icon'

const steps = [
  {
    n: '1',
    title: 'Sube la información',
    desc: 'Fotos, mensajes, notas o audios: todo sirve.',
    icon: 'upload' as const,
  },
  {
    n: '2',
    title: 'Presuply organiza partidas',
    desc: 'Detecta conceptos, unidades y precios automáticamente.',
    icon: 'list' as const,
  },
  {
    n: '3',
    title: 'Genera un PDF profesional',
    desc: 'Listo para revisar, exportar y enviar al cliente.',
    icon: 'doc' as const,
  },
]

export function HowItWorksSection() {
  const rootRef = useRef<HTMLDivElement | null>(null)
  const trackRef = useRef<HTMLDivElement | null>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current
      const root = rootRef.current
      if (!track || !root) return

      const getDistance = () => track.scrollWidth - window.innerWidth

      gsap.to(track, {
        x: () => -getDistance(),
        ease: 'none',
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: () => `+=${getDistance()}`,
          scrub: true,
          pin: true,
          anticipatePin: 1,
        },
      })
    }, rootRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="relative bg-white py-10 md:py-14">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="max-w-3xl">
          <h2 className="text-balance text-3xl font-extrabold tracking-tight text-navy-900 sm:text-4xl">
            Cómo funciona
          </h2>
          <p className="mt-3 text-pretty text-base text-text-secondary sm:text-lg">
            Scroll vertical, progreso horizontal: 3 pantallas, 1 resultado.
          </p>
        </div>
      </div>

      <div
        ref={rootRef}
        className="mt-8 flex h-[84vh] min-h-[580px] items-center overflow-hidden md:mt-10 md:h-[82vh] md:min-h-[640px]"
      >
        <div ref={trackRef} className="flex h-full w-max items-stretch">
          {steps.map((s) => (
            <div
              key={s.n}
              className="flex h-full w-screen items-center px-4 md:px-6"
              aria-label={`Paso ${s.n}`}
            >
              <div className="mx-auto max-w-6xl">
                <div className="grid grid-cols-1 items-center gap-6 rounded-4xl border border-border bg-bg-light p-5 shadow-softer md:grid-cols-12 md:gap-8 md:p-10">
                  <div className="md:col-span-5">
                    <div className="flex items-center gap-4">
                      <span className="grid h-14 w-14 place-items-center rounded-3xl bg-orange-500 text-white shadow-soft">
                        <Icon name={s.icon} className="h-6 w-6" />
                      </span>
                      <div>
                        <p className="text-sm font-extrabold text-orange-600">
                          Paso {s.n}
                        </p>
                        <h3 className="text-2xl font-extrabold tracking-tight text-navy-900">
                          {s.title}
                        </h3>
                      </div>
                    </div>
                    <p className="mt-3 text-base leading-relaxed text-text-secondary">
                      {s.desc}
                    </p>
                  </div>

                  <div className="md:col-span-7">
                    <div className="relative overflow-hidden rounded-4xl border border-border bg-white p-6 shadow-soft">
                      {s.n === '1' && (
                        <div className="grid grid-cols-3 gap-3">
                          {[
                            { t: 'Móvil', i: 'device' as const },
                            { t: 'Libreta', i: 'note' as const },
                            { t: 'Cámara', i: 'spark' as const },
                          ].map((x) => (
                            <div
                              key={x.t}
                              className="rounded-3xl border border-border bg-bg-light p-4 shadow-softer"
                            >
                              <div className="grid h-10 w-10 place-items-center rounded-2xl bg-orange-500/12 text-orange-600">
                                <Icon name={x.i} className="h-5 w-5" />
                              </div>
                              <p className="mt-3 text-sm font-extrabold text-navy-900">
                                {x.t}
                              </p>
                              <div className="mt-3 h-2 w-full rounded-full bg-navy-900/10" />
                            </div>
                          ))}
                        </div>
                      )}

                      {s.n === '2' && (
                        <div className="rounded-3xl border border-border bg-bg-light p-4 shadow-softer">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-extrabold text-navy-900">
                              Partidas
                            </p>
                            <span className="rounded-full bg-orange-500/15 px-2 py-1 text-xs font-semibold text-orange-600">
                              Detectadas
                            </span>
                          </div>
                          <div className="mt-4 space-y-3">
                            {[
                              ['Demolición', 'm²', '25,00 €'],
                              ['Alicatado', 'm²', '38,00 €'],
                              ['Fontanería', 'ud', '120,00 €'],
                              ['Pintura', 'm²', '9,50 €'],
                            ].map((r) => (
                              <div
                                key={r[0]}
                                className="grid grid-cols-3 gap-2 rounded-2xl bg-white px-3 py-2 text-sm shadow-softer"
                              >
                                <span className="font-semibold text-navy-900">
                                  {r[0]}
                                </span>
                                <span className="text-center text-text-secondary">
                                  {r[1]}
                                </span>
                                <span className="text-right font-semibold text-navy-900">
                                  {r[2]}
                                </span>
                              </div>
                            ))}
                          </div>
                          <div className="mt-4 flex items-center justify-end gap-2 text-xs font-semibold text-navy-900/70">
                            <span>Total</span>
                            <span className="text-orange-600">1.336,50 €</span>
                          </div>
                        </div>
                      )}

                      {s.n === '3' && (
                        <div className="grid grid-cols-12 gap-4">
                          <div className="col-span-8 rounded-3xl border border-border bg-bg-light p-4 shadow-softer">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-extrabold text-navy-900">
                                PRESUPUESTO
                              </p>
                              <span className="rounded-full bg-orange-500 px-2 py-1 text-xs font-extrabold text-white">
                                PDF
                              </span>
                            </div>
                            <div className="mt-4 space-y-2">
                              <div className="h-2 w-10/12 rounded-full bg-navy-900/10" />
                              <div className="h-2 w-9/12 rounded-full bg-navy-900/10" />
                              <div className="h-2 w-11/12 rounded-full bg-navy-900/10" />
                              <div className="h-2 w-8/12 rounded-full bg-navy-900/10" />
                            </div>
                            <div className="mt-5 h-9 w-32 rounded-2xl bg-orange-500/15" />
                          </div>
                          <div className="col-span-4 flex flex-col justify-between rounded-3xl border border-border bg-white p-4 shadow-softer">
                            <div>
                              <div className="grid h-12 w-12 place-items-center rounded-3xl bg-orange-500 text-white shadow-softer">
                                <Icon name="check" className="h-6 w-6" />
                              </div>
                              <p className="mt-3 text-sm font-extrabold text-navy-900">
                                Listo para enviar
                              </p>
                              <p className="mt-1 text-sm text-text-secondary">
                                Revisa y exporta en un clic.
                              </p>
                            </div>
                            <div className="rounded-2xl bg-bg-light px-3 py-2 text-xs font-semibold text-navy-900/70">
                              Cliente guardado · Historial actualizado
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="pointer-events-none absolute -bottom-10 -right-10 h-44 w-44 rounded-full bg-orange-500/10 blur-3xl" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
