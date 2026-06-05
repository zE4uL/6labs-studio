/**
 * SnowflakeDetailView — Detail page for the Snowflake connector. Wraps the
 * generic ConnectorDetailView for the "not connected" state and replaces its
 * body with state-specific UI once onboarding has happened.
 *
 * Mirrors BigQueryDetailView's connected/error lifecycle, but:
 *  • Identity is Account / Warehouse / Database (not a GCP project id).
 *  • Re-auth means re-registering our public key (key-pair), not re-uploading a
 *    credential file.
 *  • The imported-table list, inline description editors, info banners and
 *    summary grid are the shared WarehouseTableCard molecule.
 *
 * Code-first prototype — no Figma source yet.
 */

import { useEffect, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import Button from '../ui/Button'
import { ConnectorDetailView, type ConnectorDetail } from './ConnectorDetailView'
import { ConnectionStatusPill } from '../atoms/ConnectionStatusPill'
import {
  WarehouseTableCard,
  InfoBanner,
  SummaryGrid,
  formatRelative,
  verdictToPillVariant,
  type BannerTone,
} from '../molecules/WarehouseTableCard'
import {
  updateSnowflakeColumnDescription,
  updateSnowflakeTableDescription,
  type SnowflakeConnection,
  type SnowflakeErrorReason,
} from '../../lib/state/connectorsStore'

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

export interface SnowflakeDetailViewProps {
  connector: ConnectorDetail
  connection: SnowflakeConnection

  /** Open the onboarding modal (first-time connect / reconnect). */
  onConnect?: () => void
  onReconnect?: () => void
  /** Open onboarding to re-register our public key (key-pair re-auth). */
  onReregisterKey?: () => void
  /** Kick off another table-import pass. */
  onRefresh?: () => void
  /** Retry the last failing call (network errors). */
  onRetry?: () => void
  /** Remove the connection entirely. */
  onDisconnect?: () => void
  onDirtyChange?: (dirty: boolean) => void
  resetSignal?: number
  /** Storybook-only: open the refresh-confirmation popup on mount. */
  defaultRefreshConfirmOpen?: boolean
  className?: string
}

export function SnowflakeDetailView({
  connector,
  connection,
  onConnect,
  onReconnect,
  onReregisterKey,
  onRefresh,
  onRetry,
  onDisconnect,
  onDirtyChange,
  resetSignal,
  defaultRefreshConfirmOpen,
  className,
}: SnowflakeDetailViewProps) {
  const [pendingTableDescs, setPendingTableDescs] = useState<Record<string, string>>({})
  const [pendingColumnDescs, setPendingColumnDescs] = useState<Record<string, string>>({})
  const [refreshConfirmOpen, setRefreshConfirmOpen] = useState(defaultRefreshConfirmOpen ?? false)

  const isError = connection.kind === 'error'
  const isSyncing = connection.kind === 'connected' && connection.syncing
  const dirty =
    connection.kind === 'connected' &&
    (Object.keys(pendingTableDescs).length > 0 || Object.keys(pendingColumnDescs).length > 0)

  useEffect(() => {
    setPendingTableDescs({})
    setPendingColumnDescs({})
  }, [connection.kind])

  useEffect(() => {
    onDirtyChange?.(dirty)
  }, [dirty, onDirtyChange])

  useEffect(() => {
    if (resetSignal === undefined) return
    setPendingTableDescs({})
    setPendingColumnDescs({})
  }, [resetSignal])

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
    return <ConnectorDetailView connector={connector} onConnect={onConnect} className={className} />
  }

  const handleSave = () => {
    if (connection.kind !== 'connected') return
    Object.entries(pendingTableDescs).forEach(([fqn, desc]) => {
      updateSnowflakeTableDescription(fqn, desc)
    })
    Object.entries(pendingColumnDescs).forEach(([key, desc]) => {
      const sep = key.indexOf('::')
      if (sep === -1) return
      updateSnowflakeColumnDescription(key.slice(0, sep), key.slice(sep + 2), desc)
    })
    setPendingTableDescs({})
    setPendingColumnDescs({})
  }

  const handleDiscard = () => {
    setPendingTableDescs({})
    setPendingColumnDescs({})
  }

  const pendingCount = Object.keys(pendingTableDescs).length + Object.keys(pendingColumnDescs).length

  return (
    <div className={['flex flex-col w-full flex-1', className].filter(Boolean).join(' ')}>
      <Header
        connector={connector}
        connection={connection}
        primaryAction={
          isError ? (
            <PrimaryErrorAction
              connection={connection}
              onReconnect={onReconnect}
              onReregisterKey={onReregisterKey}
              onRetry={onRetry}
            />
          ) : !isSyncing ? (
            <Button variant="outline" size="lg" onClick={() => setRefreshConfirmOpen(true)}>
              Refresh
            </Button>
          ) : null
        }
        secondaryAction={
          <Button variant="outline" size="lg" onClick={onDisconnect}>
            Disconnect
          </Button>
        }
      />

      {refreshConfirmOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-m"
            role="dialog"
            aria-modal="true"
            aria-labelledby="sf-refresh-confirm-title"
          >
            <div className="absolute inset-0 bg-black/40" onClick={() => setRefreshConfirmOpen(false)} aria-hidden />
            <div className="relative flex flex-col gap-l bg-bg-elements rounded-m shadow-normal p-l w-[440px]">
              <div className="flex flex-col gap-xs">
                <span
                  id="sf-refresh-confirm-title"
                  className="font-display text-l font-semibold"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Refresh this connection?
                </span>
                <span className="font-body text-s leading-[1.5]" style={{ color: 'var(--text-secondary)' }}>
                  Refreshing re-imports schemas from Snowflake and clears every table
                  and column description you&rsquo;ve added. This can&rsquo;t be undone.
                </span>
              </div>
              <div className="flex gap-m w-full">
                <Button variant="secondary" size="lg" className="flex-1" onClick={() => setRefreshConfirmOpen(false)}>
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  size="lg"
                  className="flex-1"
                  onClick={() => {
                    setRefreshConfirmOpen(false)
                    onRefresh?.()
                  }}
                >
                  Refresh anyway
                </Button>
              </div>
            </div>
          </div>,
          document.body,
        )}

      <div className="flex flex-col gap-[40px] mt-[60px] w-full">
        {connection.kind === 'connected' && (
          <ConnectedBody
            connection={connection}
            pendingTableDescs={pendingTableDescs}
            pendingColumnDescs={pendingColumnDescs}
            onEditTable={(fqn, value) => {
              const committed = connection.tables.find((t) => t.fqn === fqn)?.description ?? ''
              setPendingTableDescs((prev) => stagePending(prev, fqn, value, committed))
            }}
            onEditColumn={(fqn, col, value) => {
              const table = connection.tables.find((t) => t.fqn === fqn)
              const committed = table?.columns.find((c) => c.name === col)?.description ?? ''
              setPendingColumnDescs((prev) => stagePending(prev, `${fqn}::${col}`, value, committed))
            }}
          />
        )}
        {connection.kind === 'error' && (
          <ErrorBody
            connection={connection}
            onReconnect={onReconnect}
            onReregisterKey={onReregisterKey}
            onRetry={onRetry}
          />
        )}
      </div>

      {connection.kind === 'connected' && !isSyncing && (
        <SaveBottomBar dirty={dirty} pendingCount={pendingCount} onSave={handleSave} onDiscard={handleDiscard} />
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
      style={{ backgroundColor: 'white', borderTop: '1px solid var(--bg-subtle)' }}
    >
      <span className="font-body text-s" style={{ color: 'var(--text-secondary)' }}>
        {pendingCount === 0 ? 'No unsaved changes' : `${pendingCount} unsaved change${pendingCount === 1 ? '' : 's'}`}
      </span>
      <div className="flex items-center gap-s">
        {dirty && (
          <Button variant="outline" size="lg" onClick={onDiscard}>
            Discard
          </Button>
        )}
        <Button variant="primary" size="lg" onClick={onSave} disabled={!dirty}>
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
  connection: SnowflakeConnection
  primaryAction: ReactNode
  secondaryAction: ReactNode
}) {
  const identity =
    connection.kind === 'not-connected'
      ? null
      : { account: connection.accountIdentifier, warehouse: connection.warehouse, database: connection.database }
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
            {pillVariant !== 'partial' && <ConnectionStatusPill variant={pillVariant} />}
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
            {identity && (
              <span
                className="inline-flex items-center justify-center gap-xxs px-s py-xxs rounded-[20px] font-body text-s font-medium whitespace-nowrap"
                style={{
                  backgroundColor: 'var(--bg-subtle)',
                  border: '1px solid var(--border-default)',
                  color: 'var(--text-secondary)',
                }}
              >
                <span style={{ color: 'var(--text-tertiary)' }}>DB</span>
                <code style={{ fontFamily: 'inherit' }}>{identity.database}</code>
                <span style={{ color: 'var(--text-tertiary)' }}>·</span>
                <code style={{ fontFamily: 'inherit' }}>{identity.warehouse}</code>
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
  onReregisterKey,
  onRetry,
}: {
  connection: Extract<SnowflakeConnection, { kind: 'error' }>
  onReconnect?: () => void
  onReregisterKey?: () => void
  onRetry?: () => void
}) {
  if (connection.reason === 'network') {
    return (
      <Button variant="primary" size="lg" onClick={onRetry}>
        Retry
      </Button>
    )
  }
  if (connection.reason === 'key-not-registered' || connection.reason === 'write-access-rejected') {
    return (
      <Button variant="primary" size="lg" onClick={onReregisterKey}>
        Re-register key
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
  onEditTable,
  onEditColumn,
}: {
  connection: Extract<SnowflakeConnection, { kind: 'connected' }>
  pendingTableDescs: Record<string, string>
  pendingColumnDescs: Record<string, string>
  onEditTable: (fqn: string, value: string) => void
  onEditColumn: (fqn: string, columnName: string, value: string) => void
}) {
  const { database, syncing, tables, lastRefreshedAt, verdict, verdictReason, username } = connection

  if (syncing) {
    return (
      <InfoBanner
        tone="neutral"
        title="Importing your tables"
        body={
          <>
            We&rsquo;re scanning <strong>{database}</strong> and getting tables ready
            to query. This usually takes a few seconds. Description edits unlock once
            the table list is back.
          </>
        }
      />
    )
  }

  const yellowCount = tables.filter((t) => t.verdict === 'YELLOW').length
  const greenCount = tables.length - yellowCount

  return (
    <>
      {verdict === 'YELLOW' && (
        <InfoBanner
          tone="warning"
          title="Connection is partial — needs descriptions"
          body={
            <>
              {verdictReason || 'Some tables or columns are missing descriptions.'} Oracle
              can still query these tables, but answers will be weaker until every table
              and column has a description. Fill them in below to mark this connection{' '}
              <strong>Ready</strong>.
            </>
          }
        />
      )}

      <SummaryGrid
        items={[
          { label: 'Tables imported', value: String(tables.length) },
          { label: 'Ready · Needs work', value: `${greenCount} · ${yellowCount}` },
          { label: 'Last refreshed', value: formatRelative(lastRefreshedAt) },
        ]}
      />

      <section className="flex flex-col gap-s">
        <div className="flex items-baseline justify-between gap-m">
          <h2 className="font-display text-m font-semibold leading-[1.5]" style={{ color: 'var(--text-primary)' }}>
            Tables
          </h2>
          <span className="font-body text-xs" style={{ color: 'var(--text-tertiary)' }}>
            Click any table to edit descriptions
          </span>
        </div>
        <div className="flex flex-col gap-s">
          {tables.map((t) => (
            <WarehouseTableCard
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

      <section
        className="flex items-start gap-m p-l rounded-xl"
        style={{ backgroundColor: 'var(--bg-elements)', border: '1px solid var(--border-default)' }}
      >
        <span
          aria-hidden
          className="shrink-0 mt-[2px] inline-flex items-center justify-center w-[20px] h-[20px] rounded-full font-display text-xs font-bold italic"
          style={{ backgroundColor: 'var(--brand)', color: 'var(--text-on-brand)' }}
        >
          i
        </span>
        <div className="flex-1 min-w-0 flex flex-col gap-xxs">
          <span className="font-body text-s font-medium" style={{ color: 'var(--text-primary)' }}>
            Every member of this workspace has access
          </span>
          <span className="font-body text-xs leading-[1.5]" style={{ color: 'var(--text-secondary)' }}>
            Every teammate in this workspace can query these tables and edit descriptions
            through Oracle. Read-only — 6labs never writes back to your warehouse.
          </span>
          <span className="font-body text-xs mt-xxs" style={{ color: 'var(--text-tertiary)' }}>
            Connecting as: <code>{username}</code>
          </span>
        </div>
      </section>

      <p className="font-body text-xs" style={{ color: 'var(--text-tertiary)' }}>
        6labs only reads from your warehouse — we never write back. Description edits live
        in 6labs and don&rsquo;t modify Snowflake metadata.
      </p>
    </>
  )
}

// ─── Error body ──────────────────────────────────────────────────────────────

function ErrorBody({
  connection,
  onReconnect,
  onReregisterKey,
  onRetry,
}: {
  connection: Extract<SnowflakeConnection, { kind: 'error' }>
  onReconnect?: () => void
  onReregisterKey?: () => void
  onRetry?: () => void
}) {
  const copy = ERROR_COPY[connection.reason](connection)
  const tone: BannerTone = connection.reason === 'network' ? 'warning' : 'error'

  return (
    <>
      <InfoBanner
        tone={tone}
        title={copy.title}
        body={copy.body}
        action={copy.primaryAction({ onReconnect, onReregisterKey, onRetry })}
        helpLinkHref={copy.helpLinkHref}
        helpLinkLabel={copy.helpLinkLabel}
      />

      {connection.lastRefreshedAt != null && (
        <p className="font-body text-xs" style={{ color: 'var(--text-tertiary)' }}>
          Last healthy refresh: {formatRelative(connection.lastRefreshedAt)}. Queries to
          Oracle won&rsquo;t use Snowflake until this is fixed.
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
    onReregisterKey?: () => void
    onRetry?: () => void
  }) => ReactNode
}

const ERROR_COPY: Record<
  SnowflakeErrorReason,
  (c: Extract<SnowflakeConnection, { kind: 'error' }>) => ErrorCopy
> = {
  'key-not-registered': (c) => ({
    title: 'Action required · Key not registered',
    body: (
      <>
        Snowflake no longer accepts our key-pair signature for{' '}
        <code>{c.username}</code>. The public key may have been cleared or the user
        rotated. Re-register our public key with <code>ALTER USER … SET RSA_PUBLIC_KEY</code>,
        then re-register to validate.
      </>
    ),
    helpLinkHref: 'https://docs.snowflake.com/en/user-guide/key-pair-auth',
    helpLinkLabel: 'How key-pair auth works',
    primaryAction: ({ onReregisterKey }) => (
      <Button variant="primary" size="lg" onClick={onReregisterKey}>
        Re-register key
      </Button>
    ),
  }),
  'write-access-rejected': (c) => ({
    title: 'Action required · Write access detected',
    body: (
      <>
        The role for <code>{c.username}</code> can write to Snowflake. 6labs requires a
        read-only role (<strong>SELECT only</strong>). Re-grant a read-only role and
        re-register to reconnect.
      </>
    ),
    helpLinkHref: 'https://docs.snowflake.com/en/user-guide/security-access-control-overview',
    helpLinkLabel: 'How to grant read-only access',
    primaryAction: ({ onReregisterKey }) => (
      <Button variant="primary" size="lg" onClick={onReregisterKey}>
        Re-register key
      </Button>
    ),
  }),
  'account-not-found': (c) => ({
    title: 'Action required · Account not found',
    body: (
      <>
        We couldn&rsquo;t resolve the account identifier{' '}
        <code>{c.accountIdentifier || '—'}</code>. It may be mistyped or the region may
        have changed. Reconnect with the correct identifier.
      </>
    ),
    helpLinkHref: 'https://docs.snowflake.com/en/user-guide/admin-account-identifier',
    helpLinkLabel: 'Find your account identifier',
    primaryAction: ({ onReconnect }) => (
      <Button variant="primary" size="lg" onClick={onReconnect}>
        Reconnect
      </Button>
    ),
  }),
  'permission-denied': (c) => ({
    title: 'Action required · Permission denied',
    body: (
      <>
        The role no longer has <strong>SELECT</strong> on{' '}
        <code>{c.database}</code>. Re-grant SELECT to the read-only role, then reconnect
        to validate access.
      </>
    ),
    helpLinkHref: 'https://docs.snowflake.com/en/user-guide/security-access-control-overview',
    helpLinkLabel: 'How to grant read-only access',
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
        We couldn&rsquo;t reach Snowflake on the last refresh. This is usually transient —
        we&rsquo;ll keep retrying in the background. Hit Retry to force a check now.
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
        Something went wrong on the last refresh and we couldn&rsquo;t classify the cause.
        Reconnect to revalidate access, or contact 6labs support if the issue persists.
      </>
    ),
    primaryAction: ({ onReconnect }) => (
      <Button variant="primary" size="lg" onClick={onReconnect}>
        Reconnect
      </Button>
    ),
  }),
}
