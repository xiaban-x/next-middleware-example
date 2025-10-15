import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  // 获取请求头信息
  const headers: Record<string, string> = {}
  
  // 收集所有请求头
  request.headers.forEach((value, key) => {
    headers[key] = value
  })
  
  // 添加一些额外的信息
  const responseData = {
    message: 'API 请求成功处理',
    timestamp: new Date().toISOString(),
    method: request.method,
    url: request.url,
    headers: headers,
    ip: request.ip || request.headers.get('x-forwarded-for') || 'unknown',
    userAgent: request.headers.get('user-agent') || 'unknown',
    // Middleware 添加的自定义头
    customHeaders: {
      'X-Custom-Header': request.headers.get('X-Custom-Header'),
      'X-Request-Time': request.headers.get('X-Request-Time'),
      'X-Device-Type': request.headers.get('X-Device-Type'),
      'X-Country': request.headers.get('X-Country'),
      'X-Rate-Limit': request.headers.get('X-Rate-Limit'),
    }
  }
  
  return NextResponse.json(responseData)
}
