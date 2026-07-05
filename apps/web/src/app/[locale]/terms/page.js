import PolicyPage from '@/components/policy/PolicyPage'
import {HomeFooter} from '@/components/home'
import {getMessages} from '@/messages'

export async function generateMetadata({params}) {
  const {locale} = await params
  const messages = getMessages(locale)
  const policy = messages.policies.terms

  return {
    title: `${policy.title} | InstaDummyTicket`,
    description: policy.description,
  }
}

export default async function TermsPage({params}) {
  const {locale} = await params
  const messages = getMessages(locale)

  return (
    <>
      <PolicyPage locale={locale} messages={messages} policy={messages.policies.terms} />
      <HomeFooter locale={locale} messages={messages} />
    </>
  )
}
