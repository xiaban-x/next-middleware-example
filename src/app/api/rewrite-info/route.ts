import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  // 获取重写信息
  const rewritePath = request.headers.get('x-middleware-rewrite')
  
  return NextResponse.json({
    rewritePath: rewritePath || '无重写信息',
    originalUrl: request.url,
    timestamp: new Date().toISOString(),
    message: rewritePath ? '路径重写正在工作！' : '未检测到路径重写'
  })
}
