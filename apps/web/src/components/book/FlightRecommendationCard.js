import Image from 'next/image'
import {ArrowRight} from 'lucide-react'
import {t} from '@/messages'

const AIRLINE_LOGOS = {
  Emirates: '/airlineLogos/Emirates_logo.png',
  'Air India': '/airlineLogos/air_india_logo.png',
}

export function AirlineLogo({airline}) {
  const src = AIRLINE_LOGOS[airline]

  if (!src) return <span className="text-[13px] font-[400] text-secondary">{airline}</span>

  return <Image src={src} alt={airline} width={90} height={24} className="h-[18px] w-auto max-w-[74px] object-contain object-left" />
}

function FlightSegment({flight, messages}) {
  return (
    <div className="px-3.5 py-4 md:px-5 md:py-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 flex-wrap items-center gap-x-2.5 gap-y-1">
          <AirlineLogo airline={flight.airline} />
          <span className="text-[14px] font-[400] text-secondary">{flight.airline}</span>
          <span className="text-[13px] font-[400] text-primary">{flight.flightNumber}</span>
        </div>
        <span className="rounded-[5px] border border-primary/10 bg-primary/5 px-3 py-1 text-[12px] font-[400] text-primary">
          {flight.kind}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-[minmax(0,1fr)_72px_minmax(0,1fr)] items-center gap-3 md:grid-cols-[minmax(0,1fr)_82px_minmax(0,1fr)]">
        <div className="min-w-0">
          <div className="font-[var(--font-display)] text-[21px] font-[400] leading-none text-secondary md:text-[22px]">{flight.departTime}</div>
          <div className="mt-1 text-[15px] font-[400] leading-none text-secondary md:text-[16px]">{flight.fromCode}</div>
          <div className="mt-1 truncate text-[13px] font-[400] text-muted">{flight.fromCity}</div>
          <div className="mt-1 text-[12px] font-[400] text-tertiary">{flight.date}</div>
        </div>

        <div className="flex flex-col items-center text-center">
          <ArrowRight className="size-[18px] text-tertiary" aria-hidden="true" />
          <span className="mt-1 text-[12px] font-[400] text-muted">{flight.duration}</span>
          <span className="mt-0.5 text-[12px] font-[400] text-success">{t(messages, 'book.badges.nonstop')}</span>
        </div>

        <div className="min-w-0 text-right">
          <div className="font-[var(--font-display)] text-[21px] font-[400] leading-none text-secondary md:text-[22px]">{flight.arriveTime}</div>
          <div className="mt-1 text-[15px] font-[400] leading-none text-secondary md:text-[16px]">{flight.toCode}</div>
          <div className="mt-1 truncate text-[13px] font-[400] text-muted">{flight.toCity}</div>
          <div className="mt-1 text-[12px] font-[400] text-tertiary">{flight.date}</div>
        </div>
      </div>
    </div>
  )
}

/** Paired flight itinerary card shared by flight selection and checkout review. */
export default function FlightRecommendationCard({messages, flights, selected = false, onSelect, className = ''}) {
  const Card = onSelect ? 'button' : 'div'
  const interactiveProps = onSelect
    ? {type: 'button', onClick: onSelect, 'aria-pressed': selected}
    : {}

  return (
    <Card
      {...interactiveProps}
      className={`w-full overflow-hidden rounded-[5px] border bg-white text-left ${
        selected ? 'border-primary' : 'border-border'
      } ${onSelect ? 'transition hover:border-primary/35' : ''} ${className}`}
    >
      {flights.map((flight, index) => (
        <div key={`${flight.airline}-${flight.flightNumber}-${flight.kind}`}>
          {index > 0 ? <div className="mx-4 h-px bg-border md:mx-5" aria-hidden="true" /> : null}
          <FlightSegment flight={flight} messages={messages} />
        </div>
      ))}
    </Card>
  )
}
