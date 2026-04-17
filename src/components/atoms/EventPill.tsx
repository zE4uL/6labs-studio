/**
 * EventPill — Translucent category pill for event timeline items.
 * Figma component set 34:5451 — 7 variants (Combat, Technical, Tap,
 * Progression, Frustration, Monetization, Warning).
 * All use backdrop-blur + rgba(123,76,255,0.8) purple bg + white text + round pill.
 *
 * @figmaComponent  Event Pill
 * @figmaNode       34:5451
 * @figmaFile       i9fxQ6pXrgRITEzopoXpWL
 * @figmaUrl        https://www.figma.com/design/i9fxQ6pXrgRITEzopoXpWL/6labs?node-id=34-5451
 */

/** Category-specific pill colors — extracted from Figma variants */
const PILL_COLORS: Record<string, string> = {
  'Combat':        'rgba(123,76,255,0.8)',
  'Technical':     'rgba(243,54,33,0.8)',
  'Tap':           'rgba(103,195,187,0.8)',
  'Progression':   'rgba(3,151,235,0.8)',
  'Frustation':    'rgba(255,98,0,0.8)',
  'Monetization':  'rgba(57,139,77,0.8)',
  'Warning':       'rgba(255,195,42,0.8)',
}

interface EventPillProps {
  /** Event category — determines pill color */
  category: string
  /** Display label — if omitted, category name is used */
  label?: string
  className?: string
}

export function EventPill({ category, label, className }: EventPillProps) {
  const bgColor = PILL_COLORS[category] ?? 'rgba(123,76,255,0.8)'

  return (
    <span
      className={[
        'inline-flex items-center justify-center px-s py-xxs rounded-round',
        'font-body text-2xs font-medium text-text-on-brand whitespace-nowrap',
        'backdrop-blur-[10px]',
        className,
      ].filter(Boolean).join(' ')}
      style={{
        backgroundColor: bgColor,
        lineHeight: '16px',
        letterSpacing: '0.2px',
      }}
    >
      {label ?? category}
    </span>
  )
}
