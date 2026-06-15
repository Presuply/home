import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'
import { Icon } from './ui/Icon'

function StoreBadge({
  kind,
  title,
  subtitle,
  href,
}: {
  kind: 'apple' | 'googlePlay'
  title: string
  subtitle: string
  href: string
}) {
  return (
    <a
      href={href}
      className="group flex w-full items-center gap-3 rounded-2xl border border-black/10 bg-black px-4 py-3 text-white shadow-softer transition hover:translate-y-[-1px] hover:shadow-soft sm:w-auto"
    >
      <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/10">
        <Icon name={kind} className="h-6 w-6 text-white" />
      </span>
      <span className="flex flex-col leading-none">
        <span className="text-[11px] text-white/70">{subtitle}</span>
        <span className="mt-1 text-sm font-extrabold">{title}</span>
      </span>
    </a>
  )
}

function Phone({
  variant,
  className,
}: {
  variant: 'home' | 'pdf'
  className?: string
}) {
  return (
    <div
      className={`relative aspect-[9/18] w-[250px] rounded-[2.2rem] border border-border bg-white shadow-soft ${className || ''}`}
    >
      <div className="absolute left-1/2 top-2 h-5 w-20 -translate-x-1/2 rounded-full bg-navy-900/10" />
      <div className="absolute inset-[10px] overflow-hidden rounded-[1.7rem] bg-bg-light">
        {variant === 'home' ? (
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="grid h-8 w-8 place-items-center rounded-2xl bg-orange-500 text-white shadow-softer">
                  <span className="text-sm font-extrabold">P</span>
                </div>
                <div className="text-[12px] font-extrabold text-navy-900">Presupuestos</div>
              </div>
              <div className="grid h-8 w-8 place-items-center rounded-2xl bg-white shadow-softer">
                <Icon name="dots" className="h-4 w-4 text-navy-900/70" />
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2">
              <div className="flex h-10 flex-1 items-center gap-2 rounded-2xl border border-border bg-white px-3 text-[12px] text-text-secondary shadow-softer">
                <Icon name="search" className="h-4 w-4 text-navy-900/40" />
                Buscar…
              </div>
              <div className="grid h-10 w-10 place-items-center rounded-2xl border border-border bg-white shadow-softer">
                <Icon name="folder" className="h-4 w-4 text-navy-900/60" />
              </div>
              <div className="grid h-10 w-10 place-items-center rounded-2xl bg-orange-500 text-white shadow-soft">
                <Icon name="plus" className="h-4 w-4" />
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              {[
                { name: 'Madrid', count: '24 presupuestos', color: 'bg-orange-500/15' },
                { name: 'Andres', count: '1 presupuesto', color: 'bg-navy-900/10' },
                { name: 'Carpeta p…', count: '7 presupuestos', color: 'bg-green-500/12' },
                { name: 'Presu', count: '0 presupuestos', color: 'bg-navy-900/10' },
              ].map((f) => (
                <div key={f.name} className="rounded-2xl border border-border bg-white p-3 shadow-softer">
                  <div className="flex items-start justify-between">
                    <div className={`h-9 w-9 rounded-2xl ${f.color}`} />
                    <Icon name="chevronDown" className="h-4 w-4 text-navy-900/35" />
                  </div>
                  <div className="mt-2 truncate text-[12px] font-extrabold text-navy-900">
                    {f.name}
                  </div>
                  <div className="text-[10px] text-text-secondary">{f.count}</div>
                </div>
              ))}
            </div>

            <div className="mt-5 text-[10px] font-extrabold tracking-wide text-navy-900/50">
              Presupuestos
            </div>
            <div className="mt-3 space-y-3">
              {[
                { title: 'Presupuesto 2088', amount: '26.049,68 €' },
                { title: 'Autónomo Madrid', amount: '5.553,30 €' },
              ].map((p) => (
                <div key={p.title} className="rounded-2xl border border-border bg-white p-3 shadow-softer">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div className="truncate text-[12px] font-extrabold text-navy-900">
                        {p.title}
                      </div>
                      <div className="mt-1 inline-flex items-center gap-2 rounded-full bg-navy-900/5 px-2 py-1 text-[10px] font-semibold text-navy-900/70">
                        <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                        Borrador
                      </div>
                    </div>
                    <div className="text-[12px] font-extrabold text-navy-900">
                      {p.amount}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="grid h-8 w-8 place-items-center rounded-2xl bg-white shadow-softer">
                <Icon name="chevronDown" className="h-4 w-4 -rotate-90 text-navy-900/70" />
              </div>
              <div className="text-[12px] font-extrabold text-navy-900">Presupuesto</div>
              <div className="grid h-8 w-8 place-items-center rounded-2xl bg-white shadow-softer">
                <Icon name="dots" className="h-4 w-4 text-navy-900/70" />
              </div>
            </div>

            <div className="mt-4 rounded-2xl border border-border bg-white p-4 shadow-softer">
              <div className="flex items-center justify-between text-[10px] font-semibold text-navy-900/60">
                <span>Nº 2024-00125</span>
                <span className="rounded-full bg-green-500/15 px-2 py-1 font-extrabold text-green-700">
                  Aprobado
                </span>
              </div>
              <div className="mt-3 space-y-2 text-[10px] text-navy-900/70">
                <div className="flex items-center justify-between">
                  <span>Cliente</span>
                  <span className="font-extrabold text-navy-900">Juan Pérez</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Fecha</span>
                  <span className="font-extrabold text-navy-900">24/05/2024</span>
                </div>
              </div>
              <div className="mt-4 flex items-end justify-between">
                <div className="text-[10px] font-semibold text-navy-900/55">Total</div>
                <div className="text-lg font-extrabold text-orange-600">1.336,50 €</div>
              </div>
              <div className="mt-4 space-y-2">
                {[
                  { name: 'Demolición', value: '450,00 €' },
                  { name: 'Instalación', value: '280,00 €' },
                  { name: 'Mueble lavabo', value: '350,00 €' },
                  { name: 'Grifería', value: '120,00 €' },
                ].map((row) => (
                  <div key={row.name} className="flex items-center justify-between text-[10px] text-navy-900/70">
                    <span>{row.name}</span>
                    <span className="font-semibold text-navy-900">{row.value}</span>
                  </div>
                ))}
              </div>
              <div className="mt-5 flex items-center gap-2">
                <button className="flex-1 rounded-2xl border border-border bg-bg-light px-3 py-2 text-[11px] font-extrabold text-navy-900 shadow-softer">
                  Enviar
                </button>
                <button className="flex-1 rounded-2xl bg-orange-500 px-3 py-2 text-[11px] font-extrabold text-white shadow-soft">
                  Ver PDF
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export function DownloadAppSection() {
  const rootRef = useRef<HTMLElement | null>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '[data-download-left]',
        { y: 22, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: rootRef.current, start: 'top 75%' },
        },
      )

      gsap.fromTo(
        '[data-download-phone]',
        { y: 36, opacity: 0, rotate: -2 },
        {
          y: 0,
          opacity: 1,
          rotate: 0,
          duration: 1.1,
          ease: 'power3.out',
          stagger: 0.12,
          scrollTrigger: { trigger: rootRef.current, start: 'top 75%' },
        },
      )

      gsap.utils.toArray<HTMLElement>('[data-download-parallax]').forEach((el, i) => {
        gsap.to(el, {
          y: (i % 2 === 0 ? -1 : 1) * (18 + i * 8),
          ease: 'none',
          scrollTrigger: {
            trigger: rootRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        })
      })
    }, rootRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="descarga" ref={rootRef} className="overflow-x-hidden pt-14 pb-40 md:pt-20 md:pb-56">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-4 md:grid-cols-12 md:gap-8 md:px-6">
        <div data-download-left className="md:col-span-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/35 bg-orange-500/10 px-3 py-1 text-[11px] font-extrabold text-orange-700">
            DESCARGA LA APP
          </div>
          <h2 className="mt-4 text-balance text-3xl font-extrabold tracking-tight text-navy-900 sm:text-4xl">
            Presupuestos profesionales desde tu móvil.
          </h2>
          <p className="mt-4 text-pretty text-base leading-relaxed text-text-secondary">
            Crea, envía y gestiona presupuestos estés donde estés. Rápido, fácil y profesional.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <StoreBadge
              kind="apple"
              subtitle="Descárgalo en"
              title="App Store"
              href="#"
            />
            <StoreBadge
              kind="googlePlay"
              subtitle="Disponible en"
              title="Google Play"
              href="#"
            />
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {[
              { title: 'Rápido', desc: 'Crea presupuestos en minutos.', icon: 'bolt' as const },
              { title: 'En la nube', desc: 'Tus datos siempre sincronizados.', icon: 'upload' as const },
              { title: 'Seguro', desc: 'Protegemos tu información.', icon: 'shield' as const },
            ].map((f) => (
              <div key={f.title}>
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-orange-500/12 text-orange-600">
                  <Icon name={f.icon} className="h-5 w-5" />
                </div>
                <div className="mt-3 text-sm font-extrabold text-navy-900">{f.title}</div>
                <div className="mt-1 text-sm text-text-secondary">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative md:col-span-7">
          <div className="relative mx-auto h-[520px] max-w-[560px]">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -left-10 top-16 h-56 w-56 rounded-full bg-orange-500/10 blur-3xl" />
              <div className="absolute -right-10 bottom-10 h-64 w-64 rounded-full bg-navy-900/10 blur-3xl" />
            </div>

            <div
              data-download-phone
              data-download-parallax
              className="absolute left-[44%] top-[48%] -translate-x-1/2 -translate-y-1/2"
              style={{
                transform:
                  'translate(-50%, -50%) perspective(1200px) rotateX(6deg) rotateY(-12deg) rotateZ(-8deg)',
              }}
            >
              <Phone variant="home" />
            </div>

            <div
              data-download-phone
              data-download-parallax
              className="absolute left-[62%] top-[52%] -translate-x-1/2 -translate-y-1/2"
              style={{
                transform:
                  'translate(-50%, -50%) perspective(1200px) rotateX(6deg) rotateY(12deg) rotateZ(10deg)',
              }}
            >
              <Phone variant="pdf" className="ring-1 ring-orange-500/25" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
