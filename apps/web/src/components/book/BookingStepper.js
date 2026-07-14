import {Check, ChevronLeft} from 'lucide-react'
import {t} from '@/messages'

const STEP_KEYS = ['journey', 'passenger', 'reservation', 'flight', 'review']

export default function BookingStepper({messages, activeIndex = 0, onBack, backLabel}) {
  return (
    <div className="border-y border-border bg-white">
      <div className="relative flex min-h-[64px] items-center justify-center px-5 py-3 min-[700px]:hidden" role="progressbar" aria-valuemin={1} aria-valuemax={STEP_KEYS.length} aria-valuenow={activeIndex + 1}>
        {onBack ? (
          <button
            type="button"
            onClick={onBack}
            aria-label={backLabel || t(messages, 'book.summary.back')}
            className="absolute left-5 grid size-10 place-items-center rounded-[12px] border border-border-strong bg-white text-secondary transition hover:border-primary hover:text-primary"
          >
            <ChevronLeft className="size-5" strokeWidth={2} aria-hidden="true" />
          </button>
        ) : null}
        <div className="flex w-[200px] items-center justify-between" aria-hidden="true">
          {STEP_KEYS.map((step, index) => (
            <span
              key={step}
              className={`size-3 rounded-full ${index <= activeIndex ? 'bg-primary' : 'bg-[#C7CFDC]'}`}
            />
          ))}
        </div>
      </div>

      <div className="relative hidden w-full grid-cols-[32px_minmax(0,1fr)] items-center gap-12 px-5 py-2 min-[700px]:grid md:px-8 lg:px-[8.4vw] lg:py-3">
        {onBack ? (
          <button
            type="button"
            onClick={onBack}
            aria-label={backLabel || t(messages, 'book.summary.back')}
            className="grid size-[32px] place-items-center rounded-full border border-border-strong bg-white text-secondary transition hover:border-primary hover:text-primary"
          >
            <ChevronLeft className="size-[15px]" aria-hidden="true" />
          </button>
        ) : null}

        <div className="relative col-start-2 mx-auto flex w-full items-center justify-between">
          {STEP_KEYS.map((step, index) => {
            const complete = index < activeIndex
            const active = index === activeIndex

            return (
              <div key={step} className="relative z-10 flex min-w-0 items-center">
                <div className="flex shrink-0 items-center gap-2.5">
                  <span
                    className={[
                      'grid size-[28px] shrink-0 place-items-center rounded-full border text-[11px] font-[500] lg:size-[32px]',
                      complete || active
                        ? 'border-primary bg-primary text-white'
                        : 'border-border-strong bg-surface-muted text-tertiary',
                    ].join(' ')}
                  >
                    {complete ? <Check className="size-[13px]" aria-hidden="true" /> : index + 1}
                  </span>
                  <span
                    className={[
                      'whitespace-nowrap text-[12px] font-[400] lg:text-[13px]',
                      active ? 'text-secondary' : 'text-tertiary',
                    ].join(' ')}
                  >
                    {t(messages, `book.steps.${step}`)}
                  </span>
                </div>
                {index < STEP_KEYS.length - 1 ? (
                  <span
                    className={[
                      'mx-2.5 h-px w-[64px] flex-1 lg:w-[104px]',
                      complete || active ? 'bg-primary/70' : 'bg-border-strong',
                    ].join(' ')}
                    aria-hidden="true"
                  />
                ) : null}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
