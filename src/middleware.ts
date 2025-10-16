import { NextRequest, NextResponse } from 'next/server'
import { MiddlewareRequest } from '@netlify/next'

// 扩展 NextRequest 类型以包含 geo 和 ip 属性
interface ExtendedNextRequest extends NextRequest {
  geo?: {
    country?: string
    region?: string
    city?: string
  }
  ip?: string
}

// Netlify MiddlewareRequest 兼容类型
interface NetlifyCompatibleRequest extends NextRequest {
  geo: {
    timezone?: string
    country?: string
    region?: string
    city?: string
  }
}

export async function middleware(request: NextRequest) {
  const extendedRequest = request as ExtendedNextRequest
  const { pathname } = request.nextUrl
  
  // 检查是否在 Netlify 环境中
  const isNetlify = process.env.NETLIFY === 'true' || process.env.VERCEL !== 'true'
  
  // 1. 请求日志记录
  console.log(`[Middleware] ${request.method} ${pathname} - ${new Date().toISOString()}`)
  console.log(`[Middleware] Platform: ${isNetlify ? 'Netlify' : 'Vercel/Local'}`)
  
  // 在 Netlify 环境中使用 @netlify/next 的增强功能
  if (isNetlify) {
    try {
      // 创建兼容的请求对象
      const compatibleRequest = request as NetlifyCompatibleRequest
      const middlewareRequest = new MiddlewareRequest(compatibleRequest)
      
      // 2. 添加自定义请求头
      middlewareRequest.headers.set('X-Custom-Header', 'Middleware-Processed')
      middlewareRequest.headers.set('X-Request-Time', new Date().toISOString())
      middlewareRequest.headers.set('X-Platform', 'Netlify')
      
      // 3. 基于用户代理的设备检测
      const userAgent = request.headers.get('user-agent') || ''
      const isMobile = /Mobile|Android|iPhone|iPad/.test(userAgent)
      middlewareRequest.headers.set('X-Device-Type', isMobile ? 'mobile' : 'desktop')
      
      // 4. 地理位置检测（Netlify 提供更好的 geo 支持）
      const country = extendedRequest.geo?.country || 'Unknown'
      middlewareRequest.headers.set('X-Country', country)
      
      // 5. 路径重写示例 - 将 /old-path 重写到 /new-path
      if (pathname.startsWith('/old-path')) {
        const newPath = pathname.replace('/old-path', '/new-path')
        console.log(`[Netlify Middleware] Rewriting ${pathname} to ${newPath}`)
        return middlewareRequest.rewrite(newPath)
      }
      
      // 6. 重定向示例 - 将 /redirect-me 重定向到 /redirected
      if (pathname === '/redirect-me') {
        console.log(`[Netlify Middleware] Redirecting ${pathname} to /redirected`)
        return middlewareRequest.rewrite('/redirected')
      }
      
      // 7. 访问控制示例 - 限制访问 /admin 路径
      if (pathname.startsWith('/admin')) {
        const authToken = request.cookies.get('auth-token')
        if (!authToken) {
          console.log(`[Netlify Middleware] Access denied for ${pathname}, redirecting to login`)
          return middlewareRequest.rewrite('/login')
        }
      }
      
      // 8. API 限流示例
      if (pathname.startsWith('/api/')) {
        const clientIP = extendedRequest.ip || request.headers.get('x-forwarded-for') || 'unknown'
        console.log(`[Netlify API Request] IP: ${clientIP}, Path: ${pathname}`)
        middlewareRequest.headers.set('X-Rate-Limit', '1000')
      }
      
      // 9. 内容安全策略头（Netlify 环境优化）
      const isDev = process.env.NODE_ENV === 'development'
      const cspPolicy = isDev 
        ? "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'"
        : "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'"
      
      middlewareRequest.headers.set('Content-Security-Policy', cspPolicy)
      
      // 10. 缓存控制
      if (pathname.startsWith('/static/')) {
        middlewareRequest.headers.set('Cache-Control', 'public, max-age=31536000, immutable')
      } else if (pathname.startsWith('/api/')) {
        middlewareRequest.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate')
      }
      
      // 继续处理请求
      const response = await middlewareRequest.next()
      
      // 添加响应头
      response.headers.set('X-Middleware-Platform', 'Netlify')
      response.headers.set('X-Middleware-Version', '1.0.0')
      
      return response
      
    } catch (error) {
      console.error('[Netlify Middleware Error]:', error)
      // 如果 @netlify/next 失败，回退到标准 Next.js Middleware
    }
  }
  
  // 标准 Next.js Middleware 实现（用于 Vercel 或本地开发）
  const response = NextResponse.next()
  
  // 2. 添加自定义响应头
  response.headers.set('X-Custom-Header', 'Middleware-Processed')
  response.headers.set('X-Request-Time', new Date().toISOString())
  response.headers.set('X-Platform', 'Standard')
  
  // 3. 基于用户代理的设备检测
  const userAgent = request.headers.get('user-agent') || ''
  const isMobile = /Mobile|Android|iPhone|iPad/.test(userAgent)
  
  if (isMobile) {
    response.headers.set('X-Device-Type', 'mobile')
  } else {
    response.headers.set('X-Device-Type', 'desktop')
  }
  
  // 4. 地理位置检测
  const country = extendedRequest.geo?.country || 'Unknown'
  response.headers.set('X-Country', country)
  
  // 5. 路径重写示例
  if (pathname.startsWith('/old-path')) {
    const newUrl = request.nextUrl.clone()
    newUrl.pathname = pathname.replace('/old-path', '/new-path')
    return NextResponse.rewrite(newUrl)
  }
  
  // 6. 重定向示例
  if (pathname === '/redirect-me') {
    const redirectUrl = new URL('/redirected', request.url)
    return NextResponse.redirect(redirectUrl)
  }
  
  // 7. 访问控制示例
  if (pathname.startsWith('/admin')) {
    const authToken = request.cookies.get('auth-token')
    if (!authToken) {
      const loginUrl = new URL('/login', request.url)
      return NextResponse.redirect(loginUrl)
    }
  }
  
  // 8. API 限流示例
  if (pathname.startsWith('/api/')) {
    const clientIP = extendedRequest.ip || request.headers.get('x-forwarded-for') || 'unknown'
    console.log(`[API Request] IP: ${clientIP}, Path: ${pathname}`)
    response.headers.set('X-Rate-Limit', '1000')
  }
  
  // 9. 内容安全策略头
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