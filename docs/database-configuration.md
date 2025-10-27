# 数据库配置文档 | Database Configuration

本文档详细介绍如何配置 Get SaaS 的 PostgreSQL 数据库，包括本地开发环境和生产环境的设置。

## 🗄️ 数据库概述

Get SaaS 使用以下技术栈：
- **PostgreSQL**: 主数据库
- **Drizzle ORM**: 数据库 ORM 和查询构建器
- **Drizzle Kit**: 数据库迁移工具

## 🏠 本地开发环境设置

### 1. 安装 PostgreSQL

#### macOS (使用 Homebrew)
```bash
# 安装 PostgreSQL
brew install postgresql@15

# 启动 PostgreSQL 服务
brew services start postgresql@15

# 创建数据库用户
createuser -s postgres
```

#### Ubuntu/Debian
```bash
# 更新包列表
sudo apt update

# 安装 PostgreSQL
sudo apt install postgresql postgresql-contrib

# 启动服务
sudo systemctl start postgresql
sudo systemctl enable postgresql

# 切换到 postgres 用户
sudo -u postgres psql
```

#### Windows
1. 下载 [PostgreSQL 安装程序](https://www.postgresql.org/download/windows/)
2. 运行安装程序并按照向导完成安装
3. 记住设置的超级用户密码

### 2. 创建开发数据库

```bash
# 连接到 PostgreSQL
psql -U postgres

# 创建数据库
CREATE DATABASE get_saas_pro_dev;

# 创建应用用户
CREATE USER saas_user WITH PASSWORD 'your_secure_password';

# 授予权限
GRANT ALL PRIVILEGES ON DATABASE get_saas_pro_dev TO saas_user;

# 退出
\q
```

### 3. 配置环境变量

在 `.env.local` 文件中添加：

```env
# 本地开发数据库
DATABASE_URL="postgresql://saas_user:your_secure_password@localhost:5432/get_saas_pro_dev"
```

## ☁️ 生产环境数据库选择

### 1. Neon (推荐)

[Neon](https://neon.tech) 是一个现代化的 PostgreSQL 云服务：

#### 优势
- 免费层包含 0.5GB 存储
- 自动备份和恢复
- 分支功能（类似 Git）
- 无服务器架构
- 优秀的开发者体验

#### 设置步骤
1. 访问 [Neon 官网](https://neon.tech) 并注册账户
2. 创建新项目：
   ```
   项目名称: get-saas-pro
   PostgreSQL 版本: 15
   区域: 选择离用户最近的区域
   ```
3. 获取连接字符串：
   ```
   postgresql://username:password@ep-xxx.region.aws.neon.tech/dbname?sslmode=require
   ```

### 2. Supabase

[Supabase](https://supabase.com) 提供 PostgreSQL 数据库和额外功能：

#### 设置步骤
1. 访问 [Supabase](https://supabase.com) 并创建账户
2. 创建新项目
3. 在 Settings > Database 中获取连接字符串

### 3. Railway

[Railway](https://railway.app) 简单易用的云平台：

#### 设置步骤
1. 访问 [Railway](https://railway.app) 并登录
2. 创建新项目并添加 PostgreSQL 服务
3. 在变量标签页中获取 DATABASE_URL

### 4. 其他选择

- **AWS RDS**: 企业级解决方案
- **Google Cloud SQL**: Google 云平台
- **Azure Database**: Microsoft 云平台
- **DigitalOcean Managed Databases**: 简单可靠

## 🔧 Drizzle ORM 配置

### 1. 数据库架构

查看 `lib/schema.ts` 了解完整的数据库架构：

```typescript
// 主要数据表
export const users = pgTable('users', {
  id: text('id').primaryKey(),
  name: text('name'),
  email: text('email').notNull().unique(),
  emailVerified: timestamp('emailVerified', { mode: 'date' }),
  // Stripe 相关字段
  stripeCustomerId: text('stripeCustomerId'),
  subscriptionId: text('subscriptionId'),
  subscriptionStatus: text('subscriptionStatus'),
  // 积分系统
  points: integer('points').default(0),
  purchasedPoints: integer('purchasedPoints').default(0),
  giftedPoints: integer('giftedPoints').default(0),
  // 时间戳
  createdAt: timestamp('createdAt', { mode: 'date' }).defaultNow(),
  updatedAt: timestamp('updatedAt', { mode: 'date' }).defaultNow(),
})
```

### 2. 数据库连接配置

查看 `lib/db.ts` 了解连接配置：

```typescript
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'

const connectionString = process.env.DATABASE_URL!

// 禁用预处理语句以兼容某些云服务
const client = postgres(connectionString, { prepare: false })

export const db = drizzle(client, { schema })
```

### 3. Drizzle 配置文件

查看 `drizzle.config.ts`：

```typescript
import type { Config } from 'drizzle-kit'

export default {
  schema: './lib/schema.ts',
  out: './drizzle',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!,
  },
} satisfies Config
```

## 🚀 数据库迁移

### 1. 初始化数据库

```bash
# 推送架构到数据库（开发环境）
npm run db:push

# 或者生成并运行迁移（生产环境推荐）
npm run db:generate
npm run db:migrate
```

### 2. 可用的数据库命令

```bash
# 推送架构变更到数据库
npm run db:push

# 生成迁移文件
npm run db:generate

# 运行迁移
npm run db:migrate

# 打开数据库管理界面
npm run db:studio
```

### 3. 迁移文件管理

迁移文件位于 `drizzle/` 目录：

```
drizzle/
├── 0000_fixed_spiral.sql          # 初始架构
├── 0001_newsletter_subscriptions.sql  # Newsletter 功能
├── 0002_add_user_role.sql         # 用户角色
├── 0003_add_user_points.sql       # 积分系统
├── 0004_add_points_history.sql    # 积分历史
└── meta/                          # 元数据文件
```

## 🔍 数据库管理

### 1. Drizzle Studio

Drizzle Studio 提供可视化数据库管理：

```bash
# 启动 Drizzle Studio
npm run db:studio

# 访问 https://local.drizzle.studio
```

### 2. 常用 SQL 查询

```sql
-- 查看用户统计
SELECT 
  COUNT(*) as total_users,
  COUNT(CASE WHEN "emailVerified" IS NOT NULL THEN 1 END) as verified_users,
  COUNT(CASE WHEN "subscriptionStatus" = 'active' THEN 1 END) as active_subscribers
FROM users;

-- 查看订阅统计
SELECT 
  "subscriptionPlan",
  COUNT(*) as count,
  SUM(points) as total_points
FROM users 
WHERE "subscriptionStatus" = 'active'
GROUP BY "subscriptionPlan";

-- 查看积分使用情况
SELECT 
  action,
  COUNT(*) as count,
  SUM(points) as total_points
FROM "pointsHistory"
GROUP BY action
ORDER BY total_points DESC;
```

### 3. 数据备份

#### 本地备份
```bash
# 创建备份
pg_dump -U saas_user -h localhost get_saas_pro_dev > backup.sql

# 恢复备份
psql -U saas_user -h localhost get_saas_pro_dev < backup.sql
```

#### 云服务备份
大多数云服务提供自动备份功能：
- **Neon**: 自动每日备份，保留 7 天
- **Supabase**: 自动备份，可手动创建快照
- **Railway**: 自动备份，可下载备份文件

## 🔐 数据库安全

### 1. 连接安全

```env
# 使用 SSL 连接（生产环境必须）
DATABASE_URL="postgresql://user:pass@host:5432/db?sslmode=require"

# 连接池配置
DATABASE_URL="postgresql://user:pass@host:5432/db?sslmode=require&connection_limit=20"
```

### 2. 访问控制

```sql
-- 创建只读用户（用于分析）
CREATE USER analytics_user WITH PASSWORD 'secure_password';
GRANT CONNECT ON DATABASE get_saas_pro TO analytics_user;
GRANT USAGE ON SCHEMA public TO analytics_user;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO analytics_user;

-- 创建备份用户
CREATE USER backup_user WITH PASSWORD 'secure_password';
GRANT CONNECT ON DATABASE get_saas_pro TO backup_user;
GRANT USAGE ON SCHEMA public TO backup_user;
GRANT SELECT ON ALL TABLES IN SCHEMA public TO backup_user;
```

### 3. 数据加密

- 使用强密码
- 启用 SSL/TLS 连接
- 定期轮换密码
- 限制网络访问

## 📊 性能优化

### 1. 索引优化

查看 `drizzle/add_performance_indexes.sql`：

```sql
-- 用户邮箱索引（已有唯一约束）
-- CREATE INDEX CONCURRENTLY idx_users_email ON users(email);

-- 用户订阅状态索引
CREATE INDEX CONCURRENTLY idx_users_subscription_status ON users(subscription_status) 
WHERE subscription_status IS NOT NULL;

-- 积分历史用户索引
CREATE INDEX CONCURRENTLY idx_points_history_user_id ON points_history(user_id);

-- 积分历史时间索引
CREATE INDEX CONCURRENTLY idx_points_history_created_at ON points_history(created_at);
```

### 2. 查询优化

```typescript
// 使用索引优化查询
const activeSubscribers = await db.query.users.findMany({
  where: eq(users.subscriptionStatus, 'active'),
  columns: {
    id: true,
    email: true,
    subscriptionPlan: true,
  }
})

// 分页查询
const paginatedUsers = await db.query.users.findMany({
  limit: 20,
  offset: page * 20,
  orderBy: desc(users.createdAt)
})
```

### 3. 连接池配置

```typescript
// 配置连接池
const client = postgres(connectionString, {
  prepare: false,
  max: 20,          // 最大连接数
  idle_timeout: 20, // 空闲超时（秒）
  connect_timeout: 10, // 连接超时（秒）
})
```

## 🧪 测试数据库配置

您可以创建测试脚本来验证数据库配置：

```bash
# 创建测试脚本（可选）
cat > scripts/test-database.js << 'EOF'
const { drizzle } = require('drizzle-orm/postgres-js');
const postgres = require('postgres');

async function testDatabase() {
  try {
    const client = postgres(process.env.DATABASE_URL, { prepare: false });
    const db = drizzle(client);
    
    // 测试连接
    const result = await client`SELECT version()`;
    console.log('✅ 数据库连接成功');
    console.log('PostgreSQL 版本:', result[0].version);
    
    // 测试表是否存在
    const tables = await client`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `;
    
    console.log('✅ 数据表检查:');
    tables.forEach(table => {
      console.log(`  - ${table.table_name}`);
    });
    
    await client.end();
    console.log('✅ 数据库测试完成');
    
  } catch (error) {
    console.error('❌ 数据库测试失败:', error.message);
  }
}

testDatabase();
EOF

# 运行测试
node scripts/test-database.js
```

## 🚨 常见问题

### 1. 连接失败
**问题**: `connection refused` 或 `timeout`
**解决**: 
- 检查数据库服务是否运行
- 验证连接字符串格式
- 检查防火墙设置

### 2. SSL 连接问题
**问题**: SSL 相关错误
**解决**:
```env
# 禁用 SSL（仅开发环境）
DATABASE_URL="postgresql://user:pass@localhost:5432/db?sslmode=disable"

# 强制 SSL（生产环境）
DATABASE_URL="postgresql://user:pass@host:5432/db?sslmode=require"
```

### 3. 迁移失败
**问题**: 迁移执行失败
**解决**:
- 检查数据库权限
- 验证架构文件语法
- 手动执行 SQL 语句

---

📞 **需要帮助？**
如果在数据库配置过程中遇到问题，请查看 [Drizzle 官方文档](https://orm.drizzle.team/) 或联系技术支持。
