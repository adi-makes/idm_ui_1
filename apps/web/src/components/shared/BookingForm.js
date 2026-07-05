'use client'

import {useEffect, useState} from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {Globe2, Lock, ShieldCheck} from 'lucide-react'
import DateInput from '@/components/shared/DateInput'
import LocationInput from '@/components/shared/LocationInput'
import {localizedPath} from '@/i18n/routing'
import {getMessages, t} from '@/messages'

const TRIP_TYPES = [
  {value: 'onward', labelKey: 'home.form.onward'},
  {value: 'return', labelKey: 'home.form.return'},
]

const BOOKING_STORAGE_KEY = 'idt.booking.search'
const BOOKING_STEP_STORAGE_KEY = 'idt.booking.step'

export default function BookingForm({locale, onSubmit}) {
  const messages = getMessages(locale)
  const [form, setForm] = useState({
    from: '',
    to: '',
    departure: '',
    arrival: '',
  })
  const [activePopup, setActivePopup] = useState(null)
  const [tripType, setTripType] = useState('return')
  const [errors, setErrors] = useState({})
  const [showPopup, setShowPopup] = useState(false)
  const returnDateDisabled = tripType === 'onward' || !form.departure

  useEffect(() => {
    try {
      const saved = window.sessionStorage.getItem(BOOKING_STORAGE_KEY)
      if (!saved) return

      const parsed = JSON.parse(saved)
      setForm({
        from: parsed.from || '',
        to: parsed.to || '',
        departure: parsed.departure || '',
        arrival: parsed.arrival || '',
      })
      setTripType(parsed.tripType === 'onward' ? 'onward' : 'return')
    } catch {
      window.sessionStorage.removeItem(BOOKING_STORAGE_KEY)
    }
  }, [])

  useEffect(() => {
    if (!showPopup) return undefined

    const timeout = window.setTimeout(() => setShowPopup(false), 3200)
    return () => window.clearTimeout(timeout)
  }, [showPopup])

  const saveBooking = () => {
    window.sessionStorage.setItem(
      BOOKING_STORAGE_KEY,
      JSON.stringify({
        tripType,
        ...form,
      }),
    )
  }

  const validateBooking = () => {
    const nextErrors = {}

    if (!form.from.trim()) nextErrors.from = t(messages, 'home.form.errors.from')
    if (!form.to.trim()) nextErrors.to = t(messages, 'home.form.errors.to')
    if (!form.departure.trim()) nextErrors.departure = t(messages, 'home.form.errors.departure')
    if (tripType === 'return' && !form.arrival.trim()) nextErrors.arrival = t(messages, 'home.form.errors.arrival')

    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      setShowPopup(false)
      window.setTimeout(() => setShowPopup(true), 10)
      return false
    }

    setShowPopup(false)
    return true
  }

  const handleSubmit = () => {
    if (!validateBooking()) return false

    saveBooking()

    if (onSubmit) {
      onSubmit()
      return true
    }

    window.sessionStorage.setItem(BOOKING_STEP_STORAGE_KEY, 'choice')
    return true
  }

  const setField = (field, value) => {
    setForm((current) => ({...current, [field]: value}))
    setErrors((currentErrors) => {
      if (!currentErrors[field]) return currentErrors

      const nextErrors = {...currentErrors}
      delete nextErrors[field]
      return nextErrors
    })
  }

  const selectDate = (field, value) => {
    setField(field, value)
    setActivePopup(null)
  }

  const toggleDatePopup = (popup) => {
    if (activePopup === popup) {
      setActivePopup(null)
      return
    }

    setActivePopup(popup)
  }

  const selectTripType = (value) => {
    setTripType(value)
    if (value === 'onward') {
      setField('arrival', '')
      setErrors((currentErrors) => {
        if (!currentErrors.arrival) return currentErrors

        const nextErrors = {...currentErrors}
        delete nextErrors.arrival
        return nextErrors
      })
      setActivePopup((current) => (current === 'arrival' ? null : current))
    }
  }

  return (
    <div className="relative mt-6 w-full max-w-[calc(100vw-48px)] min-w-0 overflow-visible rounded-[5px] border-0 bg-white text-left min-[700px]:mt-10 min-[700px]:max-w-[1080px] min-[700px]:border min-[700px]:border-border md:mt-8">
      {showPopup ? (
        <div
          role="alert"
          className="fixed right-5 top-5 z-50 max-w-[320px] rounded-[6px] border border-[#ff3b3b]/25 bg-white px-4 py-3 text-[13px] font-[650] text-[#ff2f2f] shadow-[0_14px_34px_rgba(15,23,42,0.12)]"
        >
          {t(messages, 'home.form.requiredWarning')}
        </div>
      ) : null}

      <div className="px-0 pb-0 pt-0 min-[700px]:px-7 min-[700px]:pb-5 min-[700px]:pt-8 md:px-[30px] md:pb-4 md:pt-[28px]">
        <div className="mx-auto grid h-[48px] w-full max-w-[330px] min-w-0 grid-cols-2 rounded-[5px] bg-surface-tint p-[5px] text-center font-[var(--font-display)] text-[14px] font-[500] text-muted min-[700px]:h-[58px] min-[700px]:max-w-[380px] min-[700px]:text-[16px] md:h-[52px] md:text-[15px]">
          {TRIP_TYPES.map((item) => {
            const active = tripType === item.value
            return (
              <button
                type="button"
                key={item.value}
                role="radio"
                aria-checked={active}
                data-active={active}
                onClick={() => selectTripType(item.value)}
                className={[
                  'min-w-0 rounded-[5px] px-2 transition-[background,color] duration-150',
                  active ? 'bg-white font-[700] text-primary' : 'hover:text-secondary',
                ].join(' ')}
              >
                <span className="block truncate">{t(messages, item.labelKey)}</span>
              </button>
            )
          })}
        </div>

        <div className="mt-[18px] grid w-full min-w-0 grid-cols-1 gap-3 min-[700px]:mt-7 min-[700px]:grid-cols-2 min-[700px]:gap-5 md:mt-7 md:grid-cols-4 md:gap-4">
          <LocationInput
            label={t(messages, 'home.form.from')}
            type="from"
            value={form.from}
            error={errors.from}
            onChange={(value) => setField('from', value)}
            onClear={() => setField('from', '')}
            popupId="from"
            activePopup={activePopup}
            setActivePopup={setActivePopup}
            className=""
          />

          <LocationInput
            label={t(messages, 'home.form.to')}
            type="to"
            value={form.to}
            error={errors.to}
            onChange={(value) => setField('to', value)}
            onClear={() => setField('to', '')}
            popupId="to"
            activePopup={activePopup}
            setActivePopup={setActivePopup}
            className=""
          />

          <DateInput
            label={t(messages, 'home.form.departure')}
            value={form.departure}
            error={errors.departure}
            onChange={(value) => selectDate('departure', value)}
            onClear={() => setField('departure', '')}
            open={activePopup === 'departure'}
            onToggle={() => toggleDatePopup('departure')}
            onClose={() => setActivePopup(null)}
            title="Select Departure Date"
            className=""
          />

          <DateInput
            label={form.departure ? t(messages, 'home.form.arrival') : t(messages, 'home.form.arrivalDisabled')}
            value={form.arrival}
            error={errors.arrival}
            onChange={(value) => selectDate('arrival', value)}
            onClear={() => setField('arrival', '')}
            open={activePopup === 'arrival' && !returnDateDisabled}
            onToggle={() => toggleDatePopup('arrival')}
            onClose={() => setActivePopup(null)}
            title="Select Return Date"
            disabled={returnDateDisabled}
            calendarAlign="right"
            className=""
          />

          <div className="flex min-w-0 items-end md:col-span-4">
            {onSubmit ? (
              <button
                type="button"
                onClick={handleSubmit}
                className="mx-auto flex h-[52px] w-full max-w-[620px] items-center justify-center rounded-[5px] bg-primary font-[var(--font-display)] text-[16px] font-[700] tracking-normal text-white transition-colors hover:bg-primary/90 min-[700px]:h-[58px] min-[700px]:text-[18px] md:h-[48px] md:text-[16px]"
              >
                {t(messages, 'home.form.cta')}
              </button>
            ) : (
              <Link
                href={localizedPath(locale, '/book')}
                onClick={(event) => {
                  if (!handleSubmit()) event.preventDefault()
                }}
                className="mx-auto flex h-[52px] w-full max-w-[620px] items-center justify-center rounded-[5px] bg-primary font-[var(--font-display)] text-[16px] font-[700] tracking-normal text-white transition-colors hover:bg-primary/90 min-[700px]:h-[58px] min-[700px]:text-[18px] md:h-[48px] md:text-[16px]"
              >
                {t(messages, 'home.form.cta')}
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="mt-4 grid min-h-[52px] w-full min-w-0 grid-cols-1 overflow-hidden rounded-[5px] border border-border text-[10px] font-[500] leading-none text-muted min-[700px]:mt-0 min-[700px]:grid-cols-2 min-[700px]:rounded-none min-[700px]:border-0 min-[700px]:border-t min-[700px]:border-border min-[700px]:text-[11px] md:grid-cols-[1fr_1fr_1fr_1.35fr]">
        <div className="hidden min-w-0 items-center justify-center gap-1.5 border-b border-r border-border px-2 py-3 min-[700px]:flex min-[700px]:gap-2 min-[700px]:px-4 min-[700px]:border-r md:border-b-0">
          <Lock className="size-[14px] shrink-0 text-success" aria-hidden="true" />
          <span className="truncate min-[700px]:hidden">{t(messages, 'home.trust.sslMobile')}</span>
          <span className="hidden truncate min-[700px]:block">{t(messages, 'home.trust.ssl')}</span>
        </div>
        <div className="hidden min-w-0 items-center justify-center gap-1.5 border-b border-border px-2 py-3 min-[700px]:flex min-[700px]:gap-2 min-[700px]:px-4 min-[700px]:border-b-0 md:border-r">
          <ShieldCheck className="size-[14px] shrink-0 text-tertiary" aria-hidden="true" />
          <span className="truncate min-[700px]:hidden">{t(messages, 'home.trust.customersMobile')}</span>
          <span className="hidden truncate min-[700px]:block">{t(messages, 'home.trust.customers')}</span>
        </div>
        <div className="hidden min-w-0 items-center justify-center gap-1.5 border-b border-border px-2 py-3 min-[700px]:col-span-1 min-[700px]:flex min-[700px]:gap-2 min-[700px]:px-4 min-[700px]:border-b-0 min-[700px]:border-r">
          <Globe2 className="size-[14px] shrink-0 text-tertiary" aria-hidden="true" />
          <span className="truncate min-[700px]:hidden">{t(messages, 'home.trust.worldwideMobile')}</span>
          <span className="hidden truncate min-[700px]:block">{t(messages, 'home.trust.worldwide')}</span>
        </div>
        <div className="flex min-w-0 items-center justify-center gap-2 px-2 py-3 min-[700px]:col-span-1 min-[700px]:gap-3 min-[700px]:px-4">
          <span className="shrink-0 text-[9px] font-[700] uppercase tracking-[0.06em] text-secondary">{t(messages, 'home.trust.payment')}</span>
          <span className="flex min-w-0 items-center gap-3">
            <Image src="/payment_logo/apple_pay_logo.png" alt="Apple Pay" width={350} height={144} className="h-[14px] w-auto object-contain grayscale opacity-70" />
            <Image src="/payment_logo/paypal_logo.png" alt="PayPal" width={402} height={497} className="h-[18px] w-auto object-contain grayscale opacity-70" />
            <Image src="/payment_logo/visa_logo.jpeg" alt="Visa" width={400} height={200} className="h-[15px] w-auto object-contain grayscale opacity-70" />
          </span>
        </div>
      </div>
    </div>
  )
}
