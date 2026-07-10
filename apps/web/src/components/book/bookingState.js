'use client'

import {t} from '@/messages'

export const BOOKING_STORAGE_KEY = 'idt.booking.search'

function fallbackTrip(messages) {
  return {
    tripType: 'return',
    type: t(messages, 'book.trip.type'),
    fromCode: t(messages, 'book.trip.fromCode'),
    fromCity: t(messages, 'book.trip.fromCity'),
    toCode: t(messages, 'book.trip.toCode'),
    toCity: t(messages, 'book.trip.toCity'),
    departDate: t(messages, 'book.trip.departDate'),
    returnDate: t(messages, 'book.trip.returnDate'),
  }
}

export function getDefaultBookingTrip(messages) {
  return fallbackTrip(messages)
}

function parseLocation(value, fallbackCode, fallbackCity) {
  const trimmed = String(value || '').trim()
  if (!trimmed) {
    return {code: fallbackCode, city: fallbackCity}
  }

  const match = trimmed.match(/^(.*?)\s*\(([A-Z0-9]{3,4})\)\s*$/i)
  if (match) {
    return {
      city: match[1].trim() || fallbackCity,
      code: match[2].toUpperCase(),
    }
  }

  return {
    city: trimmed,
    code: fallbackCode,
  }
}

function formatTravelDate(value, fallback) {
  const trimmed = String(value || '').trim()
  if (!trimmed) return fallback

  const date = new Date(trimmed)
  if (Number.isNaN(date.getTime())) return trimmed

  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date)
}

export function getSavedBookingTrip(messages) {
  const fallback = fallbackTrip(messages)

  if (typeof window === 'undefined') return fallback

  try {
    const saved = window.sessionStorage.getItem(BOOKING_STORAGE_KEY)
    if (!saved) return fallback

    const parsed = JSON.parse(saved)
    const from = parseLocation(parsed.from, fallback.fromCode, fallback.fromCity)
    const to = parseLocation(parsed.to, fallback.toCode, fallback.toCity)
    const tripType = parsed.tripType === 'onward' ? 'onward' : 'return'
    const departDate = formatTravelDate(parsed.departure, fallback.departDate)
    const returnDate = tripType === 'return' ? formatTravelDate(parsed.arrival, fallback.returnDate) : ''

    return {
      tripType,
      type: tripType === 'onward' ? t(messages, 'home.form.onward') : t(messages, 'home.form.return'),
      fromCode: from.code,
      fromCity: from.city,
      toCode: to.code,
      toCity: to.city,
      departDate,
      returnDate,
    }
  } catch {
    window.sessionStorage.removeItem(BOOKING_STORAGE_KEY)
    return fallback
  }
}

export function getTripRouteSummary(trip) {
  const route = `${trip.fromCity} (${trip.fromCode}) to ${trip.toCity} (${trip.toCode})`
  if (trip.tripType === 'onward') {
    return `${route} • ${trip.departDate}`
  }

  return `${route} • ${trip.departDate} - Return: ${trip.returnDate}`
}

export function getFlightsForTrip(messages, trip) {
  const sourceFlights = messages.book.flights

  return sourceFlights
    .map((flight, index) => {
      const isReturn = index % 2 === 1
      if (trip.tripType === 'onward' && isReturn) return null

      return {
        ...flight,
        kind: isReturn ? t(messages, 'book.badges.return') : t(messages, 'book.badges.onward'),
        fromCode: isReturn ? trip.toCode : trip.fromCode,
        fromCity: isReturn ? trip.toCity : trip.fromCity,
        toCode: isReturn ? trip.fromCode : trip.toCode,
        toCity: isReturn ? trip.fromCity : trip.toCity,
        date: isReturn ? trip.returnDate : trip.departDate,
      }
    })
    .filter(Boolean)
}
