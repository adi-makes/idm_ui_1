import {Check, Plane} from 'lucide-react'
import {t} from '@/messages'
import {SAMPLE_ITEMS} from './homeData'

export default function HomeSample({messages}) {
  return (
    <section id="sample-ticket" className="bg-surface-muted px-6 py-16 min-[700px]:px-8 min-[700px]:py-24 md:px-6">
      <div className="mx-auto grid w-full max-w-[1160px] gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div>
          <p className="font-[var(--font-display)] text-[13px] font-[700] leading-none tracking-[0.04em] text-primary min-[700px]:text-[16px] md:text-[14px]">{t(messages, 'home.sample.eyebrow')}</p>
          <h2 className="mt-4 font-[var(--font-display)] text-[34px] font-[750] leading-[1.08] tracking-normal text-secondary min-[700px]:text-[48px]">
            {t(messages, 'home.sample.title')}
          </h2>
          <p className="mt-5 text-[14px] font-[400] leading-[1.5] tracking-normal text-muted min-[700px]:text-[21px] md:text-[18px]">{t(messages, 'home.sample.text')}</p>
          <ul className="mt-6 grid gap-3">
            {SAMPLE_ITEMS.map((item) => (
              <li key={item} className="flex gap-3 text-[14px] leading-[1.55] text-secondary">
                <Check className="mt-0.5 size-4 shrink-0 text-success" aria-hidden="true" />
                <span>{t(messages, item)}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-[5px] border border-border bg-white p-4">
          <div className="rounded-[5px] border border-border bg-surface-tint p-5">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div>
                <p className="text-[11px] font-[800] uppercase tracking-[0.12em] text-muted">{t(messages, 'home.sample.mockup.label')}</p>
                <p className="mt-1 font-[var(--font-display)] text-[20px] font-[800] text-secondary">{t(messages, 'home.sample.mockup.title')}</p>
              </div>
              <Plane className="size-7 text-primary" aria-hidden="true" />
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3 text-[13px]">
              <div className="rounded-[5px] bg-white p-3">
                <span className="block text-muted">{t(messages, 'home.sample.mockup.fromLabel')}</span>
                <strong className="mt-1 block text-secondary">{t(messages, 'home.sample.mockup.from')}</strong>
              </div>
              <div className="rounded-[5px] bg-white p-3">
                <span className="block text-muted">{t(messages, 'home.sample.mockup.toLabel')}</span>
                <strong className="mt-1 block text-secondary">{t(messages, 'home.sample.mockup.to')}</strong>
              </div>
              <div className="rounded-[5px] bg-white p-3">
                <span className="block text-muted">{t(messages, 'home.sample.mockup.pnrLabel')}</span>
                <strong className="mt-1 block text-secondary">{t(messages, 'home.sample.mockup.pnr')}</strong>
              </div>
              <div className="rounded-[5px] bg-white p-3">
                <span className="block text-muted">{t(messages, 'home.sample.mockup.statusLabel')}</span>
                <strong className="mt-1 block text-success">{t(messages, 'home.sample.mockup.status')}</strong>
              </div>
            </div>
            <div className="mt-4 rounded-[5px] bg-white p-3 text-[12px] leading-[1.6] text-muted">{t(messages, 'home.sample.mockup.note')}</div>
          </div>
        </div>
      </div>
    </section>
  )
}
