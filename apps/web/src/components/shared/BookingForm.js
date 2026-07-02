'use client'

import {useEffect, useState} from 'react'
import Image from 'next/image'
import {CalendarDays, ChevronLeft, ChevronRight, Globe2, Lock, PlaneLanding, PlaneTakeoff, ShieldCheck, ShieldPlus, X} from 'lucide-react'
import {getMessages, t} from '@/messages'

const LOCATION_SUGGESTIONS = [
  {
    code: 'CDG',
    city: 'Paris',
    airport: 'Charles de Gaulle Airport',
    country: 'France',
    flag: 'fr',
  },
  {
    code: 'DEL',
    city: 'Delhi',
    airport: 'Indira Gandhi International Airport',
    country: 'India',
    flag: 'in',
  },
  {
    code: 'BCN',
    city: 'Barcelona',
    airport: 'Josep Tarradellas Barcelona-El Prat Airport',
    country: 'Spain',
    flag: 'es',
  },
]

const CALENDAR_DAYS = Array.from({length: 31}, (_, index) => index + 1)
const MIN_SELECTABLE_DAY = 2

function FlagIcon({country}) {
  if (country === 'fr') {
    return (
      <span className="grid h-[20px] w-[28px] grid-cols-3 overflow-hidden" aria-hidden="true">
        <span className="bg-[#002395]" />
        <span className="bg-white" />
        <span className="bg-[#ed2939]" />
      </span>
    )
  }

  if (country === 'in') {
    return (
      <span className="grid h-[20px] w-[28px] grid-rows-3 overflow-hidden" aria-hidden="true">
        <span className="bg-[#ff9933]" />
        <span className="relative bg-white">
          <span className="absolute left-1/2 top-1/2 size-[4px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#000080]" />
        </span>
        <span className="bg-[#138808]" />
      </span>
    )
  }

  return (
    <span className="grid h-[20px] w-[28px] grid-rows-[1fr_2fr_1fr] overflow-hidden" aria-hidden="true">
      <span className="bg-[#aa151b]" />
      <span className="bg-[#f1bf00]" />
      <span className="bg-[#aa151b]" />
    </span>
  )
}

function BookingField({
  label,
  icon: Icon,
  value,
  onChange,
  onClear,
  className = '',
  iconClassName = '',
  suggestions = false,
  popupId,
  activePopup,
  setActivePopup,
}) {
  const showSuggestions = suggestions && activePopup === popupId && value.trim().length > 0

  return (
    <label className={`relative block ${className}`}>
      <span className="sr-only">{label}</span>
      <span className="flex h-[61px] items-center rounded-[7px] border border-border bg-white px-[10px] font-[var(--font-reference)] text-[12px] font-[500] leading-6 tracking-normal text-secondary focus-within:border-primary min-[360px]:px-[16px] min-[360px]:text-[14px] min-[700px]:h-[120px] min-[700px]:rounded-[10px] min-[700px]:px-[34px] min-[700px]:text-[24px] md:h-[43px] md:border-border-strong md:px-[13px] md:text-[16px] md:font-[400]">
        <Icon className={`mr-[7px] size-[19px] shrink-0 text-secondary min-[360px]:mr-[12px] min-[360px]:size-[21px] min-[700px]:mr-[25px] min-[700px]:size-[42px] md:mr-[12px] md:size-[18px] md:text-tertiary ${iconClassName}`} aria-hidden="true" />
        <input
          value={value}
          onFocus={() => setActivePopup(popupId)}
          onChange={(event) => {
            setActivePopup(popupId)
            onChange(event.target.value)
          }}
          placeholder={label}
          className="min-w-0 flex-1 truncate bg-transparent font-[var(--font-reference)] text-[12px] font-[500] leading-6 tracking-normal text-secondary outline-none placeholder:text-[12px] placeholder:font-[400] placeholder:leading-6 placeholder:text-tertiary min-[360px]:text-[14px] min-[360px]:placeholder:text-[14px] min-[700px]:text-[24px] min-[700px]:placeholder:text-[24px] md:text-[16px] md:font-[400] md:placeholder:text-[16px]"
        />
        {value ? (
          <button
            type="button"
            onClick={onClear}
            aria-label={`Clear ${label}`}
            className="ml-[5px] flex size-[16px] shrink-0 items-center justify-center text-secondary hover:text-secondary min-[360px]:ml-[12px] min-[360px]:size-[18px] min-[700px]:size-[32px] md:ml-[12px] md:size-[18px] md:text-tertiary"
          >
            <X className="size-[16px] min-[360px]:size-[18px] min-[700px]:size-[32px] md:size-[15px]" aria-hidden="true" />
          </button>
        ) : null}
      </span>
      {showSuggestions ? (
        <div className="absolute left-0 top-[61px] z-20 w-full overflow-hidden rounded-[7px] border border-border bg-white font-[var(--font-reference)] md:top-[43px]">
          {LOCATION_SUGGESTIONS.map((item) => (
            <button
              type="button"
              key={item.code}
              onClick={() => {
                onChange(`${item.city} (${item.code})`)
                setActivePopup(null)
              }}
              className="flex min-h-[94px] w-full items-center justify-between border-b border-border px-[15px] py-[11px] text-left last:border-b-0 hover:bg-surface-muted"
            >
              <span className="min-w-0">
                <span className="flex items-center gap-[9px]">
                  <span className="rounded-[4px] border border-border bg-surface-muted px-[5px] py-[2px] text-[11px] font-[500] leading-none tracking-normal text-tertiary">
                    {item.code}
                  </span>
                  <span className="text-[16px] font-[400] leading-[1.2] tracking-normal text-secondary">{item.city}</span>
                </span>
                <span className="mt-[7px] block truncate text-[13px] font-[300] leading-[1.35] tracking-normal text-muted">
                  {item.airport}
                </span>
                <span className="mt-[4px] block text-[13px] font-[300] leading-[1.35] tracking-normal text-muted">{item.country}</span>
              </span>
              <span className="ml-[16px] shrink-0" aria-label={`${item.country} flag`}>
                <FlagIcon country={item.flag} />
              </span>
            </button>
          ))}
        </div>
      ) : null}
    </label>
  )
}

function DateField({label, value, onChange, onClear, open, onToggle, onClose, title, className = ''}) {
  const [mounted, setMounted] = useState(open)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (open) {
      setMounted(true)
      const frame = requestAnimationFrame(() => setVisible(true))
      return () => cancelAnimationFrame(frame)
    }

    setVisible(false)
    const timeout = setTimeout(() => setMounted(false), 300)
    return () => clearTimeout(timeout)
  }, [open])

  const handleClose = () => {
    setVisible(false)
    onClose()
  }

  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        onClick={onToggle}
        className={[
          'flex h-[61px] w-full items-center rounded-[7px] border bg-white px-[10px] font-[var(--font-reference)] text-[12px] font-[500] leading-6 tracking-normal min-[360px]:px-[16px] min-[360px]:text-[14px] min-[700px]:h-[120px] min-[700px]:rounded-[10px] min-[700px]:px-[34px] min-[700px]:text-[24px] md:h-[43px] md:px-[13px] md:text-[16px] md:font-[400]',
          open ? 'border-primary' : 'border-border-strong',
          value ? 'text-secondary' : 'text-tertiary',
        ].join(' ')}
      >
        <CalendarDays className="mr-[7px] size-[19px] shrink-0 text-secondary min-[360px]:mr-[12px] min-[360px]:size-[21px] min-[700px]:mr-[25px] min-[700px]:size-[42px] md:mr-[12px] md:size-[18px] md:text-tertiary" aria-hidden="true" />
        <span className="min-w-0 flex-1 overflow-hidden whitespace-nowrap text-left">{value || label}</span>
        {value ? (
          <span
            role="button"
            tabIndex={0}
            onClick={(event) => {
              event.stopPropagation()
              onClear()
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault()
                event.stopPropagation()
                onClear()
              }
            }}
            aria-label={`Clear ${label}`}
            className="ml-[5px] flex size-[16px] shrink-0 items-center justify-center text-secondary hover:text-secondary min-[360px]:ml-[12px] min-[360px]:size-[18px] min-[700px]:size-[32px] md:ml-[12px] md:size-[18px] md:text-tertiary"
          >
            <X className="size-[16px] min-[360px]:size-[18px] min-[700px]:size-[32px] md:size-[15px]" aria-hidden="true" />
          </span>
        ) : null}
      </button>

      {mounted ? (
        <div className="fixed inset-x-0 bottom-0 z-[9999] font-[var(--font-reference)] md:absolute md:inset-auto md:left-0 md:top-[43px] md:z-30 md:aspect-square md:w-full md:overflow-hidden md:rounded-[7px] md:border md:border-border md:bg-white md:px-[22px] md:pb-[16px] md:pt-[18px]">
          <button
            type="button"
            className={[
              'fixed inset-0 z-[9998] cursor-default bg-black/50 transition-opacity duration-300 md:hidden',
              visible ? 'opacity-100' : 'opacity-0',
            ].join(' ')}
            aria-label="Close date picker backdrop"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) handleClose()
            }}
            onClick={(event) => {
              if (event.target === event.currentTarget) handleClose()
            }}
          />
          <div
            className={[
              'relative z-[9999] w-full overflow-hidden rounded-t-[8px] bg-white transition-[transform,opacity] duration-300 ease-[cubic-bezier(.16,1,.3,1)] md:max-w-none md:translate-y-0 md:overflow-visible md:rounded-none md:opacity-100 md:transition-none',
              visible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0',
            ].join(' ')}
          >
            <div className="flex h-[66px] items-center justify-between border-b border-border px-[14px] md:hidden">
              <h2 className="text-[16px] font-[700] leading-none text-secondary">{title}</h2>
              <button type="button" onClick={handleClose} className="flex size-[28px] items-center justify-center text-secondary" aria-label="Close calendar">
                <X className="size-[19px]" aria-hidden="true" />
              </button>
            </div>

            <div className="flex items-center justify-between px-[29px] pb-[20px] pt-[25px] md:mb-[16px] md:px-0 md:pb-0 md:pt-0">
              <button type="button" className="flex size-[18px] items-center justify-center text-secondary" aria-label="Previous month">
                <ChevronLeft className="size-[20px]" aria-hidden="true" />
              </button>
              <div className="text-[16px] font-[700] leading-none text-secondary">July 2026</div>
              <button type="button" className="flex size-[18px] items-center justify-center text-secondary" aria-label="Next month">
                <ChevronRight className="size-[20px]" aria-hidden="true" />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-y-[19px] px-[29px] pb-[91px] text-center md:gap-y-[7px] md:px-0 md:pb-0">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="text-[11px] font-[700] leading-none text-muted md:font-[500] md:text-secondary">{day}</div>
              ))}
              {Array.from({length: 3}).map((_, index) => (
                <div key={`blank-${index}`} />
              ))}
              {CALENDAR_DAYS.map((day) => {
                const disabled = day < MIN_SELECTABLE_DAY
                const selected = value === `July ${day}, 2026`
                return (
                  <button
                    key={day}
                    type="button"
                    disabled={disabled}
                    onClick={() => onChange(`July ${day}, 2026`)}
                    className={[
                      'mx-auto flex size-[20px] items-center justify-center rounded-[7px] text-[18px] font-[400] leading-none md:size-[27px] md:text-[14px]',
                      disabled ? 'cursor-not-allowed text-slate-300' : 'text-secondary hover:border hover:border-secondary',
                      selected ? 'border-2 border-secondary text-secondary' : '',
                    ].join(' ')}
                  >
                    {day}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default function BookingForm({locale}) {
  const messages = getMessages(locale)
  const [form, setForm] = useState({
    from: '',
    to: '',
    departure: '',
    arrival: '',
  })
  const [activePopup, setActivePopup] = useState(null)
  const [tripType, setTripType] = useState('return')

  const setField = (field, value) => {
    setForm((current) => ({...current, [field]: value}))
  }

  const selectDate = (field, value) => {
    setField(field, value)
    setActivePopup(null)
  }

  return (
    <div className="mt-[44px] w-full max-w-[calc(100vw-50px)] min-w-0 bg-white text-left min-[700px]:mt-[81px] min-[700px]:max-w-[649px] md:mt-[24px] md:max-w-[916px] md:rounded-[7px] md:border md:border-border">
      <div
        className="relative grid w-full min-w-0 grid-cols-2 overflow-hidden rounded-[5px] border border-border bg-white text-center font-[var(--font-reference)] text-[16px] font-[700] max-[359px]:text-[14px] min-[700px]:h-[96px] min-[700px]:rounded-[9px] min-[700px]:text-[23px] md:hidden"
        role="radiogroup"
        aria-label="Trip type"
      >
        <span
          aria-hidden="true"
          className="absolute bottom-0 left-0 top-0 z-0 w-1/2 bg-[#f3f7ff] transition-transform duration-300 ease-[cubic-bezier(.16,1,.3,1)]"
          style={{transform: tripType === 'return' ? 'translateX(100%)' : 'translateX(0)'}}
        />
        <button
          type="button"
          role="radio"
          aria-checked={tripType === 'onward'}
          data-active={tripType === 'onward'}
          onClick={() => setTripType('onward')}
          className={[
            'relative z-10 h-[48px] border-r border-[#c8d8ff] bg-transparent transition-colors duration-150 max-[359px]:h-[42px] min-[700px]:h-[96px]',
            tripType === 'onward' ? 'text-primary' : 'text-secondary hover:text-primary',
          ].join(' ')}
        >
          {t(messages, 'home.form.onward')}
        </button>
        <button
          type="button"
          role="radio"
          aria-checked={tripType === 'return'}
          data-active={tripType === 'return'}
          onClick={() => setTripType('return')}
          className={[
            'relative z-10 h-[48px] bg-transparent transition-colors duration-150 max-[359px]:h-[42px] min-[700px]:h-[96px]',
            tripType === 'return' ? 'text-primary' : 'text-secondary hover:text-primary',
          ].join(' ')}
        >
          {t(messages, 'home.form.return')}
        </button>
      </div>

      <div className="mt-[29px] grid w-full min-w-0 grid-cols-2 gap-x-[16px] gap-y-[30px] max-[359px]:gap-x-[8px] min-[700px]:mt-[58px] min-[700px]:gap-x-[17px] min-[700px]:gap-y-[32px] md:mt-0 md:grid-cols-12 md:gap-x-[20px] md:gap-y-[22px] md:px-[27px] md:pb-[18px] md:pt-[20px]">
        <BookingField
          label={t(messages, 'home.form.from')}
          icon={PlaneTakeoff}
          value={form.from}
          onChange={(value) => setField('from', value)}
          onClear={() => setField('from', '')}
          suggestions
          popupId="from"
          activePopup={activePopup}
          setActivePopup={setActivePopup}
          iconClassName="translate-y-[2px] min-[700px]:translate-y-[4px] md:translate-y-0"
          className="md:col-span-6"
        />

        <BookingField
          label={t(messages, 'home.form.to')}
          icon={PlaneLanding}
          value={form.to}
          onChange={(value) => setField('to', value)}
          onClear={() => setField('to', '')}
          suggestions
          popupId="to"
          activePopup={activePopup}
          setActivePopup={setActivePopup}
          className="md:col-span-6"
        />

        <DateField
          label={t(messages, 'home.form.departure')}
          value={form.departure}
          onChange={(value) => selectDate('departure', value)}
          onClear={() => setField('departure', '')}
          open={activePopup === 'departure'}
          onToggle={() => setActivePopup((current) => (current === 'departure' ? null : 'departure'))}
          onClose={() => setActivePopup(null)}
          title="Select Departure Date"
          className={tripType === 'onward' ? 'col-span-2 md:col-span-8' : 'md:col-span-4'}
        />

        {tripType === 'return' ? (
          <DateField
            label={t(messages, 'home.form.arrival')}
            value={form.arrival}
            onChange={(value) => selectDate('arrival', value)}
            onClear={() => setField('arrival', '')}
            open={activePopup === 'arrival'}
            onToggle={() => setActivePopup((current) => (current === 'arrival' ? null : 'arrival'))}
            onClose={() => setActivePopup(null)}
            title="Select Return Date"
            className="md:col-span-4"
          />
        ) : null}

        <div className="col-span-2 mt-[8px] flex min-w-0 items-end md:col-span-4 md:mt-0">
          <button className="flex h-[45px] w-full items-center justify-center rounded-[5px] bg-primary text-[14px] font-[600] tracking-[-0.01em] text-white max-[359px]:text-[13px] min-[700px]:h-[89px] min-[700px]:text-[23px] md:h-[43px] md:rounded-[7px]">
            {t(messages, 'home.form.cta')}
          </button>
        </div>
      </div>

      <div className="mt-[58px] grid w-full min-w-0 grid-cols-3 divide-x divide-border bg-white text-[10.5px] font-[600] leading-[1.65] tracking-[-0.01em] text-secondary max-[359px]:mt-[42px] max-[359px]:text-[8px] max-[359px]:leading-[1.35] min-[700px]:mt-[62px] min-[700px]:text-[16px] md:mt-0 md:min-h-[56px] md:divide-x md:border-t md:border-border md:text-[11px] md:font-[500] md:text-muted">
        <div className="flex min-w-0 flex-col items-center justify-start gap-[8px] px-[6px] text-center max-[359px]:gap-[6px] max-[359px]:px-[4px] min-[700px]:gap-[13px] md:flex-row md:gap-[10px] md:px-[27px] md:py-3 md:text-left">
          <Lock className="size-[25px] shrink-0 text-primary max-[359px]:size-[20px] min-[700px]:size-[47px] md:size-[15px] md:text-success" aria-hidden="true" />
          <span className="min-[700px]:max-w-[110px]">{t(messages, 'home.trust.ssl')}</span>
        </div>
        <div className="flex min-w-0 flex-col items-center justify-start gap-[8px] px-[6px] text-center max-[359px]:gap-[6px] max-[359px]:px-[4px] min-[700px]:gap-[13px] md:flex-row md:justify-center md:gap-[10px] md:px-[27px] md:py-3 md:text-left">
          <ShieldCheck className="size-[25px] shrink-0 text-primary max-[359px]:size-[20px] min-[700px]:size-[47px] md:hidden" aria-hidden="true" />
          <ShieldPlus className="hidden size-[15px] text-tertiary md:block" aria-hidden="true" />
          <span className="min-[700px]:max-w-[120px]">{t(messages, 'home.trust.customers')}</span>
        </div>
        <div className="flex min-w-0 flex-col items-center justify-start gap-[8px] px-[6px] text-center max-[359px]:gap-[6px] max-[359px]:px-[4px] min-[700px]:gap-[13px] md:flex-row md:justify-center md:gap-[10px] md:px-[27px] md:py-3 md:text-left">
          <Globe2 className="size-[25px] shrink-0 text-primary max-[359px]:size-[20px] min-[700px]:size-[47px] md:size-[15px] md:text-tertiary" aria-hidden="true" />
          <span className="min-[700px]:max-w-[110px]">{t(messages, 'home.trust.worldwide')}</span>
        </div>
      </div>

      <div className="mt-[39px] bg-white text-center min-[700px]:mt-[10px] md:mt-0 md:border-t md:border-border md:px-[27px] md:py-3">
        <div className="text-[10px] font-[700] uppercase tracking-[0.25em] text-muted min-[700px]:text-[16px] md:hidden">{t(messages, 'home.trust.payment')}</div>
        <div className="mt-[18px] grid w-full min-w-0 grid-cols-3 gap-[16px] max-[359px]:gap-[8px] min-[700px]:mt-[19px] min-[700px]:gap-[32px] md:mt-0 md:flex md:items-center md:justify-end md:gap-[10px]">
          <span className="hidden text-[8px] font-[650] uppercase tracking-[0.055em] text-secondary md:inline">{t(messages, 'home.trust.payment')}</span>
          <span className="flex h-[37px] items-center justify-center rounded-[4px] border border-border bg-white px-[10px] min-[700px]:h-[72px] md:h-[20px] md:w-[33px] md:rounded-[7px] md:border-0 md:bg-surface-tint md:px-[4px]">
            <Image src="/apple_pay_logo.png" alt="Apple Pay" width={350} height={144} className="h-[18px] w-auto object-contain min-[700px]:h-[34px] md:h-[10px]" />
          </span>
          <span className="flex h-[37px] items-center justify-center rounded-[4px] border border-border bg-white px-[10px] min-[700px]:h-[72px] md:h-[20px] md:w-[24px] md:rounded-[7px] md:border-0 md:bg-surface-tint md:px-[5px]">
            <Image src="/paypal_logo.png" alt="PayPal" width={402} height={497} className="h-[25px] w-auto object-contain min-[700px]:h-[48px] md:h-[13px]" />
          </span>
          <span className="flex h-[37px] items-center justify-center rounded-[4px] border border-border bg-white px-[10px] min-[700px]:h-[72px] md:h-[20px] md:w-[35px] md:rounded-[7px] md:border-0 md:bg-surface-tint md:px-[5px]">
            <Image src="/visa_logo.jpeg" alt="Visa" width={400} height={200} className="h-[18px] w-auto object-contain min-[700px]:h-[34px] md:h-[10px]" />
          </span>
        </div>
      </div>
    </div>
  )
}
