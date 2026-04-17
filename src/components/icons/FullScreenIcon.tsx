interface FullScreenIconProps {
  size?: number
  className?: string
}

export function FullScreenIcon({ size = 16, className }: FullScreenIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <path
        d="M8.50003 2.5H4.50003C3.94647 2.52596 3.42561 2.76968 3.05098 3.17803C2.67635 3.58638 2.47831 4.12626 2.50003 4.68V8.5"
        stroke="currentColor"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
      <path
        d="M15.5 21.5H19.5C20.0536 21.474 20.5744 21.2303 20.949 20.822C21.3237 20.4136 21.5217 19.8737 21.5 19.32V15.5"
        stroke="currentColor"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
      <path
        d="M2.5 15.5V19.5C2.52596 20.0536 2.76968 20.5744 3.17803 20.949C3.58638 21.3237 4.12626 21.5217 4.68 21.5H8.5"
        stroke="currentColor"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
      <path
        d="M21.5 8.5V4.5C21.474 3.94647 21.2303 3.42561 20.822 3.05098C20.4136 2.67635 19.8737 2.47831 19.32 2.5H15.5"
        stroke="currentColor"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
    </svg>
  )
}
