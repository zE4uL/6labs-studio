import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { BaristaSelectionPill } from './BaristaSelectionPill'

const meta = {
  title: 'Atoms/BaristaSelectionPill',
  component: BaristaSelectionPill,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'custom', 'custom-selected', 'custom-input', 'added'],
    },
    label: { control: 'text' },
  },
  parameters: { layout: 'centered' },
} satisfies Meta<typeof BaristaSelectionPill>
export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = { args: { variant: 'default', label: 'Marketing' } }
export const Custom: Story = { args: { variant: 'custom' } }
export const CustomSelected: Story = { args: { variant: 'custom-selected' } }
export const Added: Story = { args: { variant: 'added', label: 'Product Manager' } }

export const CustomInput: Story = {
  args: { variant: 'custom-input' },
  render: () => {
    const [v, setV] = useState('')
    return (
      <BaristaSelectionPill
        variant="custom-input"
        value={v}
        placeholder="Type here"
        onChange={setV}
        onCommit={(value) => console.log('commit', value)}
        onClose={() => setV('')}
      />
    )
  },
}

export const AllStates: Story = {
  name: 'All States',
  args: {},
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, padding: 16, maxWidth: 520 }}>
      <BaristaSelectionPill variant="default" label="Engineering" />
      <BaristaSelectionPill variant="default" label="Design" />
      <BaristaSelectionPill variant="added" label="Marketing" />
      <BaristaSelectionPill variant="added" label="Data Science" />
      <BaristaSelectionPill variant="custom" />
      <BaristaSelectionPill variant="custom-selected" />
      <BaristaSelectionPill variant="custom-input" value="LiveOps" onChange={() => {}} />
    </div>
  ),
}
