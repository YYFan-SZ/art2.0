# 邮件订阅后台管理文档 | Newsletter Management Documentation

本文档详细介绍 Get SaaS 的邮件订阅系统后台管理功能，包括管理员权限设置、订阅数据管理、统计分析等。

## 📧 邮件订阅系统概述

Get SaaS 内置了完整的邮件订阅管理系统，支持：
- **前端订阅**: 用户在网站首页底部订阅
- **多语言支持**: 支持中文和英文订阅
- **自动取消订阅**: 通过邮件链接一键取消
- **后台管理**: 管理员可查看统计和管理订阅
- **数据导出**: 支持订阅数据的查看和分析

## 🔐 管理员权限设置

### 1. 设置管理员账户

#### 方法一：通过 API 接口设置
```bash
# GET 请求方式
curl "https://yourdomain.com/api/admin/set-admin?email=admin@yourdomain.com"

# POST 请求方式
curl -X POST "https://yourdomain.com/api/admin/set-admin" \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@yourdomain.com"}'
```

#### 方法二：直接修改数据库
```sql
-- 将指定用户设置为管理员
UPDATE users 
SET role = 'admin' 
WHERE email = 'admin@yourdomain.com';
```

### 2. 验证管理员权限

管理员权限验证通过 `lib/auth-utils.ts` 实现：

```typescript
// 检查当前用户是否为管理员
export async function isAdmin() {
  const user = await getCurrentUser()
  return user?.role === 'admin'
}

// 要求管理员权限，否则重定向到未授权页面
export async function requireAdmin() {
  const admin = await isAdmin()
  if (!admin) {
    redirect('/zh/unauthorized')
  }
  return true
}
```

## 📊 后台管理界面

### 1. 访问管理后台

管理员登录后，访问以下 URL：
```
https://yourdomain.com/zh/admin/newsletter
https://yourdomain.com/en/admin/newsletter
```

### 2. 管理界面功能

#### 统计概览卡片
- **总订阅数**: 显示活跃订阅用户总数
- **中文订阅**: 中文语言偏好的订阅数量
- **英文订阅**: 英文语言偏好的订阅数量
- **增长趋势**: 显示订阅增长情况

#### 订阅列表管理
- **活跃订阅**: 查看所有活跃的订阅用户
- **已取消订阅**: 查看已取消订阅的用户
- **详细信息**: 邮箱、语言偏好、订阅时间等
- **实时刷新**: 点击刷新按钮获取最新数据

## 🛠️ API 接口详解

### 1. 订阅统计接口

```typescript
// GET /api/newsletter/subscribe?action=stats
// 需要管理员权限
{
  "total": 150,      // 总活跃订阅数
  "zh": 90,          // 中文订阅数
  "en": 60           // 英文订阅数
}
```

### 2. 订阅列表接口

```typescript
// GET /api/newsletter/subscribe?action=list
// 需要管理员权限
{
  "subscriptions": [
    {
      "id": "abc123",
      "email": "user@example.com",
      "locale": "zh",
      "isActive": true,
      "subscribedAt": "2024-01-15T10:30:00Z",
      "unsubscribedAt": null
    }
    // ... 更多订阅记录
  ]
}
```

### 3. 用户订阅接口

```typescript
// POST /api/newsletter/subscribe
{
  "email": "user@example.com",
  "locale": "zh"  // 可选，默认为 'zh'
}

// 响应
{
  "message": "订阅成功！感谢您的关注"
}
```

### 4. 取消订阅接口

```typescript
// POST /api/newsletter/unsubscribe
{
  "email": "user@example.com",
  "locale": "zh"
}

// 或通过 token 取消订阅
// GET /api/newsletter/unsubscribe?token=abc123&locale=zh
```

## 🗄️ 数据库架构

### newsletterSubscriptions 表结构

```sql
CREATE TABLE "newsletterSubscriptions" (
  "id" text PRIMARY KEY,
  "email" text NOT NULL UNIQUE,
  "isActive" boolean DEFAULT true,
  "locale" text NOT NULL DEFAULT 'zh',
  "subscribedAt" timestamp DEFAULT now(),
  "unsubscribedAt" timestamp,
  "unsubscribeToken" text UNIQUE
);
```

### 字段说明

| 字段 | 类型 | 说明 |
|------|------|------|
| `id` | text | 订阅记录唯一标识符 |
| `email` | text | 用户邮箱地址（唯一） |
| `isActive` | boolean | 订阅状态（true=活跃，false=已取消） |
| `locale` | text | 语言偏好（'zh'或'en'） |
| `subscribedAt` | timestamp | 订阅时间 |
| `unsubscribedAt` | timestamp | 取消订阅时间 |
| `unsubscribeToken` | text | 取消订阅令牌（用于邮件链接） |

## 📈 数据分析和统计

### 1. 常用 SQL 查询

```sql
-- 查看订阅统计
SELECT 
  COUNT(*) as total_subscriptions,
  COUNT(CASE WHEN "isActive" = true THEN 1 END) as active_subscriptions,
  COUNT(CASE WHEN "locale" = 'zh' AND "isActive" = true THEN 1 END) as zh_subscriptions,
  COUNT(CASE WHEN "locale" = 'en' AND "isActive" = true THEN 1 END) as en_subscriptions
FROM "newsletterSubscriptions";

-- 查看每日订阅趋势
SELECT 
  DATE("subscribedAt") as date,
  COUNT(*) as daily_subscriptions
FROM "newsletterSubscriptions"
WHERE "subscribedAt" >= NOW() - INTERVAL '30 days'
GROUP BY DATE("subscribedAt")
ORDER BY date DESC;

-- 查看取消订阅率
SELECT 
  COUNT(CASE WHEN "isActive" = false THEN 1 END) * 100.0 / COUNT(*) as unsubscribe_rate
FROM "newsletterSubscriptions";
```

### 2. 管理界面统计组件

`components/newsletter/newsletter-stats.tsx` 提供了完整的统计界面：

```typescript
interface Stats {
  total: number    // 总活跃订阅数
  zh: number      // 中文订阅数
  en: number      // 英文订阅数
}

interface Subscription {
  id: string
  email: string
  locale: string
  isActive: boolean
  subscribedAt: string
  unsubscribedAt: string | null
}
```

## 🔧 自定义和扩展

### 1. 添加新的统计指标

在 `components/newsletter/newsletter-stats.tsx` 中添加新的统计卡片：

```typescript
// 添加本月新增订阅统计
<Card>
  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
    <CardTitle className="text-sm font-medium">本月新增</CardTitle>
    <TrendingUp className="h-4 w-4 text-muted-foreground" />
  </CardHeader>
  <CardContent>
    <div className="text-2xl font-bold">{monthlyGrowth}</div>
    <p className="text-xs text-muted-foreground">
      较上月增长 {growthPercentage}%
    </p>
  </CardContent>
</Card>
```

### 2. 导出订阅数据

添加数据导出功能：

```typescript
// 在管理界面添加导出按钮
const exportSubscriptions = async () => {
  const response = await fetch('/api/newsletter/subscribe?action=export')
  const data = await response.json()
  
  // 转换为 CSV 格式
  const csv = convertToCSV(data.subscriptions)
  downloadCSV(csv, 'newsletter-subscriptions.csv')
}
```

### 3. 批量操作功能

添加批量管理功能：

```typescript
// 批量取消订阅
const batchUnsubscribe = async (emails: string[]) => {
  const response = await fetch('/api/newsletter/batch-unsubscribe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ emails })
  })
  return response.json()
}
```

## 📧 邮件集成

### 1. 欢迎邮件

在用户订阅成功后发送欢迎邮件：

```typescript
// 在 app/api/newsletter/subscribe/route.ts 中
import { sendWelcomeEmail } from '@/lib/email'

// 创建新订阅后
await sendWelcomeEmail(email, locale, unsubscribeToken)
```

### 2. 取消订阅确认邮件

```typescript
// 发送取消订阅确认邮件
const sendUnsubscribeConfirmation = async (email: string, locale: string) => {
  const subject = locale === 'zh' 
    ? '取消订阅确认 - Get SaaS' 
    : 'Unsubscribe Confirmation - Get SaaS'
    
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>${locale === 'zh' ? '取消订阅成功' : 'Successfully Unsubscribed'}</h2>
      <p>${locale === 'zh' 
        ? '您已成功取消订阅我们的邮件列表。如果这是误操作，您可以随时重新订阅。' 
        : 'You have successfully unsubscribed from our newsletter. If this was a mistake, you can resubscribe at any time.'
      }</p>
    </div>
  `
  
  await sendEmail({ to: email, subject, html })
}
```

## 🚨 安全和隐私

### 1. 数据保护

- **邮箱加密**: 考虑对敏感邮箱地址进行加密存储
- **访问控制**: 严格的管理员权限验证
- **数据备份**: 定期备份订阅数据
- **GDPR 合规**: 支持用户数据删除请求

### 2. 防止滥用

```typescript
// 添加订阅频率限制
const rateLimiter = new Map()

export async function POST(request: NextRequest) {
  const ip = request.ip || 'unknown'
  const now = Date.now()
  const windowMs = 60 * 1000 // 1分钟
  const maxRequests = 5
  
  const requests = rateLimiter.get(ip) || []
  const recentRequests = requests.filter(time => now - time < windowMs)
  
  if (recentRequests.length >= maxRequests) {
    return NextResponse.json(
      { error: '请求过于频繁，请稍后再试' },
      { status: 429 }
    )
  }
  
  rateLimiter.set(ip, [...recentRequests, now])
  // ... 继续处理订阅逻辑
}
```

## 🧪 测试和调试

### 1. 测试订阅流程

```bash
# 创建测试脚本（可选）
cat > scripts/test-newsletter.js << 'EOF'
async function testNewsletterFlow() {
  const testEmail = 'test@example.com'
  
  console.log('🧪 测试邮件订阅流程...')
  
  // 测试订阅
  const subscribeResponse = await fetch('http://localhost:3000/api/newsletter/subscribe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: testEmail, locale: 'zh' })
  })
  
  const subscribeResult = await subscribeResponse.json()
  console.log('✅ 订阅测试:', subscribeResult)
  
  // 测试取消订阅
  const unsubscribeResponse = await fetch('http://localhost:3000/api/newsletter/unsubscribe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: testEmail, locale: 'zh' })
  })
  
  const unsubscribeResult = await unsubscribeResponse.json()
  console.log('✅ 取消订阅测试:', unsubscribeResult)
}

testNewsletterFlow()
EOF

# 运行测试
node scripts/test-newsletter.js
```

### 2. 管理员权限测试

```bash
# 测试管理员权限
curl -H "Cookie: next-auth.session-token=your-session-token" \
  "http://localhost:3000/api/newsletter/subscribe?action=stats"
```

## 📊 性能优化

### 1. 数据库索引

```sql
-- 为常用查询添加索引
CREATE INDEX CONCURRENTLY idx_newsletter_active ON "newsletterSubscriptions"("isActive") 
WHERE "isActive" = true;

CREATE INDEX CONCURRENTLY idx_newsletter_locale ON "newsletterSubscriptions"("locale");

CREATE INDEX CONCURRENTLY idx_newsletter_subscribed_at ON "newsletterSubscriptions"("subscribedAt");
```

### 2. 缓存统计数据

```typescript
// 使用 Redis 或内存缓存统计数据
const getCachedStats = async () => {
  const cacheKey = 'newsletter:stats'
  const cached = await redis.get(cacheKey)
  
  if (cached) {
    return JSON.parse(cached)
  }
  
  const stats = await calculateStats()
  await redis.setex(cacheKey, 300, JSON.stringify(stats)) // 缓存5分钟
  
  return stats
}
```

---

📞 **需要帮助？**
如果在邮件订阅管理配置过程中遇到问题，请查看相关 API 文档或联系技术支持。
