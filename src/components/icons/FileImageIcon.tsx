/**
 * FileImageIcon — File type icon for image uploads.
 * @figmaFile i9fxQ6pXrgRITEzopoXpWL
 */
import type { IconProps } from './types'

export function FileImageIcon({ size = 20, className, 'aria-label': ariaLabel }: IconProps) {
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
      <path fillRule="evenodd" clipRule="evenodd" d="M4.16602 2.91699C3.47566 2.91699 2.91602 3.47664 2.91602 4.16699V15.8337C2.91602 16.524 3.47566 17.0837 4.16602 17.0837H15.8327C16.523 17.0837 17.0827 16.524 17.0827 15.8337V4.16699C17.0827 3.47664 16.523 2.91699 15.8327 2.91699H4.16602ZM4.16602 4.16699H15.8327V11.8462L13.3873 9.4008C13.1432 9.15673 12.7476 9.15673 12.5035 9.4008L9.16602 12.7383L7.72059 11.2929C7.47652 11.0488 7.08087 11.0488 6.83679 11.2929L4.16602 13.9637V4.16699ZM7.49935 8.33366C8.18971 8.33366 8.74935 7.77401 8.74935 7.08366C8.74935 6.3933 8.18971 5.83366 7.49935 5.83366C6.809 5.83366 6.24935 6.3933 6.24935 7.08366C6.24935 7.77401 6.809 8.33366 7.49935 8.33366Z" fill="currentColor"/>
    </svg>
  )
}
