import {t} from '@/messages'
import {FAQS} from './homeData'

export default function HomeFaq({messages}) {
  return (
    <section id="faq" className="bg-white px-6 py-16 min-[700px]:px-8 min-[700px]:py-24 md:px-6">
      <div className="mx-auto w-full max-w-[1160px]">
        <div className="mx-auto max-w-[720px] text-center">
          <p className="font-[var(--font-display)] text-[13px] font-[700] leading-none tracking-[0.04em] text-primary min-[700px]:text-[16px] md:text-[14px]">{t(messages, 'home.faq.eyebrow')}</p>
          <h2 className="mt-4 font-[var(--font-display)] text-[34px] font-[750] leading-[1.08] tracking-normal text-secondary min-[700px]:text-[48px]">
            {t(messages, 'home.faq.title')}
          </h2>
          <p className="mt-5 text-[14px] font-[400] leading-[1.5] tracking-normal text-muted min-[700px]:text-[21px] md:text-[18px]">{t(messages, 'home.faq.text')}</p>
        </div>

        <div className="mx-auto mt-10 grid max-w-[846px] gap-3 min-[700px]:mt-12">
          {FAQS.map(({questionKey, answerKey}) => (
            <details key={questionKey} className="idt-card-hover group rounded-[5px] border border-border bg-white p-5">
              <summary className="cursor-pointer list-none font-[var(--font-display)] text-[17px] font-[800] text-secondary marker:hidden">
                <span className="flex items-center justify-between gap-4">
                  {t(messages, questionKey)}
                  <span className="text-primary transition-transform group-open:rotate-45">+</span>
                </span>
              </summary>
              <p className="mt-3 text-[14px] leading-[1.65] text-muted">{t(messages, answerKey)}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
