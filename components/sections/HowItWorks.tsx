interface Step {
  number:      string
  title:       string
  description: string
}

interface Props {
  steps: Step[]
}

export default function HowItWorks({ steps }: Props) {
  return (
    <section className="bg-ink py-[110px] relative overflow-hidden">

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-[100px] right-0 w-[500px] h-[500px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(241,98,39,0.10), transparent 65%)' }}
      />

      <div className="max-w-site mx-auto px-7 relative z-[1]">

        <div className="text-center mb-[70px]">
          <span
            className="tag"
            style={{ background: 'rgba(255,255,255,0.08)', color: 'white', borderColor: 'rgba(255,255,255,0.15)' }}
          >
            El proceso
          </span>
          <h2
            className="font-display font-black tracking-[-0.025em] text-white leading-[1.05] mb-4"
            style={{ fontSize: 'clamp(36px, 4.5vw, 56px)' }}
          >
            De cero a operación<br />en cuatro pasos.
          </h2>
          <p className="text-[16.5px] text-white/45 max-w-[500px] mx-auto leading-[1.7]">
            Sin burocracia. Sin formularios infinitos. Un proceso diseñado para que
            empieces a operar rápido.
          </p>
        </div>

        <div className="relative">
          {/* Horizontal connector */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute top-[38px] h-px pointer-events-none"
            style={{
              left:       'calc(12.5% + 20px)',
              right:      'calc(12.5% + 20px)',
              background: 'linear-gradient(90deg, #F16227 0%, rgba(241,98,39,0.5) 50%, rgba(241,98,39,0.15) 100%)',
            }}
          />

          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 relative z-[1] list-none m-0 p-0">
            {steps.map(step => (
              <PasoCard key={step.number} step={step} />
            ))}
          </ol>
        </div>

      </div>
    </section>
  )
}

function PasoCard({ step }: { step: Step }) {
  return (
    <li className="text-center px-[18px] py-8 sm:py-0">
      <div className="relative w-[76px] h-[76px] mx-auto mb-[22px]">
        {/* Gradient ring */}
        <div
          className="absolute inset-[-4px] rounded-full"
          style={{
            background:            'linear-gradient(135deg, #F16227, transparent)',
            WebkitMask:            'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite:   'destination-out',
            maskComposite:         'exclude',
            border:                '1.5px solid transparent',
          }}
          aria-hidden="true"
        />
        <div className="w-full h-full rounded-full bg-ink border-[2px] border-white/10
                        flex items-center justify-center">
          <span
            className="font-display font-black text-[26px] text-brand-orange leading-none"
            aria-hidden="true"
          >
            {step.number}
          </span>
        </div>
      </div>

      <h3 className="font-display font-black text-[19px] text-white
                     tracking-[-0.01em] mb-[10px]">
        {step.title}
      </h3>
      <p className="text-[13.5px] text-white/40 leading-[1.65]">
        {step.description}
      </p>
    </li>
  )
}
