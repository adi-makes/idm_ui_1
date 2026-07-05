import {t} from '@/messages'
import {DIFFERENTIATORS} from './homeData'

export default function HomeDifferentiators({messages}) {
  return (
    <section className="bg-surface-muted px-6 py-16 min-[700px]:px-8 min-[700px]:py-24 md:px-6">
      <div className="mx-auto w-full max-w-[1160px]">
        <div className="mx-auto max-w-[760px] text-center">
          <p className="font-[var(--font-display)] text-[13px] font-[700] leading-none tracking-[0.04em] text-primary min-[700px]:text-[16px] md:text-[14px]">{t(messages, 'home.differentiators.eyebrow')}</p>
          <h2 className="mt-4 font-[var(--font-display)] text-[34px] font-[750] leading-[1.08] tracking-normal text-secondary min-[700px]:text-[48px]">
            {t(messages, 'home.differentiators.title')}
          </h2>
          <p className="mt-5 text-[14px] font-[400] leading-[1.5] tracking-normal text-muted min-[700px]:text-[21px] md:text-[18px]">{t(messages, 'home.differentiators.text')}</p>
        </div>

        <div className="mt-10 grid overflow-hidden rounded-[5px] border border-border bg-white min-[700px]:mt-12 min-[700px]:grid-cols-2 lg:grid-cols-3">
          {DIFFERENTIATORS.map(({icon: Icon, titleKey, textKey}) => (
            <article
              key={titleKey}
              className="idt-cell-hover group flex gap-4 border-b border-border p-5 [&:last-child]:border-b-0 min-[700px]:border-r min-[700px]:p-6 min-[700px]:[&:nth-child(2n)]:border-r-0 min-[700px]:[&:nth-last-child(-n+2)]:border-b-0 lg:[&:nth-child(2n)]:border-r lg:[&:nth-child(3n)]:border-r-0 lg:[&:nth-last-child(-n+3)]:border-b-0"
            >
              <Icon className="mt-1 size-5 shrink-0 text-primary transition-transform group-hover:scale-110" aria-hidden="true" />
              <div>
                <h3 className="font-[var(--font-display)] text-[16px] font-[750] leading-[1.25] text-secondary">{t(messages, titleKey)}</h3>
                <p className="mt-2 text-[14px] leading-[1.55] text-muted">{t(messages, textKey)}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
