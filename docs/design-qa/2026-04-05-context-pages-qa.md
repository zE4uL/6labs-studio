# Design QA — Context Pages (Uploads + Connectors)
Date: 2026-04-05
Figma Section Node: 6419:74733
Figma File: i9fxQ6pXrgRITEzopoXpWL

## Scope

| Component | Code File | @figmaNode |
|-----------|-----------|------------|
| ContextUploader | molecules/ContextUploader.tsx | 6419:74756 |
| ContextUploaderMini | molecules/ContextUploaderMini.tsx | 6419:74895 |
| ContextFileCard | molecules/ContextFileCard.tsx | 6419:74907 |
| ConnectorCard | molecules/ConnectorCard.tsx | 6419:74803 |
| ProgressBar | atoms/ProgressBar.tsx | 6419:74907 |
| UploadTag | atoms/UploadTag.tsx | 6419:74907 |
| ContextUploadsView | organisms/ContextUploadsView.tsx | 6419:74744 |
| ContextConnectorsView | organisms/ContextConnectorsView.tsx | 6419:74794 |

## Token Audit

| Layer | Property | Figma Token | Code | Status |
|-------|----------|-------------|------|--------|
| Page bg | background | --bg-page (#F1F1F1) | bg-bg-page | PASS |
| Card bg | background | --bg-card (#FFFFFF) | var(--bg-card) | PASS |
| Uploader border | border | --border-default (#CDCFD5) | var(--border-default) | PASS |
| Header icon gradient | fill | linear-gradient brand | inline gradient | PASS |
| Title text | color | --text-primary (#030D2D) | var(--text-primary) | PASS |
| Description text | color | --text-secondary (#4F566C) | var(--text-secondary) | PASS |
| Placeholder text | color | --text-tertiary (#818696) | var(--text-tertiary) | PASS |
| Brand accent | color | --brand (#1770EF) | var(--brand) | PASS |
| Progress bar bg | background | --bg-subtle (#E6E7EA) | var(--bg-subtle) | PASS |
| Progress bar fill | background | --brand (#1770EF) | var(--brand) | PASS |
| Upload tag bg | background | --bg-tint (brand 14%) | var(--bg-tint) | PASS |
| Card border | border | --border-subtle (#E6E7EA) | var(--border-subtle) | PASS |
| Card shadow | shadow | --shadow-sm | var(--shadow-sm) | PASS |

**Summary:** 13/13 properties match. 0 failures.

## Style Binding Audit

| Layer | Style Type | Figma Style | Code Equivalent | Status |
|-------|-----------|-------------|-----------------|--------|
| Page title | Text | Title/2XL/ExtraBold (32px) | font-display text-2xl font-extrabold | PASS |
| Subtitle | Text | Body/S/Regular (14px) | font-body text-s | PASS |
| Section heading | Text | Title/L/Medium (20px) | font-display text-l font-medium | PASS |
| Copy body | Text | Body/S/Regular (14px) | font-body text-s | PASS |
| Uploader title | Text | Title/M/Semibold (16px) | font-display text-m font-semibold | PASS |
| File type pills | Text | Body/XS/Regular (12px) | font-body text-xs | PASS |
| MAX label | Text | Label/Medium (10px) | font-display text-2xs font-semibold uppercase tracking-[0.15em] | PASS |
| File name | Text | Title/S/Semibold (14px) | font-display text-s font-semibold | PASS |
| Tag label | Text | Label/Medium (10px) | font-display text-2xs font-semibold uppercase tracking-[0.15em] | PASS |
| Connector name | Text | Title/M/Semibold (16px) | font-display text-m font-semibold | PASS |
| Connector desc | Text | Body/S/Regular (14px) | font-body text-s | PASS |

**Summary:** 11/11 styles match Apparatus. 0 failures.

## Visual Comparison

Figma screenshots captured from nodes 6419:74734 (empty), 6419:74784 (connectors), 6419:74837 (uploading).

| Check | Status | Notes |
|-------|--------|-------|
| Overall layout | PASS | 800px section at 180px offset, 120px top |
| Spacing/gaps | PASS | Header gap-xl (24px), section gap-xxl (32px) |
| Typography scale | PASS | All sizes match Apparatus text styles |
| Icon sizes | PASS | Header icon 72x72, file icon 48x48, tag icon 12px |
| Border radius | PASS | Card xl (12px), uploader 3xl (20px), tag xs (4px) |
| Color accuracy | PASS | Brand gradient, tints, status colors all match |
| Progress bar | PASS | Fixed to 8px height, inside file info slot |
| Connector grid | PASS | Row 1: 2-col, Row 2: 3-col, gap-l (20px) |
| Upload tag icon | PASS | Added upload/check icon prefix per Figma |
| Description box | PASS | Moved inside file card per Figma structure |

## Issues Fixed During QA

1. **[FIXED] Uploader icon** — Removed 56px icon container (hidden in Figma)
2. **[FIXED] Copy text** — Updated to match Figma: "Share GDDs, live-ops plans..."
3. **[FIXED] Connectors subtitle** — Updated to match Figma
4. **[FIXED] File card icon** — Changed from 40x40 to 48x48 container
5. **[FIXED] Progress bar height** — Changed from 4px to 8px
6. **[FIXED] Progress bar placement** — Moved inside file info slot
7. **[FIXED] Upload tag icon** — Added UploadIcon/CheckIcon prefix
8. **[FIXED] Description box** — Moved inside ContextFileCard
9. **[FIXED] Mini uploader text** — Fixed to "PDF,DOC,CSV, TXT and Images"
10. **[FIXED] Connector descriptions** — Updated all 5 to match Figma text
11. **[FIXED] Connector grid gaps** — Changed from gap-m (16px) to gap-l (20px)
12. **[FIXED] Uploaded Files heading** — Changed to Title/L/Medium (20px)
13. **[FIXED] IconProps type** — Added size 12 for tag icons
14. **[FIXED] figmaNode IDs** — Updated to current session nodes

## State Coverage

| State | In Figma | In Code | Status |
|-------|----------|---------|--------|
| Uploads Empty | yes | yes | PASS |
| Uploading (progress) | yes | yes | PASS |
| Uploaded (complete) | yes | yes | PASS |
| Connectors Default | yes | yes | PASS |
| Card Hover | yes | yes | PASS |
| Delete Hover | implicit | yes | PASS |
| Drag Over | implicit | yes | PASS |

## Icon / Asset Accuracy

| Asset | Source | Matches Figma | Notes |
|-------|--------|---------------|-------|
| UploadIcon | Figma export | Yes | Existing icon |
| ConnectorIcon | Figma export | Yes | Existing icon |
| TrashIcon | SVG constructed | Approximate | Standard trash icon |
| FileImageIcon | SVG constructed | Approximate | Standard file icon |
| FileDocIcon | SVG constructed | Approximate | Standard doc icon |
| PlusIcon | SVG constructed | Yes | Simple plus |
| Connector brand icons | SVG constructed | Approximate | Brand colors match, simplified paths |

## Cross-Platform Rendering

| Check | Status | Notes |
|-------|--------|-------|
| Emoji in file type pills | WARN | Emoji used decoratively, acceptable fallback |
| Font loading | PASS | Bricolage + Inter loaded via Google Fonts |
| Flag emoji | N/A | No flags used |

## Remaining Items

- Connector brand icons are simplified SVGs, not Figma exports. Visual fidelity is approximate but acceptable for prototype stage.
- Emoji in file type pills render differently on Windows but are supplementary to the text label.
