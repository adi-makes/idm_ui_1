'use client'

import {useMemo, useState} from 'react'
import Link from 'next/link'
import {ArrowRight} from 'lucide-react'
import BookingStepper from '@/components/book/BookingStepper'
import {localizedPath} from '@/i18n/routing'
import {t} from '@/messages'

function AirlineMark({airline}) {
  const shortName = airline === 'Air India' ? 'AIR INDIA' : airline.toUpperCase()

  return (
    <span className="shrink-0 text-[9px] font-[900] uppercase tracking-normal text-[#e11d48]">
      {shortName}
    </span>
  )
}

function FlightSegment({flight, messages}) {
  return (
    <div className="p-3 md:p-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 flex-wrap items-baseline gap-x-2.5 gap-y-1">
          <AirlineMark airline={flight.airline} />
          <span className="font-[var(--font-display)] text-[13px] font-[800] text-secondary">{flight.airline}</span>
          <span className="text-[12px] font-[500] text-tertiary">{flight.flightNumber}</span>
        </div>
        <span className="rounded-[5px] bg-surface-muted px-2.5 py-1 text-[10px] font-[800] text-secondary">
          {flight.kind}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-[1fr_72px_1fr] items-center gap-3">
        <div className="min-w-0">
          <div className="font-[var(--font-display)] text-[21px] font-[800] leading-none text-secondary">{flight.departTime}</div>
          <div className="mt-1 text-[15px] font-[800] leading-none text-secondary">{flight.fromCode}</div>
          <div className="mt-1 truncate text-[12px] font-[550] text-muted">{flight.fromCity}</div>
          <div className="mt-1 text-[11px] font-[500] text-tertiary">{flight.date}</div>
        </div>

        <div className="flex flex-col items-center text-center">
          <ArrowRight className="size-[17px] text-tertiary" aria-hidden="true" />
          <span className="mt-1 text-[11px] font-[650] text-muted">{flight.duration}</span>
          <span className="mt-0.5 text-[10px] font-[700] text-success">{t(messages, 'book.badges.nonstop')}</span>
        </div>

        <div className="min-w-0 text-right">
          <div className="font-[var(--font-display)] text-[21px] font-[800] leading-none text-secondary">{flight.arriveTime}</div>
          <div className="mt-1 text-[15px] font-[800] leading-none text-secondary">{flight.toCode}</div>
          <div className="mt-1 truncate text-[12px] font-[550] text-muted">{flight.toCity}</div>
          <div className="mt-1 text-[11px] font-[500] text-tertiary">{flight.date}</div>
        </div>
      </div>
    </div>
  )
}

function FlightOption({flights, selected, onSelect, messages}) {
  const [onwardFlight, returnFlight] = flights

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={[
        'w-full overflow-hidden rounded-[6px] border bg-white text-left transition',
        selected ? 'border-primary shadow-[0_10px_28px_rgba(11,99,246,0.09)]' : 'border-border hover:border-primary/45',
      ].join(' ')}
    >
      <FlightSegment flight={onwardFlight} messages={messages} />
      <div className="mx-4 h-px bg-border md:mx-5" aria-hidden="true" />
      <FlightSegment flight={returnFlight} messages={messages} />
    </button>
  )
}

function SummaryFlightRow({flight}) {
  return (
    <div className="border-t border-border pt-3.5">
      <div className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 flex-wrap items-baseline gap-x-2.5 gap-y-1">
          <AirlineMark airline={flight.airline} />
          <span className="font-[var(--font-display)] text-[13px] font-[800] text-secondary">{flight.airline}</span>
          <span className="text-[12px] font-[500] text-tertiary">{flight.flightNumber}</span>
        </div>
        <span className="rounded-[5px] bg-surface-muted px-2.5 py-1 text-[11px] font-[500] text-secondary">{flight.kind}</span>
      </div>

      <div className="mt-3.5 grid grid-cols-[1fr_66px_1fr] items-center gap-3">
        <div className="min-w-0">
          <div className="font-[var(--font-display)] text-[19px] font-[800] leading-none text-secondary">{flight.departTime}</div>
          <div className="mt-1 text-[15px] font-[800] leading-none text-secondary">{flight.fromCode}</div>
          <div className="mt-0.5 truncate text-[12px] font-[600] text-secondary">{flight.fromCity}</div>
          <div className="mt-1 text-[11px] font-[500] text-tertiary">{flight.date}</div>
        </div>

        <div className="flex flex-col items-center text-center">
          <ArrowRight className="size-[17px] text-tertiary" aria-hidden="true" />
          <span className="mt-1 text-[11px] font-[500] text-muted">{flight.duration}</span>
        </div>

        <div className="min-w-0 text-right">
          <div className="font-[var(--font-display)] text-[19px] font-[800] leading-none text-secondary">{flight.arriveTime}</div>
          <div className="mt-1 text-[15px] font-[800] leading-none text-secondary">{flight.toCode}</div>
          <div className="mt-0.5 truncate text-[12px] font-[600] text-secondary">{flight.toCity}</div>
          <div className="mt-1 text-[11px] font-[500] text-tertiary">{flight.date}</div>
        </div>
      </div>
    </div>
  )
}

export function BookingPreview({messages, selectedFlights}) {
  const hasSelection = selectedFlights.length > 0

  return (
    <aside className="flex w-full justify-center lg:sticky lg:top-6">
      <div className="w-full max-w-[420px] rounded-[5px] bg-white p-4 shadow-[0_8px_22px_rgba(15,23,42,0.035)]">
        <span className="inline-flex rounded-[3px] bg-surface-muted px-3 py-1.5 text-[11px] font-[500] text-secondary">
          {t(messages, 'book.trip.type')}
        </span>

        <div className="mt-4 grid grid-cols-[1fr_38px_1fr] items-start gap-3">
          <div className="min-w-0">
            <div className="font-[var(--font-display)] text-[18px] font-[800] leading-none text-secondary">{t(messages, 'book.trip.fromCode')}</div>
            <div className="mt-2 text-[12px] font-[500] text-muted">{t(messages, 'book.trip.fromCity')}</div>
            <div className="mt-2 text-[11px] font-[500] text-tertiary">{t(messages, 'book.trip.departDate')}</div>
          </div>

          <div className="mt-1 grid place-items-center">
            <ArrowRight className="size-[17px] text-tertiary" aria-hidden="true" />
          </div>

          <div className="min-w-0 text-right">
            <div className="font-[var(--font-display)] text-[18px] font-[800] leading-none text-secondary">{t(messages, 'book.trip.toCode')}</div>
            <div className="mt-2 text-[12px] font-[500] text-muted">{t(messages, 'book.trip.toCity')}</div>
            <div className="mt-2 text-[11px] font-[500] text-tertiary">{t(messages, 'book.trip.returnDate')}</div>
          </div>
        </div>

        {hasSelection ? (
          <div className="mt-4 space-y-3.5">
            {selectedFlights.map((flight) => (
              <SummaryFlightRow key={`${flight.airline}-${flight.flightNumber}-${flight.kind}`} flight={flight} />
            ))}
          </div>
        ) : (
          <div className="mt-4 rounded-[5px] border border-dashed border-border-strong bg-surface-muted px-4 py-3 text-center text-[12px] font-[600] leading-5 text-muted">
            {t(messages, 'book.summary.selectPrompt')}
          </div>
        )}
      </div>
    </aside>
  )
}

export default function BookFlightPicker({locale, messages, onBack, onContinue}) {
  const flights = messages.book.flights
  const [selectedPairIndex, setSelectedPairIndex] = useState(null)
  const flightPairs = useMemo(() => {
    const pairs = []
    for (let index = 0; index < flights.length; index += 2) {
      pairs.push(flights.slice(index, index + 2))
    }
    return pairs
  }, [flights])
  const selectedFlights = useMemo(() => {
    if (selectedPairIndex === null) return []
    const start = selectedPairIndex * 2
    return flights.slice(start, start + 2)
  }, [flights, selectedPairIndex])

  return (
    <main className="min-h-screen bg-[#f4f7fb] text-secondary">
        <BookingStepper messages={messages} activeIndex={1} />

      <section className="mx-auto grid w-full max-w-[1220px] gap-6 px-5 pb-24 pt-5 md:px-8 md:pt-6 lg:grid-cols-[390px_minmax(0,1fr)] lg:items-start">
        <BookingPreview messages={messages} selectedFlights={selectedFlights} />

        <div className="min-w-0">
          <div className="max-w-[620px]">
            <h1 className="font-[var(--font-display)] text-[26px] font-[750] leading-tight text-secondary md:text-[32px]">
              {t(messages, 'book.title')}
            </h1>
            <p className="mt-2 max-w-[520px] text-[13px] leading-6 text-muted">{t(messages, 'book.subtitle')}</p>
          </div>

          <div className="mt-5 grid gap-3">
            {flightPairs.map((pair, pairIndex) => (
              <FlightOption
                key={pair.map((flight) => `${flight.airline}-${flight.flightNumber}`).join('-')}
                flights={pair}
                selected={selectedPairIndex === pairIndex}
                onSelect={() => setSelectedPairIndex(pairIndex)}
                messages={messages}
              />
            ))}
          </div>
        </div>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-white/95 px-5 py-4 backdrop-blur">
        <div className="mx-auto flex w-full max-w-[1220px] items-center justify-between gap-4">
          {onBack ? (
            <button
              type="button"
              onClick={onBack}
              className="inline-flex h-[46px] items-center justify-center gap-2 rounded-[5px] border border-border-strong px-5 text-[13px] font-[500] text-secondary transition hover:border-primary hover:text-primary"
            >
              {t(messages, 'book.summary.back')}
            </button>
          ) : (
            <Link
              href={localizedPath(locale, '/book')}
              className="inline-flex h-[46px] items-center justify-center gap-2 rounded-[5px] border border-border-strong px-5 text-[13px] font-[500] text-secondary transition hover:border-primary hover:text-primary"
            >
              {t(messages, 'book.summary.back')}
            </Link>
          )}
          <button
            type="button"
            disabled={selectedPairIndex === null}
            onClick={() => {
              if (selectedFlights.length > 0) onContinue?.(selectedFlights)
            }}
            className="inline-flex h-[46px] min-w-[142px] items-center justify-center gap-2 rounded-[5px] bg-primary px-6 text-[14px] font-[500] text-white transition enabled:hover:bg-primary/90 disabled:cursor-not-allowed disabled:bg-surface-tint disabled:text-tertiary"
          >
            {t(messages, 'book.summary.continue')}
          </button>
        </div>
      </div>
    </main>
  )
}
