'use client'

import Link from 'next/link'
import Image from 'next/image'
import {usePathname} from 'next/navigation'
import {useEffect, useState} from 'react'
import {Mail} from 'lucide-react'
import SocialBrandIcon from '@/components/shared/BrandIcons'
import {localizedPath} from '@/i18n/routing'
import {getMessages, t} from '@/messages'

const NAV_LINKS = [
  {href: '/', labelKey: 'nav.home'},
  {href: '/blog', labelKey: 'nav.blogs'},
  {href: '/faq', labelKey: 'nav.faq'},
]

export default function Navbar({locale}) {
  const pathname = usePathname()
  const messages = getMessages(locale)
  const brand = t(messages, 'site.fallbackBrand')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileMenuMounted, setMobileMenuMounted] = useState(false)
  const [mobileMenuVisible, setMobileMenuVisible] = useState(false)

  useEffect(() => {
    if (!mobileMenuMounted) {
      return undefined
    }

    if (mobileMenuOpen) {
      const frame = requestAnimationFrame(() => setMobileMenuVisible(true))
      return () => cancelAnimationFrame(frame)
    }

    setMobileMenuVisible(false)
    const timeout = setTimeout(() => setMobileMenuMounted(false), 260)
    return () => clearTimeout(timeout)
  }, [mobileMenuMounted, mobileMenuOpen])

  useEffect(() => {
    if (!mobileMenuOpen) {
      return undefined
    }

    const previousHtmlOverflow = document.documentElement.style.overflow
    const previousBodyOverflow = document.body.style.overflow
    const previousBodyTouchAction = document.body.style.touchAction

    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'
    document.body.style.touchAction = 'none'

    return () => {
      document.documentElement.style.overflow = previousHtmlOverflow
      document.body.style.overflow = previousBodyOverflow
      document.body.style.touchAction = previousBodyTouchAction
    }
  }, [mobileMenuOpen])

  const openMobileMenu = () => {
    setMobileMenuMounted(true)
    setMobileMenuOpen(true)
  }

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  const toggleMobileMenu = () => {
    if (mobileMenuOpen) {
      closeMobileMenu()
      return
    }

    openMobileMenu()
  }

  return (
    <header className="relative z-[10001] h-[64px] max-w-full bg-white/95 min-[700px]:h-[114px] md:h-[76px]">
      <nav
        aria-label={t(messages, 'nav.mainLabel')}
        className="mx-auto flex h-full w-full max-w-[1422px] items-start justify-between px-[24px] pt-[20px] min-[700px]:px-[25px] min-[700px]:pt-[39px] md:items-center md:px-10 md:pt-0 lg:px-[64px]"
      >
        <Link href={localizedPath(locale, '/')} className="flex min-w-0 items-center" aria-label={brand}>
          <Image
            src="/logo/logo_rd1.png"
            alt={brand}
            width={1728}
            height={260}
            priority
            className="h-[28px] w-auto min-[700px]:h-[50px] md:h-[34px]"
          />
        </Link>

        <div className="flex shrink-0 items-center md:h-full md:gap-0">
          <button
            type="button"
            onClick={toggleMobileMenu}
            className="group relative grid size-[31px] place-items-center border-0 bg-transparent p-0 text-secondary outline-none focus:outline-none focus-visible:outline-none min-[700px]:size-[48px] md:hidden"
            aria-label={mobileMenuOpen ? t(messages, 'nav.closeMenu') : t(messages, 'nav.openMenu')}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <span className="relative block size-[24px] transition-transform duration-300 ease-[cubic-bezier(.16,1,.3,1)] group-active:scale-95 min-[700px]:size-[43px]" aria-hidden="true">
              <span
                className={[
                  'absolute left-[2px] h-[2px] w-[19px] origin-center rounded-full bg-current transition-[top,transform,width] duration-300 min-[700px]:left-[2px] min-[700px]:h-[3px] min-[700px]:w-[35px]',
                  mobileMenuOpen
                    ? 'top-[11px] w-[21px] rotate-45 ease-[cubic-bezier(.16,1,.3,1)] min-[700px]:top-[20px] min-[700px]:w-[37px]'
                    : 'top-[5px] rotate-0 ease-[cubic-bezier(.7,0,.84,0)] min-[700px]:top-[9px]',
                ].join(' ')}
              />
              <span
                className={[
                  'absolute left-[2px] top-[11px] h-[2px] origin-left rounded-full bg-current transition-[opacity,transform,width] duration-200 min-[700px]:left-[2px] min-[700px]:top-[20px] min-[700px]:h-[3px]',
                  mobileMenuOpen
                    ? 'w-[16px] scale-x-0 opacity-0 ease-[cubic-bezier(.16,1,.3,1)] min-[700px]:w-[29px]'
                    : 'w-[16px] opacity-100 ease-[cubic-bezier(.7,0,.84,0)] min-[700px]:w-[29px]',
                ].join(' ')}
              />
              <span
                className={[
                  'absolute left-[2px] h-[2px] w-[19px] origin-center rounded-full bg-current transition-[top,transform,width] duration-300 min-[700px]:left-[2px] min-[700px]:h-[3px] min-[700px]:w-[35px]',
                  mobileMenuOpen
                    ? 'top-[11px] w-[21px] -rotate-45 ease-[cubic-bezier(.16,1,.3,1)] min-[700px]:top-[20px] min-[700px]:w-[37px]'
                    : 'top-[17px] rotate-0 ease-[cubic-bezier(.7,0,.84,0)] min-[700px]:top-[31px]',
                ].join(' ')}
              />
            </span>
          </button>

          <ul className="hidden h-full items-center gap-[50px] md:flex" role="list">
            {NAV_LINKS.map(({href, labelKey}) => {
              const localizedHref = localizedPath(locale, href)
              const isActive = pathname === localizedHref
              return (
                <li key={href} className="h-full">
                  <Link
                    href={localizedHref}
                    aria-current={isActive ? 'page' : undefined}
                    className={[
                      'relative flex h-full items-center text-[14px] font-[600] tracking-[-0.01em] transition-colors',
                      isActive ? 'text-primary' : 'text-secondary hover:text-primary',
                    ].join(' ')}
                  >
                    {t(messages, labelKey)}
                  </Link>
                </li>
              )
            })}
          </ul>

          <div className="ml-[47px] hidden h-[32px] w-px bg-border md:block" aria-hidden="true" />

          <Link
            href={localizedPath(locale, '/#support')}
            className="ml-[36px] hidden items-center gap-[12px] text-[14px] font-[600] tracking-[-0.01em] text-secondary md:flex"
          >
            {t(messages, 'nav.support')}
          </Link>
        </div>
      </nav>

      {mobileMenuMounted ? (
        <div
          id="mobile-menu"
          data-open={mobileMenuVisible}
          className={[
            'fixed inset-x-0 bottom-0 top-[64px] z-[10000] flex flex-col overflow-hidden bg-white px-[13px] pt-[48px] text-secondary transition-[clip-path,opacity,transform] min-[700px]:top-[114px] md:hidden',
            mobileMenuVisible
              ? 'pointer-events-auto translate-y-0 opacity-100 duration-300 ease-[cubic-bezier(.16,1,.3,1)] [clip-path:inset(0_0_0_0)]'
              : 'pointer-events-none -translate-y-2 opacity-0 duration-200 ease-[cubic-bezier(.7,0,.84,0)] [clip-path:inset(0_0_100%_0)]',
          ].join(' ')}
        >
          <div className="mx-auto flex w-full max-w-[320px] flex-col items-stretch text-center">
            <nav aria-label={t(messages, 'nav.mainLabel')} className="flex flex-col gap-[8px]">
              {NAV_LINKS.map(({href, labelKey}) => {
                const localizedHref = localizedPath(locale, href)
                const isActive = pathname === localizedHref
                return (
                  <Link
                    key={href}
                    href={localizedHref}
                    aria-current={isActive ? 'page' : undefined}
                    onClick={closeMobileMenu}
                    className={[
                      'flex h-[43px] items-center justify-center rounded-[5px] text-[14px] font-[500] tracking-[-0.01em] transition-colors',
                      isActive ? 'border border-[#c8d8ff] bg-[#edf4ff] text-secondary' : 'text-secondary hover:bg-surface-muted',
                    ].join(' ')}
                  >
                    {t(messages, labelKey)}
                  </Link>
                )
              })}
            </nav>

            <Link
              href={localizedPath(locale, '/#support')}
              onClick={closeMobileMenu}
              className="mt-[24px] flex h-[52px] items-center justify-center rounded-[5px] border border-secondary text-[15px] font-[750] tracking-[-0.01em] text-secondary"
            >
              {t(messages, 'nav.contactSupport')}
            </Link>
          </div>

          <footer className="mx-auto mt-auto w-full max-w-[320px] pb-[18px] text-center">
            <div className="flex flex-col gap-[8px] text-[14px] font-[500] leading-none text-secondary">
              <Link href={localizedPath(locale, '/privacy')} onClick={closeMobileMenu}>
                {t(messages, 'nav.privacyPolicy')}
              </Link>
              <Link href={localizedPath(locale, '/terms')} onClick={closeMobileMenu}>
                {t(messages, 'nav.termsOfService')}
              </Link>
              <Link href={localizedPath(locale, '/refund')} onClick={closeMobileMenu}>
                {t(messages, 'nav.refundPolicy')}
              </Link>
            </div>

            <div className="mt-[18px] flex items-center justify-center gap-[22px] text-secondary" aria-label={t(messages, 'nav.socialLinks')}>
              <a href="https://www.instagram.com/" aria-label={t(messages, 'nav.instagram')} className="flex size-[18px] items-center justify-center">
                <SocialBrandIcon platform="instagram" className="size-[16px]" />
              </a>
              <a href="https://www.facebook.com/" aria-label={t(messages, 'nav.facebook')} className="flex size-[18px] items-center justify-center">
                <SocialBrandIcon platform="facebook" className="size-[16px]" />
              </a>
              <a href="mailto:support@instadummyticket.com" aria-label={t(messages, 'nav.gmail')} className="flex size-[18px] items-center justify-center">
                <Mail className="size-[18px] stroke-[2]" aria-hidden="true" />
              </a>
            </div>

            <div className="mt-[36px] border-t border-border pt-[13px] text-[12px] font-[400] text-secondary">
              {t(messages, 'nav.copyright')}
            </div>
          </footer>
        </div>
      ) : null}
    </header>
  )
}
