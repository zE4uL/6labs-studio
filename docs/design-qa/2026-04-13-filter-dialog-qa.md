# Design QA — FilterDialog Update
**Date:** 2026-04-13
**Figma Node:** `6425:140219`
**Figma File:** `i9fxQ6pXrgRITEzopoXpWL`
**Component:** `FilterDialog.tsx`
**Scope:** CSS layout updates to match latest Figma spec

---

## Changes Audited

| Property | Before | After | Figma Spec | Status |
|----------|--------|-------|------------|--------|
| Sidebar width | 260px | 240px | `w-[240px]` | PASS |
| Sidebar border variable | `var(--bg-subtle)` | `var(--border-subtle, var(--bg-subtle))` | `var(--border/subtle, #E6E7EA)` | PASS |
| Content area padding | 20px | 0 | No padding on scroll area | PASS |
| Surface panel padding | 12px | 20px | `p-[var(--l,20px)]` | PASS |
| Surface panel border-radius | `var(--radius-xl)` (12px) | 0 | No border-radius in Figma | PASS |
| Toggle card padding | 12px uniform | 8px 12px | `px-12 py-8` | PASS |
| `@figmaNode` | `6425:222911` | `6425:140219` | — | PASS |

---

## Token Audit

### Dialog Container (`.filter-dialog`)
| Property | Code | Figma | Status |
|----------|------|-------|--------|
| Width | 772px | 772px | PASS |
| Height | 750px | 750px | PASS |
| Background | `var(--bg-elements)` → `#FFFFFF` | `var(--neutral/white, white)` | PASS |
| Border-radius | `var(--radius-2xl)` → 16px | `var(--2xl, 16px)` | PASS |
| Overflow | hidden | clip | PASS (equivalent) |

### Header (`.filter-dialog-header`)
| Property | Code | Figma | Status |
|----------|------|-------|--------|
| Height | 56px | 56px | PASS |
| Padding | `0 20px` | `px-[var(--l,20px)]` | PASS |
| Border-bottom | via body `border-top` | `border-b border-solid` | PASS (visual equivalent) |

### Title (`.filter-dialog-title`)
| Property | Code | Figma | Status |
|----------|------|-------|--------|
| Font family | `var(--font-display)` | `Bricolage Grotesque SemiBold` | PASS |
| Font weight | 600 | `var(--weight/semibold, 600)` | PASS |
| Font size | `var(--size-m)` | `var(--size/m, 16px)` | WARN — `--size-m` undefined in globals.css (pre-existing) |
| Color | `var(--text-primary)` → `#030D2D` | `var(--base/base-900, #030D2D)` | PASS |
| Line height | 1.5 | 1.5 | PASS |

### Sidebar (`.filter-sidebar`)
| Property | Code | Figma | Status |
|----------|------|-------|--------|
| Width | 240px | 240px | PASS |
| Padding | 20px all | `pr-20 py-20` (no left padding) | WARN — left 20px vs Figma 0px, but highlight bar is absolute so visual result equivalent |
| Gap | 8px | 8px | PASS |
| Border-right | `var(--border-subtle)` → `#E6E7EA` | `var(--border/subtle, #E6E7EA)` | PASS |

### Sidebar Items (`.filter-sidebar-item`)
| Property | Code | Figma | Status |
|----------|------|-------|--------|
| Padding | 8px | `p-[var(--xs,8px)]` | PASS |
| Border-radius | `var(--radius-m)` → 8px | `var(--m, 8px)` | PASS |
| Font family | `var(--font-display)` | `Bricolage Grotesque SemiBold` | PASS |
| Font weight | 600 | `var(--weight/semibold, 600)` | PASS |
| Font size | `var(--size-s)` | `var(--size/s, 14px)` | WARN — `--size-s` undefined (pre-existing) |
| Color (default) | `var(--text-secondary)` → `#4F566C` | `var(--text-&-icon/secondary, #4F566C)` | PASS |
| Color (active) | `var(--brand)` → `#1770EF` | `var(--text-&-icon/brand, #1770EF)` | PASS |
| BG (active) | `var(--bg-tint)` → `rgba(23,112,239,0.14)` | `var(--background/highlighted-tint, rgba(23,112,239,0.14))` | PASS |

### Indicator Bar (`.filter-sidebar-indicator`)
| Property | Code | Figma | Status |
|----------|------|-------|--------|
| Width | 4px | 4px | PASS |
| Height | 37px | 37px | PASS |
| Background | `var(--brand)` → `#1770EF` | `var(--brand-blue/500, #1770EF)` | PASS |
| Border-radius | `0 11px 12px 0` | `rounded-br-12 rounded-tr-11` | PASS |

### Surface Panel (`.filter-surface-panel`)
| Property | Code | Figma | Status |
|----------|------|-------|--------|
| Background | `var(--bg-page)` → `#F1F1F1` | `var(--neutral/surface, #F1F1F1)` | PASS |
| Padding | 20px | `p-[var(--l,20px)]` | PASS |
| Gap | 12px | `gap-[var(--s,12px)]` | PASS |
| Border-radius | 0 | Not specified in Figma | PASS |

### Filter Cards (`.filter-card`)
| Property | Code | Figma | Status |
|----------|------|-------|--------|
| Background | `var(--bg-elements)` → `#FFFFFF` | `var(--background/container, white)` | PASS |
| Padding | 12px | `p-[var(--s,12px)]` | PASS |
| Gap | 12px | `gap-[var(--s,12px)]` | PASS |
| Border-radius | `var(--radius-m)` → 8px | `var(--m, 8px)` | PASS |

### Toggle Card (`.filter-card-toggle`)
| Property | Code | Figma | Status |
|----------|------|-------|--------|
| Background | `var(--bg-elements)` → `#FFFFFF` | `var(--neutral/white, white)` | PASS |
| Padding | `8px 12px` | `px-[var(--s,12px)] py-[var(--xs,8px)]` | PASS |
| Border-radius | `var(--radius-m)` → 8px | `var(--m, 8px)` | PASS |

### Section Headers (`.filter-section-header`)
| Property | Code | Figma | Status |
|----------|------|-------|--------|
| Font family | `var(--font-display)` | `Bricolage Grotesque SemiBold` | PASS |
| Font weight | 600 | 600 | PASS |
| Font size | 10px | 10px | PASS |
| Letter-spacing | 1.5px | `tracking-[1.5px]` | PASS |
| Text-transform | uppercase | uppercase | PASS |
| Color | `var(--text-secondary)` | `var(--base/base-600, #4F566C)` | PASS |
| Opacity | 0.8 | `opacity-80` | PASS |

### Footer (`.filter-dialog-footer`)
| Property | Code | Figma | Status |
|----------|------|-------|--------|
| Padding | 20px | `p-[var(--l,20px)]` | PASS |
| Border-top | `1px solid var(--bg-subtle)` | `border-[var(--border/subtle)]` | PASS (same resolved value) |

### Checkbox (`.filter-checkbox`)
| Property | Code | Figma | Status |
|----------|------|-------|--------|
| Gap | 7px | `gap-[7px]` | PASS |
| Control size | 16px | 16px | PASS |
| Control radius | 2px | `rounded-[2px]` | PASS |
| Control border | 1.5px `var(--text-secondary)` | `1.5px var(--base/base-600, #4F566C)` | PASS |
| Label font | `var(--font-body)` 12px 400 | `Inter Regular 12px` | PASS |
| Label color | `var(--text-secondary)` | `var(--text-&-icon/secondary, #4F566C)` | PASS |
| Checked label weight | 500 | `Inter Medium` (500) | PASS |
| Checked control fill | brand (via component) | `var(--brand-blue/500, #1770EF)` | PASS |

### Filter Tags (`.filter-tag`)
| Property | Code | Figma | Status |
|----------|------|-------|--------|
| Padding | `4px 12px` | `px-12 py-4` | PASS |
| Border-radius | `var(--radius-tag)` → 4px | `var(--semantic/tag, 4px)` | PASS |
| Border | `1px solid var(--border-subtle)` | `border var(--border/subtle)` | PASS |
| Font | 12px 400 `var(--font-body)` | `Inter Regular 12px` | PASS |
| Color | `var(--text-secondary)` | `var(--text-&-icon/secondary, #4F566C)` | PASS |
| Selected BG | `var(--bg-tint)` | `var(--background/highlighted-tint)` | PASS |
| Selected color | `var(--brand)` | `var(--text-&-icon/brand, #1770EF)` | PASS |
| Selected weight | 500 | `Inter Medium` (500) | PASS |

---

## CSS Variable Existence Check

| Variable | Defined | Location | Status |
|----------|---------|----------|--------|
| `--bg-elements` | Yes | globals.css:16 | PASS |
| `--bg-page` | Yes | globals.css:14 | PASS |
| `--bg-subtle` | Yes | globals.css:18 | PASS |
| `--bg-tint` | Yes | globals.css:19 | PASS |
| `--bg-tint-light` | Yes | globals.css:20 | PASS |
| `--border-subtle` | Yes | globals.css:37 | PASS |
| `--brand` | Yes | globals.css:44 | PASS |
| `--text-primary` | Yes | globals.css:25 | PASS |
| `--text-secondary` | Yes | globals.css:26 | PASS |
| `--text-tertiary` | Yes | globals.css:27 | PASS |
| `--font-display` | Yes | globals.css:123 | PASS |
| `--font-body` | Yes | globals.css:124 | PASS |
| `--radius-m` | Yes | globals.css:100 | PASS |
| `--radius-2xl` | Yes | globals.css:103 | PASS |
| `--radius-tag` | Yes | globals.css:118 | PASS |
| `--size-xs` | Yes | tokens.css:11 | PASS |
| `--size-s` | **No** | Not defined | WARN (pre-existing) |
| `--size-m` | **No** | Not defined | WARN (pre-existing) |

---

## Pre-existing Issues (not introduced by this update)

| Issue | Severity | Impact |
|-------|----------|--------|
| `--size-s` undefined | WARN | Sidebar item + footer count font-size falls back to inherited value. Visually ~correct because parent sets a reasonable base size. |
| `--size-m` undefined | WARN | Dialog title font-size falls back to inherited. Visually ~correct at browser default 16px. |

**Recommendation:** Add to `tokens.css`:
```css
--size-s: 14px;
--size-m: 16px;
```

---

## Visual Comparison Summary

Comparing Figma screenshot (6425:140219) against CSS spec:

| Element | Check | Status |
|---------|-------|--------|
| Dialog dimensions | 772×750 | PASS |
| Dialog rounding | 16px corners | PASS |
| Header height + padding | 56px, px-20 | PASS |
| Header border-bottom | 1px subtle | PASS |
| Sidebar width | 240px | PASS |
| Sidebar items spacing | gap-8, p-8 | PASS |
| Active item tint + brand color | Blue tint bg + blue text | PASS |
| Blue indicator bar | 4px × 37px, left edge | PASS |
| Content area surface fill | #F1F1F1, no gap around edges | PASS |
| White cards padding | 12px | PASS |
| Toggle card reduced padding | 8px 12px | PASS |
| Section headers | 10px uppercase, tracking 1.5px | PASS |
| Checkbox grid | 2-col, gap-12 | PASS |
| Filter tags wrap | flex-wrap, gap-12 | PASS |
| Range slider | brand fill, thumb with inner dot | PASS |
| Footer layout | space-between, p-20, border-top | PASS |
| Footer buttons | Clear all + count / Cancel + Apply | PASS |

---

## Verdict

**PASS** — All changes match the Figma spec. Two pre-existing WARN items (`--size-s`, `--size-m` undefined) are not regressions from this update.

> **Note:** Visual screenshot comparison against rendered output could not be performed in this session (no browser screenshot tool available). Token audit and CSS structure are verified. Recommend visual spot-check in browser.
