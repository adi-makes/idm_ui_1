'use client'

import {useEffect, useState} from 'react'
import {Globe2, Lock, Mail, ShieldCheck, UserRound} from 'lucide-react'
import BookFlightPicker, {BookingPreview, MobileOrderDetails, MobileOrderDetailsPanel} from '@/components/book/BookFlightPicker'
import BookingStepper from '@/components/book/BookingStepper'
import {getFlightsForTrip, getSavedBookingTrip} from '@/components/book/bookingState'
import {capitalizePassengerText, formatPassengerName} from '@/components/book/passengerFormat'
import BookingForm from '@/components/shared/BookingForm'
import DateInput from '@/components/shared/DateInput'
import {localizedPath} from '@/i18n/routing'
import {t} from '@/messages'

const BOOKING_STEP_STORAGE_KEY = 'idt.booking.step'
const COMMON_EMAIL_DOMAINS = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'icloud.com']
const EMAIL_DOMAIN_FIXES = {
  'gmai.com': 'gmail.com',
  'gmail.co': 'gmail.com',
  'gmail.con': 'gmail.com',
  'gmial.com': 'gmail.com',
  'gmal.com': 'gmail.com',
  'gnail.com': 'gmail.com',
  'yaho.com': 'yahoo.com',
  'yahoo.co': 'yahoo.com',
  'yahoo.con': 'yahoo.com',
  'outlok.com': 'outlook.com',
  'outlook.co': 'outlook.com',
  'outlook.con': 'outlook.com',
  'hotmai.com': 'hotmail.com',
  'hotmail.co': 'hotmail.com',
  'hotmail.con': 'hotmail.com',
  'icloud.co': 'icloud.com',
  'icloud.con': 'icloud.com',
}

function getInitialStep() {
  if (typeof window === 'undefined') return 'search'

  const savedStep = window.sessionStorage.getItem(BOOKING_STEP_STORAGE_KEY)
  return savedStep === 'choice' || savedStep === 'flight' ? 'flight' : 'search'
}

export default function BookFlow({locale, messages}) {
  const [step, setStep] = useState(getInitialStep)
  const [loading, setLoading] = useState(false)
  const [trip, setTrip] = useState(() => getSavedBookingTrip(messages))
  const [selectedFlights, setSelectedFlights] = useState([])
  const [selectedPrice, setSelectedPrice] = useState(t(messages, 'book.choice.options.standard.price'))
  const [selectedModeTitle, setSelectedModeTitle] = useState(t(messages, 'book.choice.options.standard.title'))
  const flights = getFlightsForTrip(messages, trip)

  useEffect(() => {
    const savedStep = window.sessionStorage.getItem(BOOKING_STEP_STORAGE_KEY)
    if (savedStep === 'choice' || savedStep === 'flight') {
      window.sessionStorage.removeItem(BOOKING_STEP_STORAGE_KEY)
    }

    return undefined
  }, [])

  const goToSearch = () => {
    setLoading(false)
    setStep('search')
  }

  const goBackFromSearch = () => {
    if (window.history.length > 1) {
      window.history.back()
      return
    }

    window.location.href = localizedPath(locale, '/')
  }

  const goToFlight = () => {
    setTrip(getSavedBookingTrip(messages))
    setLoading(false)
    setStep('flight')
  }

  const goToBook = (flights, price, modeTitle) => {
    setSelectedFlights(flights)
    setSelectedPrice(price || t(messages, 'book.choice.options.standard.price'))
    setSelectedModeTitle(modeTitle || t(messages, 'book.choice.options.standard.title'))
    setStep('book')
  }

  if (loading) {
    return <BookLoading messages={messages} />
  }

  if (step === 'flight') {
    return <BookFlightPicker messages={messages} trip={trip} flights={flights} onBack={goToSearch} onContinue={goToBook} />
  }

  if (step === 'book') {
    return <BookDetailsStep messages={messages} trip={trip} selectedFlights={selectedFlights} price={selectedPrice} modeTitle={selectedModeTitle} onBack={() => setStep('flight')} />
  }

  return (
    <main className="min-h-screen bg-[#f4f7fb] text-secondary">
      <BookingStepper messages={messages} activeIndex={0} onBack={goBackFromSearch} />

      <section className="mx-auto flex w-full max-w-[1160px] flex-col items-center px-5 pb-24 pt-10 text-center md:px-8 md:pt-14">
        <h1 className="font-[var(--font-display)] text-[30px] font-[750] leading-tight text-secondary md:text-[38px]">
          {t(messages, 'book.search.title')}
        </h1>
        <p className="mt-3 max-w-[560px] text-[14px] leading-6 text-muted">
          {t(messages, 'book.search.subtitle')}
        </p>

        <BookingForm locale={locale} onSubmit={goToFlight} />
      </section>
    </main>
  )
}

function getEditDistance(a, b) {
  const rows = Array.from({length: a.length + 1}, () => Array(b.length + 1).fill(0))

  for (let i = 0; i <= a.length; i += 1) rows[i][0] = i
  for (let j = 0; j <= b.length; j += 1) rows[0][j] = j

  for (let i = 1; i <= a.length; i += 1) {
    for (let j = 1; j <= b.length; j += 1) {
      rows[i][j] =
        a[i - 1] === b[j - 1]
          ? rows[i - 1][j - 1]
          : Math.min(rows[i - 1][j - 1], rows[i - 1][j], rows[i][j - 1]) + 1
    }
  }

  return rows[a.length][b.length]
}

function getEmailSuggestion(email) {
  const trimmedEmail = email.trim().toLowerCase()
  const [localPart, domain, extraPart] = trimmedEmail.split('@')

  if (!localPart || !domain || extraPart || COMMON_EMAIL_DOMAINS.includes(domain)) {
    return ''
  }

  const correctedDomain =
    EMAIL_DOMAIN_FIXES[domain] ||
    COMMON_EMAIL_DOMAINS.find((commonDomain) => getEditDistance(domain, commonDomain) <= 2)

  return correctedDomain ? `${localPart}@${correctedDomain}` : ''
}

function SectionMarker({icon: Icon}) {
  return (
    <div className="hidden size-[42px] shrink-0 place-items-center rounded-full bg-primary/10 text-primary md:grid">
      <Icon className="size-[18px]" aria-hidden="true" />
    </div>
  )
}

function EmailField({messages, label, value, onChange, error, onClearError, required = false}) {
  const suggestion = getEmailSuggestion(value)
  const errorId = error ? 'passenger-email-error' : undefined

  return (
    <div className="text-left">
      <input
        name="email"
        type="email"
        required={required}
        value={value}
        onChange={(event) => {
          onChange?.(event.target.value)
          onClearError?.('email')
        }}
        placeholder={label}
        aria-label={label}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={errorId}
        className={`h-[54px] w-full rounded-[5px] border bg-white px-4 text-[15px] font-[500] text-secondary outline-none transition placeholder:text-tertiary ${
          error ? 'border-[#ff3b3b] focus:border-[#ff3b3b]' : 'border-border-strong focus:border-primary'
        }`}
      />
      {error ? (
        <p id={errorId} className="mt-2 text-[12px] font-[500] text-[#ff2f2f]">
          {error}
        </p>
      ) : null}
      {suggestion ? (
        <button
          type="button"
          onClick={() => onChange?.(suggestion)}
          className="mt-2 text-left text-[12px] font-[500] text-muted transition hover:text-primary"
        >
          {t(messages, 'book.details.emailSuggestion')}{' '}
          <span className="font-[700] text-primary">{suggestion}</span>?
        </button>
      ) : null}
    </div>
  )
}

function DetailField({
  messages,
  label,
  name,
  value,
  onChange,
  error,
  onClearError,
  type = 'text',
  icon: Icon,
  trailingIcon: TrailingIcon,
  required = false,
  showCapitalizationSuggestion = false,
}) {
  const errorId = error ? `passenger-${name}-error` : undefined

  return (
    <div className="block text-left">
      <div
        className={`flex h-[54px] items-center rounded-[5px] border bg-white px-4 transition focus-within:border-primary ${
          error ? 'border-[#ff3b3b]' : 'border-border-strong'
        }`}
      >
        {Icon ? <Icon className="mr-3 size-[16px] shrink-0 text-tertiary" aria-hidden="true" /> : null}
        <input
          name={name}
          type={type}
          required={required}
          value={value}
          onChange={(event) => {
            const nextValue = showCapitalizationSuggestion
              ? capitalizePassengerText(event.target.value)
              : event.target.value
            onChange?.(nextValue)
            onClearError?.(name)
          }}
          placeholder={label}
          aria-label={label}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={errorId}
          className="min-w-0 flex-1 bg-transparent text-[15px] font-[500] text-secondary outline-none placeholder:text-tertiary"
        />
        {TrailingIcon ? <TrailingIcon className="ml-3 size-[16px] shrink-0 text-tertiary" aria-hidden="true" /> : null}
      </div>
      {error ? (
        <p id={errorId} className="mt-2 text-[12px] font-[500] text-[#ff2f2f]">
          {error}
        </p>
      ) : null}
    </div>
  )
}

function TitlePicker({label, name, value, onChange, error, onClearError}) {
  const errorId = error ? `passenger-${name}-error` : undefined
  const titles = ['Mr', 'Ms', 'Mrs']

  return (
    <div className="block text-left">
      <input
        type="hidden"
        name={name}
        value={value}
        readOnly
        aria-label={label}
      />
      <div
        role="radiogroup"
        aria-label={label}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={errorId}
      >
        <div className="grid grid-cols-3 gap-2 sm:max-w-[360px]">
          {titles.map((titleOption) => {
            const active = value === titleOption
            return (
              <button
                key={titleOption}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => {
                  onChange(titleOption)
                  onClearError?.(name)
                }}
                className={[
                  'h-[50px] rounded-[5px] border bg-white text-[14px] font-[700] transition',
                  active
                    ? 'border-primary text-primary'
                    : 'border-border-strong text-muted hover:border-primary/30 hover:text-secondary',
                  error ? 'border-[#ff3b3b]' : '',
                ].join(' ')}
              >
                {titleOption}
              </button>
            )
          })}
        </div>
      </div>
      {error ? (
        <p id={errorId} className="mt-2 text-[12px] font-[500] text-[#ff2f2f]">
          {error}
        </p>
      ) : null}
    </div>
  )
}

function MobileReviewSummary({messages, trip, selectedFlights, passengerDetails}) {
  const fullName = formatPassengerName(passengerDetails)
  const nationality = capitalizePassengerText(passengerDetails.nationality)

  return (
    <div className="self-start rounded-[5px] bg-white p-4 md:hidden">
      <div className="grid grid-cols-[1fr_34px_1fr] items-start gap-3">
        <div>
          <span className="inline-flex rounded-[3px] bg-surface-muted px-2.5 py-1 text-[10px] font-[600] text-secondary">
            {trip.type}
          </span>
          <div className="mt-3 font-[var(--font-display)] text-[20px] font-[800] leading-none text-secondary">{trip.fromCode}</div>
          <div className="mt-1 text-[12px] font-[500] text-muted">{trip.fromCity}</div>
          <div className="mt-1.5 text-[11px] font-[500] text-tertiary">{trip.departDate}</div>
        </div>
        <div className="mt-11 grid place-items-center text-tertiary">→</div>
        <div className="text-right">
          <div className="mt-8 font-[var(--font-display)] text-[20px] font-[800] leading-none text-secondary">{trip.toCode}</div>
          <div className="mt-1 text-[12px] font-[500] text-muted">{trip.toCity}</div>
          <div className="mt-1.5 text-[11px] font-[500] text-tertiary">{trip.returnDate || trip.departDate}</div>
        </div>
      </div>

      <div className="mt-3 grid gap-2 border-t border-border pt-3">
        {selectedFlights.map((flight) => (
          <div key={`${flight.airline}-${flight.flightNumber}-${flight.kind}`} className="grid grid-cols-[1fr_auto] items-center gap-3">
            <div className="min-w-0">
              <div className="flex min-w-0 items-center gap-2">
                <span className="text-[9px] font-[900] uppercase text-[#e11d48]">{flight.airline === 'Air India' ? 'AIR INDIA' : flight.airline}</span>
                <span className="truncate text-[12px] font-[700] text-secondary">{flight.flightNumber}</span>
              </div>
              <div className="mt-1 text-[12px] font-[600] text-muted">
                {flight.fromCode} {flight.departTime} → {flight.toCode} {flight.arriveTime}
              </div>
            </div>
            <span className="rounded-[4px] bg-surface-muted px-2 py-1 text-[10px] font-[700] text-secondary">{flight.kind}</span>
          </div>
        ))}
      </div>

      <div className="mt-3 border-t border-border pt-3">
        <h3 className="font-[var(--font-display)] text-[14px] font-[750] text-secondary">{t(messages, 'book.review.passenger')}</h3>
        <div className="mt-2 grid gap-1.5 text-[12px] leading-5">
          <div className="flex justify-between gap-3">
            <span className="text-muted">{t(messages, 'book.review.name')}</span>
            <span className="text-right font-[700] text-secondary">{fullName}</span>
          </div>
          <div className="flex justify-between gap-3">
            <span className="text-muted">{t(messages, 'book.review.email')}</span>
            <span className="min-w-0 break-all text-right font-[700] text-secondary">{passengerDetails.email}</span>
          </div>
          <div className="flex justify-between gap-3">
            <span className="text-muted">{t(messages, 'book.review.nationality')}</span>
            <span className="text-right font-[700] text-secondary">{nationality}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function BookDetailsStep({messages, trip, selectedFlights, price, modeTitle, onBack}) {
  const [errors, setErrors] = useState({})
  const [showPopup, setShowPopup] = useState(false)
  const [showOrderDetails, setShowOrderDetails] = useState(false)
  const [activeDatePicker, setActiveDatePicker] = useState(null)
  const [paymentReady, setPaymentReady] = useState(false)
  const [passengerDetails, setPassengerDetails] = useState({
    email: '',
    title: 'Mr',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    nationality: '',
  })

  const updatePassengerDetail = (field, value) => {
    setPassengerDetails((currentDetails) => ({...currentDetails, [field]: value}))
    setPaymentReady(false)
  }

  useEffect(() => {
    if (!showPopup) return undefined

    const timeout = window.setTimeout(() => setShowPopup(false), 3200)
    return () => window.clearTimeout(timeout)
  }, [showPopup])

  const clearFieldError = (field) => {
    setErrors((currentErrors) => {
      if (!currentErrors[field]) return currentErrors

      const nextErrors = {...currentErrors}
      delete nextErrors[field]
      return nextErrors
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const requiredFields = [
      ['email', t(messages, 'book.details.errors.email')],
      ['title', t(messages, 'book.details.errors.title')],
      ['firstName', t(messages, 'book.details.errors.firstName')],
      ['lastName', t(messages, 'book.details.errors.lastName')],
      ['dateOfBirth', t(messages, 'book.details.errors.dateOfBirth')],
      ['nationality', t(messages, 'book.details.errors.nationality')],
    ]
    const nextErrors = requiredFields.reduce((fieldErrors, [field, message]) => {
      if (!String(formData.get(field) || '').trim()) {
        return {...fieldErrors, [field]: message}
      }

      return fieldErrors
    }, {})

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      setShowPopup(false)
      window.setTimeout(() => setShowPopup(true), 10)
      return
    }

    setErrors({})
    setShowPopup(false)
    setShowOrderDetails(false)
    setPaymentReady(true)
  }

  const handleBack = () => {
    onBack?.()
  }

  return (
    <main className="min-h-screen bg-[#f4f7fb] text-secondary">
      <BookingStepper messages={messages} activeIndex={2} onBack={handleBack} />

      {showPopup ? (
        <div
          role="alert"
          className="fixed left-1/2 top-[64px] z-50 w-[calc(100%-40px)] max-w-[320px] -translate-x-1/2 rounded-[6px] border border-[#ff3b3b]/25 bg-white px-4 py-3 text-center text-[13px] font-[650] text-[#ff2f2f] min-[700px]:top-[114px] md:left-auto md:right-5 md:top-5 md:w-auto md:translate-x-0 md:text-left"
        >
          {t(messages, 'book.details.requiredWarning')}
        </div>
      ) : null}

      <section className="mx-auto grid w-full max-w-[1220px] gap-6 px-5 pb-24 pt-6 md:px-8 md:pt-7 lg:grid-cols-[minmax(0,1fr)_390px] lg:items-start">
        <div className="min-w-0 lg:max-w-[820px]">
          <div className="text-center md:text-left">
            <h1 className="font-[var(--font-display)] text-[26px] font-[750] leading-tight text-secondary md:text-[32px]">
              {t(messages, 'book.details.title')}
            </h1>
            <p className="mx-auto mt-2 max-w-[560px] text-[13px] leading-6 text-muted md:mx-0">
              {t(messages, 'book.details.subtitle')}
            </p>
          </div>

          <form
            id="passenger-details-form"
            noValidate
            onSubmit={handleSubmit}
            className="mt-6 max-w-[820px] rounded-[7px] border border-border bg-white p-5 md:p-7"
          >
            <div className="space-y-7">
              <div className="flex gap-5">
                <SectionMarker icon={Mail} />
                <div className="min-w-0 flex-1">
                    <p className="mb-3 text-[13px] font-[800] text-secondary">
                    {t(messages, 'book.details.emailDelivery')}
                  </p>
                  <div className="max-w-[570px]">
                  <EmailField
                    messages={messages}
                    label={t(messages, 'book.details.fields.email')}
                    value={passengerDetails.email}
                    onChange={(value) => updatePassengerDetail('email', value)}
                    error={errors.email}
                    onClearError={clearFieldError}
                    required
                  />
                  </div>
                </div>
              </div>

              <div className="border-t border-border pt-7">
                <div className="flex gap-5">
                  <SectionMarker icon={UserRound} />
                  <div className="min-w-0 flex-1">
                    <p className="mb-4 text-[16px] font-[800] text-secondary">
                      {t(messages, 'book.details.traveler')}
                    </p>

                    <TitlePicker
                      name="title"
                      label={t(messages, 'book.details.fields.title')}
                      value={passengerDetails.title}
                      onChange={(value) => updatePassengerDetail('title', value)}
                      error={errors.title}
                      onClearError={clearFieldError}
                    />

                    <div className="mt-5 grid gap-4 md:grid-cols-2">
                      <input type="hidden" name="dateOfBirth" value={passengerDetails.dateOfBirth} readOnly />
                      <DetailField
                        messages={messages}
                        name="firstName"
                        label={t(messages, 'book.details.fields.firstName')}
                        value={passengerDetails.firstName}
                        onChange={(value) => updatePassengerDetail('firstName', value)}
                        error={errors.firstName}
                        onClearError={clearFieldError}
                        icon={UserRound}
                        showCapitalizationSuggestion
                        required
                      />
                      <DetailField
                        messages={messages}
                        name="lastName"
                        label={t(messages, 'book.details.fields.lastName')}
                        value={passengerDetails.lastName}
                        onChange={(value) => updatePassengerDetail('lastName', value)}
                        error={errors.lastName}
                        onClearError={clearFieldError}
                        icon={UserRound}
                        showCapitalizationSuggestion
                        required
                      />
                      <DateInput
                        label={t(messages, 'book.details.fields.dateOfBirth')}
                        value={passengerDetails.dateOfBirth}
                        error={errors.dateOfBirth}
                        onChange={(value) => {
                          updatePassengerDetail('dateOfBirth', value)
                          clearFieldError('dateOfBirth')
                          setActiveDatePicker(null)
                        }}
                        onClear={() => {
                          updatePassengerDetail('dateOfBirth', '')
                          clearFieldError('dateOfBirth')
                        }}
                        open={activeDatePicker === 'dateOfBirth'}
                        onToggle={() => setActiveDatePicker((current) => (current === 'dateOfBirth' ? null : 'dateOfBirth'))}
                        onClose={() => setActiveDatePicker(null)}
                        title={t(messages, 'book.details.fields.dateOfBirth')}
                        minDate={new Date(1900, 0, 1)}
                        maxDate={new Date()}
                        initialMonthDate={new Date(1996, 0, 1)}
                        quickSelect
                        controlClassName="md:h-[54px] md:text-[15px]"
                      />
                      <DetailField
                        messages={messages}
                        name="nationality"
                        label={t(messages, 'book.details.fields.nationality')}
                        value={passengerDetails.nationality}
                        onChange={(value) => updatePassengerDetail('nationality', value)}
                        error={errors.nationality}
                        onClearError={clearFieldError}
                        icon={Globe2}
                        showCapitalizationSuggestion
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
          {paymentReady ? (
            <p className="mt-4 max-w-[520px] rounded-[5px] border border-success/20 bg-success/10 px-4 py-3 text-[13px] font-[600] text-success">
              {t(messages, 'book.details.paymentReady')}
            </p>
          ) : null}
        </div>

        <BookingPreview messages={messages} trip={trip} selectedFlights={selectedFlights} passengerDetails={passengerDetails} modeTitle={modeTitle} price={price} compact className="hidden lg:flex" />
      </section>

      <MobileOrderDetailsPanel messages={messages} trip={trip} selectedFlights={selectedFlights} passengerDetails={passengerDetails} modeTitle={modeTitle} price={price} open={showOrderDetails} />

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-white/95 px-5 py-3 backdrop-blur">
        <div className="mx-auto grid w-full max-w-[1220px] grid-cols-[auto_1fr] items-center gap-3 md:grid-cols-[1fr_auto_auto] md:gap-4">
          <div className="hidden min-w-0 items-center gap-3 md:flex">
            <span className="grid size-[40px] shrink-0 place-items-center rounded-full bg-success/10 text-success">
              <ShieldCheck className="size-[18px]" aria-hidden="true" />
            </span>
            <span className="min-w-0">
              <span className="block text-[13px] font-[800] text-secondary">{t(messages, 'book.summary.trusted')}</span>
              <span className="mt-0.5 block text-[11px] font-[500] text-tertiary">{t(messages, 'book.summary.encrypted')}</span>
            </span>
          </div>
          <MobileOrderDetails
            messages={messages}
            open={showOrderDetails}
            onToggle={() => setShowOrderDetails((current) => !current)}
          />
          <div className="hidden min-w-[120px] text-right md:block">
            <div className="font-[var(--font-display)] text-[20px] font-[800] text-secondary">{price}</div>
            <div className="mt-0.5 text-[11px] font-[500] text-tertiary">{t(messages, 'book.summary.totalAmount')}</div>
          </div>
          <button
            type="submit"
            form="passenger-details-form"
            className="ml-auto inline-flex h-[50px] w-full min-w-0 items-center justify-center gap-2 rounded-[5px] bg-primary px-5 text-[15px] font-[700] text-white transition hover:bg-primary/90 md:w-auto md:min-w-[210px] md:px-7"
          >
            <Lock className="size-[15px]" aria-hidden="true" />
            {t(messages, 'book.details.submit')}
          </button>
        </div>
      </div>
    </main>
  )
}

function SkeletonLine({className = ''}) {
  return <span className={`block rounded-full bg-[#e9eef5] ${className}`} aria-hidden="true" />
}

function SkeletonSegment() {
  return (
    <div className="p-3 md:p-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <SkeletonLine className="h-[10px] w-[58px]" />
          <SkeletonLine className="h-[14px] w-[112px]" />
          <SkeletonLine className="h-[12px] w-[48px]" />
        </div>
        <SkeletonLine className="h-[28px] w-[72px] rounded-[5px]" />
      </div>

      <div className="mt-4 grid grid-cols-[1fr_72px_1fr] items-center gap-3">
        <div>
          <SkeletonLine className="h-[24px] w-[74px] rounded-[5px]" />
          <SkeletonLine className="mt-2 h-[14px] w-[44px]" />
          <SkeletonLine className="mt-2 h-[12px] w-[78px]" />
          <SkeletonLine className="mt-2 h-[11px] w-[96px]" />
        </div>

        <div className="flex flex-col items-center">
          <SkeletonLine className="size-[18px] rounded-[6px]" />
          <SkeletonLine className="mt-2 h-[11px] w-[54px]" />
          <SkeletonLine className="mt-2 h-[11px] w-[68px]" />
        </div>

        <div className="flex flex-col items-end">
          <SkeletonLine className="h-[24px] w-[74px] rounded-[5px]" />
          <SkeletonLine className="mt-2 h-[14px] w-[44px]" />
          <SkeletonLine className="mt-2 h-[12px] w-[78px]" />
          <SkeletonLine className="mt-2 h-[11px] w-[96px]" />
        </div>
      </div>
    </div>
  )
}

function SkeletonTicket() {
  return (
    <div className="overflow-hidden rounded-[6px] border border-border bg-white">
      <SkeletonSegment />
      <div className="mx-4 h-px bg-border md:mx-5" aria-hidden="true" />
      <SkeletonSegment />
    </div>
  )
}

function SkeletonBookingPreview({className = ''}) {
  return (
    <aside className={`flex w-full justify-center lg:sticky lg:top-6 ${className}`}>
      <div className="w-full max-w-[420px] rounded-[5px] bg-white p-4">
        <SkeletonLine className="h-[30px] w-[96px] rounded-[3px]" />
        <div className="mt-4 grid grid-cols-[1fr_38px_1fr] items-start gap-3">
          <div>
            <SkeletonLine className="h-[18px] w-[42px]" />
            <SkeletonLine className="mt-2 h-[12px] w-[62px]" />
            <SkeletonLine className="mt-2 h-[11px] w-[78px]" />
          </div>
          <div className="grid place-items-center pt-1">
            <SkeletonLine className="size-[17px] rounded-[6px]" />
          </div>
          <div className="flex flex-col items-end">
            <SkeletonLine className="h-[18px] w-[42px]" />
            <SkeletonLine className="mt-2 h-[12px] w-[62px]" />
            <SkeletonLine className="mt-2 h-[11px] w-[78px]" />
          </div>
        </div>
      </div>
    </aside>
  )
}

function BookLoading({messages}) {
  const [showOrderDetails, setShowOrderDetails] = useState(false)

  return (
    <main className="min-h-screen bg-[#f4f7fb] text-secondary">
      <BookingStepper messages={messages} activeIndex={1} />

      <section className="mx-auto grid w-full max-w-[1220px] gap-6 px-5 pb-24 pt-5 md:px-8 md:pt-6 lg:grid-cols-[minmax(0,1fr)_390px] lg:items-start">
        <div className="min-w-0 text-center md:text-left">
          <h1 className="font-[var(--font-display)] text-[26px] font-[750] leading-tight text-secondary md:text-[32px]">
            {t(messages, 'book.title')}
          </h1>
          <p className="mx-auto mt-2 max-w-[520px] text-[13px] leading-6 text-muted md:mx-0">
            {t(messages, 'book.loading')}
          </p>

          <div className="mt-5 grid gap-3">
            <SkeletonTicket />
            <SkeletonTicket />
          </div>
        </div>

        <SkeletonBookingPreview className="hidden lg:flex" />
      </section>

      <MobileOrderDetailsPanel messages={messages} selectedFlights={[]} open={showOrderDetails}>
        <SkeletonBookingPreview className="mt-5" />
      </MobileOrderDetailsPanel>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-white/95 px-5 py-4 backdrop-blur">
        <div className="mx-auto flex w-full max-w-[1220px] items-center justify-between gap-4">
          <MobileOrderDetails
            messages={messages}
            open={showOrderDetails}
            onToggle={() => setShowOrderDetails((current) => !current)}
          />
          <button
            type="button"
            disabled
            className="ml-auto inline-flex h-[46px] min-w-[142px] cursor-not-allowed items-center justify-center gap-2 rounded-[5px] bg-surface-tint px-6 text-[14px] font-[500] text-tertiary"
          >
            {t(messages, 'book.summary.continue')}
          </button>
        </div>
      </div>
    </main>
  )
}
