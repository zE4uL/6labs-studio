/**
 * BaristaTurnCard — per-turn status card inside the Barista panel body.
 * Shows a colored bullet + label ("TURN N · QUESTION" or "Auto mode Paused") + question + timestamp.
 *
 * Variants map to Figma "Property 1":
 *  - running : purple bullet, purple label "TURN N · QUESTION", primary question text
 *  - paused  : tertiary bullet, tertiary label "Auto mode Paused", muted text
 *  - success : success bullet, purple label
 *  - warning : warning bullet, purple label
 *  - error   : error bullet, purple label
 *
 * @figmaComponent  Barista/ Card/ Turn
 * @figmaNode       6147:73761
 * @figmaFile       i9fxQ6pXrgRITEzopoXpWL
 * @figmaUrl        https://www.figma.com/design/i9fxQ6pXrgRITEzopoXpWL/6labs?node-id=6147-73761
 */

export type BaristaTurnStatus = 'running' | 'paused' | 'success' | 'warning' | 'error'

export interface BaristaTurnCardProps {
  status: BaristaTurnStatus
  turnNumber?: number
  question: string
  timestamp: string
  pausedReason?: string
  className?: string
}

const bulletColor: Record<BaristaTurnStatus, string> = {
  running: 'var(--purple)',
  paused: 'var(--text-tertiary)',
  success: 'var(--success)',
  warning: 'var(--warning)',
  error: 'var(--error)',
}

export function BaristaTurnCard({
  status,
  turnNumber = 1,
  question,
  timestamp,
  pausedReason,
  className = '',
}: BaristaTurnCardProps) {
  const isPaused = status === 'paused'
  const labelColor = isPaused ? 'var(--text-tertiary)' : 'var(--purple)'
  const bodyColor = isPaused ? 'var(--text-tertiary)' : 'var(--text-secondary)'
  const label = isPaused ? 'Auto mode Paused' : `TURN ${turnNumber} · QUESTION`
  const body = isPaused && pausedReason ? pausedReason : question

  return (
    <div className={`flex flex-col gap-[4px] w-full ${className}`}>
      <div className="flex items-center gap-[8px] w-full">
        <span
          className="shrink-0 rounded-full"
          style={{ width: 6, height: 6, backgroundColor: bulletColor[status] }}
          aria-hidden
        />
        <p
          className="font-[Bricolage_Grotesque] font-medium text-[10px] uppercase tracking-[1.5px]"
          style={{ color: labelColor }}
        >
          {label}
        </p>
      </div>
      <p
        className="w-full font-[Inter] text-[12px] leading-[1.5]"
        style={{ color: bodyColor }}
      >
        {body}
      </p>
      <p
        className="w-full font-[Inter] text-[10px] tracking-[0.2px]"
        style={{ color: 'var(--text-placeholder)' }}
      >
        {timestamp}
      </p>
    </div>
  )
}
