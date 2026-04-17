/**
 * FilterDialog Demo — shows a button to open the dialog.
 * The dialog opens as a proper overlay (portal) but with a close handler
 * so it doesn't trap the user.
 */
import { useState } from 'react'
import { FilterDialog } from './FilterDialog'
import Button from '../ui/Button'

export function FilterDialogDemo() {
  const [open, setOpen] = useState(false)

  return (
    <div className="flex flex-col gap-s items-start w-full">
      <p className="font-body text-xs text-text-tertiary">
        Click to open the filter dialog overlay. Click backdrop or × to close.
      </p>
      <Button variant="outline" size="md" onClick={() => setOpen(true)}>
        Open Filters
      </Button>
      <FilterDialog isOpen={open} onClose={() => setOpen(false)} />
    </div>
  )
}
