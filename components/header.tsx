import React from 'react'
import { ModeToggle } from './mode-toggle'
import { IconLogo } from './ui/icons'
import { cn } from '@/lib/utils'
import HistoryContainer from './history-container'

export const Header: React.FC = async () => {
  return (
    <header className="fixed w-full p-1 md:p-2 flex justify-between items-center z-10 backdrop-blur md:backdrop-blur-none bg-background/80 md:bg-transparent">
      <div>
        {/*
        <a href="/">
          <IconLogo />
          <span className="sr-only">解惑AI</span>
        </a>*/}
      </div>
      {/*<nav className="hidden md:flex space-x-4">
        <a href="https://image.jiehuo.ai" target="_blank">
          图片
        </a>
        <a href="https://tool.jiehuo.ai" target="_blank">
          导航
        </a>
         <a href="https://maps.jiehuo.ai">Maps</a> 
        <a href="https://translate.jiehuo.ai">Translate</a>
        <a href="https://weather.jiehuo.ai">Weather</a>
        <a href="https://mail.jiehuo.ai">Mail</a>
      </nav>*/}
      <div className="flex gap-0.5">
        {/* <ModeToggle /> 
        <HistoryContainer location="header" />
        <button className="px-3 py-1 bg-gray-200 rounded">登录</button>*/}
      </div>
    </header>
  )
}

export default Header
