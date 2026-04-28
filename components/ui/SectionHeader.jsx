import { cn } from '@/lib/utils'

/**
 * SectionHeader — eyebrow + h2 + optional description.
 * Used at the top of section organisms.
 *
 * Props:
 *   eyebrow     — string label above the heading
 *   heading     — ReactNode (supports <br/> for line breaks)
 *   description — optional string paragraph below the heading
 *   centered    — boolean, centers all text (default: false)
 *   maxWidth    — Tailwind max-w class for the wrapper (default: 'max-w-[520px]')
 *   className   — extra classes on the wrapper
 */
export default function SectionHeader({
  eyebrow,
  heading,
  description,
  centered = false,
  maxWidth = 'max-w-[520px]',
  className,
}) {
  return (
    <div
      className={cn(
        maxWidth,
        centered && 'mx-auto text-center',
        className
      )}
    >
      {eyebrow && (
        <p className="eyebrow mb-3">{eyebrow}</p>
      )}
      {heading && (
        <h2 className="font-heading font-bold text-slate-950 text-6xl tracking-tight leading-[1] mb-3">
          {heading}
        </h2>
      )}
      {description && (
        <p className="text-[0.9375rem] text-slate-500 leading-relaxed">
          {description}
        </p>
      )}
    </div>
  )
}
