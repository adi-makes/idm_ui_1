'use client'

import {useEffect, useState} from 'react'
import BookFlightPicker, {BookingPreview} from '@/components/book/BookFlightPicker'
import BookingStepper from '@/components/book/BookingStepper'
import BookingForm from '@/components/shared/BookingForm'
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

export default function BookFlow({locale, messages}) {
  const [step, setStep] = useState('search')
  const [loading, setLoading] = useState(false)
  const [selectedFlights, setSelectedFlights] = useState([])
  const defaultSelectedFlights = messages.book.flights.slice(0, 2)

  useEffect(() => {
    const savedStep = window.sessionStorage.getItem(BOOKING_STEP_STORAGE_KEY)
    if (savedStep === 'choice' || savedStep === 'flight') {
      window.sessionStorage.removeItem(BOOKING_STEP_STORAGE_KEY)
      setStep('choice')
    }

    return undefined
  }, [])

  const goToSearch = () => {
    setLoading(false)
    setStep('search')
  }

  const goToChoice = () => {
    setLoading(false)
    setStep('choice')
  }

  const goToFlight = () => {
    setLoading(true)
    window.setTimeout(() => {
      setStep('flight')
      setLoading(false)
    }, 650)
  }

  const goToBook = (flights) => {
    setSelectedFlights(flights)
    setStep('book')
  }

  const goToVerifiedBook = () => {
    setSelectedFlights(defaultSelectedFlights)
    setLoading(false)
    setStep('book')
  }

  if (loading) {
    return <BookLoading messages={messages} />
  }

  if (step === 'choice') {
    return (
      <TicketTypeChoice
        messages={messages}
        onBack={goToSearch}
        onStandard={goToFlight}
        onVerifiable={goToVerifiedBook}
      />
    )
  }

  if (step === 'flight') {
    return <BookFlightPicker locale={locale} messages={messages} onBack={goToSearch} onContinue={goToBook} />
  }

  if (step === 'book') {
    return <BookDetailsStep messages={messages} selectedFlights={selectedFlights} onBack={() => setStep('choice')} />
  }

  return (
    <main className="min-h-screen bg-[#f4f7fb] text-secondary">
      <BookingStepper messages={messages} activeIndex={0} />

      <section className="mx-auto flex w-full max-w-[1160px] flex-col items-center px-5 pb-24 pt-10 text-center md:px-8 md:pt-14">
        <h1 className="font-[var(--font-display)] text-[30px] font-[750] leading-tight text-secondary md:text-[38px]">
          {t(messages, 'book.search.title')}
        </h1>
        <p className="mt-3 max-w-[560px] text-[14px] leading-6 text-muted">
          {t(messages, 'book.search.subtitle')}
        </p>

        <BookingForm locale={locale} onSubmit={goToChoice} />
      </section>
    </main>
  )
}

function TicketTypeChoice({messages, onBack, onStandard, onVerifiable}) {
  const [ticketType, setTicketType] = useState(null)
  const options = [
    {
      value: 'standard',
      title: t(messages, 'book.choice.options.standard.title'),
      text: t(messages, 'book.choice.options.standard.text'),
      price: t(messages, 'book.choice.options.standard.price'),
      action: onStandard,
      badges: [],
    },
    {
      value: 'verifiable',
      title: t(messages, 'book.choice.options.verifiable.title'),
      text: t(messages, 'book.choice.options.verifiable.text'),
      price: t(messages, 'book.choice.options.verifiable.price'),
      action: onVerifiable,
      badges: [
        {label: t(messages, 'book.choice.badges.verifiable'), tone: 'green'},
      ],
    },
  ]
  const selectedOption = options.find((option) => option.value === ticketType)

  return (
    <main className="min-h-screen bg-[#f4f7fb] text-secondary">
      <BookingStepper messages={messages} activeIndex={1} />

      <section className="mx-auto flex w-full max-w-[1040px] flex-col items-center px-5 pb-24 pt-7 md:px-8 md:pt-9">
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="ticket-type-title"
          className="w-full"
        >
          <div className="text-center">
            <h1 id="ticket-type-title" className="font-[var(--font-display)] text-[24px] font-[650] leading-tight text-secondary md:text-[30px]">
              {t(messages, 'book.choice.panelTitle')}
            </h1>
            <p className="mt-2 text-[13px] leading-6 text-muted">
              {t(messages, 'book.choice.routeSummary')}
            </p>
          </div>

          <div className="mx-auto mt-6 grid max-w-[880px] gap-2.5">
            {options.map((option) => {
              const selected = ticketType === option.value
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setTicketType(option.value)}
                  aria-pressed={selected}
                  className={[
                    'grid w-full grid-cols-[18px_1fr_auto] items-center gap-3 rounded-[5px] border bg-white px-4 py-3 text-left transition md:px-5',
                    selected ? 'border-primary bg-white' : 'border-border hover:border-primary/25',
                  ].join(' ')}
                >
                  <span
                    className={[
                      'grid size-[18px] place-items-center rounded-full border transition',
                      selected ? 'border-primary' : 'border-border-strong',
                    ].join(' ')}
                    aria-hidden="true"
                  >
                    {selected ? <span className="size-[8px] rounded-full bg-primary" /> : null}
                  </span>

                  <span className="min-w-0">
                    <span className="flex min-w-0 flex-wrap items-center gap-2">
                      <span className="text-[14px] font-[650] text-secondary">{option.title}</span>
                      {option.badges.map((badge) => (
                        <span
                          key={badge.label}
                          className={[
                            'rounded-full bg-success/10 px-2 py-0.5 text-[10px] font-[550] text-success',
                          ].join(' ')}
                        >
                          {badge.label}
                        </span>
                      ))}
                    </span>
                    <span className="mt-1 block text-[12px] font-[400] leading-5 text-muted">{option.text}</span>
                  </span>

                  <span className="text-[17px] font-[500] text-primary md:text-[19px]">
                    {option.price}
                  </span>
                </button>
              )
            })}
          </div>

          <div className="mx-auto mt-5 grid max-w-[880px] gap-3 md:grid-cols-[0.32fr_1fr]">
            <button
              type="button"
              onClick={onBack}
              className="inline-flex h-[44px] items-center justify-center rounded-[5px] border border-border bg-white px-5 text-[13px] font-[400] text-secondary transition hover:border-primary hover:text-primary"
            >
              {t(messages, 'book.summary.back')}
            </button>
            <button
              type="button"
              disabled={!selectedOption}
              onClick={() => selectedOption?.action()}
              className="inline-flex h-[44px] items-center justify-center rounded-[5px] bg-primary px-5 text-[14px] font-[400] text-white transition enabled:hover:bg-primary/90 disabled:cursor-not-allowed disabled:bg-primary/35"
            >
              {t(messages, 'book.choice.continue')}
            </button>
          </div>
        </div>
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

function EmailField({messages, label, error, onClearError, required = false}) {
  const [email, setEmail] = useState('')
  const suggestion = getEmailSuggestion(email)
  const errorId = error ? 'passenger-email-error' : undefined

  return (
    <div className="text-left">
      <input
        name="email"
        type="email"
        required={required}
        value={email}
        onChange={(event) => {
          setEmail(event.target.value)
          onClearError?.('email')
        }}
        placeholder={label}
        aria-label={label}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={errorId}
        className={`h-[48px] w-full rounded-[5px] border bg-white px-4 text-[14px] font-[500] text-secondary shadow-[0_8px_18px_rgba(15,23,42,0.025)] outline-none transition placeholder:text-tertiary ${
          error ? 'border-[#ff3b3b] focus:border-[#ff3b3b]' : 'border-transparent focus:border-primary'
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
          onClick={() => setEmail(suggestion)}
          className="mt-2 text-left text-[12px] font-[500] text-muted transition hover:text-primary"
        >
          {t(messages, 'book.details.emailSuggestion')}{' '}
          <span className="font-[700] text-primary">{suggestion}</span>?
        </button>
      ) : null}
    </div>
  )
}

function DetailField({label, name, error, onClearError, type = 'text', required = false}) {
  const errorId = error ? `passenger-${name}-error` : undefined

  return (
    <div className="block text-left">
      <input
        name={name}
        type={type}
        required={required}
        onChange={() => onClearError?.(name)}
        placeholder={label}
        aria-label={label}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={errorId}
        className={`h-[48px] w-full rounded-[5px] border bg-white px-4 text-[14px] font-[500] text-secondary shadow-[0_8px_18px_rgba(15,23,42,0.025)] outline-none transition placeholder:text-tertiary ${
          error ? 'border-[#ff3b3b] focus:border-[#ff3b3b]' : 'border-transparent focus:border-primary'
        }`}
      />
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
        <div className="grid grid-cols-3 gap-2 sm:max-w-[340px]">
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
                  'h-[46px] rounded-[5px] border bg-white text-[14px] font-[700] shadow-[0_8px_18px_rgba(15,23,42,0.025)] transition',
                  active
                    ? 'border-secondary text-secondary'
                    : 'border-transparent text-muted hover:border-primary/30 hover:text-secondary',
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

function BookDetailsStep({messages, selectedFlights, onBack}) {
  const [errors, setErrors] = useState({})
  const [showPopup, setShowPopup] = useState(false)
  const [title, setTitle] = useState('Mr')

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
  }

  return (
    <main className="min-h-screen bg-[#f4f7fb] text-secondary">
      <BookingStepper messages={messages} activeIndex={2} />

      {showPopup ? (
        <div
          role="alert"
          className="fixed right-5 top-5 z-50 max-w-[320px] rounded-[6px] border border-[#ff3b3b]/25 bg-white px-4 py-3 text-[13px] font-[650] text-[#ff2f2f] shadow-[0_14px_34px_rgba(15,23,42,0.12)]"
        >
          {t(messages, 'book.details.requiredWarning')}
        </div>
      ) : null}

      <section className="mx-auto grid w-full max-w-[1220px] gap-6 px-5 pb-24 pt-5 md:px-8 md:pt-6 lg:grid-cols-[390px_minmax(0,1fr)] lg:items-start">
        <BookingPreview messages={messages} selectedFlights={selectedFlights} />

        <div className="min-w-0">
          <h1 className="font-[var(--font-display)] text-[26px] font-[750] leading-tight text-secondary md:text-[32px]">
            {t(messages, 'book.details.title')}
          </h1>
          <p className="mt-2 max-w-[560px] text-[13px] leading-6 text-muted">
            {t(messages, 'book.details.subtitle')}
          </p>

          <form
            id="passenger-details-form"
            noValidate
            onSubmit={handleSubmit}
            className="mt-6"
          >
            <div className="max-w-[760px]">
              <div>
                <p className="mb-3 text-[13px] font-[650] text-secondary">
                  {t(messages, 'book.details.emailDelivery')}
                </p>
                <div className="max-w-[430px]">
                  <EmailField
                    messages={messages}
                    label={t(messages, 'book.details.fields.email')}
                    error={errors.email}
                    onClearError={clearFieldError}
                    required
                  />
                </div>
              </div>

              <div className="mt-7">
                <p className="mb-4 text-[16px] font-[700] text-secondary">
                  {t(messages, 'book.details.traveler')}
                </p>

                <TitlePicker
                  name="title"
                  label={t(messages, 'book.details.fields.title')}
                  value={title}
                  onChange={setTitle}
                  error={errors.title}
                  onClearError={clearFieldError}
                />

                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  <DetailField
                    name="firstName"
                    label={t(messages, 'book.details.fields.firstName')}
                    error={errors.firstName}
                    onClearError={clearFieldError}
                    required
                  />
                  <DetailField
                    name="lastName"
                    label={t(messages, 'book.details.fields.lastName')}
                    error={errors.lastName}
                    onClearError={clearFieldError}
                    required
                  />
                  <DetailField
                    name="nationality"
                    label={t(messages, 'book.details.fields.nationality')}
                    error={errors.nationality}
                    onClearError={clearFieldError}
                    required
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-white/95 px-5 py-4 backdrop-blur">
        <div className="mx-auto flex w-full max-w-[1220px] items-center justify-between gap-4">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex h-[46px] items-center justify-center gap-2 rounded-[5px] border border-border-strong px-5 text-[13px] font-[500] text-secondary transition hover:border-primary hover:text-primary"
            >
            {t(messages, 'book.summary.back')}
          </button>
          <button
            type="submit"
            form="passenger-details-form"
            className="inline-flex h-[46px] min-w-[160px] items-center justify-center gap-2 rounded-[5px] bg-primary px-6 text-[14px] font-[500] text-white transition hover:bg-primary/90"
          >
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
    <div className="overflow-hidden rounded-[6px] border border-border bg-white shadow-[0_8px_22px_rgba(15,23,42,0.035)]">
      <SkeletonSegment />
      <div className="mx-4 h-px bg-border md:mx-5" aria-hidden="true" />
      <SkeletonSegment />
    </div>
  )
}

function BookLoading({messages}) {
  return (
    <main className="min-h-screen bg-[#f4f7fb] text-secondary">
      <BookingStepper messages={messages} activeIndex={1} />

      <section className="mx-auto grid w-full max-w-[1220px] gap-6 px-5 pb-24 pt-5 md:px-8 md:pt-6 lg:grid-cols-[390px_minmax(0,1fr)] lg:items-start">
        <aside className="flex w-full justify-center lg:sticky lg:top-6">
          <div className="w-full max-w-[420px] rounded-[5px] bg-white p-4 shadow-[0_8px_22px_rgba(15,23,42,0.035)]">
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

        <div className="min-w-0">
          <h1 className="font-[var(--font-display)] text-[26px] font-[750] leading-tight text-secondary md:text-[32px]">
            {t(messages, 'book.title')}
          </h1>
          <p className="mt-2 max-w-[520px] text-[13px] leading-6 text-muted">
            {t(messages, 'book.loading')}
          </p>

          <div className="mt-5 grid gap-3">
            <SkeletonTicket />
            <SkeletonTicket />
          </div>
        </div>
      </section>
    </main>
  )
}
