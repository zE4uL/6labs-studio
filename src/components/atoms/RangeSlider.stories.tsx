import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { RangeSlider } from './RangeSlider'

const meta = {
  title: 'Atoms/RangeSlider',
  component: RangeSlider,
  tags: ['autodocs'],
  argTypes: {
    min: { control: 'number' },
    max: { control: 'number' },
    unit: { control: 'text' },
  },
  parameters: {
    backgrounds: { default: 'Page (Dark)' },
  },
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 320, padding: 24 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof RangeSlider>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => {
    const [low, setLow] = useState(20)
    const [high, setHigh] = useState(80)
    return (
      <RangeSlider
        {...args}
        valueLow={low}
        valueHigh={high}
        onChange={(l, h) => { setLow(l); setHigh(h) }}
      />
    )
  },
  args: {
    min: 0,
    max: 100,
    unit: 'min',
  },
}

export const CustomRange: Story = {
  render: (args) => {
    const [low, setLow] = useState(150)
    const [high, setHigh] = useState(600)
    return (
      <RangeSlider
        {...args}
        valueLow={low}
        valueHigh={high}
        onChange={(l, h) => { setLow(l); setHigh(h) }}
      />
    )
  },
  args: {
    min: 0,
    max: 1000,
    unit: 'ms',
  },
}
