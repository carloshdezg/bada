import LayeredIcon from './LayeredIcon'
import { COLOR_MAP, type IconProps } from './colors'

const BOLT = '35,8 22,36 31,36 22,56 44,28 34,28 39,8'

export default function BoltIcon({ primary = 'orange', size = 64, className }: IconProps) {
  const { primary: pc, accent: ac } = COLOR_MAP[primary]
  return (
    <LayeredIcon primary={primary} size={size} className={className}>
      {/* L2 shadow */}
      <polygon points={BOLT} fill={pc} opacity="0.2" transform="translate(2,2)" />
      {/* L3 bolt */}
      <polygon points={BOLT} fill={pc} />
      {/* L4 accent sparkle */}
      <circle cx="46" cy="16" r="5" fill={ac} />
      <circle cx="46" cy="16" r="2.5" fill="white" opacity="0.6" />
    </LayeredIcon>
  )
}
