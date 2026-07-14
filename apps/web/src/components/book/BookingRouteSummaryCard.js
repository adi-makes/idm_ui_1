import {ArrowRight, Clock3, PlaneLanding, PlaneTakeoff} from 'lucide-react'
import {t} from '@/messages'

/**
 * Reusable visual route overview for booking steps that need trip context.
 * A duration can be supplied once a specific flight has been selected.
 */
export default function BookingRouteSummaryCard({
  messages,
  trip,
  duration,
  className = '',
}) {
  const arrivalDate = trip.returnDate || trip.departDate

  return (
    <section className={`w-full ${className}`}>
      <div className="overflow-hidden rounded-[6px] border border-[#E1E8F2] bg-white md:px-6 md:py-3">
        <div className="md:hidden">
          <div className="grid grid-cols-2 border-b border-[#E7EDF6]">
            <div className="flex min-w-0 items-center gap-3 border-r border-[#E7EDF6] px-4 py-4">
              <span className="grid size-10 shrink-0 place-items-center rounded-[10px] bg-[#F4F7FD] text-primary">
                <PlaneTakeoff className="size-[18px]" strokeWidth={1.7} aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <p className="text-[9px] font-[400] uppercase tracking-[0.1em] text-tertiary">{t(messages, 'book.choice.departure')}</p>
                <p className="mt-1 font-[var(--font-display)] text-[22px] font-[400] leading-none text-secondary">{trip.fromCode}</p>
                <p className="mt-1.5 truncate text-[12px] font-[400] text-muted">{trip.fromCity}</p>
              </div>
            </div>

            <div className="flex min-w-0 items-center justify-end gap-3 px-4 py-4">
              <div className="min-w-0 text-right">
                <p className="text-[9px] font-[400] uppercase tracking-[0.1em] text-tertiary">{t(messages, 'book.choice.arrival')}</p>
                <p className="mt-1 font-[var(--font-display)] text-[22px] font-[400] leading-none text-secondary">{trip.toCode}</p>
                <p className="mt-1.5 truncate text-[12px] font-[400] text-muted">{trip.toCity}</p>
              </div>
              <span className="grid size-10 shrink-0 place-items-center rounded-[10px] bg-[#F4F7FD] text-primary">
                <PlaneLanding className="size-[18px]" strokeWidth={1.7} aria-hidden="true" />
              </span>
            </div>
          </div>

          <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3 px-4 py-4 text-center text-[13px] font-[400] text-secondary">
            <span className="whitespace-nowrap text-left">{trip.departDate}</span>
            <span className="grid size-9 place-items-center rounded-full bg-[#F4F7FD] text-primary">
              <ArrowRight className="size-4" strokeWidth={1.7} aria-hidden="true" />
            </span>
            <span className="whitespace-nowrap text-right">{arrivalDate}</span>
          </div>
        </div>

        <div className="hidden gap-4 md:grid md:grid-cols-[minmax(0,1fr)_minmax(210px,0.9fr)_minmax(0,1fr)] md:items-center md:gap-5">
          <div className="flex min-w-0 items-center gap-4">
            <span className="grid size-9 shrink-0 place-items-center rounded-[10px] bg-[#F4F7FD] text-primary md:size-10">
              <PlaneTakeoff className="size-4 md:size-[18px]" strokeWidth={1.7} aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="text-[9px] font-[400] uppercase tracking-[0.1em] text-tertiary md:text-[10px]">{t(messages, 'book.choice.departure')}</p>
              <p className="mt-1 font-[var(--font-display)] text-[20px] font-[400] leading-none text-secondary md:text-[22px]">{trip.fromCode}</p>
              <p className="mt-1.5 truncate text-[11px] font-[400] text-muted md:text-[12px]">{trip.fromCity}</p>
            </div>
          </div>

          <div className="order-last min-w-0 md:order-none">
            <div className="flex items-center justify-between gap-2 text-center text-[12px] font-[400] text-muted md:text-[13px]">
              <span className="whitespace-nowrap">{trip.departDate}</span>
              <span className="grid size-7 shrink-0 place-items-center rounded-full bg-[#F4F7FD] text-primary md:size-8">
                <ArrowRight className="size-3.5" strokeWidth={1.7} aria-hidden="true" />
              </span>
              <span className="whitespace-nowrap">{arrivalDate}</span>
            </div>
            {duration ? (
              <div className="mt-2 flex items-center gap-2 text-[11px] font-[400] text-muted md:text-[12px]">
                <span className="h-px flex-1 bg-[#E1E8F2]" />
                <span className="flex items-center gap-1.5 whitespace-nowrap"><Clock3 className="size-4" strokeWidth={1.8} aria-hidden="true" />{duration}</span>
                <span className="h-px flex-1 bg-[#E1E8F2]" />
              </div>
            ) : null}
          </div>

          <div className="flex min-w-0 items-center justify-between gap-4 text-right md:justify-end">
            <div className="min-w-0">
              <p className="text-[9px] font-[400] uppercase tracking-[0.1em] text-tertiary md:text-[10px]">{t(messages, 'book.choice.arrival')}</p>
              <p className="mt-1 font-[var(--font-display)] text-[20px] font-[400] leading-none text-secondary md:text-[22px]">{trip.toCode}</p>
              <p className="mt-1.5 truncate text-[11px] font-[400] text-muted md:text-[12px]">{trip.toCity}</p>
            </div>
            <span className="grid size-9 shrink-0 place-items-center rounded-[10px] bg-[#F4F7FD] text-primary md:size-10">
              <PlaneLanding className="size-4 md:size-[18px]" strokeWidth={1.7} aria-hidden="true" />
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
