/**
 * BaristaPersonalizeView — Personalize tab body on the dedicated Barista page.
 * Renders the captured persona as a read-only summary with an "Edit persona" CTA
 * that re-enters the setup flow. Shown only after setup is complete.
 *
 * Source: Barista persona state from `useBarista()`.
 */

import type { BaristaPersona } from './BaristaSetupPage'
import Button from '../ui/Button'
import { BaristaColoredIcon } from '../icons/BaristaColoredIcon'
import { EditIcon } from '../icons/EditIcon'
import { CheckIcon } from '../icons/CheckIcon'

export interface BaristaPersonalizeViewProps {
  persona: BaristaPersona
  onEdit: () => void
  className?: string
}

export function BaristaPersonalizeView({
  persona,
  onEdit,
  className = '',
}: BaristaPersonalizeViewProps) {
  const summary = buildSummary(persona)

  return (
    <div
      className={`flex flex-col items-center w-full px-[32px] py-[48px] ${className}`}
    >
      <div className="flex flex-col gap-[32px] w-full max-w-[720px]">
        {/* Header */}
        <div className="flex items-start gap-[16px] w-full">
          <BaristaColoredIcon size={48} />
          <div className="flex-1 min-w-0 flex flex-col gap-[4px]">
            <p
              className="font-[Bricolage_Grotesque] font-semibold text-[22px] leading-[1.3]"
              style={{ color: 'var(--text-primary)' }}
            >
              Barista is set up
            </p>
            <p
              className="font-[Inter] text-[14px] leading-[1.5]"
              style={{ color: 'var(--text-secondary)' }}
            >
              {summary}
            </p>
          </div>
          <Button
            variant="secondary"
            size="md"
            leftIcon={<EditIcon size={16} />}
            onClick={onEdit}
          >
            Edit persona
          </Button>
        </div>

        {/* Completion sections */}
        <div
          className="flex flex-col w-full rounded-[12px] overflow-hidden"
          style={{
            backgroundColor: 'var(--bg-elements)',
            border: '1px solid var(--border-subtle)',
          }}
        >
          <SectionRow
            label="Department"
            value={persona.department || '—'}
          />
          <SectionRow
            label="Roles"
            value={persona.roles.length > 0 ? persona.roles.join(', ') : '—'}
          />
          <SectionRow
            label="Focus areas"
            value={
              persona.focusAreas.length > 0 ? persona.focusAreas.join(', ') : '—'
            }
          />
          <SectionRow
            label="Additional context"
            value={persona.additionalContext || '—'}
            multiline
            last
          />
        </div>
      </div>
    </div>
  )
}

function SectionRow({
  label,
  value,
  multiline = false,
  last = false,
}: {
  label: string
  value: string
  multiline?: boolean
  last?: boolean
}) {
  return (
    <div
      className="flex items-start gap-[24px] w-full px-[20px] py-[16px]"
      style={{
        borderBottom: last ? 'none' : '1px solid var(--border-subtle)',
      }}
    >
      <div className="flex items-center gap-[8px] w-[160px] shrink-0 pt-[2px]">
        <CheckIcon size={12} className="text-brand" />
        <p
          className="font-[Bricolage_Grotesque] font-medium text-[12px] uppercase tracking-[1.5px]"
          style={{ color: 'var(--text-secondary)' }}
        >
          {label}
        </p>
      </div>
      <p
        className={`flex-1 min-w-0 font-[Inter] text-[14px] leading-[1.5] ${
          multiline ? 'whitespace-pre-wrap' : ''
        }`}
        style={{ color: 'var(--text-primary)' }}
      >
        {value}
      </p>
    </div>
  )
}

function buildSummary(persona: BaristaPersona): string {
  const role = persona.roles[0] || 'team member'
  const dept = persona.department || 'your team'
  const focus = persona.focusAreas.slice(0, 2).join(' and ').toLowerCase()
  return focus
    ? `Tailored for a ${dept} ${role.toLowerCase()} focused on ${focus}.`
    : `Tailored for a ${dept} ${role.toLowerCase()}.`
}
