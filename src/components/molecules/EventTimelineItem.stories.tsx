import type { Meta, StoryObj } from '@storybook/react-vite'
import { EventTimelineItem } from './EventTimelineItem'

const MockEventIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke="#686E81" strokeWidth="1.5" />
    <path d="M12 7V12L15 15" stroke="#686E81" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

const meta = {
  title: 'Molecules/EventTimelineItem',
  component: EventTimelineItem,
  tags: ['autodocs'],
  parameters: {
    backgrounds: { default: 'Page (Dark)' },
  },
  argTypes: {
    type: {
      control: 'select',
      options: [
        'kill', 'death', 'winner', 'loading-error', 'customization',
        'match-start', 'loot', 'combat', 'vehicle', 'air-drop',
        'purchased', 'shop-open', 'frustration', 'quit', 'achievement', 'error',
      ],
    },
    timestamp: { control: 'text' },
    description: { control: 'text' },
    showChevron: { control: 'boolean' },
    selected: { control: 'boolean' },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 420 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof EventTimelineItem>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    type: 'kill',
    timestamp: '03:24',
    description: 'Player eliminated opponent with headshot from 120m using a bolt-action sniper.',
    icon: <MockEventIcon />,
  },
}

export const Selected: Story = {
  args: {
    type: 'winner',
    timestamp: '22:15',
    description: 'Victory Royale achieved with 7 eliminations. Final circle clutch with shotgun swap.',
    icon: <MockEventIcon />,
    selected: true,
  },
}

export const WithChevron: Story = {
  args: {
    type: 'loot',
    timestamp: '08:42',
    description: 'Legendary chest opened — gold assault rifle and shield potions acquired.',
    icon: <MockEventIcon />,
    showChevron: true,
  },
}

export const AllTypes: Story = {
  render: () => (
    <div className="flex flex-col">
      <EventTimelineItem
        type="match-start"
        timestamp="00:00"
        description="Match started — Battle Royale, 100 players."
        icon={<MockEventIcon />}
      />
      <EventTimelineItem
        type="kill"
        timestamp="03:24"
        description="Player eliminated opponent with headshot from 120m."
        icon={<MockEventIcon />}
      />
      <EventTimelineItem
        type="death"
        timestamp="05:10"
        description="Player was eliminated by storm damage."
        icon={<MockEventIcon />}
      />
      <EventTimelineItem
        type="loot"
        timestamp="08:42"
        description="Legendary chest opened — gold assault rifle acquired."
        icon={<MockEventIcon />}
        showChevron
      />
      <EventTimelineItem
        type="frustration"
        timestamp="12:30"
        description="Rage quit detected — rapid input followed by disconnect."
        icon={<MockEventIcon />}
        selected
      />
      <EventTimelineItem
        type="winner"
        timestamp="22:15"
        description="Victory Royale with 7 eliminations."
        icon={<MockEventIcon />}
      />
    </div>
  ),
}
