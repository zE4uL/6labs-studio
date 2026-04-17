import type { Meta, StoryObj } from '@storybook/react-vite'
import { OracleAgentView } from './OracleAgentView'

const meta = {
  title: 'Organisms/OracleAgentView',
  component: OracleAgentView,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 900, margin: '0 auto', padding: 40 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof OracleAgentView>

export default meta
type Story = StoryObj<typeof meta>

/** Default Oracle agent page with prompt input and suggestion cards. */
export const Default: Story = {}
