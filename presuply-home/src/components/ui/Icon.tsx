type IconName =
  | 'bolt'
  | 'note'
  | 'whatsapp'
  | 'price'
  | 'pdf'
  | 'changes'
  | 'upload'
  | 'list'
  | 'doc'
  | 'clock'
  | 'shield'
  | 'spark'
  | 'folder'
  | 'template'
  | 'device'
  | 'check'
  | 'search'
  | 'plus'
  | 'home'
  | 'user'
  | 'dots'
  | 'chevronDown'
  | 'linkedin'
  | 'instagram'
  | 'xSocial'
  | 'mail'
  | 'apple'
  | 'googlePlay'

export function Icon({
  name,
  className = 'h-5 w-5',
}: {
  name: IconName
  className?: string
}) {
  const common = { fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }

  switch (name) {
    case 'bolt':
      return (
        <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
          <path {...common} d="M13 2 3 14h8l-1 8 11-14h-8l0-6Z" />
        </svg>
      )
    case 'note':
      return (
        <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
          <path {...common} d="M7 3h8l2 2v16H7V3Z" />
          <path {...common} d="M9 8h6M9 12h6M9 16h4" />
        </svg>
      )
    case 'whatsapp':
      return (
        <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
          <path {...common} d="M20 11.5A8.5 8.5 0 0 1 6.7 18.7L4 20l1.4-2.6A8.5 8.5 0 1 1 20 11.5Z" />
          <path {...common} d="M9.2 9.4c.2 2.3 2.7 4.8 5 5" />
        </svg>
      )
    case 'price':
      return (
        <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
          <path {...common} d="M6 8h10M6 12h8M6 16h10" />
          <path {...common} d="M4 6h16v14H4V6Z" />
        </svg>
      )
    case 'pdf':
      return (
        <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
          <path {...common} d="M7 3h7l3 3v15H7V3Z" />
          <path {...common} d="M14 3v4h4" />
          <path {...common} d="M9 15h6" />
          <path {...common} d="M9 12h6" />
        </svg>
      )
    case 'changes':
      return (
        <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
          <path {...common} d="M7 7h10l-2-2" />
          <path {...common} d="M17 17H7l2 2" />
          <path {...common} d="M7 7 5 5M17 17l2 2" />
        </svg>
      )
    case 'upload':
      return (
        <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
          <path {...common} d="M12 16V5" />
          <path {...common} d="M8 9l4-4 4 4" />
          <path {...common} d="M4 19h16" />
        </svg>
      )
    case 'list':
      return (
        <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
          <path {...common} d="M8 6h12M8 12h12M8 18h12" />
          <path {...common} d="M4 6h.01M4 12h.01M4 18h.01" />
        </svg>
      )
    case 'doc':
      return (
        <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
          <path {...common} d="M7 3h7l3 3v15H7V3Z" />
          <path {...common} d="M14 3v4h4" />
          <path {...common} d="M9 13h6M9 17h6" />
        </svg>
      )
    case 'clock':
      return (
        <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
          <path {...common} d="M12 8v5l3 2" />
          <path {...common} d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
      )
    case 'shield':
      return (
        <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
          <path {...common} d="M12 3 20 7v6c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V7l8-4Z" />
          <path {...common} d="M9 12l2 2 4-4" />
        </svg>
      )
    case 'spark':
      return (
        <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
          <path {...common} d="M12 2l1.2 4.2L17 8l-3.8 1.8L12 14l-1.2-4.2L7 8l3.8-1.8L12 2Z" />
          <path {...common} d="M19 14l.8 2.8L22 18l-2.2 1.2L19 22l-.8-2.8L16 18l2.2-1.2L19 14Z" />
        </svg>
      )
    case 'folder':
      return (
        <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
          <path {...common} d="M3 7h7l2 2h9v11H3V7Z" />
        </svg>
      )
    case 'template':
      return (
        <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
          <path {...common} d="M4 5h16v14H4V5Z" />
          <path {...common} d="M8 9h8M8 13h5" />
        </svg>
      )
    case 'device':
      return (
        <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
          <path {...common} d="M7 2h10v20H7V2Z" />
          <path {...common} d="M11 18h2" />
        </svg>
      )
    case 'check':
      return (
        <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
          <path {...common} d="M20 6 9 17l-5-5" />
        </svg>
      )
    case 'search':
      return (
        <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
          <path {...common} d="M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16Z" />
          <path {...common} d="M21 21l-4.3-4.3" />
        </svg>
      )
    case 'plus':
      return (
        <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
          <path {...common} d="M12 5v14M5 12h14" />
        </svg>
      )
    case 'home':
      return (
        <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
          <path {...common} d="M3 11 12 3l9 8" />
          <path {...common} d="M5 10v11h14V10" />
        </svg>
      )
    case 'user':
      return (
        <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
          <path {...common} d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Z" />
          <path {...common} d="M4 21a8 8 0 0 1 16 0" />
        </svg>
      )
    case 'dots':
      return (
        <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
          <path {...common} d="M12 6h.01M12 12h.01M12 18h.01" />
        </svg>
      )
    case 'chevronDown':
      return (
        <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
          <path {...common} d="m6 9 6 6 6-6" />
        </svg>
      )
    case 'linkedin':
      return (
        <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
          <path {...common} d="M8 10v8M12 18v-5a3 3 0 0 1 6 0v5" />
          <path {...common} d="M8 6h.01" />
          <path {...common} d="M4 3h16v18H4V3Z" />
        </svg>
      )
    case 'instagram':
      return (
        <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
          <rect {...common} x="3" y="3" width="18" height="18" rx="5" />
          <circle {...common} cx="12" cy="12" r="4" />
          <path {...common} d="M17.5 6.5h.01" />
        </svg>
      )
    case 'xSocial':
      return (
        <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
          <path {...common} d="M5 4l14 16M19 4 5 20" />
        </svg>
      )
    case 'mail':
      return (
        <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
          <path {...common} d="M4 6h16v12H4V6Z" />
          <path {...common} d="m4 8 8 6 8-6" />
        </svg>
      )
    case 'apple':
      return (
        <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="currentColor"
            d="M16.9 13.2c0 2.6 2.3 3.4 2.3 3.4s-1.7 4.9-4 4.9c-1 0-1.8-.6-2.9-.6s-2 .6-3.2.6c-2.1 0-4.9-4.6-4.9-8.3 0-3 1.9-4.6 3.8-4.6 1.1 0 2 .7 2.9.7 1 0 2-.7 3.3-.7.5 0 2.5.1 3.6 2-2.9 1.6-2.9 5.6-.9 6.6ZM14.7 3.2c.8-1 2-1.7 3.1-1.7.1 1.2-.4 2.4-1.2 3.3-.8.9-2 1.6-3.1 1.5-.1-1.2.4-2.3 1.2-3.1Z"
          />
        </svg>
      )
    case 'googlePlay':
      return (
        <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
          <path fill="currentColor" d="M4 3.8v16.4c0 .8.9 1.3 1.6.8l11.1-8.2a1 1 0 0 0 0-1.6L5.6 3c-.7-.5-1.6 0-1.6.8Z" />
          <path fill="currentColor" d="M15.2 12 5 4.5v15L15.2 12Z" opacity=".35" />
        </svg>
      )
    default:
      return null
  }
}
