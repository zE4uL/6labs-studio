/**
 * WarehouseTableCard + warehouse detail-view atoms.
 *
 * Connector-agnostic building blocks for any warehouse connector's detail view
 * (BigQuery, Snowflake, …). Extracted from BigQueryDetailView so the imported
 * table list, inline description editors, info banners and summary grid are
 * shared instead of duplicated per connector.
 *
 * These operate on the warehouse table model in connectorsStore — the same
 * shape describes a BigQuery table and a Snowflake table (fully-qualified name,
 * rows, bytes, columns, verdict). Nothing here references a specific warehouse
 * vendor; the connector-specific copy lives in each detail view's body.
 */

import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { ConnectionStatusPill } from '../atoms/ConnectionStatusPill'
import { DropdownArrowIcon } from '../icons/DropdownArrowIcon'
import type {
  BigQueryColumn,
  BigQueryTable,
  BigQueryVerdict,
} from '../../lib/state/connectorsStore'

// Vendor-neutral aliases — the table model is warehouse-generic.
export type WarehouseColumn = BigQueryColumn
export type WarehouseTable = BigQueryTable
export type WarehouseVerdict = BigQueryVerdict

// ─── Per-table card with inline editing ──────────────────────────────────────

export function WarehouseTableCard({
  table,
  pendingTableDesc,
  pendingColumnDescs,
  onEditTable,
  onEditColumn,
}: {
  table: WarehouseTable
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
  column: WarehouseColumn
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

export function FieldEditor({
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

export function verdictToPillVariant(v: WarehouseVerdict): 'ready' | 'partial' | 'error' {
  if (v === 'GREEN') return 'ready'
  if (v === 'YELLOW') return 'partial'
  return 'error'
}

export function formatRows(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`
  return String(n)
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(1)} MB`
  return `${(bytes / 1024 / 1024 / 1024).toFixed(2)} GB`
}

// ─── Shared banners + summary grid ───────────────────────────────────────────

export type BannerTone = 'neutral' | 'warning' | 'error'

export function InfoBanner({
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

export function SummaryGrid({
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

export function formatRelative(timestampMs: number | null): string {
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
