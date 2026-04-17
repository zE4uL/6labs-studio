import type { Meta, StoryObj } from '@storybook/react-vite'
import { ConnectorCard } from './ConnectorCard'
import { SlackIcon } from '../icons/connectors/SlackIcon'
import { JiraIcon } from '../icons/connectors/JiraIcon'
import { DiscordIcon } from '../icons/connectors/DiscordIcon'

const meta = {
  title: 'Molecules/ConnectorCard',
  component: ConnectorCard,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 300 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ConnectorCard>

export default meta
type Story = StoryObj<typeof meta>

export const Disconnected: Story = {
  args: {
    icon: <SlackIcon />,
    name: 'Slack',
    description: 'Connect Slack to receive real-time notifications and updates.',
  },
}

export const Connected: Story = {
  args: {
    icon: <JiraIcon />,
    name: 'Jira',
    description: 'Sync tasks and issues from your Jira workspace.',
    connected: true,
  },
}

export const CardGrid: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, maxWidth: 960 }}>
      <ConnectorCard icon={<SlackIcon />} name="Slack" description="Real-time notifications and updates." />
      <ConnectorCard icon={<JiraIcon />} name="Jira" description="Sync tasks and issues." connected />
      <ConnectorCard icon={<DiscordIcon />} name="Discord" description="Community alerts and game events." />
    </div>
  ),
}
