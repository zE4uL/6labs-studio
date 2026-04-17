interface SessionInfoIconProps {
  size?: number
  className?: string
}

export function SessionInfoIcon({ size = 16, className }: SessionInfoIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.1 9.10001V13.9H3.9V9.10001H2.1ZM2 8.00001C1.44772 8.00001 1 8.44772 1 9.00001V14C1 14.5523 1.44772 15 2 15H4C4.55228 15 5 14.5523 5 14V9.00001C5 8.44772 4.55228 8.00001 4 8.00001H2Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.1 11.1V13.9H8.9V11.1H7.1ZM7 10C6.44772 10 6 10.4477 6 11V14C6 14.5523 6.44772 15 7 15H9C9.55228 15 10 14.5523 10 14V11C10 10.4477 9.55228 10 9 10H7Z"
        fill="currentColor"
      />
    </svg>
  )
}
