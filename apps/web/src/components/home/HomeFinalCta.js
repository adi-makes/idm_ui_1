import {t} from '@/messages'

export default function HomeFinalCta({messages}) {
  return (
    <section id="support" className="bg-white px-6 py-12 min-[700px]:px-8 min-[700px]:py-16 md:px-6">
      <div className="mx-auto w-full max-w-[1160px]">
        <div className="idt-card-hover grid gap-6 rounded-[5px] border border-secondary bg-secondary p-6 text-white min-[700px]:p-8 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="font-[var(--font-display)] text-[13px] font-[700] leading-none tracking-[0.04em] text-white/65">
              {t(messages, 'policies.common.ctaEyebrow')}
            </p>
            <h2 className="mt-3 max-w-[760px] font-[var(--font-display)] text-[34px] font-[750] leading-[1.08] text-white min-[700px]:text-[48px]">
              {t(messages, 'home.finalCta.title')}
            </h2>
            <p className="mt-5 max-w-[760px] text-[14px] font-[400] leading-[1.55] tracking-normal text-white/70 min-[700px]:text-[18px]">
              {t(messages, 'home.finalCta.text')}
            </p>
          </div>
          <a href="#main-content" className="inline-flex h-[60px] items-center justify-center rounded-[5px] bg-primary px-7 font-[var(--font-display)] text-[16px] font-[800] text-white transition-colors hover:bg-primary/90 md:self-center">
            {t(messages, 'policies.common.ctaButton')}
          </a>
        </div>
        <p className="mx-auto mt-4 max-w-[780px] text-center text-[12px] leading-[1.7] text-muted">
          {t(messages, 'policies.common.notice')}
        </p>
      </div>
    </section>
  )
}
