import { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { ScrollTrigger } from './lib/gsap'
import { HomePage } from './pages/HomePage'

function App() {
  useEffect(() => {
    const scriptId = 'tawk-chat-script'
    if (document.getElementById(scriptId)) return

    const w = window as typeof window & {
      Tawk_API?: Record<string, unknown>
      Tawk_LoadStart?: Date
    }

    w.Tawk_API = w.Tawk_API || {}
    w.Tawk_LoadStart = new Date()

    const script = document.createElement('script')
    script.id = scriptId
    script.async = true
    script.src = 'https://embed.tawk.to/6a2fdd210257f31d47303981/1jr5ffiou'
    script.charset = 'UTF-8'
    script.setAttribute('crossorigin', '*')
    document.body.appendChild(script)
  }, [])

  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh()
    const delayedRefresh = () => {
      requestAnimationFrame(refresh)
      window.setTimeout(refresh, 250)
      window.setTimeout(refresh, 800)
    }

    delayedRefresh()
    window.addEventListener('load', delayedRefresh)
    window.addEventListener('pageshow', delayedRefresh)
    window.addEventListener('orientationchange', delayedRefresh)
    window.visualViewport?.addEventListener('resize', delayedRefresh)

    return () => {
      window.removeEventListener('load', delayedRefresh)
      window.removeEventListener('pageshow', delayedRefresh)
      window.removeEventListener('orientationchange', delayedRefresh)
      window.visualViewport?.removeEventListener('resize', delayedRefresh)
    }
  }, [])

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
