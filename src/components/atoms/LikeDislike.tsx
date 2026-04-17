/**
 * LikeDislike — Thumbs up/down exclusive toggle pair.
 * Clicking a thumb selects it (deselecting the other).
 * Clicking the dislike thumb also triggers the feedback popup.
 *
 * @figmaComponent  Like - Dislike
 * @figmaNode       6470:1506026
 * @figmaFile       i9fxQ6pXrgRITEzopoXpWL
 * @figmaUrl        https://www.figma.com/design/i9fxQ6pXrgRITEzopoXpWL/6labs?node-id=6470-1506026
 */

import { ThumbsUpIcon } from '../icons/ThumbsUpIcon'
import { ThumbsDownIcon } from '../icons/ThumbsDownIcon'

type FeedbackValue = 'like' | 'dislike' | null

interface LikeDislikeProps {
  value: FeedbackValue
  onChange: (value: FeedbackValue) => void
  className?: string
}

export function LikeDislike({ value, onChange, className }: LikeDislikeProps) {
  const handleLike = () => {
    onChange(value === 'like' ? null : 'like')
  }

  const handleDislike = () => {
    onChange(value === 'dislike' ? null : 'dislike')
  }

  return (
    <div
      className={['flex gap-xs items-start', className]
        .filter(Boolean)
        .join(' ')}
    >
      <button
        type="button"
        onClick={handleLike}
        className="like-dislike-btn"
        data-active={String(value === 'like')}
        aria-label="Like response"
        aria-pressed={value === 'like'}
      >
        <ThumbsUpIcon size={24} />
      </button>
      <button
        type="button"
        onClick={handleDislike}
        className="like-dislike-btn"
        data-active={String(value === 'dislike')}
        aria-label="Dislike response"
        aria-pressed={value === 'dislike'}
      >
        <ThumbsDownIcon size={24} />
      </button>
    </div>
  )
}
