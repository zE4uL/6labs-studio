/**
 * ConnectionStatusPill — Tri-state connector status indicator.
 *
 * Surfaces the full backend verdict (GREEN | YELLOW | RED) plus a "disconnected"
 * variant. Per the 2026-05-18 review, YELLOW is now user-facing: connection works
 * but documentation is incomplete and Oracle answers will be weaker until table
 * and column descriptions are filled in.
 */

export type ConnectionVerdict = 'GREEN' | 'YELLOW' | 'RED'
export type ConnectionStatusVariant =
  | 'ready'
  | 'partial'
  | 'error'
  | 'disconnected'
  // Legacy aliases — kept so existing callers keep compiling.
  | 'connected'

export interface ConnectionStatusPillProps {
  /** Either pass the resolved variant directly… */
  variant?: ConnectionStatusVariant
  /** …or pass the backend verdict and let the pill resolve the variant. */
  verdict?: ConnectionVerdict
  /** Optional label override. */
  label?: string
  className?: string
}

type ResolvedVariant = Exclude<ConnectionStatusVariant, 'connected'>

const STYLES: Record<
  ResolvedVariant,
  { bg: string; color: string; dot: string; label: string }
> = {
  ready: {
    bg: 'var(--success-bg)',
    color: 'var(--success)',
    dot: 'var(--success)',
    label: 'Ready',
  },
  partial: {
    bg: 'var(--warning-bg)',
    color: 'var(--warning)',
    dot: 'var(--warning)',
    label: 'Needs descriptions',
  },
  error: {
    bg: 'var(--error-bg)',
    color: 'var(--error)',
    dot: 'var(--error)',
    label: 'Error',
  },
  disconnected: {
    bg: 'var(--bg-tint-light)',
    color: 'var(--text-secondary)',
    dot: 'var(--text-tertiary)',
    label: 'Not connected',
  },
}

export function verdictToVariant(v: ConnectionVerdict): ResolvedVariant {
  if (v === 'GREEN') return 'ready'
  if (v === 'YELLOW') return 'partial'
  return 'error'
}

function normalize(v: ConnectionStatusVariant | undefined): ResolvedVariant | undefined {
  if (!v) return undefined
  if (v === 'connected') return 'ready'
  return v
}

export function ConnectionStatusPill({
  variant,
  verdict,
  label,
  className = '',
}: ConnectionStatusPillProps) {
  const resolved: ResolvedVariant =
    normalize(variant) ?? (verdict ? verdictToVariant(verdict) : 'disconnected')
  const style = STYLES[resolved]

  return (
    <span
      className={`inline-flex items-center gap-[6px] px-[8px] py-[3px] rounded-full font-[Bricolage_Grotesque] font-medium text-[10px] uppercase tracking-[1.5px] ${className}`}
      style={{ backgroundColor: style.bg, color: style.color }}
    >
      <span
        className="shrink-0 rounded-full"
        style={{ width: 6, height: 6, backgroundColor: style.dot }}
        aria-hidden
      />
      {label ?? style.label}
    </span>
  )
}
