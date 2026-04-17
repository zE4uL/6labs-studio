# Design QA — Sidebar Header
Date: 2026-04-05
Figma Node: 2466:48872
Figma File: i9fxQ6pXrgRITEzopoXpWL
Code File: src/components/organisms/Sidebar.tsx (lines 162-200)

## Figma-Code Sync

The header is implemented inline within `Sidebar.tsx`, not as a standalone component. Sync headers are on the parent Sidebar:

| Field | Value | Status |
|-------|-------|--------|
| `@figmaComponent` | Sidebar | PASS |
| `@figmaNode` | 6411:733380 | PASS (parent) |
| `@figmaFile` | i9fxQ6pXrgRITEzopoXpWL | PASS |
| `@figmaUrl` | https://www.figma.com/design/i9fxQ6pXrgRITEzopoXpWL/6labs?node-id=6411-733380 | PASS |

Note: The header does not have its own `@figmaNode`. The Figma "Sidebar Header" component exists at `2466:48872` but is embedded in the parent Sidebar component set. No separate sync header needed since it's inline.

## Token Audit

| Layer | Property | Figma Token | Figma Value | Code | Status |
|-------|----------|-------------|-------------|------|--------|
| Container | height | — | 56px | `h-[56px]` | PASS |
| Container (expanded) | padding-left | `--s` | 12px | `pl-s` | PASS |
| Container (expanded) | padding-right | `--l` | 20px | `pr-l` | PASS |
| Container (expanded) | padding-y | `--s` | 12px | `py-s` | PASS |
| Container (collapsed) | padding | `--s` | 12px | `p-s` | PASS |
| Container | layout | — | flex, justify-between, center | `flex items-center justify-between` | PASS |
| Logo group | gap | — | 6px | `gap-[6px]` | PASS |
| LogoMark | size | — | 40px | `size={40}` | PASS |
| LogoType | dimensions | — | 103×22px | `width="103" height="22"` | PASS |
| Icon button | size | — | 24×24px | `w-6 h-6` + `size={24}` | PASS |
| Icon button | color | — | tertiary | `text-text-tertiary` | ~~FAIL~~ FIXED — now uses `.sidebar-icon-hover` CSS class |
| Icon button | hover color | — | secondary | `hover:text-text-secondary` | ~~FAIL~~ FIXED — now uses `.sidebar-icon-hover:hover` |

**Summary:** 12/12 auditable properties match after fix.

## Style Binding Audit

The header contains no text layers — the logo is rendered as inline SVG `<text>` (LogoType) and SVG paths (LogoMark). No Apparatus text styles or color styles apply to brand marks.

| Layer | Style Type | Figma Style | Source | Code Equivalent | Status |
|-------|-----------|-------------|--------|-----------------|--------|
| (none) | — | — | — | — | N/A — header has no styled text layers |

**Summary:** No text or color styles to audit. Brand marks use fixed fills (expected).

## Visual Comparison

Figma screenshot captured from node `2466:48872`. Code screenshot not available (dev server not running — user should verify visually).

| Check | Status | Notes |
|-------|--------|-------|
| Overall layout | PASS | flex row, justify-between, items-center matches across all 3 variants |
| Spacing/gaps | PASS | `pl-s pr-l py-s` (expanded), `p-s` (collapsed) match Figma exactly |
| Logo dimensions | PASS | LogoMark 40px, LogoType 103×22px dimensions match |
| LogoMark SVG paths | **FAIL** | Hand-drawn SVG approximation — paths may not pixel-match Figma vector. Needs Figma SVG export |
| LogoType rendering | **FAIL** | Uses SVG `<text>` (font-dependent) instead of vector outlines from Figma. Rendering varies by OS/browser |
| Icon sizing | PASS | 24×24 container, icon fills correctly |
| Collapse/expand icon structure | PASS | Panel-with-chevron motif matches Figma |
| Collapsed-hover behavior | ~~FAIL~~ FIXED | Was: logo stays visible + icon fades in. Now: logo swaps out, icon replaces it (matches Figma) |
| Container height | PASS | 56px matches |

**Note:** Code screenshot required from user to confirm pixel-level accuracy after fixes.

## State Coverage

| State | In Figma | In Code | Status |
|-------|----------|---------|--------|
| Expanded | Yes — full logo + collapse icon | Yes — renders FullLogo + CollapseIcon | PASS |
| Collapsed | Yes — LogoMark only, no icon visible | Yes — renders LogoMark only | PASS |
| Collapsed-Hover | Yes — expand icon only, **no logo** | ~~FAIL~~ FIXED — logo now hides, only ExpandIcon shown | PASS |
| Hover (expanded) | No | — | N/A |
| Disabled | No | — | N/A |

**Summary:** All 3 Figma variants now correctly implemented after fix.

## Icon / Asset Accuracy

| Asset | Source | Matches Figma | Notes |
|-------|--------|---------------|-------|
| LogoMark | Inline SVG paths (hand-drawn) | **No — approximate** | SVG paths are a manual approximation, not an export from Figma node `4697:36847`. Proportions and path data may differ. Replace with Figma SVG export |
| LogoType | Inline SVG `<text>` | **No — font-rendered** | Uses `<text>` element with Bricolage Grotesque font. Figma uses vector outlines (node `5035:128050`). Replace with Figma SVG export for exact match |
| CollapseIcon | Hand-drawn SVG (`CollapseIcon.tsx`) | Visual match | Panel rect (3,3,18,18) + divider + inward chevron. strokeWidth 1.5 |
| ExpandIcon | Hand-drawn SVG (`ExpandIcon.tsx`) | Visual match | Same panel structure + outward chevron. strokeWidth 1.5 |

## Issues — Fixed

1. **[FIXED] Icon hover color** — Replaced `hover:text-text-secondary` with `.sidebar-icon-hover` CSS class in `globals.css`.
2. **[FIXED] Collapsed-hover behavior** — Logo now disappears on hover, only expand icon shown. Matches Figma `Collapsed-Hover` variant where the logo is absent and only the expand icon is rendered.

## Issues — Remaining

3. **[FAIL] LogoMark SVG** — Hand-drawn SVG paths are an approximation. Export the exact SVG from Figma node `4697:36847` (`Right-click > Copy as SVG` in Figma) and replace the `LogoMark` component's paths.
4. **[FAIL] LogoType SVG** — Uses `<text>` element (font-dependent rendering). Export the exact SVG from Figma node `5035:128050` and replace the `LogoType` component with vector outlines for pixel-perfect cross-platform rendering.

---

**Overall:** 2 issues fixed (hover pattern, collapsed-hover state swap). 2 issues remaining (logo SVG exports needed from Figma). Token parity is strong. Behavioral parity now matches all 3 Figma variants.
