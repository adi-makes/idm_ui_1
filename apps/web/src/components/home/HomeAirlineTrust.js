import Image from 'next/image'
import {t} from '@/messages'
import {AIRLINE_LOGOS} from './homeData'

export default function HomeAirlineTrust({messages}) {
  const marqueeLogos = [...AIRLINE_LOGOS, ...AIRLINE_LOGOS]

  return (
    <section className="overflow-hidden bg-white px-0 py-8">
      <div className="mx-auto flex w-full max-w-[1160px] flex-col items-center px-6 text-center min-[700px]:px-8 md:px-6">
        <p className="font-[var(--font-display)] text-[13px] font-[700] leading-none tracking-[0.04em] text-primary min-[700px]:text-[16px] md:text-[14px]">
          {t(messages, 'home.airlineTrust.eyebrow')}
        </p>
      </div>

      <div className="relative mt-5 w-screen overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
        <div className="idt-airline-marquee flex w-max items-center gap-3" aria-label={t(messages, 'home.airlineTrust.eyebrow')}>
          {marqueeLogos.map((airline, index) => (
            <div key={`${airline.name}-${index}`} className="flex h-[54px] w-[148px] shrink-0 items-center justify-center px-4 min-[700px]:h-[64px] min-[700px]:w-[178px]">
              <Image
                src={airline.src}
                alt={airline.name}
                width={180}
                height={64}
                className="max-h-[30px] w-auto max-w-[118px] object-contain min-[700px]:max-h-[36px] min-[700px]:max-w-[146px]"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-5 flex w-full max-w-[1160px] flex-col items-center px-6 text-center min-[700px]:px-8 md:px-6">
        <p className="max-w-[680px] text-[14px] leading-[1.6] text-muted">{t(messages, 'home.airlineTrust.text')}</p>
      </div>
    </section>
  )
}
