import type { Meta, StoryObj } from '@storybook/react-vite'
import { BigQueryOnboardingModal } from './BigQueryOnboardingModal'

const meta = {
  title: 'Organisms/BigQueryOnboardingModal',
  component: BigQueryOnboardingModal,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof BigQueryOnboardingModal>
export default meta
type Story = StoryObj<typeof meta>

export const Idle: Story = {
  args: {
    isOpen: true,
    state: 'idle',
    onClose: () => {},
  },
}

export const Connecting: Story = {
  args: {
    isOpen: true,
    state: 'connecting',
    projectId: 'sixlabs-qa',
    fileName: 'sixlabs-qa-sa.json',
    onClose: () => {},
  },
}

export const Connected: Story = {
  args: {
    isOpen: true,
    state: 'success',
    projectId: 'sixlabs-qa',
    summary: {
      projectId: 'sixlabs-qa',
      tableCount: 24,
      verdict: 'YELLOW',
      verdictReason: '3 of 24 tables have missing column descriptions.',
    },
    onClose: () => {},
  },
}

export const Failed: Story = {
  args: {
    isOpen: true,
    state: 'failed',
    projectId: 'sixlabs-qa',
    fileName: 'sixlabs-qa-sa.json',
    errorReason:
      'Service account is missing the BigQuery Data Viewer role on this project.',
    onClose: () => {},
  },
}
