import {Plane} from 'lucide-react'

/**
 * Reusable, compact route overview for booking steps that need trip context.
 */
export default function BookingRouteSummaryCard({
  trip,
  title = 'Route summary',
  departureLabel = 'Departure',
  returnLabel = 'Return',
  className = '',
}) {
  const hasReturn = Boolean(trip.returnDate && trip.returnDate !== trip.departDate)

  return (
    <aside className={`w-full ${className}`}>
      <div className="rounded-[5px] border border-[#E7EDF6] bg-white p-6 md:p-7">
        <div className="flex items-center justify-between gap-3">
          <h2 className="font-[var(--font-display)] text-[18px] font-[500] text-[#0F172A]">{title}</h2>
          {hasReturn ? <span className="rounded-[5px] bg-[#EFF6FF] px-2.5 py-1 text-[11px] font-[500] text-primary">Round trip</span> : null}
        </div>

        <div className="mt-8 grid grid-cols-[1fr_minmax(76px,1fr)_1fr] items-center gap-3">
          <div>
            <p className="font-[var(--font-display)] text-[28px] font-[500] leading-none tracking-[-0.025em] text-[#0F172A]">{trip.fromCode}</p>
            <p className="mt-2 text-[13px] font-[400] text-[#64748B]">{trip.fromCity}</p>
          </div>
          <div className="relative grid h-8 place-items-center text-primary" aria-hidden="true">
            <span className="absolute left-0 right-0 top-1/2 border-t border-dashed border-[#BFD4E8]" />
            <Plane className="relative size-[18px] rotate-45 bg-white text-primary" />
          </div>
          <div className="text-right">
            <p className="font-[var(--font-display)] text-[28px] font-[500] leading-none tracking-[-0.025em] text-[#0F172A]">{trip.toCode}</p>
            <p className="mt-2 text-[13px] font-[400] text-[#64748B]">{trip.toCity}</p>
          </div>
        </div>

        <dl className="mt-7 border-y border-[#EEF2F7] py-1">
          <div className="flex items-center justify-between gap-4 py-3">
            <dt className="text-[12px] font-[400] text-[#64748B]">{departureLabel}</dt>
            <dd className="text-[12px] font-[500] text-[#334155]">{trip.departDate}</dd>
          </div>
          {hasReturn ? (
            <div className="flex items-center justify-between gap-4 border-t border-[#EEF2F7] py-3">
              <dt className="text-[12px] font-[400] text-[#64748B]">{returnLabel}</dt>
              <dd className="text-[12px] font-[500] text-[#334155]">{trip.returnDate}</dd>
            </div>
          ) : null}
        </dl>
      </div>
    </aside>
  )
}
