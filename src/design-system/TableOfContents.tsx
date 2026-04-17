import { useState, useEffect } from 'react'

export interface TocEntry {
  id: string
  label: string
  level: number
}

export function TableOfContents({ entries }: { entries: TocEntry[] }) {
  const [activeId, setActiveId] = useState(entries[0]?.id ?? '')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (observed) => {
        for (const entry of observed) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0 }
    )

    for (const entry of entries) {
      const el = document.getElementById(entry.id)
      if (el) observer.observe(el)
    }

    return () => observer.disconnect()
  }, [entries])

  if (!entries.length) return null

  return (
    <nav className="flex flex-col gap-xxs">
      <p className="font-display text-2xs font-semibold text-text-tertiary uppercase tracking-[1.5px] mb-xs">
        On This Page
      </p>
      {entries.map(entry => {
        const isActive = activeId === entry.id
        return (
          <a
            key={entry.id}
            href={`#${entry.id}`}
            onClick={(e) => {
              e.preventDefault()
              document.getElementById(entry.id)?.scrollIntoView({ behavior: 'smooth' })
            }}
            className={`
              font-body text-2xs transition-colors relative
              ${entry.level === 1 ? 'pl-m' : ''}
              ${isActive
                ? 'text-brand font-medium'
                : 'text-text-tertiary hover:text-text-secondary'
              }
            `}
          >
            {isActive && entry.level === 0 && (
              <span className="absolute left-[-8px] top-[2px] bottom-[2px] w-[2px] bg-brand rounded-full" />
            )}
            {entry.label}
          </a>
        )
      })}
    </nav>
  )
}
