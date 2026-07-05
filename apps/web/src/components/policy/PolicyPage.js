import Link from 'next/link'
import {ArrowLeft, ShieldCheck} from 'lucide-react'
import {localizedPath} from '@/i18n/routing'
import {t} from '@/messages'

export default function PolicyPage({locale, messages, policy}) {
  return (
    <main className="w-full min-w-0 bg-white">
      <section className="bg-white px-6 pb-10 pt-10 min-[700px]:px-8 min-[700px]:pb-14 min-[700px]:pt-14 md:px-6">
        <div className="mx-auto w-full max-w-[1160px]">
          <p className="font-[var(--font-display)] text-[13px] font-[700] leading-none tracking-[0.04em] text-primary min-[700px]:text-[16px] md:text-[14px]">
            {policy.title}
          </p>
          <h1 className="mt-4 max-w-[760px] font-[var(--font-display)] text-[42px] font-[750] leading-[1.05] tracking-normal text-secondary min-[700px]:text-[64px] md:text-[56px]">
            {policy.headline}
          </h1>
          <p className="mt-5 max-w-[720px] text-[16px] font-[400] leading-[1.55] tracking-normal text-muted min-[700px]:text-[21px] md:text-[18px]">
            {policy.description}
          </p>
          <p className="mt-5 text-[12px] font-[750] uppercase tracking-[0.12em] text-muted">
            {t(messages, 'policies.common.lastUpdated')}
          </p>
        </div>
      </section>

      <section className="bg-surface-muted px-6 py-12 min-[700px]:px-8 min-[700px]:py-16 md:px-6">
        <div className="mx-auto grid w-full max-w-[1160px] gap-8 lg:grid-cols-[0.34fr_0.66fr] lg:items-start">
          <aside className="lg:sticky lg:top-8">
            <div className="idt-card-hover rounded-[5px] border border-[#E5E7EB] bg-white p-5">
              <div className="flex items-start gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-[5px] bg-surface-tint text-primary">
                  <ShieldCheck className="size-5" aria-hidden="true" />
                </span>
                <p className="text-[14px] font-[500] leading-[1.6] text-muted">
                  {policy.summary}
                </p>
              </div>
            </div>

            <Link
              href={localizedPath(locale, '/')}
              className="mt-5 inline-flex items-center gap-2 text-[14px] font-[750] text-secondary transition-colors hover:text-primary"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              {t(messages, 'policies.common.backHome')}
            </Link>
          </aside>

          <div className="rounded-[5px] border border-[#E5E7EB] bg-white">
            {policy.sections.map((section, index) => (
              <section key={section.title} className={index === 0 ? 'p-5 min-[700px]:p-7' : 'border-t border-[#E5E7EB] p-5 min-[700px]:p-7'}>
                <h2 className="font-[var(--font-display)] text-[21px] font-[750] leading-[1.2] text-secondary">
                  {section.title}
                </h2>
                <div className="mt-4 grid gap-3">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="text-[15px] font-[400] leading-[1.75] text-muted min-[700px]:text-[16px]">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-12 min-[700px]:px-8 min-[700px]:py-16 md:px-6">
        <div className="idt-card-hover mx-auto grid w-full max-w-[1160px] gap-6 rounded-[5px] border border-secondary bg-secondary p-6 text-white min-[700px]:p-8 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="font-[var(--font-display)] text-[13px] font-[700] leading-none tracking-[0.04em] text-white/65">
              {t(messages, 'policies.common.ctaEyebrow')}
            </p>
            <h2 className="mt-3 max-w-[720px] font-[var(--font-display)] text-[28px] font-[750] leading-[1.15] text-white min-[700px]:text-[38px]">
              {t(messages, 'policies.common.ctaTitle')}
            </h2>
            <p className="mt-4 max-w-[680px] text-[14px] leading-[1.7] text-white/65">
              {t(messages, 'policies.common.ctaText')}
            </p>
          </div>
          <Link
            href={localizedPath(locale, '/')}
            className="inline-flex h-[48px] items-center justify-center rounded-[5px] bg-primary px-5 text-[14px] font-[800] text-white transition-colors hover:bg-primary/90"
          >
            {t(messages, 'policies.common.ctaButton')}
          </Link>
        </div>
        <p className="mx-auto mt-4 max-w-[780px] text-center text-[12px] leading-[1.7] text-muted">
          {t(messages, 'policies.common.notice')}
        </p>
      </section>
    </main>
  )
}
