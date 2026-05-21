/**
 * BaristaTaskTableRow — single row of the full-page Barista task table.
 * Composes:
 *  - task name
 *  - schedule (frequency + time)
 *  - status (TaskStatusDot + label)
 *  - last run (relative)
 *  - action buttons (Run / Edit / Delete via TaskActionIconButton)
 *
 * The parent supplies the grid template; this row uses the shared template
 * via CSS custom properties so the header and rows stay aligned.
 *
 * @figmaComponent  Barista/ Task Table Row
 * @figmaNode       6647:97550
 * @figmaFile       i9fxQ6pXrgRITEzopoXpWL
 * @figmaUrl        https://www.figma.com/design/i9fxQ6pXrgRITEzopoXpWL/6labs?node-id=6647-97550
 */

import type { KeyboardEvent } from 'react'
import type { BaristaTask } from '../../state/BaristaContext'
import {
  TaskStatusDot,
  type TaskStatusDotVariant,
} from '../atoms/TaskStatusDot'
import Button from '../ui/Button'
import { PlayIcon } from '../icons/PlayIcon'
import { EditIcon } from '../icons/EditIcon'
import { TrashIcon } from '../icons/TrashIcon'

const FREQUENCY_LABEL: Record<BaristaTask['frequency'], string> = {
  'no-repeat': 'Once',
  daily: 'Daily',
  weekly: 'Weekly',
  'every-weekday': 'Every weekday',
  monthly: 'Monthly',
}

export interface BaristaTaskTableRowProps {
  task: BaristaTask
  /** Grid template shared with the table header, e.g. "2fr 1.4fr 1fr 1.2fr 140px". */
  gridTemplate: string
  isLast?: boolean
  onOpen?: () => void
  onRun?: () => void
  onEdit?: () => void
  onDelete?: () => void
  className?: string
}

export function BaristaTaskTableRow({
  task,
  gridTemplate,
  isLast = false,
  onOpen,
  onRun,
  onEdit,
  onDelete,
  className = '',
}: BaristaTaskTableRowProps) {
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' && onOpen) onOpen()
  }

  return (
    <div
      className={`grid w-full items-center px-[20px] py-[16px] cursor-pointer ${className}`}
      style={{
        gridTemplateColumns: gridTemplate,
        columnGap: 16,
        borderBottom: isLast ? 'none' : '1px solid var(--border-subtle)',
      }}
      role="row"
      tabIndex={0}
      onClick={onOpen}
      onKeyDown={handleKeyDown}
    >
      <p
        className="min-w-0 font-[Bricolage_Grotesque] font-semibold text-[14px] truncate"
        style={{ color: 'var(--text-primary)' }}
      >
        {task.name}
      </p>

      <p
        className="min-w-0 font-[Inter] text-[13px] truncate"
        style={{ color: 'var(--text-secondary)' }}
      >
        {formatSchedule(task)}
      </p>

      <div className="flex items-center gap-[8px] min-w-0">
        <TaskStatusDot variant={statusVariant(task)} />
        <span
          className="font-[Inter] text-[13px] truncate"
          style={{ color: 'var(--text-secondary)' }}
        >
          {statusLabel(task)}
        </span>
      </div>

      <p
        className="min-w-0 font-[Inter] text-[13px] truncate"
        style={{ color: 'var(--text-tertiary)' }}
      >
        {formatLastRun(task)}
      </p>

      <div className="flex items-center justify-end gap-[8px]">
        {onRun && (
          <Button
            variant="transparent"
            size="md"
            iconOnly
            aria-label="Run task now"
            onClick={(e) => {
              e.stopPropagation()
              onRun()
            }}
          >
            <PlayIcon size={16} className="text-success" />
          </Button>
        )}
        {onEdit && (
          <Button
            variant="transparent"
            size="md"
            iconOnly
            aria-label="Edit task"
            onClick={(e) => {
              e.stopPropagation()
              onEdit()
            }}
          >
            <EditIcon size={16} className="text-brand" />
          </Button>
        )}
        {onDelete && (
          <Button
            variant="transparent"
            size="md"
            iconOnly
            aria-label="Delete task"
            onClick={(e) => {
              e.stopPropagation()
              onDelete()
            }}
          >
            <TrashIcon size={16} className="text-error" />
          </Button>
        )}
      </div>
    </div>
  )
}

export function statusVariant(task: BaristaTask): TaskStatusDotVariant {
  if (!task.enabled) return 'paused'
  if (task.status === 'running') return 'running'
  if (task.status === 'error') return 'error'
  if (task.status === 'success') return 'success'
  return 'scheduled'
}

export function statusLabel(task: BaristaTask): string {
  if (!task.enabled) return 'Paused'
  if (task.status === 'running') return 'Running'
  if (task.status === 'error') return 'Error'
  if (task.status === 'success') return 'Active'
  return 'Scheduled'
}

export function formatSchedule(task: BaristaTask): string {
  const freq = FREQUENCY_LABEL[task.frequency]
  const time = formatTime(task.scheduledAt)
  return time ? `${freq}, ${time}` : freq
}

function formatTime(scheduledAt: string): string {
  if (!scheduledAt) return ''
  if (/^\d{1,2}:\d{2}$/.test(scheduledAt)) {
    const [hStr, mStr] = scheduledAt.split(':')
    const d = new Date()
    d.setHours(Number(hStr), Number(mStr), 0, 0)
    return d.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
  }
  const d = new Date(scheduledAt)
  if (Number.isNaN(d.getTime())) return scheduledAt
  return d.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
}

export function formatLastRun(task: BaristaTask): string {
  if (!task.lastRunAt) return 'Never'
  const d = new Date(task.lastRunAt)
  if (Number.isNaN(d.getTime())) return task.lastRunAt
  const now = new Date()
  const sameDay =
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate()
  const time = d.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
  if (sameDay) return `Today, ${time}`
  return `${d.toLocaleDateString([], { month: 'short', day: 'numeric' })}, ${time}`
}
