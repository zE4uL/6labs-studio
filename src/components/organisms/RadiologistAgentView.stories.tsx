import type { Meta, StoryObj } from '@storybook/react-vite'
import { RadiologistAgentView } from './RadiologistAgentView'

const meta = {
  title: 'Organisms/RadiologistAgentView',
  component: RadiologistAgentView,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: 40 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof RadiologistAgentView>

export default meta
type Story = StoryObj<typeof meta>

/** Default Radiologist page with prompt input, suggestions dropdown, and video gallery. */
export const Default: Story = {}
