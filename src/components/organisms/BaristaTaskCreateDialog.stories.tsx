import type { Meta, StoryObj } from '@storybook/react-vite'
import { BaristaTaskCreateDialog } from './BaristaTaskCreateDialog'

const meta = {
  title: 'Organisms/BaristaTaskCreateDialog',
  component: BaristaTaskCreateDialog,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof BaristaTaskCreateDialog>
export default meta
type Story = StoryObj<typeof meta>

export const FreshCreate: Story = {
  args: {
    open: true,
    onCancel: () => {},
    onSaveAndSchedule: () => {},
    onRunOnce: () => {},
  },
}

export const PostRun: Story = {
  args: {
    open: true,
    postRun: true,
    onCancel: () => {},
    onSaveAndSchedule: () => {},
    prefill: {
      name: 'Weekly churn summary',
      prompt: 'Flag players at risk this week and list the top predictors.',
    },
  },
  name: 'Post-run (Save & schedule only)',
}
