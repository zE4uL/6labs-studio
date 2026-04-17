/**
 * CreditsBadge — Displays credit usage or remaining credits.
 * Appears in Oracle AI responses and input console.
 *
 * @figmaComponent  Credits
 * @figmaNode       6470:1506026
 * @figmaFile       i9fxQ6pXrgRITEzopoXpWL
 * @figmaUrl        https://www.figma.com/design/i9fxQ6pXrgRITEzopoXpWL/6labs?node-id=6470-1506026
 */

interface CreditsBadgeProps {
  text: string
  className?: string
}

export function CreditsBadge({ text, className }: CreditsBadgeProps) {
  return (
    <div
      className={[
        'flex items-center justify-center px-xs py-xxs rounded-m bg-bg-subtle',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <span className="font-body text-xs font-normal leading-[1.5] text-text-primary whitespace-nowrap">
        {text}
      </span>
    </div>
  )
}
