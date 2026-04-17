import type { IconProps } from './types'

export function ClockIcon({ size = 16, className, 'aria-label': ariaLabel }: IconProps) {
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
      <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.25" />
      <path d="M8 5V8.5L10 10" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
