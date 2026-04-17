interface GameplayWidgetIconProps {
  size?: number
  className?: string
}

export function GameplayWidgetIcon({ size = 16, className }: GameplayWidgetIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <path
        d="M8 9.5V12.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
      <path
        d="M9.5 11H6.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
      <path
        d="M17 11C17.5523 11 18 10.5523 18 10C18 9.44772 17.5523 9 17 9C16.4477 9 16 9.44772 16 10C16 10.5523 16.4477 11 17 11Z"
        fill="currentColor"
      />
      <path
        d="M15 13C15.5523 13 16 12.5523 16 12C16 11.4477 15.5523 11 15 11C14.4477 11 14 11.4477 14 12C14 12.5523 14.4477 13 15 13Z"
        fill="currentColor"
      />
    </svg>
  )
}
