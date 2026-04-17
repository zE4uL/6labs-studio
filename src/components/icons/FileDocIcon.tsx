/**
 * FileDocIcon — Generic document file type icon.
 * @figmaFile i9fxQ6pXrgRITEzopoXpWL
 */
import type { IconProps } from './types'

export function FileDocIcon({ size = 20, className, 'aria-label': ariaLabel }: IconProps) {
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
      <path fillRule="evenodd" clipRule="evenodd" d="M5 2.5C4.30964 2.5 3.75 3.05964 3.75 3.75V16.25C3.75 16.9404 4.30964 17.5 5 17.5H15C15.6904 17.5 16.25 16.9404 16.25 16.25V7.5L11.25 2.5H5ZM11.25 2.5V6.25C11.25 6.94036 11.8096 7.5 12.5 7.5H16.25M6.875 10.625H13.125M6.875 13.125H10.625" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </svg>
  )
}
