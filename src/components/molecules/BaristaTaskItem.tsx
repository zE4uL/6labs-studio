/**
 * BaristaTaskItem — single task card in the Tasks tab list.
 * Shows name, frequency, last run + status chip, and quick actions (run / edit / toggle enabled).
 */

import type { BaristaTask } from '../../state/BaristaContext'
import { PlayIcon } from '../icons/PlayIcon'
import { EditIcon } from '../icons/EditIcon'
import { TrashIcon } from '../icons/TrashIcon'
import { TaskStatusPill, type TaskStatusPillVariant } from '../atoms/TaskStatusPill'

const FREQUENCY_LABEL: Record<BaristaTask['frequency'], string> = {
  'no-repeat': 'Once',
  daily: 'Daily',
  weekly: 'Weekly',
  'every-weekday': 'Every weekday',
  monthly: 'Monthly',
}

function pillVariantFor(task: BaristaTask): TaskStatusPillVariant {
  if (!task.enabled) return 'paused'
  if (task.status === 'success' || task.status === 'running') return 'active'
  return 'scheduled'
}

export interface BaristaTaskItemProps {
  task: BaristaTask
  onClick?: () => void
  onRun?: () => void
  onEdit?: () => void
  onToggleEnabled?: () => void
  onDelete?: () => void
  className?: string
}

export function BaristaTaskItem({
  task,
  onClick,
  onRun,
  onEdit,
  onToggleEnabled,
  onDelete,
  className = '',
}: BaristaTaskItemProps) {
  const lastRunLabel = task.lastRunAt
    ? new Date(task.lastRunAt).toLocaleString([], {
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
      })
    : 'Never run'

  return (
    <div
      className={`group flex flex-col gap-[6px] rounded-[8px] px-[12px] py-[10px] transition-colors cursor-pointer ${className}`}
      style={{
        backgroundColor: 'var(--bg-elements)',
        border: '1px solid var(--border-subtle)',
      }}
      onClick={onClick}
      role="button"
      tabIndex={0}
    >
      <div className="flex items-center gap-[8px] w-full">
        <p
          className="flex-1 min-w-0 font-[Bricolage_Grotesque] font-semibold text-[14px] truncate"
          style={{ color: 'var(--text-primary)' }}
        >
          {task.name}
        </p>
        <TaskStatusPill variant={pillVariantFor(task)} />
      </div>
      <p
        className="font-[Bricolage_Grotesque] font-medium text-[10px] uppercase tracking-[1.5px]"
        style={{ color: 'var(--text-tertiary)' }}
      >
        {FREQUENCY_LABEL[task.frequency]}
      </p>
      <p
        className="font-[Inter] text-[12px] leading-[1.4] line-clamp-2"
        style={{ color: 'var(--text-secondary)' }}
      >
        {task.prompt}
      </p>
      <div className="flex items-center gap-[8px] w-full">
        <span
          className="flex-1 font-[Inter] text-[11px]"
          style={{ color: 'var(--text-tertiary)' }}
        >
          Last run: {lastRunLabel}
        </span>
        {onRun && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onRun()
            }}
            aria-label="Run task now"
            className="w-[24px] h-[24px] flex items-center justify-center rounded-[4px]"
            style={{ color: 'var(--text-secondary)' }}
          >
            <PlayIcon size={14} />
          </button>
        )}
        {onEdit && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onEdit()
            }}
            aria-label="Edit task"
            className="w-[24px] h-[24px] flex items-center justify-center rounded-[4px]"
            style={{ color: 'var(--text-secondary)' }}
          >
            <EditIcon size={12} />
          </button>
        )}
        {onDelete && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onDelete()
            }}
            aria-label="Delete task"
            className="w-[24px] h-[24px] flex items-center justify-center rounded-[4px]"
            style={{ color: 'var(--text-secondary)' }}
          >
            <TrashIcon size={12} />
          </button>
        )}
        {onToggleEnabled && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onToggleEnabled()
            }}
            role="switch"
            aria-checked={task.enabled}
            aria-label={`Task is ${task.enabled ? 'enabled' : 'paused'}`}
            className="relative shrink-0 rounded-full transition-colors"
            style={{
              width: 28,
              height: 16,
              backgroundColor: task.enabled ? 'var(--brand)' : 'var(--border-default)',
            }}
          >
            <span
              className="absolute top-[2px] block rounded-full transition-all duration-150"
              style={{
                width: 12,
                height: 12,
                left: task.enabled ? 14 : 2,
                backgroundColor: '#FFFFFF',
              }}
            />
          </button>
        )}
      </div>
    </div>
  )
}
