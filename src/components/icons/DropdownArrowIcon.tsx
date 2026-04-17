/**
 * DropdownArrowIcon — Filled solid triangle pointing down.
 * Used as the R Icon in Apparatus Button dropdowns/selectors.
 *
 * @figmaComponent  Arrow (R Icon)
 * @figmaNode       3203:10555
 * @figmaFile       Nt21OzTRlJKgvSLMoSxTyT
 */
import type { IconProps } from './types'

export function DropdownArrowIcon({ size = 16, className, 'aria-label': ariaLabel }: IconProps) {
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
        d="M4.4 5.5C3.86 5.5 3.59 6.15 3.97 6.57L7.57 10.49C7.81 10.76 8.19 10.76 8.43 10.49L12.03 6.57C12.41 6.15 12.14 5.5 11.6 5.5H4.4Z"
        fill="currentColor"
      />
    </svg>
  )
}
