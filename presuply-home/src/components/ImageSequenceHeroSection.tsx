import { useLayoutEffect, useMemo, useRef } from 'react'
import { gsap } from '../lib/gsap'
import { ButtonLink } from './ui/ButtonLink'

function pad3(n: number) {
  return String(n).padStart(3, '0')
}

type Props = {
  frameCount?: number
  fps?: number
  basePath?: string
  pxPerFrame?: number
  minScrollDistancePx?: number
  showFrameLabel?: boolean
  title?: string
  subtitle?: string
}

export function ImageSequenceHeroSection({
  frameCount = 57,
  fps = 30,
  basePath = '/image-sequence/frames',
  pxPerFrame = 90,
  minScrollDistancePx = 3200,
  showFrameLabel = false,
  title = 'Presupuestos profesionales en minutos.',
  subtitle = 'Convierte fotos, notas, audios o WhatsApp en presupuestos PDF listos para enviar. La portada es una secuencia a pantalla completa controlada con scroll.',
}: Props) {
  const rootRef = useRef<HTMLDivElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const labelRef = useRef<HTMLDivElement | null>(null)
  const progressRef = useRef<HTMLDivElement | null>(null)

  const scrollDistancePx = useMemo(() => {
    return Math.max(minScrollDistancePx, frameCount * pxPerFrame)
  }, [frameCount, minScrollDistancePx, pxPerFrame])

  const urls = useMemo(() => {
    return Array.from({ length: frameCount }, (_, i) => {
      const index = i + 1
      return `${basePath}/frame_${pad3(index)}.png`
    })
  }, [basePath, frameCount])

  useLayoutEffect(() => {
    const root = rootRef.current
    const canvas = canvasRef.current
    if (!canvas || !root) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const playhead = { frame: 0 }
    let curFrame = -1
    let viewportWidth = window.innerWidth
    let viewportHeight = window.innerHeight

    const resizeCanvas = () => {
      viewportWidth = window.innerWidth
      viewportHeight = window.innerHeight
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(viewportWidth * dpr)
      canvas.height = Math.round(viewportHeight * dpr)
      canvas.style.width = `${viewportWidth}px`
      canvas.style.height = `${viewportHeight}px`
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.scale(dpr, dpr)
      updateImage()
    }

    const drawCover = (img: HTMLImageElement) => {
      const imageRatio = img.naturalWidth / img.naturalHeight
      const viewportRatio = viewportWidth / viewportHeight

      let drawWidth = viewportWidth
      let drawHeight = viewportHeight
      let dx = 0
      let dy = 0

      if (imageRatio > viewportRatio) {
        drawHeight = viewportHeight
        drawWidth = drawHeight * imageRatio
        dx = (viewportWidth - drawWidth) / 2
      } else {
        drawWidth = viewportWidth
        drawHeight = drawWidth / imageRatio
        dy = (viewportHeight - drawHeight) / 2
      }

      ctx.clearRect(0, 0, viewportWidth, viewportHeight)
      ctx.drawImage(img, dx, dy, drawWidth, drawHeight)
    }

    const images = urls.map((src, i) => {
      const img = new Image()
      img.decoding = 'async'
      img.src = src
      if (i === 0) {
        img.onload = () => {
          resizeCanvas()
          drawCover(img)
        }
      }
      return img
    })

    const updateImage = () => {
      const frame = Math.round(playhead.frame)
      if (frame === curFrame) return
      const img = images[frame]
      if (!img || !img.complete || !img.naturalWidth) return
      drawCover(img)
      curFrame = frame
      const label = labelRef.current
      if (label) label.textContent = `frame_${pad3(frame + 1)}.png`
      const progress = progressRef.current
      if (progress) progress.style.width = `${((frame + 1) / frameCount) * 100}%`
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const ctxGsap = gsap.context(() => {
      const tween = gsap.to(playhead, {
        frame: images.length - 1,
        ease: 'none',
        onUpdate: updateImage,
        duration: images.length / fps,
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: `+=${scrollDistancePx}`,
          scrub: 1.1,
          pin: '[data-sequence-hero]',
          anticipatePin: 1,
        },
      })

      return () => {
        tween.scrollTrigger?.kill()
        tween.kill()
      }
    }, root)

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      ctxGsap.revert()
    }
  }, [fps, frameCount, scrollDistancePx, urls])

  return (
    <div ref={rootRef} className="relative bg-[#06111c]" style={{ height: `calc(100vh + ${scrollDistancePx}px)` }}>
      <section
        data-sequence-hero
        className="relative h-screen w-full overflow-hidden bg-[radial-gradient(circle_at_20%_20%,rgba(255,101,0,0.16),transparent_28%),radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.08),transparent_26%),linear-gradient(180deg,#091826_0%,#07131f_100%)]"
      >
        <canvas ref={canvasRef} className="absolute inset-0 z-0 h-full w-full" />

        <div className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(90deg,rgba(6,17,28,0.84)_0%,rgba(6,17,28,0.42)_38%,rgba(6,17,28,0.08)_70%,rgba(6,17,28,0.58)_100%)]" />

        <div className="relative z-20 mx-auto flex h-full max-w-7xl flex-col justify-between px-4 pb-8 pt-20 md:px-8 md:pb-10 md:pt-24">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              {showFrameLabel ? (
                <div
                  ref={labelRef}
                  className="inline-flex rounded-full border border-emerald-400/25 bg-emerald-400/15 px-4 py-2 text-xs font-extrabold text-emerald-300 backdrop-blur-md"
                >
                  frame_001.png
                </div>
              ) : (
                <div className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold text-white/75 backdrop-blur-md">
                  Presuply
                </div>
              )}
            </div>

            <div className="inline-flex w-fit rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold text-white/75 backdrop-blur-md">
              Scroll para reproducir
            </div>
          </div>

          <div className="grid grid-cols-1 items-end gap-10 pb-10 md:grid-cols-12 md:pb-16">
            <div className="max-w-2xl md:col-span-6">
              <div className="inline-flex rounded-full border border-orange-400/30 bg-orange-500/10 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.18em] text-orange-300">
                Automatiza tus presupuestos
              </div>
              <h1 className="mt-4 max-w-xl text-balance text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
                {title}
              </h1>
              <p className="mt-4 max-w-lg text-pretty text-sm leading-relaxed text-white/70 sm:text-base">{subtitle}</p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="https://app.presuply.app/pricing" target="_blank" rel="noreferrer">
                  Probar gratis
                </ButtonLink>
                <ButtonLink
                  href="https://app.presuply.app/login"
                  target="_blank"
                  rel="noreferrer"
                  variant="secondary"
                  className="bg-white/10 text-white hover:bg-white/15"
                >
                  Iniciar sesión
                </ButtonLink>
              </div>
            </div>

            <div className="md:col-span-6 md:justify-self-end">
              <div className="w-full max-w-md rounded-[2rem] border border-white/10 bg-white/8 p-5 backdrop-blur-md">
                <div className="flex items-center justify-between text-[11px] font-semibold text-white/65">
                  <span>Secuencia</span>
                  <span>
                    {frameCount} frames · frame_001.png → frame_{pad3(frameCount)}.png
                  </span>
                </div>
                <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-white/10">
                  <div ref={progressRef} className="h-full w-[1.75%] rounded-full bg-orange-500 transition-[width]" />
                </div>
                <div className="mt-4 flex items-center justify-between text-xs text-white/60">
                  <span>Inicio</span>
                  <span>Mitad</span>
                  <span>Final</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-5 z-20 text-center text-xs font-semibold text-white/60">
            Desplaza hacia abajo para continuar
          </div>
        </div>
      </section>
    </div>
  )
}
