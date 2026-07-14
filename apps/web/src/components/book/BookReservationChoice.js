'use client'

import {useEffect, useState} from 'react'
import {BadgeCheck, Clock3, FileText, Plane} from 'lucide-react'
import BookingBottomBar from '@/components/book/BookingBottomBar'
import BookingRouteSummaryCard from '@/components/book/BookingRouteSummaryCard'
import BookingStepper from '@/components/book/BookingStepper'
import {t} from '@/messages'

const STANDARD_FEATURE_KEYS = ['instant', 'pdf']
const VERIFIABLE_FEATURE_KEYS = ['airlineReservation', 'verifiedWithAirlines']
const FEATURE_ICONS = {
  instant: Clock3,
  pdf: FileText,
  airlineReservation: Plane,
  verifiedWithAirlines: BadgeCheck,
}

function ReservationCard({messages, option, selected, onSelect}) {
  const isStandard = option === 'standard'
  const title = t(messages, `book.choice.options.${option}.title`)
  const description = t(messages, `book.choice.options.${option}.compactDescription`)
  const price = t(messages, `book.choice.options.${option}.price`)
  const featureKeys = isStandard ? STANDARD_FEATURE_KEYS : VERIFIABLE_FEATURE_KEYS

  return (
    <article className={`group relative flex h-full cursor-pointer flex-col rounded-[5px] border bg-white p-4 text-left transition md:p-6 ${selected ? 'border-primary' : 'border-[#E7EDF6]'}`}>
      <button
        type="button"
        onClick={() => onSelect(option)}
        aria-pressed={selected}
        aria-label={`${title}, ${price}`}
        className="absolute inset-0 z-10 rounded-[5px] transition hover:bg-primary/[0.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      />
      <div className="flex min-h-0 items-start justify-between gap-4 md:min-h-[72px]">
        <div>
          <h2 className="font-[var(--font-display)] text-[16px] font-[400] leading-tight text-secondary md:text-[17px]">{title}</h2>
          <p className="mt-2 max-w-[270px] text-[12px] font-[400] leading-[1.5] text-muted">{description}</p>
        </div>
        {!isStandard ? (
          <span className="shrink-0 rounded-[5px] bg-[#EFF6FF] px-2.5 py-1.5 text-[9px] font-[400] tracking-[0.02em] text-primary">
            {t(messages, 'book.choice.recommended')}
          </span>
        ) : null}
      </div>

      <div className="my-3 h-px bg-[#E7EDF6] md:my-4" />

      <ul className="space-y-2 text-[12px] font-[400] text-muted md:space-y-2.5">
        {featureKeys.map((featureKey) => {
          const FeatureIcon = FEATURE_ICONS[featureKey]

          return (
            <li key={featureKey} className="flex items-center gap-2">
              <span className="grid size-5 shrink-0 place-items-center rounded-full bg-[#EFF6FF] text-primary">
                <FeatureIcon className="size-[11px]" strokeWidth={2} aria-hidden="true" />
              </span>
              {t(messages, `book.choice.features.${featureKey}`)}
            </li>
          )
        })}
      </ul>

      <div className="mt-auto pt-4 md:pt-5">
        <p className="font-[var(--font-display)] text-[24px] font-[400] leading-none text-secondary">{price}</p>
        <button
          type="button"
          onClick={() => onSelect(option)}
          aria-pressed={selected}
          className={`relative z-20 mt-5 hidden h-[46px] w-full items-center justify-center rounded-[5px] border text-[13px] font-[500] transition md:inline-flex ${selected ? 'border-primary bg-primary text-white hover:bg-primary/90' : 'border-[#D7E0EC] bg-white text-secondary hover:border-primary hover:text-primary'}`}
        >
          {t(messages, `book.choice.options.${option}.cta`)}
        </button>
      </div>
    </article>
  )
}

export default function BookReservationChoice({messages, trip, onBack, onChoose}) {
  const [selectedOption, setSelectedOption] = useState(null)
  const selectedPrice = selectedOption ? t(messages, `book.choice.options.${selectedOption}.price`) : undefined

  useEffect(() => {
    if (!window.matchMedia('(min-width: 768px)').matches) return undefined

    const frame = window.requestAnimationFrame(() => {
      setSelectedOption((current) => current || 'verifiable')
    })

    return () => window.cancelAnimationFrame(frame)
  }, [])

  const continueBooking = () => {
    if (!selectedOption) return

    onChoose?.({
      option: selectedOption,
      price: selectedPrice,
      title: t(messages, `book.choice.options.${selectedOption}.title`),
      delivery: selectedOption === 'standard'
        ? t(messages, 'book.choice.delivery.instant')
        : t(messages, 'book.choice.delivery.within1to6'),
      deliveryDate: '',
      deliveryTime: '',
    })
  }

  return (
    <main className="min-h-[calc(100vh-76px)] bg-[#f4f7fb] text-secondary">
      <BookingStepper messages={messages} activeIndex={2} onBack={onBack} />

      <section className="mx-auto w-full max-w-[900px] px-5 pb-20 pt-5 md:px-8 md:pt-9">
        <div className="text-center">
          <h1 className="font-[var(--font-display)] text-[28px] font-[400] leading-[1.1] tracking-[-0.03em] text-secondary md:text-[32px]">{t(messages, 'book.choice.title')}</h1>
          <p className="mx-auto mt-2 max-w-[440px] text-[13px] font-[400] leading-5 text-muted">{t(messages, 'book.choice.subtitle')}</p>
        </div>

        <BookingRouteSummaryCard messages={messages} trip={trip} className="mt-4 md:mt-6" />

        <div className="mt-3 grid gap-3 md:mt-4 md:grid-cols-2 md:gap-4">
          <ReservationCard messages={messages} option="standard" selected={selectedOption === 'standard'} onSelect={setSelectedOption} />
          <ReservationCard messages={messages} option="verifiable" selected={selectedOption === 'verifiable'} onSelect={setSelectedOption} />
        </div>
      </section>

      <BookingBottomBar messages={messages} onContinue={continueBooking} continueDisabled={!selectedOption} showPrice={Boolean(selectedOption)} price={selectedPrice} />
    </main>
  )
}
