import type { Meta, StoryObj } from '@storybook/react-vite'
import { InfoItem } from './InfoItem'

const meta = {
  title: 'Atoms/InfoItem',
  component: InfoItem,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    value: { control: 'text' },
  },
  parameters: {
    backgrounds: { default: 'Page (Dark)' },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 200, padding: 24 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof InfoItem>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Duration',
    value: '14m 32s',
  },
}

export const WithIcon: Story = {
  args: {
    label: 'Resolution',
    value: '1920 x 1080',
    icon: (
      <svg width={14} height={14} viewBox="0 0 14 14" fill="none">
        <rect x="1" y="2" width="12" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
        <path d="M5 13h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
  },
}
