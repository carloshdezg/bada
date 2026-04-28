import LayeredIcon from './LayeredIcon'
import { COLOR_MAP, type IconProps } from './colors'

export default function MapPinIcon({ primary = 'orange', size = 64, className }: IconProps) {
  const { primary: pc, accent: ac } = COLOR_MAP[primary]
  return (
    <LayeredIcon primary={primary} size={size} className={className}>
      {/* L2 shadow */}
      <path
        d="M32,6 C20,6 14,14 14,24 C14,38 32,58 32,58 C32,58 50,38 50,24 C50,14 44,6 32,6 Z"
        fill={pc}
        opacity="0.2"
        transform="translate(1,2)"
      />
      {/* L3 pin body */}
      <path
        d="M32,6 C20,6 14,14 14,24 C14,38 32,58 32,58 C32,58 50,38 50,24 C50,14 44,6 32,6 Z"
        fill={pc}
      />
      {/* hole */}
      <circle cx="32" cy="24" r="10" fill="white" opacity="0.5" />
      {/* L4 accent inner */}
      <circle cx="32" cy="24" r="6" fill={ac} />
    </LayeredIcon>
  )
}
