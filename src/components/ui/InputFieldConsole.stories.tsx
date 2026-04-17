import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import InputFieldConsole from './InputFieldConsole'

const meta = {
  title: 'UI/InputFieldConsole',
  component: InputFieldConsole,
  tags: ['autodocs'],
  argTypes: {
    type: { control: 'select', options: ['default', 'mini'] },
    placeholder: { control: 'text' },
    rows: { control: { type: 'number', min: 1, max: 6 } },
  },
  parameters: {
    backgrounds: { default: 'Page (Dark)' },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 640, padding: 24 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof InputFieldConsole>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState('')
    return (
      <InputFieldConsole
        {...args}
        value={value}
        onChange={setValue}
        onSubmit={() => alert(`Submitted: ${value}`)}
      />
    )
  },
  args: {
    type: 'default',
    placeholder: 'Search for actions, objects and events in your game...',
    rows: 2,
  },
}

export const Mini: Story = {
  render: (args) => {
    const [value, setValue] = useState('')
    return (
      <InputFieldConsole
        {...args}
        value={value}
        onChange={setValue}
        onSubmit={() => alert(`Submitted: ${value}`)}
      />
    )
  },
  args: {
    type: 'mini',
    placeholder: 'Ask a follow-up question...',
  },
}

export const WithValue: Story = {
  render: (args) => {
    const [value, setValue] = useState('Show me all combat events from the last 24 hours')
    return (
      <InputFieldConsole
        {...args}
        value={value}
        onChange={setValue}
        onSubmit={() => alert(`Submitted: ${value}`)}
      />
    )
  },
  args: {
    type: 'default',
  },
}

export const Focused: Story = {
  render: (args) => {
    const [value, setValue] = useState('')
    return (
      <InputFieldConsole
        {...args}
        value={value}
        onChange={setValue}
        onSubmit={() => alert(`Submitted: ${value}`)}
      />
    )
  },
  args: {
    type: 'default',
    placeholder: 'Click here to see the focused state...',
  },
}
