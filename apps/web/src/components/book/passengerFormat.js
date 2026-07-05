export function capitalizePassengerText(value = '') {
  return String(value)
    .trim()
    .replace(/\S+/g, (word) => word.charAt(0).toUpperCase() + word.slice(1))
}

export function formatPassengerName(passengerDetails = {}) {
  return [
    passengerDetails.title,
    capitalizePassengerText(passengerDetails.firstName),
    capitalizePassengerText(passengerDetails.lastName),
  ]
    .filter(Boolean)
    .join(' ')
}
