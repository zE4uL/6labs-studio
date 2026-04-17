# Design QA — Oracle & Radiologist Agent Pages
Date: 2026-04-05
Figma Section Node: 6418:108171
Figma File: i9fxQ6pXrgRITEzopoXpWL

## Components Audited

| Component | Figma Node | Code File |
|-----------|-----------|-----------|
| SuggestionCard | 6418:100907 | src/components/molecules/SuggestionCard.tsx |
| AgentPageHeader | 6418:100898 | src/components/molecules/AgentPageHeader.tsx |
| OracleAgentView | 6418:100887 | src/components/organisms/OracleAgentView.tsx |
| RadiologistAgentView | 6418:100938 | src/components/organisms/RadiologistAgentView.tsx |
| BulbIcon | I6418:100907;2487:22847 | src/components/icons/BulbIcon.tsx |

## Figma-Code Sync Check

All 5 files have complete `@figma*` headers:
- [x] `@figmaComponent`
- [x] `@figmaPath`
- [x] `@figmaNode`
- [x] `@figmaFile`
- [x] `@figmaUrl`

## Token Audit

### SuggestionCard

| Layer | Property | Figma Token | Figma Value | Code | Status |
|-------|----------|-------------|-------------|------|--------|
| Container | background | `background/elements` | `#FFFFFF` | `bg-bg-elements` | PASS |
| Container | border | `border/default` | `#CDCFD5` | `border-border-default` | PASS |
| Container | radius | `radius/xl` | `12px` | `rounded-xl` | PASS |
| Container | padding | `space/s` | `12px` | `p-s` | PASS |
| Container | gap | `space/xs` | `8px` | `gap-xs` | PASS |
| Text | color | `base/base-700` | `#353D57` | `text-base-700` | PASS |
| Text | font | `Body/M/Regular` | `14px Inter` | `font-body text-s` | PASS |
| Text | line-height | — | `1.5` | `leading-[1.5]` | PASS |
| Bulb Icon | color | `text--&-icon/tertiary` | `#818696` | `text-text-tertiary` | PASS |

### AgentPageHeader

| Layer | Property | Figma Token | Figma Value | Code | Status |
|-------|----------|-------------|-------------|------|--------|
| Container | gap | `space/xl` | `24px` | `gap-xl` | PASS |
| Icon Container | size | — | `72×72px` | `size-[72px]` | PASS |
| Icon Container | radius | `radius/xl` | `12px` | `rounded-xl` | PASS |
| Title | font | `Title/2XL/Bold` | `32px Bricolage ExtraBold` | `font-display text-2xl font-extrabold` | PASS |
| Title | color | `text--&-icon/primary` | `#030D2D` | `text-text-primary` | PASS |
| Description | font | `Body/M/Regular` | `14px Inter` | `font-body text-s` | PASS |
| Description | color | `base/base-700` | `#353D57` | `text-base-700` | PASS |

### OracleAgentView

| Layer | Property | Figma Token | Figma Value | Code | Status |
|-------|----------|-------------|-------------|------|--------|
| Section | gap | — | `40px` | `gap-xxxl` (40px) | PASS |
| Section | max-width | — | `800px` | `max-w-[800px]` | PASS |
| Section | padding-top | — | `120px` | `pt-[120px]` (in HomePage) | PASS |
| Suggestions Label | color | `base/base-500` | `#686E81` | `text-base-500` | PASS |
| Suggestions Label | font | `Title/XS/Semibold` | `12px Bricolage SemiBold` | `font-display text-xs font-semibold` | PASS |
| Suggestions Grid | gap | `space/s` | `12px` | `gap-s` | PASS |
| Suggestions Grid | columns | — | `2` | `grid-cols-2` | PASS |

### RadiologistAgentView

| Layer | Property | Figma Token | Figma Value | Code | Status |
|-------|----------|-------------|-------------|------|--------|
| Section | gap | — | `40px` | `gap-xxxl` (40px) | PASS |
| Section | max-width | — | `800px` | `max-w-[800px]` | PASS |
| Videos spacing | — | ~64px from console | `mt-xxl3` (64px) | PASS |

**Token Summary:** 25/25 properties match. 0 failures.

## Style Binding Audit

| Layer | Style Type | Figma Style | Source | Code Equivalent | Status |
|-------|-----------|-------------|--------|-----------------|--------|
| Title | Text | `Title/2XL/Bold` | Apparatus | `font-display text-2xl font-extrabold` | PASS |
| Description | Text | `Body/M/Regular` | Apparatus | `font-body text-s font-normal` | PASS |
| Suggestion text | Text | `Body/M/Regular` | Apparatus | `font-body text-s font-normal` | PASS |
| Suggestions label | Text | `Title/XS/Semibold` | Apparatus | `font-display text-xs font-semibold` | PASS |
| Oracle icon bg | Color | radialGradient | Custom | inline `background` style | PASS |
| Radiologist icon bg | Color | linearGradient | Custom | inline `background` style | PASS |

**Style Summary:** 6/6 styles correct. 0 failures.

## Visual Comparison

Figma screenshots captured from nodes 6418:100887 (Oracle) and 6418:100938 (Radiologist).

| Check | Status | Notes |
|-------|--------|-------|
| Overall layout | PASS | Structure matches — header, console, content |
| Spacing/gaps | PASS | 40px section gaps, 12px suggestion grid gaps |
| Typography scale | PASS | 32px title, 14px body, 12px label all match |
| Icon container | PASS | 72px, rounded-12, gradient backgrounds match |
| Color accuracy | PASS | All tokens resolve to correct values |
| Border radius | PASS | All corners match (xl=12px, container=20px) |
| Suggestion cards | PASS | 2×2 grid, correct padding, border, text |
| VideosContainer placement | PASS | Below console with gap |
| Sidebar active state | PASS | Handled by existing Sidebar component |

## State Coverage

| State | In Figma | In Code | Status |
|-------|----------|---------|--------|
| Default | yes | yes | PASS |
| Hover (suggestion card) | implied | yes | PASS (via `.suggestion-card-hover`) |
| Input focus | yes | yes | PASS (via InputFieldConsole) |
| Send disabled | yes | yes | PASS (via InputFieldConsole) |

## Icon / Asset Accuracy

| Asset | Source | Matches Figma | Notes |
|-------|--------|---------------|-------|
| OracleIcon (40px in header) | Figma export | Yes | Existing icon, rendered at 40px |
| RadiologistIcon (40px in header) | Figma export | Yes | Existing icon, rendered at 40px |
| BulbIcon (16px in suggestions) | Hand-drawn SVG | Approximate | WARN — simplified lightbulb shape; close visual match but not pixel-identical to Figma vectors |

## Cross-Platform Rendering

| Check | Status | Notes |
|-------|--------|-------|
| Emoji usage | N/A | No emoji in agent page components |
| Font loading | PASS | Bricolage Grotesque and Inter loaded via Google Fonts |
| CSS variable hover | PASS | Uses `.suggestion-card-hover` CSS class, not Tailwind `hover:` |

## Issues to Fix

1. **[WARN] BulbIcon** — Hand-drawn SVG approximation rather than Figma vector export. Visually close but not pixel-identical. Consider extracting exact vectors from Figma if higher fidelity is needed.

## Fixed During QA

1. **[FIXED] text-[#353D57]** → `text-base-700` — hardcoded hex replaced with Tailwind token alias in SuggestionCard and AgentPageHeader
2. **[FIXED] text-text-tertiary** → `text-base-500` — wrong token for "Try our suggested prompts" label (was #818696, Figma specifies #686E81)
