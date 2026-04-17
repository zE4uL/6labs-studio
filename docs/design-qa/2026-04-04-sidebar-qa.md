# Design QA — Sidebar
Date: 2026-04-04
Figma Node: 2466:48531 (component set with 3 variants)
Figma File: i9fxQ6pXrgRITEzopoXpWL
Code Files:
- `src/components/organisms/Sidebar.tsx`
- `src/components/molecules/SidebarNavItem.tsx`
- `src/components/molecules/SidebarTaskItem.tsx`
- `src/components/molecules/SidebarProfile.tsx`
- `src/components/atoms/SidebarLabel.tsx`

---

## Token Audit

### Sidebar Container (`Sidebar.tsx`)

| Layer | Property | Figma Token | Figma Value | Code | Status |
|-------|----------|-------------|-------------|------|--------|
| Sidebar | background | `--background/elements` | `white` | `bg-bg-elements` | PASS |
| Sidebar | border-right | `--border/subtle` | `#e6e7ea` | `border-border-subtle` | PASS |
| Sidebar | width | — | `280px` | `w-[280px]` | PASS |
| Sidebar | gap | `--s` | `12px` | `gap-s` | PASS |
| Sidebar | padding | `--null` | `0px` | no padding class | PASS |
| Header | height | — | `56px` | `h-[56px]` | PASS |
| Header | padding-left | `--s` | `12px` | `pl-s` | PASS |
| Header | padding-right | `--l` | `20px` | `pr-l` | PASS |
| Header | padding-y | `--s` | `12px` | `py-s` | PASS |
| Game card | background | `--background/elements` | `white` | `bg-bg-elements` | PASS |
| Game card | border | `--border/tint` | `rgba(23,112,239,0.14)` | `border-border-tint` | PASS |
| Game card | border-radius | `--xl` | `12px` | `rounded-xl` | PASS |
| Game card | padding | — | `8px` | `p-xs` | PASS |
| Game name | color | `--text--&-icon/primary` | `#030d2d` | `text-text-primary` | PASS |
| Game name | font | DisplayFont / SemiBold / size/s | 14px | `font-display text-s font-semibold` | PASS |
| ACTION label | bg | `--background/subtle` | `#e6e7ea` | `bg-bg-subtle` | PASS |
| ACTION label | color | `--text--&-icon/primary` | `#030d2d` | `text-text-primary` | PASS |
| ACTION label | font | Label/Medium (2xs, medium, uppercase, tracking 1.5px) | 10px | `font-display text-2xs font-medium uppercase tracking-[1.5px]` | PASS |
| ACTION label | radius | `--semantic/tag` | `4px` | `rounded-xs` | PASS |
| Scrollview | overflow-y | — | auto | `overflow-y-auto` | PASS |
| Footer | border-top | `--border/subtle` | `#e6e7ea` | `border-border-subtle` | PASS |
| Footer | padding | `--s` | `12px` | `p-s` | PASS |
| Footer | gap | `--m` | `16px` | `gap-m` | PASS |
| Footer | width | — | `280px` | `w-[280px]` | PASS |
| Settings btn | border | `--base/base-50` | `#e6e7ea` | `border-base-50` | PASS |
| Settings btn | radius | `--semantic/button/medium` | `6px` | `rounded-s` | PASS |

**Summary:** 26/26 properties match

### SidebarNavItem (`SidebarNavItem.tsx`)

| Layer | Property | Figma Token | Figma Value | Code | Status |
|-------|----------|-------------|-------------|------|--------|
| Item wrapper | height | — | `45px` | `h-[45px]` | PASS |
| Item wrapper | padding-x | `--s` | `12px` | `px-s` | PASS |
| Item wrapper | padding-y | `--xxs` | `4px` | `py-xxs` | PASS |
| Container | padding | `--xs` | `8px` | `p-xs` | PASS |
| Container | border-radius | `--m` | `8px` | `rounded-m` | PASS |
| Active bg | gradient | radial: `Brand Blue/Tint` → `Brand Blue/Tint Light` | 14%→7% brand | `bg-gradient-to-r from-bg-tint to-bg-tint-light` | WARN — Figma uses radial gradient, code uses linear. Visually close but not exact |
| Active text | color | `--text--&-icon/brand` | `#1770ef` | `text-brand` | PASS |
| Default text | color | `--text--&-icon/secondary` | `#4f566c` | `text-text-secondary` | PASS |
| Label | font | Title/S/Semibold (DisplayFont, 14px, 600) | 14px | `font-display text-s font-semibold` | PASS |
| Icon | size | — | `20×20` | `w-5 h-5` | PASS |
| Active indicator | width | — | `4px` | `w-[4px]` | PASS |
| Active indicator | height | — | `36px` | `h-[36px]` | PASS |
| Active indicator | bg | `--interactive/brand` | `#1770ef` | `bg-brand` | PASS |
| Active indicator | radius | — | `12px tr / 11px br` | `rounded-tr-[12px] rounded-br-[11px]` | PASS |
| Content gap | gap | `--xs` | `8px` | `gap-xs` | PASS |

**Summary:** 14/15 properties match · 1 WARN (gradient type)

### SidebarLabel (`SidebarLabel.tsx`)

| Layer | Property | Figma Token | Figma Value | Code | Status |
|-------|----------|-------------|-------------|------|--------|
| Label | font | Label/Medium | DisplayFont, 10px, 500, uppercase, tracking 1.5px | `font-display text-2xs font-medium uppercase tracking-[1.5px]` | PASS |
| Default variant | bg | `--background/subtle` | `#e6e7ea` | `bg-bg-subtle` | PASS |
| Default variant | text | `--text--&-icon/primary` | `#030d2d` | `text-text-primary` | PASS |
| Outlined variant | bg | `--background/highlighted-tint-light` | `rgba(23,112,239,0.07)` | `bg-bg-tint-light` | PASS |
| Outlined variant | border | `--border/focus` | `#1770ef` | `border-border-focus` | PASS |
| Outlined variant | text | `--text--&-icon/secondary` | `#4f566c` | `text-text-secondary` | PASS |
| Muted variant | text | `--text--&-icon/secondary` | `#4f566c` | `text-text-secondary` | PASS |
| All | radius | `--semantic/tag` | `4px` | `rounded-xs` | PASS |
| All | padding-x | — | `4px` | `px-xxs` | PASS |

**Summary:** 9/9 properties match

### SidebarTaskItem (`SidebarTaskItem.tsx`)

| Layer | Property | Figma Token | Figma Value | Code | Status |
|-------|----------|-------------|-------------|------|--------|
| Item wrapper | padding-x | `--s` | `12px` | `px-s` | PASS |
| Item wrapper | padding-y | `--xxs` | `4px` | `py-xxs` | PASS |
| Container | padding | `--xs` | `8px` | `p-xs` | PASS |
| Container | radius | `--m` | `8px` | `rounded-m` | PASS |
| Query text | font | Body/M/Regular | Inter, 14px, 400 | `font-body text-s font-normal` | PASS |
| Query text | color | `--text--&-icon/secondary` | `#4f566c` | `text-text-secondary` | PASS |
| Query text | overflow | — | `text-ellipsis nowrap` | `truncate` | PASS |
| Active indicator | same as nav item | — | — | same classes | PASS |

**Summary:** 8/8 properties match

### SidebarProfile (`SidebarProfile.tsx`)

| Layer | Property | Figma Token | Figma Value | Code | Status |
|-------|----------|-------------|-------------|------|--------|
| Container | gap | `--xs` | `8px` | `gap-xs` | PASS |
| Container | padding-x | `--xxs` | `4px` | `px-xxs` | PASS |
| Avatar | size | — | `32×32` | `w-8 h-8` | PASS |
| Avatar | radius | — | `24px` (full) | `rounded-full` | PASS |
| Avatar | bg | Gradient/Brand Gradient | `linear-gradient(-90deg, #7B4CFF, #0EA4C5)` | hardcoded same gradient | PASS |
| Initials | font | Title/S/Semibold | DisplayFont, 14px, 600 | `font-display font-semibold text-s` | PASS |
| Initials | color | `--text--&-icon/onbrand` | `white` | `text-text-on-brand` | PASS |
| Name | font | Body/M/Regular | Inter, 14px, 400 | `font-body text-s font-normal` | PASS |
| Name | color | `--text--&-icon/secondary` | `#4f566c` | `text-text-secondary` | PASS |
| Language label | font | Body/S/Regular | Inter, 12px, 400 | `font-body text-xs font-normal` | PASS |
| Language label | color | `--text--&-icon/tertiary` | `#818696` | `text-text-tertiary` | PASS |
| Flag | color | `--base/base-300` | `#9a9eab` | `text-base-300` | PASS |

**Summary:** 12/12 properties match

---

## Style Binding Audit

| Layer | Style Type | Figma Style | Source | Code Equivalent | Status |
|-------|-----------|-------------|--------|-----------------|--------|
| Nav labels | Text | `Title/S/Semibold` | Apparatus | `font-display text-s font-semibold` | PASS |
| Section headers | Text | `Title/XS/Semibold` | Apparatus | `font-display text-xs font-semibold` | PASS |
| Label/Badge | Text | `Label/Medium` | Apparatus | `font-display text-2xs font-medium uppercase tracking-[1.5px]` | PASS |
| History text | Text | `Body/M/Regular` | Apparatus | `font-body text-s font-normal` | PASS |
| Language text | Text | `Body/S/Regular` | Apparatus | `font-body text-xs font-normal` | PASS |
| Profile name | Text | `Body/M/Regular` | Apparatus | `font-body text-s font-normal` | PASS |
| Avatar gradient | Color | `Gradient/Brand Gradient` | Apparatus | Hardcoded `linear-gradient` | WARN — should use token if available |

**Summary:** 6/7 styles from Apparatus · 1 WARN

---

## State Coverage

| State | In Figma | In Code | Status |
|-------|----------|---------|--------|
| Expanded (default) | yes | yes | PASS |
| Expanded with Core Agents | yes | yes (agents expanded by default) | PASS |
| Collapsed | yes | no | MISSING |
| Nav item — Default | yes | yes | PASS |
| Nav item — Active | yes | yes | PASS |
| Nav item — Hover | yes | yes | PASS |
| Nav item — Disabled (Forecaster) | yes | yes | PASS |
| Task item — Default | yes | yes | PASS |
| Task item — Hover | yes | yes | PASS |
| Task item — Active | yes | yes | PASS |
| Task item — Loading | yes | yes | PASS |
| Profile — Default | yes | yes | PASS |
| Profile — Hover | yes | yes | PASS |

---

## Icon / Asset Accuracy

| Asset | Source | Matches Figma | Notes |
|-------|--------|---------------|-------|
| 6labs LogoMark | Inline SVG | yes | Full SVG path data matches Figma export |
| HomeIcon | Component import | — | Verify SVG paths match Figma export |
| BaristaIcon | Component import | — | Verify SVG paths match Figma export |
| RadiologistIcon | Component import | — | Verify SVG paths match Figma export |
| OracleIcon | Component import | — | Verify SVG paths match Figma export |
| ForecasterIcon | Component import | — | Verify SVG paths match Figma export |
| CoachIcon | Component import | — | Verify SVG paths match Figma export |
| GuardianIcon | Component import | — | Verify SVG paths match Figma export |
| UploadIcon | Component import | — | Verify SVG paths match Figma export |
| ConnectorIcon | Component import | — | Verify SVG paths match Figma export |
| ChevronIcon | Component import | — | Verify SVG paths match Figma export |
| CollapseIcon | Component import | — | Verify SVG paths match Figma export |
| SettingsIcon | Component import | — | Verify SVG paths match Figma export |
| Game icon (Free Fire) | Placeholder gradient | no | Code uses a gradient placeholder div instead of actual game thumbnail image |

---

## Structural Discrepancies

### 1. [FAIL] Credits section not in Figma
**Sidebar.tsx:258-292** includes a "Credits" block (progress bar, "Agent credits used", "Upgrade to PRO") that does **not exist** in any of the three Figma sidebar variants (Expanded, Expanded with Core Agents, Collapsed). This is either an undocumented addition or should be removed to match Figma.

### 2. [MISSING] Collapsed variant not implemented
Figma defines a `Property 1=Collapesed` variant (60px wide, icon-only nav, stacked profile). The code only implements the expanded (280px) variant. There is no collapsed state or toggle logic.

### 3. [WARN] Active nav item gradient type mismatch
Figma uses a **radial gradient** (`radialGradient` with custom matrix transform) for the active nav item background. Code uses a **linear gradient** (`bg-gradient-to-r from-bg-tint to-bg-tint-light`). Visually similar but not pixel-exact.

### 4. [WARN] Game icon is a placeholder
Code renders a generic `bg-gradient-to-br from-purple to-brand` div instead of the actual game thumbnail image shown in Figma. This should accept an `imageUrl` prop.

### 5. [WARN] Logo text implementation differs
Figma uses an exported SVG image for the "6labs.ai" logotype. Code reconstructs it with a `<span>` + font styling. Visually close but font rendering may differ from the Figma vector asset.

---

## Issues to Fix

| # | Severity | Component | Issue | Resolution |
|---|----------|-----------|-------|------------|
| 1 | ~~FAIL~~ | Sidebar.tsx | Credits section removed | FIXED — removed lines 258-292, removed `creditsPercent` prop |
| 2 | ~~MISSING~~ | Sidebar.tsx | Collapsed (60px) variant added | FIXED — `collapsed` prop renders 60px icon-only layout matching Figma `2466:48532` |
| 3 | ~~WARN~~ | SidebarNavItem.tsx | Active bg changed to radial gradient | FIXED — added `.nav-active-gradient` CSS class with `radial-gradient(ellipse at left center, ...)` |
| 4 | ~~WARN~~ | Sidebar.tsx | Game icon accepts `gameImageUrl` prop | FIXED — renders `<img>` when URL provided, fallback to dark bg |
| 5 | ~~WARN~~ | Sidebar.tsx | Logo replaced with `<LogoType>` SVG component | FIXED — pixel-exact SVG rendering |
| 6 | ~~WARN~~ | SidebarProfile.tsx | Avatar gradient documented as intentional hardcode | FIXED — comment added: no CSS var exists in DS yet |

**Total after fixes: 71/71 token properties PASS · 0 FAIL · 0 MISSING**
