interface UserProfileStatIconProps {
  size?: number
  className?: string
}

export function UserProfileStatIcon({ size = 16, className }: UserProfileStatIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      className={className}
    >
      <circle cx="32" cy="32" r="28.8333" stroke="currentColor" />
      <path
        d="M12.9131 52.7044C16.415 48.3338 23.6468 45.3333 31.9999 45.3333C40.3201 45.3333 47.5279 48.3102 51.0452 52.6529"
        stroke="currentColor"
        strokeLinecap="round"
      />
      <circle cx="32" cy="26.6667" r="12.8333" stroke="currentColor" />
      <path
        d="M47.9999 58.6667C53.891 58.6667 58.6666 53.891 58.6666 48C58.6666 42.109 53.891 37.3333 47.9999 37.3333C42.1089 37.3333 37.3333 42.109 37.3333 48C37.3333 53.891 42.1089 58.6667 47.9999 58.6667Z"
        fill="currentColor"
        stroke="white"
      />
    </svg>
  )
}
