# Design QA — Checkbox / Radio
Date: 2026-04-04
Figma Node: 5640:24561 (Checkbox), 9827:26611 (Radio), 3868:2 (Checkbox With Label), 20883:713 (Radio With Label)
Figma File: Nt21OzTRlJKgvSLMoSxTyT
Code File: src/components/ui/Checkbox.tsx + src/styles/globals.css

## Token Audit

| Layer | Property | Figma Token | Figma Value | Code | Status |
|-------|----------|-------------|-------------|------|--------|
| Control | background | Background/Elements | `#FFFFFF` | `var(--bg-elements)` | PASS |
| Control | border | Border/Default | `#CDCFD5` | `var(--border-default)` | PASS |
| Control hover | border | Border/Hover | `#9A9EAB` | `var(--border-hover)` | PASS |
| Checkbox checked | background | Interactive/Brand | `#1770EF` | `var(--brand)` | PASS |
| Checkbox checked | border | Interactive/Brand | `#1770EF` | `var(--brand)` | PASS |
| Checkbox checked hover | background | Interactive/BrandHover | `#4D8FF5` | `var(--brand-hover)` | PASS |
| Radio checked | border | Interactive/Brand | `#1770EF` | `var(--brand)` | PASS |
| Radio dot | fill | Interactive/Brand | `#1770EF` | `var(--brand)` | PASS |
| Checkbox | border-radius | Radius/xs | `4px` | `var(--radius-xs)` | PASS |
| Radio | border-radius | Radius/Round | `9999px` | `var(--radius-round)` | PASS |
| Control md | size | — | `16px` | `width: 16px; height: 16px` | PASS |
| Control sm | size | — | `14px` | `width: 14px; height: 14px` | PASS |
| Radio dot md | size | — | `8px` | `width: 8px; height: 8px` | PASS |
| Radio dot sm | size | — | `6px` | `width: 6px; height: 6px` | PASS |
| Label md | font-size | size/s | `14px` | `0.875rem` (14px) | PASS |
| Label sm | font-size | size/xs | `12px` | `0.75rem` (12px) | PASS |
| Label | color | Text & Icon/Primary | `#030D2D` | `var(--text-primary)` | PASS |
| Gap | spacing | Spacing/xs | `8px` | `gap: 8px` | PASS |
| Disabled | opacity | — | reduced | `opacity: 0.5` | PASS |

**Summary:** 19/19 properties match. 0 failures.

## State Coverage

| State | In Figma | In Code | Status |
|-------|----------|---------|--------|
| Unchecked | yes | yes | PASS |
| Checked | yes | yes | PASS |
| Indeterminate (Partial Active) | yes | yes | PASS |
| Disabled | yes | yes | PASS |
| Radio unchecked | yes | yes | PASS |
| Radio checked | yes | yes | PASS |
| Radio disabled | yes | yes | PASS |

## Icon / Asset Accuracy

| Asset | Source | Matches Figma | Notes |
|-------|--------|---------------|-------|
| Checkmark | Inline SVG | Visual match | 10x8 path, 1.5px stroke, white |
| Indeterminate dash | Inline SVG | Visual match | 10x2 horizontal line, 1.5px stroke, white |
| Radio dot | CSS circle | Visual match | Solid brand-colored circle, 8px (md) / 6px (sm) |

## Issues to Fix

None — all tokens, states, and assets match Figma spec.
