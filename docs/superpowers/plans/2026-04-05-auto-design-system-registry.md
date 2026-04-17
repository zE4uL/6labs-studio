# Auto Design System Registry — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the hardcoded 1,600-line DesignSystem.tsx with an auto-discovering, route-per-component documentation system that uses co-located `.anatomy.ts` files and a Tailwind-docs-style 3-column layout.

**Architecture:** `import.meta.glob` discovers `.anatomy.ts` files at build time. Each component page is rendered by a generic `ComponentPage` renderer that auto-generates prop tables from extracted type unions, anatomy tables from co-located metadata, and live example previews. Hash-based routing extended to support `#/design-system/:componentId`.

**Tech Stack:** React 18, TypeScript, Vite 5 (import.meta.glob + custom plugin), Tailwind CSS 3.4 with Apparatus tokens

---

## File Map

### New files to create:
```
src/design-system/
  types.ts                    — Shared types (ComponentMeta, AnatomyEntry, RenderHints)
  registry.ts                 — import.meta.glob discovery + category grouping
  DesignSystemLayout.tsx       — 3-column shell (sidebar + content + TOC)
  DesignSystemIndex.tsx        — Overview landing page
  ComponentPage.tsx            — Generic component doc page renderer
  FoundationRenderers.tsx      — Dedicated renderers for colors/type/spacing/shadows/icons/dark-mode
  DSSidebar.tsx                — Left nav sidebar
  TableOfContents.tsx          — Right "On This Page" sidebar
  PropTable.tsx                — Auto-generated prop API table
  AnatomyTable.tsx             — Token mapping table (migrated from current AnatomyPanel)
  ExampleRenderer.tsx          — Live preview renderer

src/components/atoms/
  Button.anatomy.ts
  Input.anatomy.ts
  Checkbox.anatomy.ts
  Toggle.anatomy.ts
  EventTag.anatomy.ts
  SidebarLabel.anatomy.ts
  ProgressBar.anatomy.ts
  UploadTag.anatomy.ts
  DescriptionBox.anatomy.ts

src/components/molecules/
  SidebarNavItem.anatomy.ts
  SidebarTaskItem.anatomy.ts
  SidebarProfile.anatomy.ts
  GameSelector.anatomy.ts
  AgentTabItem.anatomy.ts
  VideoCard.anatomy.ts
  VideoCardList.anatomy.ts
  VideosEmptyState.anatomy.ts
  PopupModal.anatomy.ts
  SelectDropdown.anatomy.ts
  InputFieldConsole.anatomy.ts
  SuggestionCard.anatomy.ts
  AgentPageHeader.anatomy.ts
  ContextUploader.anatomy.ts
  ContextUploaderMini.anatomy.ts
  ContextFileCard.anatomy.ts
  ConnectorCard.anatomy.ts

src/components/organisms/
  Sidebar.anatomy.ts
  HeroSection.anatomy.ts
  VideosContainer.anatomy.ts
  OracleAgentView.anatomy.ts
  RadiologistAgentView.anatomy.ts
  ContextUploadsView.anatomy.ts
  ContextConnectorsView.anatomy.ts

vite-plugin-prop-types.ts      — Vite plugin for type extraction
```

### Files to modify:
```
src/App.tsx                    — Extend hash router for DS sub-routes
vite.config.ts                 — Register prop-types plugin
```

### Files to delete (after verification):
```
src/pages/DesignSystem.tsx     — Old hardcoded DS page
```

---

## Task 1: Types & Registry Core

**Files:**
- Create: `src/design-system/types.ts`
- Create: `src/design-system/registry.ts`

- [ ] **Step 1: Create types.ts**

```ts
// src/design-system/types.ts
import type { ComponentType, ReactNode } from 'react'

export interface AnatomyEntry {
  property: string
  token: string
  variable: string
  value: string
}

export interface RenderGroup {
  label: string
  prop: string
  [key: string]: unknown
}

export interface RenderHints {
  groups: RenderGroup[]
  defaultChildren?: ReactNode | string
  defaultProps?: Record<string, unknown>
}

export type Category = 'foundations' | 'atoms' | 'molecules' | 'organisms'

export interface ComponentMeta {
  id: string
  label: string
  category: Category
  description: string
  component?: ComponentType<any>
  anatomy: AnatomyEntry[]
  renderHints?: RenderHints
}

// Injected by vite-plugin-prop-types
export interface PropTypeInfo {
  [propName: string]: string[] | boolean[]
}
```

- [ ] **Step 2: Create registry.ts**

```ts
// src/design-system/registry.ts
import type { ComponentMeta, Category } from './types'

const anatomyModules = import.meta.glob<{ meta: ComponentMeta }>(
  '../components/**/*.anatomy.ts',
  { eager: true }
)

export const registry = new Map<string, ComponentMeta>()

for (const [, mod] of Object.entries(anatomyModules)) {
  registry.set(mod.meta.id, mod.meta)
}

const CATEGORY_ORDER: Category[] = ['foundations', 'atoms', 'molecules', 'organisms']

export function getEntriesByCategory(): { category: Category; label: string; description: string; entries: ComponentMeta[] }[] {
  const labels: Record<Category, string> = {
    foundations: 'Foundations',
    atoms: 'Atoms',
    molecules: 'Molecules',
    organisms: 'Organisms',
  }
  const descriptions: Record<Category, string> = {
    foundations: 'Design tokens — color, type, spacing, elevation',
    atoms: 'Smallest UI building blocks',
    molecules: 'Composed from multiple atoms',
    organisms: 'Complex, self-contained UI regions',
  }

  return CATEGORY_ORDER.map(cat => ({
    category: cat,
    label: labels[cat],
    description: descriptions[cat],
    entries: Array.from(registry.values())
      .filter(m => m.category === cat)
      .sort((a, b) => a.label.localeCompare(b.label)),
  }))
}
```

- [ ] **Step 3: Verify TypeScript compiles**

Run: `cd D:/AG_master/6labs/studio-vite && npx tsc --noEmit --pretty 2>&1 | head -20`
Expected: No errors in types.ts or registry.ts (anatomy files don't exist yet, but glob returns empty)

- [ ] **Step 4: Commit**

```bash
git add src/design-system/types.ts src/design-system/registry.ts
git commit -m "feat(ds): add ComponentMeta types and glob-based registry"
```

---

## Task 2: AnatomyTable & PropTable Components

**Files:**
- Create: `src/design-system/AnatomyTable.tsx`
- Create: `src/design-system/PropTable.tsx`

- [ ] **Step 1: Create AnatomyTable.tsx**

Migrated from the existing `AnatomyPanel` in DesignSystem.tsx (lines 359-386), but takes `entries` as a prop instead of reading from a static object.

```tsx
// src/design-system/AnatomyTable.tsx
import type { AnatomyEntry } from './types'

export function AnatomyTable({ entries }: { entries: AnatomyEntry[] }) {
  if (!entries.length) return null
  return (
    <div className="bg-bg-elements border border-border-subtle rounded-xl overflow-hidden">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-border-subtle bg-bg-page">
            <th className="font-display text-2xs font-semibold text-text-tertiary uppercase tracking-[1px] px-m py-xs">Property</th>
            <th className="font-display text-2xs font-semibold text-text-tertiary uppercase tracking-[1px] px-m py-xs">Tailwind Token</th>
            <th className="font-display text-2xs font-semibold text-text-tertiary uppercase tracking-[1px] px-m py-xs">Figma Variable</th>
            <th className="font-display text-2xs font-semibold text-text-tertiary uppercase tracking-[1px] px-m py-xs">Value</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((e, i) => (
            <tr key={i} className="border-b border-border-subtle last:border-b-0 hover:bg-bg-page/50 transition-colors">
              <td className="font-body text-xs text-text-primary px-m py-xs">{e.property}</td>
              <td className="font-code text-2xs text-brand px-m py-xs">{e.token}</td>
              <td className="font-code text-2xs text-text-secondary px-m py-xs">{e.variable}</td>
              <td className="font-code text-2xs text-text-tertiary px-m py-xs">{e.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
```

- [ ] **Step 2: Create PropTable.tsx**

```tsx
// src/design-system/PropTable.tsx
import type { PropTypeInfo } from './types'

export function PropTable({ propTypes }: { propTypes: PropTypeInfo }) {
  const entries = Object.entries(propTypes)
  if (!entries.length) return null

  return (
    <div className="bg-bg-elements border border-border-subtle rounded-xl overflow-hidden">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-border-subtle bg-bg-page">
            <th className="font-display text-2xs font-semibold text-text-tertiary uppercase tracking-[1px] px-m py-xs">Prop</th>
            <th className="font-display text-2xs font-semibold text-text-tertiary uppercase tracking-[1px] px-m py-xs">Type</th>
            <th className="font-display text-2xs font-semibold text-text-tertiary uppercase tracking-[1px] px-m py-xs">Values</th>
          </tr>
        </thead>
        <tbody>
          {entries.map(([prop, values]) => (
            <tr key={prop} className="border-b border-border-subtle last:border-b-0 hover:bg-bg-page/50 transition-colors">
              <td className="font-code text-xs text-brand px-m py-xs">{prop}</td>
              <td className="font-code text-2xs text-text-secondary px-m py-xs">
                {typeof values[0] === 'boolean' ? 'boolean' : 'string'}
              </td>
              <td className="font-code text-2xs text-text-tertiary px-m py-xs">
                {typeof values[0] === 'boolean'
                  ? 'true | false'
                  : (values as string[]).map(v => `'${v}'`).join(' | ')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/design-system/AnatomyTable.tsx src/design-system/PropTable.tsx
git commit -m "feat(ds): add AnatomyTable and PropTable components"
```

---

## Task 3: ExampleRenderer

**Files:**
- Create: `src/design-system/ExampleRenderer.tsx`

- [ ] **Step 1: Create ExampleRenderer.tsx**

Renders live component previews using propTypes + renderHints.

```tsx
// src/design-system/ExampleRenderer.tsx
import type { ComponentType } from 'react'
import type { PropTypeInfo, RenderHints } from './types'

interface ExampleRendererProps {
  component: ComponentType<any>
  propTypes: PropTypeInfo
  renderHints?: RenderHints
}

function RenderGroup({
  component: Component,
  label,
  prop,
  values,
  fixedProps,
  children,
}: {
  component: ComponentType<any>
  label: string
  prop: string
  values: string[] | boolean[]
  fixedProps: Record<string, unknown>
  children?: React.ReactNode | string
}) {
  return (
    <div className="flex flex-col gap-s">
      <p className="font-display text-xs font-semibold text-text-tertiary uppercase tracking-[1.5px]">
        {label}
      </p>
      <div className="flex flex-wrap gap-s items-center">
        {values.map((value, i) => {
          const props = { ...fixedProps, [prop]: value }
          const label = typeof value === 'boolean' ? (value ? 'true' : 'false') : String(value)
          return (
            <Component key={i} {...props}>
              {children ?? label}
            </Component>
          )
        })}
      </div>
    </div>
  )
}

export function ExampleRenderer({ component: Component, propTypes, renderHints }: ExampleRendererProps) {
  // With renderHints: use the explicitly defined groups
  if (renderHints?.groups?.length) {
    return (
      <div className="bg-bg-elements rounded-2xl p-xl border border-border-subtle flex flex-col gap-l">
        {renderHints.groups.map((group, i) => {
          const values = propTypes[group.prop]
          if (!values) return null
          const { label, prop, ...fixedProps } = group
          return (
            <RenderGroup
              key={i}
              component={Component}
              label={label}
              prop={prop}
              values={values}
              fixedProps={{ ...renderHints.defaultProps, ...fixedProps }}
              children={renderHints.defaultChildren}
            />
          )
        })}
      </div>
    )
  }

  // Without renderHints: auto-render each prop's values
  const entries = Object.entries(propTypes).filter(
    ([, vals]) => typeof vals[0] === 'string' && vals.length > 1
  )

  if (!entries.length) return null

  return (
    <div className="bg-bg-elements rounded-2xl p-xl border border-border-subtle flex flex-col gap-l">
      {entries.map(([prop, values]) => (
        <RenderGroup
          key={prop}
          component={Component}
          label={prop}
          prop={prop}
          values={values}
          fixedProps={{}}
        />
      ))}
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/design-system/ExampleRenderer.tsx
git commit -m "feat(ds): add ExampleRenderer for live component previews"
```

---

## Task 4: DSSidebar & TableOfContents

**Files:**
- Create: `src/design-system/DSSidebar.tsx`
- Create: `src/design-system/TableOfContents.tsx`

- [ ] **Step 1: Create DSSidebar.tsx**

3-column layout left sidebar with Tailwind-docs style active indicator.

```tsx
// src/design-system/DSSidebar.tsx
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
```

- [ ] **Step 2: Create TableOfContents.tsx**

Right sidebar with "On This Page" anchor links + IntersectionObserver.

```tsx
// src/design-system/TableOfContents.tsx
import { useState, useEffect } from 'react'

export interface TocEntry {
  id: string
  label: string
  level: number // 0 = top-level, 1 = nested
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
```

- [ ] **Step 3: Commit**

```bash
git add src/design-system/DSSidebar.tsx src/design-system/TableOfContents.tsx
git commit -m "feat(ds): add DSSidebar with active indicator and TableOfContents with IntersectionObserver"
```

---

## Task 5: ComponentPage Renderer

**Files:**
- Create: `src/design-system/ComponentPage.tsx`

- [ ] **Step 1: Create ComponentPage.tsx**

Generic component documentation page that wires together PropTable, AnatomyTable, ExampleRenderer, and TableOfContents.

```tsx
// src/design-system/ComponentPage.tsx
import type { ComponentMeta, PropTypeInfo } from './types'
import { PropTable } from './PropTable'
import { AnatomyTable } from './AnatomyTable'
import { ExampleRenderer } from './ExampleRenderer'
import { TableOfContents, type TocEntry } from './TableOfContents'

interface ComponentPageProps {
  meta: ComponentMeta
  propTypes: PropTypeInfo
}

const CATEGORY_LABELS: Record<string, string> = {
  foundations: 'Foundations',
  atoms: 'Atoms',
  molecules: 'Molecules',
  organisms: 'Organisms',
}

export function ComponentPage({ meta, propTypes }: ComponentPageProps) {
  const hasPropTable = Object.keys(propTypes).length > 0
  const hasAnatomy = meta.anatomy.length > 0
  const hasExamples = meta.component != null

  // Build TOC entries
  const tocEntries: TocEntry[] = []
  if (hasPropTable) {
    tocEntries.push({ id: 'component-api', label: 'Component API', level: 0 })
    for (const prop of Object.keys(propTypes)) {
      tocEntries.push({ id: `prop-${prop}`, label: prop, level: 1 })
    }
  }
  if (hasAnatomy) {
    tocEntries.push({ id: 'anatomy', label: 'Anatomy', level: 0 })
  }
  if (hasExamples) {
    tocEntries.push({ id: 'examples', label: 'Examples', level: 0 })
    if (meta.renderHints?.groups) {
      for (const group of meta.renderHints.groups) {
        tocEntries.push({ id: `example-${group.label.toLowerCase().replace(/\s+/g, '-')}`, label: group.label, level: 1 })
      }
    }
  }

  return (
    <div className="flex gap-xl">
      {/* Main content */}
      <div className="flex-1 min-w-0 flex flex-col gap-xxl">
        {/* Breadcrumb + Title */}
        <div className="flex flex-col gap-xs">
          <div className="flex items-center gap-xxs">
            <span className="font-display text-2xs text-text-placeholder uppercase tracking-[1px]">
              {CATEGORY_LABELS[meta.category]}
            </span>
            <span className="font-body text-2xs text-text-placeholder">/</span>
            <span className="font-display text-2xs text-text-secondary font-medium uppercase tracking-[1px]">
              {meta.label}
            </span>
          </div>
          <h1 className="font-display text-4xl font-extrabold text-text-primary leading-[1.2]">
            {meta.label}
          </h1>
          <p className="font-body text-s text-text-secondary max-w-[600px] leading-[1.6]">
            {meta.description}
          </p>
        </div>

        {/* Component API */}
        {hasPropTable && (
          <section id="component-api" className="flex flex-col gap-m">
            <h2 className="font-display text-l font-semibold text-text-primary">Component API</h2>
            <PropTable propTypes={propTypes} />
          </section>
        )}

        {/* Anatomy */}
        {hasAnatomy && (
          <section id="anatomy" className="flex flex-col gap-m">
            <h2 className="font-display text-l font-semibold text-text-primary">Anatomy</h2>
            <AnatomyTable entries={meta.anatomy} />
          </section>
        )}

        {/* Examples */}
        {hasExamples && meta.component && (
          <section id="examples" className="flex flex-col gap-m">
            <h2 className="font-display text-l font-semibold text-text-primary">Examples</h2>
            <ExampleRenderer
              component={meta.component}
              propTypes={propTypes}
              renderHints={meta.renderHints}
            />
          </section>
        )}
      </div>

      {/* Right TOC */}
      <aside className="hidden xl:block w-[200px] shrink-0">
        <div className="sticky top-[80px]">
          <TableOfContents entries={tocEntries} />
        </div>
      </aside>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/design-system/ComponentPage.tsx
git commit -m "feat(ds): add ComponentPage renderer with prop table, anatomy, and examples"
```

---

## Task 6: FoundationRenderers

**Files:**
- Create: `src/design-system/FoundationRenderers.tsx`

- [ ] **Step 1: Create FoundationRenderers.tsx**

Migrate the 6 foundation section renderers (colors, typography, spacing, shadows-radii, icons, dark-mode) from the old DesignSystem.tsx. Each is a self-contained component that takes `showAnatomy` (now always true since anatomy is always visible on the page).

```tsx
// src/design-system/FoundationRenderers.tsx
import { AnatomyTable } from './AnatomyTable'
import type { AnatomyEntry } from './types'
import { HomeIcon } from '../components/icons/HomeIcon'
import { BaristaIcon } from '../components/icons/BaristaIcon'
import { RadiologistIcon } from '../components/icons/RadiologistIcon'
import { OracleIcon } from '../components/icons/OracleIcon'
import { ForecasterIcon } from '../components/icons/ForecasterIcon'
import { CoachIcon } from '../components/icons/CoachIcon'
import { GuardianIcon } from '../components/icons/GuardianIcon'
import { UploadIcon } from '../components/icons/UploadIcon'
import { ConnectorIcon } from '../components/icons/ConnectorIcon'
import { ChevronIcon } from '../components/icons/ChevronIcon'
import { FilterIcon } from '../components/icons/FilterIcon'
import { CalendarIcon } from '../components/icons/CalendarIcon'
import { ClockIcon } from '../components/icons/ClockIcon'
import { CloseIcon } from '../components/icons/CloseIcon'
import { CheckIcon } from '../components/icons/CheckIcon'
import { SendIcon } from '../components/icons/SendIcon'
import { SettingsIcon } from '../components/icons/SettingsIcon'
import { ShareIcon } from '../components/icons/ShareIcon'
import { GridIcon } from '../components/icons/GridIcon'
import { ListIcon } from '../components/icons/ListIcon'
import { LogoutIcon } from '../components/icons/LogoutIcon'
import { TrashIcon } from '../components/icons/TrashIcon'
import { EditIcon } from '../components/icons/EditIcon'
import { PlusIcon } from '../components/icons/PlusIcon'
import { BulbIcon } from '../components/icons/BulbIcon'
import { CollapseIcon } from '../components/icons/CollapseIcon'
import { ExpandIcon } from '../components/icons/ExpandIcon'
import { DirectionsArrowIcon } from '../components/icons/DirectionsArrowIcon'
import { DropdownArrowIcon } from '../components/icons/DropdownArrowIcon'
import { BlueStacksIcon } from '../components/icons/BlueStacksIcon'
import { FileImageIcon } from '../components/icons/FileImageIcon'
import { FileDocIcon } from '../components/icons/FileDocIcon'

// ─── Helpers ────────────────────────────────────────────────────────────────

function ColorSwatch({ name, hex, token, usage }: { name: string; hex: string; token: string; usage?: string }) {
  const isLight = hex === '#FFFFFF' || hex === '#F5F5F5' || hex === '#F1F1F1'
  return (
    <div className="flex flex-col gap-xs">
      <div
        className={`w-full h-[60px] rounded-xl border ${isLight ? 'border-border-subtle' : 'border-transparent'}`}
        style={{ backgroundColor: hex }}
      />
      <div className="flex flex-col gap-[2px]">
        <p className="font-display text-xs font-semibold text-text-primary">{name}</p>
        <p className="font-code text-2xs text-text-secondary">{hex}</p>
        <p className="font-body text-2xs text-text-tertiary">{token}</p>
        {usage && <p className="font-body text-2xs text-text-tertiary italic">{usage}</p>}
      </div>
    </div>
  )
}

function TypeSpec({ label, className, sample = 'The quick brown fox' }: { label: string; className: string; sample?: string }) {
  return (
    <div className="flex items-baseline gap-m">
      <span className="font-body text-2xs text-text-tertiary w-[160px] shrink-0">{label}</span>
      <span className={className}>{sample}</span>
    </div>
  )
}

// ─── Foundation renderers ───────────────────────────────────────────────────

export function ColorsRenderer({ anatomy }: { anatomy: AnatomyEntry[] }) {
  return (
    <div className="flex flex-col gap-xl">
      <AnatomyTable entries={anatomy} />
      <div>
        <p className="font-display text-xs font-semibold text-text-tertiary uppercase tracking-[1.5px] mb-s">Brand Blue</p>
        <div className="grid grid-cols-6 gap-m">
          <ColorSwatch name="Brand/600" hex="#0D5ED4" token="--brand-pressed" usage="CTA pressed" />
          <ColorSwatch name="Brand/500" hex="#1770EF" token="--brand" usage="Primary CTA, active" />
          <ColorSwatch name="Brand/400" hex="#4D8FF5" token="--brand-hover" usage="Hover state" />
          <ColorSwatch name="Brand Tint" hex="rgba(23,112,239,0.14)" token="--bg-tint" usage="Active nav bg" />
          <ColorSwatch name="Tint Light" hex="rgba(23,112,239,0.07)" token="--bg-tint-light" usage="Hover tint" />
          <ColorSwatch name="Tint Dark" hex="rgba(23,112,239,0.40)" token="--bg-tint-dark" usage="Selected dark" />
        </div>
      </div>
      <div>
        <p className="font-display text-xs font-semibold text-text-tertiary uppercase tracking-[1.5px] mb-s">Base Scale</p>
        <div className="grid grid-cols-7 gap-m">
          <ColorSwatch name="Base/900" hex="#030D2D" token="text-base-900" usage="Headings" />
          <ColorSwatch name="Base/800" hex="#1C2542" token="text-base-800" />
          <ColorSwatch name="Base/700" hex="#353D57" token="text-base-700" />
          <ColorSwatch name="Base/600" hex="#4F566C" token="text-base-600" usage="Secondary" />
          <ColorSwatch name="Base/400" hex="#818696" token="text-base-400" usage="Tertiary" />
          <ColorSwatch name="Base/100" hex="#CDCFD5" token="text-base-100" usage="Borders" />
          <ColorSwatch name="Base/50" hex="#E6E7EA" token="text-base-50" usage="Tag bg" />
        </div>
      </div>
      <div>
        <p className="font-display text-xs font-semibold text-text-tertiary uppercase tracking-[1.5px] mb-s">Semantic Backgrounds</p>
        <div className="grid grid-cols-5 gap-m">
          <ColorSwatch name="Page BG" hex="#F1F1F1" token="bg-bg-page" usage="Page background" />
          <ColorSwatch name="Card/Elements" hex="#FFFFFF" token="bg-bg-elements" usage="Cards, sidebar" />
          <ColorSwatch name="Subtle" hex="#E6E7EA" token="bg-bg-subtle" usage="Hover bg, tags" />
          <ColorSwatch name="Highlighted" hex="#1770EF" token="bg-brand" usage="Active tab" />
          <ColorSwatch name="Surface Pale" hex="#F5F5F5" token="bg-page-pale" usage="Alt page bg" />
        </div>
      </div>
      <div>
        <p className="font-display text-xs font-semibold text-text-tertiary uppercase tracking-[1.5px] mb-s">Status</p>
        <div className="grid grid-cols-6 gap-m">
          <ColorSwatch name="Error" hex="#C9392A" token="--error" />
          <ColorSwatch name="Warning" hex="#FFB700" token="--warning" />
          <ColorSwatch name="Success" hex="#16A34A" token="--success" />
          <ColorSwatch name="Notice" hex="#67C3BB" token="--notice" />
          <ColorSwatch name="Purple" hex="#7B4CFF" token="--purple" usage="AI / premium" />
          <ColorSwatch name="Pink" hex="#C20568" token="--pink" usage="Hot accent" />
        </div>
      </div>
    </div>
  )
}

export function TypographyRenderer({ anatomy }: { anatomy: AnatomyEntry[] }) {
  return (
    <div className="flex flex-col gap-l">
      <AnatomyTable entries={anatomy} />
      <div className="flex flex-col gap-s bg-bg-elements rounded-2xl p-xl border border-border-subtle">
        <TypeSpec label="Title/4XL ExtraBold" className="font-display text-4xl font-extrabold text-text-primary leading-[1.2]" sample="Get to know your game" />
        <TypeSpec label="Title/2XL Medium" className="font-display text-2xl font-medium text-text-primary leading-[1.2]" sample="Session Analysis Dashboard" />
        <TypeSpec label="Title/L Medium" className="font-display text-l font-medium text-text-primary leading-[1.5]" sample="Core Agents" />
        <TypeSpec label="Title/M Semibold" className="font-display text-m font-semibold text-text-primary leading-[1.5]" sample="Session #2847" />
        <TypeSpec label="Title/S Semibold" className="font-display text-s font-semibold text-text-primary leading-[1.5]" sample="Free Fire — Action" />
        <TypeSpec label="Title/XS Semibold" className="font-display text-xs font-semibold text-text-tertiary leading-[1.5]" sample="CORE AGENTS" />
        <div className="h-[1px] bg-border-subtle my-xs" />
        <TypeSpec label="Body/L Regular" className="font-body text-m font-normal text-text-primary leading-[1.5]" sample="Search for actions, objects and events in your game..." />
        <TypeSpec label="Body/M Regular" className="font-body text-s font-normal text-text-secondary leading-[1.5]" sample="Competitive ranked match with strategic gameplay." />
        <TypeSpec label="Body/S Regular" className="font-body text-xs font-normal text-text-secondary leading-[1.5]" sample="10/11/25 · 4:05 duration" />
        <TypeSpec label="Body/XS Medium" className="font-body text-2xs font-medium text-text-primary tracking-[0.2px] leading-[16px]" sample="items looted · game crashed" />
        <div className="h-[1px] bg-border-subtle my-xs" />
        <TypeSpec label="Label/Medium (UPPERCASE)" className="font-display text-2xs font-medium uppercase tracking-[1.5px] text-text-secondary" sample="COMING SOON · PERSONAL AGENT" />
        <TypeSpec label="Button/Large" className="font-display text-s font-semibold text-brand" sample="Radiologist · Show more" />
      </div>
    </div>
  )
}

export function SpacingRenderer({ anatomy }: { anatomy: AnatomyEntry[] }) {
  return (
    <div className="flex flex-col gap-l">
      <AnatomyTable entries={anatomy} />
      <div className="flex flex-wrap gap-m items-end">
        {[
          { name: 'xxxs', px: 2 }, { name: 'xxs', px: 4 }, { name: 'xs', px: 8 },
          { name: 's', px: 12 }, { name: 'm', px: 16 }, { name: 'l', px: 20 },
          { name: 'xl', px: 24 }, { name: 'xxl', px: 32 }, { name: 'xxxl', px: 40 },
          { name: 'xxl2', px: 48 }, { name: 'xxl3', px: 64 },
        ].map(({ name, px }) => (
          <div key={name} className="flex flex-col gap-xs items-center">
            <div className="bg-brand rounded-[2px]" style={{ width: px, height: px }} />
            <p className="font-code text-2xs text-text-tertiary">{name}</p>
            <p className="font-code text-2xs text-text-secondary">{px}px</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export function ShadowsRadiiRenderer({ anatomy }: { anatomy: AnatomyEntry[] }) {
  return (
    <div className="flex flex-col gap-l">
      <AnatomyTable entries={anatomy} />
      <div className="grid grid-cols-2 gap-xl">
        <div className="flex flex-col gap-s">
          <p className="font-display text-xs font-semibold text-text-tertiary uppercase tracking-[1.5px] mb-xs">Shadows</p>
          <div className="flex flex-col gap-m">
            {[
              { name: 'shadow-sm', cls: 'shadow-sm' }, { name: 'shadow-normal', cls: 'shadow-normal' },
              { name: 'shadow-big', cls: 'shadow-big' }, { name: 'shadow-button', cls: 'shadow-button' },
            ].map(({ name, cls }) => (
              <div key={name} className={`bg-bg-elements rounded-xl p-m ${cls}`}>
                <p className="font-code text-xs text-text-secondary">{name}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-s">
          <p className="font-display text-xs font-semibold text-text-tertiary uppercase tracking-[1.5px] mb-xs">Border Radius</p>
          <div className="flex flex-wrap gap-m items-start">
            {[
              { name: 'xs (4px)', cls: 'rounded-xs' }, { name: 's (6px)', cls: 'rounded-s' },
              { name: 'm (8px)', cls: 'rounded-m' }, { name: 'xl (12px)', cls: 'rounded-xl' },
              { name: '2xl (16px)', cls: 'rounded-2xl' }, { name: '3xl (20px)', cls: 'rounded-3xl' },
              { name: 'round', cls: 'rounded-round' },
            ].map(({ name, cls }) => (
              <div key={name} className="flex flex-col gap-xs items-center">
                <div className={`w-12 h-12 bg-brand/20 border-2 border-brand ${cls}`} />
                <p className="font-code text-2xs text-text-tertiary text-center">{name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function IconsRenderer({ anatomy }: { anatomy: AnatomyEntry[] }) {
  const allIcons = [
    { name: 'Home', icon: <HomeIcon size={24} /> },
    { name: 'Barista', icon: <BaristaIcon size={24} /> },
    { name: 'Radiologist', icon: <RadiologistIcon size={24} /> },
    { name: 'Oracle', icon: <OracleIcon size={24} /> },
    { name: 'Forecaster', icon: <ForecasterIcon size={24} /> },
    { name: 'Coach', icon: <CoachIcon size={24} /> },
    { name: 'Guardian', icon: <GuardianIcon size={24} /> },
    { name: 'Upload', icon: <UploadIcon size={24} /> },
    { name: 'Connector', icon: <ConnectorIcon size={24} /> },
    { name: 'Chevron →', icon: <ChevronIcon direction="right" size={24} /> },
    { name: 'Chevron ↓', icon: <ChevronIcon direction="down" size={24} /> },
    { name: 'Filter', icon: <FilterIcon size={24} /> },
    { name: 'Calendar', icon: <CalendarIcon size={24} /> },
    { name: 'Clock', icon: <ClockIcon size={24} /> },
    { name: 'Close', icon: <CloseIcon size={24} /> },
    { name: 'Check', icon: <CheckIcon size={24} /> },
    { name: 'Send', icon: <SendIcon size={24} /> },
    { name: 'Settings', icon: <SettingsIcon size={24} /> },
    { name: 'Share', icon: <ShareIcon size={24} /> },
    { name: 'Grid', icon: <GridIcon size={24} /> },
    { name: 'List', icon: <ListIcon size={24} /> },
    { name: 'Logout', icon: <LogoutIcon size={24} /> },
    { name: 'Trash', icon: <TrashIcon size={24} /> },
    { name: 'Edit', icon: <EditIcon size={24} /> },
    { name: 'Plus', icon: <PlusIcon size={24} /> },
    { name: 'Bulb', icon: <BulbIcon size={24} /> },
    { name: 'Collapse', icon: <CollapseIcon size={24} /> },
    { name: 'Expand', icon: <ExpandIcon size={24} /> },
    { name: 'Directions', icon: <DirectionsArrowIcon size={24} /> },
    { name: 'Dropdown', icon: <DropdownArrowIcon size={24} /> },
    { name: 'BlueStacks', icon: <BlueStacksIcon size={24} /> },
    { name: 'FileImage', icon: <FileImageIcon size={24} /> },
    { name: 'FileDoc', icon: <FileDocIcon size={24} /> },
  ]

  return (
    <div className="flex flex-col gap-l">
      <AnatomyTable entries={anatomy} />
      <div className="flex flex-wrap gap-xl bg-bg-elements rounded-2xl p-xl border border-border-subtle">
        {allIcons.map(({ name, icon }) => (
          <div key={name} className="flex flex-col gap-xs items-center">
            <div className="w-10 h-10 flex items-center justify-center text-text-secondary">{icon}</div>
            <p className="font-body text-2xs text-text-tertiary">{name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export function DarkModeRenderer({ anatomy }: { anatomy: AnatomyEntry[] }) {
  return (
    <div className="flex flex-col gap-l">
      <AnatomyTable entries={anatomy} />
      <div className="grid grid-cols-2 gap-xl">
        <div className="flex flex-col gap-m bg-base-950 rounded-2xl p-xl border border-base-800">
          <p className="font-display text-xs font-semibold text-white uppercase tracking-[1.5px]">Dark Mode Preview</p>
          <div className="flex flex-col gap-s">
            <div className="bg-base-925 rounded-xl p-m border border-base-800">
              <p className="font-display text-s font-semibold text-white">Card Background → #111827</p>
              <p className="font-body text-xs text-[#9A9EAB] mt-xxs">Secondary text → #9A9EAB</p>
            </div>
            <div className="bg-base-910 rounded-xl p-m">
              <p className="font-display text-s font-semibold text-white">Elevated → #1A2236</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-s bg-bg-elements rounded-2xl p-xl border border-border-subtle">
          <p className="font-display text-xs font-semibold text-text-tertiary uppercase tracking-[1.5px] mb-xs">Token → Light / Dark</p>
          {[
            { token: 'Background/Page BG', light: '#F1F1F1', dark: '#1A2236' },
            { token: 'Background/Card', light: '#FFFFFF', dark: '#111827' },
            { token: 'Text/Primary', light: '#030D2D', dark: '#FFFFFF' },
            { token: 'Text/Secondary', light: '#4F566C', dark: '#9A9EAB' },
            { token: 'Border/Default', light: '#CDCFD5', dark: 'rgba(255,255,255,0.12)' },
          ].map(({ token, light, dark }) => (
            <div key={token} className="flex items-center justify-between gap-m">
              <p className="font-body text-2xs text-text-secondary">{token}</p>
              <div className="flex gap-s items-center">
                <div className="flex items-center gap-xxs">
                  <div className="w-4 h-4 rounded-[3px] border border-border-subtle" style={{ backgroundColor: light }} />
                  <span className="font-code text-2xs text-text-tertiary">{light}</span>
                </div>
                <span className="text-text-placeholder text-2xs">/</span>
                <div className="flex items-center gap-xxs">
                  <div className="w-4 h-4 rounded-[3px] border border-base-700" style={{ backgroundColor: dark }} />
                  <span className="font-code text-2xs text-text-tertiary">{dark}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Map foundation IDs to their renderer
export const FOUNDATION_RENDERERS: Record<string, React.ComponentType<{ anatomy: AnatomyEntry[] }>> = {
  colors: ColorsRenderer,
  typography: TypographyRenderer,
  spacing: SpacingRenderer,
  'shadows-radii': ShadowsRadiiRenderer,
  icons: IconsRenderer,
  'dark-mode': DarkModeRenderer,
}
```

- [ ] **Step 2: Commit**

```bash
git add src/design-system/FoundationRenderers.tsx
git commit -m "feat(ds): migrate foundation renderers (colors, typography, spacing, shadows, icons, dark-mode)"
```

---

## Task 7: DesignSystemLayout & Index

**Files:**
- Create: `src/design-system/DesignSystemLayout.tsx`
- Create: `src/design-system/DesignSystemIndex.tsx`

- [ ] **Step 1: Create DesignSystemIndex.tsx**

Landing page for `/design-system` — shows overview with component count per category.

```tsx
// src/design-system/DesignSystemIndex.tsx
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
```

- [ ] **Step 2: Create DesignSystemLayout.tsx**

3-column layout shell that handles routing between index and component pages.

```tsx
// src/design-system/DesignSystemLayout.tsx
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
              <p className="font-body text-s text-text-placeholder">No .anatomy.ts file found for "{componentId}"</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Commit**

```bash
git add src/design-system/DesignSystemLayout.tsx src/design-system/DesignSystemIndex.tsx
git commit -m "feat(ds): add 3-column DesignSystemLayout and index page"
```

---

## Task 8: Foundation .anatomy.ts Files

**Files:**
- Create: 6 foundation anatomy files

- [ ] **Step 1: Create all foundation anatomy files**

These have no `component` field — they use dedicated renderers via `FOUNDATION_RENDERERS`.

Create `src/components/atoms/foundations/colors.anatomy.ts`:
```ts
import type { ComponentMeta } from '../../../design-system/types'

export const meta: ComponentMeta = {
  id: 'colors',
  label: 'Color Tokens',
  category: 'foundations',
  description: 'Brand, base scale, semantic backgrounds, and status colors from the Apparatus token system.',
  anatomy: [
    { property: 'Brand/500',       token: '--brand',        variable: 'Brand Blue/500 (8a8916d8…)', value: '#1770EF' },
    { property: 'Brand/600',       token: '--brand-pressed', variable: 'Brand Blue/600 (9d8a3571…)', value: '#0D5ED4' },
    { property: 'Brand/400',       token: '--brand-hover',  variable: 'Brand Blue/400 (fa855e11…)', value: '#4D8FF5' },
    { property: 'Base/900',        token: 'text-base-900',  variable: 'Base/Base - 900 (60221769…)', value: '#030D2D' },
    { property: 'Base/600',        token: 'text-base-600',  variable: 'Base/Base - 600 (0a2933ab…)', value: '#4F566C' },
    { property: 'Base/100',        token: 'text-base-100',  variable: 'Base/Base - 100 (82f2b096…)', value: '#CDCFD5' },
    { property: 'Base/50',         token: 'text-base-50',   variable: 'Base/Base - 50 (53dee2fa…)', value: '#E6E7EA' },
    { property: 'White',           token: 'bg-bg-elements', variable: 'Neutral/White (3edd2c47…)', value: '#FFFFFF' },
    { property: 'Surface',         token: 'bg-bg-page',     variable: 'Neutral/Surface (bcdcb8da…)', value: '#F1F1F1' },
    { property: 'Error',           token: '--error',        variable: 'Status/Error (38b180f4…)', value: '#C9392A' },
    { property: 'Success',         token: '--success',      variable: 'Status/Success (c053dc86…)', value: '#16A34A' },
    { property: 'Warning',         token: '--warning',      variable: 'Status/Warning (737cf720…)', value: '#FFB700' },
  ],
}
```

Create `src/components/atoms/foundations/typography.anatomy.ts`:
```ts
import type { ComponentMeta } from '../../../design-system/types'

export const meta: ComponentMeta = {
  id: 'typography',
  label: 'Typography',
  category: 'foundations',
  description: 'Display and body type scale, font families, and text styles.',
  anatomy: [
    { property: 'Display Font',    token: 'font-display',   variable: 'DisplayFont', value: 'Bricolage Grotesque' },
    { property: 'Body Font',       token: 'font-body',      variable: 'BodyFont', value: 'Inter' },
    { property: 'Size / 4XL',      token: 'text-4xl',       variable: 'size/4xl', value: '36px' },
    { property: 'Size / 2XL',      token: 'text-2xl',       variable: 'size/2xl', value: '24px' },
    { property: 'Size / L',        token: 'text-l',         variable: 'size/l', value: '20px' },
    { property: 'Size / M',        token: 'text-m',         variable: 'size/m', value: '16px' },
    { property: 'Size / S',        token: 'text-s',         variable: 'size/s', value: '14px' },
    { property: 'Size / XS',       token: 'text-xs',        variable: 'size/xs', value: '12px' },
    { property: 'Size / 2XS',      token: 'text-2xs',       variable: 'size/2xs', value: '11px' },
  ],
}
```

Create `src/components/atoms/foundations/spacing.anatomy.ts`:
```ts
import type { ComponentMeta } from '../../../design-system/types'

export const meta: ComponentMeta = {
  id: 'spacing',
  label: 'Spacing Scale',
  category: 'foundations',
  description: 'Spacing tokens from xxxs (2px) to xxxl (40px) used for padding, margins, and gaps.',
  anatomy: [
    { property: 'xxxs', token: 'gap-xxxs / p-xxxs',  variable: 'space/xxxs', value: '2px' },
    { property: 'xxs',  token: 'gap-xxs / p-xxs',    variable: 'space/xxs',  value: '4px' },
    { property: 'xs',   token: 'gap-xs / p-xs',      variable: 'space/xs',   value: '8px' },
    { property: 's',    token: 'gap-s / p-s',         variable: 'space/s',    value: '12px' },
    { property: 'm',    token: 'gap-m / p-m',         variable: 'space/m',    value: '16px' },
    { property: 'l',    token: 'gap-l / p-l',         variable: 'space/l',    value: '20px' },
    { property: 'xl',   token: 'gap-xl / p-xl',       variable: 'space/xl',   value: '24px' },
    { property: 'xxl',  token: 'gap-xxl / p-xxl',     variable: 'space/xxl',  value: '32px' },
    { property: 'xxxl', token: 'gap-xxxl / p-xxxl',   variable: 'space/xxxl', value: '40px' },
  ],
}
```

Create `src/components/atoms/foundations/shadows-radii.anatomy.ts`:
```ts
import type { ComponentMeta } from '../../../design-system/types'

export const meta: ComponentMeta = {
  id: 'shadows-radii',
  label: 'Shadows & Radii',
  category: 'foundations',
  description: 'Elevation shadows and border radius tokens.',
  anatomy: [
    { property: 'Shadow SM',       token: 'shadow-sm',     variable: 'elevation/sm',    value: '0 1px 2px rgba(0,0,0,0.06)' },
    { property: 'Shadow Normal',   token: 'shadow-normal', variable: 'elevation/normal', value: '0 2px 8px rgba(0,0,0,0.08)' },
    { property: 'Shadow Big',      token: 'shadow-big',    variable: 'elevation/big',    value: '0 8px 24px rgba(0,0,0,0.12)' },
    { property: 'Radius XS',       token: 'rounded-xs',    variable: 'radius/xs',  value: '4px' },
    { property: 'Radius S',        token: 'rounded-s',     variable: 'radius/s',   value: '6px' },
    { property: 'Radius M',        token: 'rounded-m',     variable: 'radius/m',   value: '8px' },
    { property: 'Radius XL',       token: 'rounded-xl',    variable: 'radius/xl',  value: '12px' },
    { property: 'Radius 2XL',      token: 'rounded-2xl',   variable: 'radius/2xl', value: '16px' },
    { property: 'Radius Round',    token: 'rounded-round', variable: 'radius/round', value: '999px' },
  ],
}
```

Create `src/components/atoms/foundations/icons.anatomy.ts`:
```ts
import type { ComponentMeta } from '../../../design-system/types'

export const meta: ComponentMeta = {
  id: 'icons',
  label: 'Icons',
  category: 'foundations',
  description: 'All icon components from the Apparatus library with default and active colors.',
  anatomy: [
    { property: 'Icon Color (default)', token: 'text-text-secondary',  variable: 'Text/Secondary (0a2933ab…)', value: '#4F566C' },
    { property: 'Icon Color (active)',   token: 'text-brand',          variable: 'Brand Blue/500 (8a8916d8…)', value: '#1770EF' },
    { property: 'Icon Size (default)',   token: '24px',                variable: 'size/icon-md',  value: '24px' },
    { property: 'Icon Size (small)',     token: '16px',                variable: 'size/icon-sm',  value: '16px' },
  ],
}
```

Create `src/components/atoms/foundations/dark-mode.anatomy.ts`:
```ts
import type { ComponentMeta } from '../../../design-system/types'

export const meta: ComponentMeta = {
  id: 'dark-mode',
  label: 'Dark Mode Mapping',
  category: 'foundations',
  description: 'Light/dark token mode mappings for key semantic tokens.',
  anatomy: [
    { property: 'Background/Page BG',  token: 'bg-bg-page',       variable: '9cf5e54d… (Light: Surface, Dark: Base-910)', value: '#F1F1F1 → #1A2236' },
    { property: 'Background/Card',     token: 'bg-bg-elements',   variable: '2910233d… (Light: White, Dark: Base-925)',   value: '#FFFFFF → #111827' },
    { property: 'Text/Primary',        token: 'text-text-primary', variable: 'Text/Primary → Base-900 / White',           value: '#030D2D → #FFFFFF' },
    { property: 'Text/Secondary',      token: 'text-text-secondary', variable: 'Text/Secondary → Base-600 / Base-300',   value: '#4F566C → #9A9EAB' },
    { property: 'Border/Default',      token: 'border-border-default', variable: 'Border/Default → Base-100 / White-12', value: '#CDCFD5 → rgba(255,255,255,0.12)' },
  ],
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/atoms/foundations/
git commit -m "feat(ds): add foundation anatomy files (colors, typography, spacing, shadows, icons, dark-mode)"
```

---

## Task 9: Atom .anatomy.ts Files

**Files:**
- Create: 9 atom anatomy files (Button, Input, Checkbox, Toggle, EventTag, SidebarLabel, ProgressBar, UploadTag, DescriptionBox)

- [ ] **Step 1: Create Button.anatomy.ts**

```ts
// src/components/ui/Button.anatomy.ts
import type { ComponentMeta } from '../../design-system/types'
import Button from './Button'

export const meta: ComponentMeta = {
  id: 'button',
  label: 'Button',
  category: 'atoms',
  description: 'Apparatus-spec interactive button. Supports all 10 Type variants, 4 sizes, pill/icon-only shapes, and left/right icon slots.',
  component: Button,
  anatomy: [
    { property: 'Primary BG',          token: 'bg-brand',                variable: 'Brand Blue/500 (8a8916d8…)',   value: '#1770EF' },
    { property: 'Primary BG (hover)',   token: 'bg-brand-hover',          variable: 'Brand Blue/400 (fa855e11…)',   value: '#4D8FF5' },
    { property: 'Primary BG (pressed)', token: 'bg-brand-pressed',       variable: 'Brand Blue/600 (9d8a3571…)',   value: '#0D5ED4' },
    { property: 'Primary Text',         token: 'text-white',             variable: 'Neutral/White (3edd2c47…)',    value: '#FFFFFF' },
    { property: 'Secondary BG',         token: 'bg-bg-subtle',           variable: 'Background/Subtle (389caeb1…)', value: '#E6E7EA' },
    { property: 'Outline Border',       token: 'border-border-default',  variable: 'Border/Default (82f2b096…)',   value: '#CDCFD5' },
    { property: 'Danger BG',            token: 'bg-error',               variable: 'Status/Error (38b180f4…)',     value: '#C9392A' },
    { property: 'Font',                 token: 'font-display',           variable: 'DisplayFont',                  value: 'Bricolage Grotesque' },
    { property: 'Border Radius',        token: 'rounded-m',              variable: 'radius/m',                     value: '8px' },
    { property: 'Padding (md)',         token: 'px-m py-xs',             variable: 'space/m, space/xs',             value: '16px 8px' },
    { property: 'Figma Component',      token: 'Button set',             variable: 'Key: d4ae660adb35…',           value: 'Apparatus/Button' },
  ],
  renderHints: {
    groups: [
      { label: 'Variants (md)',  prop: 'variant', size: 'md' },
      { label: 'Sizes',         prop: 'size',    variant: 'primary' },
      { label: 'Disabled',      prop: 'variant', disabled: true },
      { label: 'Pill',          prop: 'variant', pill: true },
    ],
    defaultChildren: 'Button',
  },
}
```

- [ ] **Step 2: Create remaining atom anatomy files**

Create each of these with anatomy migrated from the existing ANATOMY object in DesignSystem.tsx. Each file follows the same pattern as Button.anatomy.ts.

**`src/components/ui/Input.anatomy.ts`** — component: Input, id: 'input', category: 'atoms', anatomy from lines 208-219, renderHints with groups for sizes and states.

**`src/components/ui/Checkbox.anatomy.ts`** — component: Checkbox, id: 'checkbox', category: 'atoms', anatomy from lines 220-228, renderHints for states/sizes.

**`src/components/ui/Toggle.anatomy.ts`** — component: Toggle, id: 'toggle', category: 'atoms', anatomy from lines 229-236.

**`src/components/atoms/EventTag.anatomy.ts`** — component: EventTag, id: 'event-tag', category: 'atoms', anatomy from lines 237-243.

**`src/components/atoms/SidebarLabel.anatomy.ts`** — component: SidebarLabel, id: 'sidebar-label', category: 'atoms', anatomy from lines 244-249.

**`src/components/atoms/ProgressBar.anatomy.ts`** — component: ProgressBar, id: 'progress-bar', category: 'atoms'.

**`src/components/atoms/UploadTag.anatomy.ts`** — component: UploadTag, id: 'upload-tag', category: 'atoms'.

**`src/components/atoms/DescriptionBox.anatomy.ts`** — component: DescriptionBox, id: 'description-box', category: 'atoms'.

Each file must have: `id`, `label`, `category: 'atoms'`, `description` (from JSDoc), `component` (imported), `anatomy[]` (migrated from ANATOMY object), and optional `renderHints`.

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/*.anatomy.ts src/components/atoms/*.anatomy.ts
git commit -m "feat(ds): add anatomy files for all atom components"
```

---

## Task 10: Molecule & Organism .anatomy.ts Files

**Files:**
- Create: 17 molecule anatomy files + 7 organism anatomy files

- [ ] **Step 1: Create molecule anatomy files**

Each follows the same pattern. For each molecule in the SIDEBAR_ENTRIES list, create `ComponentName.anatomy.ts` next to the component file with:
- `id` matching the existing sidebar entry ID
- `label` matching the existing label
- `category: 'molecules'`
- `description` from the component's JSDoc
- `component` imported from the sibling `.tsx`
- `anatomy[]` migrated from the ANATOMY object (lines 250-324)
- `renderHints` where the old SectionContent had grouped previews

Files to create:
- `src/components/molecules/SidebarNavItem.anatomy.ts` (id: 'sidebar-nav')
- `src/components/molecules/SidebarTaskItem.anatomy.ts` (id: 'sidebar-task')
- `src/components/molecules/SidebarProfile.anatomy.ts` (id: 'sidebar-profile')
- `src/components/molecules/GameSelector.anatomy.ts` (id: 'game-selector')
- `src/components/molecules/GameSelectorDropdown.anatomy.ts` (id: 'game-dropdown')
- `src/components/molecules/LanguageSelector.anatomy.ts` (id: 'language-selector')
- `src/components/molecules/AgentTabItem.anatomy.ts` (id: 'agent-tab')
- `src/components/molecules/VideoCard.anatomy.ts` (id: 'video-card')
- `src/components/molecules/VideoCardList.anatomy.ts` (id: 'video-card-list')
- `src/components/molecules/VideosEmptyState.anatomy.ts` (id: 'videos-empty-state')
- `src/components/molecules/PopupModal.anatomy.ts` (id: 'popup-modal')
- `src/components/molecules/SelectDropdown.anatomy.ts` (id: 'select-dropdown')
- `src/components/molecules/InputFieldConsole.anatomy.ts` (id: 'input-console')
- `src/components/molecules/SuggestionCard.anatomy.ts` (id: 'suggestion-card')
- `src/components/molecules/AgentPageHeader.anatomy.ts` (id: 'agent-page-header')
- `src/components/molecules/ContextUploader.anatomy.ts` (id: 'context-uploader')
- `src/components/molecules/ContextUploaderMini.anatomy.ts` (id: 'context-uploader-mini')
- `src/components/molecules/ContextFileCard.anatomy.ts` (id: 'context-file-card')
- `src/components/molecules/ConnectorCard.anatomy.ts` (id: 'connector-card')

- [ ] **Step 2: Create organism anatomy files**

- `src/components/organisms/Sidebar.anatomy.ts` (id: 'sidebar-organism')
- `src/components/organisms/HeroSection.anatomy.ts` (id: 'hero-section')
- `src/components/organisms/VideosContainer.anatomy.ts` (id: 'videos-container')
- `src/components/organisms/OracleAgentView.anatomy.ts` (id: 'oracle-agent-view')
- `src/components/organisms/RadiologistAgentView.anatomy.ts` (id: 'radiologist-agent-view')
- `src/components/organisms/ContextUploadsView.anatomy.ts` (id: 'context-uploads-view')
- `src/components/organisms/ContextConnectorsView.anatomy.ts` (id: 'context-connectors-view')

- [ ] **Step 3: Commit**

```bash
git add src/components/molecules/*.anatomy.ts src/components/organisms/*.anatomy.ts
git commit -m "feat(ds): add anatomy files for all molecule and organism components"
```

---

## Task 11: Vite Plugin for Prop Type Extraction

**Files:**
- Create: `vite-plugin-prop-types.ts` (project root)
- Modify: `vite.config.ts`

- [ ] **Step 1: Create vite-plugin-prop-types.ts**

```ts
// vite-plugin-prop-types.ts
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import type { Plugin } from 'vite'

/**
 * Vite plugin that auto-extracts exported TypeScript union types from component
 * files and injects them as __propTypes into the corresponding .anatomy.ts module.
 */
export default function propTypesPlugin(): Plugin {
  return {
    name: 'vite-plugin-prop-types',
    enforce: 'pre',

    transform(code: string, id: string) {
      // Only process .anatomy.ts files
      if (!id.endsWith('.anatomy.ts')) return null

      // Find sibling .tsx file
      const dir = dirname(id)
      const baseName = id.replace(/\.anatomy\.ts$/, '')
      const tsxPath = `${baseName}.tsx`

      let tsxSource: string
      try {
        tsxSource = readFileSync(resolve(tsxPath), 'utf-8')
      } catch {
        // No sibling .tsx — skip extraction
        return null
      }

      // Extract exported type unions: export type FooVariant = 'a' | 'b' | 'c'
      const unionRegex = /export\s+type\s+\w+\s*=\s*((?:'[^']+'\s*\|\s*)*'[^']+')/g
      const propTypes: Record<string, string[]> = {}

      // Map type name to values
      const typeMap = new Map<string, string[]>()
      const typeNameRegex = /export\s+type\s+(\w+)\s*=\s*((?:'[^']+'\s*\|\s*)*'[^']+')/g
      let match: RegExpExecArray | null
      while ((match = typeNameRegex.exec(tsxSource)) !== null) {
        const typeName = match[1]
        const values = match[2].match(/'([^']+)'/g)?.map(v => v.slice(1, -1)) ?? []
        typeMap.set(typeName, values)
      }

      // Find interface props and map prop names to type names
      const interfaceRegex = /interface\s+\w*Props[^{]*\{([^}]*(?:\{[^}]*\}[^}]*)*)\}/s
      const interfaceMatch = interfaceRegex.exec(tsxSource)
      if (interfaceMatch) {
        const body = interfaceMatch[1]
        // Match lines like: variant?: ButtonVariant
        const propRegex = /(\w+)\??\s*:\s*(\w+)/g
        let propMatch: RegExpExecArray | null
        while ((propMatch = propRegex.exec(body)) !== null) {
          const propName = propMatch[1]
          const typeName = propMatch[2]
          if (typeMap.has(typeName)) {
            propTypes[propName] = typeMap.get(typeName)!
          }
          // Boolean props
          if (typeName === 'boolean') {
            propTypes[propName] = [true, false] as any
          }
        }
      }

      // Also check for inline union types in props: variant?: 'a' | 'b'
      if (interfaceMatch) {
        const body = interfaceMatch[1]
        const inlineRegex = /(\w+)\??\s*:\s*((?:'[^']+'\s*\|\s*)*'[^']+')/g
        let inlineMatch: RegExpExecArray | null
        while ((inlineMatch = inlineRegex.exec(body)) !== null) {
          const propName = inlineMatch[1]
          const values = inlineMatch[2].match(/'([^']+)'/g)?.map(v => v.slice(1, -1)) ?? []
          if (values.length > 0) {
            propTypes[propName] = values
          }
        }
      }

      if (Object.keys(propTypes).length === 0) return null

      // Inject __propTypes export and attach to meta
      const injection = `\nexport const __propTypes = ${JSON.stringify(propTypes)};\nif (typeof meta !== 'undefined') (meta as any).__propTypes = __propTypes;\n`
      return {
        code: code + injection,
        map: null,
      }
    },
  }
}
```

- [ ] **Step 2: Register plugin in vite.config.ts**

Read `vite.config.ts` first, then add the plugin import and registration.

Current vite.config.ts likely has:
```ts
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
})
```

Add:
```ts
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import propTypesPlugin from './vite-plugin-prop-types'

export default defineConfig({
  plugins: [react(), propTypesPlugin()],
})
```

- [ ] **Step 3: Commit**

```bash
git add vite-plugin-prop-types.ts vite.config.ts
git commit -m "feat(ds): add Vite plugin for auto-extracting component prop types"
```

---

## Task 12: Update App.tsx Router

**Files:**
- Modify: `src/App.tsx`

- [ ] **Step 1: Update hash router to support DS sub-routes**

```tsx
// src/App.tsx
import { useState, useEffect } from 'react'
import { HomePage } from './pages/HomePage'
import { DesignSystemLayout } from './design-system/DesignSystemLayout'

type Page = 'home' | 'ds'

function getPage(): Page {
  const hash = window.location.hash
  if (hash.startsWith('#/design-system')) return 'ds'
  return 'home'
}

function App() {
  const [page, setPage] = useState<Page>(getPage)

  useEffect(() => {
    const handleHash = () => setPage(getPage())
    window.addEventListener('hashchange', handleHash)
    return () => window.removeEventListener('hashchange', handleHash)
  }, [])

  return page === 'ds' ? <DesignSystemLayout /> : <HomePage />
}

export default App
```

- [ ] **Step 2: Verify dev server starts**

Run: `cd D:/AG_master/6labs/studio-vite && npm run dev`
Navigate to `http://localhost:5173/#/design-system` — should show the index page.
Navigate to `http://localhost:5173/#/design-system/button` — should show Button component page.

- [ ] **Step 3: Commit**

```bash
git add src/App.tsx
git commit -m "feat(ds): update App.tsx router to support design-system sub-routes"
```

---

## Task 13: Delete Old DesignSystem.tsx & Update CLAUDE.md

**Files:**
- Delete: `src/pages/DesignSystem.tsx`
- Modify: `6labs/CLAUDE.md`

- [ ] **Step 1: Verify new DS page works**

Run the dev server, navigate to `#/design-system`, click through several components. Verify:
- Sidebar navigation works
- Component pages show anatomy tables
- Foundation pages render correctly
- Prop tables appear for components with extracted types
- Example previews render live components

- [ ] **Step 2: Delete old DesignSystem.tsx**

```bash
git rm src/pages/DesignSystem.tsx
```

- [ ] **Step 3: Update CLAUDE.md**

In `6labs/CLAUDE.md`, change the rule:
```
- **Every new component must be added to `DesignSystem.tsx`** immediately after creation — with anatomy data, all variants, and interactive states.
```
to:
```
- **Every new component must have a co-located `.anatomy.ts` file** immediately after creation — with anatomy data, description, and optional renderHints. The Design System page auto-discovers these files.
```

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat(ds): remove old DesignSystem.tsx, update CLAUDE.md component rules"
```

---

## Task 14: Delete Duplicate DescriptionBox

**Files:**
- Delete: `src/components/molecules/DescriptionBox.tsx` (duplicate — atom version at `src/components/atoms/DescriptionBox.tsx` is canonical)

- [ ] **Step 1: Check if the molecules version is imported anywhere**

Run: `grep -r "molecules/DescriptionBox" src/`

If imported, update imports to point to `atoms/DescriptionBox`.

- [ ] **Step 2: Delete the duplicate**

```bash
git rm src/components/molecules/DescriptionBox.tsx
```

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "fix: remove duplicate DescriptionBox from molecules (canonical is in atoms)"
```
