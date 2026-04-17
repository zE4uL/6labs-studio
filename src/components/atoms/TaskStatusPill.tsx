/**
 * TaskStatusPill — colored pill indicating a scheduled-task's current status.
 * Three variants:
 *  - active     : Barista is currently running this task
 *  - scheduled  : waiting for next tick
 *  - paused     : user paused the task
 *
 * @figmaComponent  Barista/ Dashboard/ Taskl List/Status Pill
 * @figmaNode       6212:65229
 * @figmaFile       i9fxQ6pXrgRITEzopoXpWL
 * @figmaUrl        https://www.figma.com/design/i9fxQ6pXrgRITEzopoXpWL/6labs?node-id=6212-65229
 */

export type TaskStatusPillVariant = 'active' | 'scheduled' | 'paused'

export interface TaskStatusPillProps {
  variant: TaskStatusPillVariant
  label?: string
  className?: string
}

const STYLES: Record<
  TaskStatusPillVariant,
  { bg: string; color: string; dot: string; label: string }
> = {
  active: {
    bg: 'var(--success-bg)',
    color: 'var(--success)',
    dot: 'var(--success)',
    label: 'Active',
  },
  scheduled: {
    bg: 'var(--bg-tint-light)',
    color: 'var(--brand)',
    dot: 'var(--brand)',
    label: 'Scheduled',
  },
  paused: {
    bg: 'var(--warning-bg)',
    color: 'var(--warning)',
    dot: 'var(--warning)',
    label: 'Paused',
  },
}

export function TaskStatusPill({ variant, label, className = '' }: TaskStatusPillProps) {
  const style = STYLES[variant]
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
