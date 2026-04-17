interface PlayIconProps {
  size?: number
  className?: string
}

export function PlayIcon({ size = 24, className }: PlayIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <path
        d="M6 4.83v14.34c0 .79.87 1.27 1.54.84l11.38-7.17a1 1 0 000-1.68L7.54 3.99A1 1 0 006 4.83z"
        fill="currentColor"
      />
    </svg>
  )
}
