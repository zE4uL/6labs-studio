/**
 * BigQuery connector brand icon.
 *
 * Stand-in: Google multi-color "G" mark on white. No Apparatus / Figma source
 * exists for BigQuery yet — this is a code-first prototype. Swap to the official
 * BigQuery hexagon once it lands in the Apparatus library.
 */
export function BigQueryIcon({ size = 48 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="48" height="48" rx="12" fill="#FFFFFF" />
      {/* Google G — official multi-color paths */}
      <g transform="translate(10 10) scale(1.12)">
        <path
          d="M24 12.276c0-.815-.073-1.6-.209-2.354H12.245v4.452h6.59a5.633 5.633 0 0 1-2.446 3.696v3.072h3.959C22.659 19.193 24 16.054 24 12.276Z"
          fill="#4285F4"
        />
        <path
          d="M12.245 24c3.308 0 6.084-1.097 8.112-2.97l-3.96-3.071c-1.097.735-2.5 1.17-4.152 1.17-3.193 0-5.897-2.156-6.86-5.054H1.286v3.17A12.245 12.245 0 0 0 12.245 24Z"
          fill="#34A853"
        />
        <path
          d="M5.385 14.275a7.358 7.358 0 0 1 0-4.55v-3.17H1.286a12.265 12.265 0 0 0 0 10.89l4.099-3.17Z"
          fill="#FBBC05"
        />
        <path
          d="M12.245 4.671c1.8 0 3.418.62 4.692 1.836l3.518-3.518C18.32 1.024 15.543 0 12.245 0A12.245 12.245 0 0 0 1.286 6.555l4.099 3.17c.963-2.898 3.667-5.054 6.86-5.054Z"
          fill="#EA4335"
        />
      </g>
    </svg>
  )
}
