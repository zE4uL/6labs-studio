/**
 * BaristaSidePanel — 315-wide right rail that hosts Barista Assist (Phase 1).
 * Tasks variant deferred to Phase 2.
 *
 * States (matches Figma `State` variants):
 *  - onboarding    : pre-setup, show welcome + "Let's set up" CTA
 *  - profile-ready : setup done, show persona + Start Barista CTA
 *  - approve       : auto mode OFF, Barista proposes next question
 *  - running       : auto mode ON, Barista is generating; shows live turn cards
 *  - paused        : user manually paused or switched screens mid-generation
 *
 * @figmaComponent  Barista Side Panel
 * @figmaNode       6017:72095
 * @figmaFile       i9fxQ6pXrgRITEzopoXpWL
 * @figmaUrl        https://www.figma.com/design/i9fxQ6pXrgRITEzopoXpWL/6labs?node-id=6017-72095
 */

import { BaristaPanelHeader } from '../molecules/BaristaPanelHeader'
import { BaristaPanelTabs } from '../molecules/BaristaPanelTabs'
import { BaristaAutoModeCard } from '../molecules/BaristaAutoModeCard'
import { BaristaWelcomeSection } from '../molecules/BaristaWelcomeSection'
import { BaristaSuggestedCard } from '../molecules/BaristaSuggestedCard'
import { BaristaTurnCard, type BaristaTurnStatus } from '../molecules/BaristaTurnCard'
import { BaristaTasksView } from './BaristaTasksView'
import Button from '../ui/Button'
import { BaristaIcon } from '../icons/BaristaIcon'
import { DropdownArrowIcon } from '../icons/DropdownArrowIcon'
import { PlusIcon } from '../icons/PlusIcon'
import type { BaristaActiveTab, BaristaTask } from '../../state/BaristaContext'

export type BaristaPanelState =
  | 'onboarding'
  | 'profile-ready'
  | 'approve'
  | 'running'
  | 'paused'

export interface BaristaTurn {
  id: string
  turnNumber: number
  status: BaristaTurnStatus
  question: string
  timestamp: string
  pausedReason?: string
  /** Mock Oracle answer. Populated when the turn transitions to success. */
  answer?: string
}

export interface BaristaSidePanelProps {
  state: BaristaPanelState
  activeTab: BaristaActiveTab
  onTabChange: (tab: BaristaActiveTab) => void
  autoMode: boolean
  onAutoModeChange: (next: boolean) => void
  personaSummary?: string
  suggestedQuestion?: string
  turns?: BaristaTurn[]
  // Assist actions
  onSetup?: () => void
  onStartBarista?: () => void
  onSendSuggested?: (q: string) => void
  onEditSuggested?: (q: string) => void
  onTryAnother?: () => void
  onStop?: () => void
  onReset?: () => void
  onClose?: () => void
  onEditPersona?: () => void
  // Tasks actions
  tasks?: BaristaTask[]
  onCreateTask?: (prefill?: { name?: string; prompt?: string }) => void
  onOpenTask?: (id: string) => void
  onRunTask?: (id: string) => void
  onEditTask?: (id: string) => void
  onToggleTask?: (id: string) => void
  className?: string
}

export function BaristaSidePanel({
  state,
  activeTab,
  onTabChange,
  autoMode,
  onAutoModeChange,
  personaSummary,
  suggestedQuestion,
  turns = [],
  onSetup,
  onStartBarista,
  onSendSuggested,
  onEditSuggested,
  onTryAnother,
  onStop,
  onReset,
  onClose,
  onEditPersona,
  tasks = [],
  onCreateTask,
  onOpenTask,
  onRunTask,
  onEditTask,
  onToggleTask,
  className = '',
}: BaristaSidePanelProps) {
  const isTasks = activeTab === 'tasks'
  const subtitle = isTasks
    ? 'managing your tasks'
    : state === 'running' || state === 'approve'
      ? 'brewing your brief...'
      : 'Personal Assistant'

  return (
    <aside
      className={`barista-side-panel flex flex-col h-full shrink-0 w-[380px] overflow-hidden ${className}`}
      style={{
        backgroundColor: 'var(--bg-elements)',
        borderLeft: '1px solid var(--border-subtle)',
      }}
      aria-label="Barista panel"
    >
      <BaristaPanelHeader
        subtitle={subtitle}
        turnNumber={
          !isTasks && (state === 'running' || state === 'approve') && turns.length > 0
            ? turns[turns.length - 1].turnNumber
            : undefined
        }
        onSettings={state !== 'onboarding' ? onEditPersona : undefined}
        onClose={onClose}
      />
      <BaristaPanelTabs active={activeTab} onChange={onTabChange} />

      {!isTasks && state !== 'onboarding' && (
        <BaristaAutoModeCard active={autoMode} onChange={onAutoModeChange} />
      )}

      {isTasks && (
        <>
          <div className="flex-1 overflow-y-auto flex flex-col">
            <BaristaTasksView
              tasks={tasks}
              onCreate={(prefill) => onCreateTask?.(prefill)}
              onOpenTask={(id) => onOpenTask?.(id)}
              onRunTask={(id) => onRunTask?.(id)}
              onEditTask={(id) => onEditTask?.(id)}
              onToggleTask={(id) => onToggleTask?.(id)}
            />
          </div>
          <div
            className="flex flex-col gap-[10px] px-[16px] py-[16px] shrink-0"
            style={{
              backgroundColor: 'var(--bg-elements)',
              borderTop: '1px solid var(--border-subtle)',
            }}
          >
            {tasks.length > 0 && (
              <p
                className="font-[Inter] text-[11px] text-center"
                style={{ color: 'var(--text-secondary)' }}
              >
                {tasks.length} task{tasks.length === 1 ? '' : 's'} scheduled
              </p>
            )}
            <div className="flex items-stretch gap-[8px]">
              <Button
                variant="primary"
                size="md"
                className="flex-1"
                leftIcon={<PlusIcon size={16} />}
                onClick={() => onCreateTask?.()}
              >
                Create
              </Button>
              {tasks.length > 0 && (
                <Button
                  variant="tertiary"
                  size="md"
                  onClick={() => {
                    /* placeholder — Phase 2 Manage view */
                  }}
                >
                  Manage
                </Button>
              )}
            </div>
          </div>
        </>
      )}

      {!isTasks && (
        <>
      <div className="flex-1 overflow-y-auto flex flex-col">
        {state === 'onboarding' && (
          <div className="flex-1 flex items-center justify-center">
            <BaristaWelcomeSection state="onboarding" onSetup={onSetup} />
          </div>
        )}

        {state === 'profile-ready' && (
          <div className="flex-1 flex items-center justify-center">
            <BaristaWelcomeSection
              state="profile-ready"
              personaSummary={personaSummary}
              onEditPersona={onEditPersona}
            />
          </div>
        )}

        {(state === 'running' || state === 'paused') && (
          <div className="flex flex-col gap-[16px] px-[16px] py-[16px]">
            {turns.length === 0 && state === 'running' && (
              <p
                className="font-[Inter] text-[12px]"
                style={{ color: 'var(--text-tertiary)' }}
              >
                Barista is brewing your first question…
              </p>
            )}
            {turns.map((turn) => (
              <BaristaTurnCard
                key={turn.id}
                status={turn.status}
                turnNumber={turn.turnNumber}
                question={turn.question}
                timestamp={turn.timestamp}
                pausedReason={turn.pausedReason}
              />
            ))}
          </div>
        )}

        {state === 'approve' && turns.length > 0 && (
          <div className="flex flex-col gap-[16px] px-[16px] py-[16px]">
            {turns.map((turn) => (
              <BaristaTurnCard
                key={turn.id}
                status={turn.status}
                turnNumber={turn.turnNumber}
                question={turn.question}
                timestamp={turn.timestamp}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── Footer — status line + CTAs pinned to the bottom.
            Onboarding has no footer: the CTA lives inside the WelcomeSection. */}
      {state === 'profile-ready' && onStartBarista && (
        <div
          className="flex flex-col items-stretch gap-[10px] px-[16px] py-[16px] shrink-0"
          style={{
            backgroundColor: 'var(--bg-elements)',
            borderTop: '1px solid var(--border-subtle)',
          }}
        >
          <p
            className="font-[Inter] text-[11px] leading-[1.4] text-center"
            style={{ color: 'var(--purple)' }}
          >
            Welcome back — profile loaded. Click Start Barista.
          </p>
          <Button
            variant="blueish"
            size="md"
            onClick={onStartBarista}
            leftIcon={<BaristaIcon size={16} />}
            rightIcon={<DropdownArrowIcon size={16} className="-rotate-90" />}
          >
            Start Barista
          </Button>
        </div>
      )}

      {state === 'approve' && suggestedQuestion && (
        <div className="shrink-0">
          <BaristaSuggestedCard
            question={suggestedQuestion}
            onSend={onSendSuggested}
            onEdit={onEditSuggested}
            onTryAnother={onTryAnother}
          />
        </div>
      )}

      {state === 'running' && (
        <div
          className="flex flex-col items-stretch gap-[10px] px-[16px] py-[16px] shrink-0"
          style={{
            backgroundColor: 'var(--bg-elements)',
            borderTop: '1px solid var(--border-subtle)',
          }}
        >
          <p
            className="font-[Inter] text-[11px] leading-[1.4] text-center"
            style={{ color: 'var(--purple)' }}
          >
            Barista is ready
          </p>
          <Button
            variant="danger"
            size="md"
            onClick={onStop}
            leftIcon={
              <span
                className="inline-block w-[10px] h-[10px] rounded-[2px]"
                style={{ backgroundColor: '#FFFFFF' }}
                aria-hidden
              />
            }
          >
            Stop
          </Button>
        </div>
      )}

      {state === 'paused' && (
        <div
          className="flex flex-col items-stretch gap-[12px] px-[16px] py-[16px] shrink-0"
          style={{
            backgroundColor: 'var(--bg-elements)',
            borderTop: '1px solid var(--border-subtle)',
          }}
        >
          <p
            className="font-[Inter] text-[11px] leading-[1.4] text-center"
            style={{ color: 'var(--purple)' }}
          >
            Waiting for your approval
          </p>
          <div className="flex items-stretch gap-[8px]">
            <Button
              variant="blueish"
              size="md"
              className="flex-1"
              onClick={onStartBarista}
            >
              Start Barista
            </Button>
            {onReset && (
              <Button variant="tertiary" size="md" onClick={onReset}>
                Reset
              </Button>
            )}
          </div>
        </div>
      )}
        </>
      )}
    </aside>
  )
}
