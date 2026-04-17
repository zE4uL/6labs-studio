/**
 * BaristaTaskCreateDialog — "Schedule a task" modal.
 * Matches Figma 6425:90415: 520w, single Save Task CTA, uppercase tracked labels,
 * frequency/date/time triplet, timezone line with Change link, and a tinted
 * "Also deliver results to email" block.
 *
 * @figmaComponent  Popup/ Modal
 * @figmaNode       6425:90415
 * @figmaFile       i9fxQ6pXrgRITEzopoXpWL
 * @figmaUrl        https://www.figma.com/design/i9fxQ6pXrgRITEzopoXpWL/6labs?node-id=6425-90415
 */

import { useEffect, useRef, useState } from 'react'
import Button from '../ui/Button'
import { CloseIcon } from '../icons/CloseIcon'
import { DropdownArrowIcon } from '../icons/DropdownArrowIcon'
import { CalendarIcon } from '../icons/CalendarIcon'
import { CheckIcon } from '../icons/CheckIcon'
import type { BaristaTaskFrequency } from '../../state/BaristaContext'

export interface BaristaTaskCreateDialogProps {
  open: boolean
  /** No longer controls button layout — kept for backwards compat. */
  postRun?: boolean
  prefill?: { name?: string; prompt?: string }
  onCancel: () => void
  onSaveAndSchedule: (data: {
    name: string
    prompt: string
    frequency: BaristaTaskFrequency
    scheduledAt: string
    timezone: string
  }) => void
  /** Kept for PRD "Run once" flow — unused in the current Figma modal. */
  onRunOnce?: (data: { name: string; prompt: string }) => void
}

const FREQUENCY_OPTIONS: { value: BaristaTaskFrequency; label: string }[] = [
  { value: 'no-repeat', label: 'No repeat' },
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'every-weekday', label: 'Every weekday' },
  { value: 'monthly', label: 'Monthly' },
]

function detectTimezone() {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone
  } catch {
    return 'UTC'
  }
}

function timezoneLabel(tz: string) {
  try {
    const offsetMin = -new Date().getTimezoneOffset()
    const sign = offsetMin >= 0 ? '+' : '-'
    const hh = Math.floor(Math.abs(offsetMin) / 60)
    const mm = Math.abs(offsetMin) % 60
    return `${tz} (GMT${sign}${hh}:${String(mm).padStart(2, '0')})`
  } catch {
    return tz
  }
}

function defaultDateTime() {
  const d = new Date()
  d.setMinutes(0)
  d.setHours(d.getHours() + 1)
  const pad = (n: number) => String(n).padStart(2, '0')
  const date = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
  const time = `${pad(d.getHours())}:${pad(d.getMinutes())}`
  return { date, time }
}

export function BaristaTaskCreateDialog({
  open,
  postRun,
  prefill,
  onCancel,
  onSaveAndSchedule,
  onRunOnce,
}: BaristaTaskCreateDialogProps) {
  const [name, setName] = useState(prefill?.name ?? '')
  const [prompt, setPrompt] = useState(prefill?.prompt ?? '')
  const [frequency, setFrequency] = useState<BaristaTaskFrequency>('weekly')
  const [{ date, time }, setDateTime] = useState(defaultDateTime)
  const [emailEnabled, setEmailEnabled] = useState(false)
  const [email, setEmail] = useState('')
  const timezone = detectTimezone()

  const [freqOpen, setFreqOpen] = useState(false)
  const [timeOpen, setTimeOpen] = useState(false)
  const freqRef = useRef<HTMLDivElement>(null)
  const timeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    setName(prefill?.name ?? '')
    setPrompt(prefill?.prompt ?? '')
    setFrequency('weekly')
    setDateTime(defaultDateTime())
    setEmailEnabled(false)
    setEmail('')
    setFreqOpen(false)
    setTimeOpen(false)
  }, [open, prefill])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (freqRef.current && !freqRef.current.contains(e.target as Node)) setFreqOpen(false)
      if (timeRef.current && !timeRef.current.contains(e.target as Node)) setTimeOpen(false)
    }
    window.addEventListener('mousedown', handler)
    return () => window.removeEventListener('mousedown', handler)
  }, [])

  if (!open) return null

  const canSubmit = name.trim().length > 0 && prompt.trim().length > 0
  const scheduledAt = new Date(`${date}T${time}`).toISOString()
  const timeOptions = Array.from({ length: 24 * 2 }, (_, i) => {
    const h = Math.floor(i / 2)
    const m = i % 2 === 0 ? 0 : 30
    const h12 = ((h + 11) % 12) + 1
    const ampm = h < 12 ? 'AM' : 'PM'
    const value = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
    const label = `${h12}:${String(m).padStart(2, '0')} ${ampm}`
    return { value, label }
  })
  const timeLabel = timeOptions.find((o) => o.value === time)?.label ?? time
  const dateLabel = (() => {
    const [y, mo, d] = date.split('-')
    return `${d}/${mo}/${y}`
  })()

  const handleSave = () => {
    if (!canSubmit) return
    onSaveAndSchedule({
      name: name.trim(),
      prompt: prompt.trim(),
      frequency,
      scheduledAt,
      timezone,
    })
  }
  const handleRun = () => {
    if (!canSubmit || !onRunOnce) return
    onRunOnce({ name: name.trim(), prompt: prompt.trim() })
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Schedule a task"
      className="fixed inset-0 z-50 flex items-center justify-center p-[24px]"
      style={{ backgroundColor: 'rgba(3, 13, 45, 0.35)' }}
      onClick={onCancel}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col w-full max-w-[520px] rounded-[8px] overflow-hidden"
        style={{
          backgroundColor: 'var(--bg-elements)',
          boxShadow: '0px 24px 48px rgba(0,0,0,0.18)',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-[16px] pt-[16px]">
          <p
            className="font-[Bricolage_Grotesque] font-semibold text-[18px]"
            style={{ color: 'var(--text-primary)' }}
          >
            Schedule a task
          </p>
          <button
            type="button"
            onClick={onCancel}
            aria-label="Close"
            className="w-[24px] h-[24px] flex items-center justify-center rounded-[4px]"
            style={{ color: 'var(--text-secondary)' }}
          >
            <CloseIcon size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="flex flex-col gap-[16px] p-[16px]">
          {/* Task name */}
          <Field label="TASK NAME">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="eg. Weekly churn analysis"
              className="w-full h-[40px] rounded-[8px] px-[12px] font-[Inter] text-[14px] outline-none"
              style={{
                backgroundColor: 'var(--bg-elements)',
                border: '1px solid var(--border-default)',
                color: 'var(--text-primary)',
              }}
            />
          </Field>

          {/* What should Barista do */}
          <Field
            label="WHAT SHOULD BARISTA DO?"
            helper="Barista handles it from here."
          >
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe the task in plain language..."
              rows={3}
              className="w-full resize-none rounded-[6px] p-[12px] font-[Inter] text-[14px] leading-[1.5] outline-none"
              style={{
                backgroundColor: 'var(--bg-elements)',
                border: '1px solid var(--border-default)',
                color: 'var(--text-primary)',
              }}
            />
          </Field>

          {/* Schedule row */}
          <div className="flex flex-col gap-[10px]">
            <Label text="SCHEDULE" />
            <div className="flex items-center gap-[10px]">
              {/* Frequency */}
              <div ref={freqRef} className="relative flex-1">
                <button
                  type="button"
                  onClick={() => {
                    setFreqOpen((v) => !v)
                    setTimeOpen(false)
                  }}
                  className="w-full h-[40px] flex items-center justify-between px-[12px] rounded-[8px] font-[Inter] text-[14px] text-left"
                  style={{
                    backgroundColor: 'var(--bg-elements)',
                    border: `1px solid ${freqOpen ? 'var(--border-focus)' : 'var(--border-default)'}`,
                    color: 'var(--text-primary)',
                  }}
                >
                  {FREQUENCY_OPTIONS.find((o) => o.value === frequency)?.label ?? 'Frequency'}
                  <DropdownArrowIcon size={16} className={freqOpen ? 'rotate-180' : ''} />
                </button>
                {freqOpen && (
                  <DropdownPanel>
                    {FREQUENCY_OPTIONS.map((opt) => (
                      <DropdownItem
                        key={opt.value}
                        selected={opt.value === frequency}
                        onClick={() => {
                          setFrequency(opt.value)
                          setFreqOpen(false)
                        }}
                      >
                        {opt.label}
                      </DropdownItem>
                    ))}
                  </DropdownPanel>
                )}
              </div>

              {/* Date */}
              <label
                className="relative flex-1 h-[40px] flex items-center gap-[8px] px-[12px] rounded-[8px] cursor-pointer"
                style={{
                  backgroundColor: 'var(--bg-elements)',
                  border: '1px solid var(--border-default)',
                  color: 'var(--text-primary)',
                }}
              >
                <span className="flex-1 font-[Inter] text-[14px]">{dateLabel}</span>
                <CalendarIcon size={16} />
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDateTime((p) => ({ ...p, date: e.target.value }))}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              </label>

              {/* Time */}
              <div ref={timeRef} className="relative flex-1">
                <button
                  type="button"
                  onClick={() => {
                    setTimeOpen((v) => !v)
                    setFreqOpen(false)
                  }}
                  className="w-full h-[40px] flex items-center justify-between px-[12px] rounded-[8px] font-[Inter] text-[14px] text-left"
                  style={{
                    backgroundColor: 'var(--bg-elements)',
                    border: `1px solid ${timeOpen ? 'var(--border-focus)' : 'var(--border-default)'}`,
                    color: 'var(--text-primary)',
                  }}
                >
                  {timeLabel}
                  <DropdownArrowIcon size={16} className={timeOpen ? 'rotate-180' : ''} />
                </button>
                {timeOpen && (
                  <DropdownPanel>
                    {timeOptions.map((opt) => (
                      <DropdownItem
                        key={opt.value}
                        selected={opt.value === time}
                        onClick={() => {
                          setDateTime((p) => ({ ...p, time: opt.value }))
                          setTimeOpen(false)
                        }}
                      >
                        {opt.label}
                      </DropdownItem>
                    ))}
                  </DropdownPanel>
                )}
              </div>
            </div>
            <p
              className="font-[Inter] text-[12px]"
              style={{ color: 'var(--text-secondary)' }}
            >
              {timezoneLabel(timezone)} ·{' '}
              <button
                type="button"
                className="underline underline-offset-2"
                style={{ color: 'var(--brand)' }}
              >
                Change
              </button>
            </p>
          </div>

          {/* Email delivery (PRD: "Later" — kept as an optional toggle block) */}
          <div
            className="flex flex-col gap-[12px] rounded-[8px] p-[12px]"
            style={{ backgroundColor: 'var(--bg-tint-light)' }}
          >
            <label className="flex items-center gap-[10px] cursor-pointer select-none">
              <span
                role="checkbox"
                aria-checked={emailEnabled}
                onClick={() => setEmailEnabled((v) => !v)}
                className="flex items-center justify-center shrink-0 w-[16px] h-[16px] rounded-[3px] transition-colors"
                style={{
                  backgroundColor: emailEnabled ? 'var(--brand)' : 'var(--bg-elements)',
                  border: `1px solid ${emailEnabled ? 'var(--brand)' : 'var(--border-default)'}`,
                }}
              >
                {emailEnabled && (
                  <CheckIcon size={12} className="text-white" aria-label="checked" />
                )}
              </span>
              <span
                className="font-[Inter] text-[14px]"
                style={{ color: 'var(--text-primary)' }}
              >
                Also deliver results to email
              </span>
            </label>
            {emailEnabled && (
              <Field label="EMAIL">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john.wick@gmail.com"
                  className="w-full h-[40px] rounded-[8px] px-[12px] font-[Inter] text-[14px] outline-none"
                  style={{
                    backgroundColor: 'var(--bg-elements)',
                    border: '1px solid var(--border-default)',
                    color: 'var(--text-primary)',
                  }}
                />
              </Field>
            )}
          </div>
        </div>

        {/* Footer — Cancel (tertiary) left, Save & schedule (outline) + Run once
            (primary) right. `postRun` hides Run once since the user already
            validated the result. */}
        <div className="flex items-center px-[16px] pb-[16px]">
          <Button variant="transparent" size="lg" onClick={onCancel}>
            Cancel
          </Button>
          <div className="flex-1" />
          <div className="flex items-center gap-[8px]">
            <Button variant="outline" size="lg" onClick={handleSave} disabled={!canSubmit}>
              Save &amp; schedule
            </Button>
            {!postRun && (
              <Button
                variant="primary"
                size="lg"
                onClick={handleRun}
                disabled={!canSubmit}
              >
                Run once
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Internal helpers ────────────────────────────────────────────────

function Label({ text }: { text: string }) {
  return (
    <span
      className="font-[Bricolage_Grotesque] font-medium text-[10px] uppercase tracking-[1.5px]"
      style={{ color: 'var(--text-secondary)' }}
    >
      {text}
    </span>
  )
}

function Field({
  label,
  helper,
  children,
}: {
  label: string
  helper?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-[6px]">
      <Label text={label} />
      {children}
      {helper && (
        <p
          className="font-[Inter] text-[12px]"
          style={{ color: 'var(--text-secondary)' }}
        >
          {helper}
        </p>
      )}
    </div>
  )
}

function DropdownPanel({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="absolute left-0 right-0 top-[44px] z-10 max-h-[240px] overflow-y-auto rounded-[8px] py-[4px]"
      style={{
        backgroundColor: 'var(--bg-elements)',
        border: '1px solid var(--border-subtle)',
        boxShadow: '0px 4px 16px rgba(0,0,0,0.08)',
      }}
    >
      {children}
    </div>
  )
}

function DropdownItem({
  selected,
  onClick,
  children,
}: {
  selected: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full text-left px-[12px] py-[8px] font-[Inter] text-[14px]"
      style={{
        backgroundColor: selected ? 'var(--bg-tint-light)' : 'transparent',
        color: selected ? 'var(--brand)' : 'var(--text-primary)',
      }}
    >
      {children}
    </button>
  )
}
