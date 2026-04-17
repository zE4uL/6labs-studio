/**
 * ShareFeedbackDialog — Feedback form for Oracle AI responses.
 * Composes PopupModal with filter tag options, text input, and info note.
 * Triggered when user clicks the dislike thumb on an AI response.
 *
 * @figmaComponent  Share Feedback Popup
 * @figmaNode       6470:1506231
 * @figmaFile       i9fxQ6pXrgRITEzopoXpWL
 * @figmaUrl        https://www.figma.com/design/i9fxQ6pXrgRITEzopoXpWL/6labs?node-id=6470-1506231
 */

import { useState } from 'react'
import { PopupModal } from './PopupModal'
import { FilterTag } from '../atoms/FilterTag'
import Input from '../ui/Input'

const FEEDBACK_OPTIONS = [
  'Incorrect data',
  'Wrong insight',
  'Not relevant',
  'Not detailed enough',
  'Wrong sessions linked',
  'Misunderstood query',
  'Other',
] as const

interface ShareFeedbackDialogProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: { tags: string[]; message: string }) => void
}

export function ShareFeedbackDialog({ isOpen, onClose, onSubmit }: ShareFeedbackDialogProps) {
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set())
  const [message, setMessage] = useState('')

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) => {
      const next = new Set(prev)
      if (next.has(tag)) next.delete(tag)
      else next.add(tag)
      return next
    })
  }

  const handleSubmit = () => {
    onSubmit({ tags: Array.from(selectedTags), message })
    setSelectedTags(new Set())
    setMessage('')
  }

  const handleClose = () => {
    setSelectedTags(new Set())
    setMessage('')
    onClose()
  }

  return (
    <PopupModal
      isOpen={isOpen}
      onClose={handleClose}
      title="Share Feedback"
      body="What didn't you like about this response?"
      primaryLabel="Submit feedback"
      secondaryLabel="Cancel"
      onConfirm={handleSubmit}
    >
      <div className="flex flex-col gap-m items-start w-full">
        {/* Filter tag options */}
        <div className="flex flex-wrap gap-s items-start w-full">
          {FEEDBACK_OPTIONS.map((option) => (
            <FilterTag
              key={option}
              label={option}
              selected={selectedTags.has(option)}
              onClick={() => handleTagToggle(option)}
            />
          ))}
        </div>

        {/* Text input */}
        <Input
          placeholder="Tell us what could be better..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        {/* Info note — Figma: notice border-left, teal tint bg */}
        <div
          className="flex flex-col gap-xxs items-center justify-center w-full py-s px-m rounded-xs overflow-hidden relative"
          style={{
            backgroundColor: 'rgba(103, 195, 187, 0.1)',
            border: '1px solid rgba(103, 195, 187, 0.3)',
          }}
        >
          <div
            className="absolute left-0 top-0 bottom-0 w-[4px]"
            style={{ backgroundColor: '#67C3BB' }}
          />
          <p className="font-body text-s font-normal leading-[1.5] text-text-secondary w-full">
            Your conversation will be included with your feedback to help improve 6Labs.
          </p>
        </div>
      </div>
    </PopupModal>
  )
}
