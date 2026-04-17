/**
 * BaristaPanelTabs — Assist / Tasks tab row shown directly under the panel header.
 * Active tab has a blue highlight underline + brand text. Inactive tabs are muted.
 *
 * @figmaComponent  Dashboard Tab Item
 * @figmaNode       227:22432
 * @figmaFile       i9fxQ6pXrgRITEzopoXpWL
 * @figmaUrl        https://www.figma.com/design/i9fxQ6pXrgRITEzopoXpWL/6labs?node-id=227-22432
 */

export type BaristaPanelTab = 'assist' | 'tasks'

export interface BaristaPanelTabsProps {
  active: BaristaPanelTab
  onChange?: (tab: BaristaPanelTab) => void
  className?: string
}

export function BaristaPanelTabs({
  active,
  onChange,
  className = '',
}: BaristaPanelTabsProps) {
  return (
    <div
      className={`flex w-full ${className}`}
      style={{
        backgroundColor: 'var(--bg-elements)',
        borderBottom: '1px solid var(--border-subtle)',
      }}
      role="tablist"
    >
      <Tab
        label="Assist"
        active={active === 'assist'}
        onClick={() => onChange?.('assist')}
      />
      <Tab
        label="Tasks"
        active={active === 'tasks'}
        onClick={() => onChange?.('tasks')}
      />
    </div>
  )
}

function Tab({
  label,
  active,
  onClick,
}: {
  label: string
  active: boolean
  onClick?: () => void
}) {
  const color = active ? 'var(--brand)' : 'var(--text-secondary)'

  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className="relative flex-1 flex items-center justify-center h-[40px] font-[Bricolage_Grotesque] font-semibold text-[14px]"
      style={{ color }}
    >
      {label}
      {active && (
        <span
          className="absolute left-0 right-0 bottom-0 h-[2px]"
          style={{ backgroundColor: 'var(--brand)' }}
        />
      )}
    </button>
  )
}
