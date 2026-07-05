import {t} from '@/messages'
import {LEGAL_ROWS} from './homeData'

export default function HomeLegal({messages}) {
  return (
    <section className="bg-white px-6 py-16 min-[700px]:px-8 min-[700px]:py-24 md:px-6">
      <div className="mx-auto grid w-full max-w-[1160px] gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="font-[var(--font-display)] text-[13px] font-[700] leading-none tracking-[0.04em] text-primary min-[700px]:text-[16px] md:text-[14px]">{t(messages, 'home.legal.eyebrow')}</p>
          <h2 className="mt-4 font-[var(--font-display)] text-[34px] font-[750] leading-[1.08] tracking-normal text-secondary min-[700px]:text-[48px]">
            {t(messages, 'home.legal.title')}
          </h2>
          <p className="mt-5 text-[14px] font-[400] leading-[1.5] tracking-normal text-muted min-[700px]:text-[21px] md:text-[18px]">{t(messages, 'home.legal.text')}</p>
        </div>
        <div className="overflow-hidden rounded-[5px] border border-border bg-white">
          {LEGAL_ROWS.map(({mythKey, truthKey}) => (
            <div key={mythKey} className="grid gap-3 border-b border-border p-4 last:border-b-0 min-[700px]:grid-cols-[0.9fr_1.1fr]">
              <p className="text-[14px] font-[750] text-secondary">{t(messages, mythKey)}</p>
              <p className="text-[14px] leading-[1.55] text-muted">{t(messages, truthKey)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
