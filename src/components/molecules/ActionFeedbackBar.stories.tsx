import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { ActionFeedbackBar } from './ActionFeedbackBar'

const meta = {
  title: 'Molecules/ActionFeedbackBar',
  component: ActionFeedbackBar,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 720, padding: 20 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ActionFeedbackBar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    creditsText: '20 Credits Used',
    feedbackValue: null,
    onFeedbackChange: () => {},
    onCopy: () => console.log('copy'),
  },
}

export const Liked: Story = {
  args: {
    creditsText: '20 Credits Used',
    feedbackValue: 'like',
    onFeedbackChange: () => {},
    onCopy: () => {},
  },
}

export const Interactive: Story = {
  render: () => {
    const [feedback, setFeedback] = useState<'like' | 'dislike' | null>(null)
    return (
      <ActionFeedbackBar
        creditsText="20 Credits Used"
        feedbackValue={feedback}
        onFeedbackChange={setFeedback}
        onCopy={() => console.log('copied')}
      />
    )
  },
}
