# Barista Full Flow — Final Design QA

**Date:** 2026-04-15
**Scope:** End-to-end Barista (Setup + Assist panel + Tasks tab + Oracle integration)
**Figma:** `i9fxQ6pXrgRITEzopoXpWL`, components section `6141:61216`, flow section `6425:89768`
**PRD:** Barista_Tasks PRD (internal)

---

## 1. Figma ↔ Code Component Match

All component sets in Figma's **barista** section (`6141:61216`) now have a 1:1 code counterpart.

| # | Figma component (set) | Figma node | Variants in Figma | Code file | Variant coverage |
|---|---|---|---|---|---|
| 1 | Barista Side Panel | `6017:72095` | Onboarding, Running, Paused, Profile Ready, Approve, Tasks | `organisms/BaristaSidePanel.tsx` | **all 6** |
| 2 | Barista/ Auto Mode Card | `6030:113851` | OFF, ON | `molecules/BaristaAutoModeCard.tsx` | both |
| 3 | Barista/ Suggested Card | `6126:65148` | OFF | `molecules/BaristaSuggestedCard.tsx` | single variant |
| 4 | Barista/ Setup Page | `6072:138` | Default, Filled, Final Setup | `organisms/BaristaSetupPage.tsx` | all 3 (Filled is emergent from form state) |
| 5 | Barista/ Welcome Section | `6075:59471` | Onboarding, Profile Ready | `molecules/BaristaWelcomeSection.tsx` | both |
| 6 | Barista/ Card/ Turn | `6147:73761` | Running, Error, Success, Warning, Paused | `molecules/BaristaTurnCard.tsx` | all 5 |
| 7 | Barista/ Selection Pill | `6042:11` | Default, Default-Hover, Custom, Custom-Hover, Custom-Selected, Custom-Input, Custom-Input Filled, Added (8) | `atoms/BaristaSelectionPill.tsx` | 5 persistent variants + CSS hovers for Default/Custom |
| 8 | Barista/ Panel Header | `5974:81727` | single (Icon + Title + Pill + Actions) | `molecules/BaristaPanelHeader.tsx` | all 4 slots |
| 9 | Barista/ Profile widget | `6076:95152` | Default, Variant2 | `molecules/BaristaProfileWidget.tsx` | Default + hover-reveal actions (Variant2) |
| 10 | Barista/ Card/ Task | `6147:73719` | Default, Variant2 | `molecules/BaristaTaskItem.tsx` | both |
| 11 | Barista/ Dashboard/ Task List/Status Pill | `6212:65229` | Active, Scheduled, Paused | `atoms/TaskStatusPill.tsx` | all 3 |
| 12 | Barista/ Dashboard | `6212:74278` | Empty, Filled | — | **deferred**, see §6 |
| 13 | Barista/ Dashboard/ Task List Card | `6212:64441` | — | — | **deferred**, see §6 |
| 14 | Barista/ Dashboard/ Stat Card | `6272:82068` | Default, Variant2 | — | **deferred**, see §6 |

## 2. Panel Layout Verification

| Property | Figma | Code | Status |
|---|---|---|---|
| Panel width | 320 px | `w-[320px]` | PASS |
| Header height | 56 px | 56 px | PASS |
| Auto Mode Card height | 65 px | 65 px | PASS |
| Toggle dimensions | 36 × 22 (16 thumb) | 36 × 22 (16 thumb) | PASS |
| Tabs row | Assist + Tasks w/ PRO badge | Assist + Tasks w/ PRO badge, Assist active | PASS |
| Selection Pill height | 30 px | `py-[6px] + 12px line` ≈ 30 | PASS |
| Turn card width | 288 px | flows in 16px-padded 320 = 288 | PASS |

## 3. Token Audit

| Layer | Figma token | CSS variable | Status |
|---|---|---|---|
| Panel background | `Background/Container` | `var(--bg-elements)` | PASS |
| Panel border-left | `Border/Subtle` | `var(--border-subtle)` | PASS |
| Auto Mode Card bg | `Background/Surface Lighter` `#f7f7f7` | literal `#F7F7F7` | WARN (no token alias) |
| Toggle ON bg | `Interactive/BG/Brand` | `var(--brand)` | PASS |
| Toggle OFF bg | `Border/Default` | `var(--border-default)` | PASS |
| Welcome Section pill bg | `Complementary/Purple/Tint Light` | `var(--purple-tint-light)` | PASS |
| Welcome Section pill border | `Complementary/Purple/Tint Dark` | `var(--purple-tint-dark)` | PASS |
| Suggested card CTA gradient | `#1770EF → #7B4CFF` | `.barista-cta-approve` | PASS |
| Setup / Start CTA gradient | `#7B4CFF → #0EA4C5` | `.barista-cta` | PASS |
| Turn Card bullet (running) | `Complementary/Purple/500` | `var(--purple)` | PASS |
| Turn Card bullet (success) | `Status/Success/Success` | `var(--success)` | PASS |
| Turn Card bullet (error) | `Status/Error/Error` | `var(--error)` | PASS |
| Turn Card bullet (warning) | `Status/Warning` | `var(--warning)` | PASS |
| Task Status Pill (Active) | green tint + dot | `var(--success-bg)` + `var(--success)` | PASS |
| Task Status Pill (Scheduled) | blue tint + dot | `var(--bg-tint-light)` + `var(--brand)` | PASS |
| Task Status Pill (Paused) | warning tint + dot | `var(--warning-bg)` + `var(--warning)` | PASS |

All FAILs from the 2026-04-15 phase-1 pass have been resolved. One WARN remains (`#F7F7F7` literal for the Auto Mode surface) — deferred to a follow-up tokens sync.

## 4. State Coverage

### Side Panel
| State | Trigger | Content | Footer CTA | Status |
|---|---|---|---|---|
| Onboarding | `setupStatus !== 'complete'` | WelcomeSection (Onboarding) | "Let's set up" gradient | PASS |
| Profile Ready | setup done, no suggested, no generating | WelcomeSection (Profile Ready) + ProfileWidget | "Start Barista" + Reset | PASS |
| Approve | Auto OFF + pending `suggestedQuestion` | Prior turns + SuggestedCard docked | Send this question / Try another | PASS |
| Running | `generating` | Live turn cards + simulated thinking | Stop + Reset | PASS |
| Paused | `pauseReason` set | Last turn with pausedReason inline | Start Barista (resume) + Reset | PASS |
| Tasks | `activeTab === 'tasks'` | Empty state OR scheduled list | inline New task CTA | PASS |

### Setup
| State | Trigger | Content | CTA | Status |
|---|---|---|---|---|
| Default | initial entry | Department & Role card, Focus Areas card, Additional Context card | Cancel / Confirm setup (disabled until ready) | PASS |
| Filled | department picked + at least one role + at least one focus | Same layout with pills "added" + inline custom-role field | Confirm setup enabled | PASS |
| Final Setup | user clicked Confirm setup | Success banner + summary cards + "Start Barista +" | Commits persona + closes overlay | PASS |

### Tasks
| State | Trigger | Content | Status |
|---|---|---|---|
| Empty | `tasks.length === 0` | Barista icon + "No tasks yet" + 4 quick-start chips | PASS |
| Active | `tasks.length > 0` | List of `BaristaTaskItem` cards + New task CTA | PASS |
| Create dialog (fresh) | user clicks new | name/prompt/frequency/date/time/timezone | Cancel / Save & schedule / Run once | PASS |
| Create dialog (post-run) | re-opens from schedule banner | same form | Cancel / Save & schedule only | PASS |
| Detail | `activeTaskId` set | Q bubble + chronological results with Branch CTA on latest | PASS |

### Setup Selection Pill (Figma 8-variant set)
| Figma variant | Code variant / mechanism | Status |
|---|---|---|
| Default | `variant="default"` | PASS |
| Default - Hover | CSS `.barista-pill[data-variant="default"]:hover` | PASS |
| Custom | `variant="custom"` | PASS |
| Custom - Hover | CSS `.barista-pill[data-variant="custom"]:hover` | PASS |
| Custom - Selected | `variant="custom-selected"` | PASS |
| Custom - Input | `variant="custom-input"` (empty `value`) | PASS |
| Custom - Input Filled | `variant="custom-input"` with populated `value` | PASS |
| Added | `variant="added"` | PASS |

## 5. Flow Integration — Barista ↔ Oracle

Per PRD "center always belongs to Oracle." The integration covers:

| Flow step | Behavior | Status |
|---|---|---|
| Click Barista nav entry | Routes to Oracle + opens panel. If not set up, jumps into setup page overlay. | PASS |
| Confirm Setup (two-step) | Local flip to summary screen first; context persona commit + overlay dismissal happens on "Start Barista +". | PASS |
| Start Barista (Profile Ready) | Queues a first `suggestedQuestion` and flips panel to Approve. | PASS |
| Send this question (Auto OFF) | `sendSuggested(q)` → turn appears as "Running" → after 2.5s simulated Oracle generation → turn flips to Success with a mock answer inline. | PASS |
| Auto ON | After a successful turn, Barista auto-queues and auto-sends the next follow-up (with a 0.8s beat). Turn log grows. | PASS |
| Manual Stop | `pauseGeneration('manual')` flips the active turn to Paused; footer switches to "Start Barista (resume) + Reset." | PASS |
| Screen switch mid-turn | Sidebar nav click during `generating` calls `notifyScreenSwitch()` → turn paused with "Stopped because you switched screens" (per PRD copy). | PASS |
| Reset | `resetSession()` clears turns, pending question, pauseReason. Persona + setup status preserved. | PASS |
| Settings gear (post-setup) | Opens setup page overlay again (edit persona). | PASS |
| Task Creation modal | Opens over the center. Cancel/Save & schedule/Run once. Timezone auto-detected via `Intl.DateTimeFormat()`. | PASS |
| Task Detail | Question bubble + results list + Branch in new chat → closes detail, routes to Oracle, prefills searchQuery with the task's prompt. | PASS |
| Run once (from dialog) | Closes dialog → switches to Oracle + prefills searchQuery. Post-run schedule banner opens the same modal with Run once hidden. | PASS (handler wired; Oracle-side banner placement deferred) |

### Note: Oracle response loading with Barista state

Per the user-requested behavior "while running barista oracle response should also load as per the barista states":

- The Barista panel renders **Running → Success** progression via `BaristaTurnCard`.
- `turn.answer` is populated on success with a mock Oracle response and rendered inline inside the turn card so there's a visible Q → A pair for each Barista-driven turn.
- Oracle's center view itself is not modified (per PRD "center stays Oracle"), so its own Thinking / response rendering is owned by `OracleAgentView`. If a proper "Oracle driven by Barista" flow is needed that writes directly into Oracle's chat, that integration will need to be wired inside `OracleAgentView` (add `externalQuery` + `onAnswer` props). That's outside this pass.

## 6. Deferred Work

These remain open and are tracked for the next scope:

1. **Barista Dashboard** (`6212:74278`, Empty + Filled) — the full-width "Manage" view that surfaces the task list across the whole center. PRD positions it as a second-level admin surface.
2. **Task List Card** (`6212:64441`) — the 1080-wide row used in the dashboard. Different from the 288-wide side-panel task item.
3. **Stat Card** (`6272:82068`) — dashboard metrics tiles.
4. **OracleAgentView ↔ Barista integration** — for a true "Oracle responds to Barista" flow the Oracle view needs to accept an external query + emit completion. Currently the panel's turn cards carry the Q/A; Oracle center is unchanged.
5. **figma-code-sync pass** — every new Barista component has `@figmaComponent` / `@figmaNode` / `@figmaFile` / `@figmaUrl` JSDoc headers, but a formal sync-to-Figma-description run hasn't been executed this session.
6. **Token alias `--bg-surface-lighter: #F7F7F7`** — promote the literal used by Auto Mode Card into a named token.

## 7. Verdict

All Figma component variants have been implemented or explicitly deferred. Panel width, header pill, toggle size, and tabs row now match Figma. Selection Pill covers all 8 variants via 5 persistent states + CSS hovers. Task Status Pill ships with 3 variants. Oracle-driven-by-Barista simulation is in place with mock answers for both Auto modes, pause/resume, and reset.

Phase 1 + Tasks capability is **ready to demo**.
