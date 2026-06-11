/**
 * SdkPcIcon — laptop with code chevrons, for the "SDK - PC" source option.
 * Source: user-supplied "Icon (2).svg" (multicolor illustrative icon — keeps
 * its literal palette like the connector icon set).
 */
import type { IconProps } from './types'

export function SdkPcIcon({ size = 20, className, 'aria-label': ariaLabel }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label={ariaLabel}
      aria-hidden={ariaLabel ? undefined : true}
    >
      <path d="M3.91079 3.3335H15.9801C16.5879 3.3335 17.1708 3.57494 17.6006 4.0047C18.0303 4.43447 18.2718 5.01736 18.2718 5.62514V14.0278H1.61914V5.62514C1.61914 5.01736 1.86058 4.43447 2.29035 4.0047C2.72012 3.57494 3.303 3.3335 3.91079 3.3335V3.3335Z" fill="#1770EF" stroke="#4F566C" strokeMiterlimit="10" />
      <path d="M18.556 14.0127H1.44509C1.10759 14.0127 0.833984 14.2863 0.833984 14.6238V16.3349C0.833984 16.6724 1.10759 16.946 1.44509 16.946H18.556C18.8936 16.946 19.1672 16.6724 19.1672 16.3349V14.6238C19.1672 14.2863 18.8936 14.0127 18.556 14.0127Z" stroke="#4F566C" strokeMiterlimit="10" />
      <path d="M4.24805 14.9795C3.9719 14.9795 3.74805 15.2033 3.74805 15.4795C3.74805 15.7556 3.9719 15.9795 4.24805 15.9795V15.4795V14.9795ZM18.4147 15.9795H18.9147V14.9795H18.4147V15.4795V15.9795ZM4.24805 15.4795V15.9795H18.4147V15.4795V14.9795H4.24805V15.4795Z" fill="#4F566C" />
      <path d="M8.75 10.6294L11.5191 5.83322" stroke="white" strokeMiterlimit="10" strokeLinecap="round" />
      <path d="M13.1303 10.3208L14.8705 8.37064L13.1303 6.42052" stroke="white" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6.84086 10.1943L5.22181 8.37995L6.84086 6.56563" stroke="white" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2.59062 15.9601C2.85641 15.9601 3.07187 15.7446 3.07187 15.4788C3.07187 15.213 2.85641 14.9976 2.59062 14.9976C2.32484 14.9976 2.10938 15.213 2.10938 15.4788C2.10938 15.7446 2.32484 15.9601 2.59062 15.9601Z" fill="#4F566C" />
    </svg>
  )
}
