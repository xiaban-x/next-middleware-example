// Netlify Edge Function 示例
// 这个文件展示了如何在 Netlify 上使用 Edge Functions 处理 Middleware 功能

export default async (request: Request) => {
  const url = new URL(request.url)
  const { pathname } = url
  
  console.log(`[Netlify Edge Function] ${request.method} ${pathname}`)
  
  // 添加自定义响应头
  const response = new Response(null, {
    status: 200,
    headers: {
      'X-Custom-Header': 'Edge-Function-Processed',
      'X-Request-Time': new Date().toISOString(),
      'X-Platform': 'Netlify-Edge',
    }
  })
  
  // 路径重写示例
  if (pathname.startsWith('/old-path')) {
    const newPath = pathname.replace('/old-path', '/new-path')
    console.log(`[Edge Function] Rewriting ${pathname} to ${newPath}`)
    
    // 在 Netlify 中，重写通过返回重定向响应实现
    return Response.redirect(new URL(newPath, request.url), 307)
  }
  
  // 重定向示例
  if (pathname === '/redirect-me') {
    console.log(`[Edge Function] Redirecting ${pathname} to /redirected`)
    return Response.redirect(new URL('/redirected', request.url), 307)
  }
  
  // 访问控制示例
  if (pathname.startsWith('/admin')) {
    const authToken = request.headers.get('cookie')?.includes('auth-token=valid-token')
    if (!authToken) {
      console.log(`[Edge Function] Access denied for ${pathname}`)
      return Response.redirect(new URL('/login', request.url), 307)
    }
  }
  
  // 继续处理请求
  return fetch(request)
}
