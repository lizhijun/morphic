'use client';

import React, { createContext, useState, useContext, useEffect } from 'react'

type User = {
  email: string
} | null

type UserContextType = {
  user: User
  setUser: React.Dispatch<React.SetStateAction<User>>
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string) => Promise<void>
  logout: () => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null)

  useEffect(() => {
    // 在这里检查本地存储或 cookie 中是否有用户会话
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const login = async (email: string, password: string) => {
    // 这里应该调用你的登录 API
    // 假设 API 返回用户数据
    const userData = { email }
    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
  }

  const register = async (email: string, password: string) => {
    // 这里应该调用你的注册 API
    // 假设 API 返回用户数据
    const userData = { email }
    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  return (
    <UserContext.Provider value={{ user, setUser, login, register, logout }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}
