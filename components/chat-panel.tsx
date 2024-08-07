'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import type { AI, UIState } from '@/app/actions'
import { useUIState, useActions, useAIState } from 'ai/rsc'
import { cn } from '@/lib/utils'
import { UserMessage } from './user-message'
import { Button } from './ui/button'
import { ArrowRight, Link, Plus } from 'lucide-react'
import { EmptyScreen } from './empty-screen'
import { generateId } from 'ai'
import { useAppState } from '@/lib/utils/app-state'

import './Footer.css'

interface ChatPanelProps {
  messages: UIState
  query?: string
}

export function ChatPanel({ messages, query }: ChatPanelProps) {
  const [input, setInput] = useState('')
  const [showEmptyScreen, setShowEmptyScreen] = useState(false)
  const [, setMessages] = useUIState<typeof AI>()
  const [aiMessage, setAIMessage] = useAIState<typeof AI>()
  const { isGenerating, setIsGenerating } = useAppState()
  const { submit } = useActions()
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const isFirstRender = useRef(true) // For development environment

  const handleSearch = async () => {
    if (!input.trim()) return // Prevent empty searches
    setIsGenerating(true)

    // Add user message to UI state
    setMessages(currentMessages => [
      ...currentMessages,
      {
        id: generateId(),
        component: <UserMessage message={input} />
      }
    ])

    // Submit and get response message
    const data = new FormData()
    data.append('input', input)
    const responseMessage = await submit(data)
    setMessages(currentMessages => [...currentMessages, responseMessage])

    setInput('') // Clear input after search
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    handleSearch()
  }

  // if query is not empty, submit the query
  useEffect(() => {
    if (isFirstRender.current && query && query.trim().length > 0) {
      handleSearch()
      isFirstRender.current = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query])

  useEffect(() => {
    const lastMessage = aiMessage.messages.slice(-1)[0]
    if (lastMessage?.type === 'followup' || lastMessage?.type === 'inquiry') {
      setIsGenerating(false)
    }
  }, [aiMessage, setIsGenerating])

  // Clear messages
  const handleClear = () => {
    setIsGenerating(false)
    setMessages([])
    setAIMessage({ messages: [], chatId: '' })
    setInput('')
    router.push('/')
  }

  useEffect(() => {
    // focus on input when the page loads
    inputRef.current?.focus()
  }, [])

  // If there are messages and the new button has not been pressed, display the new Button
  if (messages.length > 0) {
    return (
      <div className="fixed bottom-2 md:bottom-8 left-0 right-0 flex justify-center items-center mx-auto pointer-events-none">
        <Button
          type="button"
          variant={'secondary'}
          className="rounded-full bg-secondary/80 group transition-all hover:scale-105 pointer-events-auto"
          onClick={() => handleClear()}
          disabled={isGenerating}
        >
          <span className="text-sm mr-2 group-hover:block hidden animate-in fade-in duration-300">
            New
          </span>
          <Plus size={18} className="group-hover:rotate-90 transition-all" />
        </Button>
      </div>
    )
  }

  if (query && query.trim().length > 0) {
    return null
  }

  const tags = Array.from({ length: 100 }, (_, i) => `标签${i + 1}`)

  const links = [
    { href: '/search/nQPJhmy', text: '为什么有夏季和冬季奥运会？' },
    { href: '/search/ORZFkjh', text: '一张纸最多可以折几次？' },
    { href: '/search/LneFo8w', text: '为什么人会做梦？' },
    { href: '/search/EhKuU8V', text: 'PMF是什么' },
    { href: '/search/OsHK9Ps', text: '为什么蜂巢都是正六边形的？' }
  ]

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white">
      {/* 
      <div className="mb-8">
        <img src="/yandex-logo.svg" alt="Yandex" className="h-8" />
      </div>*/}

      <div className="flex justify-center space-x-8 mb-8">
        {[
          {
            icon: '🖼️',
            label: '图片',
            href: 'https://image.jiehuo.ai/'
          },
          {
            icon: '🔧',
            label: '导航',
            href: 'https://tool.jiehuo.ai/'
          },
          {
            /*
          {
            icon: '🗺️',
            label: '地图',
            href: 'https://map.jiehuo.ai/',
          },
          {
            icon: '🔄',
            label: '翻译',
            href: 'https://translate.jiehuo.ai/',
          },
          {
            icon: '🌀',
            label: '天气',
            href: 'https://weather.jiehuo.ai/',
          },
          {
            icon: '✉️',
            label: '邮件',
            href: 'https://mail.jiehuo.ai/',
          }*/
          }
        ].map((item, index) => (
          <a key={index} href={item.href} target="_blank">
            <div key={index} className="flex flex-col items-center">
              <div className="text-3xl mb-2">{item.icon}</div>
              <div className="text-sm">{item.label}</div>
            </div>
          </a>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="w-full max-w-2xl px-6">
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            name="input"
            placeholder="解惑一下"
            value={input}
            onChange={e => setInput(e.target.value)}
            className="w-full py-3 px-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
          />
          <Button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-transparent hover:bg-transparent"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                stroke="#9CA3AF"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Button>
        </div>
      </form>

      {/* 
      <div className="mt-4 text-sm text-gray-500">
        <span className="mr-2">☁️ 31°</span>
        <span>Shenzhen</span>
      </div>
        */}
    </div>
  )
}
