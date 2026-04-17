import type { IconProps } from './types'

export function CalendarIcon({ size = 16, className, 'aria-label': ariaLabel }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label={ariaLabel}
      aria-hidden={!ariaLabel}
    >
      <rect x="2" y="3" width="12" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.25" />
      <path d="M2 7H14" stroke="currentColor" strokeWidth="1.25" />
      <path d="M5 2V4M11 2V4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      <circle cx="5.5" cy="10" r="1" fill="currentColor" opacity="0.6" />
      <circle cx="8" cy="10" r="1" fill="currentColor" opacity="0.6" />
    </svg>
  )
}
