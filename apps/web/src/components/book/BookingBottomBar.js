import {ShieldCheck} from 'lucide-react'
import {t} from '@/messages'

/**
 * Shared fixed action bar for the middle stages of the booking flow.
 * The total is intentionally limited to reservation and flight selection.
 */
export default function BookingBottomBar({
  messages,
  onContinue,
  continueDisabled = false,
  form,
  showPrice = false,
  price,
  label,
}) {
  const buttonProps = form
    ? {type: 'submit', form}
    : {type: 'button', onClick: onContinue}

  return (
    <footer className="fixed inset-x-0 bottom-0 z-30 border-t border-[#E7EDF6] bg-white px-5 py-2 md:px-[9.25vw] md:py-2.5">
      <div className={`mx-auto grid w-full max-w-[1560px] items-center gap-3 ${
        showPrice ? 'grid-cols-[minmax(0,1fr)_auto] md:grid-cols-[1fr_auto_auto] md:gap-6' : 'grid-cols-1 md:grid-cols-[1fr_auto] md:gap-6'
      }`}>
        <div className="hidden min-w-0 items-center gap-3 md:flex">
          <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[#EFF6FF] text-primary">
            <ShieldCheck className="size-[15px]" strokeWidth={2} aria-hidden="true" />
          </span>
          <div className="min-w-0 leading-tight">
            <p className="text-[12px] font-[400] text-secondary">{t(messages, 'book.summary.secureCheckout')}</p>
            <p className="mt-1 text-[11px] font-[400] text-muted">{t(messages, 'book.summary.secureCheckoutDescription')}</p>
          </div>
        </div>

        {showPrice ? (
          <div className="min-w-0 text-left leading-tight md:text-right">
            <p className="text-[12px] font-[400] text-tertiary">{t(messages, 'book.summary.totalAmount')}</p>
            <p className="mt-0.5 font-[var(--font-display)] text-[21px] font-[400] text-secondary md:text-[24px]">{price}</p>
          </div>
        ) : null}

        <button
          {...buttonProps}
          disabled={continueDisabled}
          className="inline-flex h-[42px] w-full min-w-[124px] items-center justify-center rounded-[5px] bg-primary px-4 text-[13px] font-[500] text-white transition enabled:hover:bg-primary/90 disabled:cursor-not-allowed disabled:bg-surface-tint disabled:text-tertiary md:h-[48px] md:w-auto md:min-w-[224px]"
        >
          {label || t(messages, 'book.summary.continue')}
        </button>
      </div>
    </footer>
  )
}
