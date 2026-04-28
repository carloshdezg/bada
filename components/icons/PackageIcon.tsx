import LayeredIcon from './LayeredIcon'
import { COLOR_MAP, type IconProps } from './colors'

export default function PackageIcon({ primary = 'orange', size = 64, className }: IconProps) {
  const { primary: pc, accent: ac } = COLOR_MAP[primary]
  return (
    <LayeredIcon primary={primary} size={size} className={className}>
      {/* L2 shadow */}
      <rect x="14" y="27" width="36" height="24" rx="3" fill={pc} opacity="0.18" />
      {/* L3 box body */}
      <rect x="12" y="24" width="40" height="24" rx="3" fill={pc} />
      {/* L3 box lid */}
      <rect x="12" y="13" width="40" height="14" rx="3" fill={pc} opacity="0.85" />
      {/* lid/body seam */}
      <line x1="12" y1="24" x2="52" y2="24" stroke="white" strokeWidth="2" opacity="0.5" />
      {/* center stripe */}
      <rect x="29" y="13" width="6" height="35" rx="1" fill="white" opacity="0.22" />
      {/* L4 accent on lid */}
      <circle cx="32" cy="20" r="4" fill={ac} />
    </LayeredIcon>
  )
}
