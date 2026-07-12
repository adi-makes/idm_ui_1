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
}) {
  const buttonProps = form
    ? {type: 'submit', form}
    : {type: 'button', onClick: onContinue}

  return (
    <footer className="fixed inset-x-0 bottom-0 z-30 border-t border-[#E7EDF6] bg-white px-5 py-2 md:px-[9.25vw] md:py-2.5">
      <div className={`mx-auto grid w-full max-w-[1560px] items-center gap-3 ${
        showPrice ? 'grid-cols-[auto_minmax(0,1fr)] md:grid-cols-[1fr_auto_auto] md:gap-8' : 'grid-cols-1 md:grid-cols-[1fr_auto] md:gap-8'
      }`}>
        <div className="hidden min-w-0 items-center gap-4 md:flex">
          <span className="grid size-10 shrink-0 place-items-center rounded-full bg-success/10 text-success">
            <ShieldCheck className="size-[16px]" aria-hidden="true" />
          </span>
          <span className="text-[15px] font-[500] text-secondary">{t(messages, 'book.summary.trusted')}</span>
        </div>

        {showPrice ? (
          <div className="min-w-0 text-left leading-tight md:text-right">
            <p className="text-[12px] font-[500] text-tertiary">{t(messages, 'book.summary.totalAmount')}</p>
            <p className="mt-1 font-[var(--font-display)] text-[26px] font-[500] text-secondary md:text-[30px]">{price}</p>
          </div>
        ) : null}

        <button
          {...buttonProps}
          disabled={continueDisabled}
          className="inline-flex h-[48px] w-full min-w-0 items-center justify-center rounded-[5px] bg-primary px-5 text-[14px] font-[500] text-white transition enabled:hover:bg-primary/90 disabled:cursor-not-allowed disabled:bg-surface-tint disabled:text-tertiary md:h-[56px] md:w-auto md:min-w-[236px]"
        >
          {t(messages, 'book.summary.continue')}
        </button>
      </div>
    </footer>
  )
}
