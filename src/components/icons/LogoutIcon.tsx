/**
 * LogoutIcon — Figma export from Apparatus Library.
 * Composed from two Figma vectors (door frame + arrow), scaled 1.5x to 24x24.
 * @figmaNode I2565:50922;12948:3499;12946:1570
 * @figmaFile i9fxQ6pXrgRITEzopoXpWL
 */
import type { IconProps } from './types'

export function LogoutIcon({ size = 24, className, 'aria-label': ariaLabel }: IconProps) {
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
      {/* Door frame — Vector 119, scaled 1.5x, translated to (3.25, 2.25) */}
      <path
        d="M16 3H7C5.34 3 4 4.34 4 6V18C4 19.66 5.34 21 7 21H16"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Arrow pointing right — Vector 105, mirrored + scaled 1.5x */}
      <path
        d="M16 8L20 12L16 16M20 12H10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
