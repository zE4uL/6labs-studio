/**
 * SuggestionsDropdown — Prompt suggestions below the input console.
 *
 * @figmaComponent  Suggestions Dropdown
 * @figmaNode       6453:1472199
 * @figmaFile       i9fxQ6pXrgRITEzopoXpWL
 * @figmaUrl        https://www.figma.com/design/i9fxQ6pXrgRITEzopoXpWL/6labs?node-id=6453-1472199
 */

const RADIOLOGIST_SUGGESTIONS = [
  'Show me videos where player got kills',
  'Show me player who drove a vehicle',
  'Show me players who got booyah',
]

interface SuggestionsDropdownProps {
  onSelect: (text: string) => void
  className?: string
}

export function SuggestionsDropdown({ onSelect, className }: SuggestionsDropdownProps) {
  return (
    <div
      className={[
        'suggestions-dropdown bg-bg-elements rounded-xl shadow-normal p-m',
        'flex flex-col gap-[20px]',
        className,
      ].filter(Boolean).join(' ')}
      style={{ border: '1px solid var(--border-default)' }}
    >
      <span className="font-body text-xs text-text-tertiary">Suggestions</span>
      {RADIOLOGIST_SUGGESTIONS.map((text) => (
        <button
          key={text}
          type="button"
          className="text-left font-body text-s text-text-secondary cursor-pointer leading-[1.5]"
          onMouseDown={(e) => {
            e.preventDefault()
            onSelect(text)
          }}
        >
          {text}
        </button>
      ))}
    </div>
  )
}
