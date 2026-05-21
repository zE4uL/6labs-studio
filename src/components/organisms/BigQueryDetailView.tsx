/**
 * BigQueryDetailView — Detail page for the BigQuery connector. Wraps the
 * generic ConnectorDetailView for the "not connected" state and replaces
 * its body with state-specific UI once onboarding has happened.
 *
 * Post 2026-05-18 review:
 *  • The status pill is now tri-state (Ready / Needs descriptions / Error) so
 *    YELLOW is visible to the user.
 *  • The imported table list is rendered with per-table verdict and editable
 *    table + column descriptions — Oracle answers depend on them.
 *  • LLM-authored analyst summaries surface in a collapsed section so the
 *    initial scope (basic imports + editable descriptions) stays the default.
 */

import { useEffect, useMemo, useState, type ReactNode } from 'react'

// Adds/removes `key` in a pending-edits record. Drops the key when the next
// value matches `committed` so an edit that lands back at the saved value
// stops contributing to the dirty flag.
function stagePending(
  prev: Record<string, string>,
  key: string,
  next: string,
  committed: string,
): Record<string, string> {
  if (next === committed) {
    if (!(key in prev)) return prev
    const { [key]: _omit, ...rest } = prev
    return rest
  }
  if (prev[key] === next) return prev
  return { ...prev, [key]: next }
}
import Button from '../ui/Button'
import { ConnectorDetailView, type ConnectorDetail } from './ConnectorDetailView'
import { ConnectionStatusPill } from '../atoms/ConnectionStatusPill'
import { DropdownArrowIcon } from '../icons/DropdownArrowIcon'
import {
  setBigQueryOrgWideAccess,
  updateColumnDescription,
  updateTableDescription,
  type BigQueryColumn,
  type BigQueryConnection,
  type BigQueryErrorReason,
  type BigQueryTable,
  type BigQueryVerdict,
} from '../../lib/state/connectorsStore'

export interface BigQueryDetailViewProps {
  connector: ConnectorDetail
  connection: BigQueryConnection

  /** Open the onboarding modal in "idle" state (first-time connect). */
  onConnect?: () => void
  /** Open the onboarding modal in "idle" state for re-auth. */
  onReconnect?: () => void
  /** Open the onboarding modal pre-focused on the file dropzone. */
  onReuploadCredentials?: () => void
  /** Kick off another internal table review pass. */
  onRefresh?: () => void
  /** Retry the last failing call (network errors). */
  onRetry?: () => void
  /** Remove the connection entirely. */
  onDisconnect?: () => void
  /** Notifies parent when the unsaved-changes flag flips, so the parent can
   *  intercept navigation and prompt the user. */
  onDirtyChange?: (dirty: boolean) => void
  /** Imperative reset signal — when this number changes, pending edits are
   *  thrown away. Used by the parent's "Discard & leave" confirmation. */
  resetSignal?: number

  className?: string
}

export function BigQueryDetailView({
  connector,
  connection,
  onConnect,
  onReconnect,
  onReuploadCredentials,
  onRefresh,
  onRetry,
  onDisconnect,
  onDirtyChange,
  resetSignal,
  className,
}: BigQueryDetailViewProps) {
  // Pending edits buffer — table descriptions, column descriptions and the
  // org-wide-access toggle stay local until the user clicks "Save changes".
  // Keyed by fqn (tables) and `${fqn}::${columnName}` (columns).
  const [pendingTableDescs, setPendingTableDescs] = useState<Record<string, string>>({})
  const [pendingColumnDescs, setPendingColumnDescs] = useState<Record<string, string>>({})
  const [pendingOrgWide, setPendingOrgWide] = useState<boolean | null>(null)

  const isError = connection.kind === 'error'
  const isSyncing = connection.kind === 'connected' && connection.syncing
  const dirty =
    connection.kind === 'connected' &&
    (Object.keys(pendingTableDescs).length > 0 ||
      Object.keys(pendingColumnDescs).length > 0 ||
      (pendingOrgWide !== null && pendingOrgWide !== connection.orgWideAccess))

  // Reset the buffer when we switch to a different connection state — avoids
  // stale edits surviving a disconnect/reconnect cycle.
  useEffect(() => {
    setPendingTableDescs({})
    setPendingColumnDescs({})
    setPendingOrgWide(null)
  }, [connection.kind])

  // Notify parent when the dirty flag flips so it can intercept navigation.
  useEffect(() => {
    onDirtyChange?.(dirty)
  }, [dirty, onDirtyChange])

  // Imperative reset from parent (used by the unsaved-changes confirm modal).
  useEffect(() => {
    if (resetSignal === undefined) return
    setPendingTableDescs({})
    setPendingColumnDescs({})
    setPendingOrgWide(null)
  }, [resetSignal])

  // Warn on browser-level navigation away (tab close, refresh, deep link).
  useEffect(() => {
    if (!dirty) return
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault()
      e.returnValue = ''
    }
    window.addEventListener('beforeunload', handler)
    return () => window.removeEventListener('beforeunload', handler)
  }, [dirty])

  // Not connected — defer to the generic "About / Benefits / Steps" template.
  if (connection.kind === 'not-connected') {
    return (
      <ConnectorDetailView
        connector={connector}
        onConnect={onConnect}
        className={className}
      />
    )
  }

  const handleSave = () => {
    if (connection.kind !== 'connected') return
    Object.entries(pendingTableDescs).forEach(([fqn, desc]) => {
      updateTableDescription(fqn, desc)
    })
    Object.entries(pendingColumnDescs).forEach(([key, desc]) => {
      const sep = key.indexOf('::')
      if (sep === -1) return
      const fqn = key.slice(0, sep)
      const col = key.slice(sep + 2)
      updateColumnDescription(fqn, col, desc)
    })
    if (pendingOrgWide !== null && pendingOrgWide !== connection.orgWideAccess) {
      setBigQueryOrgWideAccess(pendingOrgWide)
    }
    setPendingTableDescs({})
    setPendingColumnDescs({})
    setPendingOrgWide(null)
  }

  const handleDiscard = () => {
    setPendingTableDescs({})
    setPendingColumnDescs({})
    setPendingOrgWide(null)
  }

  const pendingCount =
    Object.keys(pendingTableDescs).length +
    Object.keys(pendingColumnDescs).length +
    (pendingOrgWide !== null &&
    connection.kind === 'connected' &&
    pendingOrgWide !== connection.orgWideAccess
      ? 1
      : 0)

  return (
    <div
      className={['flex flex-col w-full flex-1', className]
        .filter(Boolean)
        .join(' ')}
    >
      {/* Header */}
      <Header
        connector={connector}
        connection={connection}
        primaryAction={
          isError ? (
            <PrimaryErrorAction
              connection={connection}
              onReconnect={onReconnect}
              onReuploadCredentials={onReuploadCredentials}
              onRetry={onRetry}
            />
          ) : !isSyncing ? (
            <Button variant="outline" size="lg" onClick={onRefresh}>
              Refresh
            </Button>
          ) : null
        }
        secondaryAction={
          <Button
            variant="outline"
            size="lg"
            onClick={onDisconnect}
          >
            Disconnect
          </Button>
        }
      />

      {/* Body */}
      <div className="flex flex-col gap-[40px] mt-[60px] w-full">
        {connection.kind === 'connected' && (
          <ConnectedBody
            connection={connection}
            pendingTableDescs={pendingTableDescs}
            pendingColumnDescs={pendingColumnDescs}
            pendingOrgWide={pendingOrgWide}
            onEditTable={(fqn, value) => {
              const committed =
                connection.tables.find((t) => t.fqn === fqn)?.description ?? ''
              setPendingTableDescs((prev) => stagePending(prev, fqn, value, committed))
            }}
            onEditColumn={(fqn, col, value) => {
              const table = connection.tables.find((t) => t.fqn === fqn)
              const committed = table?.columns.find((c) => c.name === col)?.description ?? ''
              setPendingColumnDescs((prev) =>
                stagePending(prev, `${fqn}::${col}`, value, committed),
              )
            }}
            onOrgWideChange={(value) =>
              setPendingOrgWide(value === connection.orgWideAccess ? null : value)
            }
          />
        )}
        {connection.kind === 'error' && (
          <ErrorBody
            projectId={connection.projectId}
            reason={connection.reason}
            lastRefreshedAt={connection.lastRefreshedAt}
            onReconnect={onReconnect}
            onReuploadCredentials={onReuploadCredentials}
            onRetry={onRetry}
          />
        )}
      </div>

      {connection.kind === 'connected' && !isSyncing && (
        <SaveBottomBar
          dirty={dirty}
          pendingCount={pendingCount}
          onSave={handleSave}
          onDiscard={handleDiscard}
        />
      )}
    </div>
  )
}

// ─── SaveBottomBar ───────────────────────────────────────────────────────────

function SaveBottomBar({
  dirty,
  pendingCount,
  onSave,
  onDiscard,
}: {
  dirty: boolean
  pendingCount: number
  onSave: () => void
  onDiscard: () => void
}) {
  return (
    <div
      className="sticky bottom-0 -mx-[32px] -mb-[80px] mt-auto h-[80px] flex items-center justify-between pl-[32px] pr-[20px] z-30"
      style={{
        backgroundColor: 'white',
        borderTop: '1px solid var(--bg-subtle)',
      }}
    >
      <span
        className="font-body text-s"
        style={{ color: 'var(--text-secondary)' }}
      >
        {pendingCount === 0
          ? 'No unsaved changes'
          : `${pendingCount} unsaved change${pendingCount === 1 ? '' : 's'}`}
      </span>
      <div className="flex items-center gap-s">
        {dirty && (
          <Button variant="outline" size="lg" onClick={onDiscard}>
            Discard
          </Button>
        )}
        <Button
          variant="primary"
          size="lg"
          onClick={onSave}
          disabled={!dirty}
        >
          Save changes
        </Button>
      </div>
    </div>
  )
}

// ─── Header ──────────────────────────────────────────────────────────────────

function Header({
  connector,
  connection,
  primaryAction,
  secondaryAction,
}: {
  connector: ConnectorDetail
  connection: BigQueryConnection
  primaryAction: ReactNode
  secondaryAction: ReactNode
}) {
  const projectId =
    connection.kind === 'not-connected' ? null : connection.projectId
  const pillVariant: 'ready' | 'partial' | 'error' | 'disconnected' =
    connection.kind === 'error'
      ? 'error'
      : connection.kind === 'connected'
        ? connection.syncing
          ? 'partial'
          : verdictToPillVariant(connection.verdict)
        : 'disconnected'

  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex gap-m items-center">
        <div
          className="shrink-0 size-[72px] rounded-xl overflow-hidden flex items-center justify-center"
          style={{ backgroundColor: connector.iconTint }}
        >
          {connector.icon}
        </div>

        <div className="flex flex-col gap-s items-start">
          <div className="flex items-center gap-s">
            <h1
              className="font-display text-xl font-semibold whitespace-nowrap leading-normal"
              style={{ color: 'var(--text-primary)' }}
            >
              {connector.name}
            </h1>
            {pillVariant !== 'partial' && (
              <ConnectionStatusPill variant={pillVariant} />
            )}
          </div>
          <div className="flex gap-xs items-center flex-wrap">
            {connector.tags.map((tag) => (
              <span
                key={tag.label}
                className="inline-flex items-center justify-center px-s py-xxs rounded-[20px] font-body text-s font-medium whitespace-nowrap"
                style={
                  tag.variant === 'brand'
                    ? {
                        backgroundColor: 'var(--bg-tint-light)',
                        border: '1px solid var(--border-tint)',
                        color: 'var(--brand)',
                      }
                    : {
                        backgroundColor: 'var(--bg-subtle)',
                        border: '1px solid var(--border-default)',
                        color: 'var(--text-secondary)',
                      }
                }
              >
                {tag.label}
              </span>
            ))}
            {projectId && (
              <span
                className="inline-flex items-center justify-center gap-xxs px-s py-xxs rounded-[20px] font-body text-s font-medium whitespace-nowrap"
                style={{
                  backgroundColor: 'var(--bg-subtle)',
                  border: '1px solid var(--border-default)',
                  color: 'var(--text-secondary)',
                }}
              >
                <span style={{ color: 'var(--text-tertiary)' }}>Project</span>
                <code style={{ fontFamily: 'inherit' }}>{projectId}</code>
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-s shrink-0">
        {secondaryAction}
        {primaryAction}
      </div>
    </div>
  )
}

function PrimaryErrorAction({
  connection,
  onReconnect,
  onReuploadCredentials,
  onRetry,
}: {
  connection: Extract<BigQueryConnection, { kind: 'error' }>
  onReconnect?: () => void
  onReuploadCredentials?: () => void
  onRetry?: () => void
}) {
  if (connection.reason === 'network') {
    return (
      <Button variant="primary" size="lg" onClick={onRetry}>
        Retry
      </Button>
    )
  }
  if (connection.reason === 'credentials-expired') {
    return (
      <Button variant="primary" size="lg" onClick={onReuploadCredentials}>
        Re-upload JSON
      </Button>
    )
  }
  return (
    <Button variant="primary" size="lg" onClick={onReconnect}>
      Reconnect
    </Button>
  )
}

// ─── Connected body ──────────────────────────────────────────────────────────

function ConnectedBody({
  connection,
  pendingTableDescs,
  pendingColumnDescs,
  pendingOrgWide,
  onEditTable,
  onEditColumn,
  onOrgWideChange,
}: {
  connection: Extract<BigQueryConnection, { kind: 'connected' }>
  pendingTableDescs: Record<string, string>
  pendingColumnDescs: Record<string, string>
  pendingOrgWide: boolean | null
  onEditTable: (fqn: string, value: string) => void
  onEditColumn: (fqn: string, columnName: string, value: string) => void
  onOrgWideChange: (value: boolean) => void
}) {
  const { projectId, syncing, tables, lastRefreshedAt, verdict, verdictReason, orgWideAccess, saEmail } = connection
  const effectiveOrgWide = pendingOrgWide ?? orgWideAccess

  if (syncing) {
    return (
      <InfoBanner
        tone="neutral"
        title="Importing your tables"
        body={
          <>
            We&rsquo;re scanning <strong>{projectId}</strong> and getting tables
            ready to query. This usually takes a few seconds. Description edits
            unlock once the table list is back.
          </>
        }
      />
    )
  }

  const yellowCount = tables.filter((t) => t.verdict === 'YELLOW').length
  const greenCount = tables.length - yellowCount

  return (
    <>
      {/* Aggregate verdict banner */}
      {verdict === 'YELLOW' && (
        <InfoBanner
          tone="warning"
          title="Connection is partial — needs descriptions"
          body={
            <>
              {verdictReason || 'Some tables or columns are missing descriptions.'}{' '}
              Oracle can still query these tables, but answers will be weaker
              until every table and column has a description. Fill them in
              below to mark this connection <strong>Ready</strong>.
            </>
          }
        />
      )}

      <SummaryGrid
        items={[
          {
            label: 'Tables imported',
            value: String(tables.length),
          },
          {
            label: 'Ready · Needs work',
            value: `${greenCount} · ${yellowCount}`,
          },
          {
            label: 'Last refreshed',
            value: formatRelative(lastRefreshedAt),
          },
        ]}
      />

      {/* Editable table list */}
      <section className="flex flex-col gap-s">
        <div className="flex items-baseline justify-between gap-m">
          <h2
            className="font-display text-m font-semibold leading-[1.5]"
            style={{ color: 'var(--text-primary)' }}
          >
            Tables
          </h2>
          <span
            className="font-body text-xs"
            style={{ color: 'var(--text-tertiary)' }}
          >
            Click any table to edit descriptions
          </span>
        </div>
        <div className="flex flex-col gap-s">
          {tables.map((t) => (
            <TableCard
              key={t.fqn}
              table={t}
              pendingTableDesc={pendingTableDescs[t.fqn]}
              pendingColumnDescs={pendingColumnDescs}
              onEditTable={onEditTable}
              onEditColumn={onEditColumn}
            />
          ))}
        </div>
      </section>

      {/* Org-wide access toggle */}
      <section
        className="flex items-start gap-m p-l rounded-xl"
        style={{
          backgroundColor: 'var(--bg-elements)',
          border: '1px solid var(--border-default)',
        }}
      >
        <input
          type="checkbox"
          className="mt-[2px] w-[16px] h-[16px] shrink-0 cursor-pointer accent-[var(--brand)]"
          checked={effectiveOrgWide}
          onChange={(e) => onOrgWideChange(e.target.checked)}
          aria-label="Share with the whole organisation"
        />
        <div className="flex-1 min-w-0 flex flex-col gap-xxs">
          <span
            className="font-body text-s font-medium"
            style={{ color: 'var(--text-primary)' }}
          >
            Share this connection with the whole organisation
          </span>
          <span
            className="font-body text-xs leading-[1.5]"
            style={{ color: 'var(--text-secondary)' }}
          >
            {effectiveOrgWide
              ? 'Every teammate in this workspace can query these tables and edit descriptions through Oracle. Read-only — 6labs never writes back to your warehouse.'
              : 'Only you can query these tables. Toggle on to let teammates in this workspace use the same connection.'}
          </span>
          {saEmail && (
            <span
              className="font-body text-xs mt-xxs"
              style={{ color: 'var(--text-tertiary)' }}
            >
              Service account: <code>{saEmail}</code>
            </span>
          )}
        </div>
      </section>

      <p
        className="font-body text-xs"
        style={{ color: 'var(--text-tertiary)' }}
      >
        6labs only reads from your warehouse — we never write back. Description
        edits live in 6labs and don&rsquo;t modify BigQuery metadata.
      </p>
    </>
  )
}

// ─── Per-table card with inline editing ──────────────────────────────────────

function TableCard({
  table,
  pendingTableDesc,
  pendingColumnDescs,
  onEditTable,
  onEditColumn,
}: {
  table: BigQueryTable
  pendingTableDesc?: string
  pendingColumnDescs: Record<string, string>
  onEditTable: (fqn: string, value: string) => void
  onEditColumn: (fqn: string, columnName: string, value: string) => void
}) {
  const [open, setOpen] = useState(false)
  const effectiveTableDesc = pendingTableDesc ?? table.description
  const described = useMemo(
    () =>
      table.columns.filter((c) => {
        const effective = pendingColumnDescs[`${table.fqn}::${c.name}`] ?? c.description
        return effective.trim().length > 0
      }).length,
    [table.columns, pendingColumnDescs, table.fqn],
  )
  const total = table.columns.length
  const pct = total === 0 ? 0 : Math.round((described / total) * 100)

  return (
    <div
      className="flex flex-col rounded-xl overflow-hidden"
      style={{
        backgroundColor: 'var(--bg-elements)',
        border: '1px solid var(--border-default)',
      }}
    >
      {/* Header row — click to expand */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="bq-toggle-row flex items-center justify-between w-full p-l text-left"
        aria-expanded={open}
      >
        <div className="flex flex-col gap-xxs min-w-0">
          <div className="flex items-center gap-s flex-wrap">
            <code
              className="font-body text-s font-semibold"
              style={{ color: 'var(--text-primary)' }}
            >
              {table.fqn}
            </code>
            <ConnectionStatusPill variant={verdictToPillVariant(table.verdict)} />
          </div>
          <span
            className="font-body text-xs"
            style={{ color: 'var(--text-tertiary)' }}
          >
            {formatRows(table.rows)} rows · {formatBytes(table.bytes)} · {total} columns ·{' '}
            <span style={{ color: 'var(--text-secondary)' }}>{described}/{total} described ({pct}%)</span>
          </span>
        </div>
        <span
          aria-hidden
          className="bq-toggle-affordance shrink-0 ml-m inline-flex items-center justify-center w-[24px] h-[24px] rounded-full"
          style={{
            backgroundColor: 'var(--bg-tint-light)',
            color: 'var(--text-secondary)',
            transform: open ? 'rotate(180deg)' : 'none',
            transition: 'transform 120ms ease, background-color 120ms ease',
          }}
        >
          <DropdownArrowIcon size={16} />
        </span>
      </button>

      {open && (
        <div
          className="flex flex-col gap-l px-l pb-l"
          style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: 'var(--space-l, 16px)' }}
        >
          {/* Verdict reasons (when YELLOW) */}
          {table.verdict === 'YELLOW' && table.verdictReasons.length > 0 && (
            <ul
              className="flex flex-col gap-xxs p-m rounded-m"
              style={{
                backgroundColor: 'var(--warning-bg)',
                border: '1px solid var(--warning)',
              }}
            >
              {table.verdictReasons.map((r) => (
                <li
                  key={r}
                  className="font-body text-xs leading-[1.5]"
                  style={{ color: 'var(--text-primary)' }}
                >
                  • {r}
                </li>
              ))}
            </ul>
          )}

          {/* Table-level description */}
          <FieldEditor
            label="Table description"
            placeholder="Describe what this table stores and how it should be used…"
            value={effectiveTableDesc}
            onSave={(next) => onEditTable(table.fqn, next)}
            multiline
          />

          {/* Columns */}
          <div className="flex flex-col gap-xs">
            <div className="flex items-baseline justify-between gap-m">
              <h3
                className="font-display text-s font-semibold uppercase tracking-[0.12em]"
                style={{ color: 'var(--text-tertiary)' }}
              >
                Columns ({total})
              </h3>
              <span
                className="font-body text-xs"
                style={{ color: 'var(--text-tertiary)' }}
              >
                Inline edit · Tab to next field
              </span>
            </div>
            <div className="flex flex-col">
              {table.columns.map((c, i) => (
                <ColumnRow
                  key={c.name}
                  column={c}
                  fqn={table.fqn}
                  isFirst={i === 0}
                  pendingDescription={pendingColumnDescs[`${table.fqn}::${c.name}`]}
                  onEdit={onEditColumn}
                />
              ))}
            </div>
          </div>

          {/* Collapsed LLM summary */}
          {table.llmSummary && <LlmSummary text={table.llmSummary} />}
        </div>
      )}
    </div>
  )
}

function ColumnRow({
  column,
  fqn,
  isFirst,
  pendingDescription,
  onEdit,
}: {
  column: BigQueryColumn
  fqn: string
  isFirst: boolean
  pendingDescription?: string
  onEdit: (fqn: string, columnName: string, value: string) => void
}) {
  const effectiveDescription = pendingDescription ?? column.description
  const missing = effectiveDescription.trim().length === 0
  return (
    <div
      className="grid grid-cols-[200px_88px_1fr] gap-m items-center py-s"
      style={{ borderTop: isFirst ? 'none' : '1px solid var(--border-subtle)' }}
    >
      <code
        className="font-body text-s truncate"
        style={{ color: 'var(--text-primary)' }}
        title={column.name}
      >
        {column.name}
      </code>
      <span
        className="font-display text-2xs font-semibold uppercase tracking-[0.12em] truncate"
        style={{ color: 'var(--text-tertiary)' }}
      >
        {column.type}
      </span>
      <FieldEditor
        label=""
        placeholder={missing ? 'Add a description…' : 'Edit description…'}
        value={effectiveDescription}
        onSave={(next) => onEdit(fqn, column.name, next)}
        tone={missing ? 'warning' : 'default'}
        inline
      />
    </div>
  )
}

function FieldEditor({
  label,
  placeholder,
  value,
  onSave,
  multiline = false,
  inline = false,
  tone = 'default',
}: {
  label?: string
  placeholder: string
  value: string
  onSave: (next: string) => void
  multiline?: boolean
  inline?: boolean
  tone?: 'default' | 'warning'
}) {
  const [draft, setDraft] = useState(value)
  const [dirty, setDirty] = useState(false)

  // Reset draft if upstream value changes (e.g. external refresh)
  useEffect(() => {
    if (!dirty) setDraft(value)
  }, [value, dirty])

  const commit = () => {
    if (draft !== value) onSave(draft.trim())
    setDirty(false)
  }

  const baseStyle = {
    backgroundColor: tone === 'warning' ? 'var(--warning-bg)' : 'var(--bg-card)',
    border: `1px solid ${
      tone === 'warning' ? 'var(--warning)' : 'var(--border-subtle)'
    }`,
    color: 'var(--text-primary)',
  }

  const sharedProps = {
    value: draft,
    onChange: (e: { target: { value: string } }) => {
      setDraft(e.target.value)
      setDirty(true)
      onSave(e.target.value)
    },
    onBlur: commit,
    placeholder,
    className: 'w-full font-body text-s leading-[1.5] px-s py-xs rounded-m outline-none',
    style: baseStyle,
  }

  return (
    <div className={`flex flex-col gap-xxs ${inline ? '' : 'w-full'}`}>
      {label && (
        <label
          className="font-display text-xs font-semibold uppercase tracking-[0.12em]"
          style={{ color: 'var(--text-tertiary)' }}
        >
          {label}
        </label>
      )}
      {multiline ? (
        <textarea rows={4} {...sharedProps} className={`${sharedProps.className ?? ''} min-h-[96px] resize-y`} />
      ) : (
        <input
          type="text"
          {...sharedProps}
          onKeyDown={(e) => {
            if (e.key === 'Enter') (e.target as HTMLInputElement).blur()
          }}
        />
      )}
    </div>
  )
}

function LlmSummary({ text }: { text: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div
      className="flex flex-col rounded-m overflow-hidden"
      style={{
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-subtle)',
      }}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="bq-toggle-row flex items-center justify-between gap-m px-m py-s text-left"
        aria-expanded={open}
      >
        <span className="flex flex-col gap-xxs min-w-0">
          <span
            className="font-display text-xs font-semibold uppercase tracking-[0.12em]"
            style={{ color: 'var(--text-tertiary)' }}
          >
            Background analysis · Optional
          </span>
          <span
            className="font-body text-s font-medium"
            style={{ color: 'var(--text-primary)' }}
          >
            Oracle&rsquo;s analyst notes on this table
          </span>
        </span>
        <span
          aria-hidden
          className="bq-toggle-affordance shrink-0 inline-flex items-center justify-center w-[24px] h-[24px] rounded-full"
          style={{
            backgroundColor: 'var(--bg-tint-light)',
            color: 'var(--text-secondary)',
            transform: open ? 'rotate(180deg)' : 'none',
            transition: 'transform 120ms ease, background-color 120ms ease',
          }}
        >
          <DropdownArrowIcon size={16} />
        </span>
      </button>
      {open && (
        <div
          className="px-m pb-m font-body text-s leading-[1.6] whitespace-pre-wrap"
          style={{
            color: 'var(--text-secondary)',
            borderTop: '1px solid var(--border-subtle)',
            paddingTop: 'var(--space-m, 12px)',
          }}
        >
          {text}
        </div>
      )}
    </div>
  )
}

function verdictToPillVariant(v: BigQueryVerdict): 'ready' | 'partial' | 'error' {
  if (v === 'GREEN') return 'ready'
  if (v === 'YELLOW') return 'partial'
  return 'error'
}

function formatRows(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`
  return String(n)
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(1)} MB`
  return `${(bytes / 1024 / 1024 / 1024).toFixed(2)} GB`
}

// ─── Error body ──────────────────────────────────────────────────────────────

function ErrorBody({
  projectId,
  reason,
  lastRefreshedAt,
  onReconnect,
  onReuploadCredentials,
  onRetry,
}: {
  projectId: string
  reason: BigQueryErrorReason
  lastRefreshedAt: number | null
  onReconnect?: () => void
  onReuploadCredentials?: () => void
  onRetry?: () => void
}) {
  const copy = ERROR_COPY[reason](projectId)
  const tone: BannerTone = reason === 'network' ? 'warning' : 'error'

  return (
    <>
      <InfoBanner
        tone={tone}
        title={copy.title}
        body={copy.body}
        action={copy.primaryAction({
          onReconnect,
          onReuploadCredentials,
          onRetry,
        })}
        helpLinkHref={copy.helpLinkHref}
        helpLinkLabel={copy.helpLinkLabel}
      />

      {lastRefreshedAt != null && (
        <p
          className="font-body text-xs"
          style={{ color: 'var(--text-tertiary)' }}
        >
          Last healthy refresh: {formatRelative(lastRefreshedAt)}. Queries to
          Oracle won&rsquo;t use BigQuery until this is fixed.
        </p>
      )}
    </>
  )
}

type ErrorCopy = {
  title: string
  body: ReactNode
  helpLinkHref?: string
  helpLinkLabel?: string
  primaryAction: (handlers: {
    onReconnect?: () => void
    onReuploadCredentials?: () => void
    onRetry?: () => void
  }) => ReactNode
}

const ERROR_COPY: Record<BigQueryErrorReason, (projectId: string) => ErrorCopy> = {
  'permission-revoked': (projectId) => ({
    title: 'Action required · Permission revoked',
    body: (
      <>
        The service account no longer has the{' '}
        <strong>BigQuery Data Viewer</strong> role on{' '}
        <code>{projectId}</code>. Re-grant the role in GCP IAM, then click
        Reconnect to validate access.
      </>
    ),
    helpLinkHref: 'https://cloud.google.com/iam/docs/granting-changing-revoking-access',
    helpLinkLabel: 'How to grant IAM roles',
    primaryAction: ({ onReconnect }) => (
      <Button variant="primary" size="lg" onClick={onReconnect}>
        Reconnect
      </Button>
    ),
  }),
  'credentials-expired': (projectId) => ({
    title: 'Action required · Credentials revoked',
    body: (
      <>
        The service-account JSON we have on file for <code>{projectId}</code>{' '}
        was revoked or rotated. Generate a new key and upload it to reconnect.
      </>
    ),
    helpLinkHref: 'https://cloud.google.com/iam/docs/keys-create-delete',
    helpLinkLabel: 'How to rotate service-account keys',
    primaryAction: ({ onReuploadCredentials }) => (
      <Button variant="primary" size="lg" onClick={onReuploadCredentials}>
        Re-upload JSON
      </Button>
    ),
  }),
  'project-not-found': (projectId) => ({
    title: 'Action required · Project not found',
    body: (
      <>
        GCP couldn&rsquo;t find a project named <code>{projectId}</code>. It
        may have been renamed or deleted. Reconnect with the correct project
        ID and a valid service-account JSON.
      </>
    ),
    primaryAction: ({ onReconnect }) => (
      <Button variant="primary" size="lg" onClick={onReconnect}>
        Reconnect
      </Button>
    ),
  }),
  network: () => ({
    title: 'Temporary connection issue',
    body: (
      <>
        We couldn&rsquo;t reach BigQuery on the last refresh. This is usually
        transient — we&rsquo;ll keep retrying in the background. Hit Retry to
        force a check now.
      </>
    ),
    primaryAction: ({ onRetry }) => (
      <Button variant="primary" size="lg" onClick={onRetry}>
        Retry now
      </Button>
    ),
  }),
  unknown: () => ({
    title: 'Connection error',
    body: (
      <>
        Something went wrong on the last refresh and we couldn&rsquo;t classify
        the cause. Reconnect to revalidate access, or contact 6labs support if
        the issue persists.
      </>
    ),
    primaryAction: ({ onReconnect }) => (
      <Button variant="primary" size="lg" onClick={onReconnect}>
        Reconnect
      </Button>
    ),
  }),
}

// ─── Shared atoms ────────────────────────────────────────────────────────────

type BannerTone = 'neutral' | 'warning' | 'error'

function InfoBanner({
  tone,
  title,
  body,
  action,
  helpLinkHref,
  helpLinkLabel,
}: {
  tone: BannerTone
  title: string
  body: ReactNode
  action?: ReactNode
  helpLinkHref?: string
  helpLinkLabel?: string
}) {
  const styles =
    tone === 'error'
      ? {
          backgroundColor: 'var(--error-bg)',
          border: '1px solid var(--error)',
          color: 'var(--error)',
        }
      : tone === 'warning'
        ? {
            backgroundColor: 'var(--warning-bg)',
            border: '1px solid var(--warning)',
            color: 'var(--warning)',
          }
        : {
            backgroundColor: 'var(--bg-tint-light)',
            border: '1px solid var(--border-tint)',
            color: 'var(--brand)',
          }

  return (
    <div className="flex flex-col gap-s p-l rounded-xl" style={styles}>
      <div className="flex items-start justify-between gap-m">
        <div className="flex flex-col gap-xxs min-w-0">
          <h3
            className="font-display text-s font-semibold uppercase tracking-[0.12em]"
            style={{ color: 'var(--text-primary)' }}
          >
            {title}
          </h3>
          <p
            className="font-body text-s leading-[1.5]"
            style={{ color: 'var(--text-primary)' }}
          >
            {body}
          </p>
          {helpLinkHref && helpLinkLabel && (
            <a
              href={helpLinkHref}
              target="_blank"
              rel="noopener noreferrer"
              className="font-body text-xs font-medium underline self-start mt-xxs"
              style={{ color: 'var(--brand)' }}
            >
              {helpLinkLabel}
            </a>
          )}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
    </div>
  )
}

function SummaryGrid({
  items,
}: {
  items: { label: string; value: string }[]
}) {
  return (
    <div className="grid grid-cols-3 gap-[12px] w-full">
      {items.map((it) => (
        <div
          key={it.label}
          className="flex flex-col gap-[6px] min-w-0 rounded-[12px] px-[20px] py-[16px]"
          style={{
            backgroundColor: 'var(--bg-elements)',
            border: '1px solid var(--border-subtle)',
          }}
        >
          <p
            className="font-[Bricolage_Grotesque] font-semibold text-[11px] uppercase tracking-[1.5px] truncate"
            style={{ color: 'var(--text-tertiary)' }}
          >
            {it.label}
          </p>
          <p
            className="min-w-0 font-[Bricolage_Grotesque] font-semibold text-[14px] truncate"
            style={{ color: 'var(--text-primary)' }}
            title={it.value}
          >
            {it.value}
          </p>
        </div>
      ))}
    </div>
  )
}

// ─── Time formatting ─────────────────────────────────────────────────────────

function formatRelative(timestampMs: number | null): string {
  if (timestampMs == null) return '—'
  const diff = Date.now() - timestampMs
  if (diff < 0) return 'just now'
  const sec = Math.floor(diff / 1000)
  if (sec < 60) return 'just now'
  const min = Math.floor(sec / 60)
  if (min < 60) return `${min} min ago`
  const hr = Math.floor(min / 60)
  if (hr < 24) return `${hr} hr ago`
  const day = Math.floor(hr / 24)
  if (day < 7) return `${day} day${day === 1 ? '' : 's'} ago`
  return new Date(timestampMs).toLocaleDateString()
}
