import { useState } from 'react'

/**
 * Returns true if the viewport is ≥768px at mount time.
 * Uses a synchronous initializer to avoid flicker — the value never changes
 * after mount, which is intentional: hero choice is stable per page load.
 */
export function useIsDesktop(): boolean {
  const [isDesktop] = useState<boolean>(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(min-width: 768px)').matches
      : true,
  )
  return isDesktop
}
