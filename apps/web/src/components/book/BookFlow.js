'use client'

import {useEffect, useState} from 'react'
import {CalendarDays, ChevronDown, Globe2, Mail, ShieldCheck, Trash2, UserRound} from 'lucide-react'
import BookingBottomBar from '@/components/book/BookingBottomBar'
import BookFlightPicker from '@/components/book/BookFlightPicker'
import BookReservationChoice from '@/components/book/BookReservationChoice'
import BookReviewStep from '@/components/book/BookReviewStep'
import BookingStepper from '@/components/book/BookingStepper'
import {getDefaultBookingTrip, getFlightsForTrip, getSavedBookingTrip} from '@/components/book/bookingState'
import {capitalizePassengerText, formatPassengerName} from '@/components/book/passengerFormat'
import BookingForm from '@/components/shared/BookingForm'
import {localizedPath} from '@/i18n/routing'
import {t} from '@/messages'

const BOOKING_STEP_STORAGE_KEY = 'idt.booking.step'
const COMMON_EMAIL_DOMAINS = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com', 'icloud.com']
const NATIONALITY_SUGGESTIONS = [
  {name: 'India', flagCode: 'in'},
  {name: 'Indonesia', flagCode: 'id'},
  {name: 'United States', flagCode: 'us'},
  {name: 'United Arab Emirates', flagCode: 'ae'},
  {name: 'United Kingdom', flagCode: 'gb'},
  {name: 'Canada', flagCode: 'ca'},
  {name: 'Australia', flagCode: 'au'},
  {name: 'Germany', flagCode: 'de'},
  {name: 'France', flagCode: 'fr'},
  {name: 'Saudi Arabia', flagCode: 'sa'},
  {name: 'Singapore', flagCode: 'sg'},
]
const TRAVEL_PURPOSE_KEYS = ['visa', 'onward', 'immigration', 'embassy', 'personal', 'other']

const createEmptyTraveler = () => ({
  title: 'Mr',
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  nationality: '',
  travelPurpose: '',
})
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
  const [trip, setTrip] = useState(() => getDefaultBookingTrip(messages))
  const [selectedFlights, setSelectedFlights] = useState([])
  const [selectedPrice, setSelectedPrice] = useState(t(messages, 'book.choice.options.standard.price'))
  const [selectedModeTitle, setSelectedModeTitle] = useState(t(messages, 'book.choice.options.standard.title'))
  const [passengerDetails, setPassengerDetails] = useState(null)
  const [deliveryDetails, setDeliveryDetails] = useState(null)
  const flights = getFlightsForTrip(messages, trip)

  useEffect(() => {
    const savedStep = window.sessionStorage.getItem(BOOKING_STEP_STORAGE_KEY)
    if (savedStep === 'choice' || savedStep === 'flight') {
      setTrip(getSavedBookingTrip(messages))
      setStep('passenger')
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

  const goToPassenger = () => {
    setTrip(getSavedBookingTrip(messages))
    setLoading(false)
    setStep('passenger')
  }

  const goToChoice = (details) => {
    setPassengerDetails(details)
    setStep('choice')
  }

  const goToReservation = (selection) => {
    setSelectedPrice(selection.price)
    setSelectedModeTitle(selection.title)
    setDeliveryDetails(selection)
    setSelectedFlights([])
    setStep(selection.option === 'standard' ? 'flight' : 'review')
  }

  const goToReview = (flights, price, modeTitle) => {
    setSelectedFlights(flights)
    setSelectedPrice(price || t(messages, 'book.choice.options.standard.price'))
    setSelectedModeTitle(modeTitle || t(messages, 'book.choice.options.standard.title'))
    setStep('review')
  }

  if (loading) {
    return <BookLoading messages={messages} />
  }

  if (step === 'flight') {
    return <BookFlightPicker messages={messages} trip={trip} flights={flights} onBack={() => setStep('choice')} onContinue={goToReview} />
  }

  if (step === 'passenger') {
    return <BookDetailsStep messages={messages} trip={trip} selectedFlights={[]} price={selectedPrice} modeTitle={selectedModeTitle} initialPassengerDetails={passengerDetails} onBack={goToSearch} onContinue={goToChoice} />
  }

  if (step === 'choice') {
    return <BookReservationChoice messages={messages} trip={trip} onBack={() => setStep('passenger')} onChoose={goToReservation} />
  }

  if (step === 'review') {
    return <BookReviewStep messages={messages} trip={trip} selectedFlights={selectedFlights} passengerDetails={passengerDetails} modeTitle={selectedModeTitle} price={selectedPrice} deliveryDetails={deliveryDetails} onBack={() => setStep(selectedFlights.length > 0 ? 'flight' : 'choice')} />
  }

  return (
    <main className="min-h-[calc(100vh-96px)] bg-[#f4f7fb] text-secondary">
      <BookingStepper messages={messages} activeIndex={0} onBack={goBackFromSearch} />

      <section className="mx-auto flex w-full max-w-[1160px] flex-col items-center px-5 pb-24 pt-10 text-center md:px-8 md:pt-14">
        <h1 className="font-[var(--font-display)] text-[28px] font-[500] leading-[1.1] tracking-[-0.03em] text-secondary md:text-[32px]">
          {t(messages, 'book.search.title')}
        </h1>
        <p className="mt-2 max-w-[560px] text-[13px] font-[400] leading-5 text-muted">
          {t(messages, 'book.search.subtitle')}
        </p>

        <BookingForm locale={locale} onSubmit={goToPassenger} />
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
    COMMON_EMAIL_DOMAINS.find((commonDomain) => commonDomain.replace(/\.com$/, '') === domain) ||
    COMMON_EMAIL_DOMAINS.find((commonDomain) => getEditDistance(domain, commonDomain) <= 2)

  return correctedDomain ? `${localPart}@${correctedDomain}` : ''
}

function isValidEmailAddress(email) {
  const normalizedEmail = email.trim()
  return /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/.test(normalizedEmail) && !getEmailSuggestion(normalizedEmail)
}

function SectionMarker({icon: Icon}) {
  return (
    <div className="hidden size-8 shrink-0 place-items-center rounded-full bg-[#EFF6FF] text-primary md:grid">
      <Icon className="size-[14px]" aria-hidden="true" />
    </div>
  )
}

function CountryFlag({code}) {
  return <img src={`https://flagcdn.com/w40/${code}.png`} alt="" width="20" height="15" className="h-[15px] w-[20px] shrink-0 rounded-[2px] object-cover" />
}

function EmailField({messages, label, value, onChange, onBlur, error, onClearError, required = false}) {
  const suggestion = getEmailSuggestion(value)
  const errorId = error ? 'passenger-email-error' : undefined
  const applySuggestion = () => {
    if (!suggestion) return

    onChange?.(suggestion)
    onClearError?.('email')
  }

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
        onBlur={(event) => onBlur?.(event.target.value)}
        placeholder={label}
        aria-label={label}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={errorId}
        className={`h-[48px] w-full rounded-[5px] border bg-white px-5 text-[14px] font-[400] outline-none transition placeholder:text-tertiary ${value ? 'text-secondary' : 'text-muted'} ${
          error ? 'border-[#ff3b3b] focus:border-[#ff3b3b]' : 'border-[#D7E0EC] focus:border-primary'
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
          onPointerDown={(event) => {
            event.preventDefault()
          }}
          onClick={applySuggestion}
          className="mt-2 block text-left text-[12px] font-[500] text-muted transition hover:text-primary"
        >
          {t(messages, 'book.details.emailSuggestion')}{' '}
          <span className="font-[700] text-primary">{suggestion}</span>?
        </button>
      ) : null}
    </div>
  )
}

function formatDateOfBirth(value) {
  const digits = value.replace(/\D/g, '').slice(0, 8)

  if (digits.length <= 2) return digits
  if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`
}

function DateOfBirthField({name = 'dateOfBirth', label, value, error, onChange, onClearError}) {
  const errorId = error ? `passenger-${name}-error` : undefined

  return (
    <div className="text-left">
      <div className={`flex h-[48px] items-center rounded-[5px] border bg-white px-4 transition focus-within:border-primary ${error ? 'border-[#ff3b3b] focus-within:border-[#ff3b3b]' : 'border-[#D7E0EC]'}`}>
        <CalendarDays className="mr-3 size-[15px] shrink-0 text-tertiary" aria-hidden="true" />
        <input
          name={name}
          type="text"
          inputMode="numeric"
          autoComplete="bday"
          maxLength={10}
          value={value}
          onChange={(event) => {
            onChange?.(formatDateOfBirth(event.target.value))
            onClearError?.(name)
          }}
          placeholder={label}
          aria-label={label}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={errorId}
          className={`min-w-0 flex-1 bg-transparent text-[14px] font-[400] outline-none placeholder:text-tertiary ${value ? 'text-secondary' : 'text-muted'}`}
        />
      </div>
      {error ? <p id={errorId} className="mt-2 text-[12px] font-[500] text-[#ff2f2f]">{error}</p> : null}
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
  suggestions = [],
}) {
  const errorId = error ? `passenger-${name}-error` : undefined
  const [focused, setFocused] = useState(false)
  const typedValue = value.trim().toLowerCase()
  const getSuggestionName = (suggestion) => typeof suggestion === 'string' ? suggestion : suggestion.name
  const getSuggestionFlagCode = (suggestion) => typeof suggestion === 'string' ? '' : suggestion.flagCode
  const matchedSuggestions = typedValue
    ? suggestions
      .filter((suggestion) => {
        const normalizedSuggestion = getSuggestionName(suggestion).toLowerCase()
        return normalizedSuggestion !== typedValue && normalizedSuggestion.includes(typedValue)
      })
      .slice(0, 5)
    : []
  const selectedSuggestion = suggestions.find((suggestion) => getSuggestionName(suggestion).toLowerCase() === typedValue)
  const showSuggestions = focused && matchedSuggestions.length > 0

  return (
    <div className="relative block text-left">
      <div
        className={`flex h-[48px] items-center rounded-[5px] border bg-white px-4 transition focus-within:border-primary ${
          error ? 'border-[#ff3b3b]' : 'border-[#D7E0EC]'
        }`}
      >
        {selectedSuggestion && getSuggestionFlagCode(selectedSuggestion) ? (
          <span className="mr-3"><CountryFlag code={getSuggestionFlagCode(selectedSuggestion)} /></span>
        ) : Icon ? <Icon className="mr-3 size-[15px] shrink-0 text-tertiary" aria-hidden="true" /> : null}
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
          onFocus={() => setFocused(true)}
          onBlur={() => window.setTimeout(() => setFocused(false), 120)}
          placeholder={label}
          aria-label={label}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={errorId}
          autoComplete={suggestions.length > 0 ? 'off' : undefined}
          className={`min-w-0 flex-1 bg-transparent text-[14px] font-[400] outline-none placeholder:text-tertiary ${value ? 'text-secondary' : 'text-muted'}`}
        />
        {TrailingIcon ? <TrailingIcon className="ml-3 size-[15px] shrink-0 text-tertiary" aria-hidden="true" /> : null}
      </div>
      {showSuggestions ? (
        <div className="absolute left-0 right-0 top-[60px] z-40 overflow-hidden rounded-[5px] border border-border bg-white">
          {matchedSuggestions.map((suggestion) => (
            <button
            key={getSuggestionName(suggestion)}
            type="button"
            onMouseDown={(event) => {
              event.preventDefault()
                onChange?.(getSuggestionName(suggestion))
                onClearError?.(name)
                setFocused(false)
              }}
              className="flex w-full items-center gap-2.5 px-4 py-3 text-left text-[14px] font-[400] text-muted transition-colors hover:bg-surface-muted"
            >
              {getSuggestionFlagCode(suggestion) ? <CountryFlag code={getSuggestionFlagCode(suggestion)} /> : null}
              <span>{getSuggestionName(suggestion)}</span>
            </button>
          ))}
        </div>
      ) : null}
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
          <span className="inline-flex rounded-[5px] bg-surface-muted px-2.5 py-1 text-[10px] font-[600] text-secondary">
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
            <span className="rounded-[5px] bg-surface-muted px-2 py-1 text-[10px] font-[700] text-secondary">{flight.kind}</span>
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

function BookDetailsStep({messages, trip, selectedFlights, price, modeTitle, initialPassengerDetails, onBack, onContinue}) {
  const [errors, setErrors] = useState({})
  const [showPopup, setShowPopup] = useState(false)
  const [paymentReady, setPaymentReady] = useState(false)
  const [passengerDetails, setPassengerDetails] = useState(() => ({
    email: '',
    ...createEmptyTraveler(),
    ...initialPassengerDetails,
    additionalTravelers: initialPassengerDetails?.additionalTravelers || [],
  }))

  const updatePassengerDetail = (field, value) => {
    setPassengerDetails((currentDetails) => ({...currentDetails, [field]: value}))
    setPaymentReady(false)
  }

  const updateAdditionalTraveler = (index, field, value) => {
    setPassengerDetails((currentDetails) => ({
      ...currentDetails,
      additionalTravelers: currentDetails.additionalTravelers.map((traveler, travelerIndex) => (
        travelerIndex === index ? {...traveler, [field]: value} : traveler
      )),
    }))
    setPaymentReady(false)
  }

  const addTraveler = () => {
    setPassengerDetails((currentDetails) => ({
      ...currentDetails,
      additionalTravelers: [...currentDetails.additionalTravelers, createEmptyTraveler()],
    }))
    setPaymentReady(false)
  }

  const removeTraveler = (index) => {
    setPassengerDetails((currentDetails) => ({
      ...currentDetails,
      additionalTravelers: currentDetails.additionalTravelers.filter((_, travelerIndex) => travelerIndex !== index),
    }))
    setErrors((currentErrors) => Object.fromEntries(
      Object.entries(currentErrors).filter(([key]) => !key.startsWith('additional-')),
    ))
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
      ['firstName', t(messages, 'book.details.errors.firstName')],
      ['lastName', t(messages, 'book.details.errors.lastName')],
      ['dateOfBirth', t(messages, 'book.details.errors.dateOfBirth')],
      ['nationality', t(messages, 'book.details.errors.nationality')],
      ['travelPurpose', t(messages, 'book.details.errors.travelPurpose')],
    ]
    let nextErrors = requiredFields.reduce((fieldErrors, [field, message]) => {
      const fieldValue = String(formData.get(field) || '').trim()

      if (!fieldValue) {
        return {...fieldErrors, [field]: message}
      }

      if (field === 'email' && !isValidEmailAddress(fieldValue)) {
        return {...fieldErrors, [field]: t(messages, 'book.details.errors.invalidEmail')}
      }

      return fieldErrors
    }, {})

    passengerDetails.additionalTravelers.forEach((traveler, index) => {
      requiredFields.slice(1).forEach(([field, message]) => {
        if (!String(traveler[field] || '').trim()) {
          nextErrors = {...nextErrors, [`additional-${index}-${field}`]: message}
        }
      })
    })

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      setShowPopup(false)
      window.setTimeout(() => setShowPopup(true), 10)
      return
    }

    setErrors({})
    setShowPopup(false)
    setPaymentReady(false)
    onContinue?.(passengerDetails)
  }

  const validateEmail = (value) => {
    const email = String(value || '').trim()
    const message = !email
      ? t(messages, 'book.details.errors.email')
      : !isValidEmailAddress(email)
        ? t(messages, 'book.details.errors.invalidEmail')
        : ''

    setErrors((currentErrors) => {
      if (!message && !currentErrors.email) return currentErrors

      const nextErrors = {...currentErrors}
      if (message) nextErrors.email = message
      else delete nextErrors.email
      return nextErrors
    })
  }

  const handleBack = () => {
    onBack?.()
  }

  return (
    <main className="min-h-[calc(100vh-68px)] bg-[#f4f7fb] text-secondary">
      <BookingStepper messages={messages} activeIndex={1} onBack={handleBack} />

      {showPopup ? (
        <div
          role="alert"
          className="fixed left-1/2 top-[64px] z-[10002] w-[calc(100%-40px)] max-w-[320px] -translate-x-1/2 rounded-[5px] border border-[#ff3b3b]/25 bg-white px-4 py-3 text-center text-[13px] font-[650] text-[#ff2f2f] min-[700px]:top-[114px] md:left-auto md:right-5 md:top-5 md:w-auto md:translate-x-0 md:text-left"
        >
          {t(messages, 'book.details.requiredWarning')}
        </div>
      ) : null}

      <section className="mx-auto flex w-full max-w-[960px] flex-col gap-6 px-5 pb-20 pt-6 md:px-8 md:pt-8">
        <div className="min-w-0">
          <div className="text-center">
            <h1 className="font-[var(--font-display)] text-[28px] font-[500] leading-[1.1] tracking-[-0.03em] text-secondary md:text-[32px]">
              {t(messages, 'book.details.title')}
            </h1>
            <p className="mx-auto mt-2 max-w-[500px] text-[13px] font-[400] leading-5 text-muted">
              {t(messages, 'book.details.subtitle')}
            </p>
          </div>

          <form
            id="passenger-details-form"
            noValidate
            onSubmit={handleSubmit}
            className="mt-5 rounded-[5px] border border-[#E7EDF6] bg-white p-5 md:p-6"
          >
            <div className="space-y-5">
              <div className="flex gap-4">
                <SectionMarker icon={Mail} />
                <div className="min-w-0 flex-1">
                    <p className="mb-2 text-[14px] font-[500] text-secondary">
                    {t(messages, 'book.details.emailDelivery')}
                  </p>
                  <div>
                  <EmailField
                    messages={messages}
                    label={t(messages, 'book.details.fields.email')}
                    value={passengerDetails.email}
                    onChange={(value) => updatePassengerDetail('email', value)}
                    onBlur={validateEmail}
                    error={errors.email}
                    onClearError={clearFieldError}
                    required
                  />
                  </div>
                </div>
              </div>

              <div className="border-t border-[#EEF2F7] pt-5">
                <div className="flex gap-4">
                  <SectionMarker icon={UserRound} />
                  <div className="min-w-0 flex-1">
                    <p className="mb-3 text-[14px] font-[500] text-secondary">
                      {t(messages, 'book.details.traveler')}
                    </p>

                    <input type="hidden" name="title" value={passengerDetails.title} readOnly />
                    <div className="grid gap-4 md:grid-cols-2">
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
                      <DateOfBirthField
                        label={t(messages, 'book.details.fields.dateOfBirthPlaceholder')}
                        value={passengerDetails.dateOfBirth}
                        error={errors.dateOfBirth}
                        onChange={(value) => {
                          updatePassengerDetail('dateOfBirth', value)
                          clearFieldError('dateOfBirth')
                        }}
                        onClearError={clearFieldError}
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
                        trailingIcon={ChevronDown}
                        showCapitalizationSuggestion
                        suggestions={NATIONALITY_SUGGESTIONS}
                        required
                      />
                      <div className="relative text-left md:col-span-2">
                        <label className="sr-only" htmlFor="travelPurpose">{t(messages, 'book.details.fields.travelPurpose')}</label>
                        <select
                          id="travelPurpose"
                          name="travelPurpose"
                          value={passengerDetails.travelPurpose}
                          onChange={(event) => {
                            updatePassengerDetail('travelPurpose', event.target.value)
                            clearFieldError('travelPurpose')
                          }}
                          aria-invalid={errors.travelPurpose ? 'true' : undefined}
                          className={`h-[48px] w-full appearance-none rounded-[5px] border bg-white px-4 pr-11 text-[14px] outline-none transition ${errors.travelPurpose ? 'border-[#ff3b3b]' : 'border-[#D7E0EC] focus:border-primary'} ${passengerDetails.travelPurpose ? 'font-[400] text-secondary' : 'font-[400] text-tertiary'}`}
                        >
                          <option value="">{t(messages, 'book.details.fields.travelPurpose')}</option>
                          {TRAVEL_PURPOSE_KEYS.map((purpose) => <option key={purpose} value={purpose}>{t(messages, `book.details.travelPurposes.${purpose}`)}</option>)}
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-[16px] -translate-y-1/2 text-tertiary" aria-hidden="true" />
                        {errors.travelPurpose ? <p className="mt-2 text-[12px] font-[500] text-[#ff2f2f]">{errors.travelPurpose}</p> : null}
                      </div>

                      {passengerDetails.additionalTravelers.map((traveler, index) => {
                        const travelerNumber = index + 2
                        const fieldName = (field) => `additional-${index}-${field}`

                        return (
                          <section key={`additional-traveler-${index}`} className="border-t border-[#EEF2F7] pt-5 md:col-span-2">
                            <div className="mb-3 flex items-center justify-between gap-4">
                              <p className="text-[14px] font-[500] text-secondary">
                                {t(messages, 'book.details.additionalTraveler')} {travelerNumber}
                              </p>
                              <button
                                type="button"
                                onClick={() => removeTraveler(index)}
                                className="inline-flex items-center gap-1.5 text-[12px] font-[500] text-tertiary transition hover:text-secondary"
                              >
                                <Trash2 className="size-[14px]" aria-hidden="true" />
                                {t(messages, 'book.details.removeTraveler')}
                              </button>
                            </div>

                            <input type="hidden" name={fieldName('title')} value={traveler.title} readOnly />
                            <div className="grid gap-4 md:grid-cols-2">
                              <DetailField
                                messages={messages}
                                name={fieldName('firstName')}
                                label={t(messages, 'book.details.fields.firstName')}
                                value={traveler.firstName}
                                onChange={(value) => updateAdditionalTraveler(index, 'firstName', value)}
                                error={errors[fieldName('firstName')]}
                                onClearError={clearFieldError}
                                icon={UserRound}
                                showCapitalizationSuggestion
                                required
                              />
                              <DetailField
                                messages={messages}
                                name={fieldName('lastName')}
                                label={t(messages, 'book.details.fields.lastName')}
                                value={traveler.lastName}
                                onChange={(value) => updateAdditionalTraveler(index, 'lastName', value)}
                                error={errors[fieldName('lastName')]}
                                onClearError={clearFieldError}
                                icon={UserRound}
                                showCapitalizationSuggestion
                                required
                              />
                              <DateOfBirthField
                                name={fieldName('dateOfBirth')}
                                label={t(messages, 'book.details.fields.dateOfBirthPlaceholder')}
                                value={traveler.dateOfBirth}
                                error={errors[fieldName('dateOfBirth')]}
                                onChange={(value) => updateAdditionalTraveler(index, 'dateOfBirth', value)}
                                onClearError={clearFieldError}
                              />
                              <DetailField
                                messages={messages}
                                name={fieldName('nationality')}
                                label={t(messages, 'book.details.fields.nationality')}
                                value={traveler.nationality}
                                onChange={(value) => updateAdditionalTraveler(index, 'nationality', value)}
                                error={errors[fieldName('nationality')]}
                                onClearError={clearFieldError}
                                icon={Globe2}
                                trailingIcon={ChevronDown}
                                showCapitalizationSuggestion
                                suggestions={NATIONALITY_SUGGESTIONS}
                                required
                              />
                              <div className="relative text-left md:col-span-2">
                                <label className="sr-only" htmlFor={fieldName('travelPurpose')}>
                                  {t(messages, 'book.details.fields.travelPurpose')}
                                </label>
                                <select
                                  id={fieldName('travelPurpose')}
                                  name={fieldName('travelPurpose')}
                                  value={traveler.travelPurpose}
                                  onChange={(event) => {
                                    updateAdditionalTraveler(index, 'travelPurpose', event.target.value)
                                    clearFieldError(fieldName('travelPurpose'))
                                  }}
                                  aria-invalid={errors[fieldName('travelPurpose')] ? 'true' : undefined}
                                  className={`h-[48px] w-full appearance-none rounded-[5px] border bg-white px-4 pr-11 text-[14px] outline-none transition ${errors[fieldName('travelPurpose')] ? 'border-[#ff3b3b]' : 'border-[#D7E0EC] focus:border-primary'} ${traveler.travelPurpose ? 'font-[400] text-secondary' : 'font-[400] text-tertiary'}`}
                                >
                                  <option value="">{t(messages, 'book.details.fields.travelPurpose')}</option>
                                  {TRAVEL_PURPOSE_KEYS.map((purpose) => <option key={purpose} value={purpose}>{t(messages, `book.details.travelPurposes.${purpose}`)}</option>)}
                                </select>
                                <ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-[16px] -translate-y-1/2 text-tertiary" aria-hidden="true" />
                                {errors[fieldName('travelPurpose')] ? <p className="mt-2 text-[12px] font-[500] text-[#ff2f2f]">{errors[fieldName('travelPurpose')]}</p> : null}
                              </div>
                            </div>
                          </section>
                        )
                      })}

                      <button
                        type="button"
                        onClick={addTraveler}
                        className="inline-flex h-[44px] items-center justify-center self-start rounded-[5px] border border-[#D7E0EC] px-4 text-[13px] font-[500] text-secondary transition hover:border-primary hover:text-primary md:col-span-2"
                      >
                        {t(messages, 'book.details.addTraveler')}
                      </button>
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

      </section>

      <BookingBottomBar messages={messages} form="passenger-details-form" />
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
          <SkeletonLine className="size-[18px] rounded-[5px]" />
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
    <div className="overflow-hidden rounded-[5px] border border-border bg-white">
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
            <SkeletonLine className="size-[17px] rounded-[5px]" />
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
  return (
    <main className="min-h-screen bg-[#f4f7fb] text-secondary">
       <BookingStepper messages={messages} activeIndex={3} />

      <section className="mx-auto grid w-full max-w-[1220px] gap-6 px-5 pb-24 pt-5 md:px-8 md:pt-6 lg:grid-cols-[minmax(0,1fr)_390px] lg:items-start">
        <div className="min-w-0 text-center md:text-left">
          <h1 className="font-[var(--font-display)] text-[28px] font-[500] leading-[1.1] tracking-[-0.03em] text-secondary md:text-[32px]">
             {t(messages, 'book.flight.title')}
          </h1>
          <p className="mx-auto mt-2 max-w-[560px] text-[13px] font-[400] leading-5 text-muted md:mx-0">
             {t(messages, 'book.flight.loading')}
          </p>

          <div className="mt-5 grid gap-3">
            <SkeletonTicket />
            <SkeletonTicket />
          </div>
        </div>

        <SkeletonBookingPreview className="hidden lg:flex" />
      </section>

      <BookingBottomBar
        messages={messages}
        showPrice
        price={t(messages, 'book.choice.options.standard.price')}
        continueDisabled
      />
    </main>
  )
}
