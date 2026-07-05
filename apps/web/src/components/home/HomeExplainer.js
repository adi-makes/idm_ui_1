import {t} from '@/messages'
import {EXPLAINER_CARDS} from './homeData'

export default function HomeExplainer({messages}) {
  return (
    <section className="bg-white px-6 py-16 min-[700px]:px-8 min-[700px]:py-24 md:px-6">
      <div className="mx-auto grid w-full max-w-[1160px] gap-10 md:grid-cols-[0.95fr_1.05fr] md:items-center">
        <div className="mx-auto max-w-[520px] text-center md:mx-0 md:max-w-none md:text-left">
          <p className="font-[var(--font-display)] text-[13px] font-[700] leading-none tracking-[0.04em] text-primary min-[700px]:text-[16px] md:text-[14px]">{t(messages, 'home.explainer.eyebrow')}</p>
          <h2 className="mt-4 font-[var(--font-display)] text-[34px] font-[750] leading-[1.08] tracking-normal text-secondary min-[700px]:text-[48px]">
            {t(messages, 'home.explainer.title')}
          </h2>
          <p className="mt-5 text-[14px] font-[400] leading-[1.5] tracking-normal text-muted min-[700px]:text-[21px] md:text-[18px]">{t(messages, 'home.explainer.text')}</p>
        </div>
        <div className="grid gap-3 min-[700px]:grid-cols-2">
          {EXPLAINER_CARDS.map(({icon: Icon, titleKey, textKey}) => (
            <article key={titleKey} className="idt-card-hover group rounded-[5px] border border-border bg-white p-5">
              <Icon className="size-5 text-primary transition-transform group-hover:scale-110" aria-hidden="true" />
              <h3 className="mt-4 font-[var(--font-display)] text-[17px] font-[800] text-secondary">{t(messages, titleKey)}</h3>
              <p className="mt-2 text-[14px] leading-[1.55] text-muted">{t(messages, textKey)}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
