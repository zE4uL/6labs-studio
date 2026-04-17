/**
 * PopupModal Demo — interactive demo with buttons to trigger different modal variations.
 */
import { useState } from 'react'
import { PopupModal } from './PopupModal'
import Button from '../ui/Button'

export function PopupModalDemo() {
  const [open, setOpen] = useState<string | null>(null)

  return (
    <div className="flex flex-col gap-s w-full">
      <p className="font-body text-xs text-text-tertiary">
        Click to open modal variations. Click backdrop or × to close.
      </p>
      <div className="flex flex-wrap gap-s">
        <Button variant="outline" size="md" onClick={() => setOpen('simple')}>Simple confirm</Button>
        <Button variant="outline" size="md" onClick={() => setOpen('body')}>With body text</Button>
        <Button variant="outline" size="md" onClick={() => setOpen('danger')}>Danger action</Button>
        <Button variant="outline" size="md" onClick={() => setOpen('wide')}>Wide (lg)</Button>
      </div>

      <PopupModal
        isOpen={open === 'simple'}
        onClose={() => setOpen(null)}
        title="Delete Connector"
        primaryLabel="Delete"
        primaryVariant="danger"
        secondaryLabel="Cancel"
      />
      <PopupModal
        isOpen={open === 'body'}
        onClose={() => setOpen(null)}
        title="Share Feedback"
        body="What didn't you like about this response?"
        primaryLabel="Submit feedback"
      />
      <PopupModal
        isOpen={open === 'danger'}
        onClose={() => setOpen(null)}
        title="Delete Session"
        body="This action cannot be undone. The session and all associated data will be permanently removed."
        primaryLabel="Delete session"
        primaryVariant="danger"
        secondaryLabel="Keep session"
      />
      <PopupModal
        isOpen={open === 'wide'}
        onClose={() => setOpen(null)}
        title="Schedule a task"
        size="lg"
        primaryLabel="Save task"
      />
    </div>
  )
}
