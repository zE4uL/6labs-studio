import { useState, type ComponentType } from 'react'
import type { PropTypeInfo, RenderHints } from './types'

/* ─── Preview Canvas ─────────────────────────────────────────────────────────
 * Isolated container where components render. Provides:
 * - Visible boundary so components don't float in void
 * - Padding and centered alignment
 * - Catches portal-based components visually (modals stay inside)
 */
function PreviewCanvas({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative rounded-xl border border-border-subtle bg-bg-page overflow-hidden ${className}`}>
      <div className="p-xl flex flex-wrap gap-s items-center justify-start">
        {children}
      </div>
    </div>
  )
}

/* ─── Variant Tab Bar ────────────────────────────────────────────────────────
 * Pill tabs for switching between variant groups (e.g., Sizes | Disabled | Pill)
 */
function VariantTabs({
  tabs,
  activeTab,
  onChange,
}: {
  tabs: string[]
  activeTab: string
  onChange: (tab: string) => void
}) {
  return (
    <div className="flex gap-xxs p-xxs bg-bg-subtle rounded-xl w-fit">
      {tabs.map(tab => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={`
            px-s py-xxs rounded-m font-display text-2xs font-medium transition-colors
            ${activeTab === tab
              ? 'bg-bg-elements text-text-primary shadow-sm'
              : 'text-text-tertiary hover:text-text-secondary'
            }
          `}
        >
          {tab}
        </button>
      ))}
    </div>
  )
}

/* ─── Single group renderer ──────────────────────────────────────────────── */
function RenderGroup({
  component: Component,
  prop,
  values,
  fixedProps,
  defaultChildren,
}: {
  component: ComponentType<any>
  prop: string
  values: string[] | boolean[]
  fixedProps: Record<string, unknown>
  defaultChildren?: React.ReactNode | string
}) {
  return (
    <>
      {values.map((value, i) => {
        const props = { ...fixedProps, [prop]: value }
        if (defaultChildren != null) {
          return <Component key={i} {...props}>{defaultChildren}</Component>
        }
        return <Component key={i} {...props} />
      })}
    </>
  )
}

/* ─── Main ExampleRenderer ───────────────────────────────────────────────── */
interface ExampleRendererProps {
  component?: ComponentType<any>
  demo?: ComponentType
  propTypes: PropTypeInfo
  renderHints?: RenderHints
}

export function ExampleRenderer({ component: Component, demo: Demo, propTypes, renderHints }: ExampleRendererProps) {
  // Custom demo takes priority — used for modals, dropdowns, complex components
  if (Demo) {
    return (
      <PreviewCanvas>
        <Demo />
      </PreviewCanvas>
    )
  }

  if (!Component) return null

  // With renderHints: tabbed variant groups
  if (renderHints?.groups?.length) {
    return <TabbedGroups component={Component} propTypes={propTypes} renderHints={renderHints} />
  }

  // Auto-mode: render string union props
  const entries = Object.entries(propTypes).filter(
    ([, vals]) => typeof vals[0] === 'string' && vals.length > 1
  )
  if (!entries.length) return null

  if (entries.length === 1) {
    // Single prop — no tabs needed
    const [prop, values] = entries[0]
    return (
      <PreviewCanvas>
        <RenderGroup
          component={Component}
          prop={prop}
          values={values}
          fixedProps={renderHints?.defaultProps ?? {}}
          defaultChildren={renderHints?.defaultChildren}
        />
      </PreviewCanvas>
    )
  }

  // Multiple auto-discovered props — use tabs
  return <AutoTabbedGroups component={Component} entries={entries} defaultProps={renderHints?.defaultProps} />
}

/* ─── Tabbed groups from renderHints ─────────────────────────────────────── */
function TabbedGroups({
  component: Component,
  propTypes,
  renderHints,
}: {
  component: ComponentType<any>
  propTypes: PropTypeInfo
  renderHints: RenderHints
}) {
  const validGroups = renderHints.groups.filter(g => propTypes[g.prop]?.length)
  const [activeTab, setActiveTab] = useState(validGroups[0]?.label as string ?? '')

  if (!validGroups.length) return null

  const activeGroup = validGroups.find(g => g.label === activeTab) ?? validGroups[0]
  const { label, prop, ...fixedProps } = activeGroup

  return (
    <div className="flex flex-col gap-s">
      {validGroups.length > 1 && (
        <VariantTabs
          tabs={validGroups.map(g => g.label as string)}
          activeTab={activeTab}
          onChange={setActiveTab}
        />
      )}
      <PreviewCanvas>
        <RenderGroup
          component={Component}
          prop={prop as string}
          values={propTypes[prop as string]}
          fixedProps={{ ...renderHints.defaultProps, ...fixedProps }}
          defaultChildren={renderHints.defaultChildren}
        />
      </PreviewCanvas>
    </div>
  )
}

/* ─── Auto-tabbed groups from propTypes ──────────────────────────────────── */
function AutoTabbedGroups({
  component: Component,
  entries,
  defaultProps,
}: {
  component: ComponentType<any>
  entries: [string, string[] | boolean[]][]
  defaultProps?: Record<string, unknown>
}) {
  const [activeTab, setActiveTab] = useState(entries[0][0])

  const [activeProp, activeValues] = entries.find(([p]) => p === activeTab) ?? entries[0]

  return (
    <div className="flex flex-col gap-s">
      <VariantTabs
        tabs={entries.map(([p]) => p)}
        activeTab={activeTab}
        onChange={setActiveTab}
      />
      <PreviewCanvas>
        <RenderGroup
          component={Component}
          prop={activeProp}
          values={activeValues}
          fixedProps={defaultProps ?? {}}
        />
      </PreviewCanvas>
    </div>
  )
}
