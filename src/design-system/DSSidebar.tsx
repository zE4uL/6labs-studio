import { getEntriesByCategory } from './registry'

export function DSSidebar({ activeId, onNavigate }: { activeId: string; onNavigate: (id: string) => void }) {
  const groups = getEntriesByCategory()

  return (
    <nav className="flex flex-col gap-l">
      {groups.map(group => (
        <div key={group.category} className="flex flex-col gap-xxs">
          <div className="flex flex-col gap-xxxs px-s mb-xxs">
            <p className="font-display text-2xs font-semibold text-text-tertiary uppercase tracking-[1.5px]">
              {group.label}
            </p>
            <p className="font-body text-2xs text-text-placeholder leading-tight">
              {group.description}
            </p>
          </div>
          {group.entries.map(entry => {
            const isActive = activeId === entry.id
            return (
              <button
                key={entry.id}
                onClick={() => onNavigate(entry.id)}
                className={`
                  text-left px-s py-xxs transition-colors font-body text-xs relative
                  ${isActive
                    ? 'text-brand font-semibold'
                    : 'text-text-secondary hover:text-text-primary'
                  }
                `}
              >
                {isActive && (
                  <span className="absolute left-0 top-[4px] bottom-[4px] w-[2px] bg-brand rounded-full" />
                )}
                {entry.label}
              </button>
            )
          })}
        </div>
      ))}
    </nav>
  )
}
