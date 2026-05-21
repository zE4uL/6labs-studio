import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { ActionMenuItem } from './ActionMenuItem'
import { PlusIcon } from '../icons/PlusIcon'
import { FileDocIcon } from '../icons/FileDocIcon'
import { ConnectorIcon } from '../icons/ConnectorIcon'
import { BlueStacksIcon } from '../icons/BlueStacksIcon'

const meta = {
  title: 'Atoms/ActionMenuItem',
  component: ActionMenuItem,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div
        style={{
          width: 280,
          padding: 8,
          background: 'var(--bg-elements)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 12,
          boxShadow: 'var(--shadow-normal)',
        }}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ActionMenuItem>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    leadingIcon: <FileDocIcon size={16} />,
    label: 'Attach PDF',
  },
}

export const WithChevron: Story = {
  args: {
    leadingIcon: <BlueStacksIcon size={16} />,
    label: 'Sources',
    trailing: 'chevron',
  },
}

export const WithCheckmark: Story = {
  args: {
    leadingIcon: <PlusIcon size={16} />,
    label: 'BlueStacks',
    trailing: 'checkmark',
    active: true,
  },
}

export const WithToggle: Story = {
  render: (args) => {
    const [on, setOn] = useState(false)
    return (
      <ActionMenuItem
        {...args}
        trailing="toggle"
        checked={on}
        onToggleChange={setOn}
      />
    )
  },
  args: {
    leadingIcon: <ConnectorIcon size={16} />,
    label: 'BigQuery',
    secondary: 'sixlabs-qa',
  },
}

export const Disabled: Story = {
  args: {
    leadingIcon: <ConnectorIcon size={16} />,
    label: 'Plugins',
    trailing: 'none',
    disabled: true,
  },
}
