import type { Meta, StoryObj } from '@storybook/react-vite'
import { PopupModal } from './PopupModal'

const meta = {
  title: 'Molecules/PopupModal',
  component: PopupModal,
  tags: ['autodocs'],
  parameters: {
    backgrounds: { default: 'Page (Dark)' },
    docs: {
      story: { inline: false, iframeHeight: 400 },
    },
  },
  argTypes: {
    isOpen: { control: 'boolean' },
    title: { control: 'text' },
    body: { control: 'text' },
    primaryLabel: { control: 'text' },
    secondaryLabel: { control: 'text' },
    size: { control: 'select', options: ['md', 'lg'] },
    primaryVariant: {
      control: 'select',
      options: ['primary', 'secondary', 'danger', 'outline', 'transparent'],
    },
  },
} satisfies Meta<typeof PopupModal>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    isOpen: true,
    title: 'Create New Session Group',
    body: 'Group related gameplay sessions together for batch analysis. You can add sessions to this group later.',
    primaryLabel: 'Create Group',
    secondaryLabel: 'Cancel',
    onClose: () => {},
    onConfirm: () => {},
    onCancel: () => {},
  },
}

export const Large: Story = {
  args: {
    isOpen: true,
    title: 'Export Analytics Report',
    body: 'This will generate a comprehensive report including session summaries, event timelines, and player behavior insights for all selected sessions.',
    primaryLabel: 'Export Report',
    secondaryLabel: 'Cancel',
    size: 'lg',
    onClose: () => {},
    onConfirm: () => {},
    onCancel: () => {},
  },
}

export const DangerConfirm: Story = {
  args: {
    isOpen: true,
    title: 'Delete Session Data',
    body: 'This action cannot be undone. All session recordings, events, and AI summaries for the selected sessions will be permanently removed.',
    primaryLabel: 'Delete Permanently',
    secondaryLabel: 'Keep Data',
    primaryVariant: 'danger',
    onClose: () => {},
    onConfirm: () => {},
    onCancel: () => {},
  },
}
