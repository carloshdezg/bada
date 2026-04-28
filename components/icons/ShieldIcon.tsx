import LayeredIcon from './LayeredIcon'
import { COLOR_MAP, type IconProps } from './colors'

export default function ShieldIcon({ primary = 'orange', size = 64, className }: IconProps) {
  const { primary: pc, accent: ac } = COLOR_MAP[primary]
  return (
    <LayeredIcon primary={primary} size={size} className={className}>
      {/* L2 shadow */}
      <path
        d="M32,12 L52,20 L52,36 Q52,52 32,60 Q12,52 12,36 L12,20 Z"
        fill={pc}
        opacity="0.2"
        transform="translate(1,2)"
      />
      {/* L3 main shield */}
      <path d="M32,10 L52,18 L52,36 Q52,56 32,62 Q12,56 12,36 L12,18 Z" fill={pc} />
      {/* inner highlight */}
      <path
        d="M32,16 L48,23 L48,36 Q48,51 32,56 Q16,51 16,36 L16,23 Z"
        fill="white"
        opacity="0.1"
      />
      {/* L4 checkmark */}
      <path
        d="M22,34 L30,42 L44,26"
        fill="none"
        stroke={ac}
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </LayeredIcon>
  )
}
