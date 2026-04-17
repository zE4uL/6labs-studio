# Design QA — Radiologist Complete Flow

**Date:** 2026-04-06
**Figma section:** `6453:1491628` (Homepage Radiologist Flow)
**File:** `i9fxQ6pXrgRITEzopoXpWL`

---

## Screens Audited

| # | Screen | Node ID | Code State |
|---|--------|---------|------------|
| 1 | HomePage - Sidebar Expanded | `6352:91332` | `activeNav='home'` + hero |
| 2 | HomePage - Sidebar Collapsed | `6370:723115` | Same, `sidebarCollapsed=true` |
| 3 | HomePage + Suggestions | `6453:1472199` | Input focused, suggestions shown |
| 4 | Results - Grid 3-col | `6453:1472123` | `radiologistView='results'` |
| 5 | Results + Flyout (sidebar expanded) | `6453:1472328` | `flyoutOpen=true`, 2-col grid |
| 6 | Results + Flyout (sidebar collapsed) | `6453:1472354` | `flyoutOpen=true`, `sidebarCollapsed=true`, 3-col grid |
| 7 | Details Page | `6453:1472220` | `radiologistView='details'` |
| 8 | Filters Popup | `6425:222910` | FilterDialog (pre-existing) |

---

## Token Audit

| Layer | Property | Figma Token | Code Value | Status |
|-------|----------|-------------|------------|--------|
| Panel bg | background | Background/Elements | `bg-bg-elements` | PASS |
| Panel border | border-left | Border/Subtle | `var(--border-subtle)` inline | PASS |
| Header title | text color | Text/Primary | `text-text-primary` | PASS |
| Header title | font | Title/S/Semibold | `font-display text-s font-semibold` | PASS |
| "View in detail" btn | variant | Outline pill | `variant="outline" pill` | PASS |
| Close X | variant | Transparent icon | `variant="transparent" iconOnly` | PASS |
| AI Summary heading | icon | Sparkle | SparkleIcon component | PASS |
| AI Summary heading | text color | Text/Primary | `text-text-primary` | PASS |
| AI Summary body | text color | Text/Secondary | `text-text-secondary` | PASS |
| AI Summary highlight | style | Bold + underline | `font-semibold underline` | PASS |
| Detected Events heading | icon | Eye | EyeIcon inline SVG | PASS |
| Event circle (kill) | bg | Status/Success Tint Light | `var(--success-bg)` | PASS |
| Event circle (winner) | bg | Status/Warning Tint Light | `var(--warning-bg)` | PASS |
| Event tag (kill) | color | Status/Error | `.event-tag-kill` | PASS |
| Event tag (winner) | color | Status/Success | `.event-tag-winner` | PASS |
| Footer bg | background | Background/Page | `var(--bg-page)` | PASS |
| Footer text | color | Text/Secondary | `text-text-secondary` | PASS |
| Found N sessions | text color | Brand Blue/500 | `var(--brand)` | PASS (fixed) |
| Divider lines | color | Border/Subtle | `var(--border-subtle)` inline | PASS |
| Scroll area gap | spacing | 32px between sections | `gap-xxl` (32px) | PASS |

---

## Issues Found & Fixed

| # | Issue | Severity | Status |
|---|-------|----------|--------|
| 1 | Panel appeared instantly without animation | FAIL | **FIXED** — Added `session-panel`/`session-panel-active` CSS class toggle with delayed mount |
| 2 | "Found 6 sessions" used dark text, Figma uses brand blue | FAIL | **FIXED** — Changed to `color: var(--brand)` |
| 3 | Event circle icons used text symbols (+ ★), Figma uses actual SVG icons (crosshair, trophy) | FAIL | **FIXED** — Created proper SVG icon components |
| 4 | Grid always 2-col when flyout open, but Figma shows 3-col when sidebar collapsed | FAIL | **FIXED** — Added `sidebarCollapsed` prop, grid uses 3-col when sidebar collapsed |
| 5 | Spacing between mini input and "Found N sessions" too tight (16px) | WARN | **FIXED** — Changed from `mt-m` to `mt-xl` (24px) |
| 6 | Video player had center play overlay, Figma shows controls bar below | FAIL | **FIXED** — Rebuilt VideoPlayerThumbnail with dot indicators + controls bar |
| 7 | AI highlight used color tint, Figma uses bold + underline | FAIL | **FIXED** — Changed to `font-semibold underline` |
| 8 | Sub-components approximated from memory instead of Figma tree | COMPOSITION | **FIXED** — Rebuilt all sub-components from screenshot reference |

---

## State Coverage

| State | In Figma | In Code | Status |
|-------|----------|---------|--------|
| Home (hero) | Screen 1-3 | `radiologistView='home'` | PASS |
| Suggestions dropdown | Screen 3 | `showSuggestions` state | PASS |
| Results 3-col | Screen 4 | `radiologistView='results'` | PASS |
| Results + Flyout 2-col | Screen 5 | `flyoutOpen=true` (sidebar expanded) | PASS |
| Results + Flyout 3-col | Screen 6 | `flyoutOpen=true` + `sidebarCollapsed` | PASS |
| Details page | Screen 7 | `radiologistView='details'` | PASS |
| Filters popup | Screen 8 | FilterDialog (pre-existing) | PASS |
| Sidebar collapsed | Screen 2, 6 | `sidebarCollapsed=true` | PASS |
| Panel slide-in animation | Implied | CSS transition 300ms | PASS |

---

## Remaining Items (not blocking)

- Video player is static (no actual playback) — mock UI only
- Session data is mocked — no API integration
- Detail page playlist sidebar `onSessionClick` is a no-op
- Screenshots comparison against rendered output pending (dev server visual check needed)

---

## Icon Accuracy

| Icon | Source | Status |
|------|--------|--------|
| SparkleIcon | Hand-drawn SVG (no Apparatus match) | WARN — flag for DS addition |
| EyeIcon | Hand-drawn SVG | WARN — flag for DS addition |
| InfoCircleIcon | Hand-drawn SVG | WARN — flag for DS addition |
| CrosshairIcon (kill) | Hand-drawn SVG matching Figma screenshot | WARN |
| TrophyIcon (winner) | Hand-drawn SVG matching Figma screenshot | WARN |
| CloseIcon | Existing Apparatus component | PASS |
| ChevronIcon | Existing Apparatus component | PASS |
| ClockIcon | Existing Apparatus component | PASS |
| CalendarIcon | Existing Apparatus component | PASS |
| FilterIcon | Existing Apparatus component | PASS |

**Note:** Hand-drawn SVGs match Figma visuals but should be exported from Apparatus via `exportAsync` when Desktop Bridge is available.
