/**
 * AgentPipelineLoader — Vertical step pipeline showing what an agent is doing.
 * Mirrors the connection-verify loader used in the BigQuery/Snowflake onboarding
 * flows (numbered marker → spinner/check, connector line, title + status sub-line).
 *
 * Steps before `currentStep` render as done, the step at `currentStep` is active,
 * and the rest are pending. When `currentStep >= steps.length`, all read as done.
 */

export interface PipelineStep {
  title: string
  /** Sub-line shown while this step is running */
  activeSub: string
  /** Sub-line shown once this step has completed */
  doneSub: string
}

type StepStatus = 'pending' | 'active' | 'done'

interface AgentPipelineLoaderProps {
  steps: PipelineStep[]
  /** Index of the active step; lower indices are done, higher are pending. */
  currentStep: number
  className?: string
}

const PALETTE: Record<StepStatus, { markerBg: string; markerBorder: string; markerFg: string; titleFg: string }> = {
  pending: {
    markerBg: 'var(--bg-card)',
    markerBorder: 'var(--border-default)',
    markerFg: 'var(--text-tertiary)',
    titleFg: 'var(--text-secondary)',
  },
  active: {
    markerBg: 'var(--bg-tint-light)',
    markerBorder: 'var(--brand)',
    markerFg: 'var(--brand)',
    titleFg: 'var(--text-primary)',
  },
  done: {
    markerBg: 'var(--success-bg)',
    markerBorder: 'var(--success)',
    markerFg: 'var(--success)',
    titleFg: 'var(--text-primary)',
  },
}

export function AgentPipelineLoader({ steps, currentStep, className }: AgentPipelineLoaderProps) {
  return (
    <ol className={['flex flex-col w-full', className].filter(Boolean).join(' ')}>
      {steps.map((step, i) => {
        const status: StepStatus = i < currentStep ? 'done' : i === currentStep ? 'active' : 'pending'
        return <StepRow key={step.title} step={step} status={status} isLast={i === steps.length - 1} />
      })}
    </ol>
  )
}

function StepRow({ step, status, isLast }: { step: PipelineStep; status: StepStatus; isLast: boolean }) {
  const palette = PALETTE[status]
  const subline = status === 'done' ? step.doneSub : status === 'active' ? step.activeSub : 'Waiting…'

  return (
    <li className="flex gap-m items-stretch" aria-current={status === 'active' ? 'step' : undefined}>
      <div className="flex flex-col items-center shrink-0" style={{ width: 24 }}>
        <span
          className="inline-flex items-center justify-center rounded-full"
          style={{
            width: 22,
            height: 22,
            backgroundColor: palette.markerBg,
            border: `1px solid ${palette.markerBorder}`,
            color: palette.markerFg,
          }}
          aria-hidden
        >
          {status === 'done' ? (
            <CheckGlyph />
          ) : status === 'active' ? (
            <Spinner />
          ) : (
            <span className="rounded-full" style={{ width: 6, height: 6, backgroundColor: palette.markerFg }} />
          )}
        </span>
        {!isLast && (
          <span
            style={{
              width: 2,
              flexGrow: 1,
              minHeight: 16,
              backgroundColor: status === 'done' ? 'var(--success)' : 'var(--border-subtle)',
              marginTop: 4,
              marginBottom: 4,
            }}
          />
        )}
      </div>

      <div className="flex-1 min-w-0 flex flex-col gap-xxs pb-m">
        <span className="font-body text-s font-medium" style={{ color: palette.titleFg }}>
          {step.title}
        </span>
        <span className="font-body text-xs leading-[1.5]" style={{ color: 'var(--text-tertiary)' }}>
          {subline}
        </span>
      </div>
    </li>
  )
}

function CheckGlyph() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path d="M2.5 6.2L5 8.7L9.5 3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function Spinner() {
  return (
    <span
      className="animate-spin"
      style={{ width: 12, height: 12, borderRadius: '50%', border: '2px solid currentColor', borderTopColor: 'transparent' }}
    />
  )
}
