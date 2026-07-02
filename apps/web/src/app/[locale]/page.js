import {
  CheckCircle2,
  LockKeyhole,
  Plane,
  ShieldCheck,
  Zap,
} from 'lucide-react'

import {sanityFetch} from '@/sanity/lib/fetch'
import {LANDING_PAGE_SEO_QUERY, SITE_SETTINGS_QUERY} from '@/sanity/queries'
import {buildMetadata} from '@/seo'
import {resolveFaq, resolveAiSeo} from '@/seo/resolve'
import {buildPageSchemas} from '@/seo/schema'
import BlogQuickAnswer from '@/components/blog/BlogQuickAnswer'
import BookingForm from '@/components/shared/BookingForm'
import JsonLd from '@/components/shared/JsonLd'
import {SITE_URL} from '@/constants/site'
import {localizedPath} from '@/i18n/routing'
import {getMessages, t} from '@/messages'

async function loadHome() {
  const [settings, seo] = await Promise.all([
    sanityFetch({query: SITE_SETTINGS_QUERY, tags: ['siteSettings']}),
    sanityFetch({query: LANDING_PAGE_SEO_QUERY, params: {slug: '/'}, tags: ['landingPageSeo']}),
  ])
  return {settings: settings || {}, seo}
}

export async function generateMetadata({params}) {
  const {locale} = await params
  const {settings, seo} = await loadHome()
  return buildMetadata({settings, doc: seo || {}, path: '/', locale, type: 'website'})
}

export default async function Home({params}) {
  const {locale} = await params
  const {settings, seo} = await loadHome()
  const messages = getMessages(locale)

  const faqs = resolveFaq({doc: seo || {}})
  const aiSeo = resolveAiSeo({doc: seo || {}})
  const url = `${SITE_URL}${localizedPath(locale, '/')}`
  const schemas = seo ? buildPageSchemas({page: seo, url, settings, faqs, breadcrumbs: []}) : []

  const proofItems = [
    t(messages, 'home.proof.embassy'),
    t(messages, 'home.proof.airline'),
    t(messages, 'home.proof.delivery'),
  ]

  const features = [
    {
      icon: ShieldCheck,
      title: t(messages, 'home.features.embassy.title'),
      text: t(messages, 'home.features.embassy.text'),
    },
    {
      icon: Plane,
      title: t(messages, 'home.features.airline.title'),
      text: t(messages, 'home.features.airline.text'),
    },
    {
      icon: Zap,
      title: t(messages, 'home.features.delivery.title'),
      text: t(messages, 'home.features.delivery.text'),
    },
    {
      icon: LockKeyhole,
      title: t(messages, 'home.features.secure.title'),
      text: t(messages, 'home.features.secure.text'),
    },
  ]

  return (
    <main className="w-full min-w-0 bg-white">
      <section className="w-full max-w-full px-[25px] pb-[30px] pt-[22px] min-[700px]:px-[51px] min-[700px]:pb-[60px] min-[700px]:pt-[58px] md:px-6 md:pb-16 md:pt-[33px]">
        <div className="mx-auto flex w-full max-w-[1110px] min-w-0 flex-col items-center text-center">
          <div className="inline-flex min-h-[28px] max-w-full items-center justify-center gap-[8px] rounded-[10px] border border-[#eff3ff] bg-[#f4f7ff] px-[10px] py-[7px] text-center text-[8.5px] font-[750] uppercase leading-none tracking-[0.12em] text-primary min-[700px]:min-h-[58px] min-[700px]:gap-[16px] min-[700px]:rounded-[24px] min-[700px]:px-[24px] min-[700px]:text-[18px] md:min-h-[35px] md:rounded-[7px] md:border-border md:px-[18px] md:py-0 md:text-[11px] md:font-[650] md:tracking-[0.11em]">
            <ShieldCheck className="size-[14px] shrink-0 fill-primary text-primary min-[700px]:size-[30px] md:size-[13px]" aria-hidden="true" />
            <span className="min-w-0 break-words">{t(messages, 'home.eyebrow')}</span>
          </div>

          <h1 className="mt-[31px] w-full max-w-[calc(100vw-50px)] min-w-0 font-[var(--font-reference)] text-[29px] font-[800] leading-[1.08] tracking-[-0.035em] text-secondary max-[359px]:text-[25px] min-[700px]:mt-[46px] min-[700px]:max-w-[649px] min-[700px]:text-[64px] md:mt-[20px] md:w-auto md:max-w-[760px] md:text-[52px] md:font-[700] md:leading-[1.08] md:tracking-[-0.035em]">
            <span className="block min-w-0 break-words">{t(messages, 'home.title.lineOne')}</span>
            <span className="block text-[40px] leading-[1.08] text-primary max-[359px]:text-[34px] min-[700px]:text-[70px] md:text-[52px] md:leading-[1.08]">{t(messages, 'home.title.lineTwo')}</span>
          </h1>

          <p className="mt-[21px] w-full max-w-[330px] min-w-0 font-[var(--font-reference)] text-[14px] font-[450] leading-[1.45] tracking-[-0.012em] text-muted max-[359px]:text-[12px] min-[700px]:mt-[42px] min-[700px]:max-w-[640px] min-[700px]:text-[27px] md:mt-[13px] md:max-w-[560px] md:text-[15.5px] md:leading-[1.55]">
            {t(messages, 'home.description')}
          </p>

          <div className="mt-[42px] grid w-full max-w-[calc(100vw-50px)] min-w-0 grid-cols-3 items-center gap-0 min-[700px]:mt-[72px] min-[700px]:max-w-[649px] md:mt-[20px] md:flex md:max-w-none md:justify-center md:gap-x-[31px]">
            {proofItems.map((item, index) => (
              <div key={item} className="flex min-w-0 items-center justify-center gap-[5px] text-center text-[8.5px] font-[650] leading-[1.25] tracking-[-0.01em] text-secondary min-[360px]:text-[10.5px] min-[700px]:gap-[16px] min-[700px]:text-[17px] md:gap-[9px] md:text-[13px] md:font-[500] md:leading-normal md:tracking-[-0.01em] md:text-muted">
                {index > 0 ? <span className="mr-[6px] h-[25px] w-px shrink-0 bg-border min-[700px]:mr-[16px] min-[700px]:h-[52px] md:hidden" aria-hidden="true" /> : null}
                <CheckCircle2 className="size-[15px] shrink-0 text-primary min-[700px]:size-[32px] md:size-[19px]" aria-hidden="true" />
                <span className="min-w-0">{item}</span>
              </div>
            ))}
          </div>

          <BookingForm locale={locale} />

          <div className="mt-[20px] hidden min-h-[68px] w-full max-w-[916px] items-center justify-center gap-[18px] rounded-[7px] border border-[#d8eee6] bg-[#f2fbf8] px-6 text-left md:flex">
            <span className="flex size-[38px] shrink-0 items-center justify-center rounded-full bg-white text-success">
              <ShieldCheck className="size-[27px] fill-success text-white" aria-hidden="true" />
            </span>
            <div>
              <p className="text-[14px] font-[650] tracking-[-0.012em] text-secondary">{t(messages, 'home.guarantee.title')}</p>
              <p className="mt-[4px] text-[12px] font-[450] tracking-[-0.01em] text-muted">{t(messages, 'home.guarantee.text')}</p>
            </div>
          </div>

          <div className="mt-[36px] hidden w-full max-w-[1106px] gap-5 text-left md:grid md:grid-cols-4">
            {features.map(({icon: Icon, title, text}, index) => (
              <div key={title} className="flex items-center gap-[20px] md:border-r md:border-border last:md:border-r-0">
                <span className="flex size-[58px] shrink-0 items-center justify-center rounded-[7px] bg-[#edf4ff] text-primary">
                  <Icon className="size-[30px] fill-primary/10 stroke-[2.7]" aria-hidden="true" />
                </span>
                <div className={index === 3 ? 'pr-0' : 'pr-[18px]'}>
                  <h2 className="text-[13px] font-[650] tracking-[-0.012em] text-secondary">{title}</h2>
                  <p className="mt-[8px] max-w-[180px] text-[10.5px] font-[450] leading-[1.55] tracking-[-0.01em] text-muted">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <BlogQuickAnswer text={aiSeo.quickAnswer} />
      <JsonLd data={schemas} />
    </main>
  )
}
