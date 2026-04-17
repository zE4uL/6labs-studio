/**
 * SuggestionCard — Clickable prompt suggestion tile used on the Oracle agent page.
 * Anatomy: bulb icon (16px) + suggestion text (14px body).
 * Card height is fixed at 72px via parent grid-rows.
 *
 * @figmaComponent  Suggestion
 * @figmaPath       Other agents / Oracle Page / Section / Container / Suggestion
 * @figmaNode       6418:100907
 * @figmaFile       i9fxQ6pXrgRITEzopoXpWL
 * @figmaUrl        https://www.figma.com/design/i9fxQ6pXrgRITEzopoXpWL/6labs?node-id=6418-100907
 *
 * Source: 6labs/studio → src/components/molecules/SuggestionCard.tsx
 * Synced: 2026-04-05
 */

import { BulbIcon } from '../icons/BulbIcon'

interface SuggestionCardProps {
  /** Suggestion prompt text */
  text: string
  /** Click handler — typically fills the prompt input */
  onClick?: (text: string) => void
  className?: string
}

export function SuggestionCard({ text, onClick, className }: SuggestionCardProps) {
  return (
    <button
      type="button"
      onClick={() => onClick?.(text)}
      className={[
        'flex gap-xs items-center p-s rounded-xl',
        'bg-bg-elements border border-border-default',
        'text-left cursor-pointer self-stretch',
        'suggestion-card-hover',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {/* Bulb icon — 42px wrapper keeps icon vertically aligned */}
      <div className="flex gap-xxs items-center pt-xxxs shrink-0 h-[42px]">
        <BulbIcon size={16} className="text-text-secondary shrink-0" />
      </div>

      {/* Suggestion text — flex-col + justify-center vertically centers text in card */}
      <div className="flex flex-1 flex-col justify-center min-w-0 min-h-0">
        <p className="font-body text-s font-normal text-text-secondary leading-[1.5]">
          {text}
        </p>
      </div>
    </button>
  )
}
