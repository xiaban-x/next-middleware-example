'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface RewriteInfo {
  rewritePath: string
  originalUrl: string
  timestamp: string
  message: string
}

export default function NewPathDynamicPage() {
  const [currentUrl, setCurrentUrl] = useState('')
  const [rewriteInfo, setRewriteInfo] = useState<RewriteInfo | null>(null)

  useEffect(() => {
    // 获取当前 URL
    setCurrentUrl(window.location.href)
    
    // 获取重写信息（通过检查响应头）
    fetch('/api/rewrite-info')
      .then(res => res.json())
      .then(data => setRewriteInfo(data))
      .catch(console.error)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-2xl mx-4 text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            路径重写成功！
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            您访问的路径已被 Middleware 重写，但 URL 保持不变
          </p>
        </div>
        
        {/* URL 显示 */}
        <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-4 mb-6">
          <h3 className="font-medium text-blue-900 dark:text-blue-100 mb-2">当前浏览器 URL</h3>
          <p className="text-sm text-blue-700 dark:text-blue-300 break-all">
            {currentUrl}
          </p>
          <p className="text-xs text-blue-600 dark:text-blue-400 mt-2">
            ⚠️ 注意：URL 地址栏显示的是原始路径，但内容来自重写后的路径
          </p>
        </div>
        
        {/* 重写信息 */}
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
          <h3 className="font-medium text-gray-900 dark:text-white mb-2">重写信息</h3>
          <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
            <p>原始路径: <code className="bg-gray-200 dark:bg-gray-600 px-1 rounded">/old-path/*</code></p>
            <p>重写路径: <code className="bg-gray-200 dark:bg-gray-600 px-1 rounded">/new-path/*</code></p>
            <p>重写类型: <code className="bg-gray-200 dark:bg-gray-600 px-1 rounded">NextResponse.rewrite()</code></p>
            {rewriteInfo && (
              <div className="mt-2 p-2 bg-green-100 dark:bg-green-900 rounded">
                <p className="text-green-800 dark:text-green-200 text-xs">
                  ✅ 服务器响应头包含: <code>x-middleware-rewrite: {rewriteInfo.rewritePath}</code>
                </p>
              </div>
            )}
          </div>
        </div>

        {/* 对比说明 */}
        <div className="bg-yellow-50 dark:bg-yellow-900 rounded-lg p-4 mb-6">
          <h3 className="font-medium text-yellow-900 dark:text-yellow-100 mb-2">重写 vs 重定向</h3>
          <div className="text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
            <p><strong>重写（Rewrite）</strong>：URL 不变，内容来自新路径</p>
            <p><strong>重定向（Redirect）</strong>：URL 会改变到新地址</p>
            <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-2">
              当前您看到的是重写效果 - URL 保持 /old-path/test，但内容来自 /new-path/test
            </p>
          </div>
        </div>
        
        <div className="flex gap-4 justify-center">
          <Link 
            href="/"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            返回首页
          </Link>
          <Link 
            href="/redirect-me"
            className="inline-block bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            体验重定向
          </Link>
        </div>
      </div>
    </div>
  )
}
