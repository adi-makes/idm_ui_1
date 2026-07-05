'use client'

import {useEffect, useState} from 'react'
import {CalendarDays, ChevronLeft, ChevronRight, X} from 'lucide-react'

const CALENDAR_DAYS = Array.from({length: 31}, (_, index) => index + 1)
const CALENDAR_YEAR = 2026
const CALENDAR_MONTH_INDEX = 6
const CALENDAR_TRANSITION_MS = 160

function getMinSelectableDay() {
  const today = new Date()
  const calendarEnd = new Date(CALENDAR_YEAR, CALENDAR_MONTH_INDEX, 31)

  if (today.getFullYear() === CALENDAR_YEAR && today.getMonth() === CALENDAR_MONTH_INDEX) {
    return today.getDate()
  }

  if (today > calendarEnd) {
    return 32
  }

  return 1
}

export default function DateInput({
  label,
  value,
  error,
  onChange,
  onClear,
  open,
  onToggle,
  onClose,
  title,
  disabled = false,
  calendarAlign = 'left',
  className = '',
}) {
  const [mounted, setMounted] = useState(open)
  const [visible, setVisible] = useState(false)
  const minSelectableDay = getMinSelectableDay()
  const errorId = error ? `${title.toLowerCase().replaceAll(' ', '-')}-error` : undefined

  useEffect(() => {
    if (open) {
      const frame = requestAnimationFrame(() => {
        setMounted(true)
        setVisible(true)
      })
      return () => cancelAnimationFrame(frame)
    }

    const frame = requestAnimationFrame(() => setVisible(false))
    const timeout = setTimeout(() => setMounted(false), CALENDAR_TRANSITION_MS)
    return () => {
      cancelAnimationFrame(frame)
      clearTimeout(timeout)
    }
  }, [open])

  const handleClose = () => {
    setVisible(false)
    onClose()
  }

  const handleToggle = () => {
    if (disabled) return
    onToggle()
  }

  const handleClear = (event) => {
    if (disabled) return
    event.stopPropagation()
    onClear()
  }

  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        disabled={disabled}
        onClick={handleToggle}
        aria-disabled={disabled}
        aria-describedby={errorId}
        className={[
          'flex h-[50px] w-full items-center rounded-[5px] border bg-white px-4 text-[16px] font-[400] leading-6 tracking-normal transition-colors min-[700px]:h-[58px] min-[700px]:text-[17px] md:h-[48px] md:text-[15px]',
          error
            ? 'border-[#ff3b3b]'
            : disabled
              ? 'cursor-not-allowed border-border text-tertiary opacity-60'
              : open
                ? 'border-primary'
                : 'border-border-strong',
          disabled && error ? 'cursor-not-allowed opacity-100' : '',
          !disabled && value ? 'text-secondary' : 'text-tertiary',
        ].join(' ')}
      >
        <CalendarDays className="mr-2.5 size-[19px] shrink-0 text-tertiary min-[700px]:size-[21px] md:mr-2 md:size-[18px]" aria-hidden="true" />
        <span className="min-w-0 flex-1 truncate overflow-hidden whitespace-nowrap text-left">{value || label}</span>
        {value ? (
          <span
            role="button"
            tabIndex={0}
            onClick={handleClear}
            onKeyDown={(event) => {
              if (disabled) return
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault()
                event.stopPropagation()
                onClear()
              }
            }}
            aria-label={`Clear ${label}`}
            className="ml-2 flex size-[18px] shrink-0 items-center justify-center text-tertiary hover:text-secondary"
          >
            <X className="size-[16px]" aria-hidden="true" />
          </span>
        ) : null}
      </button>
      {error ? (
        <p id={errorId} className="mt-2 text-[12px] font-[500] text-[#ff2f2f]">
          {error}
        </p>
      ) : null}

      {mounted && !disabled ? (
        <div
          className={[
            'fixed inset-x-0 bottom-0 z-[9999]',
            'md:absolute md:inset-auto md:top-[56px] md:z-50 md:w-[320px] md:overflow-visible md:rounded-[5px] md:border md:border-border md:bg-white md:px-[22px] md:pb-[23px] md:pt-[23px]',
            calendarAlign === 'right' ? 'md:right-0' : 'md:left-0',
          ].join(' ')}
        >
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
              'relative z-[9999] w-full overflow-hidden rounded-[5px] bg-white transition-[transform,opacity] duration-150 ease-[cubic-bezier(.16,1,.3,1)] md:max-w-none md:overflow-visible',
              visible ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-full scale-[0.985] opacity-0 md:translate-y-0',
            ].join(' ')}
          >
            <div className="flex h-[66px] items-center justify-between border-b border-border px-[14px] md:hidden">
              <h2 className="text-[16px] font-[700] leading-none text-secondary">{title}</h2>
              <button type="button" onClick={handleClose} className="flex size-[28px] items-center justify-center text-secondary" aria-label="Close calendar">
                <X className="size-[19px]" aria-hidden="true" />
              </button>
            </div>

            <div className="flex items-center justify-between px-[29px] pb-[20px] pt-[25px] md:mb-[22px] md:px-0 md:pb-0 md:pt-0">
              <button type="button" disabled className="flex size-[22px] cursor-not-allowed items-center justify-center text-slate-300" aria-label="Previous month unavailable">
                <ChevronLeft className="size-[20px]" aria-hidden="true" />
              </button>
              <div className="text-[20px] font-[500] leading-none text-secondary md:text-[16px]">July 2026</div>
              <button type="button" className="flex size-[22px] items-center justify-center text-tertiary hover:text-secondary" aria-label="Next month">
                <ChevronRight className="size-[20px]" aria-hidden="true" />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-y-[19px] px-[29px] pb-[91px] text-center md:gap-y-[15px] md:px-0 md:pb-0">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="text-[11px] font-[700] leading-none text-muted md:text-[13px] md:font-[400] md:text-muted">
                  {day}
                </div>
              ))}
              {Array.from({length: 3}).map((_, index) => (
                <div key={`blank-${index}`} />
              ))}
              {CALENDAR_DAYS.map((day) => {
                const disabledDay = day < minSelectableDay
                const selected = value === `July ${day}, 2026`
                return (
                  <button
                    key={day}
                    type="button"
                    disabled={disabledDay}
                    onClick={() => onChange(`July ${day}, 2026`)}
                    className={[
                      'mx-auto flex size-[20px] items-center justify-center rounded-[5px] text-[18px] font-[400] leading-none md:size-[20px] md:text-[13px]',
                      disabledDay ? 'cursor-not-allowed text-slate-300' : 'text-secondary hover:border hover:border-secondary',
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
