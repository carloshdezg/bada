'use client'

import { useId }       from 'react'
import type { ReactNode } from 'react'
import { COLOR_MAP, type Primary } from './colors'

const BLOB_OPACITY: Record<Primary, string> = {
  orange: '0.18',
  blue:   '0.18',
  ink:    '0.10',
}

interface Props {
  primary?:   Primary
  size?:      number
  className?: string
  children:   ReactNode
}

export default function LayeredIcon({
  primary = 'orange',
  size    = 64,
  className,
  children,
}: Props) {
  const uid    = useId()
  const gradId = `li${uid.replace(/[^a-z0-9]/gi, '')}`
  const pc     = COLOR_MAP[primary].primary

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id={gradId} cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor={pc} stopOpacity={BLOB_OPACITY[primary]} />
          <stop offset="100%" stopColor={pc} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Layer 1 — blob */}
      <ellipse cx="32" cy="34" rx="30" ry="27" fill={`url(#${gradId})`} />

      {/* Layers 2–4 — icon content */}
      {children}
    </svg>
  )
}
