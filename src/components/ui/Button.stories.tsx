import type { Meta, StoryObj } from '@storybook/react-vite'
import Button from './Button'
import type { ButtonVariant } from './Button'
import { SendIcon } from '../icons/SendIcon'
import { SettingsIcon } from '../icons/SettingsIcon'

/* ─── Forced-state CSS (injected once via decorator) ───────────────────── */

const FORCE_STATE_STYLES = `
  /* ── Primary ── */
  .force-hover .btn-primary { background-color: var(--brand-hover) !important; }
  .force-active .btn-primary { background-color: var(--brand-pressed) !important; }
  .force-focus .btn-primary { outline: none !important; box-shadow: 0 0 0 3px rgba(23,112,239,0.4) !important; }

  /* ── Secondary ── */
  .force-hover .btn-secondary { background-color: var(--bg-tint-light) !important; border-color: var(--border-subtle) !important; }
  .force-active .btn-secondary { background-color: var(--bg-tint-light) !important; border-color: var(--brand) !important; }
  .force-focus .btn-secondary { outline: none !important; box-shadow: 0 0 0 3px rgba(23,112,239,0.4) !important; }

  /* ── Tertiary ── */
  .force-hover .btn-tertiary { background-color: var(--bg-page-pale) !important; border-color: var(--border-default) !important; }
  .force-active .btn-tertiary { background-color: var(--bg-subtle) !important; border-color: var(--border-pressed) !important; }
  .force-focus .btn-tertiary { outline: none !important; box-shadow: 0 0 0 3px rgba(23,112,239,0.4) !important; }

  /* ── Outline ── */
  .force-hover .btn-outline { background-color: var(--bg-tint-light) !important; border-color: var(--brand-hover) !important; }
  .force-active .btn-outline { background-color: var(--bg-tint-light) !important; border-color: var(--brand-pressed) !important; }
  .force-focus .btn-outline { outline: none !important; box-shadow: 0 0 0 3px rgba(23,112,239,0.4) !important; }

  /* ── Outline Complementary ── */
  .force-hover .btn-outline-complementary { color: var(--purple-hover) !important; border-color: var(--purple-hover) !important; background-color: var(--purple-tint-light) !important; }
  .force-active .btn-outline-complementary { background-color: rgba(123,76,255,0.14) !important; }
  .force-focus .btn-outline-complementary { outline: none !important; box-shadow: 0 0 0 3px rgba(123,76,255,0.4) !important; }

  /* ── Danger ── */
  .force-hover .btn-danger { background-color: var(--error-light) !important; }
  .force-active .btn-danger { background-color: var(--error-dark) !important; }
  .force-focus .btn-danger { outline: none !important; box-shadow: 0 0 0 3px rgba(201,57,42,0.4) !important; }

  /* ── Blueish ── */
  .force-hover .btn-blueish { background: linear-gradient(to left, #9C79FF, #0FD4FF) !important; }
  .force-active .btn-blueish { background: linear-gradient(to left, #7B4CFF, #0EA4C5) !important; filter: brightness(0.9) !important; }
  .force-focus .btn-blueish { outline: none !important; box-shadow: 0 0 0 3px rgba(23,112,239,0.45) !important; }

  /* ── Translucent ── */
  .force-hover .btn-translucent { background-color: rgba(255,255,255,0.30) !important; }
  .force-active .btn-translucent { background-color: rgba(255,255,255,0.40) !important; }
  .force-focus .btn-translucent { outline: none !important; box-shadow: 0 0 0 3px rgba(23,112,239,0.4) !important; }

  /* ── Transparent ── */
  .force-hover .btn-transparent { background-color: var(--bg-subtle) !important; }
  .force-active .btn-transparent { background-color: var(--bg-subtle) !important; }
  .force-focus .btn-transparent { outline: none !important; box-shadow: 0 0 0 3px rgba(23,112,239,0.4) !important; }

  /* ── Link ── */
  .force-hover .btn-link { text-decoration: underline !important; color: var(--brand-hover) !important; }
  .force-active .btn-link { color: var(--brand-pressed) !important; }
  .force-focus .btn-link { outline: none !important; box-shadow: 0 0 0 3px rgba(23,112,239,0.4) !important; }

  /* ── Disabled override (all) ── */
  .force-disabled .btn { pointer-events: none !important; cursor: not-allowed !important; }
  .force-disabled .btn-primary,
  .force-disabled .btn-danger { background-color: var(--bg-subtle) !important; color: var(--text-disabled) !important; box-shadow: none !important; }
  .force-disabled .btn-secondary,
  .force-disabled .btn-tertiary { background-color: var(--bg-page-pale, var(--bg-subtle)) !important; color: var(--text-disabled) !important; border-color: var(--border-subtle) !important; }
  .force-disabled .btn-outline,
  .force-disabled .btn-outline-complementary { color: var(--text-disabled) !important; border-color: var(--border-subtle) !important; }
  .force-disabled .btn-blueish { background: var(--bg-subtle) !important; color: var(--text-disabled) !important; border-color: var(--border-subtle) !important; }
  .force-disabled .btn-translucent { background-color: rgba(255,255,255,0.10) !important; color: rgba(0,0,0,0.30) !important; border-color: transparent !important; }
  .force-disabled .btn-transparent { color: var(--text-disabled) !important; }
  .force-disabled .btn-link { color: var(--text-disabled) !important; }
`

const stateClassMap: Record<string, string> = {
  Default: '',
  Hover: 'force-hover',
  Click: 'force-active',
  Focus: 'force-focus',
  Disabled: 'force-disabled',
}

const meta = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'primary', 'secondary', 'tertiary', 'outline', 'outline-complementary',
        'danger', 'blueish', 'translucent', 'transparent', 'link',
      ],
    },
    size: { control: 'select', options: ['sm', 'md', 'lg', 'xl'] },
    pill: { control: 'boolean' },
    iconOnly: { control: 'boolean' },
    iconRound: { control: 'boolean' },
    disabled: { control: 'boolean' },
    state: {
      control: 'select',
      options: ['Default', 'Hover', 'Click', 'Focus', 'Disabled'],
      description: 'Force a visual interaction state (Storybook only)',
    },
  },
  decorators: [
    (Story, context) => {
      const state = (context.args as any).state || 'Default'
      const wrapperClass = stateClassMap[state] || ''
      return (
        <>
          <style>{FORCE_STATE_STYLES}</style>
          <div className={wrapperClass}>
            <Story />
          </div>
        </>
      )
    },
  ],
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: { children: 'Button', variant: 'primary', size: 'md' },
}

export const Secondary: Story = {
  args: { children: 'Button', variant: 'secondary', size: 'md' },
}

export const Outline: Story = {
  args: { children: 'Button', variant: 'outline', size: 'md' },
}

export const Danger: Story = {
  args: { children: 'Delete', variant: 'danger', size: 'md' },
}

export const Pill: Story = {
  args: { children: 'Pill Button', variant: 'primary', pill: true },
}

export const WithLeftIcon: Story = {
  args: {
    children: 'Send',
    variant: 'primary',
    leftIcon: <SendIcon size={16} />,
  },
}

export const WithRightIcon: Story = {
  args: {
    children: 'Settings',
    variant: 'secondary',
    rightIcon: <SettingsIcon size={16} />,
  },
}

export const IconOnly: Story = {
  args: {
    children: <SettingsIcon size={16} />,
    variant: 'tertiary',
    iconOnly: true,
  },
}

export const IconOnlyRound: Story = {
  args: {
    children: <SendIcon size={16} />,
    variant: 'primary',
    iconOnly: true,
    iconRound: true,
  },
}

export const Disabled: Story = {
  args: { children: 'Disabled', variant: 'primary', disabled: true },
}

/** All 10 variants side by side */
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
      {(['primary', 'secondary', 'tertiary', 'outline', 'outline-complementary',
        'danger', 'blueish', 'translucent', 'transparent', 'link'] as const).map((v) => (
        <Button key={v} variant={v}>{v}</Button>
      ))}
    </div>
  ),
}

/** All 4 sizes */
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {(['sm', 'md', 'lg', 'xl'] as const).map((s) => (
          <Button key={s} size={s}>Size {s}</Button>
        ))}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {(['sm', 'md', 'lg', 'xl'] as const).map((s) => (
          <Button key={s} variant="link" size={s}>Link {s}</Button>
        ))}
      </div>
    </div>
  ),
}

/** All states for each variant */
export const AllStates: Story = {
  name: 'All States',
  render: () => {
    const states = ['Default', 'Hover', 'Click', 'Focus', 'Disabled'] as const
    const variants: ButtonVariant[] = [
      'primary', 'secondary', 'tertiary', 'outline', 'outline-complementary',
      'danger', 'blueish', 'translucent', 'transparent', 'link',
    ]
    return (
      <>
        <style>{FORCE_STATE_STYLES}</style>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          {variants.map((v) => (
            <div key={v} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <span style={{ fontSize: 13, color: '#e2e8f0', fontWeight: 600, paddingBottom: 4, borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                {v}
              </span>
              <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                {states.map((s) => (
                  <div key={s} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                    <div className={stateClassMap[s]}>
                      <Button variant={v}>{s === 'Disabled' ? 'Label' : 'Label'}</Button>
                    </div>
                    <span style={{ fontSize: 10, color: '#64748b', textAlign: 'center' }}>{s}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </>
    )
  },
}
