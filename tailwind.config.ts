import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['Bricolage Grotesque', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        code: ['Roboto Mono', 'monospace'],
      },
      fontSize: {
        '2xs': '0.625rem',   // 10px
        xs:   '0.75rem',    // 12px
        s:    '0.875rem',   // 14px
        m:    '1rem',       // 16px
        l:    '1.25rem',    // 20px
        xl:   '1.5rem',     // 24px
        '2xl':'2rem',       // 32px
        '3xl':'2.25rem',    // 36px
        '4xl':'3rem',       // 48px
        '5xl':'4rem',       // 64px
      },
      colors: {
        // Brand
        brand:          '#1770EF',
        'brand-hover':  '#4D8FF5',
        'brand-pressed':'#0D5ED4',
        // Status
        error:   '#C9392A',
        warning: '#FFB700',
        success: '#16A34A',
        notice:  '#67C3BB',
        // Complementary
        pink:         '#C20568',
        'pink-hover': '#E31776',
        purple:        '#7B4CFF',
        'purple-hover':'#9873FF',
        // Base scale primitives
        'base-950': '#080D1A',
        'base-925': '#111827',
        'base-910': '#1A2236',
        'base-900': '#030D2D',
        'base-800': '#1C2542',
        'base-700': '#353D57',
        'base-600': '#4F566C',
        'base-500': '#686E81',
        'base-400': '#818696',
        'base-300': '#9A9EAB',
        'base-200': '#B3B6C0',
        'base-100': '#CDCFD5',
        'base-50':  '#E6E7EA',
        // Semantic aliases → resolved by CSS vars (light/dark aware)
        'bg-page':         'var(--bg-page)',
        'bg-card':         'var(--bg-card)',
        'bg-elements':     'var(--bg-elements)',
        'bg-subtle':       'var(--bg-subtle)',
        'bg-tint':         'var(--bg-tint)',
        'bg-tint-light':   'var(--bg-tint-light)',
        'bg-highlighted':  'var(--bg-highlighted)',
        'text-primary':    'var(--text-primary)',
        'text-secondary':  'var(--text-secondary)',
        'text-tertiary':   'var(--text-tertiary)',
        'text-placeholder':'var(--text-placeholder)',
        'text-brand':      'var(--text-brand)',
        'text-on-brand':   'var(--text-on-brand)',
        'border-default':  'var(--border-default)',
        'border-subtle':   'var(--border-subtle)',
        'border-focus':    'var(--border-focus)',
        'border-tint':     'var(--border-tint)',
      },
      spacing: {
        xxxs: '2px',
        xxs:  '4px',
        xs:   '8px',
        s:    '12px',
        m:    '16px',
        l:    '20px',
        xl:   '24px',
        xxl:  '32px',
        xxxl: '40px',
        xxl2: '48px',
        xxl3: '64px',
        xxl4: '80px',
        xxl5: '96px',
      },
      borderRadius: {
        xxs:   '2px',
        xs:    '4px',
        s:     '6px',
        m:     '8px',
        l:     '10px',
        xl:    '12px',
        '2xl': '16px',
        '3xl': '20px',
        '4xl': '24px',
        '5xl': '32px',
        '6xl': '40px',
        round: '9999px',
      },
      boxShadow: {
        sm:     '0px 2px 8px rgba(0,0,0,0.04)',
        normal: '0px 4px 16px rgba(0,0,0,0.08)',
        big:    '0px 8px 24px rgba(0,0,0,0.08)',
        button: '0px 8px 16px rgba(0,0,0,0.10)',
        dark:   '0px 4px 8px rgba(0,0,0,0.30)',
      },
    },
  },
  plugins: [],
}

export default config
