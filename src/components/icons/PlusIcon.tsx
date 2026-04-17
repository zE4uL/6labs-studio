/**
 * PlusIcon — Add/plus action icon.
 * @figmaFile i9fxQ6pXrgRITEzopoXpWL
 */
import type { IconProps } from './types'

export function PlusIcon({ size = 20, className, 'aria-label': ariaLabel }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label={ariaLabel}
      aria-hidden={ariaLabel ? undefined : true}
    >
      <path d="M10 3.54199V16.4587" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/>
      <path d="M3.54199 10H16.458" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/>
    </svg>
  )
}
