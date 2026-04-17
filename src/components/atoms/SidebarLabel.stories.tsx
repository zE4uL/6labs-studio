import type { Meta, StoryObj } from '@storybook/react-vite'
import { SidebarLabel } from './SidebarLabel'

const meta = {
  title: 'Atoms/SidebarLabel',
  component: SidebarLabel,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    variant: { control: 'select', options: ['default', 'outlined', 'muted', 'subtle-focus'] },
  },
  parameters: {
    backgrounds: { default: 'Page (Dark)' },
  },
} satisfies Meta<typeof SidebarLabel>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: { label: 'NEW', variant: 'default' },
}

export const Outlined: Story = {
  args: { label: 'BETA', variant: 'outlined' },
}

export const Muted: Story = {
  args: { label: 'SOON', variant: 'muted' },
}

export const SubtleFocus: Story = {
  args: { label: 'PRO', variant: 'subtle-focus' },
}

export const AllVariants: Story = {
  name: 'All Variants',
  render: () => (
    <div style={{ display: 'flex', gap: 12, alignItems: 'center', padding: 16 }}>
      <SidebarLabel label="NEW" variant="default" />
      <SidebarLabel label="BETA" variant="outlined" />
      <SidebarLabel label="SOON" variant="muted" />
      <SidebarLabel label="PRO" variant="subtle-focus" />
    </div>
  ),
}
