/**
 * BaristaTasksView — Tasks tab body for the Barista side panel.
 * Renders one of:
 *  - Empty state: Barista icon + "No tasks yet" + quick-start idea chips + Create / Manage
 *  - Active state: scheduled task list + "New task" CTA + Manage link
 *
 * Per PRD, Tasks tab content never changes the Oracle center — only this panel body.
 */

import type { BaristaTask } from '../../state/BaristaContext'
import { BaristaColoredIcon } from '../icons/BaristaColoredIcon'
import { BaristaTaskItem } from '../molecules/BaristaTaskItem'

const QUICK_STARTS = [
  'Churn signals this week',
  'Top monetization leaks',
  'Matchmaking anomalies',
  'Balance issues in ranked',
]

export interface BaristaTasksViewProps {
  tasks: BaristaTask[]
  onCreate: (prefill?: { name?: string; prompt?: string }) => void
  onOpenTask: (id: string) => void
  onRunTask: (id: string) => void
  onEditTask: (id: string) => void
  onToggleTask: (id: string) => void
  /** Optional — enables inline delete action on each task row. */
  onDeleteTask?: (id: string) => void
  /** Optional — reserved for Phase 2 Manage (dashboard) surface. */
  onManage?: () => void
  className?: string
}

export function BaristaTasksView({
  tasks,
  onCreate,
  onOpenTask,
  onRunTask,
  onEditTask,
  onToggleTask,
  onDeleteTask,
  className = '',
}: BaristaTasksViewProps) {
  if (tasks.length === 0) {
    return (
      <div
        className={`flex flex-1 flex-col items-center justify-center gap-[16px] w-full px-[24px] py-[24px] ${className}`}
      >
        <BaristaColoredIcon size={48} />
        <div className="flex flex-col gap-[4px] items-center">
          <p
            className="font-[Bricolage_Grotesque] font-semibold text-[16px] leading-[1.3] text-center"
            style={{ color: 'var(--text-primary)' }}
          >
            No tasks yet
          </p>
          <p
            className="font-[Inter] text-[12px] leading-[1.5] text-center"
            style={{ color: 'var(--text-secondary)' }}
          >
            Schedule a task and Barista will run it automatically.
          </p>
        </div>
        <div className="flex flex-col gap-[6px] w-full">
          <p
            className="font-[Bricolage_Grotesque] font-medium text-[10px] uppercase tracking-[1.5px] text-center"
            style={{ color: 'var(--text-secondary)' }}
          >
            Quick starts
          </p>
          <div className="flex flex-col gap-[6px]">
            {QUICK_STARTS.map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => onCreate({ name: q, prompt: q })}
                className="w-full text-left px-[12px] py-[8px] rounded-[8px] font-[Inter] text-[13px] transition-colors"
                style={{
                  color: 'var(--text-primary)',
                  backgroundColor: 'var(--bg-subtle)',
                }}
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`flex flex-col gap-[10px] w-full px-[16px] py-[16px] ${className}`}>
      <p
        className="font-[Bricolage_Grotesque] font-medium text-[10px] uppercase tracking-[1.5px]"
        style={{ color: 'var(--text-secondary)' }}
      >
        Scheduled Tasks
      </p>
      <div className="flex flex-col gap-[8px]">
        {tasks.map((task) => (
          <BaristaTaskItem
            key={task.id}
            task={task}
            onClick={() => onOpenTask(task.id)}
            onRun={() => onRunTask(task.id)}
            onEdit={() => onEditTask(task.id)}
            onToggleEnabled={() => onToggleTask(task.id)}
            onDelete={onDeleteTask ? () => onDeleteTask(task.id) : undefined}
          />
        ))}
      </div>
    </div>
  )
}
