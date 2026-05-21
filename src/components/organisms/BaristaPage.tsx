/**
 * BaristaPage — Dedicated full-page Barista surface.
 *
 * Routing: entered when sidebar `activeNav === 'barista'`.
 *  - setupStatus = 'not-set-up'  → empty intro + "Set up Barista" CTA
 *    (Setup flow is rendered by HomePage as a full-screen overlay when
 *    setupStatus === 'in-setup', so this body is never seen mid-setup.)
 *  - setupStatus = 'complete'    → top tab bar (Personalize | Tasks)
 *
 * Each tab renders its own body. Task detail and task-create dialog are
 * handled globally by HomePage so they overlay this page correctly.
 *
 * @figmaComponent  Barista/ Manage Page - Tasks (frame)
 * @figmaNode       6647:95380
 * @figmaFile       i9fxQ6pXrgRITEzopoXpWL
 * @figmaUrl        https://www.figma.com/design/i9fxQ6pXrgRITEzopoXpWL/6labs?node-id=6647-95380
 */

import { useState } from 'react'
import { useBarista } from '../../state/BaristaContext'
import { BaristaPersonalizeView } from './BaristaPersonalizeView'
import { BaristaTaskTable } from './BaristaTaskTable'
import { BaristaColoredIcon } from '../icons/BaristaColoredIcon'
import Button from '../ui/Button'
import { PopupModal } from '../molecules/PopupModal'

type BaristaPageTab = 'personalize' | 'tasks'

export interface BaristaPageProps {
  className?: string
}

export function BaristaPage({ className = '' }: BaristaPageProps) {
  const barista = useBarista()
  const [tab, setTab] = useState<BaristaPageTab>('personalize')
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null)
  const deleteTarget = deleteTargetId
    ? barista.tasks.find((t) => t.id === deleteTargetId) ?? null
    : null

  // Pre-setup intro — entered when user lands on Barista without a persona.
  if (barista.setupStatus !== 'complete') {
    return (
      <div
        className={`flex flex-col items-center justify-center gap-[16px] w-full h-full px-[32px] ${className}`}
      >
        <BaristaColoredIcon size={64} />
        <div className="flex flex-col gap-[6px] items-center max-w-[480px]">
          <p
            className="font-[Bricolage_Grotesque] font-semibold text-[22px] leading-[1.3] text-center"
            style={{ color: 'var(--text-primary)' }}
          >
            Meet Barista
          </p>
          <p
            className="font-[Inter] text-[14px] leading-[1.5] text-center"
            style={{ color: 'var(--text-secondary)' }}
          >
            Your personal agent for proactive insights and scheduled tasks.
            Set up your persona to get started.
          </p>
        </div>
        <Button variant="primary" size="md" onClick={() => barista.startSetup()}>
          Set up Barista
        </Button>
      </div>
    )
  }

  return (
    <div className={`flex flex-col w-full h-full ${className}`}>
      <BaristaPageTopbar active={tab} onChange={setTab} />
      <div
        className="flex-1 min-h-0 overflow-y-auto"
        style={{ backgroundColor: 'var(--bg-page)' }}
      >
        {tab === 'personalize' && barista.persona && (
          <BaristaPersonalizeView
            persona={barista.persona}
            onEdit={() => barista.startSetup()}
          />
        )}
        {tab === 'tasks' && (
          <div className="w-full max-w-[960px] mx-auto px-[24px] py-[32px] flex flex-col gap-[16px]">
            <div className="flex items-center justify-between w-full">
              <p
                className="font-[Bricolage_Grotesque] font-semibold text-[22px] leading-[1.3]"
                style={{ color: 'var(--text-primary)' }}
              >
                Tasks
              </p>
              <Button
                variant="primary"
                size="md"
                onClick={() => barista.openTaskDialog()}
              >
                New task
              </Button>
            </div>
            <BaristaTaskTable
              tasks={barista.tasks}
              onOpenTask={(id) => barista.openTask(id)}
              onRunTask={(id) => barista.runTaskNow(id)}
              onEditTask={(id) => {
                const task = barista.tasks.find((t) => t.id === id)
                if (task)
                  barista.openTaskDialog(
                    { name: task.name, prompt: task.prompt },
                    false
                  )
              }}
              onDeleteTask={(id) => setDeleteTargetId(id)}
            />
          </div>
        )}
      </div>

      <PopupModal
        isOpen={deleteTarget !== null}
        onClose={() => setDeleteTargetId(null)}
        title="Delete task?"
        body={
          deleteTarget
            ? `"${deleteTarget.name}" will be removed permanently. This cannot be undone.`
            : ''
        }
        primaryLabel="Delete"
        secondaryLabel="Cancel"
        primaryVariant="danger"
        onConfirm={() => {
          if (deleteTarget) barista.deleteTask(deleteTarget.id)
          setDeleteTargetId(null)
        }}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  )
}

function BaristaPageTopbar({
  active,
  onChange,
}: {
  active: BaristaPageTab
  onChange: (tab: BaristaPageTab) => void
}) {
  return (
    <div
      className="w-full h-[56px] flex items-start justify-center shrink-0 bg-bg-elements"
      style={{ borderBottom: '1px solid var(--bg-subtle)' }}
      role="tablist"
    >
      <div className="flex items-center h-full">
        <TopbarTab
          label="Personalize"
          active={active === 'personalize'}
          onClick={() => onChange('personalize')}
        />
        <TopbarTab
          label="Tasks"
          active={active === 'tasks'}
          onClick={() => onChange('tasks')}
        />
      </div>
    </div>
  )
}

function TopbarTab({
  label,
  active,
  onClick,
}: {
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className="oracle-tab flex flex-col items-center justify-between h-full"
      data-active={String(active)}
    >
      <div className="h-[2px] w-full rounded-xs" />
      <div className="flex gap-[6px] items-center px-m">
        <span
          className={[
            'font-display text-s font-semibold leading-[1.5] whitespace-nowrap',
            active ? 'text-brand' : 'text-text-secondary',
          ].join(' ')}
        >
          {label}
        </span>
      </div>
      <div
        className="h-[2px] w-full rounded-xs"
        style={{
          backgroundColor: active ? 'var(--brand-hover)' : 'transparent',
        }}
      />
    </button>
  )
}
