/**
 * VideoLibraryIcon — sidebar nav glyph for the Video Library page.
 * Code-first prototype icon (no Apparatus source yet); swap for a library
 * export once a Figma node exists. Stroke weight matches the 20px nav icons.
 */
import type { IconProps } from './types'

export function VideoLibraryIcon({ size = 20, className, 'aria-label': ariaLabel }: IconProps) {
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
      {/* video frame */}
      <rect
        x="2.5"
        y="4.5"
        width="15"
        height="11"
        rx="2.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      {/* play triangle */}
      <path
        d="M8.5 7.75L12.75 10L8.5 12.25V7.75Z"
        fill="currentColor"
      />
    </svg>
  )
}
