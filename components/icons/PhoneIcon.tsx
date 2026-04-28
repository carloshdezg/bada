import LayeredIcon from './LayeredIcon'
import { COLOR_MAP, type IconProps } from './colors'

export default function PhoneIcon({ primary = 'orange', size = 64, className }: IconProps) {
  const { primary: pc, accent: ac } = COLOR_MAP[primary]
  return (
    <LayeredIcon primary={primary} size={size} className={className}>
      {/* L2 shadow */}
      <rect x="20" y="10" width="24" height="44" rx="6" fill={pc} opacity="0.2" transform="translate(1,2)" />
      {/* L3 phone body */}
      <rect x="18" y="8" width="28" height="46" rx="6" fill={pc} />
      {/* screen area */}
      <rect x="22" y="14" width="20" height="28" rx="3" fill="white" opacity="0.15" />
      {/* speaker notch */}
      <rect x="27" y="10" width="10" height="3" rx="1.5" fill="white" opacity="0.3" />
      {/* home bar */}
      <rect x="28" y="48" width="8" height="3" rx="1.5" fill="white" opacity="0.35" />
      {/* L4 notification badge */}
      <circle cx="40" cy="18" r="6" fill={ac} />
      <circle cx="40" cy="18" r="3.5" fill="white" opacity="0.6" />
    </LayeredIcon>
  )
}
