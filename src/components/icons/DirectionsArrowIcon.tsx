/**
 * DirectionsArrowIcon — Horizontal right-pointing arrow.
 * Use with `-rotate-90` class for upward send/submit actions.
 *
 * @figmaComponent  Directions Arrow
 * @figmaNode       15185:313
 * @figmaFile       i9fxQ6pXrgRITEzopoXpWL
 */
import type { IconProps } from './types'

export function DirectionsArrowIcon({ size = 20, className, 'aria-label': ariaLabel }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label={ariaLabel}
      aria-hidden={!ariaLabel}
    >
      <path
        d="M2.5 10H17.5M17.5 10L12.5 4.5M17.5 10L12.5 15.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
