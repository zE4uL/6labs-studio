/**
 * ActionFeedbackBar — Action row below Oracle AI responses.
 * Contains: Copy button | Credits badge | Like/Dislike toggle.
 *
 * @figmaComponent  Action and Feedback
 * @figmaNode       6470:1506026
 * @figmaFile       i9fxQ6pXrgRITEzopoXpWL
 * @figmaUrl        https://www.figma.com/design/i9fxQ6pXrgRITEzopoXpWL/6labs?node-id=6470-1506026
 */

import { CopyIcon } from '../icons/CopyIcon'
import { CreditsBadge } from '../atoms/CreditsBadge'
import { LikeDislike } from '../atoms/LikeDislike'

type FeedbackValue = 'like' | 'dislike' | null

interface ActionFeedbackBarProps {
  creditsText: string
  feedbackValue: FeedbackValue
  onFeedbackChange: (value: FeedbackValue) => void
  onCopy: () => void
  className?: string
}

export function ActionFeedbackBar({
  creditsText,
  feedbackValue,
  onFeedbackChange,
  onCopy,
  className,
}: ActionFeedbackBarProps) {
  return (
    <div
      className={[
        'flex items-center justify-between pt-xxs w-full',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {/* Left: Copy + Credits */}
      <div className="flex gap-xs items-center">
        <button
          type="button"
          onClick={onCopy}
          className="oracle-copy-btn"
          aria-label="Copy response"
        >
          <CopyIcon size={16} />
        </button>
        <CreditsBadge text={creditsText} />
      </div>

      {/* Right: Like / Dislike */}
      <LikeDislike value={feedbackValue} onChange={onFeedbackChange} />
    </div>
  )
}
