'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Home() {
  const [headers, setHeaders] = useState<Record<string, string>>({})

  useEffect(() => {
    // 获取响应头信息来展示 Middleware 的效果
    fetch('/api/headers')
      .then(res => res.json())
      .then(data => setHeaders(data))
      .catch(console.error)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Next.js Middleware 示例项目
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            这个项目展示了 Next.js Middleware 的各种功能，包括请求拦截、重定向、重写、访问控制等。
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Middleware 功能展示 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Middleware 功能演示
            </h2>
            <div className="space-y-4">
              <Link 
                href="/redirect-me" 
                className="block p-3 bg-blue-100 dark:bg-blue-900 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
              >
                <h3 className="font-medium text-blue-900 dark:text-blue-100">重定向示例</h3>
                <p className="text-sm text-blue-700 dark:text-blue-300">点击访问 /redirect-me，将被重定向到 /redirected</p>
              </Link>
              
              <Link 
                href="/old-path/test" 
                className="block p-3 bg-green-100 dark:bg-green-900 rounded-lg hover:bg-green-200 dark:hover:bg-green-800 transition-colors"
              >
                <h3 className="font-medium text-green-900 dark:text-green-100">路径重写示例</h3>
                <p className="text-sm text-green-700 dark:text-green-300">访问 /old-path/* 会被重写到 /new-path/*</p>
              </Link>
              
              <Link 
                href="/admin" 
                className="block p-3 bg-red-100 dark:bg-red-900 rounded-lg hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
              >
                <h3 className="font-medium text-red-900 dark:text-red-100">访问控制示例</h3>
                <p className="text-sm text-red-700 dark:text-red-300">访问 /admin 需要认证，未认证会被重定向到登录页</p>
              </Link>
              
              <Link 
                href="/api/test" 
                className="block p-3 bg-purple-100 dark:bg-purple-900 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors"
              >
                <h3 className="font-medium text-purple-900 dark:text-purple-100">API 限流示例</h3>
                <p className="text-sm text-purple-700 dark:text-purple-300">API 请求会添加限流头信息</p>
              </Link>
              
              <Link 
                href="/rewrite-vs-redirect" 
                className="block p-3 bg-yellow-100 dark:bg-yellow-900 rounded-lg hover:bg-yellow-200 dark:hover:bg-yellow-800 transition-colors"
              >
                <h3 className="font-medium text-yellow-900 dark:text-yellow-100">重写 vs 重定向对比</h3>
                <p className="text-sm text-yellow-700 dark:text-yellow-300">直观对比两种不同的路径处理方式</p>
              </Link>
            </div>
          </div>

          {/* 响应头信息 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              Middleware 添加的响应头
            </h2>
            <div className="space-y-2">
              {Object.entries(headers).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-700 rounded">
                  <span className="font-mono text-sm text-gray-700 dark:text-gray-300">{key}:</span>
                  <span className="font-mono text-sm text-gray-900 dark:text-white">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 技术说明 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            技术说明
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Middleware 功能</h3>
              <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                <li>• 请求日志记录</li>
                <li>• 自定义响应头</li>
                <li>• 路径重写和重定向</li>
                <li>• 设备类型检测</li>
                <li>• 地理位置检测</li>
                <li>• 访问控制</li>
                <li>• API 限流</li>
                <li>• 安全策略头</li>
                <li>• 缓存控制</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">项目特性</h3>
              <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                <li>• 使用 Bun 作为包管理器</li>
                <li>• 启用 Turbopack 加速开发</li>
                <li>• TypeScript 支持</li>
                <li>• Tailwind CSS 样式</li>
                <li>• ESLint 代码检查</li>
                <li>• App Router 架构</li>
                <li>• 响应式设计</li>
                <li>• 深色模式支持</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
