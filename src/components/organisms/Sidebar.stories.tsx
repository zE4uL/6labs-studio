import type { Meta, StoryObj } from '@storybook/react-vite'
import { Sidebar } from './Sidebar'

const meta = {
  title: 'Organisms/Sidebar',
  component: Sidebar,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ height: 700, display: 'flex' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Sidebar>

export default meta
type Story = StoryObj<typeof meta>

/** Expanded sidebar (280px) with default nav state. */
export const Expanded: Story = {
  args: {
    collapsed: false,
    activeNav: 'home',
  },
}

/** Collapsed sidebar (60px icon-only). */
export const Collapsed: Story = {
  args: {
    collapsed: true,
    activeNav: 'radiologist',
  },
}
