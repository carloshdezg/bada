import { cn } from '@/lib/utils'

/**
 * SectionContainer — max-w-site wrapper with consistent horizontal padding.
 * Wrap content areas inside section elements.
 *
 * Props:
 *   className — extra classes for the inner div
 *   children  — ReactNode
 */
export default function SectionContainer({ className, children }) {
  return (
    <div className={cn('max-w-site mx-auto px-6 md:px-10 lg:px-12', className)}>
      {children}
    </div>
  )
}
