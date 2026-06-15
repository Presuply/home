import { useLayoutEffect, useMemo, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from '../lib/gsap'

function pad3(n: number) {
  return String(n).padStart(3, '0')
}

export function ImageSequencePage() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const labelRef = useRef<HTMLDivElement | null>(null)

  const config = useMemo(() => {
    const durationSeconds = 5
    const fps = 30
    const frameCount = Math.round(durationSeconds * fps)
    return { durationSeconds, fps, frameCount }
  }, [])

  const scrollDistancePx = useMemo(() => {
    const pxPerFrame = 140
    return Math.max(6000, config.frameCount * pxPerFrame)
  }, [config.frameCount])

  const urls = useMemo(() => {
    return Array.from({ length: config.frameCount }, (_, i) => {
      const index = i + 1
      return `/image-sequence/frames/frame_${pad3(index)}.png`
    })
  }, [config.frameCount])

  useLayoutEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const playhead = { frame: 0 }
    let curFrame = -1

    const images = urls.map((src, i) => {
      const img = new Image()
      img.decoding = 'async'
      img.src = src
      if (i === 0) {
        img.onload = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height)
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        }
      }
      return img
    })

    const updateImage = () => {
      const frame = Math.round(playhead.frame)
      if (frame === curFrame) return
      const img = images[frame]
      if (!img || !img.complete || !img.naturalWidth) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      curFrame = frame
      const label = labelRef.current
      if (label) label.textContent = `frame_${pad3(frame + 1)}.png`
    }

    const tween = gsap.to(playhead, {
      frame: images.length - 1,
      ease: 'none',
      onUpdate: updateImage,
      duration: images.length / config.fps,
      scrollTrigger: {
        start: 0,
        end: `+=${scrollDistancePx}`,
        scrub: 1.2,
      },
    })

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [config.fps, scrollDistancePx, urls])

  return (
    <div className="bg-black" style={{ height: `calc(100vh + ${scrollDistancePx}px)` }}>
      <Link
        to="/"
        className="fixed left-4 top-4 z-50 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-extrabold text-white/80 backdrop-blur-md"
      >
        ← Volver
      </Link>

      <div className="fixed right-4 top-4 z-50 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold text-white/70 backdrop-blur-md">
        {config.frameCount} frames · {config.durationSeconds}s · {config.fps}fps ·{' '}
        frame_001.png → frame_{pad3(config.frameCount)}.png
      </div>

      <div
        ref={labelRef}
        className="fixed left-1/2 top-4 z-50 -translate-x-1/2 rounded-full border border-emerald-500/25 bg-emerald-500/15 px-4 py-2 text-xs font-extrabold text-emerald-400 backdrop-blur-md"
      >
        frame_001.png
      </div>

      <canvas
        id="image-sequence"
        ref={canvasRef}
        width={1158}
        height={770}
        className="fixed left-1/2 top-1/2 z-10 max-h-[80vh] max-w-[80vw] -translate-x-1/2 -translate-y-1/2"
      />

      <div className="pointer-events-none fixed inset-x-0 bottom-8 z-50 text-center text-xs font-semibold text-white/60">
        Scroll hacia abajo para reproducir los frames
      </div>
    </div>
  )
}
