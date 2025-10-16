import Link from 'next/link'

export default function NewPathPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-md mx-4 text-center">
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
            您访问的路径已被 Middleware 重写
          </p>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
          <h3 className="font-medium text-gray-900 dark:text-white mb-2">重写信息</h3>
          <div className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
            <p>原始路径: <code className="bg-gray-200 dark:bg-gray-600 px-1 rounded">/old-path/*</code></p>
            <p>重写路径: <code className="bg-gray-200 dark:bg-gray-600 px-1 rounded">/new-path/*</code></p>
            <p>重写类型: <code className="bg-gray-200 dark:bg-gray-600 px-1 rounded">NextResponse.rewrite()</code></p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              注意：URL 地址栏不会改变，但内容来自新路径
            </p>
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
