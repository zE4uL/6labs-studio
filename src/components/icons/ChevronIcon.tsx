import type { IconProps } from './types'

type Direction = 'up' | 'down' | 'left' | 'right'

interface ChevronIconProps extends IconProps {
  direction?: Direction
}

const rotations: Record<Direction, string> = {
  right: 'rotate-0',
  down: 'rotate-90',
  left: 'rotate-180',
  up: '-rotate-90',
}

export function ChevronIcon({
  size = 16,
  className,
  direction = 'right',
  'aria-label': ariaLabel,
}: ChevronIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={[rotations[direction], className].filter(Boolean).join(' ')}
      aria-label={ariaLabel}
      aria-hidden={!ariaLabel}
    >
      <path
        d="M6 4L10 8L6 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
