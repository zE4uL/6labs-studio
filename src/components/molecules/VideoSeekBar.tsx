/**
 * VideoSeekBar — Seek bar with track, progress highlight, and interactive event dots.
 * Figma: h=8px, track=rgba(0,0,0,0.1) rounded-[16px], highlight=brand rounded-[14px],
 * event dots positioned at timestamp percentages.
 *
 * @figmaComponent  Seek Bar
 * @figmaNode       105:12414
 * @figmaFile       i9fxQ6pXrgRITEzopoXpWL
 * @figmaUrl        https://www.figma.com/design/i9fxQ6pXrgRITEzopoXpWL/6labs?node-id=105-12414
 */

import { EventDot } from '../atoms/EventDot'
import type { SessionEvent } from '../../lib/types/radiologist'

interface VideoSeekBarProps {
  /** Current playback position as percentage (0–100) */
  progress: number
  /** Total duration in seconds — used to position event dots */
  totalDuration: number
  /** Events to show as dots on the seekbar */
  events: SessionEvent[]
  /** Called when user clicks on the seekbar */
  onSeek?: (percent: number) => void
  /** Called when user clicks an event dot */
  onEventClick?: (event: SessionEvent) => void
  className?: string
}

/** Convert timestamp string "M:SS" to seconds */
function parseTimestamp(ts: string): number {
  const parts = ts.split(':').map(Number)
  if (parts.length === 2) return parts[0] * 60 + parts[1]
  return parts[0]
}

/** Map event type to pill category */
const TYPE_TO_CATEGORY: Record<string, string> = {
  'kill': 'Combat',
  'death': 'Combat',
  'winner': 'Progression',
  'loading-error': 'Technical',
  'customization': 'Tap',
  'match-start': 'Progression',
  'loot': 'Monetization',
}

export function VideoSeekBar({
  progress,
  totalDuration,
  events,
  onSeek,
  onEventClick,
  className,
}: VideoSeekBarProps) {
  const handleBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const percent = ((e.clientX - rect.left) / rect.width) * 100
    onSeek?.(Math.max(0, Math.min(100, percent)))
  }

  return (
    <div
      className={['relative h-[8px] w-full cursor-pointer', className].filter(Boolean).join(' ')}
      onClick={handleBarClick}
    >
      {/* Track background */}
      <div
        className="absolute inset-0 rounded-[16px]"
        style={{ backgroundColor: 'rgba(0,0,0,0.1)' }}
      />

      {/* Progress highlight */}
      <div
        className="absolute top-0 bottom-0 left-0 rounded-[14px]"
        style={{
          width: `${progress}%`,
          backgroundColor: 'var(--brand)',
        }}
      />

      {/* Event dots */}
      {events.map((event) => {
        const seconds = parseTimestamp(event.timestamp)
        const position = totalDuration > 0 ? (seconds / totalDuration) * 100 : 0
        const category = TYPE_TO_CATEGORY[event.type] ?? 'Combat'

        return (
          <EventDot
            key={event.id}
            category={category}
            position={position}
            label={event.type.charAt(0).toUpperCase() + event.type.slice(1).replace('-', ' ')}
            timestamp={event.timestamp}
            onClick={() => onEventClick?.(event)}
          />
        )
      })}
    </div>
  )
}
