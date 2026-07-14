'use client'

import {PlaneLanding, PlaneTakeoff, X} from 'lucide-react'

const LOCATION_SUGGESTIONS = [
  {
    code: 'LHR',
    city: 'London',
    airport: 'Heathrow Airport',
    country: 'United Kingdom',
    flag: 'gb',
  },
  {
    code: 'BKK',
    city: 'Bangkok',
    airport: 'Suvarnabhumi Airport',
    country: 'Thailand',
    flag: 'th',
  },
  {
    code: 'DXB',
    city: 'Dubai',
    airport: 'Dubai International Airport',
    country: 'United Arab Emirates',
    flag: 'ae',
  },
  {
    code: 'JFK',
    city: 'New York',
    airport: 'John F. Kennedy International Airport',
    country: 'United States',
    flag: 'us',
  },
  {
    code: 'SIN',
    city: 'Singapore',
    airport: 'Singapore Changi Airport',
    country: 'Singapore',
    flag: 'sg',
  },
  {
    code: 'KUL',
    city: 'Kuala Lumpur',
    airport: 'Kuala Lumpur International Airport',
    country: 'Malaysia',
    flag: 'my',
  },
  {
    code: 'DEL',
    city: 'Delhi',
    airport: 'Indira Gandhi International Airport',
    country: 'India',
    flag: 'in',
  },
  {
    code: 'CDG',
    city: 'Paris',
    airport: 'Charles de Gaulle Airport',
    country: 'France',
    flag: 'fr',
  },
  {
    code: 'FBD',
    city: 'Faizabad',
    airport: 'Faizabad Airport',
    country: 'Afghanistan',
    flag: 'af',
  },
  {
    code: 'FAH',
    city: 'Farah',
    airport: 'Farah Airport',
    country: 'Afghanistan',
    flag: 'af',
  },
  {
    code: 'FTE',
    city: 'El Calafate',
    airport: 'Comandante Armando Tola International Airport',
    country: 'Argentina',
    flag: 'ar',
  },
  {
    code: 'FDH',
    city: 'Friedrichshafen',
    airport: 'Friedrichshafen Airport',
    country: 'Germany',
    flag: 'de',
  },
  {
    code: 'FPO',
    city: 'Freeport',
    airport: 'Grand Bahama International Airport',
    country: 'Bahamas',
    flag: 'bs',
  },
  {
    code: 'FRW',
    city: 'Francistown',
    airport: 'Francistown Airport',
    country: 'Botswana',
    flag: 'bw',
  },
  {
    code: 'FOR',
    city: 'Fortaleza',
    airport: 'Pinto Martins Fortaleza International Airport',
    country: 'Brazil',
    flag: 'br',
  },
  {
    code: 'FFY',
    city: 'Faya-Largeau',
    airport: 'Faya-Largeau Airport',
    country: 'Chad',
    flag: 'td',
  },
]

function FlagIcon({country}) {
  const common = 'relative block h-3 w-4 shrink-0 overflow-hidden rounded-[1px] border border-slate-200/60 bg-white'

  if (country === 'af') {
    return (
      <span className={`grid ${common} grid-cols-3`} aria-hidden="true">
        <span className="bg-[#000000]" />
        <span className="relative bg-[#d32011]">
          <span className="absolute left-1/2 top-1/2 size-[5px] -translate-x-1/2 -translate-y-1/2 rounded-[5px] border border-white" />
        </span>
        <span className="bg-[#007a36]" />
      </span>
    )
  }

  if (country === 'bs') {
    return (
      <span className={`${common} bg-[#00778b]`} aria-hidden="true">
        <span className="absolute inset-x-0 top-1/3 h-1/3 bg-[#ffc72c]" />
        <span className="absolute left-0 top-0 h-0 w-0 border-y-[7px] border-l-[9px] border-y-transparent border-l-black" />
      </span>
    )
  }

  if (country === 'bw') {
    return (
      <span className={`${common} bg-[#6da9d2]`} aria-hidden="true">
        <span className="absolute inset-x-0 top-[5px] h-[5px] bg-white" />
        <span className="absolute inset-x-0 top-[6px] h-[3px] bg-black" />
      </span>
    )
  }

  if (country === 'br') {
    return (
      <span className={`${common} bg-[#009b3a]`} aria-hidden="true">
        <span className="absolute left-1/2 top-1/2 size-[10px] -translate-x-1/2 -translate-y-1/2 rotate-45 bg-[#ffdf00]" />
        <span className="absolute left-1/2 top-1/2 size-[5px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#002776]" />
      </span>
    )
  }

  if (country === 'td') {
    return (
      <span className={`grid ${common} grid-cols-3`} aria-hidden="true">
        <span className="bg-[#002664]" />
        <span className="bg-[#fecb00]" />
        <span className="bg-[#c60c30]" />
      </span>
    )
  }

  if (country === 'gb') {
    return (
      <span className={`${common} bg-[#012169]`} aria-hidden="true">
        <span className="absolute left-[-2px] top-[5px] h-[2px] w-[20px] bg-white" />
        <span className="absolute left-[7px] top-[-2px] h-[16px] w-[2px] bg-white" />
        <span className="absolute left-[-2px] top-[5px] h-[2px] w-[20px] bg-[#c8102e]" />
        <span className="absolute left-[7px] top-[-2px] h-[16px] w-[2px] bg-[#c8102e]" />
      </span>
    )
  }

  if (country === 'th') {
    return (
      <span className={`grid ${common} grid-rows-[1fr_1fr_2fr_1fr_1fr]`} aria-hidden="true">
        <span className="bg-[#a51931]" />
        <span className="bg-white" />
        <span className="bg-[#2d2a4a]" />
        <span className="bg-white" />
        <span className="bg-[#a51931]" />
      </span>
    )
  }

  if (country === 'ae') {
    return (
      <span className={`${common} bg-white`} aria-hidden="true">
        <span className="absolute inset-y-0 left-0 w-[5px] bg-[#ff0000]" />
        <span className="absolute left-[5px] right-0 top-0 h-1/3 bg-[#00732f]" />
        <span className="absolute left-[5px] right-0 bottom-0 h-1/3 bg-black" />
      </span>
    )
  }

  if (country === 'us') {
    return (
      <span className={`${common} bg-white`} aria-hidden="true">
        <span className="absolute inset-x-0 top-0 h-[2px] bg-[#b22234]" />
        <span className="absolute inset-x-0 top-[4px] h-[2px] bg-[#b22234]" />
        <span className="absolute inset-x-0 top-[8px] h-[2px] bg-[#b22234]" />
        <span className="absolute left-0 top-0 h-[7px] w-[7px] bg-[#3c3b6e]" />
      </span>
    )
  }

  if (country === 'sg') {
    return (
      <span className={`${common} bg-white`} aria-hidden="true">
        <span className="absolute inset-x-0 top-0 h-1/2 bg-[#ef3340]" />
        <span className="absolute left-[3px] top-[2px] size-[4px] rounded-full border border-white" />
      </span>
    )
  }

  if (country === 'my') {
    return (
      <span className={`${common} bg-white`} aria-hidden="true">
        <span className="absolute inset-x-0 top-0 h-[2px] bg-[#cc0001]" />
        <span className="absolute inset-x-0 top-[4px] h-[2px] bg-[#cc0001]" />
        <span className="absolute inset-x-0 top-[8px] h-[2px] bg-[#cc0001]" />
        <span className="absolute left-0 top-0 h-[7px] w-[8px] bg-[#010066]" />
        <span className="absolute left-[2px] top-[2px] size-[3px] rounded-full bg-[#ffcc00]" />
      </span>
    )
  }

  if (country === 'ar') {
    return (
      <span className={`grid ${common} grid-rows-3`} aria-hidden="true">
        <span className="bg-[#74acdf]" />
        <span className="relative bg-white">
          <span className="absolute left-1/2 top-1/2 size-[3px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f6b40e]" />
        </span>
        <span className="bg-[#74acdf]" />
      </span>
    )
  }

  if (country === 'de') {
    return (
      <span className={`grid ${common} grid-rows-3`} aria-hidden="true">
        <span className="bg-[#000000]" />
        <span className="bg-[#dd0000]" />
        <span className="bg-[#ffce00]" />
      </span>
    )
  }

  if (country === 'fr') {
    return (
      <span className={`grid ${common} grid-cols-3`} aria-hidden="true">
        <span className="bg-[#002395]" />
        <span className="bg-white" />
        <span className="bg-[#ed2939]" />
      </span>
    )
  }

  if (country === 'in') {
    return (
      <span className={`grid ${common} grid-rows-3`} aria-hidden="true">
        <span className="bg-[#ff9933]" />
        <span className="relative bg-white">
          <span className="absolute left-1/2 top-1/2 size-[3px] -translate-x-1/2 -translate-y-1/2 rounded-[5px] bg-[#000080]" />
        </span>
        <span className="bg-[#138808]" />
      </span>
    )
  }

  return <span className={`${common} bg-surface-tint`} aria-hidden="true" />
}

export default function LocationInput({
  label,
  type = 'from',
  value,
  error,
  onChange,
  onClear,
  popupId,
  activePopup,
  setActivePopup,
  className = '',
}) {
  const Icon = type === 'to' ? PlaneLanding : PlaneTakeoff
  const showSuggestions = activePopup === popupId && value.trim().length > 0
  const errorId = error ? `${popupId}-location-error` : undefined

  return (
    <div className={`relative block ${className}`}>
      <span className="sr-only">{label}</span>
      <span
        className={[
          'flex h-[50px] items-center rounded-[5px] border bg-white px-4 text-[16px] font-[400] leading-6 tracking-normal text-secondary transition-colors min-[700px]:h-[58px] min-[700px]:text-[17px] md:h-[48px] md:text-[15px]',
          error
            ? 'border-[#ff3b3b] focus-within:border-[#ff3b3b]'
            : activePopup === popupId
              ? 'border-secondary'
              : 'border-border-strong focus-within:border-primary',
        ].join(' ')}
      >
        <Icon className="mr-2.5 size-[19px] shrink-0 text-tertiary min-[700px]:size-[21px] md:mr-2 md:size-[18px]" aria-hidden="true" />
        <input
          value={value}
          onFocus={() => setActivePopup(popupId)}
          onChange={(event) => {
            setActivePopup(popupId)
            onChange(event.target.value)
          }}
          placeholder={label}
          aria-label={label}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={errorId}
          className="min-w-0 flex-1 truncate bg-transparent text-[16px] font-[400] leading-6 tracking-normal text-secondary outline-none placeholder:text-[16px] placeholder:font-[400] placeholder:leading-6 placeholder:text-tertiary min-[700px]:text-[17px] min-[700px]:placeholder:text-[17px] md:text-[15px] md:placeholder:text-[15px]"
        />
        {value ? (
          <button
            type="button"
            onClick={onClear}
            aria-label={`Clear ${label}`}
            className="ml-2 flex size-[20px] shrink-0 items-center justify-center text-tertiary hover:text-secondary"
          >
            <X className="size-[18px]" aria-hidden="true" />
          </button>
        ) : null}
      </span>
      {error ? (
        <p id={errorId} className="mt-2 text-[12px] font-[500] text-[#ff2f2f]">
          {error}
        </p>
      ) : null}

      {showSuggestions ? (
        <div className="absolute left-0 top-[58px] z-50 max-h-[258px] w-full overflow-y-auto rounded-[5px] border border-border bg-white [scrollbar-width:none] md:top-[50px] [&::-webkit-scrollbar]:hidden">
          {LOCATION_SUGGESTIONS.map((item) => (
            <button
              type="button"
              key={`${popupId}-${item.code}`}
              onClick={() => {
                onChange(`${item.city} (${item.code})`)
                setActivePopup(null)
              }}
              className="flex min-h-[86px] w-full items-start px-[18px] py-[15px] text-left hover:bg-surface-muted"
            >
              <span className="min-w-0 flex-1">
                <span className="mb-1 flex items-center justify-between gap-2">
                  <span className="flex min-w-0 flex-1 items-center gap-2">
                    <span className="shrink-0 text-sm font-normal leading-none text-tertiary">{item.code}</span>
                    <span className="min-w-0 truncate text-sm font-normal leading-none text-secondary">{item.city}</span>
                  </span>
                  <span className="shrink-0" aria-label={`${item.country} flag`}>
                    <FlagIcon country={item.flag} />
                  </span>
                </span>
                <span className="block truncate text-xs font-normal leading-[1.45] text-muted/90">{item.airport}</span>
                <span className="mt-0.5 block text-xs font-normal leading-[1.45] text-secondary/90">{item.country}</span>
              </span>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}
