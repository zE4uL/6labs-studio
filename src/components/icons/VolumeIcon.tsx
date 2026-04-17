interface VolumeIconProps {
  size?: number
  className?: string
}

export function VolumeIcon({ size = 16, className }: VolumeIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <path
        d="M17.5 4C18.9766 4.75964 20.2206 5.90395 21.1007 7.31207C21.9808 8.72019 22.4642 10.3399 22.5 12C22.4642 13.6601 21.9808 15.2798 21.1007 16.6879C20.2206 18.0961 18.9766 19.2404 17.5 20"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.5 16.5C18.37 15.23 19.5 13.83 19.5 12C19.5 10.17 18.34 8.77 16.5 7.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 8H3.5C2.96957 8 2.46086 8.21071 2.08579 8.58579C1.64052 9.03 1 9.56957 1 10.6667V14C1 15.1 1.6 16 2.5 16H5C5.6 16 5.78 16.1867 6 16.3333L8.92667 18.62C9.12775 18.7542 9.36152 18.8311 9.60298 18.8427C9.84443 18.8542 10.0845 18.7999 10.2975 18.6856C10.5104 18.5712 10.6883 18.4011 10.8121 18.1934C10.9358 17.9858 11.0008 17.7484 11 17.5067V6.65999C11 6.41238 10.9311 6.16965 10.8009 5.95902C10.6707 5.74838 10.4844 5.57816 10.263 5.46742C10.0415 5.35669 9.79354 5.30981 9.54693 5.33205C9.30031 5.35429 9.06476 5.44476 8.86667 5.59333L6 8C5.76667 8.17333 5.62 8.33333 5.33333 8.33333Z"
        stroke="currentColor"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
    </svg>
  )
}
