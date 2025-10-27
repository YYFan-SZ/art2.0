# OAuth 第三方登录配置文档 | OAuth Third-party Login Configuration

本文档详细介绍如何配置 Get SaaS 的第三方 OAuth 登录，包括 Google OAuth 和 GitHub OAuth 的设置。

## 🔐 OAuth 认证概述

Get SaaS 支持以下 OAuth 提供商：
- **Google OAuth 2.0**: 使用 Google 账户登录
- **GitHub OAuth**: 使用 GitHub 账户登录
- **可扩展**: 支持添加更多 OAuth 提供商

## 🌐 Google OAuth 配置

### 1. 创建 Google Cloud 项目

1. 访问 [Google Cloud Console](https://console.cloud.google.com/)
2. 点击项目选择器，然后点击 "新建项目"
3. 输入项目名称（如：`get-saas-pro`）
4. 选择组织（可选）
5. 点击 "创建"

### 2. 启用 Google+ API

1. 在 Google Cloud Console 中，导航到 "API 和服务" > "库"
2. 搜索 "Google+ API" 或 "People API"
3. 点击 "Google+ API"，然后点击 "启用"
4. 同样启用 "People API"（推荐）

### 3. 配置 OAuth 同意屏幕

1. 导航到 "API 和服务" > "OAuth 同意屏幕"
2. 选择用户类型：
   - **内部**: 仅限组织内用户（G Suite）
   - **外部**: 任何 Google 用户
3. 填写应用信息：
   ```
   应用名称: Get SaaS
   用户支持邮箱: support@yourdomain.com
   应用徽标: 上传您的应用图标（可选）
   应用主页: https://yourdomain.com
   应用隐私政策链接: https://yourdomain.com/privacy
   应用服务条款链接: https://yourdomain.com/terms
   ```

4. 添加授权域名：
   ```
   yourdomain.com
   localhost（仅用于开发）
   ```

5. 配置作用域（Scopes）：
   - `../auth/userinfo.email`
   - `../auth/userinfo.profile`
   - `openid`

### 4. 创建 OAuth 2.0 凭据

1. 导航到 "API 和服务" > "凭据"
2. 点击 "创建凭据" > "OAuth 2.0 客户端 ID"
3. 选择应用类型：**Web 应用**
4. 配置客户端信息：
   ```
   名称: Get SaaS Web Client
   
   已获授权的 JavaScript 来源:
   - http://localhost:3000 (开发环境)
   - https://yourdomain.com (生产环境)
   
   已获授权的重定向 URI:
   - http://localhost:3000/api/auth/callback/google (开发环境)
   - https://yourdomain.com/api/auth/callback/google (生产环境)
   ```

5. 点击 "创建"
6. 复制生成的客户端 ID 和客户端密钥

### 5. 环境变量配置

```env
# Google OAuth 配置
GOOGLE_CLIENT_ID="123456789012-abcdefghijklmnopqrstuvwxyz123456.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="GOCSPX-abcdefghijklmnopqrstuvwxyz123456"
```

## 🐙 GitHub OAuth 配置

### 1. 创建 GitHub OAuth 应用

1. 登录 GitHub，访问 [Developer Settings](https://github.com/settings/developers)
2. 点击 "OAuth Apps" 标签
3. 点击 "New OAuth App" 按钮
4. 填写应用信息：
   ```
   Application name: Get SaaS
   Homepage URL: https://yourdomain.com
   Application description: Modern SaaS template for global products
   Authorization callback URL: https://yourdomain.com/api/auth/callback/github
   ```

### 2. 开发环境配置

为开发环境创建单独的 OAuth 应用：

```
Application name: Get SaaS (Development)
Homepage URL: http://localhost:3000
Authorization callback URL: http://localhost:3000/api/auth/callback/github
```

### 3. 获取客户端凭据

1. 创建应用后，您将看到 "Client ID"
2. 点击 "Generate a new client secret" 生成客户端密钥
3. **重要**: 立即复制客户端密钥，它只会显示一次

### 4. 环境变量配置

```env
# GitHub OAuth 配置
GITHUB_ID="abcdef1234567890abcd"
GITHUB_SECRET="abcdef1234567890abcdef1234567890abcdef12"
```

## ⚙️ NextAuth.js 配置

### 1. 完整的环境变量

```env
# NextAuth 配置
NEXTAUTH_URL="http://localhost:3000"  # 开发环境
# NEXTAUTH_URL="https://yourdomain.com"  # 生产环境
NEXTAUTH_SECRET="your-super-secret-key-here-make-it-long-and-random"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# GitHub OAuth
GITHUB_ID="your-github-client-id"
GITHUB_SECRET="your-github-client-secret"
```

### 2. 生成 NEXTAUTH_SECRET

```bash
# 使用 OpenSSL 生成随机密钥
openssl rand -base64 32

# 或使用 Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

### 3. 验证配置

检查 `lib/auth.ts` 文件中的 OAuth 提供商配置：

```typescript
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from 'next-auth/providers/github'

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    // ... 其他提供商
  ],
  // ... 其他配置
}
```

## 🧪 测试 OAuth 登录

### 1. 测试流程

1. 启动开发服务器：`npm run dev`
2. 访问登录页面：`http://localhost:3000/en/auth/signin`
3. 点击 "Continue with Google" 或 "Continue with GitHub"
4. 完成 OAuth 授权流程
5. 验证用户信息是否正确保存

### 2. 调试 OAuth 问题

启用 NextAuth.js 调试模式：

```env
# 启用调试日志
NEXTAUTH_DEBUG=true
```

查看控制台输出的详细日志信息。

### 3. 常见测试场景

```bash
# 创建测试脚本（可选）
cat > scripts/test-oauth.js << 'EOF'
// 测试 OAuth 配置
const testOAuthConfig = () => {
  const requiredEnvVars = [
    'NEXTAUTH_URL',
    'NEXTAUTH_SECRET',
    'GOOGLE_CLIENT_ID',
    'GOOGLE_CLIENT_SECRET',
    'GITHUB_ID',
    'GITHUB_SECRET'
  ];

  console.log('🔍 检查 OAuth 环境变量配置...\n');

  requiredEnvVars.forEach(varName => {
    const value = process.env[varName];
    if (value) {
      console.log(`✅ ${varName}: ${value.substring(0, 10)}...`);
    } else {
      console.log(`❌ ${varName}: 未配置`);
    }
  });

  console.log('\n📋 配置检查完成');
};

testOAuthConfig();
EOF

# 运行测试
node scripts/test-oauth.js
```

## 🔒 安全最佳实践

### 1. 客户端密钥安全

- **永远不要**在客户端代码中暴露客户端密钥
- 使用环境变量存储敏感信息
- 定期轮换客户端密钥
- 为不同环境使用不同的 OAuth 应用

### 2. 重定向 URI 验证

- 只添加必要的重定向 URI
- 使用 HTTPS（生产环境）
- 避免使用通配符重定向 URI

### 3. 作用域最小化

只请求应用必需的权限：

```typescript
GoogleProvider({
  clientId: process.env.GOOGLE_CLIENT_ID!,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
  authorization: {
    params: {
      scope: 'openid email profile'  // 最小权限
    }
  }
})
```

### 4. 状态参数验证

NextAuth.js 自动处理 CSRF 保护，但确保：
- 不要禁用内置的 CSRF 保护
- 验证回调中的状态参数

## 🌍 多环境配置

### 开发环境
```env
NEXTAUTH_URL="http://localhost:3000"
GOOGLE_CLIENT_ID="dev-google-client-id"
GITHUB_ID="dev-github-client-id"
```

### 预发布环境
```env
NEXTAUTH_URL="https://staging.yourdomain.com"
GOOGLE_CLIENT_ID="staging-google-client-id"
GITHUB_ID="staging-github-client-id"
```

### 生产环境
```env
NEXTAUTH_URL="https://yourdomain.com"
GOOGLE_CLIENT_ID="prod-google-client-id"
GITHUB_ID="prod-github-client-id"
```

## 🚨 常见问题

### 1. "redirect_uri_mismatch" 错误
**问题**: OAuth 重定向 URI 不匹配
**解决**: 
- 检查 OAuth 应用中配置的重定向 URI
- 确保 NEXTAUTH_URL 环境变量正确
- 验证开发/生产环境的 URI 配置

### 2. "invalid_client" 错误
**问题**: 客户端 ID 或密钥无效
**解决**:
- 验证环境变量中的客户端 ID 和密钥
- 检查 OAuth 应用是否已启用
- 确认密钥没有过期或被撤销

### 3. 用户信息获取失败
**问题**: OAuth 登录成功但无法获取用户信息
**解决**:
- 检查请求的作用域权限
- 验证 API 是否已启用（Google）
- 查看 NextAuth.js 调试日志

### 4. 本地开发 HTTPS 问题
**问题**: 某些 OAuth 提供商要求 HTTPS
**解决**:
- 使用 ngrok 等工具创建 HTTPS 隧道
- 配置本地 HTTPS 开发环境
- 使用 OAuth 提供商的开发者模式

## 📊 监控和分析

### 1. OAuth 使用统计

在数据库中记录 OAuth 登录统计：

```sql
-- 查看 OAuth 提供商使用情况
SELECT 
  provider,
  COUNT(*) as user_count,
  COUNT(*) * 100.0 / (SELECT COUNT(*) FROM accounts) as percentage
FROM accounts 
GROUP BY provider;
```

### 2. 登录成功率监控

```typescript
// 记录 OAuth 登录尝试
await db.insert(loginAttempts).values({
  provider: 'google',
  success: true,
  timestamp: new Date(),
  userAgent: req.headers['user-agent']
})
```

---

📞 **需要帮助？**
如果在配置过程中遇到问题，请查看：
- [NextAuth.js 官方文档](https://next-auth.js.org/)
- [Google OAuth 文档](https://developers.google.com/identity/protocols/oauth2)
- [GitHub OAuth 文档](https://docs.github.com/en/developers/apps/building-oauth-apps)
