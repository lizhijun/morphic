'use client'

import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { User } from '../../lib/types'
//import { loginUser } from '@/app/api/auth/route'
import { useUser } from '@/lib/user-context'

interface LoginFormProps {
  onSuccess: () => void
}

export async function loginUser(email: string, password: string): Promise<User> {
  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || '登录失败');
    }

    const user: User = await response.json();
    
    // 可以在这里处理登录成功后的逻辑，比如保存 token 到 localStorage
    // localStorage.setItem('token', user.token);

    return user;
  } catch (error) {
    console.error('登录错误:', error);
    throw error;
  }
}

export function LoginForm({ onSuccess }: LoginFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { setUser } = useUser()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      const user = await loginUser(email, password)
      setUser(user)
      onSuccess()
    } catch (err) {
      setError('登录失败,请检查邮箱和密码')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input
        type="email"
        placeholder="邮箱"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mb-2"
      />
      <Input
        type="password"
        placeholder="密码"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mb-2"
      />
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <Button type="submit">登录</Button>
    </form>
  )
}