import {Suspense} from 'react'
import BookingForm from '@/components/shared/BookingForm'
import {t} from '@/messages'

export default function HomeHero({locale, messages}) {
  return (
    <section className="flex min-h-[calc(100svh-64px)] w-full max-w-full items-start px-6 pb-5 pt-5 min-[700px]:min-h-[calc(100svh-114px)] min-[700px]:px-8 min-[700px]:pb-14 min-[700px]:pt-12 md:min-h-[calc(100svh-76px)] md:px-6 md:pb-12 md:pt-8">
      <div className="mx-auto flex w-full max-w-[1160px] min-w-0 flex-col items-center text-center">
        <p className="max-w-full text-center font-[var(--font-display)] text-[13px] font-[700] leading-none tracking-[0.04em] text-primary min-[700px]:text-[16px] md:text-[14px]">
          {t(messages, 'home.eyebrow')}
        </p>
        <h1 className="mt-6 w-full max-w-[calc(100vw-48px)] min-w-0 font-[var(--font-display)] text-[33px] font-[700] leading-[1.08] tracking-normal text-secondary max-[359px]:text-[29px] min-[700px]:mt-10 min-[700px]:max-w-[780px] min-[700px]:text-[68px] md:mt-9 md:max-w-[820px] md:text-[68px]">
          <span className="block min-w-0 break-words">{t(messages, 'home.title.lineOne')}</span>
          <span className="block text-primary">{t(messages, 'home.title.lineTwo')}</span>
        </h1>
        <p className="mt-4 w-full max-w-[340px] min-w-0 text-[14px] font-[400] leading-[1.5] tracking-normal text-muted min-[700px]:mt-7 min-[700px]:max-w-[680px] min-[700px]:text-[21px] md:mt-6 md:max-w-[660px] md:text-[18px]">
          {t(messages, 'home.description')}
        </p>
        <Suspense fallback={null}>
          <BookingForm locale={locale} />
        </Suspense>
      </div>
    </section>
  )
}
