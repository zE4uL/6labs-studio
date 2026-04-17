/**
 * BaristaWelcomeSection — 315-wide welcome section rendered inside the Barista panel body.
 *
 * States:
 *  - onboarding    : Barista mark + "Meet Barista" + description + gradient "Let's set up" CTA
 *  - profile-ready : Barista mark + "Meet Barista" + Profile Ready pill + CTA copy + ProfileWidget
 *
 * @figmaComponent  Barista/ Welcome Section
 * @figmaNode       6075:59471
 * @figmaFile       i9fxQ6pXrgRITEzopoXpWL
 * @figmaUrl        https://www.figma.com/design/i9fxQ6pXrgRITEzopoXpWL/6labs?node-id=6075-59471
 */

import Button from '../ui/Button'
import { BaristaColoredIcon } from '../icons/BaristaColoredIcon'
import { BaristaIcon } from '../icons/BaristaIcon'
import { DropdownArrowIcon } from '../icons/DropdownArrowIcon'
import { BaristaProfileWidget } from './BaristaProfileWidget'

export type BaristaWelcomeSectionState = 'onboarding' | 'profile-ready'

export interface BaristaWelcomeSectionProps {
  state: BaristaWelcomeSectionState
  personaSummary?: string
  onSetup?: () => void
  onEditPersona?: () => void
  onDeletePersona?: () => void
  className?: string
}

export function BaristaWelcomeSection({
  state,
  personaSummary,
  onSetup,
  onEditPersona,
  onDeletePersona,
  className = '',
}: BaristaWelcomeSectionProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-[16px] w-full px-[24px] py-[24px] ${className}`}
    >
      <BaristaColoredIcon size={64} />
      <p
        className="w-full font-[Bricolage_Grotesque] font-medium text-[20px] leading-[1.5] text-center"
        style={{ color: 'var(--text-primary)' }}
      >
        Meet Barista
      </p>
      {state === 'onboarding' && (
        <>
          <p
            className="w-full font-[Inter] text-[14px] leading-[1.5] text-center"
            style={{ color: 'var(--text-secondary)' }}
          >
            Tell me about yourself and what you&apos;re investigating — I&apos;ll ask the right
            questions for you.
          </p>
          {onSetup && (
            <Button
              variant="blueish"
              size="md"
              pill
              onClick={onSetup}
              leftIcon={<BaristaIcon size={16} />}
              rightIcon={<DropdownArrowIcon size={16} className="-rotate-90" />}
            >
              Let&apos;s set up
            </Button>
          )}
        </>
      )}
      {state === 'profile-ready' && (
        <>
          <div
            className="inline-flex items-center gap-[4px] px-[12px] py-[4px] rounded-full"
            style={{
              backgroundColor: 'var(--purple-tint-light)',
              border: '1px solid var(--purple-tint-dark)',
            }}
          >
            <p
              className="font-[Bricolage_Grotesque] font-medium text-[10px] uppercase tracking-[1.5px]"
              style={{ color: 'var(--purple)' }}
            >
              Profile Ready
            </p>
          </div>
          <p
            className="w-full font-[Inter] text-[14px] leading-[1.5] text-center"
            style={{ color: 'var(--text-secondary)' }}
          >
            Hit <span style={{ color: 'var(--brand)' }}>Start Barista</span> when you&apos;re ready.
          </p>
          {personaSummary && (
            <BaristaProfileWidget
              summary={personaSummary}
              onEdit={onEditPersona}
              onDelete={onDeletePersona}
            />
          )}
        </>
      )}
    </div>
  )
}
