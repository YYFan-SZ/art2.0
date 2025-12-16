// 已移除 Stripe SDK 初始化，改为使用 Creem

// 获取价格ID的函数 - 在服务端使用环境变量，在客户端使用预设值
function getPriceId(envVar: string | undefined, fallback: string = ''): string {
  // 如果是服务端环境，直接返回环境变量
  if (typeof window === 'undefined') {
    return envVar || fallback
  }
  // 客户端返回空字符串，让服务端处理
  return fallback
}

// 订阅价格配置
export const SUBSCRIPTION_PRICE_IDS = {
  pro: getPriceId(process.env.CREEM_SUBSCRIPTION_MONTHLY_PRICE_ID, ''),
} as const

// 积分购买价格配置
export const POINTS_PRICE_IDS = {
  starter: getPriceId(process.env.STRIPE_POINTS_STARTER_PRICE_ID, ''),
  popular: getPriceId(process.env.STRIPE_POINTS_POPULAR_PRICE_ID, ''),
  premium: getPriceId(process.env.STRIPE_POINTS_PREMIUM_PRICE_ID, ''),
} as const

// 向后兼容的价格配置
export const PRICE_IDS = {
  pro: SUBSCRIPTION_PRICE_IDS.pro,
  ...POINTS_PRICE_IDS,
} as const

// 获取实际的价格ID（服务端使用）
export function getActualPriceIds() {
  return {
    pro: process.env.STRIPE_PRO_PRICE_ID || '',
    starter: process.env.STRIPE_POINTS_STARTER_PRICE_ID || '',
    popular: process.env.STRIPE_POINTS_POPULAR_PRICE_ID || '',
    premium: process.env.STRIPE_POINTS_PREMIUM_PRICE_ID || '',
  }
}

// 订阅产品配置
export const SUBSCRIPTION_PRODUCTS = {
  pro: {
    name: 'Monthly Plan',
    priceId: SUBSCRIPTION_PRICE_IDS.pro,
    price: 6.88,
    interval: 'month',
    giftedPoints: 300,
    features: [
      'Limited credits per period',
      '300 credits included',
      'Basic support',
    ],
  },
  pro_3m: {
    name: '3-Month Plan',
    priceId: process.env.CREEM_SUBSCRIPTION_3M_PRICE_ID || '',
    price: 15.88,
    interval: '3months',
    giftedPoints: 1000,
    features: [
      'Limited credits per period',
      '1,000 credits included',
      'Priority support',
    ],
  },
  pro_6m: {
    name: '6-Month Plan',
    priceId: process.env.CREEM_SUBSCRIPTION_6M_PRICE_ID || '',
    price: 29.88,
    interval: '6months',
    giftedPoints: 3000,
    features: [
      'Limited credits per period',
      '3,000 credits included',
      'Priority support',
    ],
  },
  enterprise: {
    name: 'Enterprise Plan',
    priceId: null,
    price: 'Contact Sales',
    interval: 'custom',
    giftedPoints: 0,
    features: [
      'Custom agent development',
      'Private deployment services',
      '24/7 technical support',
      'Enterprise-grade data security',
      'Unlimited credits',
    ],
  },
} as const

// 积分购买产品配置
export const POINTS_PRODUCTS = {
  small: {
    id: 'small',
    name: '积分套餐',
    points: 100,
    price: 3.88,
    priceId: process.env.CREEM_POINTS_100_PRICE_ID || '',
    description: '100 积分',
  },
  medium: {
    id: 'medium',
    name: '积分套餐',
    points: 350,
    price: 9.88,
    priceId: process.env.CREEM_POINTS_350_PRICE_ID || '',
    description: '350 积分',
    popular: true,
  },
} as const

// 向后兼容的产品配置
export const PRODUCTS = SUBSCRIPTION_PRODUCTS

export type SubscriptionPlanType = keyof typeof SUBSCRIPTION_PRODUCTS
export type PointsPackageType = keyof typeof POINTS_PRODUCTS
export type PlanType = SubscriptionPlanType // 向后兼容 
