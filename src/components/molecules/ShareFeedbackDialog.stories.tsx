import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { ShareFeedbackDialog } from './ShareFeedbackDialog'
import Button from '../ui/Button'

const meta = {
  title: 'Molecules/ShareFeedbackDialog',
  component: ShareFeedbackDialog,
  tags: ['autodocs'],
} satisfies Meta<typeof ShareFeedbackDialog>

export default meta
type Story = StoryObj<typeof meta>

export const Open: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    onSubmit: (data) => console.log('submit', data),
  },
}

export const Interactive: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <>
        <Button variant="primary" size="md" onClick={() => setOpen(true)}>
          Open Feedback
        </Button>
        <ShareFeedbackDialog
          isOpen={open}
          onClose={() => setOpen(false)}
          onSubmit={(data) => {
            console.log('submitted', data)
            setOpen(false)
          }}
        />
      </>
    )
  },
}
