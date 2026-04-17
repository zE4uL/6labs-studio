/**
 * Section title icons — exported from Figma via Desktop Bridge exportAsync.
 * Each icon is the exact SVG from the Apparatus library instance used in the Session Side Panel.
 */

/** AI Summary sparkle icon — 3-star pattern, fill #4F566C */
export function AISummaryIcon({ size = 16, className }: { size?: number; className?: string }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path d="M4 0C3.94 1.681 5.319 3.06 7 3C5.319 2.94 3.94 4.319 4 6C4.06 4.319 2.681 2.94 1 3C2.681 3.06 4.06 1.681 4 0Z" fill="#4F566C"/>
      <path d="M10 2C9.9 4.802 12.198 7.1 15 7C12.198 6.9 9.9 9.198 10 12C10.1 9.198 7.802 6.9 5 7C7.802 7.1 10.1 4.802 10 2Z" fill="#4F566C"/>
      <path d="M5 8C4.92 10.241 6.759 12.08 9 12C6.759 11.92 4.92 13.759 5 16C5.08 13.759 3.241 11.92 1 12C3.241 12.08 5.08 10.241 5 8Z" fill="#4F566C"/>
    </svg>
  )
}

/** Detected Events radar icon — stroke #686E81 */
export function DetectedEventsIcon({ size = 16, className }: { size?: number; className?: string }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 16 16" fill="none">
      <g clipPath="url(#de_clip)">
        <path d="M14.061 4.504C14.831 5.838 15.14 7.389 14.939 8.916C14.738 10.444 14.038 11.862 12.949 12.951C11.86 14.041 10.441 14.74 8.914 14.941C7.387 15.142 5.836 14.834 4.502 14.063C3.167 13.293 2.125 12.104 1.535 10.681C0.946 9.258 0.842 7.68 1.241 6.192C1.64 4.704 2.518 3.389 3.74 2.451C4.963 1.513 6.46 1.005 8.001 1.005" stroke="#686E81" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8.001 1.005V7.003" stroke="#686E81" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 8.003C9 8.268 8.895 8.522 8.707 8.71C8.52 8.897 8.265 9.003 8 9.003C7.869 9.003 7.739 8.977 7.618 8.927C7.496 8.876 7.386 8.803 7.293 8.71C7.2 8.617 7.127 8.507 7.077 8.386C7.027 8.264 7 8.134 7 8.003C7 7.738 7.106 7.484 7.293 7.296C7.481 7.109 7.735 7.003 8 7.003C8.265 7.003 8.52 7.109 8.707 7.296C8.895 7.484 9 7.738 9 8.003Z" stroke="#686E81" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M11.463 6.004C11.904 6.766 12.08 7.652 11.965 8.525C11.85 9.398 11.45 10.208 10.828 10.831C10.205 11.453 9.395 11.853 8.522 11.968C7.65 12.083 6.763 11.906 6.001 11.466C5.239 11.026 4.643 10.347 4.306 9.533C3.969 8.72 3.91 7.818 4.138 6.968C4.366 6.118 4.868 5.367 5.566 4.831C6.264 4.295 7.12 4.004 8 4.004" stroke="#686E81" strokeLinecap="round" strokeLinejoin="round"/>
      </g>
      <defs>
        <clipPath id="de_clip"><rect width="16" height="16" fill="white"/></clipPath>
      </defs>
    </svg>
  )
}

/** Session Info bar chart icon — fill #1770EF (brand blue) */
export function SessionInfoIcon({ size = 16, className }: { size?: number; className?: string }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 16 16" fill="none">
      <path fillRule="evenodd" clipRule="evenodd" d="M2.1 9.1V13.9H3.9V9.1H2.1ZM2 8C1.448 8 1 8.448 1 9V14C1 14.552 1.448 15 2 15H4C4.552 15 5 14.552 5 14V9C5 8.448 4.552 8 4 8H2Z" fill="#1770EF"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M7.1 11.1V13.9H8.9V11.1H7.1ZM7 10C6.448 10 6 10.448 6 11V14C6 14.552 6.448 15 7 15H9C9.552 15 10 14.552 10 14V11C10 10.448 9.552 10 9 10H7Z" fill="#1770EF"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M12.1 7.1V13.9H13.9V7.1H12.1ZM12 6C11.448 6 11 6.448 11 7V14C11 14.552 11.448 15 12 15H14C14.552 15 15 14.552 15 14V7C15 6.448 14.552 6 14 6H12Z" fill="#1770EF"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M10.45 1C10.45 0.696 10.696 0.45 11 0.45H13.5C13.804 0.45 14.05 0.696 14.05 1V3.5C14.05 3.804 13.804 4.05 13.5 4.05C13.196 4.05 12.95 3.804 12.95 3.5V2.328L7.389 7.889C7.174 8.104 6.826 8.104 6.611 7.889L3.611 4.889C3.396 4.674 3.396 4.326 3.611 4.111C3.826 3.896 4.174 3.896 4.389 4.111L7 6.722L12.172 1.55H11C10.696 1.55 10.45 1.304 10.45 1Z" fill="#1770EF"/>
    </svg>
  )
}

/** Gameplay Statistics gamepad icon — stroke #FFB700 (warning yellow) */
export function GameplayStatsIcon({ size = 16, className }: { size?: number; className?: string }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M8 9.5V12.5" stroke="#FFB700" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round"/>
      <path d="M9.5 11H6.5" stroke="#FFB700" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round"/>
      <path d="M17 11C17.552 11 18 10.552 18 10C18 9.448 17.552 9 17 9C16.448 9 16 9.448 16 10C16 10.552 16.448 11 17 11Z" fill="#FFB700"/>
      <path d="M15 13C15.552 13 16 12.552 16 12C16 11.448 15.552 11 15 11C14.448 11 14 11.448 14 12C14 12.552 14.448 13 15 13Z" fill="#FFB700"/>
      <path d="M12 15.5H14.26C14.771 15.5 15.27 15.656 15.69 15.948C16.11 16.239 16.431 16.651 16.61 17.13C16.871 17.82 17.335 18.415 17.939 18.838C18.544 19.261 19.262 19.492 20 19.5C20.33 19.505 20.657 19.444 20.963 19.321C21.269 19.197 21.547 19.013 21.78 18.78C22.013 18.547 22.197 18.269 22.321 17.963C22.444 17.657 22.505 17.33 22.5 17C22.493 16.662 22.446 16.327 22.36 16L20.3 8.45C20.07 7.603 19.567 6.855 18.869 6.322C18.172 5.789 17.318 5.5 16.44 5.5H7.56C6.682 5.5 5.828 5.789 5.131 6.322C4.433 6.855 3.93 7.603 3.7 8.45L1.64 16C1.554 16.327 1.507 16.662 1.5 17C1.495 17.33 1.556 17.657 1.679 17.963C1.803 18.269 1.987 18.547 2.22 18.78C2.453 19.013 2.731 19.197 3.037 19.321C3.343 19.444 3.67 19.505 4 19.5C4.745 19.5 5.472 19.273 6.084 18.849C6.697 18.426 7.166 17.826 7.43 17.13C7.607 16.658 7.922 16.25 8.334 15.959C8.746 15.668 9.236 15.508 9.74 15.5H12Z" stroke="#FFB700" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round"/>
      <path d="M12.5 5.5V3.5C12.5 2.97 12.711 2.461 13.086 2.086C13.461 1.711 13.97 1.5 14.5 1.5H16.5" stroke="#FFB700" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round"/>
    </svg>
  )
}

/** User Profile icon — circle with person + blue add button, stroke #4F566C */
export function UserProfileIcon({ size = 16, className }: { size?: number; className?: string }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 64 64" fill="none">
      <circle cx="32" cy="32" r="28.833" stroke="#4F566C"/>
      <path d="M12.913 52.704C16.415 48.334 23.647 45.333 32 45.333C40.32 45.333 47.528 48.31 51.045 52.653" stroke="#4F566C" strokeLinecap="round"/>
      <circle cx="32" cy="26.667" r="12.833" stroke="#4F566C"/>
      <circle cx="48" cy="48" r="10.667" fill="#1770EF" stroke="#4F566C" strokeMiterlimit="10" strokeLinecap="round"/>
      <path d="M48 42.667V53.333" stroke="white" strokeMiterlimit="10" strokeLinecap="round"/>
      <path d="M53.333 48H42.667" stroke="white" strokeMiterlimit="10" strokeLinecap="round"/>
    </svg>
  )
}
