/**
 * EventDot — Colored circle on the video seekbar representing an event.
 * Figma component set 34:5290 — 7 types (Tap, Technical, Warning, Monetization,
 * Frustration, Progression, Combat) × 2 states (Default, Hover).
 * Default: filled circle with category color at 80% opacity.
 * Hover: shows tooltip with event details.
 *
 * @figmaComponent  Event dot
 * @figmaNode       34:5290
 * @figmaFile       i9fxQ6pXrgRITEzopoXpWL
 * @figmaUrl        https://www.figma.com/design/i9fxQ6pXrgRITEzopoXpWL/6labs?node-id=34-5290
 */

import { useState } from 'react'

/** Category colors extracted from Figma event dot component set */
export const EVENT_DOT_COLORS: Record<string, string> = {
  'Tap':           '#67C3BB',
  'Technical':     '#F33621',
  'Warning':       '#FFC32A',
  'Monetization':  '#398B4D',
  'Frustation':    '#FF6200',
  'Progression':   '#0397EB',
  'Combat':        '#7B4CFF',
}

interface EventDotProps {
  /** Event category — determines color */
  category: string
  /** Position on seekbar as percentage (0–100) */
  position: number
  /** Tooltip label shown on hover */
  label?: string
  /** Timestamp string shown in tooltip */
  timestamp?: string
  onClick?: () => void
  className?: string
}

export function EventDot({
  category,
  position,
  label,
  timestamp,
  onClick,
  className,
}: EventDotProps) {
  const [hovered, setHovered] = useState(false)
  const color = EVENT_DOT_COLORS[category] ?? '#686E81'
  const size = hovered ? 20 : 16

  return (
    <div
      className={['absolute top-1/2 -translate-y-1/2 cursor-pointer z-[2]', className].filter(Boolean).join(' ')}
      style={{ left: `${position}%`, marginLeft: -size / 2 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      <svg width={size} height={size} viewBox="0 0 16 16" fill="none">
        <circle cx="8" cy="8" r="6" fill={color} fillOpacity="0.8" />
      </svg>

      {/* Hover tooltip */}
      {hovered && label && (
        <div
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-xs px-s py-xxs rounded-m whitespace-nowrap z-10"
          style={{
            backgroundColor: 'var(--bg-elements)',
            border: '1px solid var(--border-subtle)',
            boxShadow: 'var(--shadow-normal)',
          }}
        >
          <p className="font-display text-2xs font-semibold" style={{ color }}>{label}</p>
          {timestamp && (
            <p className="font-body text-2xs text-text-tertiary">{timestamp}</p>
          )}
        </div>
      )}
    </div>
  )
}
