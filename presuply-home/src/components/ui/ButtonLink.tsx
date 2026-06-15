import type { AnchorHTMLAttributes } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost'

export function ButtonLink({
  className = '',
  variant = 'primary',
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: Variant }) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition active:translate-y-px focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500'
  const variants: Record<Variant, string> = {
    primary:
      'bg-orange-500 text-white shadow-softer hover:bg-orange-600',
    secondary:
      'border border-border bg-white text-navy-900 shadow-softer hover:bg-bg-light',
    ghost: 'text-navy-900 hover:bg-white/70',
  }

  return <a className={`${base} ${variants[variant]} ${className}`} {...props} />
}

