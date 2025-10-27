# Get SaaS 配置文档 | Configuration Documentation

欢迎使用 Get SaaS 配置文档！本目录包含了完整的第三方服务配置指南，帮助您快速设置和部署 SaaS 应用。

## 📚 文档目录 | Documentation Index

### 🔧 核心配置文档

| 文档 | 描述 | 状态 |
|------|------|------|
| [数据库配置](./database-configuration.md) | PostgreSQL 数据库和 Drizzle ORM 配置 | ✅ 完成 |
| [邮件服务配置](./email-configuration.md) | Resend 邮件服务的完整配置指南 | ✅ 完成 |
| [Stripe 支付配置](./stripe-configuration.md) | Stripe 支付系统的详细设置教程 | ✅ 完成 |
| [OAuth 第三方登录配置](./oauth-configuration.md) | Google 和 GitHub OAuth 登录配置 | ✅ 完成 |

### � 管理功能文档

| 文档 | 描述 | 状态 |
|------|------|------|
| [邮件订阅后台管理](./newsletter-management.md) | Newsletter 订阅系统的后台管理功能 | ✅ 完成 |

### �🚀 快速配置检查清单

在开始之前，请确保您已经完成以下准备工作：

#### ✅ 基础环境
- [ ] Node.js 18+ 已安装
- [ ] PostgreSQL 数据库已准备
- [ ] 域名已注册（生产环境）
- [ ] SSL 证书已配置（生产环境）

#### ✅ 第三方服务账户
- [ ] [Resend](https://resend.com) 邮件服务账户
- [ ] [Stripe](https://stripe.com) 支付服务账户
- [ ] [Google Cloud Console](https://console.cloud.google.com) 项目
- [ ] [GitHub Developer](https://github.com/settings/developers) 应用

#### ✅ 环境变量配置
- [ ] 数据库连接字符串
- [ ] NextAuth 密钥和 URL
- [ ] Resend API 密钥
- [ ] Stripe API 密钥和产品 ID
- [ ] Google OAuth 客户端凭据
- [ ] GitHub OAuth 客户端凭据

#### ✅ 管理员权限设置
- [ ] 设置管理员账户
- [ ] 验证后台管理访问权限
- [ ] 测试邮件订阅管理功能

## 🔑 环境变量模板 | Environment Variables Template

创建 `.env.local` 文件并填入以下配置：

```env
# ===========================================
# 数据库配置 | Database Configuration
# ===========================================
DATABASE_URL="postgresql://username:password@localhost:5432/get_saas_pro"

# ===========================================
# NextAuth 配置 | NextAuth Configuration
# ===========================================
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-super-secret-key-here-make-it-long-and-random"

# ===========================================
# 邮件服务配置 | Email Service Configuration
# ===========================================
RESEND_API_KEY="re_xxxxxxxxxxxxxxxxxxxxxxxxxx"
EMAIL_FROM="noreply@yourdomain.com"
EMAIL_FROM_NAME="Get SaaS"

# ===========================================
# Stripe 支付配置 | Stripe Payment Configuration
# ===========================================
STRIPE_SECRET_KEY="sk_test_xxxxxxxxxxxxxxxxxxxxxxxxxx"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxx"
STRIPE_WEBHOOK_SECRET="whsec_xxxxxxxxxxxxxxxxxxxxxxxxxx"

# Stripe 产品价格 ID | Stripe Product Price IDs
STRIPE_PRO_PRICE_ID="price_xxxxxxxxxxxxxxxxxx"
STRIPE_POINTS_STARTER_PRICE_ID="price_xxxxxxxxxxxxxxxxxx"
STRIPE_POINTS_POPULAR_PRICE_ID="price_xxxxxxxxxxxxxxxxxx"
STRIPE_POINTS_PREMIUM_PRICE_ID="price_xxxxxxxxxxxxxxxxxx"

# ===========================================
# OAuth 第三方登录配置 | OAuth Configuration
# ===========================================
# Google OAuth
GOOGLE_CLIENT_ID="123456789012-abcdefghijklmnopqrstuvwxyz123456.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="GOCSPX-abcdefghijklmnopqrstuvwxyz123456"

# GitHub OAuth
GITHUB_ID="abcdef1234567890abcd"
GITHUB_SECRET="abcdef1234567890abcdef1234567890abcdef12"

# ===========================================
# 应用配置 | Application Configuration
# ===========================================
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

## 🛠️ 配置步骤 | Configuration Steps

### 1. 基础设置
1. 克隆项目并安装依赖
2. 复制环境变量模板
3. 配置数据库连接

### 2. 数据库配置
1. 阅读 [数据库配置文档](./database-configuration.md)
2. 安装和配置 PostgreSQL
3. 创建数据库和用户
4. 运行数据库迁移
5. 测试数据库连接

### 3. 邮件服务配置
1. 阅读 [邮件服务配置文档](./email-configuration.md)
2. 创建 Resend 账户并获取 API 密钥
3. 配置域名验证（推荐）
4. 测试邮件发送功能

### 4. 支付系统配置
1. 阅读 [Stripe 支付配置文档](./stripe-configuration.md)
2. 创建 Stripe 账户并获取 API 密钥
3. 配置产品和价格
4. 设置 Webhook 端点
5. 测试支付流程

### 5. OAuth 登录配置
1. 阅读 [OAuth 配置文档](./oauth-configuration.md)
2. 配置 Google OAuth 应用
3. 配置 GitHub OAuth 应用
4. 测试第三方登录功能

### 6. 管理员权限和后台管理
1. 阅读 [邮件订阅后台管理文档](./newsletter-management.md)
2. 设置管理员账户权限
3. 访问后台管理界面
4. 测试邮件订阅管理功能

### 7. 部署前检查
1. 验证所有环境变量
2. 运行测试脚本
3. 检查 Webhook 端点
4. 测试完整用户流程

## 🧪 测试脚本 | Test Scripts

### 一键测试所有配置

```bash
# 创建综合测试脚本
cat > scripts/test-all-configs.js << 'EOF'
const { execSync } = require('child_process');

console.log('🚀 开始测试所有配置...\n');

// 注意：以下测试脚本需要根据您的需求自行创建
const tests = [
  { name: '数据库连接', script: 'test-database.js' },
  { name: '邮件服务', script: 'test-email.js' },
  { name: 'Stripe 配置', script: 'test-stripe.js' },
  { name: 'OAuth 配置', script: 'test-oauth.js' },
  { name: '邮件订阅系统', script: 'test-newsletter.js' }
];

tests.forEach(test => {
  try {
    console.log(`📋 测试 ${test.name}...`);
    execSync(`node scripts/${test.script}`, { stdio: 'inherit' });
    console.log(`✅ ${test.name} 测试通过\n`);
  } catch (error) {
    console.log(`❌ ${test.name} 测试失败\n`);
  }
});

console.log('🎉 配置测试完成！');
EOF

# 注意：需要先创建测试脚本和配置 package.json
# npm run test:all
```

> ⚠️ **注意**: 上述测试脚本需要您根据项目需求自行创建。建议参考各个配置文档中的测试示例来创建相应的测试文件。

### 管理员权限测试

```bash
# 创建管理员权限测试脚本
cat > scripts/test-admin.js << 'EOF'
async function testAdminAccess() {
  console.log('🔐 测试管理员权限...')

  // 测试设置管理员
  const setAdminResponse = await fetch('http://localhost:3000/api/admin/set-admin', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@example.com' })
  })

  const setAdminResult = await setAdminResponse.json()
  console.log('✅ 设置管理员:', setAdminResult)

  // 测试访问管理员接口
  const statsResponse = await fetch('http://localhost:3000/api/newsletter/subscribe?action=stats')
  const statsResult = await statsResponse.json()
  console.log('✅ 管理员接口访问:', statsResult)
}

testAdminAccess()
EOF

# 运行管理员测试
node scripts/test-admin.js
```

### 环境变量验证

```bash
# 创建环境变量检查脚本
cat > scripts/check-env.js << 'EOF'
const requiredEnvVars = [
  'DATABASE_URL',
  'NEXTAUTH_URL',
  'NEXTAUTH_SECRET',
  'RESEND_API_KEY',
  'EMAIL_FROM',
  'STRIPE_SECRET_KEY',
  'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY',
  'GOOGLE_CLIENT_ID',
  'GOOGLE_CLIENT_SECRET',
  'GITHUB_ID',
  'GITHUB_SECRET'
];

console.log('🔍 检查环境变量配置...\n');

let missingVars = [];

requiredEnvVars.forEach(varName => {
  const value = process.env[varName];
  if (value) {
    console.log(`✅ ${varName}`);
  } else {
    console.log(`❌ ${varName} - 缺失`);
    missingVars.push(varName);
  }
});

if (missingVars.length === 0) {
  console.log('\n🎉 所有必需的环境变量都已配置！');
} else {
  console.log(`\n⚠️  缺失 ${missingVars.length} 个环境变量:`);
  missingVars.forEach(varName => {
    console.log(`   - ${varName}`);
  });
}
EOF

# 运行环境变量检查
node scripts/check-env.js
```

## 🚨 常见问题 | Common Issues

### 配置相关问题

| 问题 | 可能原因 | 解决方案 |
|------|----------|----------|
| 数据库连接失败 | 连接字符串错误 | 检查 DATABASE_URL 格式 |
| 邮件发送失败 | API 密钥无效 | 验证 Resend API 密钥 |
| 支付失败 | Webhook 未配置 | 检查 Stripe Webhook 设置 |
| OAuth 登录失败 | 重定向 URI 不匹配 | 验证 OAuth 应用配置 |
| 管理后台无法访问 | 用户权限不足 | 检查用户角色设置 |

### 调试技巧

1. **启用调试模式**
   ```env
   NEXTAUTH_DEBUG=true
   NODE_ENV=development
   ```

2. **查看详细日志**
   ```bash
   npm run dev -- --verbose
   ```

3. **使用测试脚本**（需要自行创建）
   ```bash
   # npm run test:stripe
   # npm run test:email
   # npm run test:newsletter
   ```

## 📞 获取帮助 | Getting Help

如果您在配置过程中遇到问题：

1. **查看详细文档**: 每个配置文档都包含详细的故障排除指南
2. **运行测试脚本**: 使用提供的测试脚本诊断问题
3. **检查日志**: 查看应用和服务的错误日志
4. **联系支持**: 发送邮件至 support@getsaaspro.com

## 🔄 配置更新 | Configuration Updates

当您需要更新配置时：

1. **备份当前配置**: 保存现有的 `.env.local` 文件
2. **逐步更新**: 一次更新一个服务的配置
3. **测试验证**: 每次更新后运行相关测试
4. **回滚准备**: 如有问题，快速回滚到之前的配置

---

🎯 **配置完成后，您就可以开始使用 Get SaaS 的所有功能了！**

包括完整的用户认证、支付系统、邮件服务、第三方登录和后台管理功能。

祝您使用愉快！🚀
