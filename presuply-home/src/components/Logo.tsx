type Variant = 'responsive' | 'large' | 'compact'

export function Logo({
  variant = 'responsive',
  className = '',
}: {
  variant?: Variant
  className?: string
}) {
  if (variant === 'large') {
    return (
      <img
        src="/presuply_logo_grande.svg"
        alt="Presuply"
        className={`h-8 w-auto ${className}`}
        decoding="async"
      />
    )
  }

  if (variant === 'compact') {
    return (
      <img
        src="/presuply_logo_compacto.svg"
        alt="Presuply"
        className={`h-8 w-auto ${className}`}
        decoding="async"
      />
    )
  }

  return (
    <div className={`flex items-center ${className}`}>
      <img
        src="/presuply_logo_pequeño.svg"
        alt="Presuply"
        className="h-10 w-auto sm:hidden"
        decoding="async"
      />
      <img
        src="/presuply_logo_grande.svg"
        alt="Presuply"
        className="hidden h-8 w-auto sm:block"
        decoding="async"
      />
    </div>
  )
}
