import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import Checkbox from './Checkbox'

const meta = {
  title: 'UI/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    radio: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    size: { control: 'select', options: ['sm', 'md'] },
    disabled: { control: 'boolean' },
  },
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Unchecked: Story = {
  args: { label: 'Accept terms' },
}

export const Checked: Story = {
  args: { label: 'Accept terms', checked: true },
}

export const Indeterminate: Story = {
  args: { label: 'Select all', indeterminate: true },
}

export const Small: Story = {
  args: { label: 'Compact checkbox', size: 'sm', checked: true },
}

export const DisabledCheckbox: Story = {
  args: { label: 'Cannot change', checked: true, disabled: true },
}

export const RadioButton: Story = {
  args: { label: 'Option A', radio: true, checked: true },
}

export const RadioGroup: Story = {
  render: () => {
    const [selected, setSelected] = useState('a')
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {['a', 'b', 'c'].map((v) => (
          <Checkbox
            key={v}
            radio
            name="demo-radio"
            label={`Option ${v.toUpperCase()}`}
            checked={selected === v}
            onChange={() => setSelected(v)}
          />
        ))}
      </div>
    )
  },
}
