/**
 * BaristaTaskDetailPage — full-width detail view shown when a Tasks-tab item is clicked.
 * Per PRD:
 *  - Question (right-aligned grey bubble at top)
 *  - Answers ordered oldest → latest; page auto-scrolls to bottom
 *  - Latest result: full card with source thumbnails + divider + answer
 *  - Older results: compact cards with a grey dot
 *  - "Branch in new chat" button inside latest result
 *  - No input box (tasks are automated, not conversational)
 */

import { useEffect, useRef } from 'react'
import type { BaristaTask } from '../../state/BaristaContext'
import Button from '../ui/Button'
import { BaristaIcon } from '../icons/BaristaIcon'
import { DropdownArrowIcon } from '../icons/DropdownArrowIcon'

const FREQUENCY_LABEL: Record<BaristaTask['frequency'], string> = {
  'no-repeat': 'Once',
  daily: 'Daily',
  weekly: 'Weekly',
  'every-weekday': 'Every weekday',
  monthly: 'Monthly',
}

export interface BaristaTaskDetailPageProps {
  task: BaristaTask
  onBack: () => void
  onBranchInNewChat: (task: BaristaTask, resultId: string) => void
  onRunNow: () => void
  className?: string
}

export function BaristaTaskDetailPage({
  task,
  onBack,
  onBranchInNewChat,
  onRunNow,
  className = '',
}: BaristaTaskDetailPageProps) {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [task.results.length])

  const results = task.results
  const latestIndex = results.length - 1

  return (
    <div
      className={`flex flex-col w-full h-full overflow-y-auto ${className}`}
      style={{ backgroundColor: 'var(--bg-page)' }}
    >
      {/* Topbar */}
      <div
        className="flex items-center gap-[12px] w-full h-[56px] px-[20px] shrink-0"
        style={{
          backgroundColor: 'var(--bg-elements)',
          borderBottom: '1px solid var(--border-subtle)',
        }}
      >
        <button
          type="button"
          onClick={onBack}
          aria-label="Back to Oracle"
          className="w-[32px] h-[32px] flex items-center justify-center rounded-[6px]"
          style={{ color: 'var(--text-secondary)' }}
        >
          <DropdownArrowIcon size={16} className="rotate-90" />
        </button>
        <div className="flex items-center gap-[8px] flex-1 min-w-0">
          <span
            className="flex items-center justify-center shrink-0 w-[24px] h-[24px] rounded-[6px]"
            style={{ backgroundColor: 'var(--purple-tint-light)', color: 'var(--purple)' }}
          >
            <BaristaIcon size={12} />
          </span>
          <p
            className="font-[Bricolage_Grotesque] font-semibold text-[14px]"
            style={{ color: 'var(--text-primary)' }}
          >
            {task.name}
          </p>
          <span
            className="px-[8px] py-[2px] rounded-full font-[Bricolage_Grotesque] font-medium text-[10px] uppercase tracking-[1px]"
            style={{ backgroundColor: 'var(--bg-subtle)', color: 'var(--text-secondary)' }}
          >
            {FREQUENCY_LABEL[task.frequency]}
          </span>
          <span
            className="px-[8px] py-[2px] rounded-full font-[Bricolage_Grotesque] font-medium text-[10px] uppercase tracking-[1px]"
            style={{
              backgroundColor: task.enabled ? 'var(--success-bg)' : 'var(--warning-bg)',
              color: task.enabled ? 'var(--success)' : 'var(--warning)',
            }}
          >
            {task.enabled ? 'Active' : 'Paused'}
          </span>
        </div>
        <Button variant="outline" size="md" onClick={onRunNow}>
          Run now
        </Button>
      </div>

      {/* Body */}
      <div className="flex-1 flex flex-col items-center w-full px-[80px] pt-[32px] pb-[64px]">
        <div className="flex flex-col gap-[16px] w-full max-w-[880px]">
          {/* Question bubble — right-aligned grey */}
          <div className="flex justify-end">
            <div
              className="max-w-[72%] rounded-[12px] px-[16px] py-[12px]"
              style={{
                backgroundColor: 'var(--bg-subtle)',
                color: 'var(--text-primary)',
              }}
            >
              <p className="font-[Inter] text-[14px] leading-[1.5]">{task.prompt}</p>
            </div>
          </div>

          {results.length === 0 && (
            <div
              className="flex flex-col items-center gap-[8px] rounded-[12px] p-[32px]"
              style={{
                backgroundColor: 'var(--bg-elements)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              <p
                className="font-[Bricolage_Grotesque] font-semibold text-[14px]"
                style={{ color: 'var(--text-primary)' }}
              >
                No results yet
              </p>
              <p
                className="font-[Inter] text-[12px] text-center"
                style={{ color: 'var(--text-secondary)' }}
              >
                Barista will run this task on the next scheduled tick, or you can run it now.
              </p>
            </div>
          )}

          {results.map((result, idx) => {
            const isLatest = idx === latestIndex
            const ts = new Date(result.timestamp).toLocaleString([], {
              month: 'short',
              day: 'numeric',
              hour: 'numeric',
              minute: '2-digit',
            })
            return (
              <div
                key={result.id}
                className="flex flex-col gap-[12px] rounded-[12px] p-[20px]"
                style={{
                  backgroundColor: 'var(--bg-elements)',
                  border: '1px solid var(--border-subtle)',
                }}
              >
                <div className="flex items-center gap-[8px]">
                  <span
                    className="shrink-0 rounded-full"
                    style={{
                      width: 8,
                      height: 8,
                      backgroundColor: isLatest ? 'var(--success)' : 'var(--text-tertiary)',
                    }}
                  />
                  <p
                    className="font-[Bricolage_Grotesque] font-medium text-[10px] uppercase tracking-[1.5px]"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {isLatest ? 'Latest result' : `Run ${idx + 1}`}
                  </p>
                  <p
                    className="ml-auto font-[Inter] text-[11px]"
                    style={{ color: 'var(--text-tertiary)' }}
                  >
                    {ts}
                  </p>
                </div>

                {result.sources && result.sources.length > 0 && (
                  <div className="flex gap-[8px] flex-wrap">
                    {result.sources.map((_src, i) => (
                      <div
                        key={i}
                        className="w-[120px] h-[72px] rounded-[6px] overflow-hidden"
                        style={{
                          backgroundImage: `linear-gradient(135deg, var(--purple-tint-light), var(--bg-tint-light))`,
                        }}
                        aria-label={`Source ${i + 1}`}
                      />
                    ))}
                  </div>
                )}

                <div className="h-[1px] w-full" style={{ backgroundColor: 'var(--border-subtle)' }} />

                <p
                  className="font-[Inter] text-[14px] leading-[1.5]"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {result.answer}
                </p>

                {isLatest && (
                  <div className="flex items-center">
                    <button
                      type="button"
                      onClick={() => onBranchInNewChat(task, result.id)}
                      className="flex items-center gap-[6px] px-[14px] py-[8px] rounded-full font-[Bricolage_Grotesque] font-semibold text-[13px]"
                      style={{
                        backgroundColor: 'var(--brand)',
                        color: '#FFFFFF',
                      }}
                    >
                      Branch in new chat
                    </button>
                  </div>
                )}
              </div>
            )
          })}

          <div ref={bottomRef} />
        </div>
      </div>
    </div>
  )
}
