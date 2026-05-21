/**
 * BaristaTaskTable — Table-style task list for the full-page Barista Tasks tab.
 * Columns: Task | Schedule | Status | Last run | Actions.
 *
 * Composition:
 *  - Header row (local, aligned to shared grid template)
 *  - BaristaTaskTableRow molecule per task
 *  - Empty-state placeholder when no tasks
 *
 * @figmaComponent  Barista/ Tasks Table (frame)
 * @figmaNode       6647:95416
 * @figmaFile       i9fxQ6pXrgRITEzopoXpWL
 * @figmaUrl        https://www.figma.com/design/i9fxQ6pXrgRITEzopoXpWL/6labs?node-id=6647-95416
 */

import type { ReactNode } from 'react'
import type { BaristaTask } from '../../state/BaristaContext'
import { BaristaTaskTableRow } from '../molecules/BaristaTaskTableRow'

const GRID_TEMPLATE = 'minmax(200px, 2fr) 1.4fr 1fr 1.2fr 140px'

export interface BaristaTaskTableProps {
  tasks: BaristaTask[]
  onOpenTask: (id: string) => void
  onRunTask: (id: string) => void
  onEditTask: (id: string) => void
  onDeleteTask: (id: string) => void
  className?: string
}

export function BaristaTaskTable({
  tasks,
  onOpenTask,
  onRunTask,
  onEditTask,
  onDeleteTask,
  className = '',
}: BaristaTaskTableProps) {
  return (
    <div
      className={`flex flex-col w-full rounded-[12px] overflow-hidden ${className}`}
      style={{
        backgroundColor: 'var(--bg-elements)',
        border: '1px solid var(--border-subtle)',
      }}
      role="table"
    >
      <TableHeader />
      {tasks.length === 0 ? (
        <div
          className="w-full flex items-center justify-center px-[20px] py-[48px] font-[Inter] text-[13px]"
          style={{ color: 'var(--text-tertiary)' }}
        >
          No tasks yet — create one to get started.
        </div>
      ) : (
        <div className="flex flex-col w-full">
          {tasks.map((task, i) => (
            <BaristaTaskTableRow
              key={task.id}
              task={task}
              gridTemplate={GRID_TEMPLATE}
              isLast={i === tasks.length - 1}
              onOpen={() => onOpenTask(task.id)}
              onRun={() => onRunTask(task.id)}
              onEdit={() => onEditTask(task.id)}
              onDelete={() => onDeleteTask(task.id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

function TableHeader() {
  return (
    <div
      className="grid w-full px-[20px] py-[14px]"
      style={{
        gridTemplateColumns: GRID_TEMPLATE,
        columnGap: 16,
        borderBottom: '1px solid var(--border-subtle)',
      }}
      role="rowheader"
    >
      <HeaderCell>Task</HeaderCell>
      <HeaderCell>Schedule</HeaderCell>
      <HeaderCell>Status</HeaderCell>
      <HeaderCell>Last run</HeaderCell>
      <HeaderCell align="right">Actions</HeaderCell>
    </div>
  )
}

function HeaderCell({
  children,
  align = 'left',
}: {
  children: ReactNode
  align?: 'left' | 'right'
}) {
  return (
    <p
      className="font-[Bricolage_Grotesque] font-semibold text-[11px] uppercase tracking-[1.5px] truncate"
      style={{ color: 'var(--text-tertiary)', textAlign: align }}
    >
      {children}
    </p>
  )
}
