interface InfoFilledIconProps {
  size?: number
  className?: string
}

export function InfoFilledIcon({ size = 16, className }: InfoFilledIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      className={className}
    >
      <path
        d="M8 6.69783C7.65481 6.69783 7.375 6.97764 7.375 7.32283V11.3476C7.375 11.6928 7.65481 11.9726 8 11.9726C8.34519 11.9726 8.625 11.6928 8.625 11.3476V7.32283C8.625 6.97764 8.34519 6.69783 8 6.69783Z"
        fill="currentColor"
      />
      <path
        d="M8.84375 5.08871C8.84375 5.5547 8.46599 5.93246 8 5.93246C7.53401 5.93246 7.15625 5.5547 7.15625 5.08871C7.15625 4.62272 7.53401 4.24496 8 4.24496C8.46599 4.24496 8.84375 4.62272 8.84375 5.08871Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 0C3.57803 0 0 3.57834 0 8C0 12.422 3.57834 16 8 16C12.422 16 16 12.4217 16 8C16 3.57803 12.4216 0 8 0ZM8 14.75C4.26897 14.75 1.25 11.7308 1.25 8C1.25 4.26897 4.26922 1.25 8 1.25C11.731 1.25 14.75 4.26922 14.75 8C14.75 11.731 11.7308 14.75 8 14.75Z"
        fill="currentColor"
      />
    </svg>
  )
}
