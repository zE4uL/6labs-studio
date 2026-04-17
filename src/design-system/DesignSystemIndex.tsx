import { getEntriesByCategory } from './registry'

export function DesignSystemIndex({ onNavigate }: { onNavigate: (id: string) => void }) {
  const groups = getEntriesByCategory()

  return (
    <div className="flex flex-col gap-xxl max-w-[800px]">
      <div className="flex flex-col gap-xs">
        <h1 className="font-display text-4xl font-extrabold text-text-primary leading-[1.2]">
          Design System
        </h1>
        <p className="font-body text-s text-text-secondary leading-[1.6]">
          Apparatus Library · 6labs Studio — auto-discovered component reference
        </p>
      </div>

      <div className="grid grid-cols-2 gap-m">
        {groups.map(group => (
          <div key={group.category} className="bg-bg-elements rounded-2xl p-xl border border-border-subtle flex flex-col gap-s">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-m font-semibold text-text-primary">{group.label}</h2>
              <span className="font-code text-2xs text-text-tertiary">{group.entries.length} items</span>
            </div>
            <p className="font-body text-xs text-text-secondary">{group.description}</p>
            <div className="flex flex-wrap gap-xxs mt-xs">
              {group.entries.map(entry => (
                <button
                  key={entry.id}
                  onClick={() => onNavigate(entry.id)}
                  className="px-xs py-xxxs rounded-s font-body text-2xs text-text-secondary hover:text-brand hover:bg-bg-tint-light transition-colors"
                >
                  {entry.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
