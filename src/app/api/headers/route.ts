import { NextRequest, NextResponse } from 'next/server'

// 扩展 NextRequest 类型以包含 geo 属性
interface ExtendedNextRequest extends NextRequest {
  geo?: {
    country?: string
    region?: string
    city?: string
  }
}

export async function GET(request: NextRequest) {
  const extendedRequest = request as ExtendedNextRequest
  // 返回 Middleware 添加的响应头信息
  const isDev = process.env.NODE_ENV === 'development'
  const cspPolicy = isDev 
    ? "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'"
    : "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'"
  
  const middlewareHeaders = {
    'X-Custom-Header': 'Middleware-Processed',
    'X-Request-Time': new Date().toISOString(),
    'X-Device-Type': request.headers.get('user-agent')?.includes('Mobile') ? 'mobile' : 'desktop',
    'X-Country': extendedRequest.geo?.country || 'Unknown',
    'X-Rate-Limit': '1000',
    'Content-Security-Policy': cspPolicy,
    'Cache-Control': 'no-cache, no-store, must-revalidate'
  }
  
  return NextResponse.json(middlewareHeaders)
}
