import Link from 'next/link'

export default function RewriteVsRedirectDemo() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            重写 vs 重定向 对比演示
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            通过实际体验来理解 Next.js Middleware 中重写和重定向的区别
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* 路径重写演示 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                路径重写（Rewrite）
              </h2>
            </div>
            
            <div className="space-y-4">
              <div className="bg-purple-50 dark:bg-purple-900 rounded-lg p-4">
                <h3 className="font-medium text-purple-900 dark:text-purple-100 mb-2">特点</h3>
                <ul className="text-sm text-purple-700 dark:text-purple-300 space-y-1">
                  <li>• URL 地址栏<strong>不会改变</strong></li>
                  <li>• 内容来自重写后的路径</li>
                  <li>• HTTP 状态码：200</li>
                  <li>• 用户无感知</li>
                </ul>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">测试链接</h3>
                <a 
                  href="/old-path/test" 
                  className="block p-3 bg-purple-100 dark:bg-purple-900 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors"
                >
                  <span className="font-medium text-purple-900 dark:text-purple-100">点击测试重写</span>
                  <p className="text-sm text-purple-700 dark:text-purple-300 mt-1">
                    URL 保持 /old-path/test，但内容来自 /new-path/test
                  </p>
                </a>
              </div>
            </div>
          </div>

          {/* 重定向演示 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                重定向（Redirect）
              </h2>
            </div>
            
            <div className="space-y-4">
              <div className="bg-green-50 dark:bg-green-900 rounded-lg p-4">
                <h3 className="font-medium text-green-900 dark:text-green-100 mb-2">特点</h3>
                <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
                  <li>• URL 地址栏<strong>会改变</strong></li>
                  <li>• 浏览器跳转到新地址</li>
                  <li>• HTTP 状态码：301/302/307</li>
                  <li>• 用户可见跳转</li>
                </ul>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">测试链接</h3>
                <a 
                  href="/redirect-me" 
                  className="block p-3 bg-green-100 dark:bg-green-900 rounded-lg hover:bg-green-200 dark:hover:bg-green-800 transition-colors"
                >
                  <span className="font-medium text-green-900 dark:text-green-100">点击测试重定向</span>
                  <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                    URL 会从 /redirect-me 改变为 /redirected
                  </p>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* 技术说明 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            技术实现对比
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">重写（Rewrite）</h3>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <pre className="text-sm text-gray-600 dark:text-gray-300 overflow-x-auto">
{`// Middleware 代码
if (pathname.startsWith('/old-path')) {
  const newUrl = request.nextUrl.clone()
  newUrl.pathname = pathname.replace('/old-path', '/new-path')
  return NextResponse.rewrite(newUrl)
}`}
                </pre>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">重定向（Redirect）</h3>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <pre className="text-sm text-gray-600 dark:text-gray-300 overflow-x-auto">
{`// Middleware 代码
if (pathname === '/redirect-me') {
  const redirectUrl = new URL('/redirected', request.url)
  return NextResponse.redirect(redirectUrl)
}`}
                </pre>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <Link 
            href="/"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
          >
            返回首页
          </Link>
        </div>
      </div>
    </div>
  )
}
