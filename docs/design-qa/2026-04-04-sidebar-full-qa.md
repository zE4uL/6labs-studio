# Design QA — Sidebar (Full Composition Tree)
Date: 2026-04-04
Scope: Sidebar organism + all child molecules and atoms

---

## Figma-Code Sync Status

| Component | File | `@figmaComponent` | `@figmaNode` | `@figmaFile` | `@figmaUrl` | Status |
|---|---|---|---|---|---|---|
| Sidebar | organisms/Sidebar.tsx | Sidebar | `6411:733380` | ✓ | ✓ | SYNCED |
| SidebarNavItem | molecules/SidebarNavItem.tsx | Sidebar nav item | `1894:18007` | ✓ | ✓ | SYNCED |
| SidebarTaskItem | molecules/SidebarTaskItem.tsx | Sidebar task item | `1900:49896` | ✓ | ✓ | SYNCED |
| SidebarProfile | molecules/SidebarProfile.tsx | SidebarProfile | `4545:42646` | ✓ | ✓ | SYNCED |
| SidebarLabel | atoms/SidebarLabel.tsx | Sidebar Labels | `5627:50767` | ✓ | ✓ | SYNCED |
| GameSelector | molecules/GameSelector.tsx | Thumb & Info Expanded | `172:32685` | ✓ | ✓ | SYNCED |
| GameSelectorDropdown | molecules/GameSelectorDropdown.tsx | Game Selector Dropdown | `172:32673` | ✓ | ✓ | SYNCED |
| LanguageSelector | molecules/LanguageSelector.tsx | Language Select | `2565:52762` | ✓ | ✓ | SYNCED (fixed) |
| ExpandIcon | icons/ExpandIcon.tsx | — | — | — | — | N/A (code-only icon) |
| CollapseIcon | icons/CollapseIcon.tsx | — | — | — | — | N/A (code-only icon) |

**Summary: 8/8 Figma-mapped components fully synced. 2 icons are code-only (no Figma component).**

---

## 1. Sidebar (Organism) — `6411:733380`

### Token Audit

| Layer | Property | Figma Token | Code | Status |
|-------|----------|-------------|------|--------|
| Container | background | `--background/elements` | `bg-bg-elements` | PASS |
| Container | border-right | `--border/subtle` | `border-border-subtle` | PASS |
| Container | width (expanded) | `280px` | `w-[280px]` via style | PASS |
| Container | width (collapsed) | `60px` | `w-[60px]` via style | PASS |
| Container | gap | `--s (12px)` | `gap-s` | PASS |
| Header | height | `56px` | `h-[56px]` | PASS |
| Header | padding (expanded) | `pl-s pr-l py-s` | `pl-s pr-l py-s` | PASS |
| Header | padding (collapsed) | `p-s` | `p-s` | PASS |
| Footer | border-top | `--border/subtle` | `border-border-subtle` | PASS |
| Footer | padding | `--s (12px)` | `p-s` | PASS |
| Footer | gap | `--m (16px)` | `gap-m` | PASS |
| Scroll area | overflow-y | auto | `overflow-y-auto` | PASS |

**Token summary: 12/12 PASS**

### Visual Comparison (Figma screenshots captured)

| Check | Status | Notes |
|-------|--------|-------|
| Overall layout (expanded) | PASS | Structure matches Figma — header, game card, nav, scroll, footer |
| Overall layout (collapsed) | PASS | 60px, icon-only, stacked profile |
| Spacing/gaps | PASS | All gaps match `--s` (12px) |
| Header composition | PASS | Logo mark + logotype + collapse icon |
| Collapse → expand animation | PASS | CSS `transition-[width] duration-300 ease-in-out` |
| Collapsed header hover | PASS | Expand icon fades in on hover |
| Footer width (expanded) | PASS | `w-[280px]` matches |
| Footer width (collapsed) | PASS | `w-[60px]` matches |

### State Coverage

| State | In Figma | In Code | Status |
|-------|----------|---------|--------|
| Expanded | yes | yes | PASS |
| Expanded with Core Agents | yes | yes (default) | PASS |
| Collapsed | yes | yes | PASS |
| Collapse/Expand animation | implied | yes | PASS |

---

## 2. SidebarNavItem — `1894:18007`

### Token Audit

| Layer | Property | Figma Token | Code | Status |
|-------|----------|-------------|------|--------|
| Wrapper | height | `45px` | `h-[45px]` | PASS |
| Wrapper (collapsed) | height | `44px` | `h-[44px]` | PASS |
| Wrapper | padding-x | `--s (12px)` | `px-s` | PASS |
| Wrapper | padding-y | `--xxs (4px)` | `py-xxs` | PASS |
| Container | padding | `--xs (8px)` | `p-xs` | PASS |
| Container | radius | `--m (8px)` | `rounded-m` | PASS |
| Active bg | gradient | radial `--bg-tint → --bg-tint-light` | `nav-active-gradient` (CSS radial) | PASS |
| Active text | color | `--text--&-icon/brand` | `text-brand` | PASS |
| Default text | color | `--text--&-icon/secondary` | `text-text-secondary` | PASS |
| Label | font | Title/S/Semibold | `font-display text-s font-semibold` | PASS |
| Icon | size | `20×20` | `w-5 h-5` | PASS |
| Active indicator | width | `4px` | `w-[4px]` | PASS |
| Active indicator | height | `36px` | `h-[36px]` | PASS |
| Active indicator | bg | `--interactive/brand` | `bg-brand` | PASS |
| Active indicator | radius | `12px tr / 11px br` | `rounded-tr-[12px] rounded-br-[11px]` | PASS |
| Content gap | gap | `--xs (8px)` | `gap-xs` | PASS |

**Token summary: 16/16 PASS**

### Visual Comparison

| Check | Status | Notes |
|-------|--------|-------|
| Default state | PASS | Icon secondary, text secondary |
| Active state | PASS | Radial gradient bg, brand text/icon, left indicator |
| Hover state | PASS | `nav-hover-gradient` CSS class applies on hover |
| Collapsed mode | PASS | Icon-only, no label/badge, title tooltip |
| Icon alignment | PASS | Vertically centered in container |

### State Coverage

| State | In Figma | In Code | Status |
|-------|----------|---------|--------|
| Default | yes | yes | PASS |
| Active | yes | yes | PASS |
| Hover | yes | yes | PASS |
| Disabled (Forecaster) | yes | yes | PASS |
| Collapsed | yes | yes | PASS |

---

## 3. SidebarTaskItem — `1900:49896`

### Token Audit

| Layer | Property | Figma Token | Code | Status |
|-------|----------|-------------|------|--------|
| Wrapper | padding-x | `--s (12px)` | `px-s` | PASS |
| Wrapper | padding-y | `--xxs (4px)` | `py-xxs` | PASS |
| Container | padding | `--xs (8px)` | `p-xs` | PASS |
| Container | radius | `--m (8px)` | `rounded-m` | PASS |
| Query text | font | Body/M/Regular | `font-body text-s font-normal` | PASS |
| Query text (default) | color | `--text--&-icon/secondary` | `text-text-secondary` | PASS |
| Query text (hover/active) | color | `--text--&-icon/primary` | `text-text-primary` | PASS |
| Hover/Active bg | color | `--background/page-bg` | `bg-bg-page` | PASS |
| Active indicator | same as NavItem | — | same classes | PASS |
| Check icon (complete) | color | `--success` | `var(--success)` | PASS |
| Spinner bg | stroke | `--border/subtle` | `var(--border-subtle)` | PASS |
| Spinner fill | stroke | `--brand` | `var(--brand)` | PASS |

**Token summary: 12/12 PASS**

### Visual Comparison

| Check | Status | Notes |
|-------|--------|-------|
| Default state | PASS | Secondary text, hidden check placeholder |
| Loading state | PASS | Circular spinner matches Figma's Infinite Loader concept |
| Complete state | PASS | Green checkmark visible |
| Hover state | PASS | bg-page, text-primary on hover |
| Active state | PASS | bg-page + left indicator bar |
| Text truncation | PASS | `truncate` + `min-w-0` chain fixed — ellipsis renders correctly |

### State Coverage

| State | In Figma | In Code | Status |
|-------|----------|---------|--------|
| Loading | yes | yes | PASS |
| Complete | yes | yes | PASS |
| Default | yes | yes | PASS |
| Hover | yes | yes | PASS |
| Active | yes | yes | PASS |

---

## 4. SidebarProfile — `4545:42646`

### Token Audit

| Layer | Property | Figma Token | Code | Status |
|-------|----------|-------------|------|--------|
| Container | gap | `--xs (8px)` | `gap-xs` | PASS |
| Container | padding-x | `--xxs (4px)` | `px-xxs` | PASS |
| Avatar | size | `32×32` | `w-8 h-8` | PASS |
| Avatar | radius | full | `rounded-full` | PASS |
| Avatar | bg | Gradient/Brand Gradient | hardcoded (no DS token) | WARN — documented |
| Initials | font | Title/S/Semibold | `font-display font-semibold text-s` | PASS |
| Initials | color | `--text--&-icon/onbrand` | `text-text-on-brand` | PASS |
| Name | font | Body/M/Regular | `font-body text-s font-normal` | PASS |
| Name | color | `--text--&-icon/secondary` | `text-text-secondary` | PASS |
| Lang label | font | Body/S/Regular | `font-body text-xs font-normal` | PASS |
| Lang label | color | `--text--&-icon/tertiary` | `text-text-tertiary` | PASS |
| Flag | color | `--base/base-300` | `text-base-300` | PASS |
| Hover bg | color | `--background/highlighted-tint-light` | `hover:bg-bg-tint-light` | PASS |

**Token summary: 12/13 PASS · 1 WARN (gradient — no DS token exists)**

### Visual Comparison

| Check | Status | Notes |
|-------|--------|-------|
| Expanded default | PASS | Avatar + name + flag + lang |
| Expanded hover | PASS | Tint bg + "Click to change" appears |
| Collapsed default | PASS | Stacked avatar + flag/lang |
| Collapsed hover | PASS | Same stacked layout, clickable |
| Flag emoji dynamic | PASS | FLAG_MAP switches per language prop |

### State Coverage

| State | In Figma | In Code | Status |
|-------|----------|---------|--------|
| Expanded Default | yes | yes | PASS |
| Expanded Hover | yes | yes | PASS |
| Collapsed | yes | yes | PASS |
| Collapsed Hover | yes | yes | PASS |
| onClick (language selector) | interaction | yes | PASS |

---

## 5. GameSelector — `172:32685`

### Token Audit

| Layer | Property | Figma Token | Code | Status |
|-------|----------|-------------|------|--------|
| Default container | bg | `--background/elements` | `bg-bg-elements` | PASS |
| Default container | border | `--border/tint` | `border-border-tint` | PASS |
| Default container | radius | `--xl (12px)` | `rounded-xl` | PASS |
| Default container | padding | `--xs (8px)` | `p-xs` | PASS |
| Default container | gap | `--xs (8px)` | `gap-xs` | PASS |
| Selected container | bg | `--background/highlighted-tint` | `bg-bg-tint` | PASS |
| Game icon | size | `40×40` | `w-[40px] h-[40px]` | PASS |
| Game icon | radius | `3.871px` | `rounded-[4px]` | PASS (≈1px acceptable) |
| Game icon | bg | `#1f1637` | `bg-[#1f1637]` | PASS (hardcoded in Figma) |
| Game name | font | Title/S/Semibold | `font-display text-s font-semibold` | PASS |
| Game name | color | `--text--&-icon/primary` | `text-text-primary` | PASS |
| Genre label | font | Label/Medium | `SidebarLabel` component | PASS |
| Arrow | position | `absolute right-[13px] centered` | `absolute right-[13px] top-1/2 -translate-y-1/2` | PASS |

**Token summary: 13/13 PASS**

### Visual Comparison

| Check | Status | Notes |
|-------|--------|-------|
| Default variant | PASS | Border + arrow + game info |
| List variant | PASS | No border, no bg, no arrow |
| Selected variant | PASS | Tint bg, subtle-focus label |
| Icon layered structure | PASS | Dark base + image overlay |

### State Coverage

| State | In Figma | In Code | Status |
|-------|----------|---------|--------|
| Default | yes | yes | PASS |
| List | yes | yes | PASS |
| Selected (Variant4) | yes | yes | PASS |
| onClick (dropdown) | interaction | yes | PASS |

---

## 6. GameSelectorDropdown — `172:32673`

### Token Audit

| Layer | Property | Figma Token | Code | Status |
|-------|----------|-------------|------|--------|
| Container | bg | `--background/elements` | `bg-bg-elements` | PASS |
| Container | border | `--border/subtle` | `border-border-subtle` | PASS |
| Container | radius | `--xl (12px)` | `rounded-xl` | PASS |
| Container | shadow | normal | `shadow-normal` | PASS |

**Token summary: 4/4 PASS**

### State Coverage

| State | In Figma | In Code | Status |
|-------|----------|---------|--------|
| Open (expanded sidebar) | yes | yes | PASS |
| Open (collapsed sidebar) | yes | yes | PASS |
| Item hover | implied | yes | PASS |

---

## 7. SidebarLabel — `5627:50767`

### Token Audit

| Layer | Property | Figma Token | Code | Status |
|-------|----------|-------------|------|--------|
| Font | style | Label/Medium | `font-display text-2xs font-medium uppercase tracking-[1.5px]` | PASS |
| Default | bg | `--background/subtle` | `bg-bg-subtle` | PASS |
| Default | text | `--text--&-icon/primary` | `text-text-primary` | PASS |
| Outlined | bg | `--background/highlighted-tint-light` | `bg-bg-tint-light` | PASS |
| Outlined | border | `--border/focus` | `border-border-focus` | PASS |
| Outlined | text | `--text--&-icon/secondary` | `text-text-secondary` | PASS |
| Muted | text | `--text--&-icon/secondary` | `text-text-secondary` | PASS |
| Subtle-focus | bg | `--background/elements` | `bg-bg-elements` | PASS |
| All | radius | `--semantic/tag (4px)` | `rounded-xs` | PASS |
| All | padding-x | `4px` | `px-xxs` | PASS |

**Token summary: 10/10 PASS**

---

## 8. LanguageSelector — `2565:52762`

### Token Audit

| Layer | Property | Figma Token | Code | Status |
|-------|----------|-------------|------|--------|
| Container | bg | `--background/elements` | `bg-bg-elements` | PASS |
| Container | border | `--border/subtle` | `border-border-subtle` | PASS |
| Container | radius | `--xl (12px)` | `rounded-xl` | PASS |
| Container | shadow | normal | `shadow-normal` | PASS |
| Header | font | Label/Medium | `font-display text-2xs font-medium uppercase tracking-[1.5px]` | PASS |
| Header | color | `--text--&-icon/tertiary` | `text-text-tertiary` | PASS |
| Option text | font | Body/M/Regular | `font-body text-s font-normal` | PASS |
| Option text | color | `--text--&-icon/primary` | `text-text-primary` | PASS |
| Selected bg | color | `--background/highlighted-tint-light` | `bg-bg-tint-light` | PASS |
| Hover bg | color | `--background/subtle` | `hover:bg-bg-subtle` | PASS |
| Checkmark | color | `--brand` | `text-brand` | PASS |

**Token summary: 11/11 PASS**

---

## Overall Summary

### Token Audit Totals

| Component | Pass | Fail | Warn | Total |
|-----------|------|------|------|-------|
| Sidebar | 12 | 0 | 0 | 12 |
| SidebarNavItem | 16 | 0 | 0 | 16 |
| SidebarTaskItem | 12 | 0 | 0 | 12 |
| SidebarProfile | 12 | 0 | 1 | 13 |
| GameSelector | 13 | 0 | 0 | 13 |
| GameSelectorDropdown | 4 | 0 | 0 | 4 |
| SidebarLabel | 10 | 0 | 0 | 10 |
| LanguageSelector | 11 | 0 | 0 | 11 |
| **Total** | **90** | **0** | **1** | **91** |

### Figma-Code Sync: 8/8 components fully synced

### State Coverage: All Figma-defined states implemented across all components

### Issues

| # | Severity | Component | Issue |
|---|----------|-----------|-------|
| 1 | WARN | SidebarProfile | Avatar gradient hardcoded — no CSS var in DS. Documented with comment. |

**Result: 90/91 PASS · 0 FAIL · 0 MISSING · 1 WARN**
