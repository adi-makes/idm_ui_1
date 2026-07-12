'use client'

import {useState} from 'react'
import {ArrowRight, CreditCard, Info, Lock, Mail, ShieldCheck} from 'lucide-react'
import BookingStepper from '@/components/book/BookingStepper'
import FlightRecommendationCard from '@/components/book/FlightRecommendationCard'
import {formatPassengerName} from '@/components/book/passengerFormat'
import {t} from '@/messages'

function ReviewRow({label, children}) {
  return (
    <div className="flex items-start justify-between gap-5 border-b border-[#EEF2F7] py-2.5 last:border-b-0">
      <dt className="text-[12px] font-[400] text-[#64748B]">{label}</dt>
      <dd className="max-w-[68%] text-right text-[12px] font-[500] leading-4 text-[#334155]">{children}</dd>
    </div>
  )
}

function JourneyDetails({messages, trip, modeTitle}) {
  return (
    <section className="rounded-[5px] border border-[#E7EDF6] bg-white p-5">
      <div className="flex items-center gap-2.5">
        <span className="grid size-7 place-items-center rounded-full bg-[#EFF6FF] text-primary"><ShieldCheck className="size-[14px]" aria-hidden="true" /></span>
        <h2 className="font-[var(--font-display)] text-[17px] font-[500] text-[#0F172A]">{t(messages, 'book.review.journey')}</h2>
      </div>

      <div className="mt-4 grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3">
        <div className="min-w-0">
          <p className="text-[11px] font-[400] text-[#64748B]">{t(messages, 'book.choice.departure')}</p>
          <p className="mt-1 text-[20px] font-[500] leading-none tracking-[-0.02em] text-[#0F172A]">{trip.fromCode}</p>
          <p className="mt-1 truncate text-[12px] font-[400] text-[#64748B]">{trip.fromCity}</p>
        </div>
        <ArrowRight className="size-4 text-tertiary" aria-hidden="true" />
        <div className="min-w-0 text-right">
          <p className="text-[11px] font-[400] text-[#64748B]">{t(messages, 'book.choice.arrival')}</p>
          <p className="mt-1 text-[20px] font-[500] leading-none tracking-[-0.02em] text-[#0F172A]">{trip.toCode}</p>
          <p className="mt-1 truncate text-[12px] font-[400] text-[#64748B]">{trip.toCity}</p>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-4 border-t border-[#EEF2F7] pt-2.5 text-[11px] font-[400] text-[#64748B]">
        <span className="whitespace-nowrap">{trip.departDate}</span>
        {trip.returnDate ? <span className="whitespace-nowrap text-right">{trip.returnDate}</span> : null}
      </div>

      <div className="mt-3 flex items-center justify-between gap-4 text-[12px]">
        <span className="font-[400] text-[#64748B]">{t(messages, 'book.review.reservation')}</span>
        <span title={modeTitle} className="max-w-[58%] truncate text-right font-[500] text-[#334155]">{modeTitle}</span>
      </div>
    </section>
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
      <section className="mx-auto grid w-full max-w-[1280px] gap-8 px-5 pb-12 pt-8 md:px-8 md:pt-10 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-10">
        <div>
          <h1 className="font-[var(--font-display)] text-[28px] font-[500] leading-[1.1] tracking-[-0.03em] text-secondary md:text-[32px]">{t(messages, 'book.review.title')}</h1>
          <p className="mt-2 max-w-[560px] text-[13px] font-[400] leading-5 text-muted">{t(messages, 'book.review.subtitle')}</p>

          <div className="mt-7 grid gap-4 md:grid-cols-2">
            <JourneyDetails messages={messages} trip={trip} modeTitle={modeTitle} />

            <section className="rounded-[5px] border border-[#E7EDF6] bg-white p-5">
              <div className="flex items-center gap-2.5">
                <span className="grid size-7 place-items-center rounded-full bg-[#EFF6FF] text-primary"><Mail className="size-[14px]" aria-hidden="true" /></span>
                <h2 className="font-[var(--font-display)] text-[17px] font-[500] text-[#0F172A]">{t(messages, 'book.review.passenger')}</h2>
              </div>
              <dl className="mt-3">
                <ReviewRow label={t(messages, 'book.review.name')}>{fullName}</ReviewRow>
                <ReviewRow label={t(messages, 'book.review.email')}>{passengerDetails?.email}</ReviewRow>
                <ReviewRow label={t(messages, 'book.review.nationality')}>{passengerDetails?.nationality}</ReviewRow>
              </dl>
            </section>
          </div>

          <section className="mt-5">
            <div className="flex items-center gap-2.5">
              <span className="grid size-7 place-items-center rounded-full bg-[#EFF6FF] text-primary"><CreditCard className="size-[14px]" aria-hidden="true" /></span>
              <h2 className="font-[var(--font-display)] text-[17px] font-[500] text-[#0F172A]">{t(messages, 'book.review.selectedFlight')}</h2>
            </div>
            <div className="mt-3">
              {selectedFlights.length ? (
                <FlightRecommendationCard messages={messages} flights={selectedFlights} selected />
              ) : (
                <div className="flex items-center gap-3 rounded-[5px] border border-[#E7EDF6] bg-white px-5 py-4 text-[14px] font-[400] leading-6 text-[#64748B]">
                  <Info className="size-4 shrink-0 text-primary" aria-hidden="true" />
                  {t(messages, 'book.review.manualReservation')}
                </div>
              )}
            </div>
          </section>
        </div>

        <aside className="lg:sticky lg:top-6">
          <div className="rounded-[5px] border border-[#E7EDF6] bg-white p-5 md:p-6">
            <p className="font-[var(--font-display)] text-[17px] font-[500] text-[#0F172A]">{t(messages, 'book.review.paymentTitle')}</p>
            <p className="mt-3 font-[var(--font-display)] text-[34px] font-[500] leading-none tracking-[-0.03em] text-primary md:text-[38px]">{price}</p>

            <dl className="mt-6 border-y border-[#EEF2F7] py-0.5">
              <ReviewRow label={t(messages, 'book.review.reservation')}>{modeTitle}</ReviewRow>
              <ReviewRow label={t(messages, 'book.review.delivery')}>{scheduledDelivery}</ReviewRow>
            </dl>
            <div className="flex items-center justify-between gap-4 py-4">
              <span className="text-[13px] font-[500] text-[#0F172A]">{t(messages, 'book.review.total')}</span>
              <span className="text-[15px] font-[500] text-primary">{price}</span>
            </div>

            <div className="border-t border-[#EEF2F7] pt-4">
              <p className="font-[var(--font-display)] text-[17px] font-[500] text-[#0F172A]">{t(messages, 'book.review.paymentMethods')}</p>
              <div className="mt-3 flex flex-wrap gap-2 text-[12px] font-[500]">
                {['creditCard', 'applePay', 'googlePay', 'other'].map((method) => (
                  <span key={method} className={`inline-flex h-9 items-center rounded-[5px] border px-3.5 transition ${method === 'creditCard' ? 'border-primary bg-[#EFF6FF] text-primary' : 'border-[#E7EDF6] bg-white text-[#64748B]'}`}>
                    {t(messages, `book.review.methods.${method}`)}
                  </span>
                ))}
              </div>
            </div>

            {completed ? (
              <p className="mt-5 rounded-[5px] bg-success/10 px-4 py-3 text-[13px] font-[500] leading-5 text-success">{t(messages, 'book.review.paymentComplete')}</p>
            ) : (
              <button type="button" onClick={() => setCompleted(true)} className="mt-6 inline-flex h-[50px] w-full items-center justify-center rounded-[5px] bg-primary text-[14px] font-[500] text-white transition hover:bg-primary/90">
                {t(messages, 'book.review.completePayment')}
              </button>
            )}
            <p className="mt-4 flex items-center justify-center gap-2 text-center text-[11px] font-[400] leading-4 text-[#94A3B8]"><Lock className="size-[13px] text-success" aria-hidden="true" /> {t(messages, 'book.review.secureNote')}</p>
          </div>
        </aside>
      </section>

    </main>
  )
}
