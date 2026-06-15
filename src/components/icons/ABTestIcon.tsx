/**
 * ABTestIcon — Two variants side-by-side (split square) for the A/B Testing Agent.
 * Prototype icon: replace with an Apparatus-sourced icon before any Figma handoff.
 */
import type { IconProps } from './types'

export function ABTestIcon({ size = 20, className, 'aria-label': ariaLabel }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label={ariaLabel}
      aria-hidden={!ariaLabel}
    >
      <rect x="3.5" y="4.5" width="17" height="15" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M12 4.5V19.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M6.5 9.5H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M15 14.5H17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="7.75" cy="14.25" r="1" fill="currentColor" />
      <circle cx="16.25" cy="9.75" r="1" fill="currentColor" />
    </svg>
  )
}
