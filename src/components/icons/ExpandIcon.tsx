import type { IconProps } from './types'

export function ExpandIcon({ size = 24, className, 'aria-label': ariaLabel }: IconProps) {
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
      {/* Sidebar expand — panel with inward chevron (matches Figma node 4072:62255) */}
      <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9 3V21" stroke="currentColor" strokeWidth="1.5" />
      <path d="M13 9L15 12L13 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
