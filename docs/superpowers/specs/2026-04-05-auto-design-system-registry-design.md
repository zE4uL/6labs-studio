# Auto Design System Registry

**Date**: 2026-04-05
**Status**: Approved
**Scope**: Replace the hardcoded DesignSystem.tsx with an auto-discovering, route-per-component documentation system

---

## Problem

DesignSystem.tsx is 1,600+ lines of hardcoded data (SIDEBAR_ENTRIES, ANATOMY object, SectionContent switch). When components are created or updated, the DS page drifts out of sync because there's no automation — every sidebar entry, anatomy row, and state preview must be manually written.

## Solution

An automated component registry that:
1. Auto-discovers components via co-located `.anatomy.ts` files using `import.meta.glob`
2. Auto-extracts prop types (variants, sizes, states) via a Vite plugin
3. Renders each component as its own route in a Tailwind-docs-style 3-column layout
4. Keeps anatomy data co-located with component code so updates happen in one place

## Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Anatomy data location | Co-located `.anatomy.ts` files | Keeps metadata next to the component; changes are obvious |
| State/variant discovery | Hybrid: auto-extract + renderHints override | Auto works for simple components; override for complex ones |
| Component discovery | Runtime `import.meta.glob` (eager) | Zero tooling, always in sync, Vite-native |
| Prop type extraction | Build-time Vite plugin transform | Regex-based, no TS compiler needed, fallback to renderHints |
| Layout | Tailwind-docs 3-column, route-per-component | Proper deep-linking, lazy loading, matches reference UI |
| Routing | Extended hash router (no new deps) | Project uses hash routing already; no React Router needed |

---

## Architecture

### File Structure

```
src/
  design-system/
    types.ts                  # ComponentMeta, AnatomyEntry, RenderHints types
    registry.ts               # import.meta.glob discovery, builds nav tree
    DesignSystemLayout.tsx     # 3-column layout shell (sidebar + content + TOC)
    DesignSystemIndex.tsx      # Overview/landing page
    ComponentPage.tsx          # Generic component page renderer
    FoundationPage.tsx         # Foundation-specific renderers (colors, type, spacing)
    Sidebar.tsx                # Left nav with category groups
    TableOfContents.tsx        # Right "On This Page" sidebar
    PropTable.tsx              # Auto-generated component API table
    AnatomyTable.tsx           # Token mapping table
    ExampleRenderer.tsx        # Live preview renderer using __propTypes + renderHints
  components/
    atoms/
      Button.tsx
      Button.anatomy.ts       # Co-located metadata
    molecules/
      VideoCard.tsx
      VideoCard.anatomy.ts
    organisms/
      Sidebar.tsx
      Sidebar.anatomy.ts
```

### Types

```ts
// design-system/types.ts

export interface AnatomyEntry {
  property: string    // Visual property name ("Primary BG")
  token: string       // Tailwind class ("bg-brand")
  variable: string    // Figma variable ref ("Brand Blue/500")
  value: string       // Resolved value ("#1770EF")
}

export interface RenderGroup {
  label: string       // Row label ("Variants", "Sizes")
  prop: string        // Prop to iterate ("variant")
  [key: string]: any  // Fixed props for all items in the group
}

export interface RenderHints {
  groups: RenderGroup[]
  defaultChildren?: React.ReactNode | string
  defaultProps?: Record<string, any>
}

export type Category = 'foundations' | 'atoms' | 'molecules' | 'organisms'

export interface ComponentMeta {
  id: string
  label: string
  category: Category
  description: string
  component?: React.ComponentType<any>  // undefined for foundations
  anatomy: AnatomyEntry[]
  renderHints?: RenderHints
}
```

### Registry (Auto-Discovery)

```ts
// design-system/registry.ts

// Discover all .anatomy.ts files at build time
const anatomyModules = import.meta.glob(
  '../components/**/*.anatomy.ts',
  { eager: true }
)

// Build registry from discovered modules
export const registry: Map<string, ComponentMeta> = new Map()

for (const [path, mod] of Object.entries(anatomyModules)) {
  const { meta } = mod as { meta: ComponentMeta }
  registry.set(meta.id, meta)
}

// Grouped by category for sidebar
export function getEntriesByCategory(): Record<Category, ComponentMeta[]> {
  // Groups and sorts entries by category
}
```

### Routing

Extend current hash router in App.tsx:

```
#/design-system                         → DesignSystemIndex
#/design-system/:componentId            → ComponentPage or FoundationPage
```

The DesignSystemLayout wraps all DS routes and provides the persistent sidebar + TOC shell.

Hash parsing:
- `#/design-system` → show index
- `#/design-system/button` → look up `button` in registry, render ComponentPage
- `#/design-system/colors` → look up `colors` in registry, render FoundationPage (category === 'foundations')

### 3-Column Layout

```
┌──────────────────┬────────────────────────────────┬─────────────────┐
│  Left Sidebar    │  Main Content                  │ On This Page    │
│  240px, sticky   │  flex-1, scrollable            │ 200px, sticky   │
│                  │                                │                 │
│  FOUNDATIONS     │  Breadcrumb (Atoms / Button)   │ Component API   │
│   Color Tokens   │  # Button                      │  variant        │
│   Typography     │  Description text...           │  size            │
│   Spacing Scale  │                                │  pill            │
│   Shadows & Radii│  ## Component API              │ Anatomy         │
│   Icons          │  ┌────────────────────────┐    │ Examples        │
│   Dark Mode      │  │ Prop table             │    │  Variants       │
│                  │  └────────────────────────┘    │  Sizes           │
│  ATOMS           │                                │  Disabled        │
│  ◄ Button        │  ## Anatomy                    │                 │
│    Input         │  ┌────────────────────────┐    │                 │
│    Checkbox      │  │ Token mapping table    │    │                 │
│    Toggle        │  └────────────────────────┘    │                 │
│                  │                                │                 │
│  MOLECULES       │  ## Examples                   │                 │
│    VideoCard     │  Variants: [live previews]     │                 │
│    ...           │  Sizes:    [live previews]     │                 │
│                  │  Disabled: [live previews]     │                 │
│  ORGANISMS       │                                │                 │
│    Sidebar       │                                │                 │
└──────────────────┴────────────────────────────────┴─────────────────┘
```

- Left sidebar: dark bg matching app theme, category headers in uppercase muted text, items with left border accent on active
- Main content: component sections with `id` attributes for anchor linking
- Right TOC: "ON THIS PAGE" header, nested anchor links, active section highlighted via IntersectionObserver

### Prop Type Auto-Extraction (Vite Plugin)

**Plugin**: `vite-plugin-prop-types.ts`

When a `.anatomy.ts` module is loaded:
1. Find the sibling `.tsx` file
2. Regex-extract exported type unions: `export type XVariant = 'a' | 'b' | ...`
3. Regex-extract boolean props from the component's Props interface
4. Inject `__propTypes` export into the anatomy module's transform output

**Regex patterns**:
```
/export\s+type\s+(\w+)\s*=\s*((?:'[^']+'\s*\|\s*)*'[^']+')/g
```

**Fallback**: If extraction fails, `__propTypes` is `{}` and the DS page relies on `renderHints` only. Console warning emitted.

### Component Page Renderer

`ComponentPage.tsx` receives a `ComponentMeta` + `__propTypes` and renders:

1. **Breadcrumb**: `{category} / {label}`
2. **Title**: `<h1>{label}</h1>` + description paragraph
3. **Component API** (`PropTable.tsx`): table with columns Prop | Type | Default | Description. Populated from `__propTypes`. Defaults from component defaultProps or TypeScript defaults.
4. **Anatomy** (`AnatomyTable.tsx`): table with columns Property | Token | Figma Variable | Value. From `meta.anatomy[]`.
5. **Examples** (`ExampleRenderer.tsx`):
   - If `renderHints.groups` exists: render each group as a labeled row
   - Else: for each prop in `__propTypes`, render a row with all values
   - Each example is a live instance of `meta.component` with the given props
   - Dark surface background matching app theme

### Foundation Page Renderer

`FoundationPage.tsx` handles entries with `category: 'foundations'`:

- **Colors**: swatch grid with hex values (migrated from current DS)
- **Typography**: type specimens showing all text styles
- **Spacing**: visual scale with px values
- **Shadows & Radii**: elevation + corner radius previews
- **Icons**: grid of all icon components
- **Dark Mode**: side-by-side light/dark token mapping

These renderers are migrated from the existing SectionContent switch cases.

### .anatomy.ts File Format

```ts
import type { ComponentMeta } from '../../design-system/types'
import Button from './Button'

export const meta: ComponentMeta = {
  id: 'button',
  label: 'Button',
  category: 'atoms',
  description: 'Apparatus-spec interactive button. Supports all 10 Type variants, 4 sizes, pill/icon-only shapes, and left/right icon slots.',
  component: Button,

  anatomy: [
    { property: 'Primary BG',         token: 'bg-brand',        variable: 'Brand Blue/500',  value: '#1770EF' },
    { property: 'Primary BG (hover)', token: 'bg-brand-hover',  variable: 'Brand Blue/400',  value: '#4D8FF5' },
    { property: 'Text (primary)',      token: 'text-inverse',    variable: 'Base/White',      value: '#FFFFFF' },
    { property: 'Border radius',       token: 'rounded-m',       variable: 'radius/m',        value: '8px' },
    { property: 'Padding (md)',        token: 'px-m py-xs',      variable: 'space/m, space/xs', value: '16px 8px' },
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

### Migration Path

1. Create `src/design-system/` module with types, registry, layout, and renderers
2. Create `.anatomy.ts` files for all existing components (data migrated from ANATOMY object)
3. Create foundation page renderers (code migrated from SectionContent cases)
4. Update App.tsx hash router to handle `#/design-system/:componentId`
5. Delete old DesignSystem.tsx once new system is verified
6. Update CLAUDE.md rule: "Every new component must have a `.anatomy.ts` file" (replaces "must be added to DesignSystem.tsx")

---

## Out of Scope

- Figma API sync for anatomy data (manual for now, could be added later)
- Search/filter within the DS page
- Code snippet display (copy-paste examples)
- Dark mode toggle within the DS page
