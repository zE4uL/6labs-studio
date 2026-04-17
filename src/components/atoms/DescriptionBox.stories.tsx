import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { DescriptionBox } from './DescriptionBox'

const meta = {
  title: 'Atoms/DescriptionBox',
  component: DescriptionBox,
  tags: ['autodocs'],
  argTypes: {
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    rows: { control: { type: 'number', min: 2, max: 10 } },
  },
  parameters: {
    backgrounds: { default: 'Page (Dark)' },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 400, padding: 24 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DescriptionBox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: 'Enter a description...',
    rows: 4,
  },
}

export const Filled: Story = {
  args: {
    value: 'This session captures a full competitive match including early loot phase, mid-game rotations, and final circle engagements.',
    rows: 4,
  },
}

export const Disabled: Story = {
  args: {
    value: 'This field is locked for editing.',
    disabled: true,
    rows: 4,
  },
}

export const AllStates: Story = {
  name: 'All States',
  render: () => {
    const [val, setVal] = useState('')
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <label style={{ fontSize: 12, color: '#94a3b8' }}>Default (empty)</label>
        <DescriptionBox placeholder="Enter a description..." rows={3} />

        <label style={{ fontSize: 12, color: '#94a3b8' }}>Filled</label>
        <DescriptionBox value="Session includes 3 combat events and 2 purchases." rows={3} readOnly />

        <label style={{ fontSize: 12, color: '#94a3b8' }}>Interactive (type to test focused)</label>
        <DescriptionBox
          value={val}
          onChange={(e) => setVal(e.target.value)}
          placeholder="Click to focus..."
          rows={3}
        />

        <label style={{ fontSize: 12, color: '#94a3b8' }}>Disabled</label>
        <DescriptionBox value="Locked content" disabled rows={3} />
      </div>
    )
  },
}
