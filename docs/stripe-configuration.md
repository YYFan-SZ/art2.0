# Stripe 支付配置文档 | Stripe Payment Configuration

本文档详细介绍如何配置 Get SaaS 的 Stripe 支付系统，包括账户设置、产品配置、Webhook 设置等。

## 💳 Stripe 账户设置

### 1. 创建 Stripe 账户

1. 访问 [Stripe 官网](https://stripe.com)
2. 点击 "Start now" 注册账户
3. 填写业务信息和银行账户信息
4. 完成身份验证流程

### 2. 获取 API 密钥

#### 测试环境密钥
1. 登录 Stripe Dashboard
2. 确保左上角显示 "Test mode"
3. 点击右上角的 "Developers" → "API keys"
4. 复制以下密钥：
   - **Publishable key**: `pk_test_...`
   - **Secret key**: `sk_test_...`

#### 生产环境密钥
1. 在 Stripe Dashboard 中关闭 "Test mode"
2. 重复上述步骤获取生产环境密钥：
   - **Publishable key**: `pk_live_...`
   - **Secret key**: `sk_live_...`

### 3. 环境变量配置

在 `.env.local` 文件中配置：

```env
# Stripe 配置
STRIPE_SECRET_KEY="sk_test_xxxxxxxxxxxxxxxxxxxxxxxxxx"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxx"
STRIPE_WEBHOOK_SECRET="whsec_xxxxxxxxxxxxxxxxxxxxxxxxxx"

# 产品价格 ID（稍后配置）
STRIPE_PRO_PRICE_ID="price_xxxxxxxxxxxxxxxxxx"
STRIPE_POINTS_STARTER_PRICE_ID="price_xxxxxxxxxxxxxxxxxx"
STRIPE_POINTS_POPULAR_PRICE_ID="price_xxxxxxxxxxxxxxxxxx"
STRIPE_POINTS_PREMIUM_PRICE_ID="price_xxxxxxxxxxxxxxxxxx"
```

## 🛍️ 产品和价格配置

### 1. 创建订阅产品

#### 专业版订阅
1. 在 Stripe Dashboard 中点击 "Products"
2. 点击 "Add product"
3. 填写产品信息：
   - **Name**: `Professional Plan`
   - **Description**: `Get SaaS 专业版订阅`
   - **Image**: 上传产品图片（可选）

4. 配置价格：
   - **Pricing model**: `Standard pricing`
   - **Price**: `$9.99`
   - **Billing period**: `Monthly`
   - **Currency**: `USD`

5. 点击 "Save product"
6. 复制生成的 Price ID（格式：`price_xxxxx`）

### 2. 创建积分购买产品

#### 入门套餐（5,000积分 - $8）
```
Name: 积分套餐 - 入门版
Description: 5,000 积分，适合新用户试用
Price: $8.00
Type: One-time
```

#### 热门套餐（10,000积分 - $15）
```
Name: 积分套餐 - 热门版
Description: 10,000 积分，最受欢迎的选择
Price: $15.00
Type: One-time
```

#### 高级套餐（100,000积分 - $150）
```
Name: 积分套餐 - 高级版
Description: 100,000 积分，适合重度用户
Price: $150.00
Type: One-time
```

### 3. 更新环境变量

将获取的 Price ID 更新到环境变量中：

```env
STRIPE_PRO_PRICE_ID="price_1234567890abcdef"
STRIPE_POINTS_STARTER_PRICE_ID="price_abcdef1234567890"
STRIPE_POINTS_POPULAR_PRICE_ID="price_fedcba0987654321"
STRIPE_POINTS_PREMIUM_PRICE_ID="price_1357924680acefbd"
```

## 🔗 Webhook 配置

### 1. 创建 Webhook 端点

1. 在 Stripe Dashboard 中点击 "Developers" → "Webhooks"
2. 点击 "Add endpoint"
3. 配置 Webhook：
   - **Endpoint URL**: `https://yourdomain.com/api/stripe/webhook`
   - **Description**: `Get SaaS Webhook`

### 2. 选择监听事件

选择以下事件类型：

#### 订阅相关事件
- `customer.subscription.created`
- `customer.subscription.updated`
- `customer.subscription.deleted`
- `invoice.payment_succeeded`
- `invoice.payment_failed`

#### 支付相关事件
- `checkout.session.completed`
- `payment_intent.succeeded`
- `payment_intent.payment_failed`

#### 客户相关事件
- `customer.created`
- `customer.updated`
- `customer.deleted`

### 3. 获取 Webhook 签名密钥

1. 创建 Webhook 后，点击进入详情页
2. 在 "Signing secret" 部分点击 "Reveal"
3. 复制签名密钥（格式：`whsec_xxxxx`）
4. 更新环境变量：

```env
STRIPE_WEBHOOK_SECRET="whsec_xxxxxxxxxxxxxxxxxxxxxxxxxx"
```

### 4. 测试 Webhook

使用 Stripe CLI 测试 Webhook：

```bash
# 安装 Stripe CLI
# macOS
brew install stripe/stripe-cli/stripe

# 登录
stripe login

# 转发 Webhook 到本地
stripe listen --forward-to localhost:3000/api/stripe/webhook

# 触发测试事件
stripe trigger checkout.session.completed
```

## 🧪 测试支付流程

### 1. 测试卡号

Stripe 提供以下测试卡号：

```
# 成功支付
4242 4242 4242 4242  # Visa
4000 0566 5566 5556  # Visa (debit)
5555 5555 5555 4444  # Mastercard

# 失败支付
4000 0000 0000 0002  # 卡被拒绝
4000 0000 0000 9995  # 资金不足
4000 0000 0000 9987  # 卡已丢失
4000 0000 0000 9979  # 卡被盗

# 3D Secure 验证
4000 0027 6000 3184  # 需要验证
4000 0082 6000 3178  # 验证失败
```

### 2. 测试信息

```
# 任何未来日期
Expiry: 12/34

# 任何3位数字
CVC: 123

# 任何邮政编码
ZIP: 12345
```

### 3. 测试脚本

您可以创建测试脚本来验证配置：

```bash
# 创建测试文件（可选）
cat > scripts/test-stripe.js << 'EOF'
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

async function testStripeConfig() {
  try {
    // 测试 API 连接
    const balance = await stripe.balance.retrieve();
    console.log('✅ Stripe API 连接成功');
    console.log('账户余额:', balance);

    // 测试产品列表
    const products = await stripe.products.list({ limit: 10 });
    console.log('✅ 产品列表获取成功');
    console.log('产品数量:', products.data.length);

    // 测试价格列表
    const prices = await stripe.prices.list({ limit: 10 });
    console.log('✅ 价格列表获取成功');
    console.log('价格数量:', prices.data.length);

  } catch (error) {
    console.error('❌ Stripe 配置测试失败:', error.message);
  }
}

testStripeConfig();
EOF

# 运行测试
node scripts/test-stripe.js
```

## 🔐 安全配置

### 1. Webhook 安全验证

确保 Webhook 处理程序验证签名：

```typescript
// app/api/stripe/webhook/route.ts
import { headers } from 'next/headers'
import { stripe } from '@/lib/stripe'

export async function POST(req: Request) {
  const body = await req.text()
  const signature = headers().get('stripe-signature')!

  let event
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return new Response('Webhook signature verification failed', { status: 400 })
  }

  // 处理事件...
}
```

### 2. API 密钥安全

- 永远不要在客户端代码中暴露 Secret Key
- 使用环境变量存储敏感信息
- 定期轮换 API 密钥
- 为不同环境使用不同的密钥

### 3. 金额验证

在服务端验证支付金额：

```typescript
// 验证支付金额
const expectedAmount = calculateExpectedAmount(productId)
if (session.amount_total !== expectedAmount) {
  throw new Error('Payment amount mismatch')
}
```

## 📊 监控和分析

### 1. Stripe Dashboard 监控

在 Stripe Dashboard 中可以监控：
- 支付成功率
- 退款率
- 争议率
- 收入趋势
- 客户生命周期价值

### 2. 自定义分析

实现自定义分析追踪：

```typescript
// 支付成功后记录分析数据
await db.insert(analytics).values({
  event: 'payment_succeeded',
  userId: session.metadata.userId,
  amount: session.amount_total,
  currency: session.currency,
  productId: session.metadata.productId,
  timestamp: new Date()
})
```

## 🚨 常见问题

### 1. Webhook 接收失败
**问题**: Webhook 事件未被正确处理
**解决**: 
- 检查 Webhook URL 是否可访问
- 验证签名密钥是否正确
- 查看 Stripe Dashboard 中的 Webhook 日志

### 2. 支付失败
**问题**: 客户支付时遇到错误
**解决**:
- 检查产品和价格配置
- 验证 API 密钥权限
- 查看 Stripe 日志了解具体错误

### 3. 订阅状态同步问题
**问题**: 数据库中的订阅状态与 Stripe 不一致
**解决**:
- 确保 Webhook 正确处理所有订阅事件
- 实现定期同步机制
- 添加错误重试逻辑

## 🌍 国际化支付

### 支持的支付方式
- 信用卡/借记卡
- Apple Pay / Google Pay
- 银行转账（部分地区）
- 数字钱包（PayPal、Alipay 等）

### 多币种支持
```typescript
// 根据用户地区设置币种
const currency = getUserCurrency(userCountry)
const session = await stripe.checkout.sessions.create({
  // ...
  currency: currency, // 'usd', 'eur', 'cny' 等
})
```

### 税务配置
```typescript
// 配置税务计算
const session = await stripe.checkout.sessions.create({
  // ...
  automatic_tax: { enabled: true },
  tax_id_collection: { enabled: true }
})
```

---

📞 **需要帮助？**
如果在配置过程中遇到问题，请查看 [Stripe 官方文档](https://stripe.com/docs) 或联系技术支持。
