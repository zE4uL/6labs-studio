import type { Meta, StoryObj } from '@storybook/react-vite'
import { AgentTabItem } from './AgentTabItem'

const MockIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path
      d="M10 3L17 7V13L10 17L3 13V7L10 3Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </svg>
)

const meta = {
  title: 'Molecules/AgentTabItem',
  component: AgentTabItem,
  tags: ['autodocs'],
  parameters: {
    backgrounds: { default: 'Page (Dark)' },
  },
  argTypes: {
    label: { control: 'text' },
    state: {
      control: 'select',
      options: ['active', 'default', 'hover'],
    },
    active: { control: 'boolean' },
  },
} satisfies Meta<typeof AgentTabItem>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Oracle',
    icon: <MockIcon />,
    state: 'default',
  },
}

export const Active: Story = {
  args: {
    label: 'Oracle',
    icon: <MockIcon />,
    state: 'active',
  },
}

export const Hover: Story = {
  args: {
    label: 'Oracle',
    icon: <MockIcon />,
    state: 'hover',
  },
}

export const AllStates: Story = {
  render: () => (
    <div className="flex gap-xs items-center">
      <AgentTabItem label="Oracle" icon={<MockIcon />} state="active" />
      <AgentTabItem label="Radiologist" icon={<MockIcon />} state="default" />
      <AgentTabItem label="Barista" icon={<MockIcon />} state="hover" />
    </div>
  ),
}
