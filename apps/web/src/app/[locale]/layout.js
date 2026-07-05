// ============================================================================
// Root layout — owns <html>/<body>. Injects site-wide JSON-LD (Organization +
// WebSite) and analytics from Sanity Site Settings, and enables Visual Editing
// + a draft banner when Next.js Draft Mode is on.
// ============================================================================

import {notFound} from 'next/navigation'
import {draftMode} from 'next/headers'
import {VisualEditing} from 'next-sanity/visual-editing'
import ReactDOM from 'react-dom'

import Navbar from '@/components/shared/Navbar'
import JsonLd from '@/components/shared/JsonLd'
import DraftModeBanner from '@/components/shared/DraftModeBanner'
import DevPointerCaptureGuard from '@/components/shared/DevPointerCaptureGuard'
import {Analytics} from '@/analytics'

import {LOCALES} from '@/i18n/config'
import {isValidLocale, isRtlLocale} from '@/i18n/utils'
import {sanityFetch} from '@/sanity/lib/fetch'
import {SITE_SETTINGS_QUERY} from '@/sanity/queries'
import {generateOrganizationSchema, generateWebsiteSchema} from '@/seo/schema'
import {buildMetadata} from '@/seo'
import {getMessages, t} from '@/messages'

export function generateStaticParams() {
  return LOCALES.map((locale) => ({locale}))
}

export async function generateMetadata({params}) {
  const {locale} = await params
  const settings = (await sanityFetch({query: SITE_SETTINGS_QUERY, tags: ['siteSettings']})) || {}
  return buildMetadata({settings, doc: {title: settings.name}, path: '/', locale, type: 'website'})
}

export default async function LocaleLayout({children, params}) {
  const {locale} = await params
  if (!isValidLocale(locale)) notFound()

  const [settings, draft] = await Promise.all([
    sanityFetch({query: SITE_SETTINGS_QUERY, tags: ['siteSettings']}),
    draftMode(),
  ])
  const s = settings || {}
  const brand = s.name
  const messages = getMessages(locale)

  // Preconnect to Sanity image CDN so image requests have a warmed connection.
  // ReactDOM.preconnect() is the Next 16-recommended way (emits <link rel="preconnect">).
  ReactDOM.preconnect('https://cdn.sanity.io')

  return (
    <div lang={locale} dir={isRtlLocale(locale) ? 'rtl' : 'ltr'}>
        <DevPointerCaptureGuard />
        {draft.isEnabled ? <DraftModeBanner locale={locale} /> : null}
        <JsonLd data={[generateOrganizationSchema(s), generateWebsiteSchema(s)]} />
        {/* Skip to main content — helps keyboard/screen-reader users bypass the nav */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-md focus:text-sm focus:font-medium"
        >
          {t(messages, 'site.skipToContent')}
        </a>
        <Navbar locale={locale} brand={brand} />
        {/* #main-content anchor for the skip link above — neutral div, page renders its own <main> */}
        <div id="main-content" tabIndex={-1} className="outline-none">
          {children}
        </div>
        <Analytics analytics={s.analytics} />
        {draft.isEnabled ? <VisualEditing /> : null}
    </div>
  )
}
