import {Check, ChevronLeft} from 'lucide-react'
import {t} from '@/messages'

const STEP_KEYS = ['search', 'flight', 'book']

export default function BookingStepper({messages, activeIndex = 0, onBack, backLabel}) {
  const mobileProgress = Math.min(Math.max(activeIndex / (STEP_KEYS.length - 1), 0), 1)

  return (
    <div className="border-y border-border bg-white">
      <div className="relative mx-auto grid w-full max-w-[1040px] grid-cols-[40px_1fr_40px] items-center px-5 py-4 min-[700px]:block">
        {onBack ? (
          <button
            type="button"
            onClick={onBack}
            aria-label={backLabel || t(messages, 'book.summary.back')}
            className="absolute left-3 top-1/2 grid size-[34px] -translate-y-1/2 place-items-center rounded-full border border-border-strong bg-white text-secondary transition hover:border-primary hover:text-primary min-[700px]:left-6 lg:left-0"
          >
            <ChevronLeft className="size-[18px]" aria-hidden="true" />
          </button>
        ) : null}

        <div className="relative col-start-2 mx-auto flex w-full max-w-[190px] items-center justify-between min-[700px]:max-w-[780px] min-[700px]:justify-center">
          <span className="absolute left-[15px] right-[15px] top-1/2 h-px -translate-y-1/2 bg-border-strong min-[700px]:hidden" aria-hidden="true" />
          <span
            className="absolute left-[15px] top-1/2 h-px -translate-y-1/2 bg-primary/70 min-[700px]:hidden"
            style={{width: `calc((100% - 30px) * ${mobileProgress})`}}
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
                      'grid size-[30px] shrink-0 place-items-center rounded-full border text-[12px] font-[800]',
                      complete || active
                        ? 'border-primary bg-primary text-white'
                        : 'border-border-strong bg-surface-muted text-tertiary',
                    ].join(' ')}
                  >
                    {complete ? <Check className="size-[15px]" aria-hidden="true" /> : index + 1}
                  </span>
                  <span
                    className={[
                      'hidden whitespace-nowrap font-[var(--font-display)] text-[13px] font-[700] min-[700px]:inline',
                      active ? 'text-secondary' : 'text-tertiary',
                    ].join(' ')}
                  >
                    {t(messages, `book.steps.${step}`)}
                  </span>
                </div>
                {index < STEP_KEYS.length - 1 ? (
                  <span
                    className={[
                      'mx-4 hidden h-px w-[150px] md:block lg:w-[180px]',
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
