/**
 * VideoLibraryIcon — video folder glyph for the Library page (sidebar nav +
 * page header). Source: user-supplied "Video Folder.svg"; colors mapped to
 * currentColor so the icon inherits nav/header context states.
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
      {/* folder with tab */}
      <path
        d="M3.25 3H7.75C8.22207 3 8.66691 3.222 8.9502 3.59961L9.625 4.5C10.0971 5.12951 10.8381 5.5 11.625 5.5H16.75C17.5784 5.5 18.25 6.17157 18.25 7V15.5C18.25 16.3284 17.5784 17 16.75 17H3.25C2.42157 17 1.75 16.3284 1.75 15.5V4.5L1.75781 4.34668C1.83461 3.59028 2.47334 3 3.25 3Z"
        stroke="currentColor"
      />
      {/* play triangle */}
      <path
        d="M5.45435 8.39761C5.25439 8.27763 5 8.42167 5 8.65486V13.8451C5 14.0783 5.25439 14.2224 5.45435 14.1024L9.77959 11.5072C9.97379 11.3907 9.97379 11.1093 9.77959 10.9928L5.45435 8.39761Z"
        fill="currentColor"
      />
    </svg>
  )
}
