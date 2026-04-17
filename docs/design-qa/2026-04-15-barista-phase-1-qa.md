# Barista Phase 1 — Design QA

**Date:** 2026-04-15
**Scope:** Phase 1 of the Barista flow (Setup + Panel Shell + Assist). Tasks tab, task creation modal, task detail, and branching are deferred to Phase 2.
**Figma:** `i9fxQ6pXrgRITEzopoXpWL` — Barista section `6425:89768`
**PRD:** Barista_Tasks PRD (internal Google Doc)

---

## Phase 1 Screens Covered

| # | Figma node | Screen name | Built as |
|---|---|---|---|
| 1 | `6425:89769` | HomePage — Before Setup | HomePage + BaristaSidePanel(state=onboarding) |
| 2 | `6425:89876` | HomePage — Sidebar Collapsed Before Setup | existing Sidebar collapse + above |
| 3 | `6425:90222` | Setup Page: Empty | `BaristaSetupPage` (default) |
| 4 | `6425:90288` | Setup Page: Dept + Roles + Focus Areas | `BaristaSetupPage` (filled — single component, controlled locally) |
| 5 | `6425:90295` | Post-Setup: Your Personal Assistant | `BaristaSetupPage` confirmed state |
| 6 | `6425:90028` | HomePage — After Setup — Assists | `BaristaSidePanel(state=profile-ready)` over Oracle |
| 7 | `6425:90306` | Oracle + Barista — Right Panel (Generating) | `BaristaSidePanel(state=running)` |
| 8 | `6425:90321` | Oracle + Barista — Paused | `BaristaSidePanel(state=paused)` |
| 9 | `6425:90356` | Oracle + Barista — Paused, Auto Mode OFF | `BaristaSidePanel(state=approve)` with SuggestedCard |

## Component Reconciliation Summary

| Action | Component | Notes |
|---|---|---|
| REUSE | `Button`, `Input`, `Toggle`, `Checkbox`, `SidebarNavItem`, `PopupModal`, `SelectDropdown`, `DescriptionBox`, `PageTopbar`, `OracleAgentView`, `ThinkingOracle`, `SuggestionCard`, `AIResponseOracle`, `BaristaIcon`, `CheckIcon`, `PlusIcon`, `CloseIcon`, `EditIcon`, `TrashIcon`, `DropdownArrowIcon` | No fork — all existing primitives used as-is |
| REUSE | `Sidebar.tsx` | Already exposes a `barista` entry + `onNavChange('barista')` — no extension needed for Phase 1 |
| NEW atom | `BaristaSelectionPill` | 5 logical variants (default, custom, custom-selected, custom-input, added) covering Figma's 8 visual states (hover states via CSS) |
| NEW molecule | `BaristaPanelHeader` | Logo mark + subtitle + close |
| NEW molecule | `BaristaAutoModeCard` | Wraps `Toggle`; copy flips per PRD |
| NEW molecule | `BaristaWelcomeSection` | Onboarding + Profile Ready states |
| NEW molecule | `BaristaProfileWidget` | Persona summary with hover-reveal edit/delete |
| NEW molecule | `BaristaSuggestedCard` | Auto-OFF: Send / Edit (inline) / Try another |
| NEW molecule | `BaristaTurnCard` | 5 status bullets: running/paused/success/warning/error |
| NEW organism | `BaristaSidePanel` | 315-wide right rail; 5 of 6 Figma states implemented (Tasks deferred) |
| NEW organism | `BaristaSetupPage` | 3-step flow with local form state + Cancel CTA |
| NEW state | `BaristaProvider` + `useBarista` | In-memory context (per user requirement) |

## Token Audit (Barista-specific layers)

| Layer | Property | Figma Token | Code Value | Status |
|---|---|---|---|---|
| Side panel root | `background` | `Background/Container` `#ffffff` | `var(--bg-elements)` | PASS |
| Side panel root | `border-left` | `Border/Subtle` `#e6e7ea` | `var(--border-subtle)` | PASS |
| Panel header | `background` | `Background/Container` | `var(--bg-elements)` | PASS |
| Panel header logo bg | `background` | `Complementary/Purple/Tint Light` `#7b4cff12` | `var(--purple-tint-light)` | PASS |
| Auto Mode Card | `background` | `Background/Surface Lighter` `#f7f7f7` | `#F7F7F7` (literal — matches Figma hex) | WARN (no token in globals.css) |
| Auto Mode Card | `border-bottom` | `Border/Subtle` | `var(--border-subtle)` | PASS |
| Auto Mode title | `color` | `Base/Base-900` | `var(--text-primary)` | PASS |
| Auto Mode subtitle | `color` | `Text & Icon/Secondary` `#4f566c` | `var(--text-secondary)` | PASS |
| Profile widget | `background` | `Background/Surface Darker` `#e6e7ea` | `var(--bg-subtle)` | PASS |
| Profile widget text | `color` | `Text & Icon/Secondary` | `var(--text-secondary)` | PASS |
| Welcome icon | `background` | `Complementary/Purple/Tint Light` | `var(--purple-tint-light)` | PASS |
| Welcome icon | `color` | `Complementary/Purple/500` `#7b4cff` | `var(--purple)` | PASS |
| Profile Ready pill | `background` | `Complementary/Purple/Tint Light` | `var(--purple-tint-light)` | PASS |
| Profile Ready pill | `border` | `Complementary/Purple/Tint Dark` `#7b4cff66` | `var(--purple-tint-dark)` | PASS (token added this pass) |
| Selection Pill — added | `border` | `Border/Focus` `#1770ef` | `var(--border-focus)` | PASS |
| Selection Pill — added | `color` | `Text & Icon/Brand` | `var(--text-brand)` | PASS |
| Selection Pill — custom-selected | `border` | `Interactive/BG/Brand` | `var(--brand)` | PASS |
| Suggested Card | `border-top` | `Border/Subtle` | `var(--border-subtle)` | PASS |
| Suggested Card description box | `border` | `Base/Base-100` | `var(--border-default)` | PASS |
| Turn Card — running bullet | `color` | `Complementary/Purple/500` | `var(--purple)` | PASS |
| Turn Card — paused bullet | `color` | `Text & Icon/Tertiary` | `var(--text-tertiary)` | PASS |
| Turn Card — success bullet | `color` | `Status/Success/Success` | `var(--success)` | PASS |
| Turn Card — warning bullet | `color` | `Status/Warning` | `var(--warning)` | PASS |
| Turn Card — error bullet | `color` | `Status/Error/Error` | `var(--error)` | PASS |

**WARN items to promote to token:** Add `--bg-surface-lighter: #F7F7F7` to `globals.css` so the Auto Mode Card hex is sourced from a named token rather than a literal.

## State Coverage

| Component | State | In Figma | In Code | Source | Status |
|---|---|---|---|---|---|
| BaristaSidePanel | onboarding | yes | yes | Figma | PASS |
| BaristaSidePanel | profile-ready | yes | yes | Figma | PASS |
| BaristaSidePanel | approve | yes | yes | Figma | PASS |
| BaristaSidePanel | running | yes | yes | Figma | PASS |
| BaristaSidePanel | paused | yes | yes | Figma | PASS |
| BaristaSidePanel | tasks | yes | no | Figma — deferred to Phase 2 | SKIP |
| BaristaAutoModeCard | ON / OFF + subtitle copy | yes | yes | Figma + PRD | PASS |
| BaristaTurnCard | running / paused / success / warning / error | yes | yes | Figma | PASS |
| BaristaSelectionPill | default / default-hover / custom / custom-hover / custom-selected / custom-input / custom-input filled / added | yes | yes (5 variants + CSS :hover) | Figma | PASS |
| BaristaSetupPage | default / filled / final-setup | yes | yes (local `confirmed` gate) | Figma | PASS |
| BaristaSetupPage | Cancel exit | no (implied) | yes | User-approved (2026-04-15) | PASS |

## Interaction / Behavioral Coverage

| Behavior | Source | Implementation | Status |
|---|---|---|---|
| Pause on manual stop | User-approved | `pauseGeneration('manual')` on explicit action | PASS |
| Pause on screen switch mid-generation | User-approved | `notifyScreenSwitch()` on `onNavChange` | PASS |
| Auto mode default = OFF | PRD + user-approved | `initialState.autoMode = false` | PASS |
| Setup required for Barista, not Oracle | User-approved | Oracle route renders without setup; Barista panel only opens when `setupStatus === 'complete'` | PASS |
| Setup Cancel closes setup | User-approved | `onCancel → cancelSetup()` returns to prior state | PASS |
| In-memory persistence only | User-approved | No `localStorage`/`sessionStorage` writes | PASS |
| Center always Oracle | PRD | Barista panel is siblingof `<main>`; clicking Barista sidebar routes to Oracle + opens panel | PASS |
| Sidebar nav item placement | Figma | Already present in `Sidebar.tsx` at correct position; no fork | PASS |

## Token / Design-System Additions

- `globals.css` — added `--purple-tint-dark: rgba(123,76,255,0.40)` (matches Figma `Complementary/Purple/Tint Dark #7b4cff66`)
- `globals.css` — added `.barista-pill[data-variant='…']:hover` selectors so Tailwind `hover:` with CSS variables is avoided (per project rule)

## Files Created / Modified

Created:
```
src/state/BaristaContext.tsx
src/components/atoms/BaristaSelectionPill.tsx
src/components/atoms/BaristaSelectionPill.stories.tsx
src/components/molecules/BaristaPanelHeader.tsx
src/components/molecules/BaristaAutoModeCard.tsx
src/components/molecules/BaristaWelcomeSection.tsx
src/components/molecules/BaristaProfileWidget.tsx
src/components/molecules/BaristaSuggestedCard.tsx
src/components/molecules/BaristaTurnCard.tsx
src/components/organisms/BaristaSidePanel.tsx
src/components/organisms/BaristaSetupPage.tsx
docs/design-qa/2026-04-15-barista-phase-1-qa.md (this file)
```

Modified:
```
src/App.tsx                 — wrap <HomePage> in <BaristaProvider>
src/pages/HomePage.tsx      — inject setup overlay + right rail + barista nav routing
src/styles/globals.css      — add --purple-tint-dark + .barista-pill hover selectors
```

## Typecheck

All Phase 1 Barista files pass `tsc --noEmit`. Remaining repo-wide typecheck errors are pre-existing in unrelated story files.

## Outstanding / Follow-ups

1. **Visual screenshot comparison** — requires running dev server; not executed this pass. Suggest running `npm run dev` and comparing each of the 9 Phase 1 Figma frames against the live render before declaring the visual QA step PASS.
2. **Storybook stories** — only `BaristaSelectionPill.stories.tsx` was authored inline. Remaining molecule/organism stories recommended before Phase 2 begins.
3. **figma-code-sync** — JSDoc `@figmaComponent` / `@figmaNode` / `@figmaFile` / `@figmaUrl` headers are present on every new component. Next `apparatus-generate-design` run should INSTANTIATE these from Figma.
4. **Tasks variant of `BaristaSidePanel`** — deferred; implement alongside Phase 2 Task Creation modal and detail view.
5. **Token promotion** — consider adding `--bg-surface-lighter: #F7F7F7` to the tokens collection so the Auto Mode Card literal is sourced from a named token.

## Verdict

Phase 1 scope **implemented and typecheck-clean**. Pending run-through visual QA against the nine Figma frames.
