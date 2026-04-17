// Apparatus Design Tokens — typed TS constants
// Source of truth: apparatus-tokens.md | Updated: 2026-04-03
// Use for logic/calculations; use CSS vars (globals.css) for styling

export const colors = {
  brand:          '#1770EF',
  brandHover:     '#4D8FF5',
  brandPressed:   '#0D5ED4',
  brandTint:      'rgba(23,112,239,0.14)',
  brandTintLight: 'rgba(23,112,239,0.07)',
  brandTintDark:  'rgba(23,112,239,0.40)',
  error:          '#C9392A',
  errorDark:      '#A52E20',
  warning:        '#FFB700',
  success:        '#16A34A',
  notice:         '#67C3BB',
  pink:           '#C20568',
  pinkHover:      '#E31776',
  purple:         '#7B4CFF',
  purpleHover:    '#9873FF',
  base950:        '#080D1A',
  base925:        '#111827',
  base910:        '#1A2236',
  base900:        '#030D2D',
  base800:        '#1C2542',
  base700:        '#353D57',
  base600:        '#4F566C',
  base500:        '#686E81',
  base400:        '#818696',
  base300:        '#9A9EAB',
  base200:        '#B3B6C0',
  base100:        '#CDCFD5',
  base50:         '#E6E7EA',
  white:          '#FFFFFF',
  black:          '#000000',
  surface:        '#F1F1F1',
  surfacePale:    '#F5F5F5',
} as const

export const spacing = {
  xxxs: 2,
  xxs:  4,
  xs:   8,
  s:    12,
  m:    16,
  l:    20,
  xl:   24,
  xxl:  32,
  xxxl: 40,
  xxl2: 48,
  xxl3: 64,
  xxl4: 80,
  xxl5: 96,
} as const

export const radius = {
  xxs:        2,
  xs:         4,
  s:          6,
  m:          8,
  l:          10,
  xl:         12,
  '2xl':      16,
  '3xl':      20,
  '4xl':      24,
  '5xl':      32,
  '6xl':      40,
  round:      9999,
  btnSm:      4,
  btnMd:      6,
  btnLg:      8,
  btnXl:      10,
  btnPill:    9999,
  input:      6,
  card:       12,
  modal:      8,
  tag:        4,
  avatar:     9999,
  container:  20,
} as const

export const fontFamily = {
  display: "'Bricolage Grotesque', sans-serif",
  body:    "'Inter', sans-serif",
  code:    "'Roboto Mono', monospace",
} as const

export const fontSize = {
  '2xs': 10,
  xs:    12,
  s:     14,
  m:     16,
  l:     20,
  xl:    24,
  '2xl': 32,
  '3xl': 36,
  '4xl': 48,
  '5xl': 64,
} as const

export const shadow = {
  sm:     '0px 2px 8px rgba(0,0,0,0.04)',
  normal: '0px 4px 16px rgba(0,0,0,0.08)',
  big:    '0px 8px 24px rgba(0,0,0,0.08)',
  button: '0px 8px 16px rgba(0,0,0,0.10)',
  dark:   '0px 4px 8px rgba(0,0,0,0.30)',
} as const
