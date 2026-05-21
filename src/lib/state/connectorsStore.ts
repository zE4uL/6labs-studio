/**
 * connectorsStore — tiny module-level store for connector onboarding state.
 *
 * Models BigQuery's full lifecycle (not-connected → connected → error) plus a
 * registry of available connectors used by the chat-flyout "Add connector"
 * submenu. Persists to localStorage so the prototype survives page refresh.
 *
 * Code-first prototype only — replace with real per-workspace API state when
 * the backend lands.
 */

import { useSyncExternalStore } from 'react'

// ─── BigQuery connection model ───────────────────────────────────────────────

export type BigQueryErrorReason =
  | 'permission-revoked'
  | 'credentials-expired'
  | 'project-not-found'
  | 'network'
  | 'unknown'

export type BigQueryVerdict = 'GREEN' | 'YELLOW' | 'RED'

export interface BigQueryColumn {
  name: string
  type: string
  description: string
}

export interface BigQueryTable {
  fqn: string
  dataset: string
  tableId: string
  rows: number
  bytes: number
  description: string
  columns: BigQueryColumn[]
  /** Backend verdict for this table — GREEN ready, YELLOW needs more descriptions. */
  verdict: BigQueryVerdict
  verdictReasons: string[]
  /** Optional LLM-authored analyst report. Available even though it sits outside the v1 scope. */
  llmSummary?: string
}

export type BigQueryConnection =
  | { kind: 'not-connected' }
  | {
      kind: 'connected'
      projectId: string
      saEmail?: string
      onboardedAt: number
      /** True while the 6labs team's internal table review is in progress. */
      syncing: boolean
      /** Aggregate verdict across all imported tables. */
      verdict: BigQueryVerdict
      verdictReason: string
      /** ms epoch — null until the first successful refresh. */
      lastRefreshedAt: number | null
      /** Imported tables with editable table-level + column-level descriptions. */
      tables: BigQueryTable[]
      /** True when the connection is shared with the whole organisation. */
      orgWideAccess: boolean
    }
  | {
      kind: 'error'
      projectId: string
      reason: BigQueryErrorReason
      /** ms epoch of the last known healthy state, if any. */
      lastRefreshedAt: number | null
    }

// ─── Connector registry (mirrors CONNECTORS in ContextConnectorsView) ────────

export interface OnboardedConnector {
  id: string
  label: string
  /** Secondary caption shown in the flyout (e.g. project id) */
  secondary?: string
}

export interface AvailableConnector {
  id: string
  label: string
}

export const AVAILABLE_CONNECTORS: AvailableConnector[] = [
  { id: 'bigquery', label: 'BigQuery' },
  { id: 'appsflyer', label: 'AppsFlyer' },
  { id: 'jira', label: 'Jira' },
  { id: 'slack', label: 'Slack' },
  { id: 'discord', label: 'Discord' },
  { id: 'facebook-ads', label: 'Facebook Ads' },
]

// ─── Store ───────────────────────────────────────────────────────────────────

interface ConnectorsState {
  bigQuery: BigQueryConnection
}

const STORAGE_KEY = '6labs.connectors.v3'

const NOT_CONNECTED: BigQueryConnection = { kind: 'not-connected' }

// ─── Mock onboarding payload (from connector.json, 2026-05-11) ───────────────
// Used to seed a realistic post-connect state for the prototype. Mirrors the
// shape the backend returns from the `onboard` job and the `connector_cache`.

const MOCK_APP_CLICK_DATA: BigQueryTable = {
  fqn: 'sixlabs-qa.oracleDataSet.app_click_data',
  dataset: 'oracleDataSet',
  tableId: 'app_click_data',
  rows: 1_035_226,
  bytes: 427_425_713,
  description: '',
  verdict: 'YELLOW',
  verdictReasons: ['table description missing', '21/31 columns described (67%)'],
  columns: [
    { name: 'guid', type: 'STRING', description: 'Unique user or device GUID' },
    { name: 'app_pkg', type: 'STRING', description: 'name of the app that was clicked/launched.' },
    { name: 'created_at', type: 'TIMESTAMP', description: 'Event timestamp in UTC for when the click event was recorded.' },
    { name: 'prod_ver', type: 'STRING', description: 'BlueStacks/client product version at event time.' },
    { name: 'user_state', type: 'STRING', description: '' },
    { name: 'app_type', type: 'STRING', description: '' },
    { name: 'country', type: 'STRING', description: 'Country associated with event/user (usually 2-letter style country signal).' },
    { name: 'oem', type: 'STRING', description: 'Original Equipment Manufacturer ex: nxt, nxt_mac2.' },
    { name: 'email', type: 'STRING', description: 'User email' },
    { name: 'app_name', type: 'STRING', description: 'Human-readable app name at event time.' },
    { name: 'app_ver', type: 'STRING', description: 'App version code/string for the clicked app.' },
    { name: 'home_app_ver', type: 'STRING', description: '' },
    { name: 'utm_campaign', type: 'STRING', description: 'Source of acquisition for the user (ad, direct URL, influencer, etc.).' },
    { name: 'ip', type: 'STRING', description: 'IP address observed at event time.' },
    { name: 'install_id', type: 'STRING', description: 'Install-level identifier for player/app installation instance.' },
    { name: 'vm_id', type: 'STRING', description: 'Virtual machine instance identifier.' },
    { name: 'vm_name', type: 'STRING', description: 'VM display/name label. ex: Pie64_10, Nougat32_15, Rvc64_141, Tiramisu64_11.' },
    { name: 'google_aid', type: 'STRING', description: 'Google Advertising ID associated with runtime/user context.' },
    { name: 'android_id', type: 'STRING', description: 'Android device identifier exposed in runtime context.' },
    { name: 'machine_id', type: 'STRING', description: 'Host machine identifier.' },
    { name: 'version_machine_id', type: 'STRING', description: '' },
    { name: 'app_ver_name', type: 'STRING', description: '' },
    { name: 'app_category', type: 'STRING', description: 'Category label of app (game/tools/etc).' },
    { name: 'externalsource_campaignid', type: 'STRING', description: '' },
    { name: 'externalsource_version', type: 'STRING', description: '' },
    { name: 'image_name', type: 'STRING', description: 'Runtime image/build label. ex: Pie64, Nougat32, Tiramisu64.' },
    { name: 'hypervisor', type: 'STRING', description: 'Hypervisor/runtime backend type.' },
    { name: 'source', type: 'STRING', description: 'Immediate source component/package from which the click was triggered.' },
    { name: 'arg1', type: 'STRING', description: '' },
    { name: 'arg2', type: 'STRING', description: '' },
    { name: 'arg3', type: 'STRING', description: '' },
  ],
  llmSummary: `**Core Identity**: This table is a filtered slice of app click event data scoped to a single game (com.nexon.ma — MapleStory: Idle RPG), recorded during April 2026.

**Mandatory query constraints**
• app_pkg = 'com.nexon.ma' — 100% constant. Don't group by it.
• app_category = 'game_roleplaying' — 100% constant.
• vm_id = '0' — 100% constant. Static default.
• Time range is 2026-03-31 → 2026-04-30. Never use CURRENT_DATE() — always pin explicit April 2026 bounds.

**Unusable columns** (100% NULL — never SELECT or GROUP BY): user_state, app_type, home_app_ver, externalsource_campaignid, externalsource_version, arg1, arg2, arg3.

**Best grouping dimensions**: country (KR 31% / TW 25% / US 17%), utm_campaign, app_name (acts as locale proxy), oem (nxt 86% Windows / nxt_mac2 9% Mac), image_name.

**Watch-outs**: 8,975 unique guid across 50k rows — always COUNT(DISTINCT guid) for user counts, never COUNT(*). app_ver_name (1.7.1 / 1.8.1) is the human-readable version; app_ver is the internal build code.`,
}

export function getMockBigQueryConnection(): Extract<BigQueryConnection, { kind: 'connected' }> {
  return {
    kind: 'connected',
    projectId: 'sixlabs-qa',
    saEmail: 'bq-oracle-limited-access@sixlabs-qa.iam.gserviceaccount.com',
    onboardedAt: Date.parse('2026-05-11T07:24:53Z'),
    syncing: false,
    verdict: 'YELLOW',
    verdictReason: "1 table(s) YELLOW: ['sixlabs-qa.oracleDataSet.app_click_data']",
    lastRefreshedAt: Date.parse('2026-05-11T07:24:53Z'),
    tables: [MOCK_APP_CLICK_DATA],
    orgWideAccess: false,
  }
}

function readStorage(): ConnectorsState {
  if (typeof window === 'undefined') return { bigQuery: NOT_CONNECTED }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return { bigQuery: NOT_CONNECTED }
    const parsed = JSON.parse(raw) as Partial<ConnectorsState>
    if (parsed.bigQuery && isValidBigQueryConnection(parsed.bigQuery)) {
      return { bigQuery: parsed.bigQuery }
    }
    return { bigQuery: NOT_CONNECTED }
  } catch {
    return { bigQuery: NOT_CONNECTED }
  }
}

function isValidBigQueryConnection(v: unknown): v is BigQueryConnection {
  if (!v || typeof v !== 'object') return false
  const k = (v as { kind?: unknown }).kind
  return k === 'not-connected' || k === 'connected' || k === 'error'
}

function writeStorage(s: ConnectorsState) {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(s))
  } catch {
    /* ignore quota / private-mode errors */
  }
}

let state: ConnectorsState = readStorage()
const listeners = new Set<() => void>()

function emit() {
  listeners.forEach((l) => l())
}

function setState(next: ConnectorsState) {
  state = next
  writeStorage(state)
  emit()
}

// ─── BigQuery actions ────────────────────────────────────────────────────────

/**
 * Marks BigQuery as connected. After the modal's success screen this is
 * called with `syncing: true` (the 6labs team's review is just starting).
 * Once the table list is back, the same store update flips `syncing: false`
 * and replaces `tables` with whatever the backend returned.
 */
export function markBigQueryConnected(args: {
  projectId: string
  saEmail?: string
  syncing?: boolean
  orgWideAccess?: boolean
}) {
  const syncing = args.syncing ?? true
  const previous = state.bigQuery
  const carriedTables =
    previous.kind === 'connected' && previous.projectId === args.projectId
      ? previous.tables
      : []
  setState({
    bigQuery: {
      kind: 'connected',
      projectId: args.projectId,
      saEmail: args.saEmail,
      onboardedAt:
        previous.kind === 'connected' && previous.projectId === args.projectId
          ? previous.onboardedAt
          : Date.now(),
      syncing,
      verdict: syncing
        ? 'YELLOW'
        : previous.kind === 'connected'
          ? previous.verdict
          : 'YELLOW',
      verdictReason: syncing ? 'Importing tables…' : '',
      lastRefreshedAt: syncing ? null : Date.now(),
      tables: carriedTables,
      orgWideAccess:
        args.orgWideAccess ??
        (previous.kind === 'connected' ? previous.orgWideAccess : false),
    },
  })
}

/** Drops the seeded mock tables into the store once the "sync" timer fires. */
export function markBigQuerySyncComplete(payload?: {
  tables?: BigQueryTable[]
  verdict?: BigQueryVerdict
  verdictReason?: string
}) {
  if (state.bigQuery.kind !== 'connected') return
  const tables = payload?.tables ?? getMockBigQueryConnection().tables
  const verdict = payload?.verdict ?? computeVerdict(tables)
  setState({
    bigQuery: {
      ...state.bigQuery,
      syncing: false,
      tables,
      verdict,
      verdictReason: payload?.verdictReason ?? buildVerdictReason(tables),
      lastRefreshedAt: Date.now(),
    },
  })
}

// ─── Table + column edits ────────────────────────────────────────────────────

export function updateTableDescription(fqn: string, description: string) {
  if (state.bigQuery.kind !== 'connected') return
  const tables = state.bigQuery.tables.map((t) =>
    t.fqn === fqn ? recomputeTable({ ...t, description }) : t,
  )
  setState({
    bigQuery: {
      ...state.bigQuery,
      tables,
      verdict: computeVerdict(tables),
      verdictReason: buildVerdictReason(tables),
    },
  })
}

export function updateColumnDescription(
  fqn: string,
  columnName: string,
  description: string,
) {
  if (state.bigQuery.kind !== 'connected') return
  const tables = state.bigQuery.tables.map((t) => {
    if (t.fqn !== fqn) return t
    const columns = t.columns.map((c) =>
      c.name === columnName ? { ...c, description } : c,
    )
    return recomputeTable({ ...t, columns })
  })
  setState({
    bigQuery: {
      ...state.bigQuery,
      tables,
      verdict: computeVerdict(tables),
      verdictReason: buildVerdictReason(tables),
    },
  })
}

export function setBigQueryOrgWideAccess(value: boolean) {
  if (state.bigQuery.kind !== 'connected') return
  setState({
    bigQuery: { ...state.bigQuery, orgWideAccess: value },
  })
}

function recomputeTable(t: BigQueryTable): BigQueryTable {
  const described = t.columns.filter((c) => c.description.trim().length > 0).length
  const total = t.columns.length
  const tableMissing = t.description.trim().length === 0
  const reasons: string[] = []
  if (tableMissing) reasons.push('table description missing')
  if (described < total)
    reasons.push(`${described}/${total} columns described (${total ? Math.round((described / total) * 100) : 0}%)`)
  const verdict: BigQueryVerdict = !tableMissing && described === total ? 'GREEN' : 'YELLOW'
  return { ...t, verdict, verdictReasons: reasons }
}

function computeVerdict(tables: BigQueryTable[]): BigQueryVerdict {
  if (tables.length === 0) return 'YELLOW'
  if (tables.every((t) => t.verdict === 'GREEN')) return 'GREEN'
  return 'YELLOW'
}

function buildVerdictReason(tables: BigQueryTable[]): string {
  const yellow = tables.filter((t) => t.verdict === 'YELLOW').map((t) => t.fqn)
  if (yellow.length === 0) return 'All tables documented and ready.'
  return `${yellow.length} table(s) YELLOW: [${yellow.map((f) => `'${f}'`).join(', ')}]`
}

export function markBigQueryError(reason: BigQueryErrorReason) {
  const projectId =
    state.bigQuery.kind === 'not-connected' ? '' : state.bigQuery.projectId
  const lastRefreshedAt =
    state.bigQuery.kind === 'not-connected' ? null : state.bigQuery.lastRefreshedAt
  setState({
    bigQuery: { kind: 'error', projectId, reason, lastRefreshedAt },
  })
}

export function disconnectBigQuery() {
  setState({ bigQuery: NOT_CONNECTED })
}

// Legacy shim for existing call sites that just toggle a project id.
export function setBigQueryConnected(projectId: string | null) {
  if (!projectId) {
    disconnectBigQuery()
    return
  }
  markBigQueryConnected({ projectId, syncing: true })
}

/** Seed the store with the sample sixlabs-qa payload — used by Storybook + demos. */
export function loadMockBigQueryConnection() {
  setState({ bigQuery: getMockBigQueryConnection() })
}

// ─── Subscriptions / hooks ───────────────────────────────────────────────────

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

function getSnapshot(): ConnectorsState {
  return state
}

export function useConnectorsState(): ConnectorsState {
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
}

export function useBigQueryConnection(): BigQueryConnection {
  return useConnectorsState().bigQuery
}

/**
 * Hook returning the onboarded-connector list in the shape ChatActionMenuFlyout
 * expects. Connectors in error state are excluded — they're surfaced on their
 * detail page instead so the user can fix them.
 */
export function useOnboardedConnectors(): OnboardedConnector[] {
  const bq = useBigQueryConnection()
  const list: OnboardedConnector[] = []
  if (bq.kind === 'connected') {
    list.push({
      id: 'bigquery',
      label: 'BigQuery',
      secondary: bq.projectId,
    })
  }
  return list
}

export function useAvailableConnectors(): AvailableConnector[] {
  const bq = useBigQueryConnection()
  // In error state we still treat BigQuery as "needs attention" — keep it out
  // of the "Add connector" submenu so the user doesn't double-onboard.
  const onboardedIds = new Set<string>()
  if (bq.kind === 'connected' || bq.kind === 'error') {
    onboardedIds.add('bigquery')
  }
  return AVAILABLE_CONNECTORS.filter((c) => !onboardedIds.has(c.id))
}

// ─── "Request onboarding" event ──────────────────────────────────────────────

type OnboardingHandler = (connectorId: string) => void
const onboardingHandlers = new Set<OnboardingHandler>()

export function requestConnectorOnboarding(connectorId: string) {
  onboardingHandlers.forEach((h) => h(connectorId))
}

export function onConnectorOnboardingRequest(handler: OnboardingHandler) {
  onboardingHandlers.add(handler)
  return () => {
    onboardingHandlers.delete(handler)
  }
}
