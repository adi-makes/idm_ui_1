import {Check, ChevronLeft} from 'lucide-react'
import {t} from '@/messages'

const STEP_KEYS = ['journey', 'passenger', 'reservation', 'flight', 'review']

export default function BookingStepper({messages, activeIndex = 0, onBack, backLabel}) {
  const mobileProgress = Math.min(Math.max(activeIndex / (STEP_KEYS.length - 1), 0), 1)

  return (
    <div className="border-y border-border bg-white">
      <div className="relative grid w-full grid-cols-[32px_1fr_32px] items-center px-5 py-2 min-[700px]:grid-cols-[32px_minmax(0,1fr)] min-[700px]:gap-12 md:px-8 lg:px-[8.4vw] lg:py-3">
        {onBack ? (
          <button
            type="button"
            onClick={onBack}
            aria-label={backLabel || t(messages, 'book.summary.back')}
            className="absolute left-5 top-1/2 grid size-[32px] -translate-y-1/2 place-items-center rounded-full border border-border-strong bg-white text-secondary transition hover:border-primary hover:text-primary min-[700px]:static min-[700px]:translate-y-0 md:left-8 lg:left-[8.4vw]"
          >
            <ChevronLeft className="size-[15px]" aria-hidden="true" />
          </button>
        ) : null}

        <div className="relative col-start-2 mx-auto flex w-full max-w-[190px] items-center justify-between min-[700px]:max-w-none">
          <span className="absolute left-[13px] right-[13px] top-1/2 h-px -translate-y-1/2 bg-border-strong min-[700px]:hidden" aria-hidden="true" />
          <span
            className="absolute left-[13px] top-1/2 h-px -translate-y-1/2 bg-primary/70 min-[700px]:hidden"
            style={{width: `calc((100% - 26px) * ${mobileProgress})`}}
            aria-hidden="true"
          />
          {STEP_KEYS.map((step, index) => {
            const complete = index < activeIndex
            const active = index === activeIndex

            return (
              <div key={step} className="relative z-10 flex min-w-0 items-center">
                <div className="flex shrink-0 items-center gap-2.5">
                  <span
                    className={[
                      'grid size-[28px] shrink-0 place-items-center rounded-full border text-[11px] font-[800] lg:size-[32px]',
                      complete || active
                        ? 'border-primary bg-primary text-white'
                        : 'border-border-strong bg-surface-muted text-tertiary',
                    ].join(' ')}
                  >
                    {complete ? <Check className="size-[13px]" aria-hidden="true" /> : index + 1}
                  </span>
                  <span
                    className={[
                      'hidden whitespace-nowrap font-[var(--font-display)] text-[12px] font-[500] min-[700px]:inline lg:text-[13px]',
                      active ? 'text-secondary' : 'text-tertiary',
                    ].join(' ')}
                  >
                    {t(messages, `book.steps.${step}`)}
                  </span>
                </div>
                {index < STEP_KEYS.length - 1 ? (
                  <span
                    className={[
                      'mx-2.5 hidden h-px w-[64px] flex-1 md:block lg:w-[104px]',
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
