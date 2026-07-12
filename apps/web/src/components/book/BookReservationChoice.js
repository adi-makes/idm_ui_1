'use client'

import {useState} from 'react'
import {ArrowRight} from 'lucide-react'
import BookingBottomBar from '@/components/book/BookingBottomBar'
import BookingStepper from '@/components/book/BookingStepper'
import {t} from '@/messages'

const STANDARD_FEATURE_KEYS = ['instant', 'pdf']
const VERIFIABLE_FEATURE_KEYS = ['airlineReservation', 'verifiedWithAirlines']

function JourneyRouteCard({messages, trip}) {
  return (
    <section className="mt-6 rounded-[5px] border border-[#E7EDF6] bg-white px-5 py-4 text-left md:px-6">
      <div className={`grid items-center gap-3 md:gap-5 ${trip.returnDate ? 'grid-cols-[minmax(0,1fr)_auto_auto_auto_minmax(0,1fr)]' : 'grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]'}`}>
        <div className="min-w-0">
          <p className="text-[11px] font-[400] text-tertiary">{t(messages, 'book.choice.departure')}</p>
          <p className="mt-1 text-[20px] font-[500] leading-none text-secondary">{trip.fromCode}</p>
          <p className="mt-1 truncate text-[12px] font-[400] text-muted">{trip.fromCity}</p>
        </div>
        <p className="whitespace-nowrap text-[11px] font-[400] text-muted md:text-[12px]">{trip.departDate}</p>
        <ArrowRight className="mx-auto size-4 text-primary" aria-hidden="true" />
        {trip.returnDate ? <p className="whitespace-nowrap text-[11px] font-[400] text-muted md:text-[12px]">{trip.returnDate}</p> : null}
        <div className="min-w-0 text-right">
          <p className="text-[11px] font-[400] text-tertiary">{t(messages, 'book.choice.arrival')}</p>
          <p className="mt-1 text-[20px] font-[500] leading-none text-secondary">{trip.toCode}</p>
          <p className="mt-1 truncate text-[12px] font-[400] text-muted">{trip.toCity}</p>
        </div>
      </div>
    </section>
  )
}

function ReservationCard({messages, option, selected, onSelect}) {
  const isStandard = option === 'standard'
  const title = t(messages, `book.choice.options.${option}.title`)
  const description = t(messages, `book.choice.options.${option}.compactDescription`)
  const price = t(messages, `book.choice.options.${option}.price`)
  const featureKeys = isStandard ? STANDARD_FEATURE_KEYS : VERIFIABLE_FEATURE_KEYS

  return (
    <article className={`rounded-[5px] border bg-white p-5 text-left transition md:p-6 ${selected ? 'border-primary' : 'border-[#E7EDF6]'}`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="font-[var(--font-display)] text-[17px] font-[500] leading-tight text-secondary md:text-[18px]">{title}</h2>
          <p className="mt-2 max-w-[270px] text-[13px] font-[400] leading-5 text-muted">{description}</p>
        </div>
        {!isStandard ? (
          <span className="shrink-0 rounded-[5px] bg-[#EFF6FF] px-2.5 py-1.5 text-[9px] font-[500] tracking-[0.04em] text-primary">
            {t(messages, 'book.choice.recommended')}
          </span>
        ) : null}
      </div>

      <ul className="mt-5 space-y-2 text-[12px] font-[400] text-muted">
        {featureKeys.map((featureKey) => (
          <li key={featureKey} className="flex items-center gap-2">
            <span className="size-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
            {t(messages, `book.choice.features.${featureKey}`)}
          </li>
        ))}
      </ul>

      <div className="mt-6">
        <p className="font-[var(--font-display)] text-[24px] font-[500] leading-none text-secondary">{price}</p>
        <button
          type="button"
          onClick={() => onSelect(option)}
          className={`mt-5 inline-flex h-[48px] w-full items-center justify-center rounded-[5px] border px-5 text-[13px] font-[500] transition ${selected ? 'border-primary bg-primary text-white hover:bg-primary/90' : 'border-[#D7E0EC] bg-white text-secondary hover:border-primary hover:text-primary'}`}
        >
          {t(messages, `book.choice.options.${option}.cta`)}
        </button>
      </div>
    </article>
  )
}

export default function BookReservationChoice({messages, trip, onBack, onChoose}) {
  const [selectedOption, setSelectedOption] = useState('verifiable')
  const selectedPrice = t(messages, `book.choice.options.${selectedOption}.price`)

  const continueBooking = () => {
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

      <section className="mx-auto w-full max-w-[900px] px-5 pb-20 pt-7 md:px-8 md:pt-9">
        <div className="text-center">
          <h1 className="font-[var(--font-display)] text-[28px] font-[500] leading-[1.1] tracking-[-0.03em] text-secondary md:text-[32px]">{t(messages, 'book.choice.title')}</h1>
          <p className="mx-auto mt-2 max-w-[440px] text-[13px] font-[400] leading-5 text-muted">{t(messages, 'book.choice.subtitle')}</p>
        </div>

        <JourneyRouteCard messages={messages} trip={trip} />

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          <ReservationCard messages={messages} option="standard" selected={selectedOption === 'standard'} onSelect={setSelectedOption} />
          <ReservationCard messages={messages} option="verifiable" selected={selectedOption === 'verifiable'} onSelect={setSelectedOption} />
        </div>
      </section>

      <BookingBottomBar messages={messages} onContinue={continueBooking} showPrice price={selectedPrice} />
    </main>
  )
}
