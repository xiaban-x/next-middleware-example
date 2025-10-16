import Link from 'next/link'

export default function RedirectedPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-md mx-4 text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            重定向成功！
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            您已成功通过 Middleware 重定向到此页面
          </p>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
          <h3 className="font-medium text-gray-900 dark:text-white mb-2">重定向信息</h3>
          <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
            <p>原始路径: <code className="bg-gray-200 dark:bg-gray-600 px-1 rounded">/redirect-me</code></p>
            <p>目标路径: <code className="bg-gray-200 dark:bg-gray-600 px-1 rounded">/redirected</code></p>
            <p>重定向类型: <code className="bg-gray-200 dark:bg-gray-600 px-1 rounded">NextResponse.redirect()</code></p>
          </div>
        </div>
        
        <Link 
          href="/"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
        >
          返回首页
        </Link>
      </div>
    </div>
  )
}
