/**
 * EventTimelineItem — Single event row in the session event timeline.
 * Figma: Events Light component — 24px event icon + flex-col (pill+timestamp row, description) + chevron arrow.
 * Layout: flex, gap-[10px], p-[12px], full width.
 * Event icons are game-specific (from Event Icons - FF set) and passed as a render prop.
 *
 * @figmaComponent  Events Light
 * @figmaNode       105:12509
 * @figmaFile       i9fxQ6pXrgRITEzopoXpWL
 * @figmaUrl        https://www.figma.com/design/i9fxQ6pXrgRITEzopoXpWL/6labs?node-id=105-12509
 */

import type { ReactNode } from 'react'
import { EventPill } from '../atoms/EventPill'

/** Map event type strings to pill categories */
const TYPE_TO_CATEGORY: Record<string, string> = {
  'kill': 'Combat',
  'death': 'Combat',
  'winner': 'Progression',
  'loading-error': 'Technical',
  'customization': 'Tap',
  'match-start': 'Progression',
  'loot': 'Monetization',
  'combat': 'Combat',
  'match-ended': 'Progression',
  'vehicle': 'Tap',
  'air-drop': 'Progression',
  'purchased': 'Monetization',
  'shop-open': 'Monetization',
  'frustration': 'Frustation',
  'quit': 'Frustation',
  'achievement': 'Progression',
  'generic': 'Tap',
  'error': 'Technical',
}

/** Human-readable labels for event types */
const TYPE_LABELS: Record<string, string> = {
  'kill': 'Kill',
  'death': 'Death',
  'winner': 'Winner',
  'loading-error': 'Loading Error',
  'customization': 'Customization',
  'match-start': 'Match Start',
  'loot': 'Loot',
  'combat': 'Combat',
  'vehicle': 'Vehicle',
  'air-drop': 'Air Drop',
  'purchased': 'Purchased',
  'shop-open': 'Shop Open',
  'frustration': 'Frustration',
  'quit': 'Quit',
  'achievement': 'Achievement',
  'error': 'Error',
}

interface EventTimelineItemProps {
  /** Event type string */
  type: string
  /** Timestamp display string */
  timestamp: string
  /** Description text */
  description: string
  /** Game-specific icon — rendered as 24px element. Passed by parent so icons can change per game. */
  icon?: ReactNode
  /** Show right chevron arrow */
  showChevron?: boolean
  /** Whether this event is currently selected (seeked to) */
  selected?: boolean
  /** Called when item is clicked — should seek video to this event */
  onClick?: () => void
  className?: string
}

export function EventTimelineItem({
  type,
  timestamp,
  description,
  icon,
  showChevron = false,
  selected = false,
  onClick,
  className,
}: EventTimelineItemProps) {
  const category = TYPE_TO_CATEGORY[type] ?? 'Combat'
  const label = TYPE_LABELS[type] ?? type.charAt(0).toUpperCase() + type.slice(1).replace(/-/g, ' ')

  return (
    <div
      className={[
        'flex items-start gap-[10px] p-s cursor-pointer timeline-item-hover',
        selected ? 'timeline-item-selected' : '',
        className,
      ].filter(Boolean).join(' ')}
      onClick={onClick}
      role="button"
      tabIndex={0}
    >
      {/* Left: 24px game-specific event icon */}
      {icon && (
        <div className="shrink-0 w-[24px] h-[24px]">
          {icon}
        </div>
      )}

      {/* Center: pill + timestamp row, then description */}
      <div className="flex-1 min-w-0 flex flex-col gap-[10px]">
        {/* Top row: pill + timestamp + chevron */}
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-[14px]">
            <EventPill category={category} label={label} />
            <span className="font-body text-xs leading-[1.5]" style={{ color: '#686E81' }}>
              {timestamp}
            </span>
          </div>
          {/* Chevron arrow — from Figma Arrows component */}
          {showChevron && (
            <div className="shrink-0" style={{ color: '#4F566C' }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M5.64645 12.3536C5.45118 12.1583 5.45118 11.8417 5.64645 11.6464L9.29289 8L5.64645 4.35355C5.45118 4.15829 5.45118 3.84171 5.64645 3.64645C5.84171 3.45118 6.15829 3.45118 6.35355 3.64645L10.3536 7.64645C10.5488 7.84171 10.5488 8.15829 10.3536 8.35355L6.35355 12.3536C6.15829 12.5488 5.84171 12.5488 5.64645 12.3536Z" fill="currentColor" />
              </svg>
            </div>
          )}
        </div>
        {/* Description */}
        <p className="font-body text-xs leading-[1.5]" style={{ color: '#353D57' }}>
          {description}
        </p>
      </div>
    </div>
  )
}
