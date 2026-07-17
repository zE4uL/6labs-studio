/**
 * LibraryTagScope — searchable, grouped, multi-select tag picker used to narrow
 * which Library videos an agent references. Shown in the console Sources popup
 * when "Library" is the selected source.
 *
 * Lists author-set upload tags (AI tags are display-only and not scopable). Each
 * row shows a per-tag video count. Selection is OR (any selected tag). Panel-only
 * — the parent owns open/close and anchoring.
 *
 * Code-first prototype — no Figma source yet.
 */
import { useMemo, useState } from 'react'
import type { LibraryTagOption } from '../../lib/librarySessions'
import { CheckIcon } from '../icons/CheckIcon'

interface LibraryTagScopeProps {
  options: LibraryTagOption[]
  selected: string[]
  onChange: (tags: string[]) => void
  className?: string
}

export function LibraryTagScope({ options, selected, onChange, className }: LibraryTagScopeProps) {
  const [query, setQuery] = useState('')
  const selectedSet = new Set(selected.map((t) => t.toLowerCase()))

  const q = query.trim().toLowerCase()
  const filtered = useMemo(
    () => options.filter((o) => !q || o.label.toLowerCase().includes(q)),
    [options, q]
  )

  const toggle = (label: string) => {
    if (selectedSet.has(label.toLowerCase())) onChange(selected.filter((t) => t.toLowerCase() !== label.toLowerCase()))
    else onChange([...selected, label])
  }

  const noResults = filtered.length === 0

  const renderRow = (o: LibraryTagOption) => {
    const on = selectedSet.has(o.label.toLowerCase())
    return (
      <button
        key={`${o.group}-${o.label}`}
        type="button"
        onClick={() => toggle(o.label)}
        className="library-tag-row flex items-center gap-s w-full px-s py-xs rounded-lg text-left"
        role="option"
        aria-selected={on}
      >
        <span
          className="shrink-0 inline-flex items-center justify-center size-[18px] rounded-[5px]"
          style={
            on
              ? { backgroundColor: 'var(--brand)', color: '#fff' }
              : { border: '1.5px solid var(--border-default)' }
          }
        >
          {on && <CheckIcon size={12} />}
        </span>
        <span className="flex-1 min-w-0 truncate font-body text-s" style={{ color: 'var(--text-primary)' }}>
          {o.label}
        </span>
        <span className="shrink-0 font-body text-2xs tabular-nums" style={{ color: 'var(--text-tertiary)' }}>
          {o.count}
        </span>
      </button>
    )
  }

  return (
    <div
      className={[
        'flex flex-col bg-bg-elements rounded-xl overflow-hidden w-[280px]',
        'shadow-[0px_2px_8px_rgba(0,0,0,0.06),_0px_8px_32px_rgba(0,0,0,0.13)]',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {/* Clear row — only when tags are selected (label removed per design) */}
      {selected.length > 0 && (
        <div className="flex items-center justify-end px-s pt-xs shrink-0">
          <button
            type="button"
            onClick={() => onChange([])}
            className="font-body text-2xs font-semibold"
            style={{ color: 'var(--brand)' }}
          >
            Clear {selected.length}
          </button>
        </div>
      )}

      {/* Search */}
      <div className="p-xxs shrink-0">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search tags…"
          className="w-full px-s py-xs rounded-lg font-body text-s outline-none"
          style={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-subtle)', color: 'var(--text-primary)' }}
          aria-label="Search tags"
        />
      </div>

      {/* Tags */}
      <div className="flex flex-col gap-xxs max-h-[240px] overflow-y-auto p-xxs pt-0">
        {noResults ? (
          <div className="px-s py-m font-body text-xs text-center" style={{ color: 'var(--text-tertiary)' }}>
            No tags match “{query}”
          </div>
        ) : (
          filtered.map(renderRow)
        )}
      </div>
    </div>
  )
}
