'use client'

import {useState} from 'react'
import Image from 'next/image'
import {ArrowRight, Clock3, CreditCard, Info, Lock, Mail, Plane, ShieldCheck} from 'lucide-react'
import BookingStepper from '@/components/book/BookingStepper'
import {formatPassengerName} from '@/components/book/passengerFormat'
import {t} from '@/messages'

const AIRLINE_LOGOS = {
  Emirates: '/airlineLogos/Emirates_logo.png',
  'Air India': '/airlineLogos/air_india_logo.png',
}

function AirlineLogo({airline, className = 'h-4 w-auto max-w-[72px] object-contain object-left'}) {
  const src = AIRLINE_LOGOS[airline]

  if (!src) return <span className="text-[12px] font-[400] text-[#64748B]">{airline}</span>

  return <Image src={src} alt={airline} width={90} height={24} className={className} />
}

function ReviewRow({label, children}) {
  return (
    <div className="flex items-start justify-between gap-8 border-b border-[#EEF2F7] py-3.5 last:border-b-0">
      <dt className="text-[13px] font-[400] text-[#64748B]">{label}</dt>
      <dd className="max-w-[68%] text-right text-[13px] font-[500] leading-5 text-[#334155]">{children}</dd>
    </div>
  )
}

function JourneyDetails({messages, trip, modeTitle}) {
  return (
    <section className="rounded-2xl border border-[#E7EDF6] bg-white p-6 md:p-7">
      <div className="flex items-center gap-3">
        <span className="grid size-8 place-items-center rounded-full bg-[#EFF6FF] text-primary"><ShieldCheck className="size-4" aria-hidden="true" /></span>
        <h2 className="font-[var(--font-display)] text-[18px] font-[500] text-[#0F172A]">{t(messages, 'book.review.journey')}</h2>
      </div>

      <div className="mt-6 grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3">
        <div className="min-w-0">
          <p className="text-[11px] font-[400] text-[#64748B]">{t(messages, 'book.choice.departure')}</p>
          <p className="mt-1 text-[22px] font-[500] leading-none tracking-[-0.02em] text-[#0F172A]">{trip.fromCode}</p>
          <p className="mt-1 truncate text-[13px] font-[400] text-[#64748B]">{trip.fromCity}</p>
        </div>
        <ArrowRight className="size-4 text-tertiary" aria-hidden="true" />
        <div className="min-w-0 text-right">
          <p className="text-[11px] font-[400] text-[#64748B]">{t(messages, 'book.choice.arrival')}</p>
          <p className="mt-1 text-[22px] font-[500] leading-none tracking-[-0.02em] text-[#0F172A]">{trip.toCode}</p>
          <p className="mt-1 truncate text-[13px] font-[400] text-[#64748B]">{trip.toCity}</p>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between gap-4 border-t border-[#EEF2F7] pt-3 text-[12px] font-[400] text-[#64748B]">
        <span className="whitespace-nowrap">{trip.departDate}</span>
        {trip.returnDate ? <span className="whitespace-nowrap text-right">{trip.returnDate}</span> : null}
      </div>

      <div className="mt-4 flex items-center justify-between gap-4 text-[13px]">
        <span className="font-[400] text-[#64748B]">{t(messages, 'book.review.reservation')}</span>
        <span title={modeTitle} className="max-w-[58%] truncate text-right font-[500] text-[#334155]">{modeTitle}</span>
      </div>
    </section>
  )
}

function LegacyFlightSummary({messages, flights}) {
  if (!flights.length) {
    return (
      <div className="flex items-center gap-3 rounded-xl bg-[#EFF6FF] px-5 py-4 text-[14px] font-[400] leading-6 text-[#64748B]">
        <Info className="size-4 shrink-0 text-primary" aria-hidden="true" />
        {t(messages, 'book.review.manualReservation')}
      </div>
    )
  }

  return (
    <div className="grid gap-3">
      {flights.map((flight) => (
        <div key={`${flight.airline}-${flight.flightNumber}-${flight.kind}`} className="rounded-xl bg-[#F8FAFC] px-5 py-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[12px] font-[500] text-primary">{flight.airline}</p>
              <p className="mt-1 text-[13px] font-[750] text-secondary">{flight.flightNumber} · {flight.kind}</p>
            </div>
            <span className="text-[12px] font-[400] text-[#64748B]">{flight.duration}</span>
          </div>
          <div className="mt-3 grid grid-cols-[1fr_24px_1fr] items-center gap-2 text-[12px]">
            <div><span className="block text-[15px] font-[800] text-secondary">{flight.departTime}</span><span className="text-muted">{flight.fromCode}</span></div>
            <ArrowRight className="size-[15px] text-tertiary" aria-hidden="true" />
            <div className="text-right"><span className="block text-[15px] font-[800] text-secondary">{flight.arriveTime}</span><span className="text-muted">{flight.toCode}</span></div>
          </div>
        </div>
      ))}
    </div>
  )
}

function CompactFlightSummary({messages, flights}) {
  if (!flights.length) {
    return (
      <div className="flex items-center gap-3 rounded-xl bg-[#EFF6FF] px-5 py-4 text-[14px] font-[400] leading-6 text-[#64748B]">
        <Info className="size-4 shrink-0 text-primary" aria-hidden="true" />
        {t(messages, 'book.review.manualReservation')}
      </div>
    )
  }

  return (
    <div className="grid gap-3">
      {flights.map((flight) => (
        <div key={`${flight.airline}-${flight.flightNumber}-${flight.kind}`} className="rounded-xl bg-white px-5 py-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <AirlineLogo airline={flight.airline} />
              <p className="min-w-0 truncate text-[12px] font-[400] text-[#64748B]">{flight.flightNumber} {' · '} {flight.kind}</p>
            </div>
            <span className="text-[12px] font-[400] text-[#64748B]">{flight.duration}</span>
          </div>

          <div className="mt-3 grid grid-cols-[1fr_24px_1fr] items-center gap-2 text-[12px]">
            <div>
              <span className="block text-[15px] font-[500] tracking-[-0.01em] text-secondary">{flight.departTime}</span>
              <span className="font-[500] text-muted">{flight.fromCode} <span className="font-[400] text-tertiary">· {flight.fromCity}</span></span>
            </div>
            <ArrowRight className="size-[15px] text-tertiary" aria-hidden="true" />
            <div className="text-right">
              <span className="block text-[15px] font-[500] tracking-[-0.01em] text-secondary">{flight.arriveTime}</span>
              <span className="font-[500] text-muted">{flight.toCode} <span className="font-[400] text-tertiary">· {flight.toCity}</span></span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function FlightSummary({messages, flights}) {
  if (!flights.length) {
    return (
      <div className="flex items-center gap-3 rounded-xl border border-[#E7EDF6] bg-white px-5 py-4 text-[14px] font-[400] leading-6 text-[#64748B]">
        <Info className="size-4 shrink-0 text-primary" aria-hidden="true" />
        {t(messages, 'book.review.manualReservation')}
      </div>
    )
  }

  return (
    <div className="grid gap-5">
      {flights.map((flight) => (
        <article key={`${flight.airline}-${flight.flightNumber}-${flight.kind}`} className="rounded-2xl border border-[#E7EDF6] bg-white px-5 py-5 font-sans md:px-7 md:py-6">
          <div className="flex items-center justify-between gap-4">
            <div className="flex min-w-0 items-center gap-3 md:gap-4">
              <AirlineLogo airline={flight.airline} className="h-9 w-auto max-w-[58px] object-contain object-left md:h-10 md:max-w-[66px]" />
              <span className="text-[16px] font-[500] text-secondary md:text-[18px]">{flight.flightNumber}</span>
              <span className="hidden h-6 w-px bg-[#D7E0EC] sm:block" aria-hidden="true" />
              <span className="text-[15px] font-[500] text-primary md:text-[17px]">{flight.kind}</span>
            </div>
            <span className="flex shrink-0 items-center gap-2 text-[13px] font-[400] text-[#64748B] md:text-[15px]">
              <Clock3 className="size-4" aria-hidden="true" />
              {flight.duration}
            </span>
          </div>

          <div className="mt-7 grid grid-cols-[minmax(0,1fr)_minmax(86px,1.4fr)_minmax(0,1fr)] items-center gap-3 md:mt-9 md:gap-5">
            <div className="min-w-0">
              <p className="font-[var(--font-display)] text-[30px] font-[500] leading-none tracking-[-0.03em] text-secondary md:text-[40px]">{flight.departTime}</p>
              <p className="mt-3 flex min-w-0 items-center gap-2 whitespace-nowrap text-[14px] md:text-[16px]">
                <span className="font-[500] text-secondary">{flight.fromCode}</span>
                <span className="h-4 w-px shrink-0 bg-[#D7E0EC]" aria-hidden="true" />
                <span className="truncate font-[400] text-[#64748B]">{flight.fromCity}</span>
              </p>
            </div>

            <div className="flex min-w-0 items-center gap-2 text-primary md:gap-4">
              <span className="h-px flex-1 bg-primary/25" aria-hidden="true" />
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-primary/10 md:size-12">
                <Plane className="size-5 rotate-45" aria-hidden="true" />
              </span>
              <span className="h-px flex-1 bg-primary/25" aria-hidden="true" />
            </div>

            <div className="min-w-0 text-right">
              <p className="font-[var(--font-display)] text-[30px] font-[500] leading-none tracking-[-0.03em] text-secondary md:text-[40px]">{flight.arriveTime}</p>
              <p className="mt-3 flex min-w-0 items-center justify-end gap-2 whitespace-nowrap text-[14px] md:text-[16px]">
                <span className="font-[500] text-secondary">{flight.toCode}</span>
                <span className="h-4 w-px shrink-0 bg-[#D7E0EC]" aria-hidden="true" />
                <span className="truncate font-[400] text-[#64748B]">{flight.toCity}</span>
              </p>
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}

export default function BookReviewStep({messages, trip, selectedFlights, passengerDetails, modeTitle, price, deliveryDetails, onBack}) {
  const [completed, setCompleted] = useState(false)
  const fullName = formatPassengerName(passengerDetails || {})
  const delivery = deliveryDetails?.delivery || t(messages, 'book.summary.delivery')
  const scheduledDelivery = deliveryDetails?.deliveryDate && deliveryDetails?.deliveryTime
    ? `${deliveryDetails.deliveryDate} · ${deliveryDetails.deliveryTime}`
    : delivery

  return (
    <main className="min-h-[calc(100vh-68px)] bg-[#f4f7fb] text-[#0F172A]">
      <BookingStepper messages={messages} activeIndex={4} onBack={onBack} />
      <section className="mx-auto grid w-full max-w-[1180px] gap-10 px-5 pb-20 pt-12 md:px-8 md:pt-16 lg:grid-cols-[minmax(0,1fr)_390px] lg:gap-14">
        <div>
          <p className="text-[13px] font-[500] tracking-[0.01em] text-primary">Secure checkout</p>
          <h1 className="mt-4 font-[var(--font-display)] text-[30px] font-[500] leading-[1.08] tracking-[-0.03em] text-[#0F172A] md:text-[36px]">{t(messages, 'book.review.title')}</h1>
          <p className="mt-4 max-w-[560px] text-[14px] font-[400] leading-6 text-[#94A3B8]">{t(messages, 'book.review.subtitle')}</p>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <JourneyDetails messages={messages} trip={trip} modeTitle={modeTitle} />
            <section className="hidden rounded-2xl border border-[#E7EDF6] bg-white p-6 md:p-7">
              <div className="flex items-center gap-3">
                <span className="grid size-8 place-items-center rounded-full bg-[#EFF6FF] text-primary"><ShieldCheck className="size-4" aria-hidden="true" /></span>
                <h2 className="font-[var(--font-display)] text-[18px] font-[500] text-[#0F172A]">{t(messages, 'book.review.journey')}</h2>
              </div>
              <dl className="mt-5">
                <ReviewRow label={t(messages, 'book.review.route')}>
                  {trip.fromCity} ({trip.fromCode}) <ArrowRight className="mx-1 inline size-[13px]" aria-hidden="true" /> {trip.toCity} ({trip.toCode})
                </ReviewRow>
                <ReviewRow label={t(messages, 'book.review.dates')}>{trip.departDate}{trip.returnDate ? ` · ${trip.returnDate}` : ''}</ReviewRow>
                <ReviewRow label={t(messages, 'book.review.reservation')}>{modeTitle}</ReviewRow>
              </dl>
            </section>

            <section className="rounded-2xl border border-[#E7EDF6] bg-white p-6 md:p-7">
              <div className="flex items-center gap-3">
                <span className="grid size-8 place-items-center rounded-full bg-[#EFF6FF] text-primary"><Mail className="size-4" aria-hidden="true" /></span>
                <h2 className="font-[var(--font-display)] text-[18px] font-[500] text-[#0F172A]">{t(messages, 'book.review.passenger')}</h2>
              </div>
              <dl className="mt-5">
                <ReviewRow label={t(messages, 'book.review.name')}>{fullName}</ReviewRow>
                <ReviewRow label={t(messages, 'book.review.email')}>{passengerDetails?.email}</ReviewRow>
                <ReviewRow label={t(messages, 'book.review.nationality')}>{passengerDetails?.nationality}</ReviewRow>
              </dl>
            </section>

            <section className="pt-3 md:col-span-2">
              <div className="flex items-center gap-3">
                <span className="grid size-8 place-items-center rounded-full bg-[#EFF6FF] text-primary"><CreditCard className="size-4" aria-hidden="true" /></span>
                <h2 className="font-[var(--font-display)] text-[18px] font-[500] text-[#0F172A]">{t(messages, 'book.review.selectedFlight')}</h2>
              </div>
              <div className="mt-7"><FlightSummary messages={messages} flights={selectedFlights} /></div>
            </section>
          </div>
        </div>

        <aside className="lg:sticky lg:top-8">
          <div className="rounded-2xl border border-[#E7EDF6] bg-white p-7 md:p-8">
            <p className="font-[var(--font-display)] text-[18px] font-[500] text-[#0F172A]">{t(messages, 'book.review.paymentTitle')}</p>
            <p className="mt-4 font-[var(--font-display)] text-[38px] font-[500] leading-none tracking-[-0.03em] text-primary md:text-[42px]">{price}</p>

            <dl className="mt-8 border-y border-[#EEF2F7] py-1">
              <ReviewRow label={t(messages, 'book.review.reservation')}>{modeTitle}</ReviewRow>
              <ReviewRow label={t(messages, 'book.review.delivery')}>{scheduledDelivery}</ReviewRow>
            </dl>
            <div className="flex items-center justify-between gap-4 py-5">
              <span className="text-[14px] font-[500] text-[#0F172A]">{t(messages, 'book.review.total')}</span>
              <span className="text-[16px] font-[500] text-primary">{price}</span>
            </div>

            <div className="border-t border-[#EEF2F7] pt-6">
              <p className="font-[var(--font-display)] text-[18px] font-[500] text-[#0F172A]">{t(messages, 'book.review.paymentMethods')}</p>
              <div className="mt-4 flex flex-wrap gap-2 text-[13px] font-[500]">
                {['creditCard', 'applePay', 'googlePay', 'other'].map((method) => (
                  <span key={method} className={`inline-flex h-10 items-center rounded-lg border px-4 transition ${method === 'creditCard' ? 'border-primary bg-[#EFF6FF] text-primary' : 'border-[#E7EDF6] bg-white text-[#64748B]'}`}>
                    {t(messages, `book.review.methods.${method}`)}
                  </span>
                ))}
              </div>
            </div>

            {completed ? (
              <p className="mt-7 rounded-xl bg-success/10 px-4 py-3 text-[14px] font-[500] leading-5 text-success">{t(messages, 'book.review.paymentComplete')}</p>
            ) : (
              <button type="button" onClick={() => setCompleted(true)} className="mt-8 inline-flex h-[54px] w-full items-center justify-center gap-2 rounded-xl bg-primary text-[14px] font-[500] text-white transition hover:bg-primary/90">
                <Lock className="size-4" aria-hidden="true" />
                {t(messages, 'book.review.completePayment')}
              </button>
            )}
            <p className="mt-5 flex items-center justify-center gap-2 text-center text-[12px] font-[400] leading-4 text-[#94A3B8]"><Lock className="size-[13px] text-success" aria-hidden="true" /> {t(messages, 'book.review.secureNote')}</p>
          </div>
        </aside>
      </section>
    </main>
  )
}
