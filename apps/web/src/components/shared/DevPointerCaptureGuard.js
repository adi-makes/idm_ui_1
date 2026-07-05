'use client'

import {useEffect} from 'react'

export default function DevPointerCaptureGuard() {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development' || typeof Element === 'undefined') return undefined

    const originalReleasePointerCapture = Element.prototype.releasePointerCapture
    if (typeof originalReleasePointerCapture !== 'function') return undefined

    function releasePointerCapture(pointerId) {
      try {
        return originalReleasePointerCapture.call(this, pointerId)
      } catch (error) {
        const isMissingPointerCapture =
          error instanceof DOMException &&
          error.name === 'NotFoundError' &&
          String(error.message || '').includes('No active pointer')

        if (isMissingPointerCapture) return undefined
        throw error
      }
    }

    Element.prototype.releasePointerCapture = releasePointerCapture

    return () => {
      if (Element.prototype.releasePointerCapture === releasePointerCapture) {
        Element.prototype.releasePointerCapture = originalReleasePointerCapture
      }
    }
  }, [])

  return null
}
