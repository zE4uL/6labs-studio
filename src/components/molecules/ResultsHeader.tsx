/**
 * ResultsHeader — "Found N sessions" display text.
 *
 * @figmaComponent  Section Header
 * @figmaNode       6453:1472133
 * @figmaFile       i9fxQ6pXrgRITEzopoXpWL
 * @figmaUrl        https://www.figma.com/design/i9fxQ6pXrgRITEzopoXpWL/6labs?node-id=6453-1472133
 */

interface ResultsHeaderProps {
  count: number
  className?: string
}

export function ResultsHeader({ count, className }: ResultsHeaderProps) {
  return (
    <h2
      className={[
        'font-display text-m font-semibold leading-[1.5]',
        className,
      ].filter(Boolean).join(' ')}
      style={{ color: 'var(--brand)' }}
    >
      Found {count} sessions
    </h2>
  )
}
