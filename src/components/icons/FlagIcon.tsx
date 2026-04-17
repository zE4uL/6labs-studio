/**
 * FlagIcon — Inline SVG flag icons for supported languages.
 * Replaces emoji flags which don't render on Windows (show "GB" / "JP" text instead).
 */

interface FlagIconProps {
  code: string
  size?: number
  className?: string
}

function GBFlag({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
      <rect width="36" height="36" rx="4" fill="#00247D" />
      <path d="M0 0L36 36M36 0L0 36" stroke="white" strokeWidth="6" />
      <path d="M0 0L36 36M36 0L0 36" stroke="#CF142B" strokeWidth="2" />
      <path d="M18 0V36M0 18H36" stroke="white" strokeWidth="10" />
      <path d="M18 0V36M0 18H36" stroke="#CF142B" strokeWidth="6" />
    </svg>
  )
}

function JPFlag({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
      <rect width="36" height="36" rx="4" fill="white" />
      <circle cx="18" cy="18" r="9" fill="#BC002D" />
    </svg>
  )
}

function KRFlag({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
      <rect width="36" height="36" rx="4" fill="white" />
      <circle cx="18" cy="18" r="8" fill="#CD2E3A" />
      <path d="M18 10C22.4183 10 26 13.5817 26 18" stroke="#0047A0" strokeWidth="8" fill="none" />
      <circle cx="18" cy="14" r="4" fill="#0047A0" />
      <circle cx="18" cy="22" r="4" fill="#CD2E3A" />
    </svg>
  )
}

function CNFlag({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
      <rect width="36" height="36" rx="4" fill="#DE2910" />
      <polygon points="10,6 11.5,10.5 16,10.5 12.25,13.5 13.75,18 10,15 6.25,18 7.75,13.5 4,10.5 8.5,10.5" fill="#FFDE00" />
      <polygon points="20,4 20.75,6.25 23,6.25 21.125,7.75 21.875,10 20,8.5 18.125,10 18.875,7.75 17,6.25 19.25,6.25" fill="#FFDE00" />
      <polygon points="24,7 24.5,8.5 26,8.5 24.75,9.5 25.25,11 24,10 22.75,11 23.25,9.5 22,8.5 23.5,8.5" fill="#FFDE00" />
      <polygon points="24,12 24.5,13.5 26,13.5 24.75,14.5 25.25,16 24,15 22.75,16 23.25,14.5 22,13.5 23.5,13.5" fill="#FFDE00" />
      <polygon points="20,15 20.75,17.25 23,17.25 21.125,18.75 21.875,21 20,19.5 18.125,21 18.875,18.75 17,17.25 19.25,17.25" fill="#FFDE00" />
    </svg>
  )
}

const FLAG_COMPONENTS: Record<string, React.FC<{ size: number }>> = {
  EN: GBFlag,
  JP: JPFlag,
  KR: KRFlag,
  CN: CNFlag,
}

export function FlagIcon({ code, size = 14, className }: FlagIconProps) {
  const FlagComponent = FLAG_COMPONENTS[code]
  if (!FlagComponent) return null
  return (
    <span className={`inline-flex items-center justify-center shrink-0 ${className ?? ''}`} style={{ width: size, height: size }}>
      <FlagComponent size={size} />
    </span>
  )
}
