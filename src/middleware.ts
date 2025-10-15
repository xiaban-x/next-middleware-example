import { NextRequest, NextResponse } from 'next/server'

// 扩展 NextRequest 类型以包含 geo 和 ip 属性
interface ExtendedNextRequest extends NextRequest {
  geo?: {
    country?: string
    region?: string
    city?: string
  }
  ip?: string
}

export function middleware(request: NextRequest) {
  const extendedRequest = request as ExtendedNextRequest
  const { pathname } = request.nextUrl
  
  // 1. 请求日志记录
  console.log(`[Middleware] ${request.method} ${pathname} - ${new Date().toISOString()}`)
  
  // 2. 添加自定义响应头
  const response = NextResponse.next()
  response.headers.set('X-Custom-Header', 'Middleware-Processed')
  response.headers.set('X-Request-Time', new Date().toISOString())
  
  // 3. 路径重写示例 - 将 /old-path 重写到 /new-path
  if (pathname.startsWith('/old-path')) {
    const newUrl = request.nextUrl.clone()
    newUrl.pathname = pathname.replace('/old-path', '/new-path')
    return NextResponse.rewrite(newUrl)
  }
  
  // 4. 重定向示例 - 将 /redirect-me 重定向到 /redirected
  if (pathname === '/redirect-me') {
    const redirectUrl = new URL('/redirected', request.url)
    return NextResponse.redirect(redirectUrl)
  }
  
  // 5. 基于用户代理的设备检测
  const userAgent = request.headers.get('user-agent') || ''
  const isMobile = /Mobile|Android|iPhone|iPad/.test(userAgent)
  
  if (isMobile) {
    response.headers.set('X-Device-Type', 'mobile')
  } else {
    response.headers.set('X-Device-Type', 'desktop')
  }
  
  // 6. 地理位置检测（基于 IP，这里使用模拟数据）
  const country = extendedRequest.geo?.country || 'Unknown'
  response.headers.set('X-Country', country)
  
  // 7. 访问控制示例 - 限制访问 /admin 路径
  if (pathname.startsWith('/admin')) {
    const authToken = request.cookies.get('auth-token')
    if (!authToken) {
      const loginUrl = new URL('/login', request.url)
      return NextResponse.redirect(loginUrl)
    }
  }
  
  // 8. API 限流示例（简单实现）
  if (pathname.startsWith('/api/')) {
    const clientIP = extendedRequest.ip || request.headers.get('x-forwarded-for') || 'unknown'
    console.log(`[API Request] IP: ${clientIP}, Path: ${pathname}`)
    
    // 这里可以添加更复杂的限流逻辑
    response.headers.set('X-Rate-Limit', '1000')
  }
  
  // 9. 内容安全策略头
  // 在开发模式下需要 'unsafe-eval' 来支持热重载
  const isDev = process.env.NODE_ENV === 'development'
  const cspPolicy = isDev 
    ? "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'"
    : "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'"
  
  response.headers.set('Content-Security-Policy', cspPolicy)
  
  // 10. 缓存控制
  if (pathname.startsWith('/static/')) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable')
  } else if (pathname.startsWith('/api/')) {
    response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate')
  }
  
  return response
}

// 配置中间件匹配规则
export const config = {
  matcher: [
    /*
     * 匹配所有路径，除了以下路径：
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
