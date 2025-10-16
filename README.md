# Next.js Middleware 示例项目

这是一个展示 Next.js Middleware 各种功能的示例项目，使用 Bun 作为包管理器，并启用了 Turbopack 加速开发。

## 🚀 项目特性

- **Bun** - 快速的 JavaScript 运行时和包管理器
- **Turbopack** - Next.js 的新一代打包工具，提供更快的开发体验
- **TypeScript** - 完整的类型支持
- **Tailwind CSS** - 现代化的 CSS 框架
- **ESLint** - 代码质量检查
- **App Router** - Next.js 13+ 的新路由系统
- **@netlify/next** - Netlify 增强的 Middleware 功能
- **Edge Functions** - 支持 Netlify Edge Functions
- **多平台支持** - 同时支持 Vercel 和 Netlify 部署

## 📁 项目结构

```
src/
├── middleware.ts          # Middleware 主文件
├── app/
│   ├── page.tsx          # 首页
│   ├── admin/            # 管理页面（需要认证）
│   │   └── page.tsx
│   ├── login/            # 登录页面
│   │   └── page.tsx
│   ├── redirected/       # 重定向目标页面
│   │   └── page.tsx
│   ├── new-path/         # 路径重写目标页面
│   │   ├── page.tsx       # 静态路径页面
│   │   └── [slug]/        # 动态路径页面
│   │       └── page.tsx
│   └── api/              # API 路由
│       ├── test/         # 测试 API
│       │   └── route.ts
│       └── headers/      # 响应头 API
│           └── route.ts
```

## 🛠️ Middleware 功能

本项目展示了以下 Middleware 功能：

### 1. 请求日志记录
- 记录所有请求的方法、路径和时间戳
- 在控制台输出详细的请求信息

### 2. 自定义响应头
- `X-Custom-Header`: 标识请求已被 Middleware 处理
- `X-Request-Time`: 请求处理时间
- `X-Device-Type`: 设备类型检测（mobile/desktop）
- `X-Country`: 地理位置信息
- `X-Rate-Limit`: API 限流信息

### 3. 路径重写
- 将 `/old-path/*` 重写到 `/new-path/*`
- URL 地址栏不变，但内容来自新路径

### 4. 重定向
- 将 `/redirect-me` 重定向到 `/redirected`
- 使用 `NextResponse.redirect()` 实现

### 5. 访问控制
- 保护 `/admin` 路径，需要认证
- 检查 `auth-token` Cookie
- 未认证用户重定向到登录页

### 6. API 限流
- 为 API 请求添加限流头信息
- 记录客户端 IP 和请求路径

### 7. 安全策略
- 设置 Content Security Policy 头
- 开发模式下自动添加 `'unsafe-eval'` 支持热重载
- 为不同路径设置不同的缓存策略

## 🚀 快速开始

### 安装依赖

```bash
bun install
```

### 启动开发服务器

```bash
bun dev
```

项目将在 [http://localhost:3000](http://localhost:3000) 启动。

### 构建生产版本

```bash
bun build
```

### 启动生产服务器

```bash
bun start
```

## 🌐 Netlify 部署

本项目已优化以支持在 Netlify 上部署，包含以下特性：

- ✅ **@netlify/next 库支持** - 增强的 Middleware 功能
- ✅ **Edge Functions** - 高性能边缘计算
- ✅ **自动环境检测** - 智能切换本地/Netlify 模式
- ✅ **完整配置** - 包含 `netlify.toml` 配置文件

### Netlify 部署步骤

1. **连接 GitHub 仓库到 Netlify**
2. **设置构建设置**：
   ```
   Build command: bun run build
   Publish directory: .next
   ```
3. **设置环境变量**：
   ```
   NETLIFY=true
   NODE_VERSION=18
   BUN_VERSION=1.2.18
   ```

详细部署指南请查看 [NETLIFY_DEPLOYMENT.md](./NETLIFY_DEPLOYMENT.md)

## 🧪 功能测试

访问以下路径来测试不同的 Middleware 功能：

1. **首页** - `http://localhost:3000`
   - 查看 Middleware 添加的响应头
   - 访问各种功能演示链接

2. **重定向测试** - `http://localhost:3000/redirect-me`
   - 会被重定向到 `/redirected`

3. **路径重写测试** - `http://localhost:3000/old-path/test` 或 `http://localhost:3000/old-path/anything`
   - 会被重写到 `/new-path/test` 或 `/new-path/anything`，但 URL 不变
   - 支持动态路径参数

4. **访问控制测试** - `http://localhost:3000/admin`
   - 未认证时会被重定向到 `/login`
   - 登录后可以正常访问

5. **API 测试** - `http://localhost:3000/api/test`
   - 查看 API 请求的详细信息
   - 包含 Middleware 添加的头信息

## 🔧 配置说明

### Middleware 配置

```typescript
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
```

这个配置确保 Middleware 不会处理：
- API 路由（`/api/*`）
- Next.js 静态文件（`/_next/static/*`）
- Next.js 图片优化文件（`/_next/image/*`）
- favicon.ico 文件

### Turbopack 配置

项目已默认启用 Turbopack，在 `package.json` 中：

```json
{
  "scripts": {
    "dev": "next dev --turbopack"
  }
}
```

## 📚 学习资源

- [Next.js Middleware 官方文档](https://nextjs.org/docs/app/building-your-application/routing/middleware)
- [Turbopack 介绍](https://turbo.build/pack)
- [Bun 官方文档](https://bun.sh/docs)

## 🤝 贡献

欢迎提交 Issue 和 Pull Request 来改进这个示例项目！

## 📄 许可证

MIT License