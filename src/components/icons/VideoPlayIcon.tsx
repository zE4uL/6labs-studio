interface VideoPlayIconProps {
  size?: number
  className?: string
}

export function VideoPlayIcon({ size = 16, className }: VideoPlayIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      className={className}
    >
      <path
        d="M12.9165 7.56671C13.2498 7.75916 13.2498 8.24046 12.9165 8.43292L5.9165 12.4749C5.5832 12.6671 5.1665 12.4261 5.1665 12.0413L5.1665 3.95831C5.16666 3.57354 5.58323 3.33328 5.9165 3.5257L12.9165 7.56671Z"
        fill="currentColor"
        stroke="currentColor"
      />
    </svg>
  )
}
