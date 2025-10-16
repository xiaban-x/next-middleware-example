import Link from 'next/link'

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <div className="w-20 h-20 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            管理面板
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            恭喜！您已成功通过 Middleware 的访问控制验证
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* 访问控制信息 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              访问控制验证
            </h2>
            <div className="space-y-4">
              <div className="flex items-center p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                <svg className="w-5 h-5 text-green-600 dark:text-green-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <h3 className="font-medium text-green-900 dark:text-green-100">认证状态</h3>
                  <p className="text-sm text-green-700 dark:text-green-300">已通过身份验证</p>
                </div>
              </div>
              
              <div className="flex items-center p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <div>
                  <h3 className="font-medium text-blue-900 dark:text-blue-100">访问权限</h3>
                  <p className="text-sm text-blue-700 dark:text-blue-300">管理员权限</p>
                </div>
              </div>
            </div>
          </div>

          {/* Middleware 处理流程 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              处理流程
            </h2>
            <div className="space-y-3">
              <div className="flex items-center">
                <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium mr-3">1</div>
                <span className="text-sm text-gray-600 dark:text-gray-300">检测到访问 /admin 路径</span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium mr-3">2</div>
                <span className="text-sm text-gray-600 dark:text-gray-300">检查 auth-token Cookie</span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-medium mr-3">3</div>
                <span className="text-sm text-gray-600 dark:text-gray-300">验证通过，允许访问</span>
              </div>
              <div className="flex items-center">
                <div className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-medium mr-3">4</div>
                <span className="text-sm text-gray-600 dark:text-gray-300">渲染管理页面</span>
              </div>
            </div>
          </div>
        </div>

        {/* 功能演示 */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            管理功能
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">用户管理</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">管理用户账户和权限</p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">系统设置</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">配置系统参数和选项</p>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <h3 className="font-medium text-gray-900 dark:text-white mb-2">数据分析</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">查看系统使用统计</p>
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
