interface ClockStatIconProps {
  size?: number
  className?: string
}

export function ClockStatIcon({ size = 16, className }: ClockStatIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      className={className}
    >
      <path
        d="M8 1.5C11.5899 1.5 14.5 4.41015 14.5 8C14.5 11.5899 11.5899 14.5 8 14.5C4.41015 14.5 1.5 11.5899 1.5 8C1.5 4.41015 4.41015 1.5 8 1.5Z"
        stroke="currentColor"
      />
      <path
        d="M7.5 4V8C7.5 8.27614 7.72386 8.5 8 8.5H11"
        stroke="currentColor"
        strokeLinecap="round"
      />
    </svg>
  )
}
