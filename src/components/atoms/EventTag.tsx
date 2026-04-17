/**
 * EventTag — Pill-shaped label for tagging sessions/events.
 *
 * @figmaComponent  Event Tag
 * @figmaNode       107:23034
 * @figmaFile       i9fxQ6pXrgRITEzopoXpWL
 * @figmaUrl        https://www.figma.com/design/i9fxQ6pXrgRITEzopoXpWL/6labs?node-id=107-23034
 */

interface EventTagProps {
  label: string
  className?: string
}

export function EventTag({ label, className }: EventTagProps) {
  return (
    <span
      className={[
        'inline-flex items-center justify-center',
        'px-s py-[4px]',
        'rounded-round',
        'bg-base-50',
        'font-body text-2xs font-medium tracking-[0.2px] text-base-900 leading-[16px]',
        'whitespace-nowrap',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {label}
    </span>
  )
}
