export const MOBILE_AUTO_ADVANCE_DELAY_MS = 260

export function shouldAutoAdvanceOnMobile() {
  return typeof window !== 'undefined' && window.matchMedia('(max-width: 699px)').matches
}
