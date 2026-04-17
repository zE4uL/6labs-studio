import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { FeedbackSubmittedDialog } from './FeedbackSubmittedDialog'
import Button from '../ui/Button'

const meta = {
  title: 'Molecules/FeedbackSubmittedDialog',
  component: FeedbackSubmittedDialog,
  tags: ['autodocs'],
} satisfies Meta<typeof FeedbackSubmittedDialog>

export default meta
type Story = StoryObj<typeof meta>

export const Open: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    autoDismissMs: 0,
  },
}

export const Interactive: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <>
        <Button variant="primary" size="md" onClick={() => setOpen(true)}>
          Show Success
        </Button>
        <FeedbackSubmittedDialog
          isOpen={open}
          onClose={() => setOpen(false)}
        />
      </>
    )
  },
}
