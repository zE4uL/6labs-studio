/**
 * YoutubeIcon — standard YouTube brand mark (red rounded rect + white play),
 * for the "Youtube" source option in the console sources popup.
 */
import type { IconProps } from './types'

export function YoutubeIcon({ size = 20, className, 'aria-label': ariaLabel }: IconProps) {
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
      <rect x="1.25" y="4.375" width="17.5" height="11.25" rx="2.8" fill="#FF0000" />
      <path d="M8.4375 7.5L13.125 10L8.4375 12.5V7.5Z" fill="white" />
    </svg>
  )
}
