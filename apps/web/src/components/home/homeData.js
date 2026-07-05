import {
  BadgeCheck,
  Building2,
  CircleDollarSign,
  Clock3,
  FileCheck2,
  Globe2,
  Headphones,
  Landmark,
  Lock,
  Plane,
  TicketCheck,
} from 'lucide-react'

export const AIRLINE_LOGOS = [
  {name: 'Air Arabia', src: '/airlineLogos/Air_Arabia_logo.png'},
  {name: 'Air France', src: '/airlineLogos/Air_France_logo.png'},
  {name: 'Air India', src: '/airlineLogos/air_india_logo.png'},
  {name: 'British Airways', src: '/airlineLogos/British_Airways_logo.png'},
  {name: 'Emirates', src: '/airlineLogos/Emirates_logo.png'},
  {name: 'Etihad', src: '/airlineLogos/etihad_logo.png'},
  {name: 'Flydubai', src: '/airlineLogos/Flydubai_logo.png'},
  {name: 'IndiGo', src: '/airlineLogos/IndiGo_logo.png'},
  {name: 'Lufthansa', src: '/airlineLogos/lufthansa_logo.png'},
  {name: 'Oman Air', src: '/airlineLogos/Oman_Air_logo.png'},
  {name: 'Qatar Airways', src: '/airlineLogos/Qatar_Airways_Logo.png'},
  {name: 'Singapore Airlines', src: '/airlineLogos/Singapore_Airlines_logo.png'},
  {name: 'SpiceJet', src: '/airlineLogos/spice_jet_logo.png'},
  {name: 'SriLankan Airlines', src: '/airlineLogos/SriLankan_Airlines_logo.png'},
  {name: 'Thai Airways', src: '/airlineLogos/Thai_Airways_logo.png'},
  {name: 'Turkish Airlines', src: '/airlineLogos/Turkish_Airlines_logo.png'},
]

export const TRUST_AIRLINES = AIRLINE_LOGOS.map(({name}) => name)

export const EXPLAINER_CARDS = [
  {icon: TicketCheck, titleKey: 'home.explainer.cards.pnr.title', textKey: 'home.explainer.cards.pnr.text'},
  {icon: FileCheck2, titleKey: 'home.explainer.cards.format.title', textKey: 'home.explainer.cards.format.text'},
  {icon: CircleDollarSign, titleKey: 'home.explainer.cards.cost.title', textKey: 'home.explainer.cards.cost.text'},
  {icon: Globe2, titleKey: 'home.explainer.cards.accepted.title', textKey: 'home.explainer.cards.accepted.text'},
]

export const DIFFERENTIATORS = [
  {icon: Clock3, titleKey: 'home.differentiators.items.delivery.title', textKey: 'home.differentiators.items.delivery.text'},
  {icon: TicketCheck, titleKey: 'home.differentiators.items.verification.title', textKey: 'home.differentiators.items.verification.text'},
  {icon: Landmark, titleKey: 'home.differentiators.items.accepted.title', textKey: 'home.differentiators.items.accepted.text'},
  {icon: CircleDollarSign, titleKey: 'home.differentiators.items.pricing.title', textKey: 'home.differentiators.items.pricing.text'},
  {icon: Headphones, titleKey: 'home.differentiators.items.support.title', textKey: 'home.differentiators.items.support.text'},
  {icon: Lock, titleKey: 'home.differentiators.items.security.title', textKey: 'home.differentiators.items.security.text'},
]

export const PROCESS_STEPS = [
  {titleKey: 'home.process.steps.search.title', textKey: 'home.process.steps.search.text'},
  {titleKey: 'home.process.steps.details.title', textKey: 'home.process.steps.details.text'},
  {titleKey: 'home.process.steps.receive.title', textKey: 'home.process.steps.receive.text'},
]

export const USE_CASES = [
  {icon: Landmark, titleKey: 'home.useCases.items.visa.title', textKey: 'home.useCases.items.visa.text'},
  {icon: Plane, titleKey: 'home.useCases.items.onward.title', textKey: 'home.useCases.items.onward.text'},
  {icon: FileCheck2, titleKey: 'home.useCases.items.passport.title', textKey: 'home.useCases.items.passport.text'},
  {icon: BadgeCheck, titleKey: 'home.useCases.items.student.title', textKey: 'home.useCases.items.student.text'},
  {icon: Building2, titleKey: 'home.useCases.items.business.title', textKey: 'home.useCases.items.business.text'},
  {icon: Globe2, titleKey: 'home.useCases.items.renewals.title', textKey: 'home.useCases.items.renewals.text'},
]

export const LEGAL_ROWS = [
  {mythKey: 'home.legal.rows.illegal.myth', truthKey: 'home.legal.rows.illegal.truth'},
  {mythKey: 'home.legal.rows.fake.myth', truthKey: 'home.legal.rows.fake.truth'},
  {mythKey: 'home.legal.rows.rejected.myth', truthKey: 'home.legal.rows.rejected.truth'},
  {mythKey: 'home.legal.rows.fraud.myth', truthKey: 'home.legal.rows.fraud.truth'},
]

export const SAMPLE_ITEMS = [
  'home.sample.items.format',
  'home.sample.items.pnr',
  'home.sample.items.passenger',
  'home.sample.items.delivery',
  'home.sample.items.validity',
]

export const PRICING_PLANS = [
  {
    titleKey: 'home.pricing.plans.flight.title',
    priceKey: 'home.pricing.plans.flight.price',
    badgeKey: 'home.pricing.plans.flight.badge',
    ctaKey: 'home.pricing.plans.flight.cta',
    features: [
      'home.pricing.plans.flight.features.pnr',
      'home.pricing.plans.flight.features.delivery',
      'home.pricing.plans.flight.features.validity',
      'home.pricing.plans.flight.features.trip',
    ],
  },
  {
    titleKey: 'home.pricing.plans.combo.title',
    priceKey: 'home.pricing.plans.combo.price',
    badgeKey: 'home.pricing.plans.combo.badge',
    ctaKey: 'home.pricing.plans.combo.cta',
    featured: true,
    features: [
      'home.pricing.plans.combo.features.flight',
      'home.pricing.plans.combo.features.hotel',
      'home.pricing.plans.combo.features.docs',
      'home.pricing.plans.combo.features.support',
    ],
  },
  {
    titleKey: 'home.pricing.plans.hotel.title',
    priceKey: 'home.pricing.plans.hotel.price',
    badgeKey: 'home.pricing.plans.hotel.badge',
    ctaKey: 'home.pricing.plans.hotel.cta',
    features: [
      'home.pricing.plans.hotel.features.reservation',
      'home.pricing.plans.hotel.features.stay',
      'home.pricing.plans.hotel.features.delivery',
      'home.pricing.plans.hotel.features.email',
    ],
  },
]

export const TESTIMONIALS = [
  {quoteKey: 'home.testimonials.items.priya.quote', nameKey: 'home.testimonials.items.priya.name', tagKey: 'home.testimonials.items.priya.tag', proofKey: 'home.testimonials.items.priya.proof', statusKey: 'home.testimonials.items.priya.status', countryCode: 'IN', flag: '🇮🇳'},
  {quoteKey: 'home.testimonials.items.omar.quote', nameKey: 'home.testimonials.items.omar.name', tagKey: 'home.testimonials.items.omar.tag', proofKey: 'home.testimonials.items.omar.proof', statusKey: 'home.testimonials.items.omar.status', countryCode: 'AE', flag: '🇦🇪'},
  {quoteKey: 'home.testimonials.items.marcus.quote', nameKey: 'home.testimonials.items.marcus.name', tagKey: 'home.testimonials.items.marcus.tag', proofKey: 'home.testimonials.items.marcus.proof', statusKey: 'home.testimonials.items.marcus.status', countryCode: 'DE', flag: '🇩🇪'},
  {quoteKey: 'home.testimonials.items.elena.quote', nameKey: 'home.testimonials.items.elena.name', tagKey: 'home.testimonials.items.elena.tag', proofKey: 'home.testimonials.items.elena.proof', statusKey: 'home.testimonials.items.elena.status', countryCode: 'ES', flag: '🇪🇸'},
  {quoteKey: 'home.testimonials.items.ahmed.quote', nameKey: 'home.testimonials.items.ahmed.name', tagKey: 'home.testimonials.items.ahmed.tag', proofKey: 'home.testimonials.items.ahmed.proof', statusKey: 'home.testimonials.items.ahmed.status', countryCode: 'AE', flag: '🇦🇪'},
  {quoteKey: 'home.testimonials.items.nina.quote', nameKey: 'home.testimonials.items.nina.name', tagKey: 'home.testimonials.items.nina.tag', proofKey: 'home.testimonials.items.nina.proof', statusKey: 'home.testimonials.items.nina.status', countryCode: 'GB', flag: '🇬🇧'},
]

export const FAQS = [
  {questionKey: 'home.faq.items.what.question', answerKey: 'home.faq.items.what.answer'},
  {questionKey: 'home.faq.items.legal.question', answerKey: 'home.faq.items.legal.answer'},
  {questionKey: 'home.faq.items.valid.question', answerKey: 'home.faq.items.valid.answer'},
  {questionKey: 'home.faq.items.verify.question', answerKey: 'home.faq.items.verify.answer'},
  {questionKey: 'home.faq.items.accept.question', answerKey: 'home.faq.items.accept.answer'},
  {questionKey: 'home.faq.items.refund.question', answerKey: 'home.faq.items.refund.answer'},
]

export const FOOTER_COLUMNS = [
  {
    titleKey: 'home.footer.product.title',
    links: [
      {labelKey: 'home.footer.product.links.book', href: '/'},
      {labelKey: 'home.footer.product.links.sample', href: '#sample-ticket'},
      {labelKey: 'home.footer.product.links.pricing', href: '#pricing'},
      {labelKey: 'home.footer.product.links.faq', href: '#faq'},
    ],
  },
  {
    titleKey: 'home.footer.resources.title',
    links: [
      {labelKey: 'home.footer.resources.links.schengen', href: '#use-cases'},
      {labelKey: 'home.footer.resources.links.uk', href: '#use-cases'},
      {labelKey: 'home.footer.resources.links.us', href: '#use-cases'},
      {labelKey: 'home.footer.resources.links.onward', href: '#use-cases'},
    ],
  },
  {
    titleKey: 'home.footer.company.title',
    links: [
      {labelKey: 'home.footer.company.links.blog', href: '/blog'},
      {labelKey: 'home.footer.company.links.support', href: '#support'},
      {labelKey: 'home.footer.company.links.email', href: 'mailto:support@instadummyticket.com', external: true},
      {labelKey: 'home.footer.company.links.refund', href: '/refund'},
    ],
  },
]
