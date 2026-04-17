import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import Toggle from './Toggle'

const meta = {
  title: 'UI/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  argTypes: {
    labelPosition: { control: 'select', options: ['left', 'right'] },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof Toggle>

export default meta
type Story = StoryObj<typeof meta>

export const Off: Story = {
  args: { checked: false, label: 'Notifications' },
}

export const On: Story = {
  args: { checked: true, label: 'Notifications' },
}

export const Disabled: Story = {
  args: { checked: false, label: 'Disabled', disabled: true },
}

export const LabelLeft: Story = {
  args: { checked: true, label: 'Dark mode', labelPosition: 'left' },
}

export const Interactive: Story = {
  render: () => {
    const [on, setOn] = useState(false)
    return <Toggle checked={on} onChange={() => setOn(!on)} label={on ? 'Enabled' : 'Disabled'} />
  },
}
