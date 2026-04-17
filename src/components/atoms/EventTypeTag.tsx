/**
 * EventTypeTag — Translucent purple pill for event types in session timelines.
 * Figma: backdrop-blur + rgba(123,76,255,0.8) bg + white text + round pill.
 *
 * @figmaComponent  Event Pill
 * @figmaNode       34:5451
 * @figmaFile       i9fxQ6pXrgRITEzopoXpWL
 * @figmaUrl        https://www.figma.com/design/i9fxQ6pXrgRITEzopoXpWL/6labs?node-id=34-5451
 */

const TYPE_LABELS: Record<string, string> = {
  'kill': 'Kill',
  'winner': 'Winner',
  'loading-error': 'Loading Error',
  'customization': 'Customization',
  'match-start': 'Match Start',
  'death': 'Death',
  'loot': 'Loot',
}

interface EventTypeTagProps {
  type: string
  className?: string
}

export function EventTypeTag({ type, className }: EventTypeTagProps) {
  return (
    <span
      className={[
        'inline-flex items-center justify-center px-s py-xxs rounded-round',
        'font-body text-2xs font-medium text-text-on-brand whitespace-nowrap',
        'backdrop-blur-[10px] tracking-[0.2px]',
        className,
      ].filter(Boolean).join(' ')}
      style={{
        backgroundColor: 'rgba(123,76,255,0.8)',
        lineHeight: '16px',
      }}
    >
      {TYPE_LABELS[type] ?? type}
    </span>
  )
}
