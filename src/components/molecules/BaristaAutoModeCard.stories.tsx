import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { BaristaAutoModeCard } from './BaristaAutoModeCard'

const meta = {
  title: 'Molecules/BaristaAutoModeCard',
  component: BaristaAutoModeCard,
  tags: ['autodocs'],
  argTypes: {
    active: { control: 'boolean' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 320, border: '1px solid #e6e7ea', borderRadius: 12 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof BaristaAutoModeCard>
export default meta
type Story = StoryObj<typeof meta>

export const Off: Story = { args: { active: false, onChange: () => {} } }
export const On: Story = { args: { active: true, onChange: () => {} } }

export const Interactive: Story = {
  args: { active: false, onChange: () => {} },
  render: () => {
    const [on, setOn] = useState(false)
    return <BaristaAutoModeCard active={on} onChange={setOn} />
  },
}
