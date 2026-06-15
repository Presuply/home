import { useLayoutEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../lib/gsap'
import { Icon } from './ui/Icon'

const problems = [
  {
    title: 'Notas en papel',
    desc: 'Información dispersa y difícil de comparar.',
    icon: 'note' as const,
    visual: 'from-white to-orange-500/10',
  },
  {
    title: 'Audios de WhatsApp',
    desc: 'Mensajes que nadie tiene tiempo de transcribir.',
    icon: 'whatsapp' as const,
    visual: 'from-white to-navy-900/10',
  },
  {
    title: 'Precios desordenados',
    desc: 'Tarifas en el sitio equivocado, sin control.',
    icon: 'price' as const,
    visual: 'from-white to-orange-500/10',
  },
  {
    title: 'PDFs hechos a mano',
    desc: 'Documentos poco profesionales, sin plantillas.',
    icon: 'pdf' as const,
    visual: 'from-white to-navy-900/10',
  },
  {
    title: 'Cambios a última hora',
    desc: 'Rehacer y corregir, otra vez.',
    icon: 'changes' as const,
    visual: 'from-white to-orange-500/10',
  },
]

export function ProblemSection() {
  const rootRef = useRef<HTMLElement | null>(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('[data-problem-card]')
      const dirs = [
        { x: -80, y: 0 },
        { x: 80, y: 0 },
        { x: 0, y: 80 },
        { x: 0, y: -80 },
      ]

      cards.forEach((card, i) => {
        const from = dirs[i % dirs.length]
        gsap.fromTo(
          card,
          { ...from, opacity: 0 },
          {
            x: 0,
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          },
        )
      })

      ScrollTrigger.refresh()
    }, rootRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="funciones" ref={rootRef} className="py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-balance text-3xl font-extrabold tracking-tight text-navy-900 sm:text-4xl">
            Hacer presupuestos sigue siendo{' '}
            <span className="text-orange-500">demasiado lento</span>.
          </h2>
          <p className="mt-3 text-pretty text-base text-text-secondary sm:text-lg">
            La información llega en mil formatos. El problema no es trabajar:
            es ordenar y pasar todo a limpio.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {problems.map((p) => (
            <div
              key={p.title}
              data-problem-card
              className="group relative overflow-hidden rounded-4xl border border-border bg-white p-5 shadow-softer"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-orange-500/12 text-orange-600">
                  <Icon name={p.icon} className="h-5 w-5" />
                </div>
                <div
                  className={`h-12 w-12 rounded-2xl bg-gradient-to-br ${p.visual} border border-border/60`}
                />
              </div>

              <h3 className="mt-4 text-sm font-extrabold text-navy-900">
                {p.title}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-text-secondary">
                {p.desc}
              </p>

              <div className="pointer-events-none absolute -bottom-6 -right-6 h-24 w-24 rounded-full bg-orange-500/10 blur-2xl transition group-hover:bg-orange-500/15" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
