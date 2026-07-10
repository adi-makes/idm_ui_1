'use client'

import {useEffect, useMemo, useState} from 'react'
import {CalendarDays, ChevronLeft, ChevronRight, X} from 'lucide-react'

const CALENDAR_TRANSITION_MS = 320
const DEFAULT_TRAVEL_MONTH = new Date(2026, 6, 1)
const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

function startOfDay(date) {
  const nextDate = new Date(date)
  nextDate.setHours(0, 0, 0, 0)
  return nextDate
}

function startOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

function addMonths(date, amount) {
  return new Date(date.getFullYear(), date.getMonth() + amount, 1)
}

function parseDateValue(value) {
  if (!value) return null

  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? null : date
}

function formatDateValue(date) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(date)
}

function datesEqual(a, b) {
  return a && b && startOfDay(a).getTime() === startOfDay(b).getTime()
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
  minDate,
  maxDate,
  initialMonthDate,
  quickSelect = false,
  controlClassName = '',
  className = '',
}) {
  const [mounted, setMounted] = useState(open)
  const [visible, setVisible] = useState(false)
  const selectedDate = parseDateValue(value)
  const today = useMemo(() => startOfDay(new Date()), [])
  const minSelectableDate = minDate ? startOfDay(minDate) : today
  const maxSelectableDate = maxDate ? startOfDay(maxDate) : null
  const initialCalendarMonth = startOfMonth(selectedDate || initialMonthDate || DEFAULT_TRAVEL_MONTH)
  const [calendarMonth, setCalendarMonth] = useState(initialCalendarMonth)
  const daysInMonth = new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + 1, 0).getDate()
  const leadingBlankDays = calendarMonth.getDay()
  const previousMonth = addMonths(calendarMonth, -1)
  const nextMonth = addMonths(calendarMonth, 1)
  const canGoPrevious = !minSelectableDate || new Date(previousMonth.getFullYear(), previousMonth.getMonth() + 1, 0) >= minSelectableDate
  const canGoNext = !maxSelectableDate || nextMonth <= startOfMonth(maxSelectableDate)
  const firstYear = minSelectableDate ? minSelectableDate.getFullYear() : calendarMonth.getFullYear() - 100
  const lastYear = maxSelectableDate ? maxSelectableDate.getFullYear() : calendarMonth.getFullYear() + 2
  const years = Array.from({length: lastYear - firstYear + 1}, (_, index) => lastYear - index)
  const errorId = error ? `${title.toLowerCase().replaceAll(' ', '-')}-error` : undefined

  useEffect(() => {
    if (open) {
      setMounted(true)
      let secondFrame = null
      const frame = requestAnimationFrame(() => {
        secondFrame = requestAnimationFrame(() => setVisible(true))
      })
      return () => {
        cancelAnimationFrame(frame)
        if (secondFrame) cancelAnimationFrame(secondFrame)
      }
    }

    const frame = requestAnimationFrame(() => setVisible(false))
    const timeout = setTimeout(() => setMounted(false), CALENDAR_TRANSITION_MS)
    return () => {
      cancelAnimationFrame(frame)
      clearTimeout(timeout)
    }
  }, [open])

  useEffect(() => {
    if (selectedDate) {
      setCalendarMonth(startOfMonth(selectedDate))
    }
  }, [value])

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

  const selectDate = (day) => {
    const selected = startOfDay(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth(), day))
    if (minSelectableDate && selected < minSelectableDate) return
    if (maxSelectableDate && selected > maxSelectableDate) return
    onChange(formatDateValue(selected))
  }

  const updateCalendarMonth = (month, year = calendarMonth.getFullYear()) => {
    const nextDate = startOfMonth(new Date(year, month, 1))
    if (minSelectableDate && new Date(nextDate.getFullYear(), nextDate.getMonth() + 1, 0) < minSelectableDate) return
    if (maxSelectableDate && nextDate > startOfMonth(maxSelectableDate)) return
    setCalendarMonth(nextDate)
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
          controlClassName,
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
              'relative z-[9999] max-h-[90vh] w-full overflow-y-auto rounded-t-[8px] bg-white transition-transform duration-300 ease-out md:max-h-none md:overflow-visible md:rounded-[5px] md:transition-[opacity,transform]',
              visible
                ? 'translate-y-0 md:opacity-100'
                : 'translate-y-full md:translate-y-2 md:opacity-0',
            ].join(' ')}
          >
            <div className="flex h-[66px] items-center justify-between border-b border-border px-[14px] md:hidden">
              <h2 className="text-[16px] font-[700] leading-none text-secondary">{title}</h2>
              <button type="button" onClick={handleClose} className="flex size-[28px] items-center justify-center text-secondary" aria-label="Close calendar">
                <X className="size-[19px]" aria-hidden="true" />
              </button>
            </div>

            <div className="flex items-center justify-between px-[29px] pb-[20px] pt-[25px] md:mb-[22px] md:px-0 md:pb-0 md:pt-0">
              <button
                type="button"
                disabled={!canGoPrevious}
                onClick={() => setCalendarMonth(previousMonth)}
                className={[
                  'flex size-[22px] items-center justify-center',
                  canGoPrevious ? 'text-tertiary hover:text-secondary' : 'cursor-not-allowed text-slate-300',
                ].join(' ')}
                aria-label="Previous month"
              >
                <ChevronLeft className="size-[20px]" aria-hidden="true" />
              </button>
              {quickSelect ? (
                <div className="grid min-w-0 grid-cols-[minmax(0,1fr)_84px] items-center gap-1 text-[20px] font-[500] leading-none text-secondary md:grid-cols-[1fr_86px] md:gap-2 md:text-[13px]">
                  <select
                    value={calendarMonth.getMonth()}
                    onChange={(event) => updateCalendarMonth(Number(event.target.value))}
                    className="h-[34px] min-w-0 rounded-[5px] border-0 bg-transparent px-1 text-center font-[500] text-secondary outline-none md:border md:border-border md:bg-white md:px-2 md:text-[13px] md:font-[600]"
                    aria-label="Select month"
                  >
                    {MONTH_NAMES.map((month, index) => (
                      <option key={month} value={index}>{month}</option>
                    ))}
                  </select>
                  <select
                    value={calendarMonth.getFullYear()}
                    onChange={(event) => updateCalendarMonth(calendarMonth.getMonth(), Number(event.target.value))}
                    className="h-[34px] min-w-0 rounded-[5px] border-0 bg-transparent px-1 text-center font-[500] text-secondary outline-none md:border md:border-border md:bg-white md:px-2 md:text-[13px] md:font-[600]"
                    aria-label="Select year"
                  >
                    {years.map((year) => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>
              ) : (
                <div className="text-[20px] font-[500] leading-none text-secondary md:text-[16px]">
                  {MONTH_NAMES[calendarMonth.getMonth()]} {calendarMonth.getFullYear()}
                </div>
              )}
              <button
                type="button"
                disabled={!canGoNext}
                onClick={() => setCalendarMonth(nextMonth)}
                className={[
                  'flex size-[22px] items-center justify-center',
                  canGoNext ? 'text-tertiary hover:text-secondary' : 'cursor-not-allowed text-slate-300',
                ].join(' ')}
                aria-label="Next month"
              >
                <ChevronRight className="size-[20px]" aria-hidden="true" />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-y-[19px] px-[29px] pb-[91px] text-center md:gap-y-[15px] md:px-0 md:pb-0">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <div key={day} className="text-[11px] font-[700] leading-none text-muted md:text-[13px] md:font-[400] md:text-muted">
                  {day}
                </div>
              ))}
              {Array.from({length: leadingBlankDays}).map((_, index) => (
                <div key={`blank-${index}`} />
              ))}
              {Array.from({length: daysInMonth}, (_, index) => index + 1).map((day) => {
                const date = startOfDay(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth(), day))
                const disabledDay = (minSelectableDate && date < minSelectableDate) || (maxSelectableDate && date > maxSelectableDate)
                const selected = datesEqual(selectedDate, date)
                return (
                  <button
                    key={day}
                    type="button"
                    disabled={disabledDay}
                    onClick={() => selectDate(day)}
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
