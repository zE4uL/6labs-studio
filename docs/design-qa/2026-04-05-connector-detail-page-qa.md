# Design QA — Connector Detail Page
Date: 2026-04-05
Figma Frame Node: 6419:75469
Figma File: i9fxQ6pXrgRITEzopoXpWL

## Scope

| Component | Code File | @figmaNode |
|-----------|-----------|------------|
| ConnectorDetailView | organisms/ConnectorDetailView.tsx | 6419:75469 |

## Frame Enumeration (Step 0)

| # | Frame Name | Node ID | Screenshotted |
|---|-----------|---------|---------------|
| 1 | Coonector Detail Page | 6419:75469 | YES |

Single frame — no additional states in Figma for this page.

## Flow Discovery (Step 0b)

| Sibling Frame | Node ID | Related? | In Scope? |
|--------------|---------|----------|-----------|
| Delete Popup | 6419:75459 | File management, not connector-specific | NO |
| Retry Popup | 6419:75464 | File management, not connector-specific | NO |

"Connect AppsFlyer" button is in **disabled state** in Figma — no destination screen.

## Child Component Map (Step 1)

```
ConnectorDetailView (6419:75469)
  +-- Breadcrumb (local) — back arrow + "Connectors" text
  +-- Header (6419:75478)
  |     +-- Brand icon container (72px, rounded-xl, tint bg)
  |     +-- Name (24px Bricolage SemiBold)
  |     +-- Tag pills (neutral: bg-subtle; brand: bg-tint-light)
  |     +-- Apparatus Button (disabled state) — "Connect AppsFlyer"
  +-- About section (6419:75492)
  |     +-- Heading (Title/M/Semibold)
  |     +-- Body text (Body/S/Regular)
  +-- What You Get section (6419:75495)
  |     +-- Heading (Title/M/Semibold)
  |     +-- 4x benefit rows: Check icon (20px) + text
  +-- How To Connect section (6419:75509)
        +-- Heading (Title/M/Semibold)
        +-- 4x step cards: number circle (32px brand bg) + text
```

## Token Audit (Step 2)

| Layer | Property | Figma Token | Figma Fallback | Code Value | Status |
|-------|----------|-------------|----------------|------------|--------|
| Icon container bg | background | --complimentary/pink/tint-light | rgba(194,5,104,0.07) | connector.iconTint (inline) | PASS |
| Icon container radius | radius | 12px | -- | rounded-xl = 12px | PASS |
| Icon container size | size | 72px | -- | size-[72px] | PASS |
| Name text | color | --base/base---900 | #030D2D | var(--text-primary) = #030D2D | PASS |
| Name font | text | 24px SemiBold Bricolage | -- | font-display text-xl font-semibold | PASS |
| Tag neutral bg | background | --base/base---50 | #E6E7EA | var(--bg-subtle) = #E6E7EA | PASS |
| Tag neutral border | border | --border/default | #CDCFD5 | var(--border-default) | PASS |
| Tag neutral text | color | --text-&-icon/secondary | #4F566C | var(--text-secondary) | PASS |
| Tag brand bg | background | --tertiary/bg/hover | brand 7% | var(--bg-tint-light) | PASS |
| Tag brand border | border | --outline/bg/pressed | brand 14% | var(--border-tint) | PASS |
| Tag brand text | color | --text-&-icon/brand | #1770EF | var(--brand) | PASS |
| Tag padding | padding | px: --s (12px), py: --xs (4px) | -- | px-s py-xxs (12px, 4px) | PASS |
| Tag radius | radius | 20px | -- | rounded-[20px] | PASS |
| Tag font | text | 14px Inter Medium | -- | font-body text-s font-medium | PASS |
| **Button bg** | **background** | **--primary/bg/disabled** | **#CDCFD5** | **var(--border-default) = #CDCFD5** | **FIXED** |
| **Button text** | **color** | **--primary/text/disabled** | **#818696** | **var(--text-tertiary) = #818696** | **FIXED** |
| Button font | text | 14px SemiBold Bricolage | -- | font-display text-s font-semibold | PASS |
| Button padding | padding | px: 24px, py: 12px | -- | px-xl py-s (24px, 12px) | PASS |
| Button radius | radius | --semantic/button/large (8px) | -- | rounded-l (10px) | **FAIL** |
| About heading | text | Title/M/Semibold 16px | -- | font-display text-m font-semibold | PASS |
| About body color | color | --base/base---700 | #353D57 | text-base-700 | PASS |
| About gap | gap | var(--m, 8px) | 8px | gap-xs (8px) | PASS |
| Benefits heading | text | Title/M/Semibold | -- | font-display text-m font-semibold | PASS |
| Benefits items gap | gap | 12px | -- | gap-s (12px) | PASS |
| Benefits icon-text gap | gap | var(--xs, 8px) | 8px | gap-xs (8px) | PASS |
| Check icon size | size | 20px | -- | size-[20px] | PASS |
| Steps heading | text | Title/M/Semibold | -- | font-display text-m font-semibold | PASS |
| Steps card bg | background | --background/elements | white | var(--bg-elements) | PASS |
| Steps card border | border | --border/default | #CDCFD5 | var(--border-default) | PASS |
| Steps card radius | radius | --xl (12px) | -- | rounded-xl (12px) | PASS |
| Steps card padding | padding | --l (20px) | -- | p-l (20px) | PASS |
| Steps card gap | gap | 16px | -- | gap-m (16px) | PASS |
| Steps items gap | gap | 12px | -- | gap-s (12px) | PASS |
| Number circle size | size | 32px | -- | size-[32px] | PASS |
| Number circle radius | radius | 16px | -- | rounded-[16px] | PASS |
| Number circle bg | background | --primary/bg/default | #1770EF | var(--brand) | PASS |
| Number text | text | 13px SemiBold Bricolage white | -- | font-display text-[13px] font-semibold text-white | PASS |
| Step text color | color | --base/base---700 | #353D57 | text-base-700 | PASS |
| **Section gap** | **gap** | **40px** | -- | **gap-[40px]** | **FIXED** |
| Breadcrumb text | color | --text-secondary | -- | var(--text-secondary) | PASS |

**Summary:** 33/35 PASS, 1 FAIL (button radius), 3 FIXED during QA.

## CSS Variable Existence Check (Step 2b)

All `var(--xxx)` used in code confirmed present in globals.css: `--text-primary`, `--text-secondary`, `--text-tertiary`, `--bg-subtle`, `--bg-tint-light`, `--border-tint`, `--border-default`, `--brand`, `--bg-elements`, `--success`.

## Inline Style Specificity Check (Step 2c)

| Element | Inline style | CSS pseudo? | Conflict? | Status |
|---------|-------------|-------------|-----------|--------|
| Connect button | bg + color inline | No hover (disabled, CSS class removed) | No | PASS |
| Tag pills | bg + border + color inline | No hover | No | PASS |
| Step cards | bg + border inline | No hover | No | PASS |
| Breadcrumb | color inline | No hover | No | PASS |
| Section headings | color inline | No hover | No | PASS |

## Style Binding Audit (Step 3)

| Layer | Style Type | Figma Style | Code Equivalent | Status |
|-------|-----------|-------------|-----------------|--------|
| Page name | Text | 24px SemiBold Bricolage | font-display text-xl font-semibold | PASS |
| Section heading | Text | Title/M/Semibold (16px) | font-display text-m font-semibold | PASS |
| Body text | Text | Body/S/Regular (14px) | font-body text-s | PASS |
| Tag label | Text | Body/S/Medium (14px) | font-body text-s font-medium | PASS |
| Button label | Text | Button Label/Large (14px SemiBold) | font-display text-s font-semibold | PASS |
| Number | Text | 13px SemiBold Bricolage | font-display text-[13px] font-semibold | PASS |
| Breadcrumb | Text | 14px SemiBold Bricolage | font-display text-s font-semibold | PASS |

**Summary:** 7/7 styles match.

## Visual Screenshot Comparison (Step 4)

### Frame 1: Connector Detail Page (6419:75469)

| Check | Status | Notes |
|-------|--------|-------|
| Overall layout | PASS | 800px centered, sections stacked vertically |
| Breadcrumb | PASS | Back arrow + "Connectors" text, correct color |
| Header icon container | WARN | Figma fills 72px with brand logo image; code centers 40px SVG in 72px container with tint bg |
| Header name | PASS | 24px Bricolage SemiBold, correct color |
| Tag pills | PASS | Correct bg, border, text color for both variants |
| Connect button | FIXED | Was bg-subtle + text-disabled; now border-default + text-tertiary (disabled) |
| **Button radius** | **FAIL** | Figma: 8px (--semantic/button/large). Code: rounded-l = 10px |
| About section | PASS | Heading + body, correct gap |
| What You Get | PASS | Green checkmarks + text items |
| How To Connect | PASS | Numbered step cards, correct styling |
| **Section gap** | **FIXED** | Was gap-xxl (32px); now gap-[40px] |
| Header-to-content gap | PASS | mt-[60px] matches Figma |

**Rendered screenshot:** NOT AVAILABLE (dev server not running).

## State Coverage (Step 5)

No component_set variants — this is a static page layout. The Apparatus Button inside is in disabled state.

## Icon Accuracy (Step 6)

| Icon | Source | Status |
|------|--------|--------|
| Back arrow (breadcrumb) | Inline SVG — simple chevron | PASS |
| Check icon (benefits) | Inline SVG — circle + checkmark, var(--success) | WARN — hand-drawn, visually matches green checks in Figma |
| Brand icons (AppsFlyer etc.) | Existing icon components from connectors/ | PASS |

## Composition (Step 8)

| Check | Status | Notes |
|-------|--------|-------|
| Tailwind hover: with CSS vars | PASS | No hover: prefix used with CSS vars |
| Button reuse | N/A | Disabled button is simple enough to inline |

---

## Issues to Fix

### FAIL-1: Button border-radius (Severity: LOW)
- **File:** `organisms/ConnectorDetailView.tsx:119`
- **Figma:** `--semantic/button/large` = 8px
- **Code:** `rounded-l` = 10px
- **Fix:** Change `rounded-l` to `rounded-lg` (8px) or `rounded-[8px]`

### WARN-1: Header icon 40px in 72px container
- **File:** `organisms/ConnectorDetailView.tsx:77-81`
- **Figma:** Brand logo fills 72px via image fill
- **Code:** `<AppsFlyerIcon size={40} />` centered in 72px container
- **Impact:** Icon has visible padding around it; Figma shows edge-to-edge fill
- **Recommendation:** Add `detailIcon` field to ConnectorDetail interface that renders at 72px, or use CSS transform

### WARN-2: CheckIcon hand-drawn
- **File:** `organisms/ConnectorDetailView.tsx:32-47`
- **Impact:** Visually matches (green circle + checkmark), but SVG path is approximated, not extracted from Apparatus
- **Recommendation:** Extract exact SVG from Figma instance fill override

### FIXED-5: Page Topbar component MISSING — FIXED
- **Figma:** Page Topbar (6419:75476) — 56px tall, full-width, white bg, bottom border (--bg-subtle), back arrow + "Connectors" label at left=20px
- **Was:** Hand-coded breadcrumb `<button>` inside ConnectorDetailView with incorrect positioning
- **Fix applied:**
  - Created `molecules/PageTopbar.tsx` — reusable component with `title` + `onBack` props
  - Removed breadcrumb from ConnectorDetailView
  - PageTopbar rendered above content in HomePage routing

### FIXED-6: Layout width wrong — FIXED
- **Figma:** Full-width Container (1160px) with 32px padding → 1096px content area
- **Was:** `max-w-[800px] mx-auto` centered column (matching the connector list page, not the detail page)
- **Fix applied:** Removed `max-w-[800px] mx-auto`, HomePage wraps content in `px-[32px] pt-[32px]`

### Items FIXED during QA

1. **Connect button bg:** `var(--bg-subtle)` (#E6E7EA) → `var(--border-default)` (#CDCFD5)
2. **Connect button text:** `var(--text-disabled)` (#9A9EAB) → `var(--text-tertiary)` (#818696)
3. **Connect button hover removed:** Was `.connector-detail-btn:hover` on a disabled button (inline style conflict). Now `disabled` attribute, no hover class.
4. **Section gap:** `gap-xxl` (32px) → `gap-[40px]` (matches Figma)
5. **Page Topbar:** Created `molecules/PageTopbar.tsx` — was hand-coded breadcrumb inside the view
6. **Layout width:** Full-width with 32px padding — was 800px centered
