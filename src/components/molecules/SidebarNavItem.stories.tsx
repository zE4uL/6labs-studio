import type { Meta, StoryObj } from '@storybook/react-vite'
import { SidebarNavItem } from './SidebarNavItem'
import { HomeIcon } from '../icons/HomeIcon'
import { RadiologistIcon } from '../icons/RadiologistIcon'
import { SettingsIcon } from '../icons/SettingsIcon'
import { CoachIcon } from '../icons/CoachIcon'
import { OracleIcon } from '../icons/OracleIcon'

const meta = {
  title: 'Molecules/SidebarNavItem',
  component: SidebarNavItem,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    active: { control: 'boolean' },
    badge: { control: 'text' },
    badgeVariant: { control: 'select', options: ['default', 'outlined', 'muted'] },
    disabled: { control: 'boolean' },
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
} satisfies Meta<typeof SidebarNavItem>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Home',
    icon: <HomeIcon size={20} />,
  },
}

export const Active: Story = {
  args: {
    label: 'Radiologist',
    icon: <RadiologistIcon size={20} />,
    active: true,
  },
}

export const WithBadge: Story = {
  args: {
    label: 'Coach',
    icon: <CoachIcon size={20} />,
    badge: 'NEW',
    badgeVariant: 'default',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Settings',
    icon: <SettingsIcon size={20} />,
    disabled: true,
  },
}

export const Collapsed: Story = {
  args: {
    label: 'Oracle',
    icon: <OracleIcon size={20} />,
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

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <SidebarNavItem label="Home" icon={<HomeIcon size={20} />} />
      <SidebarNavItem label="Radiologist" icon={<RadiologistIcon size={20} />} active />
      <SidebarNavItem label="Coach" icon={<CoachIcon size={20} />} badge="NEW" />
      <SidebarNavItem label="Oracle" icon={<OracleIcon size={20} />} badge="BETA" badgeVariant="outlined" />
      <SidebarNavItem label="Settings" icon={<SettingsIcon size={20} />} disabled />
    </div>
  ),
}
