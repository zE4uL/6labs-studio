import type { Meta, StoryObj } from '@storybook/react-vite'
import { LanguageSelector } from './LanguageSelector'
import { useRef } from 'react'

const meta = {
  title: 'Molecules/LanguageSelector',
  component: LanguageSelector,
  tags: ['autodocs'],
  parameters: {
    backgrounds: { default: 'Page (Dark)' },
    docs: {
      story: { inline: false, iframeHeight: 360 },
    },
  },
  argTypes: {
    currentLanguage: {
      control: 'select',
      options: ['EN', 'JP', 'KR', 'CN'],
    },
  },
} satisfies Meta<typeof LanguageSelector>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => {
    const anchorRef = useRef<HTMLDivElement>(null)
    return (
      <div style={{ position: 'relative', height: 340, padding: 16 }}>
        {/*
          The component positions the flyout at:
            top: anchorRef.bottom - 200
            left: anchorRef.right + 8
          So the anchor needs to be far enough down that (bottom - 200) >= 0.
          Placing anchor at top: 220 means flyout top ≈ 260 - 200 = 60px — fully visible.
        */}
        <div
          ref={anchorRef}
          style={{
            position: 'absolute',
            top: 220,
            left: 16,
            width: 60,
            height: 40,
            background: 'var(--bg-card, #fff)',
            borderRadius: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid var(--border-subtle, #e6e7ea)',
          }}
        >
          <span className="font-display text-xs text-text-primary">
            {args.currentLanguage ?? 'EN'}
          </span>
        </div>
        <LanguageSelector
          currentLanguage={args.currentLanguage ?? 'EN'}
          onSelect={() => {}}
          onClose={() => {}}
          anchorRef={anchorRef}
        />
      </div>
    )
  },
  args: {
    currentLanguage: 'EN',
  } as any,
}
