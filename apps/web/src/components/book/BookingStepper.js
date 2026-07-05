import {Check} from 'lucide-react'
import {t} from '@/messages'

const STEP_KEYS = ['search', 'flight', 'book']

export default function BookingStepper({messages, activeIndex = 0}) {
  return (
    <div className="border-y border-border bg-white">
      <div className="mx-auto flex w-full justify-center overflow-x-auto px-5 py-4">
        <div className="flex w-full max-w-[780px] items-center justify-center">
          {STEP_KEYS.map((step, index) => {
            const complete = index < activeIndex
            const active = index === activeIndex

            return (
              <div key={step} className="flex min-w-0 items-center">
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
                      'whitespace-nowrap font-[var(--font-display)] text-[13px] font-[700]',
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
