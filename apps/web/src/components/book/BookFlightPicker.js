'use client'

import {useEffect, useMemo, useRef, useState} from 'react'
import Image from 'next/image'
import {ArrowRight, ChevronDown, ChevronUp, Lock, ShieldCheck, Tag} from 'lucide-react'
import BookingStepper from '@/components/book/BookingStepper'
import {MOBILE_AUTO_ADVANCE_DELAY_MS, shouldAutoAdvanceOnMobile} from '@/components/book/mobileAutoAdvance'
import {capitalizePassengerText, formatPassengerName} from '@/components/book/passengerFormat'
import {t} from '@/messages'

const AIRLINE_LOGOS = {
  Emirates: '/airlineLogos/Emirates_logo.png',
  'Air India': '/airlineLogos/air_india_logo.png',
}

function AirlineLogo({airline}) {
  const src = AIRLINE_LOGOS[airline]

  if (!src) return <span className="text-[13px] font-[500] text-secondary">{airline}</span>

  return <Image src={src} alt={airline} width={90} height={24} className="h-[18px] w-auto max-w-[74px] object-contain object-left" />
}

function FlightSegment({flight, messages}) {
  return (
    <div className="px-3.5 py-4 md:px-5 md:py-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 flex-wrap items-center gap-x-2.5 gap-y-1">
          <AirlineLogo airline={flight.airline} />
          <span className="text-[14px] font-[500] text-secondary">{flight.airline}</span>
          <span className="text-[13px] font-[500] text-primary">{flight.flightNumber}</span>
        </div>
        <span className="rounded-full border border-primary/10 bg-primary/5 px-3 py-1 text-[12px] font-[700] text-primary">
          {flight.kind}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-[minmax(0,1fr)_72px_minmax(0,1fr)] items-center gap-3 md:grid-cols-[minmax(0,1fr)_82px_minmax(0,1fr)]">
        <div className="min-w-0">
          <div className="font-[var(--font-display)] text-[21px] font-[700] leading-none text-secondary md:text-[22px]">{flight.departTime}</div>
          <div className="mt-1 text-[15px] font-[800] leading-none text-secondary md:text-[16px]">{flight.fromCode}</div>
          <div className="mt-1 truncate text-[13px] font-[500] text-muted">{flight.fromCity}</div>
          <div className="mt-1 text-[12px] font-[500] text-tertiary">{flight.date}</div>
        </div>

        <div className="flex flex-col items-center text-center">
          <ArrowRight className="size-[18px] text-tertiary" aria-hidden="true" />
          <span className="mt-1 text-[12px] font-[500] text-muted">{flight.duration}</span>
          <span className="mt-0.5 text-[12px] font-[700] text-success">{t(messages, 'book.badges.nonstop')}</span>
        </div>

        <div className="min-w-0 text-right">
          <div className="font-[var(--font-display)] text-[21px] font-[700] leading-none text-secondary md:text-[22px]">{flight.arriveTime}</div>
          <div className="mt-1 text-[15px] font-[800] leading-none text-secondary md:text-[16px]">{flight.toCode}</div>
          <div className="mt-1 truncate text-[13px] font-[500] text-muted">{flight.toCity}</div>
          <div className="mt-1 text-[12px] font-[500] text-tertiary">{flight.date}</div>
        </div>
      </div>
    </div>
  )
}

function FlightOption({flights, selected, onSelect, messages}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={[
        'w-full overflow-hidden rounded-[8px] border bg-white text-left transition',
        selected ? 'border-primary' : 'border-border hover:border-primary/35',
      ].join(' ')}
    >
      {flights.map((flight, index) => (
        <div key={`${flight.airline}-${flight.flightNumber}-${flight.kind}`}>
          {index > 0 ? <div className="mx-4 h-px bg-border md:mx-5" aria-hidden="true" /> : null}
          <FlightSegment flight={flight} messages={messages} />
        </div>
      ))}
    </button>
  )
}

function SummaryFlightRow({flight}) {
  return (
    <div className="border-t border-border pt-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 flex-wrap items-center gap-x-2.5 gap-y-1">
          <AirlineLogo airline={flight.airline} />
          <span className="text-[14px] font-[500] text-secondary">{flight.airline}</span>
          <span className="text-[13px] font-[500] text-primary">{flight.flightNumber}</span>
        </div>
        <span className="rounded-full border border-primary/10 bg-primary/5 px-3 py-1 text-[12px] font-[500] text-primary">{flight.kind}</span>
      </div>

      <div className="mt-4 grid grid-cols-[1fr_72px_1fr] items-center gap-3">
        <div className="min-w-0">
          <div className="font-[var(--font-display)] text-[21px] font-[700] leading-none text-secondary">{flight.departTime}</div>
          <div className="mt-1 text-[15px] font-[800] leading-none text-secondary">{flight.fromCode}</div>
          <div className="mt-1 truncate text-[13px] font-[500] text-muted">{flight.fromCity}</div>
          <div className="mt-1 text-[12px] font-[500] text-tertiary">{flight.date}</div>
        </div>

        <div className="flex flex-col items-center text-center">
          <ArrowRight className="size-[17px] text-tertiary" aria-hidden="true" />
          <span className="mt-1 text-[12px] font-[500] text-muted">{flight.duration}</span>
        </div>

        <div className="min-w-0 text-right">
          <div className="font-[var(--font-display)] text-[21px] font-[700] leading-none text-secondary">{flight.arriveTime}</div>
          <div className="mt-1 text-[15px] font-[800] leading-none text-secondary">{flight.toCode}</div>
          <div className="mt-1 truncate text-[13px] font-[500] text-muted">{flight.toCity}</div>
          <div className="mt-1 text-[12px] font-[500] text-tertiary">{flight.date}</div>
        </div>
      </div>
    </div>
  )
}

function PassengerSummary({messages, passengerDetails}) {
  const hasTypedName = passengerDetails?.firstName?.trim() || passengerDetails?.lastName?.trim()
  const fullName = hasTypedName ? formatPassengerName(passengerDetails) : ''
  const nationality = capitalizePassengerText(passengerDetails?.nationality)
  const hasDetails = fullName || passengerDetails?.email || nationality

  if (!hasDetails) return null

  return (
    <div className="mt-4 border-t border-border pt-4">
      <h3 className="font-[var(--font-display)] text-[14px] font-[750] text-secondary">
        {t(messages, 'book.review.passenger')}
      </h3>
      <dl className="mt-3 grid gap-2 text-[12px] leading-5">
        {fullName ? (
          <div className="flex items-start justify-between gap-4">
            <dt className="font-[500] text-muted">{t(messages, 'book.review.name')}</dt>
            <dd className="text-right font-[650] text-secondary">{fullName}</dd>
          </div>
        ) : null}
        {passengerDetails?.email ? (
          <div className="flex items-start justify-between gap-4">
            <dt className="font-[500] text-muted">{t(messages, 'book.review.email')}</dt>
            <dd className="min-w-0 break-all text-right font-[650] text-secondary">{passengerDetails.email}</dd>
          </div>
        ) : null}
        {nationality ? (
          <div className="flex items-start justify-between gap-4">
            <dt className="font-[500] text-muted">{t(messages, 'book.review.nationality')}</dt>
            <dd className="text-right font-[650] text-secondary">{nationality}</dd>
          </div>
        ) : null}
      </dl>
    </div>
  )
}

export function BookingPreview({messages, trip, selectedFlights, passengerDetails, modeTitle, price, compact = false, className = ''}) {
  const hasSelection = selectedFlights.length > 0

  return (
    <aside className={`flex w-full justify-center lg:sticky lg:top-6 ${className}`}>
      <div className="w-full max-w-[420px] overflow-hidden rounded-[7px] border border-border bg-white">
        <div className="border-b border-[#EEF2F7] bg-white px-5 py-4 md:px-6 md:py-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[11px] font-[500] uppercase tracking-[0.08em] text-tertiary">{t(messages, 'book.summary.eyebrow')}</p>
              <h2 className="mt-1 text-[18px] font-[500] tracking-[-0.01em] text-secondary">{modeTitle || t(messages, 'book.summary.title')}</h2>
            </div>
            <span className="rounded-full bg-primary/5 px-3 py-1 text-[11px] font-[500] uppercase text-primary">{trip.type}</span>
          </div>
        </div>

        <div className="grid grid-cols-[1fr_44px_1fr] items-start gap-3 px-5 py-5 md:grid-cols-[1fr_48px_1fr] md:px-6 md:py-6">
          <div className="min-w-0">
            <div className="text-[26px] font-[500] leading-none tracking-[-0.025em] text-secondary md:text-[28px]">{trip.fromCode}</div>
            <div className="mt-2 text-[13px] font-[400] text-tertiary">{trip.departDate}</div>
          </div>

          <div className="mt-1 grid place-items-center pt-2">
            <ArrowRight className="size-[17px] text-tertiary" aria-hidden="true" />
          </div>

          <div className="min-w-0 text-right">
            <div className="text-[26px] font-[500] leading-none tracking-[-0.025em] text-secondary md:text-[28px]">{trip.toCode}</div>
            <div className="mt-2 text-[13px] font-[400] text-tertiary">{trip.returnDate || trip.departDate}</div>
          </div>
        </div>

        {hasSelection ? (
          <div className="space-y-4 px-5 pb-5 md:px-6">
            {selectedFlights.map((flight) => (
              <SummaryFlightRow key={`${flight.airline}-${flight.flightNumber}-${flight.kind}`} flight={flight} />
            ))}
          </div>
        ) : (
          <div className="mx-6 mb-5 rounded-[5px] border border-dashed border-border-strong bg-surface-muted px-4 py-3 text-center text-[13px] font-[600] leading-5 text-muted">
            {t(messages, 'book.summary.selectPrompt')}
          </div>
        )}

        <div className="border-t border-border px-5 py-4 md:px-6">
          <p className="text-[11px] font-[800] uppercase tracking-[0.08em] text-tertiary">{t(messages, 'book.summary.deliveryLabel')}</p>
          <p className="mt-2 text-[14px] font-[600] text-secondary">{t(messages, 'book.summary.delivery')}</p>
        </div>

        {!compact ? (
          <div className="border-t border-border px-6 py-5">
            <p className="text-[11px] font-[800] uppercase tracking-[0.08em] text-tertiary">{t(messages, 'book.summary.priceBreakdown')}</p>
            <div className="mt-3 flex items-center justify-between text-[14px] text-muted">
              <span>{t(messages, 'book.pricing.flight')}</span>
              <span className="font-[600] text-secondary">{price}</span>
            </div>
            <button type="button" className="mt-4 flex h-[46px] w-full items-center justify-center gap-2 rounded-[5px] border border-primary text-[14px] font-[700] text-primary transition hover:bg-primary hover:text-white">
              <Tag className="size-[15px]" aria-hidden="true" />
              {t(messages, 'book.summary.coupon')}
            </button>
            <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
              <span className="font-[var(--font-display)] text-[18px] font-[800] text-secondary">{t(messages, 'book.summary.total')}</span>
              <span className="font-[var(--font-display)] text-[20px] font-[800] text-primary">{price}</span>
            </div>
          </div>
        ) : null}

        {!compact ? <PassengerSummary messages={messages} passengerDetails={passengerDetails} /> : null}

        {!compact ? (
          <div className="grid grid-cols-2 border-t border-border text-[13px] font-[700] text-secondary">
            <div className="flex items-center justify-center gap-2 border-r border-border px-3 py-3">
              <ShieldCheck className="size-[16px] text-success" aria-hidden="true" />
              {t(messages, 'book.summary.secure')}
            </div>
            <div className="flex items-center justify-center gap-2 px-3 py-3">
              <Lock className="size-[16px] text-primary" aria-hidden="true" />
              {t(messages, 'book.summary.verified')}
            </div>
          </div>
        ) : null}
      </div>
    </aside>
  )
}

export function MobileOrderDetailsPanel({messages, trip, selectedFlights, passengerDetails, modeTitle, price, open, children}) {
  return (
    <div className="lg:hidden">
      {open ? (
        <div className="fixed inset-x-0 bottom-[79px] top-[64px] z-[10000] overflow-y-auto bg-[#f4f7fb] px-5 py-6 min-[700px]:top-[114px] lg:hidden">
          <div className="mx-auto w-full max-w-[420px]">
            <h2 className="font-[var(--font-display)] text-[24px] font-[750] leading-tight text-secondary">
              {t(messages, 'book.summary.orderDetails')}
            </h2>
            {children || <BookingPreview messages={messages} trip={trip} selectedFlights={selectedFlights} passengerDetails={passengerDetails} modeTitle={modeTitle} price={price} className="mt-5" />}
          </div>
        </div>
      ) : null}
    </div>
  )
}

export function MobileOrderDetails({messages, open, onToggle}) {
  const ToggleIcon = open ? ChevronDown : ChevronUp

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={open}
      className="inline-flex items-center gap-1.5 text-left text-[13px] font-[500] leading-none text-muted transition hover:text-primary lg:hidden"
    >
      <span>{t(messages, 'book.summary.orderDetails')}</span>
      <ToggleIcon className="size-[14px] shrink-0" aria-hidden="true" />
    </button>
  )
}

export default function BookFlightPicker({messages, trip, flights, onBack, onContinue}) {
  const [selectedPairIndex, setSelectedPairIndex] = useState(null)
  const [showOrderDetails, setShowOrderDetails] = useState(false)
  const [autoAdvancing, setAutoAdvancing] = useState(false)
  const autoAdvanceTimerRef = useRef(null)
  const flightPairs = useMemo(() => {
    const pairs = []
    const step = trip.tripType === 'return' ? 2 : 1
    for (let index = 0; index < flights.length; index += step) {
      pairs.push(flights.slice(index, index + step))
    }
    return pairs
  }, [flights, trip.tripType])
  const selectedFlights = useMemo(() => {
    if (selectedPairIndex === null) return []
    return flightPairs[selectedPairIndex] || []
  }, [flightPairs, selectedPairIndex])
  const standardTitle = t(messages, 'book.choice.options.standard.title')
  const standardPrice = t(messages, 'book.choice.options.standard.price')

  useEffect(() => () => window.clearTimeout(autoAdvanceTimerRef.current), [])

  const handleSelectFlights = (pairIndex, pair) => {
    if (autoAdvancing) return

    setSelectedPairIndex(pairIndex)

    if (shouldAutoAdvanceOnMobile()) {
      setAutoAdvancing(true)
      setShowOrderDetails(false)
      autoAdvanceTimerRef.current = window.setTimeout(() => onContinue?.(pair, standardPrice, standardTitle), MOBILE_AUTO_ADVANCE_DELAY_MS)
    }
  }

  return (
    <main className="min-h-screen bg-[#f4f7fb] text-secondary">
      <BookingStepper messages={messages} activeIndex={3} onBack={onBack} />

      <section className="mx-auto grid w-full max-w-[1220px] gap-6 px-5 pb-24 pt-7 md:px-8 md:pt-8 lg:grid-cols-[minmax(0,1fr)_390px] lg:items-start">
        <div className="min-w-0 lg:max-w-[820px]">
          <div className="w-full max-w-[820px] text-center">
            <div className="mx-auto w-full">
              <h1 className="font-[var(--font-display)] text-[30px] font-[750] leading-tight text-secondary md:text-[38px]">
                {t(messages, 'book.flight.title')}
              </h1>
              <p className="mx-auto mt-2 max-w-[560px] text-[15px] leading-7 text-muted">{t(messages, 'book.flight.subtitle')}</p>
            </div>
          </div>

          <div className="mt-5 grid gap-4">
            {flightPairs.map((pair, pairIndex) => (
              <FlightOption
                key={pair.map((flight) => `${flight.airline}-${flight.flightNumber}`).join('-')}
                flights={pair}
                selected={selectedPairIndex === pairIndex}
                onSelect={() => handleSelectFlights(pairIndex, pair)}
                messages={messages}
              />
            ))}
          </div>
        </div>

        <BookingPreview messages={messages} trip={trip} selectedFlights={selectedFlights} modeTitle={standardTitle} price={standardPrice} className="hidden lg:flex" />
      </section>

      <MobileOrderDetailsPanel messages={messages} trip={trip} selectedFlights={selectedFlights} modeTitle={standardTitle} price={standardPrice} open={showOrderDetails} />

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-white/95 px-5 py-4 backdrop-blur">
        <div className="mx-auto grid w-full max-w-[1220px] grid-cols-[auto_1fr] items-center gap-3 md:flex md:justify-between md:gap-4">
          <MobileOrderDetails
            messages={messages}
            open={showOrderDetails}
            onToggle={() => setShowOrderDetails((current) => !current)}
          />
          <button
            type="button"
            disabled={selectedPairIndex === null || autoAdvancing}
            onClick={() => {
              if (selectedFlights.length > 0) onContinue?.(selectedFlights, standardPrice, standardTitle)
            }}
            className="ml-auto inline-flex h-[48px] w-full min-w-0 items-center justify-center gap-2 rounded-[5px] bg-primary px-6 text-[15px] font-[700] text-white transition enabled:hover:bg-primary/90 disabled:cursor-not-allowed disabled:bg-surface-tint disabled:text-tertiary md:w-auto md:min-w-[158px] md:px-7"
          >
            {t(messages, 'book.summary.continue')}
          </button>
        </div>
      </div>
    </main>
  )
}
