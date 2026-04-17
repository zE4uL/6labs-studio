import type { Meta, StoryObj } from '@storybook/react-vite'
import { ConnectorDetailView } from './ConnectorDetailView'

const meta = {
  title: 'Organisms/ConnectorDetailView',
  component: ConnectorDetailView,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 800, margin: '0 auto', padding: 40 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ConnectorDetailView>

export default meta
type Story = StoryObj<typeof meta>

/** AppsFlyer connector detail page with all sections populated. */
export const Default: Story = {
  args: {
    connector: {
      id: 'appsflyer',
      icon: (
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <rect width="40" height="40" rx="8" fill="#C20568" fillOpacity="0.12" />
          <text x="20" y="24" textAnchor="middle" fill="#C20568" fontSize="14" fontWeight="bold">AF</text>
        </svg>
      ),
      name: 'AppsFlyer',
      tags: [
        { label: 'MCP', variant: 'neutral' },
        { label: 'UA Observer', variant: 'brand' },
      ],
      iconTint: 'rgba(194, 5, 104, 0.07)',
      about:
        'AppsFlyer is the leading mobile attribution and marketing analytics platform. By connecting AppsFlyer to 6labs, the UA Observer agent gains direct access to your attribution data, campaign performance metrics, and install validation signals.',
      benefits: [
        'Detect ad fraud with video-level evidence from actual gameplay sessions',
        'Cross-reference attribution data with real player behavior patterns',
        'Protect ad spend by identifying low-quality traffic sources automatically',
        'Get automated fraud reports pushed to your preferred channels',
      ],
      steps: [
        '6labs connects to AppsFlyer via MCP (Model Context Protocol)',
        "No API keys needed — authenticate directly through AppsFlyer's MCP server",
        'Your apps are detected automatically after authentication',
        'Configure data pull frequency to match your reporting cadence',
      ],
    },
  },
}
