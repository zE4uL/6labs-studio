# BigQuery Connector Flow Update — Design

Date: 2026-05-29
Surfaces: `BigQueryOnboardingModal.tsx`, `BigQueryDetailView.tsx`, `ChatActionMenuFlyout.tsx` (+ `ActionMenuItem`, `HomePage`)

## A. Onboarding modal

- **A2** Remove subtext "We'll read the project ID from it, authenticate, and import your tables." Keep "Upload a GCP service-account JSON."
- **A3** `MAX_JSON_BYTES` 256 KB → 5 MB (`5 * 1024 * 1024`). Update size-error copy to "5 MB".
- **B5** New distinct error state for structurally invalid key (parse fail / missing `project_id` / not an SA key): heading "This JSON needs to be fixed" + reason. Connect disabled until replaced.
- **B4** Rephrase banner heading "Before you connect" → "Heads up before connecting".
- **B3** Remove "Share with the whole organisation" checkbox + `orgWideAccess` state. Replace with static disclaimer: "Every member of this workspace will be able to query this BigQuery connection. It stays read-only."
- **B1** When the loader finishes the API call, show a bottom summary line "N of M tables need attention" (YELLOW count) inside the progress popup before flipping to success.
- **B2** New rejection path: SA key has write scope → loader fails into "Connection rejected — key has write access. 6labs requires a read-only key (BigQuery Data Viewer)." CTA: "Upload a read-only key" (no retry-as-is).

## B. Detail view

- **B3** Replace org-wide `Toggle` section with the same static disclaimer. No toggle.
- **B7** Refresh wipes all descriptions → confirmation popup before refreshing: "Refreshing re-imports schemas from BigQuery and clears every table and column description you've added. This can't be undone. Refresh anyway?" → Cancel / Refresh.
- **A1** Persist editable state (table/column descriptions + selected table) to `localStorage`; hydrate on mount as source of truth (mock BE).

## C. Chat-box connectors flyout

- **B6** Render project id as caption beneath the "BigQuery" label (wire `projectId` → `ConnectorOption.caption`).
- **B8** Replace per-connector on/off **switches** with **single-select radio** over the BigQuery table list (only one table queryable at a time). Selection persisted via A1.

## Assumption
Item 8 implemented in the chat flyout (BigQuery connector expands to a radio table list), per user confirmation.
