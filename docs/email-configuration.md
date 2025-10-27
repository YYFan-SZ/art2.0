# 邮件服务配置文档 | Email Service Configuration

本文档详细介绍如何配置 Get SaaS 的邮件服务，包括 Resend 邮件服务的设置和使用。

## 📧 Resend 邮件服务配置

### 1. 创建 Resend 账户

1. 访问 [Resend 官网](https://resend.com)
2. 点击 "Sign Up" 注册账户
3. 验证邮箱地址
4. 登录到 Resend 控制台

### 2. 获取 API 密钥

1. 在 Resend 控制台中，点击左侧菜单的 "API Keys"
2. 点击 "Create API Key" 按钮
3. 输入密钥名称（如：`get-saas-pro-production`）
4. 选择权限：
   - **Domain sending access**: `Send access`
   - **Webhook access**: `Full access`（如果需要 webhook）
5. 点击 "Add" 创建密钥
6. **重要**: 复制生成的 API 密钥，它只会显示一次

### 3. 域名验证（推荐）

#### 添加自定义域名
1. 在 Resend 控制台中，点击 "Domains"
2. 点击 "Add Domain" 按钮
3. 输入您的域名（如：`yourdomain.com`）
4. 点击 "Add" 添加域名

#### DNS 记录配置
Resend 会提供需要添加的 DNS 记录，通常包括：

```dns
# SPF 记录
TXT @ "v=spf1 include:_spf.resend.com ~all"

# DKIM 记录
TXT resend._domainkey "p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC..."

# DMARC 记录（可选但推荐）
TXT _dmarc "v=DMARC1; p=quarantine; rua=mailto:dmarc@yourdomain.com"
```

#### 验证域名
1. 在您的 DNS 提供商处添加上述记录
2. 等待 DNS 传播（通常 5-30 分钟）
3. 在 Resend 控制台中点击 "Verify" 验证域名

### 4. 环境变量配置

在您的 `.env.local` 文件中添加以下配置：

```env
# Resend 邮件服务配置
RESEND_API_KEY="re_xxxxxxxxxxxxxxxxxxxxxxxxxx"
EMAIL_FROM="noreply@yourdomain.com"  # 使用已验证的域名
EMAIL_FROM_NAME="Get SaaS"       # 发件人显示名称
```

### 5. 邮件模板配置

#### 支持的邮件类型
- **邮箱验证邮件**: 用户注册时发送
- **密码重置邮件**: 用户忘记密码时发送
- **支付成功通知**: 订阅或购买成功后发送
- **Newsletter**: 营销邮件和产品更新

#### 自定义邮件模板
邮件模板位于 `lib/email.ts` 文件中，您可以自定义：

```typescript
// 邮箱验证邮件模板
export const emailVerificationTemplate = {
  subject: "验证您的邮箱地址",
  html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>欢迎使用 Get SaaS！</h2>
      <p>请点击下面的链接验证您的邮箱地址：</p>
      <a href="{{verificationUrl}}" style="background: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px;">
        验证邮箱
      </a>
    </div>
  `
}
```

## 🔧 高级配置

### Webhook 配置（可选）

如果需要接收邮件状态回调：

1. 在 Resend 控制台中点击 "Webhooks"
2. 点击 "Add Webhook"
3. 配置 Webhook URL：`https://yourdomain.com/api/webhooks/resend`
4. 选择要监听的事件：
   - `email.sent`
   - `email.delivered`
   - `email.bounced`
   - `email.complained`

### 邮件发送限制

#### 免费计划限制
- 每月 3,000 封邮件
- 每天 100 封邮件
- 单次发送最多 50 个收件人

#### 付费计划
- Pro: $20/月，50,000 封邮件
- Scale: $85/月，500,000 封邮件

### 测试邮件配置

您可以创建测试脚本来验证邮件配置：

```bash
# 创建测试脚本（可选）
cat > scripts/test-email.js << 'EOF'
const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

async function testEmail() {
  try {
    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to: ['test@example.com'],
      subject: 'Test Email from Get SaaS',
      html: '<p>This is a test email to verify Resend configuration.</p>',
    });

    if (error) {
      console.error('Email sending failed:', error);
    } else {
      console.log('Email sent successfully:', data);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

testEmail();
EOF

# 运行测试
node scripts/test-email.js
```

## 🚨 常见问题

### 1. 邮件发送失败
**问题**: 收到 "Domain not verified" 错误
**解决**: 确保域名已通过验证，或使用 Resend 提供的默认域名

### 2. 邮件进入垃圾箱
**问题**: 发送的邮件被标记为垃圾邮件
**解决**: 
- 配置 SPF、DKIM、DMARC 记录
- 使用已验证的域名
- 避免垃圾邮件关键词

### 3. API 密钥无效
**问题**: 收到 "Invalid API key" 错误
**解决**: 
- 检查 API 密钥是否正确复制
- 确认密钥权限设置
- 重新生成新的 API 密钥

### 4. 发送频率限制
**问题**: 收到 "Rate limit exceeded" 错误
**解决**: 
- 检查当前计划的发送限制
- 考虑升级到付费计划
- 实现邮件队列系统

## 📊 监控和分析

### 邮件统计
在 Resend 控制台中可以查看：
- 发送成功率
- 打开率
- 点击率
- 退信率
- 投诉率

### 日志记录
应用中的邮件发送日志位于：
- 开发环境：控制台输出
- 生产环境：服务器日志文件

## 🔐 安全最佳实践

1. **API 密钥安全**
   - 不要在代码中硬编码 API 密钥
   - 使用环境变量存储敏感信息
   - 定期轮换 API 密钥

2. **域名安全**
   - 配置 DMARC 策略
   - 监控域名声誉
   - 使用专用发送域名

3. **内容安全**
   - 验证邮件内容
   - 防止邮件注入攻击
   - 实现邮件模板安全检查

---

📞 **需要帮助？**
如果在配置过程中遇到问题，请查看 [Resend 官方文档](https://resend.com/docs) 或联系技术支持。
