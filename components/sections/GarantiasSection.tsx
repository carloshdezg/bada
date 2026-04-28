import BoltIcon   from '@/components/icons/BoltIcon'
import PackageIcon from '@/components/icons/PackageIcon'
import ShieldIcon  from '@/components/icons/ShieldIcon'

interface Garantia {
  num:     string
  variant: string
  title:   string
  desc:    string
}

interface Props {
  garantias: Garantia[]
}

const CARD_STYLES: Record<string, { wrapper: string; iconWrap: string }> = {
  orange: {
    wrapper:  'bg-brand-orange-50 border-[1.5px] border-brand-orange-100',
    iconWrap: 'bg-[rgba(241,98,39,0.10)]',
  },
  green: {
    wrapper:  'bg-success-bg border-[1.5px] border-green-200',
    iconWrap: 'bg-[rgba(22,163,74,0.10)]',
  },
  blue: {
    wrapper:  'bg-brand-blue-50 border-[1.5px] border-brand-blue-100',
    iconWrap: 'bg-[rgba(20,163,190,0.10)]',
  },
}

function getIcon(num: string, variant: string) {
  const primary = variant === 'blue' ? 'blue' : 'orange'
  if (num === '01') return <BoltIcon    primary={primary} size={32} />
  if (num === '02') return <PackageIcon primary={primary} size={32} />
  return                   <ShieldIcon  primary={primary} size={32} />
}

export default function GarantiasSection({ garantias }: Props) {
  return (
    <section className="bg-white py-[110px]">
      <div className="max-w-site mx-auto px-7">

        {/* Intro — 2-col */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[80px] items-end mb-[60px]">
          <div>
            <span className="tag">Compromisos reales</span>
            <h2
              className="font-display font-black leading-[1.0] tracking-[-0.025em] text-ink"
              style={{ fontSize: 'clamp(38px, 4.5vw, 58px)' }}
            >
              No<br />
              prometemos.<br />
              <em className="italic text-brand-orange">Garantizamos.</em>
            </h2>
          </div>
          <div>
            <p className="text-[15.5px] text-ink-50 leading-[1.75] max-w-[380px]">
              Cualquier empresa puede decir que es confiable. Nosotros lo documentamos
              en el contrato.{' '}
              <strong className="text-ink font-semibold">
                Estas son las tres garantías que ningún carrier grande puede cumplir.
              </strong>{' '}
              Si fallamos, pagamos. Sin proceso de reclamación. Sin burocracia.
            </p>
          </div>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {garantias.map((g) => {
            const style = CARD_STYLES[g.variant] ?? CARD_STYLES['orange']
            return (
              <div
                key={g.num}
                className={[
                  'rounded-[20px] p-[38px_32px] relative overflow-hidden',
                  'transition-all duration-[250ms] hover:-translate-y-[5px]',
                  'hover:shadow-[0_12px_48px_rgba(15,25,35,0.14)]',
                  style.wrapper,
                ].join(' ')}
              >
                <div
                  className="font-display font-black leading-[1] text-ink absolute top-3 right-5
                             text-[80px] opacity-[0.07] select-none pointer-events-none"
                  aria-hidden="true"
                >
                  {g.num}
                </div>

                <div
                  className={[
                    'w-[52px] h-[52px] rounded-[14px] flex items-center justify-center mb-5',
                    style.iconWrap,
                  ].join(' ')}
                  aria-hidden="true"
                >
                  {getIcon(g.num, g.variant)}
                </div>

                <h3 className="font-display font-black text-[22px] text-ink
                               leading-[1.15] tracking-[-0.01em] mb-3">
                  {g.title}
                </h3>

                {/* desc contains <strong> HTML from data.js (internal, not user input) */}
                <p
                  className="text-[14px] text-ink-50 leading-[1.7]
                             [&_strong]:text-ink [&_strong]:font-semibold"
                  dangerouslySetInnerHTML={{ __html: g.desc }}
                />
              </div>
            )
          })}
        </div>

        <p className="text-center mt-6 text-[13px] text-ink-50 italic">
          Compromisos operativos documentados en tu contrato desde el día uno.
        </p>

      </div>
    </section>
  )
}
