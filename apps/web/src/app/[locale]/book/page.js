import {Suspense} from 'react'
import BookFlow from '@/components/book/BookFlow'
import {getMessages, t} from '@/messages'

export async function generateMetadata({params}) {
  const {locale} = await params
  const messages = getMessages(locale)

  return {
    title: t(messages, 'book.metadata.title'),
    description: t(messages, 'book.metadata.description'),
  }
}

export default async function BookPage({params}) {
  const {locale} = await params
  const messages = getMessages(locale)

  return (
    <Suspense fallback={null}>
      <BookFlow locale={locale} messages={messages} />
    </Suspense>
  )
}
