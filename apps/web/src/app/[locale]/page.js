import {sanityFetch} from '@/sanity/lib/fetch'
import {LANDING_PAGE_SEO_QUERY, SITE_SETTINGS_QUERY} from '@/sanity/queries'
import {buildMetadata} from '@/seo'
import {resolveFaq, resolveAiSeo} from '@/seo/resolve'
import {buildPageSchemas} from '@/seo/schema'
import BlogQuickAnswer from '@/components/blog/BlogQuickAnswer'
import {
  HomeAirlineTrust,
  HomeDifferentiators,
  HomeExplainer,
  HomeFaq,
  HomeFinalCta,
  HomeFooter,
  HomeHero,
  HomePricing,
  HomeProcess,
  HomeTestimonials,
  HomeUseCases,
} from '@/components/home'
import JsonLd from '@/components/shared/JsonLd'
import {SITE_URL} from '@/constants/site'
import {localizedPath} from '@/i18n/routing'
import {getMessages} from '@/messages'

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

  return (
    <main className="w-full min-w-0 bg-white">
      <HomeHero locale={locale} messages={messages} />
      <HomeAirlineTrust messages={messages} />
      <HomeExplainer messages={messages} />
      <HomeDifferentiators messages={messages} />
      <HomeProcess messages={messages} />
      <HomeUseCases messages={messages} />
      <HomePricing messages={messages} />
      <HomeTestimonials messages={messages} />
      <HomeFaq messages={messages} />
      <HomeFinalCta messages={messages} />
      <HomeFooter locale={locale} messages={messages} />

      <BlogQuickAnswer text={aiSeo.quickAnswer} />
      <JsonLd data={schemas} />
    </main>
  )
}
