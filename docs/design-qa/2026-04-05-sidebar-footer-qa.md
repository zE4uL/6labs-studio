# Design QA -- Sidebar Footer, SidebarProfile, LanguageSelector
Date: 2026-04-05
Figma Node (Footer): 2565:52762
Figma Node (Profile): 4545:42646
Figma Node (LanguageSelector): 2565:52762
Figma File: i9fxQ6pXrgRITEzopoXpWL
Code Files:
  - src/components/organisms/Sidebar.tsx (footer section)
  - src/components/molecules/SidebarProfile.tsx
  - src/components/molecules/LanguageSelector.tsx
  - src/components/ui/Button.tsx (logout button)

## Token Audit

### SidebarProfile

| Layer | Property | Figma Token | Figma Value | Code | Status |
|-------|----------|-------------|-------------|------|--------|
| Container (expanded) | padding | `--xxs` | `4px` | `px-xxs` | PASS |
| Container (expanded) | border-radius | `--m` | `8px` | `rounded-m` | PASS |
| Container (expanded hover) | background | `--brand-blue/tint-light` | `rgba(23,112,239,0.07)` | `hover:bg-bg-tint-light` | **FAIL** -- Tailwind hover: with CSS var doesn't work; fixed to `.profile-hover` CSS class |
| Container (collapsed hover) | background | `--brand-blue/tint-light` | `rgba(23,112,239,0.07)` | (missing) | **FAIL** -- No hover state on collapsed variant; fixed with `.profile-hover` class |
| Avatar | background | Gradient/Blue | `linear-gradient(-90deg, #7B4CFF, #0EA4C5)` | inline gradient | PASS (hardcoded; no DS token exists) |
| Initials | font | DisplayFont/SemiBold | Bricolage Grotesque 600 | `font-display font-semibold` | PASS |
| Initials | color | `--text--&-icon/onbrand` | white | `text-text-on-brand` | PASS |
| Initials | size | `--size/s` | 14px | `text-s` | PASS |
| Name | font | Body/M/Regular | Inter 400 14px | `font-body text-s font-normal` | PASS |
| Name | color | `--text--&-icon/secondary` | `#4f566c` | `text-text-secondary` | PASS |
| Language code | font | Body/S/Regular | Inter 400 12px | `font-body text-xs font-normal` | PASS |
| Language code | color | `--text--&-icon/tertiary` | `#818696` | `text-text-tertiary` | PASS |
| Separator dot | color | `--text--&-icon/tertiary` | `#818696` | `bg-text-tertiary` | PASS |
| "Click to change" | font | Body/S/Regular | Inter 400 12px | `font-body text-xs` | PASS |
| "Click to change" | color | `--text--&-icon/tertiary` | `#818696` | `text-text-tertiary` | PASS |

### Sidebar Footer

| Layer | Property | Figma Token | Figma Value | Code | Status |
|-------|----------|-------------|-------------|------|--------|
| Container | border-top | `--border/subtle` | `#e6e7ea` | `border-border-subtle` | PASS |
| Container | padding | `--s` | `12px` | `p-s` | PASS |
| Container | gap | `--m` | `16px` | `gap-m` | PASS |
| Logout button | variant | Tertiary | transparent bg, subtle border | Custom HTML (SettingsIcon + hand-rolled) | **FAIL** -- Not using Button component; wrong icon (gear vs logout). Fixed: now uses `<Button variant="tertiary" iconOnly>` + `LogoutIcon` |
| Logout button | border | `--tertiary/border/default` | `#e6e7ea` | `border-base-50 bg-white/20` | **FAIL** -- Wrong tokens; fixed via Button component which handles this |

### LanguageSelector

| Layer | Property | Figma Token | Figma Value | Code | Status |
|-------|----------|-------------|-------------|------|--------|
| Container | background | `--background/elements` | white | `bg-bg-elements` | PASS |
| Container | border | `--border/subtle` | `#e6e7ea` | `border-border-subtle` | PASS |
| Container | border-radius | 12px | 12px | `rounded-xl` | PASS |
| Container | shadow | shadow/normal | standard | `shadow-normal` | PASS |
| Header text | font | Label/Medium variant | 10px uppercase | `text-2xs font-medium uppercase tracking-[1.5px]` | PASS |
| Header text | color | `--text--&-icon/tertiary` | `#818696` | `text-text-tertiary` | PASS |
| Item (selected) | background | `--brand-blue/tint-light` | `rgba(23,112,239,0.07)` | `bg-bg-tint-light` | PASS |
| Item (hover) | background | `--background/subtle` | subtle grey | `hover:bg-bg-subtle` | **FAIL** -- Tailwind hover: with CSS var; fixed to `.lang-item-hover` CSS class |
| Item label | font | Body/M/Regular | Inter 400 14px | `font-body text-s font-normal` | PASS |
| Item label | color | `--text--&-icon/primary` | dark | `text-text-primary` | PASS |
| Checkmark | color | brand | brand blue | `text-brand` | PASS |

**Summary:** 18/23 properties match. 5 failures fixed.

## Style Binding Audit

| Layer | Style Type | Figma Style | Source | Code Equivalent | Status |
|-------|-----------|-------------|--------|-----------------|--------|
| Profile name | Text | Body/M/Regular | Apparatus | `font-body text-s font-normal` | PASS |
| Language code | Text | Body/S/Regular | Apparatus | `font-body text-xs font-normal` | PASS |
| "Click to change" | Text | Body/S/Regular | Apparatus | `font-body text-xs font-normal` | PASS |
| Initials | Text | Title/S/Semibold | Apparatus | `font-display font-semibold text-s` | PASS |
| Selector header | Text | Label/Medium | Apparatus | `text-2xs font-medium uppercase tracking-[1.5px]` | PASS |
| Item label | Text | Body/M/Regular | Apparatus | `font-body text-s font-normal` | PASS |

**Summary:** 6/6 styles from Apparatus. 0 failures.

## Visual Comparison

Figma screenshots captured from nodes `2565:52762` and `4545:42646`.

| Check | Status | Notes |
|-------|--------|-------|
| Overall layout | PASS | Expanded and collapsed footer structure matches |
| Spacing/gaps | PASS | All gaps match `--xs` (8px) and `--m` (16px) |
| Typography | PASS | Font families, sizes, weights match |
| Avatar gradient | PASS | Linear gradient matches Figma |
| Icon accuracy | **FAIL** | SettingsIcon (gear) used instead of logout/exit door icon. Fixed: created `LogoutIcon` |
| Border radius | PASS | Profile `rounded-m`, selector `rounded-xl` |
| Color accuracy | PASS | All token colors verified |

## State Coverage

| State | In Figma | In Code | Status |
|-------|----------|---------|--------|
| Expanded Default | yes | yes | PASS |
| Expanded Hover | yes | broken | **FIXED** -- `hover:bg-bg-tint-light` replaced with `.profile-hover` CSS class |
| Collapsed Default | yes | yes | PASS |
| Collapsed Hover | yes | missing | **FIXED** -- Added `.profile-hover` class to collapsed variant |
| Language selector open | yes | broken | **FIXED** -- Portal escapes `overflow-hidden` clipping |

## Icon / Asset Accuracy

| Asset | Source | Matches Figma | Notes |
|-------|--------|---------------|-------|
| Profile avatar gradient | Hardcoded (no DS token) | Yes | Gradient matches Figma exactly |
| Footer button icon | SettingsIcon.tsx | **No** | Figma shows logout/exit door icon, not gear. Fixed: created `LogoutIcon.tsx` |
| Language flags | Emoji | Yes | Flag emojis match |
| Checkmark SVG | Hand-drawn | Yes | Path matches visual |

## Issues Fixed

1. **[FAIL] Profile hover (expanded)** -- `hover:bg-bg-tint-light` doesn't work with CSS variable colors per project rules. Replaced with `.profile-hover` CSS class in `globals.css`.

2. **[MISSING] Profile hover (collapsed)** -- Collapsed variant had no hover state at all. Added `.profile-hover` and `group/profile` classes.

3. **[FAIL] Language selector clipped** -- Footer sat inside a parent div with `overflow-hidden`, making the `absolute left-full` positioned LanguageSelector invisible. Fixed by: (a) moving footer outside the overflow container, (b) converting LanguageSelector to use `createPortal` to render at `document.body`.

4. **[FAIL] Wrong icon** -- SettingsIcon (gear) replaced with new `LogoutIcon` (exit door SVG) matching Figma spec.

5. **[FAIL] Button not using component** -- Hand-rolled button HTML with wrong tokens (`border-base-50 bg-white/20`) replaced with `<Button variant="tertiary" size="md" iconOnly>` which uses correct Apparatus tokens.

6. **[FAIL] Language item hover** -- `hover:bg-bg-subtle` replaced with `.lang-item-hover` CSS class.

## Files Modified

- `src/styles/globals.css` -- Added `.profile-hover` and `.lang-item-hover` CSS hover classes
- `src/components/molecules/SidebarProfile.tsx` -- Replaced Tailwind `hover:` with CSS classes, added collapsed hover
- `src/components/molecules/LanguageSelector.tsx` -- Portaled to `document.body`, added `anchorRef` prop, fixed hover class
- `src/components/organisms/Sidebar.tsx` -- Moved footer outside overflow container, replaced SettingsIcon with LogoutIcon + Button component, updated outside-click handler for portal
- `src/components/icons/LogoutIcon.tsx` -- New file: logout/exit door icon SVG
