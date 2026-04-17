import type { IconProps } from './types'

/**
 * CopyIcon — copy-to-clipboard action icon from Apparatus.
 * Extracted from Figma node I6470:1506026;2441:49183 (AI response action bar).
 */
export function CopyIcon({ size = 16, className, 'aria-label': ariaLabel }: IconProps) {
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
      <path
        d="M10.667 1.333H3.333C2.6 1.333 2 1.933 2 2.667v9.333h1.333V2.667h7.334V1.333zm2 2.667H6c-.733 0-1.333.6-1.333 1.333v9.334C4.667 15.4 5.267 16 6 16h6.667c.733 0 1.333-.6 1.333-1.333V5.333c0-.733-.6-1.333-1.333-1.333zm0 10.667H6V5.333h6.667v9.334z"
        fill="currentColor"
      />
    </svg>
  )
}
