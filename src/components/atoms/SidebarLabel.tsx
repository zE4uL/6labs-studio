/**
 * SidebarLabel — Small uppercase badge for sidebar nav items.
 * Variants map to Figma "Sidebar Labels" component states:
 *   - default → "Subtle" (bg-subtle, text-primary)
 *   - outlined → "Strong" (border-focus + bg-tint-light, text-secondary)
 *   - muted → "Weak" (no bg, text-secondary)
 *   - subtle-focus → "Subtle Focus" (bg-elements, text-primary)
 *
 * @figmaComponent  Sidebar Labels
 * @figmaNode       5627:50767
 * @figmaFile       i9fxQ6pXrgRITEzopoXpWL
 * @figmaUrl        https://www.figma.com/design/i9fxQ6pXrgRITEzopoXpWL/6labs?node-id=5627-50767
 */

type SidebarLabelVariant = 'default' | 'outlined' | 'muted' | 'subtle-focus'

interface SidebarLabelProps {
  label: string
  variant?: SidebarLabelVariant
  className?: string
}

const variantClasses: Record<SidebarLabelVariant, string> = {
  default: 'bg-bg-subtle text-text-primary py-[1px]',
  outlined: 'border border-border-focus bg-bg-tint-light text-text-secondary py-[2px]',
  muted: 'text-text-secondary py-[1px]',
  'subtle-focus': 'bg-bg-elements text-text-primary py-[1px]',
}

export function SidebarLabel({ label, variant = 'default', className }: SidebarLabelProps) {
  return (
    <span
      className={[
        'inline-flex items-center justify-center',
        'px-xxs',
        'rounded-xs',
        'font-display text-2xs font-medium uppercase tracking-[1.5px] leading-normal',
        'whitespace-nowrap',
        variantClasses[variant],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {label}
    </span>
  )
}
