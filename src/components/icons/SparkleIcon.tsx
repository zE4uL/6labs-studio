interface SparkleIconProps {
  size?: number
  className?: string
}

export function SparkleIcon({ size = 16, className }: SparkleIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      className={className}
    >
      <path
        d="M8 1L9.79 5.52L14.5 6.23L11.13 9.41L11.94 14.09L8 11.97L4.06 14.09L4.87 9.41L1.5 6.23L6.21 5.52L8 1Z"
        fill="currentColor"
      />
    </svg>
  )
}
