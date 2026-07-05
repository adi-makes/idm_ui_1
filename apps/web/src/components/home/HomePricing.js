'use client'

import Link from 'next/link'
import {Check} from 'lucide-react'
import {t} from '@/messages'
import {localizedPath} from '@/i18n/routing'
import {PRICING_PLANS} from './homeData'

const BOOKING_STEP_STORAGE_KEY = 'idt.booking.step'

export default function HomePricing({locale, messages}) {
  const resetBookingStep = () => {
    window.sessionStorage.removeItem(BOOKING_STEP_STORAGE_KEY)
  }

  return (
    <section id="pricing" className="bg-white px-6 py-16 min-[700px]:px-8 min-[700px]:py-24 md:px-6">
      <div className="mx-auto w-full max-w-[1160px]">
        <div className="mx-auto max-w-[720px] text-center">
          <p className="font-[var(--font-display)] text-[13px] font-[700] leading-none tracking-[0.04em] text-primary min-[700px]:text-[16px] md:text-[14px]">{t(messages, 'home.pricing.eyebrow')}</p>
          <h2 className="mt-4 font-[var(--font-display)] text-[34px] font-[750] leading-[1.08] tracking-normal text-secondary min-[700px]:text-[48px]">
            {t(messages, 'home.pricing.title')}
          </h2>
          <p className="mt-5 text-[14px] font-[400] leading-[1.5] tracking-normal text-muted min-[700px]:text-[21px] md:text-[18px]">{t(messages, 'home.pricing.text')}</p>
        </div>
        <div className="idt-pricing-grid mt-10 grid gap-3 lg:grid-cols-3">
          {PRICING_PLANS.map((plan) => (
            <article key={plan.titleKey} className={['idt-pricing-card idt-card-hover rounded-[5px] border bg-white p-6', plan.featured ? 'border-primary' : 'border-border'].join(' ')}>
              <span className={['rounded-full px-3 py-1 text-[11px] font-[800] uppercase tracking-[0.08em]', plan.featured ? 'bg-primary text-white' : 'bg-surface-tint text-primary'].join(' ')}>
                {t(messages, plan.badgeKey)}
              </span>
              <h3 className="mt-5 font-[var(--font-display)] text-[22px] font-[800] text-secondary">{t(messages, plan.titleKey)}</h3>
              <p className="mt-3 font-[var(--font-display)] text-[34px] font-[850] text-primary">{t(messages, plan.priceKey)}</p>
              <ul className="mt-5 grid gap-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-3 text-[14px] text-muted">
                    <Check className="mt-0.5 size-4 shrink-0 text-success" aria-hidden="true" />
                    <span>{t(messages, feature)}</span>
                  </li>
                ))}
              </ul>
              <Link href={localizedPath(locale, '/book')} onClick={resetBookingStep} className={['mt-6 flex h-[46px] items-center justify-center rounded-[5px] font-[var(--font-display)] text-[15px] font-[800] transition-colors', plan.featured ? 'bg-primary text-white hover:bg-primary/90' : 'border border-border text-secondary hover:border-primary hover:text-primary'].join(' ')}>
                {t(messages, plan.ctaKey)}
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
