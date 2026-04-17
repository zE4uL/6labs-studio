interface LocationIconProps {
  size?: number
  className?: string
}

export function LocationIcon({ size = 16, className }: LocationIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      className={className}
    >
      <path
        d="M8 1C10.2091 1 12 2.9192 12 5.28613C11.9995 7.65315 8.00044 12.9994 8 13C7.99935 12.9991 4.00047 7.65309 4 5.28613C4 2.9192 5.79086 1 8 1ZM8 3.57129C7.11634 3.57129 6.40039 4.33936 6.40039 5.28613C6.40063 6.23269 7.11649 7 8 7C8.8835 6.99999 9.59937 6.23268 9.59961 5.28613C9.59961 4.33936 8.88365 3.5713 8 3.57129Z"
        fill="currentColor"
      />
      <ellipse cx="8.00354" cy="14" rx="3.5" ry="1" fill="currentColor" />
    </svg>
  )
}
