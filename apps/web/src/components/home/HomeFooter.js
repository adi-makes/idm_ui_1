import Image from 'next/image'
import Link from 'next/link'
import {Lock, Mail, ShieldCheck} from 'lucide-react'
import {localizedPath} from '@/i18n/routing'
import {t} from '@/messages'
import {FOOTER_COLUMNS} from './homeData'

export default function HomeFooter({locale, messages}) {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-secondary px-6 py-12 text-white min-[700px]:px-8 min-[700px]:py-16 md:px-6">
      <div className="mx-auto w-full max-w-[1160px]">
        <div className="grid gap-10 border-b border-white/10 pb-10 lg:grid-cols-[1.1fr_1.4fr]">
          <div>
            <Link href={localizedPath(locale, '/')} className="inline-flex rounded-[5px] bg-white px-3 py-2" aria-label={t(messages, 'site.fallbackBrand')}>
              <Image src="/logo/logo_rd1.png" alt={t(messages, 'site.fallbackBrand')} width={1728} height={260} className="h-[30px] w-auto" />
            </Link>
            <p className="mt-5 max-w-[380px] text-[14px] leading-[1.7] text-white/70">{t(messages, 'home.footer.description')}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-2 rounded-[5px] border border-white/10 px-3 py-2 text-[12px] font-[750] text-white/80">
                <Lock className="size-4 text-success" aria-hidden="true" />
                {t(messages, 'home.footer.badges.ssl')}
              </span>
              <span className="inline-flex items-center gap-2 rounded-[5px] border border-white/10 px-3 py-2 text-[12px] font-[750] text-white/80">
                <ShieldCheck className="size-4 text-success" aria-hidden="true" />
                {t(messages, 'home.footer.badges.privacy')}
              </span>
            </div>
          </div>
          <div className="grid gap-8 min-[700px]:grid-cols-3">
            {FOOTER_COLUMNS.map((column) => (
              <div key={column.titleKey}>
                <h3 className="font-[var(--font-display)] text-[14px] font-[850] text-white">{t(messages, column.titleKey)}</h3>
                <ul className="mt-4 grid gap-3">
                  {column.links.map((link) => (
                    <li key={link.labelKey}>
                      {link.external ? (
                        <a href={link.href} className="text-[13px] font-[550] text-white/65 transition-colors hover:text-white">
                          {t(messages, link.labelKey)}
                        </a>
                      ) : (
                        <Link href={link.href.startsWith('#') ? link.href : localizedPath(locale, link.href)} className="text-[13px] font-[550] text-white/65 transition-colors hover:text-white">
                          {t(messages, link.labelKey)}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="grid gap-6 pt-8 md:grid-cols-[1fr_auto] md:items-center">
          <p className="max-w-[760px] text-[12px] leading-[1.7] text-white/55">{t(messages, 'home.footer.disclaimer')}</p>
          <a href="mailto:support@instadummyticket.com" className="inline-flex h-[42px] items-center justify-center gap-2 rounded-[5px] border border-white/15 px-4 text-[13px] font-[800] text-white">
            <Mail className="size-4" aria-hidden="true" />
            {t(messages, 'home.footer.support')}
          </a>
        </div>
        <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-6 text-[12px] text-white/45 min-[700px]:flex-row min-[700px]:items-center min-[700px]:justify-between">
          <p>{t(messages, 'home.footer.copyright', {year})}</p>
          <div className="flex gap-4">
            <Link href={localizedPath(locale, '/privacy')} className="hover:text-white">{t(messages, 'home.footer.legal.privacy')}</Link>
            <Link href={localizedPath(locale, '/terms')} className="hover:text-white">{t(messages, 'home.footer.legal.terms')}</Link>
            <Link href={localizedPath(locale, '/refund')} className="hover:text-white">{t(messages, 'home.footer.company.links.refund')}</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
