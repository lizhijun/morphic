import { User } from '@/lib/types' // 假设您有一个 User 类型定义

export async function loginUser(email: string, password: string): Promise<User> {
  // 这里应该是实际的登录逻辑，通常涉及到 API 调用
  // 以下是一个模拟的实现
  try {
    // 模拟 API 调用
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error('登录失败');
    }

    const user: User = await response.json();
    return user;
  } catch (error) {
    console.error('登录错误:', error);
    throw error;
  }
}
