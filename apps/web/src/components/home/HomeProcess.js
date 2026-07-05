import {t} from '@/messages'
import {PROCESS_STEPS} from './homeData'

export default function HomeProcess({messages}) {
  return (
    <section className="bg-white px-6 py-16 min-[700px]:px-8 min-[700px]:py-24 md:px-6">
      <div className="mx-auto w-full max-w-[1160px]">
        <div className="mx-auto max-w-[720px] text-center">
          <p className="font-[var(--font-display)] text-[13px] font-[700] leading-none tracking-[0.04em] text-primary min-[700px]:text-[16px] md:text-[14px]">{t(messages, 'home.process.eyebrow')}</p>
          <h2 className="mt-4 font-[var(--font-display)] text-[34px] font-[750] leading-[1.08] tracking-normal text-secondary min-[700px]:text-[48px]">
            {t(messages, 'home.process.title')}
          </h2>
          <p className="mt-5 text-[14px] font-[400] leading-[1.5] tracking-normal text-muted min-[700px]:text-[21px] md:text-[18px]">{t(messages, 'home.process.text')}</p>
        </div>
        <div className="mt-10 grid gap-3 md:grid-cols-3">
          {PROCESS_STEPS.map(({titleKey, textKey}, index) => (
            <article key={titleKey} className="idt-card-hover group rounded-[5px] border border-border bg-white p-6 text-center">
              <div className="mx-auto flex size-11 items-center justify-center rounded-full bg-primary font-[var(--font-display)] text-[15px] font-[800] text-white transition-transform group-hover:scale-105">
                {String(index + 1).padStart(2, '0')}
              </div>
              <h3 className="mt-5 font-[var(--font-display)] text-[18px] font-[800] text-secondary">{t(messages, titleKey)}</h3>
              <p className="mt-2 text-[14px] leading-[1.6] text-muted">{t(messages, textKey)}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
