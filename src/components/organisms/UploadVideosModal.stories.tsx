import type { Meta, StoryObj } from '@storybook/react-vite'
import { UploadVideosModal } from './UploadVideosModal'

const meta = {
  title: 'Organisms/UploadVideosModal',
  component: UploadVideosModal,
  parameters: { layout: 'fullscreen' },
  args: {
    isOpen: true,
    existingNames: new Set<string>(),
    onClose: () => {},
    onConfirm: () => {},
    onSimulateImport: () => {},
  },
} satisfies Meta<typeof UploadVideosModal>

export default meta
type Story = StoryObj<typeof meta>

/** Empty state — drop/browse + batch tags. Switch to "Bulk via CLI" for the CLI path. */
export const Default: Story = {}
