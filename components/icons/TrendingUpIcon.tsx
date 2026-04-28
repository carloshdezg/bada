import LayeredIcon from './LayeredIcon'
import { COLOR_MAP, type IconProps } from './colors'

export default function TrendingUpIcon({ primary = 'orange', size = 64, className }: IconProps) {
  const { primary: pc, accent: ac } = COLOR_MAP[primary]
  return (
    <LayeredIcon primary={primary} size={size} className={className}>
      {/* L2 chart area fill */}
      <path d="M10,50 L22,38 L30,44 L40,28 L52,16 L52,50 Z" fill={pc} opacity="0.22" />
      {/* L3 axes */}
      <line x1="8" y1="52" x2="54" y2="52" stroke={pc} strokeWidth="3" strokeLinecap="round" opacity="0.55" />
      <line x1="10" y1="14" x2="10" y2="52" stroke={pc} strokeWidth="3" strokeLinecap="round" opacity="0.55" />
      {/* L3 trend line */}
      <polyline
        points="10,50 22,38 30,44 40,28 52,16"
        fill="none"
        stroke={pc}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* arrowhead */}
      <polygon points="52,10 47,22 57,22" fill={pc} />
      {/* L4 accent peak dot */}
      <circle cx="52" cy="16" r="5.5" fill={ac} />
    </LayeredIcon>
  )
}
