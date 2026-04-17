import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { LikeDislike } from './LikeDislike'

const meta = {
  title: 'Atoms/LikeDislike',
  component: LikeDislike,
  tags: ['autodocs'],
} satisfies Meta<typeof LikeDislike>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { value: null, onChange: () => {} },
}

export const Liked: Story = {
  args: { value: 'like', onChange: () => {} },
}

export const Disliked: Story = {
  args: { value: 'dislike', onChange: () => {} },
}

export const Interactive: Story = {
  render: () => {
    const [value, setValue] = useState<'like' | 'dislike' | null>(null)
    return <LikeDislike value={value} onChange={setValue} />
  },
}
