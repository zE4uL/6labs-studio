/**
 * FilterTag — selectable pill tag for filter sections.
 * States: default (outlined), selected (brand tint bg + brand text).
 *
 * @figmaComponent  Filter Tags
 * @figmaNode       6425:222911
 * @figmaFile       i9fxQ6pXrgRITEzopoXpWL
 * @figmaUrl        https://www.figma.com/design/i9fxQ6pXrgRITEzopoXpWL/6labs?node-id=6425-222911
 */

interface FilterTagProps {
  label: string
  selected?: boolean
  onClick?: () => void
  className?: string
}

export function FilterTag({ label, selected = false, onClick, className = '' }: FilterTagProps) {
  return (
    <button
      type="button"
      className={`filter-tag ${className}`}
      data-selected={String(selected)}
      onClick={onClick}
    >
      {label}
    </button>
  )
}
