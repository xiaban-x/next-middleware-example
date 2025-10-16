# Netlify 部署指南

本项目已优化以支持在 Netlify 上部署 Next.js Middleware。

## 🚀 快速部署

### 方法一：通过 Netlify Dashboard

1. **连接 GitHub 仓库**
   - 登录 [Netlify](https://netlify.com)
   - 点击 "New site from Git"
   - 选择您的 GitHub 仓库

2. **配置构建设置**
   ```
   Build command: bun run build
   Publish directory: .next
   ```

3. **设置环境变量**
   ```
   NETLIFY=true
   NODE_VERSION=18
   BUN_VERSION=1.2.18
   ```

### 方法二：通过 Netlify CLI

1. **安装 Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **登录 Netlify**
   ```bash
   netlify login
   ```

3. **初始化项目**
   ```bash
   netlify init
   ```

4. **部署**
   ```bash
   bun run deploy
   ```

## 🔧 Netlify 特定配置

### 1. Edge Functions 支持

项目已配置使用 Netlify Edge Functions 运行 Middleware：

- **文件位置**: `netlify/edge-functions/middleware.ts`
- **自动检测**: Middleware 会自动检测 Netlify 环境并使用 `@netlify/next` 库

### 2. 环境变量

在 Netlify Dashboard 中设置以下环境变量：

```bash
# 必需的环境变量
NETLIFY=true
NODE_VERSION=18
BUN_VERSION=1.2.18

# 可选的环境变量
NODE_ENV=production
NEXT_PUBLIC_APP_URL=https://your-site.netlify.app
```

### 3. 构建配置

项目包含 `netlify.toml` 配置文件，包含：

- **构建命令**: `bun run build`
- **发布目录**: `.next`
- **重定向规则**: SPA 支持
- **缓存策略**: 静态资源优化
- **安全头**: 安全策略配置

## 📋 功能对比

| 功能 | 本地开发 | Netlify 部署 |
|------|----------|--------------|
| 路径重写 | ✅ NextResponse.rewrite() | ✅ MiddlewareRequest.rewrite() |
| 重定向 | ✅ NextResponse.redirect() | ✅ MiddlewareRequest.rewrite() |
| 访问控制 | ✅ Cookie 检查 | ✅ Cookie 检查 |
| 响应头 | ✅ 标准头 | ✅ 增强头 + Edge 头 |
| 地理位置 | ✅ 模拟数据 | ✅ 真实 geo 数据 |
| API 限流 | ✅ 基础实现 | ✅ Edge 优化 |

## 🐛 故障排除

### 1. Middleware 不生效

**问题**: Middleware 在 Netlify 上不工作

**解决方案**:
- 确保安装了 `@netlify/next` 包
- 检查 `NETLIFY=true` 环境变量
- 查看 Netlify 函数日志

### 2. 构建失败

**问题**: 构建过程中出现错误

**解决方案**:
- 检查 Node.js 版本 (推荐 18+)
- 确保 Bun 版本兼容
- 查看构建日志中的具体错误

### 3. 路径重写不工作

**问题**: 路径重写在 Netlify 上不生效

**解决方案**:
- 检查 `netlify.toml` 中的重定向规则
- 确保 Edge Functions 正确配置
- 使用 Netlify 的 `_redirects` 文件作为备选

## 🔍 调试技巧

### 1. 查看日志

在 Netlify Dashboard 中：
- 进入 "Functions" 标签
- 查看 Edge Functions 日志
- 检查 Middleware 执行情况

### 2. 本地测试

使用 Netlify CLI 本地测试：
```bash
bun run netlify:dev
```

### 3. 环境检测

Middleware 会自动检测运行环境：
- `NETLIFY=true`: 使用 Netlify 增强功能
- 其他环境: 使用标准 Next.js Middleware

## 📚 相关文档

- [Netlify Next.js Middleware 文档](https://docs.netlify.com/build/frameworks/framework-setup-guides/nextjs/legacy-runtime/middleware/)
- [@netlify/next 库文档](https://github.com/netlify/netlify-next)
- [Netlify Edge Functions 文档](https://docs.netlify.com/edge-functions/overview/)

## 🎯 部署检查清单

- [ ] 安装 `@netlify/next` 包
- [ ] 配置 `netlify.toml` 文件
- [ ] 设置环境变量 `NETLIFY=true`
- [ ] 测试 Edge Functions
- [ ] 验证 Middleware 功能
- [ ] 检查重定向规则
- [ ] 确认安全头配置
- [ ] 测试生产环境部署
