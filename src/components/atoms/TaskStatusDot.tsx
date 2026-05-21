/**
 * TaskStatusDot — 6px colored dot for inline task status display.
 * Used in the Barista task table to indicate status next to a plain-text label.
 *
 * Variants:
 *  - active     : brand (scheduled, running normally)
 *  - scheduled  : brand
 *  - running    : success
 *  - success    : success
 *  - error      : error
 *  - paused     : muted
 *
 * @figmaComponent  Task Status Dot
 * @figmaNode       6647:97549
 * @figmaFile       i9fxQ6pXrgRITEzopoXpWL
 * @figmaUrl        https://www.figma.com/design/i9fxQ6pXrgRITEzopoXpWL/6labs?node-id=6647-97549
 */

export type TaskStatusDotVariant =
  | 'active'
  | 'scheduled'
  | 'running'
  | 'success'
  | 'error'
  | 'paused'

export interface TaskStatusDotProps {
  variant: TaskStatusDotVariant
  size?: number
  className?: string
}

const COLOR: Record<TaskStatusDotVariant, string> = {
  active: 'var(--brand)',
  scheduled: 'var(--brand)',
  running: 'var(--success)',
  success: 'var(--success)',
  error: 'var(--error)',
  paused: 'var(--text-tertiary)',
}

export function TaskStatusDot({
  variant,
  size = 6,
  className = '',
}: TaskStatusDotProps) {
  return (
    <span
      aria-hidden
      className={`inline-block shrink-0 rounded-full ${className}`}
      style={{ width: size, height: size, backgroundColor: COLOR[variant] }}
    />
  )
}
