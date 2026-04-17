/**
 * BaristaSetupPage — 3-step setup flow that replaces the Oracle center while active.
 * Required before Barista can be used (but Oracle remains usable without it).
 *
 * Layout mirrors Figma (Department & Role → Focus Areas & Goals → Additional Context).
 *
 * States (matches Figma `State` variants):
 *  - default     : empty form
 *  - filled      : fields populated
 *  - final-setup : confirmation with persona summary + "Start Barista" CTA
 *
 * @figmaComponent  Barista/ Setup Page
 * @figmaNode       6072:138
 * @figmaFile       i9fxQ6pXrgRITEzopoXpWL
 * @figmaUrl        https://www.figma.com/design/i9fxQ6pXrgRITEzopoXpWL/6labs?node-id=6072-138
 */

import { useMemo, useRef, useState, useEffect, type ReactNode } from 'react'
import Button from '../ui/Button'
import { BaristaIcon } from '../icons/BaristaIcon'
import { BaristaColoredIcon } from '../icons/BaristaColoredIcon'
import { CheckIcon } from '../icons/CheckIcon'
import { MembersIcon } from '../icons/MembersIcon'
import { RadarIcon } from '../icons/RadarIcon'
import { FileDocIcon } from '../icons/FileDocIcon'
import { DropdownArrowIcon } from '../icons/DropdownArrowIcon'
import { BaristaSelectionPill } from '../atoms/BaristaSelectionPill'

export interface BaristaPersona {
  name: string
  department: string
  roles: string[]
  focusAreas: string[]
  additionalContext: string
}

export interface BaristaSetupPageProps {
  onCancel: () => void
  onConfirm: (persona: BaristaPersona) => void
  onGoToBarista?: () => void
  initialPersona?: Partial<BaristaPersona>
  className?: string
}

const DEPARTMENTS = [
  'Game Design',
  'Engineering',
  'Product',
  'Art',
  'Data Science',
  'Marketing',
  'LiveOps',
  'Research',
]

const ROLES_BY_DEPT: Record<string, string[]> = {
  'Game Design': [
    'Design Lead',
    'Game Designer',
    'Level Designer',
    'Character Designer',
    'UI/UX Designer',
    'Systems Designer',
  ],
  Engineering: [
    'Engineering Lead',
    'Gameplay Engineer',
    'Backend Engineer',
    'Tools Engineer',
    'Client Engineer',
  ],
  Product: ['Product Manager', 'Growth PM', 'Producer', 'Program Manager'],
  Art: ['Art Director', '3D Artist', 'Concept Artist', 'Animator', 'VFX Artist'],
  'Data Science': ['Data Scientist', 'Data Analyst', 'ML Engineer', 'Analytics Lead'],
  Marketing: ['Marketing Lead', 'UA Manager', 'Brand Manager', 'Community Manager'],
  LiveOps: ['LiveOps Lead', 'Events Manager', 'Economy Designer', 'Monetization Analyst'],
  Research: ['User Researcher', 'Insights Lead', 'Playtesting Analyst'],
}

const FOCUS_BY_DEPT: Record<string, string[]> = {
  'Game Design': [
    'Competitor Benchmarking',
    'Character / Champion Design',
    'New Mode Design',
    'Economy Design',
    'Meta Balance',
    'Level & Map Flow',
  ],
  Engineering: ['Performance', 'Crash Diagnosis', 'Matchmaking', 'Network Quality'],
  Product: ['Retention', 'Conversion', 'Session Length', 'Feature Adoption'],
  Art: ['Visual Style Trends', 'Asset Fidelity', 'Character Readability'],
  'Data Science': ['Player Behavior', 'Monetization Patterns', 'Churn Markers', 'Cohort Analysis'],
  Marketing: ['UA Creative Insights', 'Influencer Signal', 'Brand Mentions'],
  LiveOps: ['Event Performance', 'Store Conversion', 'Pricing Elasticity'],
  Research: ['Qualitative Themes', 'Playtest Patterns', 'Player Sentiment'],
}

const FALLBACK_FOCUS = ['Player Behavior', 'Monetization Patterns', 'Retention', 'Engagement']

export function BaristaSetupPage({
  onCancel,
  onConfirm,
  onGoToBarista,
  initialPersona,
  className = '',
}: BaristaSetupPageProps) {
  const [department, setDepartment] = useState(initialPersona?.department ?? '')
  const [roles, setRoles] = useState<string[]>(initialPersona?.roles ?? [])
  const [customRole, setCustomRole] = useState('')
  const [showCustomRoleInput, setShowCustomRoleInput] = useState(false)
  const [focusAreas, setFocusAreas] = useState<string[]>(initialPersona?.focusAreas ?? [])
  const [additionalContext, setAdditionalContext] = useState(
    initialPersona?.additionalContext ?? ''
  )
  const [confirmed, setConfirmed] = useState(false)

  const roleOptions = department ? ROLES_BY_DEPT[department] ?? [] : []
  const focusOptions = department
    ? FOCUS_BY_DEPT[department] ?? FALLBACK_FOCUS
    : FALLBACK_FOCUS

  useEffect(() => {
    // Reset role/focus when department changes to something that doesn't contain current
    if (!department) return
    setRoles((prev) => prev.filter((r) => (ROLES_BY_DEPT[department] ?? []).includes(r)))
    setFocusAreas((prev) =>
      prev.filter((f) => (FOCUS_BY_DEPT[department] ?? FALLBACK_FOCUS).includes(f))
    )
  }, [department])

  const toggle = (list: string[], value: string, set: (n: string[]) => void) => {
    if (list.includes(value)) set(list.filter((v) => v !== value))
    else set([...list, value])
  }

  const persona = useMemo<BaristaPersona>(
    () => ({
      name: '',
      department,
      roles: customRole.trim() ? [...roles, customRole.trim()] : roles,
      focusAreas,
      additionalContext,
    }),
    [department, roles, customRole, focusAreas, additionalContext]
  )

  const isReady = department !== '' && persona.roles.length > 0 && focusAreas.length > 0

  // Two-step commit: clicking "Confirm setup" only locally flips to the summary
  // view. The persona isn't committed to context until the user clicks
  // "Start Barista" on the summary — that's what keeps this overlay on screen.
  const handleConfirm = () => setConfirmed(true)
  const handleStartBarista = () => {
    onConfirm(persona)
    onGoToBarista?.()
  }

  // ─── Final Setup / Confirmation state ────────────────────────────────
  if (confirmed) {
    return (
      <div
        className={`flex flex-col w-full h-full overflow-y-auto ${className}`}
        style={{ backgroundColor: 'var(--bg-page)' }}
      >
        <SetupTopbar breadcrumb="Your Persona" onCancel={onCancel} cancelLabel="Edit" />
        <div className="flex flex-col items-center w-full px-[80px] pt-[40px] pb-[80px]">
          <div className="flex flex-col gap-[20px] w-full max-w-[1000px]">
            <div className="flex items-center gap-[12px]">
              <BaristaColoredIcon size={40} />
              <h1
                className="font-[Bricolage_Grotesque] font-semibold text-[28px] leading-[1.3]"
                style={{ color: 'var(--text-primary)' }}
              >
                Your Personal Assistant
              </h1>
            </div>
            <p
              className="font-[Inter] text-[14px] leading-[1.5]"
              style={{ color: 'var(--text-secondary)' }}
            >
              Barista uses this to tailor every insight, question, and suggestion to you.
            </p>

            <div
              className="flex items-center gap-[16px] rounded-[12px] p-[20px]"
              style={{
                backgroundColor: 'var(--bg-elements)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              <div
                className="flex items-center justify-center shrink-0 w-[40px] h-[40px] rounded-full"
                style={{ backgroundColor: 'var(--success-bg)', color: 'var(--success)' }}
              >
                <CheckIcon size={20} />
              </div>
              <div className="flex-1 min-w-0 flex flex-col gap-[2px]">
                <p
                  className="font-[Bricolage_Grotesque] font-semibold text-[14px]"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Persona saved — Barista is now personalized for you
                </p>
                <p
                  className="font-[Inter] text-[12px] leading-[1.5]"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Every insight, metric, and recommendation will be shaped by your profile. You
                  can update this anytime.
                </p>
              </div>
              <Button
                variant="blueish"
                size="md"
                onClick={handleStartBarista}
                rightIcon={
                  <span className="text-[16px] leading-none" aria-hidden>
                    +
                  </span>
                }
              >
                Start Barista
              </Button>
            </div>

            <SummaryCard icon={<MembersIcon size={20} />} title="Department & Role">
              <div
                className="flex items-center gap-[12px] rounded-[8px] px-[16px] py-[12px]"
                style={{ backgroundColor: 'var(--bg-tint-light)' }}
              >
                <span
                  className="flex items-center justify-center shrink-0 w-[32px] h-[32px] rounded-[8px]"
                  style={{
                    backgroundColor: 'var(--text-primary)',
                    color: '#FFFFFF',
                  }}
                  aria-hidden
                >
                  <svg width={18} height={18} viewBox="0 0 24 24" fill="none">
                    <path
                      d="M7 10h2v2H7zm2-2v2h2V8zm2 2v2h2v-2zm2 0h2v2h-2zm2 2v-2h2v2zM5 10h2v2H5zm-2 2v-2h2v2zm16-2v2h2v-2zM8 6h8c3.3 0 6 2.7 6 6s-2.7 6-6 6h-1l-2-2-2 2H8c-3.3 0-6-2.7-6-6s2.7-6 6-6z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                      fill="none"
                    />
                  </svg>
                </span>
                {department && (
                  <span
                    className="font-[Bricolage_Grotesque] font-semibold text-[14px]"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {department}
                  </span>
                )}
                <div className="flex items-center gap-[6px] flex-wrap">
                  {persona.roles.map((r) => (
                    <BaristaSelectionPill key={r} variant="added" label={r} />
                  ))}
                </div>
              </div>
            </SummaryCard>

            <SummaryCard icon={<RadarIcon size={20} />} title="Focus Areas & Goals">
              <div className="flex flex-col gap-[8px]">
                <p
                  className="font-[Bricolage_Grotesque] font-medium text-[10px] uppercase tracking-[1.5px]"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Focus Areas
                </p>
                <div className="flex items-center gap-[8px] flex-wrap">
                  {focusAreas.map((f) => (
                    <BaristaSelectionPill key={f} variant="added" label={f} />
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-[8px] mt-[12px]">
                <p
                  className="font-[Bricolage_Grotesque] font-medium text-[10px] uppercase tracking-[1.5px]"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Metrics
                </p>
                <p
                  className="font-[Inter] text-[14px]"
                  style={{ color: 'var(--text-placeholder)' }}
                >
                  No metrics selected
                </p>
              </div>
            </SummaryCard>

            <SummaryCard icon={<FileDocIcon size={20} />} title="Additional Context">
              {additionalContext ? (
                <p
                  className="font-[Inter] text-[14px] leading-[1.5]"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {additionalContext}
                </p>
              ) : (
                <p
                  className="font-[Inter] text-[14px]"
                  style={{ color: 'var(--text-placeholder)' }}
                >
                  No additional context added
                </p>
              )}
            </SummaryCard>
          </div>
        </div>
      </div>
    )
  }

  // ─── Default / Filled form ────────────────────────────────────────────
  return (
    <div
      className={`flex flex-col w-full h-full overflow-y-auto ${className}`}
      style={{ backgroundColor: 'var(--bg-page)' }}
    >
      <SetupTopbar
        breadcrumb={department ? 'Your Persona' : undefined}
        onCancel={onCancel}
        cancelLabel="Cancel"
      />

      <div className="flex flex-col items-center w-full px-[80px] pt-[40px] pb-[120px]">
        <div className="flex flex-col gap-[20px] w-full max-w-[1000px]">
          {/* Title */}
          <div className="flex flex-col gap-[8px]">
            <h1
              className="font-[Bricolage_Grotesque] font-semibold text-[28px] leading-[1.3]"
              style={{ color: 'var(--text-primary)' }}
            >
              Setup Your Personal Assistant
            </h1>
            <p
              className="font-[Inter] text-[14px] leading-[1.5]"
              style={{ color: 'var(--text-secondary)' }}
            >
              Customize Barista to your style so every insight feels relevant, precise, and
              actionable.
            </p>
          </div>

          {/* Getting Started banner */}
          <div
            className="flex flex-col gap-[4px] rounded-[8px] px-[16px] py-[12px]"
            style={{
              backgroundColor: 'var(--notice-bg)',
              border: '1px solid var(--notice)',
              borderLeftWidth: '4px',
            }}
          >
            <p
              className="font-[Bricolage_Grotesque] font-semibold text-[14px]"
              style={{ color: 'var(--notice)' }}
            >
              Getting Started
            </p>
            <p
              className="font-[Inter] text-[14px] leading-[1.5]"
              style={{ color: 'var(--text-secondary)' }}
            >
              Barista is your personal agent. It queries Oracle through your role&apos;s lens,
              filters what matters, and delivers insights automatically.
            </p>
          </div>

          {/* Department & Role */}
          <SetupCard
            icon={<MembersIcon size={20} />}
            title="Department & Role"
            subtitle="Your department shapes the kind of insights Barista surfaces. Your role helps it calibrate depth and vocabulary."
          >
            <FieldLabel label="What department do you work in?" />
            <DepartmentDropdown
              value={department}
              options={DEPARTMENTS}
              onChange={setDepartment}
            />

            {department && (
              <>
                <FieldLabel label="What's your role?" />
                <div className="flex flex-wrap gap-[8px]">
                  {roleOptions.map((r) => (
                    <BaristaSelectionPill
                      key={r}
                      variant={roles.includes(r) ? 'added' : 'default'}
                      label={r}
                      onClick={() => toggle(roles, r, setRoles)}
                    />
                  ))}
                  {!showCustomRoleInput && (
                    <BaristaSelectionPill
                      variant="custom"
                      onClick={() => setShowCustomRoleInput(true)}
                    />
                  )}
                </div>
                <p
                  className="font-[Inter] text-[12px] leading-[1.5]"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  This helps Barista adjust its vocabulary and level of detail.
                </p>
                {showCustomRoleInput && (
                  <div className="flex flex-col gap-[6px]">
                    <FieldLabel label="Custom role (optional)" size="sm" />
                    <input
                      value={customRole}
                      onChange={(e) => setCustomRole(e.target.value)}
                      placeholder="e.g. Design Lead, Economy Designer, Level Designer"
                      className="w-full h-[40px] rounded-[6px] px-[12px] font-[Inter] text-[14px] outline-none"
                      style={{
                        backgroundColor: 'var(--bg-elements)',
                        border: '1px solid var(--border-default)',
                        color: 'var(--text-primary)',
                      }}
                    />
                  </div>
                )}
              </>
            )}
          </SetupCard>

          {/* Focus Areas & Goals */}
          <SetupCard
            icon={<RadarIcon size={20} />}
            title="Focus Areas & Goals"
            subtitle="Select what you care about most — Barista will prioritize these in every insight."
          >
            {department && (
              <div
                className="inline-flex items-center gap-[4px] px-[10px] py-[4px] rounded-full self-start"
                style={{
                  backgroundColor: 'var(--purple-tint-light)',
                  border: '1px solid var(--purple-tint-dark)',
                }}
              >
                <p
                  className="font-[Bricolage_Grotesque] font-medium text-[10px] uppercase tracking-[1.5px]"
                  style={{ color: 'var(--purple)' }}
                >
                  Tailored for {department}
                </p>
              </div>
            )}
            <div className="flex items-center justify-between">
              <FieldLabel label="What are you focused on?" />
              <p
                className="font-[Inter] text-[12px]"
                style={{ color: 'var(--text-tertiary)' }}
              >
                select all that apply
              </p>
            </div>
            <div className="flex flex-wrap gap-[8px]">
              {focusOptions.map((f) => (
                <BaristaSelectionPill
                  key={f}
                  variant={focusAreas.includes(f) ? 'added' : 'default'}
                  label={f}
                  onClick={() => toggle(focusAreas, f, setFocusAreas)}
                />
              ))}
            </div>
          </SetupCard>

          {/* Additional Context */}
          <SetupCard
            icon={<FileDocIcon size={20} />}
            title="Additional Context"
            subtitle="Anything else Barista should know? Current projects, blockers, priorities — optional, but helps."
          >
            <textarea
              value={additionalContext}
              onChange={(e) => setAdditionalContext(e.target.value)}
              placeholder="e.g. Currently scoping the S4 economy rework; main goal is reducing mid-match quits in ranked."
              rows={5}
              className="w-full resize-none rounded-[6px] p-[12px] font-[Inter] text-[14px] leading-[1.5] outline-none"
              style={{
                backgroundColor: 'var(--bg-elements)',
                border: '1px solid var(--border-default)',
                color: 'var(--text-primary)',
              }}
            />
          </SetupCard>

          {/* Action */}
          <div className="flex items-center justify-end gap-[8px]">
            <Button variant="outline" size="md" onClick={onCancel}>
              Cancel
            </Button>
            <Button
              variant="blueish"
              size="md"
              disabled={!isReady}
              onClick={handleConfirm}
              rightIcon={<DropdownArrowIcon size={16} className="-rotate-90" />}
            >
              Confirm setup
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ──────────────────────────────────────────────────────────────────────
// Internal helpers
// ──────────────────────────────────────────────────────────────────────

function SetupTopbar({
  breadcrumb,
  onCancel,
  cancelLabel,
}: {
  breadcrumb?: string
  onCancel: () => void
  cancelLabel: string
}) {
  return (
    <div
      className="flex items-center w-full h-[56px] px-[20px] shrink-0"
      style={{
        backgroundColor: 'var(--bg-elements)',
        borderBottom: '1px solid var(--border-subtle)',
      }}
    >
      <div className="flex items-center gap-[8px] flex-1 min-w-0">
        <div
          className="flex items-center justify-center w-[24px] h-[24px] rounded-[6px]"
          style={{ backgroundColor: 'var(--purple-tint-light)', color: 'var(--purple)' }}
        >
          <BaristaIcon size={16} />
        </div>
        <p
          className="font-[Bricolage_Grotesque] font-semibold text-[14px]"
          style={{ color: 'var(--text-primary)' }}
        >
          Barista
        </p>
        {breadcrumb && (
          <>
            <span
              className="font-[Inter] text-[12px]"
              style={{ color: 'var(--text-tertiary)' }}
            >
              ›
            </span>
            <p
              className="font-[Inter] text-[14px]"
              style={{ color: 'var(--text-secondary)' }}
            >
              {breadcrumb}
            </p>
          </>
        )}
      </div>
      <Button variant="outline" size="md" onClick={onCancel}>
        {cancelLabel}
      </Button>
    </div>
  )
}

function SetupCard({
  icon,
  title,
  subtitle,
  children,
}: {
  icon: ReactNode
  title: string
  subtitle: string
  children: ReactNode
}) {
  return (
    <section
      className="flex flex-col gap-[12px] rounded-[12px] p-[20px]"
      style={{
        backgroundColor: 'var(--bg-elements)',
        border: '1px solid var(--border-subtle)',
      }}
    >
      <header className="flex items-center gap-[8px]">
        <span
          className="flex items-center justify-center shrink-0 w-[28px] h-[28px] rounded-[6px]"
          style={{ backgroundColor: 'var(--bg-tint-light)', color: 'var(--brand)' }}
        >
          {icon}
        </span>
        <p
          className="font-[Bricolage_Grotesque] font-semibold text-[16px] leading-[1.3]"
          style={{ color: 'var(--text-primary)' }}
        >
          {title}
        </p>
      </header>
      <p
        className="font-[Inter] text-[12px] leading-[1.5] pb-[4px]"
        style={{ color: 'var(--text-secondary)' }}
      >
        {subtitle}
      </p>
      <div
        className="h-[1px] w-full"
        style={{ backgroundColor: 'var(--border-subtle)' }}
      />
      <div className="flex flex-col gap-[10px]">{children}</div>
    </section>
  )
}

function SummaryCard({
  icon,
  title,
  children,
}: {
  icon: ReactNode
  title: string
  children: ReactNode
}) {
  return (
    <section
      className="flex flex-col gap-[12px] rounded-[12px] p-[20px]"
      style={{
        backgroundColor: 'var(--bg-elements)',
        border: '1px solid var(--border-subtle)',
      }}
    >
      <header className="flex items-center gap-[8px]">
        <span
          className="flex items-center justify-center shrink-0 w-[28px] h-[28px] rounded-[6px]"
          style={{ backgroundColor: 'var(--bg-tint-light)', color: 'var(--brand)' }}
        >
          {icon}
        </span>
        <p
          className="font-[Bricolage_Grotesque] font-semibold text-[16px] leading-[1.3]"
          style={{ color: 'var(--text-primary)' }}
        >
          {title}
        </p>
      </header>
      <div
        className="h-[1px] w-full"
        style={{ backgroundColor: 'var(--border-subtle)' }}
      />
      <div>{children}</div>
    </section>
  )
}

function FieldLabel({ label, size = 'md' }: { label: string; size?: 'md' | 'sm' }) {
  return (
    <label
      className="font-[Inter] font-medium"
      style={{
        color: 'var(--text-primary)',
        fontSize: size === 'sm' ? 12 : 14,
      }}
    >
      {label}
    </label>
  )
}

function DepartmentDropdown({
  value,
  options,
  onChange,
}: {
  value: string
  options: string[]
  onChange: (v: string) => void
}) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false)
    }
    if (open) window.addEventListener('mousedown', handler)
    return () => window.removeEventListener('mousedown', handler)
  }, [open])

  return (
    <div ref={rootRef} className="relative w-full">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full h-[40px] flex items-center justify-between px-[12px] rounded-[6px] font-[Inter] text-[14px] text-left transition-colors"
        style={{
          backgroundColor: 'var(--bg-elements)',
          border: `1px solid ${open ? 'var(--border-focus)' : 'var(--border-default)'}`,
          color: value ? 'var(--text-primary)' : 'var(--text-placeholder)',
        }}
      >
        <span>{value || 'Select your department'}</span>
        <DropdownArrowIcon size={16} className={open ? 'rotate-180' : ''} />
      </button>
      {open && (
        <div
          className="absolute left-0 right-0 top-[44px] z-10 max-h-[240px] overflow-y-auto rounded-[8px] py-[4px]"
          style={{
            backgroundColor: 'var(--bg-elements)',
            border: '1px solid var(--border-subtle)',
            boxShadow: 'var(--shadow-normal)',
          }}
        >
          {options.map((opt) => {
            const selected = opt === value
            return (
              <button
                key={opt}
                type="button"
                onClick={() => {
                  onChange(opt)
                  setOpen(false)
                }}
                className="w-full flex items-center justify-between px-[12px] py-[8px] font-[Inter] text-[14px] text-left"
                style={{
                  backgroundColor: selected ? 'var(--bg-tint-light)' : 'transparent',
                  color: selected ? 'var(--brand)' : 'var(--text-primary)',
                }}
              >
                <span>{opt}</span>
                {selected && <CheckIcon size={16} />}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
