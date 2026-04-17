/**
 * InfoItem — Session metadata card (icon + label top, value below).
 * Figma: bg-[var(--background/page-bg)], border base-50, rounded-[12px], p-12.
 *
 * @figmaComponent  Stat Card (Session Info variant)
 * @figmaNode       493:24841
 * @figmaFile       i9fxQ6pXrgRITEzopoXpWL
 * @figmaUrl        https://www.figma.com/design/i9fxQ6pXrgRITEzopoXpWL/6labs?node-id=493-24841
 */

interface InfoItemProps {
  icon?: React.ReactNode
  label: string
  value: string
  className?: string
}

export function InfoItem({ icon, label, value, className }: InfoItemProps) {
  return (
    <div
      className={[
        'flex flex-col gap-xxs p-s rounded-xl flex-1 min-w-0',
        className,
      ].filter(Boolean).join(' ')}
      style={{
        backgroundColor: 'var(--bg-page)',
        border: '1px solid var(--bg-subtle)',
      }}
    >
      <div className="flex items-center gap-xxs">
        {icon && <span className="text-text-tertiary shrink-0">{icon}</span>}
        <span className="font-body text-xs text-text-tertiary">{label}</span>
      </div>
      <span className="font-display text-s font-semibold text-text-primary leading-[1.5]">{value}</span>
    </div>
  )
}
