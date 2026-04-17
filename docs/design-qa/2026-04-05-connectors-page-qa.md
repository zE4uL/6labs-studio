# Design QA — Connectors Page
Date: 2026-04-05
Figma Frame Node: 6419:74784
Figma Section Node: 6419:74794 (body content)
Figma File: i9fxQ6pXrgRITEzopoXpWL

## Scope

| Component | Code File | @figmaNode |
|-----------|-----------|------------|
| ConnectorCard | molecules/ConnectorCard.tsx | 6419:74803 |
| ContextConnectorsView | organisms/ContextConnectorsView.tsx | 6419:74794 |
| AgentPageHeader | molecules/AgentPageHeader.tsx | 6418:100898 |
| ConnectorIcon | icons/ConnectorIcon.tsx | 20953:6131 |

## Frame Enumeration (Step 0)

| # | Frame Name | Node ID | Screenshotted |
|---|-----------|---------|---------------|
| 1 | Connector (default) | 6419:74784 | YES |

Only one frame exists for the Connectors page — no additional states (empty, loading, error) in Figma.

## Child Component Map (Step 1)

```
ContextConnectorsView (6419:74794)
  +-- AgentPageHeader (molecule, reused)
  |     +-- 72px gradient icon container
  |     +-- ConnectorIcon (from Apparatus, node 20953:6131)
  |     +-- Title: "Connectors" (Title/2XL/Bold)
  |     +-- Description (Body/S/Regular)
  +-- Card Grid
        +-- Row 1 (2-col): ConnectorCard x2
        +-- Row 2 (3-col): ConnectorCard x3
              +-- Brand icon (40x40, third-party logos -- not from Apparatus)
              +-- Name (Title/M/Semibold)
              +-- Description (Body/S/Regular)
              +-- "Connect" link (Button Label/Medium, opacity-0, fades in on hover)
```

Brand icons (AppsFlyer, Jira, Slack, Discord, Facebook Ads) are third-party logos -- correctly not sourced from Apparatus.

## Token Audit (Step 2)

| Layer | Property | Figma Token | Figma Fallback | Code Value | Status |
|-------|----------|-------------|----------------|------------|--------|
| Card bg | background | --background/elements | white | var(--bg-elements) = #FFF | PASS |
| Card border | border | --border/default | #CDCFD5 | var(--border-default) = #CDCFD5 | PASS |
| Card border-radius | radius | --xl | 12px | rounded-xl = 12px | PASS |
| Card padding | padding | --m | 16px | p-m = 16px | PASS |
| Card internal gap | gap | --s | 12px | gap-s = 12px | PASS |
| Card row gap | gap | 20px | -- | gap-l = 20px | PASS |
| Section row gap | gap | 20px | -- | gap-l = 20px | PASS |
| **Header-to-grid gap** | **gap** | **60px** | -- | **mt-xxl = 32px** | **FAIL** |
| **Header icon gradient** | **background** | **134.4deg, cyan to purple** | -- | **135deg, #7B4CFF to #9873FF** | **FAIL** |
| **Card name color** | **text color** | **--base/base---700** | **#353D57** | **var(--text-primary) = #030D2D** | **FAIL** |
| Card desc color | text color | --text-&-icon/secondary | #4F566C | var(--text-secondary) = #4F566C | PASS |
| Connect link color | text color | --link/text/default | #1770EF | var(--brand) = #1770EF | WARN |
| Icon container radius | radius | --m | 8px | rounded-m = 8px | PASS |
| Icon container size | size | 40px | -- | size-[40px] | PASS |
| Hover border | border-color | -- | -- | var(--brand-hover) = #4D8FF5 | PASS |
| Hover shadow | shadow | -- | -- | var(--shadow-normal) | PASS |
| Hover bg | background | -- | -- | var(--bg-card) = #FFF | PASS |
| Connect btn opacity | opacity | 0 (default) | -- | opacity-0 + group-hover:opacity-100 | PASS |
| Header gap | gap | 24px (flex) | -- | gap-xl = 24px | PASS |

**Summary:** 15/18 PASS, 3 FAIL, 1 WARN.

## CSS Variable Existence Check (Step 2b)

| Variable | Defined in globals.css | Status |
|----------|----------------------|--------|
| --bg-elements | YES (#FFFFFF) | PASS |
| --border-default | YES (#CDCFD5) | PASS |
| --text-primary | YES (#030D2D) | PASS |
| --text-secondary | YES (#4F566C) | PASS |
| --brand | YES (#1770EF) | PASS |
| --brand-hover | YES (#4D8FF5) | PASS |
| --shadow-normal | YES (0px 4px 16px rgba(0,0,0,0.08)) | PASS |
| --bg-card | YES (#FFFFFF) | PASS |
| --success | YES (#16A34A) | PASS |
| --success-bg | YES (rgba(22,163,74,0.07)) | PASS |

All CSS variables exist and resolve correctly.

## Inline Style Specificity Check (Step 2c)

| Element | Has inline style | Has CSS :hover/:focus | Conflict? | Status |
|---------|-----------------|----------------------|-----------|--------|
| Card name `<span>` | style={{ color: var(--text-primary) }} | No text hover in CSS | No | PASS |
| Card desc `<p>` | style={{ color: var(--text-secondary) }} | No text hover in CSS | No | PASS |
| Connect link `<span>` | style={{ color: var(--brand) }} | No text hover in CSS | No | PASS |
| Card root `<div>` | No inline style | .connector-card:hover (border, shadow, bg) | No | PASS |

No inline-vs-pseudo conflicts.

## Style Binding Audit (Step 3)

| Layer | Style Type | Figma Style | Code Equivalent | Status |
|-------|-----------|-------------|-----------------|--------|
| Page title | Text | Title/2XL/Bold (32px, Bricolage, 700) | font-display text-2xl font-extrabold | PASS |
| Page desc | Text | Body/S/Regular (14px, Inter, 400) | font-body text-s text-base-700 | PASS |
| Card name | Text | Title/M/Semibold (16px, Bricolage, 600) | font-display text-m font-semibold | PASS |
| Card desc | Text | Body/S/Regular (14px, Inter, 400) | font-body text-s leading-[1.5] | PASS |
| Connect link | Text | Button Label/Medium (12px, Bricolage, 600) | font-display text-xs font-semibold | PASS |

**Summary:** 5/5 text styles match Apparatus bindings.

## Visual Screenshot Comparison (Step 4)

### Frame 1: Connector (default) — 6419:74784

| Check | Status | Notes |
|-------|--------|-------|
| Overall layout | PASS | 800px centered content, correct 2+3 grid |
| **Header icon gradient** | **FAIL** | Figma: cyan (#2FD2FF) to purple (#BD61FF). Code: purple (#7B4CFF) to purple (#9873FF). Completely different gradient. |
| **Header-to-grid spacing** | **FAIL** | Figma: 60px. Code: 32px (mt-xxl). Cards sit 28px too close to header. |
| **Card name darkness** | **FAIL** | Figma: #353D57 (base-700). Code: #030D2D (text-primary). Names appear too dark. |
| Card border/radius | PASS | 1px solid, 12px radius matches |
| Card background | PASS | White, matching --bg-elements |
| Card descriptions | PASS | Color, size, line-height all match |
| Grid columns | PASS | Row 1: 2-col equal, Row 2: 3-col equal |
| Row spacing | PASS | 20px between rows matches gap-l |
| Icon containers | PASS | 40x40, rounded-m (8px), overflow hidden |
| Connect link position | PASS | Bottom-right, opacity-0, self-end |
| Typography hierarchy | PASS | Bricolage for names/links, Inter for descriptions |
| **Figma typo** | **WARN** | Figma says "Slacks", code correctly says "Slack" |

**Rendered screenshot:** NOT AVAILABLE (dev server not running). Visual comparison based on code analysis + Figma screenshot.

## State Coverage (Step 5)

ConnectorCard IS a component_set (node 5448:45729) with 2 variants: Default and Hover.

| State | In Figma | In Code | Status |
|-------|----------|---------|--------|
| Default | YES (opacity-0 on button) | YES (.connector-card base styles) | PASS |
| Hover | YES (variant 5448:45745) — "View Details" + arrow icon, shadow-big, brand-hover border | YES (.connector-card:hover, group-hover:opacity-100) | **FIXED** |
| Connected | NOT SHOWN | YES (connected prop, CONNECTED badge) | N/A |

**Hover variant details (5448:45745):**
- Button label: "View Details" (NOT "Connect")
- Button includes right arrow icon (R Icon) — 12x10 SVG arrow
- Border: `--interactive/brandhover` (#4D8FF5)
- Shadow: `shadow-big` (0px 8px 24px rgba(0,0,0,0.08)), NOT shadow-normal
- Button visible (opacity removed)

## Icon Accuracy (Step 6)

| Icon | Source | Status |
|------|--------|--------|
| ConnectorIcon (header) | Apparatus Library, node 20953:6131 | PASS |
| AppsFlyerIcon | Third-party brand SVG | PASS (not from Apparatus -- correct) |
| JiraIcon | Third-party brand SVG | PASS |
| SlackIcon | Third-party brand SVG | PASS |
| DiscordIcon | Third-party brand SVG | PASS |
| FacebookAdsIcon | Third-party brand SVG | PASS |

No hand-drawn icons. Brand icons correctly sourced as custom SVGs.

## Cross-Platform Rendering (Step 7)

| Check | Status | Notes |
|-------|--------|-------|
| Emoji flags | PASS | No emoji used |
| Custom fonts loaded | PASS | Google Fonts import for Bricolage, Inter, Roboto Mono |
| System font fallback | PASS | sans-serif fallback in font-display/font-body |

## Component Composition (Step 8)

| Check | Status | Notes |
|-------|--------|-------|
| AgentPageHeader reuse | PASS | Existing molecule used, not rebuilt |
| ConnectorCard abstraction | PASS | Proper component with props (icon, name, desc, connected) |
| Tailwind hover: with CSS vars | PASS | Hover handled via CSS class (.connector-card:hover), not Tailwind hover: prefix |
| Grid vs Flex layout | PASS | CSS Grid used for equal-width cards (matches Figma flex-1 behavior) |

## Interaction & Overflow Audit (Step 9)

| Check | Status | Notes |
|-------|--------|-------|
| Card click handler | PASS | onClick={onConnect}, role="button", tabIndex={0} |
| Overflow clipping | PASS | No overlays or popovers on this page |
| No destructive actions | N/A | "Connect" is non-destructive |
| Keyboard accessibility | PASS | tabIndex={0} for keyboard navigation |

---

## Issues to Fix

### FAIL-1: Header icon gradient (Severity: HIGH) — FIXED
- **File:** `organisms/ContextConnectorsView.tsx:78`
- **Figma:** `linear-gradient(134.4deg, rgb(47, 210, 255) 1%, rgb(189, 97, 255) 99.5%)`
- **Was:** `linear-gradient(135deg, #7B4CFF 0%, #9873FF 100%)`
- **Fix applied:** Changed to `linear-gradient(135deg, #2FD2FF 0%, #BD61FF 100%)`

### FAIL-2: Header-to-card-grid spacing (Severity: MEDIUM) — FIXED
- **File:** `organisms/ContextConnectorsView.tsx:83`
- **Figma:** 60px gap between header and card grid
- **Was:** `mt-xxl` = 32px
- **Fix applied:** Changed to `mt-[60px]`

### FAIL-3: Card name text color (Severity: MEDIUM) — OPEN
- **File:** `molecules/ConnectorCard.tsx:51`
- **Figma:** `--base/base---700` = `#353D57`
- **Code:** `var(--text-primary)` = `#030D2D`
- **Impact:** Card names appear darker than design intent.
- **Recommended fix:** Change `style={{ color: 'var(--text-primary)' }}` to `className="text-base-700"`

### FAIL-4: Hover button label + arrow icon (Severity: HIGH) — FIXED
- **File:** `molecules/ConnectorCard.tsx:71-80`, `styles/globals.css:283`
- **Figma hover variant (5448:45745):** "View Details" text + right arrow SVG icon, shadow-big
- **Was:** "Connect" text only, no icon, shadow-normal
- **Fix applied:**
  - Changed label from "Connect" to "View Details"
  - Added right arrow SVG icon (12x10, currentColor stroke)
  - Changed hover shadow from `--shadow-normal` to `--shadow-big`

### WARN-1: Connect link token semantics
- **File:** `molecules/ConnectorCard.tsx:74`
- **Figma:** `--link/text/default` (#1770EF)
- **Code:** `var(--brand)` (#1770EF)
- **Impact:** Same visual result but wrong semantic intent.
- **Recommendation:** Define `--link-text-default` in globals.css or accept current value.

### WARN-2: Figma typo "Slacks"
- **Source:** Figma node 6419:74806
- **Impact:** None in code (correctly says "Slack"). Figma source should be updated.
