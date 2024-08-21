'use client'

import React from 'react'
import { ModeToggle } from './mode-toggle'
import { IconLogo } from './ui/icons'
import { cn } from '@/lib/utils'
import HistoryContainer from './history-container'
import { AuthButtons } from './auth/auth-buttons'
import { useUser } from '../lib/user-context'
import { Button } from './ui/button'

const Header: React.FC = () => {
  const { user, logout } = useUser()

  return (
    <header className="fixed w-full p-1 md:p-2 flex justify-between items-center z-10 backdrop-blur md:backdrop-blur-none bg-background/80 md:bg-transparent">
      <div>
        <a href="/">
          <IconLogo />
          <span className="sr-only">解惑AI</span>
        </a>
      </div>
      <div className="flex gap-0.5 items-center">
        {user ? (
          <div className="flex items-center gap-2">
            <span>欢迎, {user.email}</span>
            <Button onClick={logout}>登出</Button>
          </div>
        ) : (
          <AuthButtons />
        )}
      </div>
    </header>
  )
}

export default Header