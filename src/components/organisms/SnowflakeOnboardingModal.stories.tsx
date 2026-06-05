import type { Meta, StoryObj } from '@storybook/react-vite'
import { SnowflakeOnboardingModal } from './SnowflakeOnboardingModal'

const meta = {
  title: 'Organisms/SnowflakeOnboardingModal',
  component: SnowflakeOnboardingModal,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof SnowflakeOnboardingModal>
export default meta
type Story = StoryObj<typeof meta>

const details = {
  accountIdentifier: 'xy12345.us-east-1',
  username: 'BLUESTACKS_READONLY',
  warehouse: 'ANALYTICS_WH',
  database: 'GAME_TELEMETRY',
}

export const Step1Setup: Story = {
  name: 'Idle · Step 1 (key + SQL)',
  args: { isOpen: true, state: 'idle', initialStep: 1, onClose: () => {} },
}

export const Step2Details: Story = {
  name: 'Idle · Step 2 (connection details)',
  args: { isOpen: true, state: 'idle', initialStep: 2, details, onClose: () => {} },
}

export const Step2Empty: Story = {
  name: 'Idle · Step 2 (empty — Verify disabled)',
  args: {
    isOpen: true,
    state: 'idle',
    initialStep: 2,
    details: { accountIdentifier: '', username: '', warehouse: '', database: '' },
    onClose: () => {},
  },
}

export const Verifying: Story = {
  name: 'Progress · verifying',
  args: { isOpen: true, state: 'progress', details, progress: { step: 2 }, onClose: () => {} },
}

export const ReviewComplete: Story = {
  name: 'Progress · review summary',
  args: {
    isOpen: true,
    state: 'progress',
    details,
    progress: { step: 4, problemTableCount: 1, totalTableCount: 2 },
    onClose: () => {},
  },
}

export const Success: Story = {
  args: {
    isOpen: true,
    state: 'success',
    details,
    summary: {
      database: 'GAME_TELEMETRY',
      tableCount: 2,
      verdict: 'YELLOW',
      verdictReason: "1 table(s) YELLOW: ['GAME_TELEMETRY.PUBLIC.PLAYER_SESSIONS'].",
    },
    onClose: () => {},
  },
}

export const FailedKeyNotRegistered: Story = {
  name: 'Failed · key not registered (step 0)',
  args: { isOpen: true, state: 'failed', details, progress: { step: 0, errorAtStep: 0 }, onClose: () => {} },
}

export const FailedAccountNotFound: Story = {
  name: 'Failed · account not found (step 1)',
  args: { isOpen: true, state: 'failed', details, progress: { step: 1, errorAtStep: 1 }, onClose: () => {} },
}

export const FailedWriteRejected: Story = {
  name: 'Failed · write access rejected (step 2)',
  args: {
    isOpen: true,
    state: 'failed',
    details,
    progress: {
      step: 2,
      errorAtStep: 2,
      errorMessage:
        'This user can write to Snowflake. 6labs requires a read-only role (SELECT only). Re-grant a read-only role and re-register the key.',
    },
    onClose: () => {},
  },
}

export const FailedPermissionDenied: Story = {
  name: 'Failed · permission denied (step 2)',
  args: { isOpen: true, state: 'failed', details, progress: { step: 2, errorAtStep: 2 }, onClose: () => {} },
}

export const FailedImport: Story = {
  name: 'Failed · import failed (step 3)',
  args: { isOpen: true, state: 'failed', details, progress: { step: 3, errorAtStep: 3 }, onClose: () => {} },
}
