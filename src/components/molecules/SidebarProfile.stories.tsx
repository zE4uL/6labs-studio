import type { Meta, StoryObj } from '@storybook/react-vite'
import { SidebarProfile } from './SidebarProfile'

const meta = {
  title: 'Molecules/SidebarProfile',
  component: SidebarProfile,
  tags: ['autodocs'],
  argTypes: {
    name: { control: 'text' },
    initials: { control: 'text' },
    language: { control: 'text' },
    collapsed: { control: 'boolean' },
  },
  parameters: {
    backgrounds: { default: 'Page (Dark)' },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 240, backgroundColor: 'var(--bg-elements)', padding: 8, borderRadius: 12 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SidebarProfile>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    name: 'Ziaul Haque',
    initials: 'ZH',
    language: 'EN',
  },
}

export const Collapsed: Story = {
  args: {
    name: 'Ziaul Haque',
    initials: 'ZH',
    language: 'EN',
    collapsed: true,
  },
  decorators: [
    (Story) => (
      <div style={{ width: 64, backgroundColor: 'var(--bg-elements)', padding: 8, borderRadius: 12 }}>
        <Story />
      </div>
    ),
  ],
}
