'use client'

import {useEffect, useState} from 'react'
import {BadgeCheck, ChevronLeft, ChevronRight, Star} from 'lucide-react'
import {t} from '@/messages'
import {TESTIMONIALS} from './homeData'

export default function HomeTestimonials({messages}) {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeTestimonial = TESTIMONIALS[activeIndex]

  const showPrevious = () => {
    setActiveIndex((current) => (current - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)
  }

  const showNext = () => {
    setActiveIndex((current) => (current + 1) % TESTIMONIALS.length)
  }

  const carouselControls = (
    <>
      <button
        type="button"
        onClick={showPrevious}
        className="grid size-10 place-items-center rounded-full bg-white text-secondary transition-colors hover:text-primary"
        aria-label="Previous testimonial"
      >
        <ChevronLeft className="size-5" aria-hidden="true" />
      </button>

      <div className="flex items-center gap-2" aria-label="Testimonial slides">
        {TESTIMONIALS.map((item, index) => (
          <button
            type="button"
            key={item.nameKey}
            onClick={() => setActiveIndex(index)}
            aria-label={`Show testimonial ${index + 1}`}
            aria-current={activeIndex === index}
            className={[
              'h-2.5 rounded-full transition-all',
              activeIndex === index ? 'w-7 bg-primary' : 'w-2.5 bg-border-strong hover:bg-muted/40',
            ].join(' ')}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={showNext}
        className="grid size-10 place-items-center rounded-full bg-white text-secondary transition-colors hover:text-primary"
        aria-label="Next testimonial"
      >
        <ChevronRight className="size-5" aria-hidden="true" />
      </button>
    </>
  )

  useEffect(() => {
    const interval = window.setInterval(showNext, 5000)
    return () => window.clearInterval(interval)
  }, [])

  return (
    <section className="bg-surface-muted px-6 py-16 min-[700px]:px-8 min-[700px]:py-24 md:px-6">
      <div className="mx-auto w-full max-w-[1160px]">
        <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
          <div className="max-w-[520px]">
            <p className="font-[var(--font-display)] text-[13px] font-[700] leading-none tracking-[0.04em] text-primary min-[700px]:text-[16px] md:text-[14px]">{t(messages, 'home.testimonials.eyebrow')}</p>
            <h2 className="mt-4 font-[var(--font-display)] text-[34px] font-[750] leading-[1.08] tracking-normal text-secondary min-[700px]:text-[48px]">
              {t(messages, 'home.testimonials.title')}
            </h2>
            <p className="mt-5 text-[14px] font-[400] leading-[1.5] tracking-normal text-muted min-[700px]:text-[21px] md:text-[18px]">{t(messages, 'home.testimonials.text')}</p>

            <div className="mt-8 hidden items-center justify-start gap-3 lg:flex">
              {carouselControls}
            </div>
          </div>

          <div className="w-full max-w-[540px] justify-self-end">
            <article className="idt-card-hover rounded-[5px] border border-[#E5E7EB] bg-white p-5 focus-within:border-primary min-[700px]:px-6 min-[700px]:py-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-1 text-[#f5a400]" aria-label="5 stars">
                  {Array.from({length: 5}).map((_, index) => (
                    <Star key={index} className="size-4 fill-current" aria-hidden="true" />
                  ))}
                </div>
                <span
                  className="grid size-10 place-items-center rounded-full bg-surface-muted"
                  aria-label={t(messages, activeTestimonial.tagKey)}
                  title={t(messages, activeTestimonial.tagKey)}
                >
                  <CountryFlag code={activeTestimonial.countryCode} />
                </span>
              </div>

              <div className="mt-5">
                <span className="block font-[var(--font-display)] text-[34px] font-[800] leading-none text-primary/25" aria-hidden="true">
                  &rdquo;
                </span>
                <p className="mt-1 max-w-[460px] text-[16px] font-[400] leading-[1.5] text-muted min-[700px]:text-[17px]">
                  {t(messages, activeTestimonial.quoteKey)}
                </p>
              </div>

              <div className="mt-5 flex items-center justify-between gap-4 border-t border-dashed border-border pt-4">
                <div>
                  <p className="text-[14px] font-[800] text-secondary">{t(messages, activeTestimonial.nameKey)}</p>
                  <p className="mt-1 text-[13px] font-[600] text-muted">{t(messages, activeTestimonial.tagKey)}</p>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-surface-tint px-3 py-1 text-[12px] font-[800] text-primary">
                  <BadgeCheck className="size-4" aria-hidden="true" />
                  {t(messages, activeTestimonial.statusKey)}
                </span>
              </div>
            </article>

            <div className="mt-6 flex items-center justify-center gap-3 lg:hidden">
              {carouselControls}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function CountryFlag({code}) {
  const commonProps = {
    className: 'h-5 w-7 overflow-hidden rounded-[2px] ring-1 ring-border',
    viewBox: '0 0 28 20',
    role: 'img',
    'aria-hidden': 'true',
  }

  switch (code) {
    case 'AE':
      return (
        <svg {...commonProps}>
          <rect width="28" height="20" fill="#fff" />
          <rect width="7" height="20" fill="#ff0000" />
          <rect x="7" width="21" height="6.67" fill="#009a44" />
          <rect x="7" y="13.33" width="21" height="6.67" fill="#000" />
        </svg>
      )
    case 'DE':
      return (
        <svg {...commonProps}>
          <rect width="28" height="6.67" fill="#000" />
          <rect y="6.67" width="28" height="6.67" fill="#dd0000" />
          <rect y="13.33" width="28" height="6.67" fill="#ffce00" />
        </svg>
      )
    case 'ES':
      return (
        <svg {...commonProps}>
          <rect width="28" height="20" fill="#f1bf00" />
          <rect width="28" height="5" fill="#aa151b" />
          <rect y="15" width="28" height="5" fill="#aa151b" />
        </svg>
      )
    case 'GB':
      return (
        <svg {...commonProps}>
          <rect width="28" height="20" fill="#012169" />
          <path d="M0 0l28 20M28 0L0 20" stroke="#fff" strokeWidth="4" />
          <path d="M0 0l28 20M28 0L0 20" stroke="#c8102e" strokeWidth="2" />
          <path d="M14 0v20M0 10h28" stroke="#fff" strokeWidth="6" />
          <path d="M14 0v20M0 10h28" stroke="#c8102e" strokeWidth="3.4" />
        </svg>
      )
    case 'IN':
    default:
      return (
        <svg {...commonProps}>
          <rect width="28" height="6.67" fill="#ff9933" />
          <rect y="6.67" width="28" height="6.67" fill="#fff" />
          <rect y="13.33" width="28" height="6.67" fill="#138808" />
          <circle cx="14" cy="10" r="2.1" fill="none" stroke="#000080" strokeWidth="0.8" />
        </svg>
      )
  }
}
