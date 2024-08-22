import { notFound, redirect } from 'next/navigation'
import { Chat } from '@/components/chat'
import { getChat } from '@/lib/actions/chat'
import { AI } from '@/app/actions'

export const maxDuration = 60

export interface JustPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: JustPageProps) {
  const chat = await getChat(params.slug, 'anonymous')
  return {
    title: chat?.title.toString().slice(0, 50) || 'Search'
  }
}

export default async function SearchPage({ params }: JustPageProps) {
  const userId = 'anonymous'
  const chat = await getChat(params.slug, userId)

  if (!chat) {
    redirect('/')
  }

  if (chat?.userId !== userId) {
    notFound()
  }

  return (
    <AI
      initialAIState={{
        chatId: chat.id,
        messages: chat.messages
      }}
    >
      <Chat id={params.slug} />
    </AI>
  )
}
