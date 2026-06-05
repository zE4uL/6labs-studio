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

export const WritePermissionRejected: Story = {
  name: 'Failed · write permissions rejected',
  args: {
    isOpen: true,
    state: 'failed',
    projectId: 'sixlabs-admin-warehouse',
    fileName: 'sixlabs-admin-sa.json',
    progress: {
      step: 2,
      errorAtStep: 2,
      errorMessage:
        'This service account has write access to BigQuery. 6labs requires a read-only key (BigQuery Data Viewer). Re-export a read-only key and reconnect.',
    },
    onClose: () => {},
  },
}

export const ImportReview: Story = {
  name: 'Progress · review complete (tables need attention)',
  args: {
    isOpen: true,
    state: 'progress',
    projectId: 'sixlabs-qa',
    fileName: 'sixlabs-qa-sa.json',
    progress: { step: 4, problemTableCount: 3, totalTableCount: 24 },
    onClose: () => {},
  },
}

export const InvalidJson: Story = {
  name: 'Idle · selected JSON needs fixing',
  args: {
    isOpen: true,
    state: 'idle',
    initialError:
      'The selected JSON needs to be fixed — it isn’t a valid service-account key (no project_id found). Re-export the key from GCP and try again.',
    onClose: () => {},
  },
}
