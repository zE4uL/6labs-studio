/**
 * Snowflake connector brand icon.
 *
 * The Snowflake six-pointed mark in white on a brand-cyan (#29B5E8) tile.
 * No Apparatus / Figma source exists for Snowflake yet — this is a code-first
 * prototype. Swap to the official mark once it lands in the Apparatus library.
 */
export function SnowflakeIcon({ size = 48 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="48" height="48" rx="12" fill="#29B5E8" />
      <g
        transform="translate(24 24)"
        stroke="#FFFFFF"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      >
        {/* Three axes of the snowflake — rotated 0°, 60°, 120° */}
        <g>
          <line x1="0" y1="-13" x2="0" y2="13" />
          <path d="M-3.4 -9.6 L0 -13 L3.4 -9.6 M-3.4 9.6 L0 13 L3.4 9.6" />
        </g>
        <g transform="rotate(60)">
          <line x1="0" y1="-13" x2="0" y2="13" />
          <path d="M-3.4 -9.6 L0 -13 L3.4 -9.6 M-3.4 9.6 L0 13 L3.4 9.6" />
        </g>
        <g transform="rotate(120)">
          <line x1="0" y1="-13" x2="0" y2="13" />
          <path d="M-3.4 -9.6 L0 -13 L3.4 -9.6 M-3.4 9.6 L0 13 L3.4 9.6" />
        </g>
      </g>
    </svg>
  )
}
