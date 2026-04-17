import { useState, useEffect } from 'react'
import { registry } from './registry'
import { DSSidebar } from './DSSidebar'
import { DesignSystemIndex } from './DesignSystemIndex'
import { ComponentPage } from './ComponentPage'
import { FOUNDATION_RENDERERS } from './FoundationRenderers'
import { TableOfContents } from './TableOfContents'
import type { TocEntry } from './TableOfContents'

function parseComponentId(): string | null {
  const hash = window.location.hash
  const match = hash.match(/^#\/design-system\/(.+)$/)
  return match ? match[1] : null
}

export function DesignSystemLayout() {
  const [componentId, setComponentId] = useState<string | null>(parseComponentId)

  useEffect(() => {
    const handleHash = () => setComponentId(parseComponentId())
    window.addEventListener('hashchange', handleHash)
    return () => window.removeEventListener('hashchange', handleHash)
  }, [])

  const navigate = (id: string) => {
    window.location.hash = `#/design-system/${id}`
  }

  const navigateToIndex = () => {
    window.location.hash = '#/design-system'
  }

  const meta = componentId ? registry.get(componentId) : null

  // Get __propTypes if available (injected by Vite plugin)
  const propTypes = meta ? ((meta as any).__propTypes ?? {}) : {}

  // Foundation page TOC
  const foundationTocEntries: TocEntry[] = meta ? [
    { id: 'anatomy', label: 'Anatomy', level: 0 },
    { id: 'preview', label: 'Preview', level: 0 },
  ] : []

  return (
    <div className="min-h-screen bg-bg-page flex flex-col">
      {/* Top nav */}
      <header className="sticky top-0 z-50 bg-bg-elements border-b border-border-subtle px-xxl py-s flex items-center justify-between">
        <div className="flex items-center gap-xs">
          <button onClick={navigateToIndex} className="flex items-center gap-xs hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 rounded-[6px] bg-brand flex items-center justify-center">
              <span className="font-display text-xs font-bold text-white">6</span>
            </div>
            <span className="font-display text-s font-semibold text-text-primary">Design System</span>
          </button>
          <span className="font-body text-xs text-text-tertiary">Apparatus Library · 6labs Studio</span>
        </div>
        <a href="#/" className="font-display text-xs font-semibold text-brand hover:text-brand-hover transition-colors cursor-pointer">
          ← Back to Studio
        </a>
      </header>

      <div className="flex flex-1">
        {/* Left sidebar */}
        <aside className="sticky top-[57px] h-[calc(100vh-57px)] w-[240px] shrink-0 bg-bg-elements border-r border-border-subtle overflow-y-auto py-l px-xs">
          <DSSidebar activeId={componentId ?? ''} onNavigate={navigate} />
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0 px-xxl py-xxl">
          {!componentId && (
            <DesignSystemIndex onNavigate={navigate} />
          )}

          {meta && meta.category === 'foundations' && FOUNDATION_RENDERERS[meta.id] && (() => {
            const FoundationRenderer = FOUNDATION_RENDERERS[meta.id]
            return (
              <div className="flex gap-xl">
                <div className="flex-1 min-w-0 flex flex-col gap-xxl">
                  <div className="flex flex-col gap-xs">
                    <div className="flex items-center gap-xxs">
                      <span className="font-display text-2xs text-text-placeholder uppercase tracking-[1px]">Foundations</span>
                      <span className="font-body text-2xs text-text-placeholder">/</span>
                      <span className="font-display text-2xs text-text-secondary font-medium uppercase tracking-[1px]">{meta.label}</span>
                    </div>
                    <h1 className="font-display text-4xl font-extrabold text-text-primary leading-[1.2]">{meta.label}</h1>
                    <p className="font-body text-s text-text-secondary max-w-[600px] leading-[1.6]">{meta.description}</p>
                  </div>
                  <FoundationRenderer anatomy={meta.anatomy} />
                </div>
                <aside className="hidden xl:block w-[200px] shrink-0">
                  <div className="sticky top-[80px]">
                    <TableOfContents entries={foundationTocEntries} />
                  </div>
                </aside>
              </div>
            )
          })()}

          {meta && meta.category !== 'foundations' && (
            <ComponentPage meta={meta} propTypes={propTypes} />
          )}

          {componentId && !meta && (
            <div className="flex flex-col gap-m items-center justify-center py-xxxl">
              <p className="font-display text-l text-text-tertiary">Component not found</p>
              <p className="font-body text-s text-text-placeholder">No .anatomy.ts file found for &quot;{componentId}&quot;</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
