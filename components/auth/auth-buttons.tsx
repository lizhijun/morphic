'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { useUser } from '@/lib/user-context'

export function AuthButtons() {
  const { login, register } = useUser()

  const handleLogin = () => {
    // 这里应该打开登录模态框
    // 暂时使用模拟数据
    login('user@example.com', 'password')
  }

  const handleRegister = () => {
    // 这里应该打开注册模态框
    // 暂时使用模拟数据
    register('newuser@example.com', 'password')
  }

  return (
    <>
      <Button onClick={handleLogin}>登录</Button>
      <Button onClick={handleRegister}>注册</Button>
    </>
  )
}