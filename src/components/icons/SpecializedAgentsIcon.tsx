/**
 * SpecializedAgentsIcon — 2×2 grid of agent tiles with a spark, for the Specialized Agents hub.
 * Prototype icon: replace with an Apparatus-sourced icon before any Figma handoff.
 */
import type { IconProps } from './types'

export function SpecializedAgentsIcon({ size = 20, className, 'aria-label': ariaLabel }: IconProps) {
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
      <rect x="3.5" y="3.5" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <rect x="13.5" y="13.5" width="7" height="7" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M17 3L17.9 5.6L20.5 6.5L17.9 7.4L17 10L16.1 7.4L13.5 6.5L16.1 5.6L17 3Z"
        fill="currentColor"
      />
    </svg>
  )
}
