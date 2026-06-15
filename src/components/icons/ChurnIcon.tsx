/**
 * ChurnIcon — Declining retention line with a drop-off arrow for the Churn Agent.
 * Prototype icon: replace with an Apparatus-sourced icon before any Figma handoff.
 */
import type { IconProps } from './types'

export function ChurnIcon({ size = 20, className, 'aria-label': ariaLabel }: IconProps) {
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
      <path d="M4 4V18.5C4 19.6 4.9 20.5 6 20.5H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M7.5 9L11 12L14 10L20 16.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20 16.5H16.25M20 16.5V12.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
