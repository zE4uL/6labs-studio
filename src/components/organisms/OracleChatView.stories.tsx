import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { OracleChatView, type ChatMessage } from './OracleChatView'

const meta = {
  title: 'Organisms/OracleChatView',
  component: OracleChatView,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ height: 700, border: '1px solid #E6E7EA', borderRadius: 8 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof OracleChatView>

export default meta
type Story = StoryObj<typeof meta>

const mockMessages: ChatMessage[] = [
  {
    id: 'u1',
    type: 'user',
    text: 'Where are players getting stuck or confused in the tutorial?',
  },
  {
    id: 'ai1',
    type: 'ai',
    response: {
      id: 'resp-1',
      sources: [
        { id: 's1', duration: '4:05', title: 'Session 1' },
        { id: 's2', duration: '3:22', title: 'Session 2' },
        { id: 's3', duration: '5:10', title: 'Session 3' },
      ],
      contentHtml: `
        <p>5 Major Friction Points Identified:</p>
        <ul>
          <li><strong>Grenade Throwing:</strong> 73% fail on first attempt</li>
          <li><strong>Inventory Management:</strong> 51% take 40+ seconds</li>
          <li><strong>Aiming:</strong> 47% fire from hip instead of ADS</li>
        </ul>
      `,
      creditsUsed: 20,
      relatedPrompts: [
        'How did they learn without tutorials?',
        'Show top 3 failure videos.',
      ],
    },
  },
]

export const WithMessages: Story = {
  render: () => {
    const [input, setInput] = useState('')
    return (
      <OracleChatView
        messages={mockMessages}
        inputValue={input}
        onInputChange={setInput}
        onSubmit={() => console.log('submit', input)}
        onExpandSources={(id) => console.log('expand', id)}
        onSuggestionClick={(t) => setInput(t)}
        onDislike={(id) => console.log('dislike', id)}
      />
    )
  },
}

export const Loading: Story = {
  render: () => {
    const [input, setInput] = useState('')
    const loadingMessages: ChatMessage[] = [
      { id: 'u1', type: 'user', text: 'Analyze the tutorial flow.' },
      {
        id: 'ai1',
        type: 'ai',
        isLoading: true,
        response: {
          id: 'resp-1',
          sources: [],
          contentHtml: '',
          creditsUsed: 0,
          relatedPrompts: [],
        },
      },
    ]
    return (
      <OracleChatView
        messages={loadingMessages}
        inputValue={input}
        onInputChange={setInput}
        onSubmit={() => {}}
        onExpandSources={() => {}}
        onSuggestionClick={() => {}}
        onDislike={() => {}}
      />
    )
  },
}

export const Empty: Story = {
  render: () => {
    const [input, setInput] = useState('')
    return (
      <OracleChatView
        messages={[]}
        inputValue={input}
        onInputChange={setInput}
        onSubmit={() => console.log('submit')}
        onExpandSources={() => {}}
        onSuggestionClick={() => {}}
        onDislike={() => {}}
      />
    )
  },
}
