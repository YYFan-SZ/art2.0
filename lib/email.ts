import { Resend } from 'resend'

if (!process.env.RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY is not set')
}

const resend = new Resend(process.env.RESEND_API_KEY)

// 产品配置
const PRODUCT_CONFIG = {
  name: 'Get SaaS',
  description: {
    zh: '专为出海设计的现代化SaaS模版',
    en: 'Modern SaaS Template Designed for Global Markets'
  },
  colors: {
    primary: '#00D4E7', // 亮色模式主色
    primaryDark: '#00F0FF', // 暗色模式主色
    background: '#FAFAFA', // 亮色背景
    backgroundDark: '#1A1A1A', // 暗色背景
    text: '#262626', // 亮色文字
    textDark: '#EAEAEA', // 暗色文字
    muted: '#64748B' // 中性文字
  }
}

// 邮件模板配置
const emailTemplates = {
  verification: {
    zh: {
      subject: `验证您的邮箱地址 - ${PRODUCT_CONFIG.name}`,
      title: '验证您的邮箱地址',
      subtitle: PRODUCT_CONFIG.description.zh,
      greeting: `感谢您注册${PRODUCT_CONFIG.name}！请点击下方按钮验证您的邮箱地址以完成注册。`,
      buttonText: '验证邮箱地址',
      linkText: '如果按钮无法点击，请复制以下链接到浏览器：',
      footer1: `此邮件由 ${PRODUCT_CONFIG.name} 自动发送，请勿回复。`,
      footer2: '如果您没有注册账户，请忽略此邮件。'
    },
    en: {
      subject: `Verify Your Email Address - ${PRODUCT_CONFIG.name}`,
      title: 'Verify Your Email Address',
      subtitle: PRODUCT_CONFIG.description.en,
      greeting: `Thank you for registering with ${PRODUCT_CONFIG.name}! Please click the button below to verify your email address and complete your registration.`,
      buttonText: 'Verify Email Address',
      linkText: 'If the button doesn\'t work, please copy the following link to your browser:',
      footer1: `This email was sent automatically by ${PRODUCT_CONFIG.name}, please do not reply.`,
      footer2: 'If you did not register an account, please ignore this email.'
    }
  },
  passwordReset: {
    zh: {
      subject: `重置您的密码 - ${PRODUCT_CONFIG.name}`,
      title: '重置您的密码',
      subtitle: PRODUCT_CONFIG.description.zh,
      greeting: `您请求重置${PRODUCT_CONFIG.name}账户的密码。请点击下方按钮设置新密码。`,
      buttonText: '重置密码',
      linkText: '如果按钮无法点击，请复制以下链接到浏览器：',
      footer1: `此邮件由 ${PRODUCT_CONFIG.name} 自动发送，请勿回复。`,
      footer2: '如果您没有请求重置密码，请忽略此邮件。'
    },
    en: {
      subject: `Reset Your Password - ${PRODUCT_CONFIG.name}`,
      title: 'Reset Your Password',
      subtitle: PRODUCT_CONFIG.description.en,
      greeting: `You have requested to reset your ${PRODUCT_CONFIG.name} account password. Please click the button below to set a new password.`,
      buttonText: 'Reset Password',
      linkText: 'If the button doesn\'t work, please copy the following link to your browser:',
      footer1: `This email was sent automatically by ${PRODUCT_CONFIG.name}, please do not reply.`,
      footer2: 'If you did not request a password reset, please ignore this email.'
    }
  }
}

// 生成邮件HTML模板
function generateEmailTemplate(
  url: string,
  template: typeof emailTemplates.verification.zh
): string {
  const colors = PRODUCT_CONFIG.colors
  
  return `
    <!DOCTYPE html>
    <html lang="zh-CN">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${template.subject}</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: ${colors.background}; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
      <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <!-- Header -->
        <div style="text-align: center; margin-bottom: 40px; padding: 20px 0;">
          <div style="display: inline-block; padding: 12px 24px; background: linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%); border-radius: 12px; margin-bottom: 16px;">
            <h1 style="color: white; margin: 0; font-size: 24px; font-weight: 700; letter-spacing: -0.5px;">${PRODUCT_CONFIG.name}</h1>
          </div>
          <p style="color: ${colors.muted}; font-size: 16px; margin: 0; font-weight: 500;">${template.subtitle}</p>
        </div>
        
        <!-- Main Content -->
        <div style="background: white; padding: 40px; border-radius: 16px; margin-bottom: 30px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08); border: 1px solid #f1f5f9;">
          <h2 style="color: ${colors.text}; margin: 0 0 24px 0; text-align: center; font-size: 28px; font-weight: 700;">${template.title}</h2>
          
          <p style="color: ${colors.text}; line-height: 1.7; margin-bottom: 32px; font-size: 16px; text-align: center;">
            ${template.greeting}
          </p>
          
          <!-- CTA Button -->
          <div style="text-align: center; margin: 40px 0;">
            <a href="${url}" 
               style="background: linear-gradient(135deg, ${colors.primary} 0%, ${colors.primaryDark} 100%); 
                      color: white; 
                      padding: 16px 32px; 
                      text-decoration: none; 
                      border-radius: 12px; 
                      font-weight: 600;
                      font-size: 16px;
                      display: inline-block;
                      box-shadow: 0 8px 24px rgba(0, 212, 231, 0.3);
                      transition: all 0.3s ease;
                      border: none;">
              ${template.buttonText}
            </a>
          </div>
          
          <!-- Fallback Link -->
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; border-left: 4px solid ${colors.primary};">
            <p style="color: ${colors.muted}; font-size: 14px; margin: 0 0 8px 0; font-weight: 500;">
              ${template.linkText}
            </p>
            <p style="color: ${colors.primary}; word-break: break-all; font-size: 14px; margin: 0; font-family: monospace;">
              ${url}
            </p>
          </div>
        </div>
        
        <!-- Footer -->
        <div style="text-align: center; color: ${colors.muted}; font-size: 13px; line-height: 1.6;">
          <p style="margin: 0 0 8px 0;">${template.footer1}</p>
          <p style="margin: 0;">${template.footer2}</p>
          
          <!-- Branding -->
          <div style="margin-top: 24px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="margin: 0; color: ${colors.muted}; font-size: 12px;">
              Powered by <strong style="color: ${colors.primary};">${PRODUCT_CONFIG.name}</strong>
            </p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `
}

export async function sendVerificationEmail(email: string, token: string, locale: 'zh' | 'en' = 'en') {
  const verificationUrl = `${process.env.NEXTAUTH_URL}/${locale}/auth/verify-email?token=${token}`
  const template = emailTemplates.verification[locale]
  
  try {
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || `${PRODUCT_CONFIG.name} <onboarding@resend.dev>`,
      to: [email],
      subject: template.subject,
      html: generateEmailTemplate(verificationUrl, template),
    })

    if (error) {
      console.error('发送验证邮件失败:', error)
      return { success: false, error: error.message }
    }

    console.log(`验证邮件发送成功: ${email}`)
    return { success: true, data }
  } catch (error) {
    console.error('发送验证邮件异常:', error)
    return { success: false, error: '发送邮件失败' }
  }
}

export async function sendPasswordResetEmail(email: string, token: string, locale: 'zh' | 'en' = 'en') {
  const resetUrl = `${process.env.NEXTAUTH_URL}/${locale}/auth/reset-password?token=${token}`
  const template = emailTemplates.passwordReset[locale]
  
  try {
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || `${PRODUCT_CONFIG.name} <onboarding@resend.dev>`,
      to: [email],
      subject: template.subject,
      html: generateEmailTemplate(resetUrl, template),
    })

    if (error) {
      console.error('发送密码重置邮件失败:', error)
      return { success: false, error: error.message }
    }

    console.log(`密码重置邮件发送成功: ${email}`)
    return { success: true, data }
  } catch (error) {
    console.error('发送密码重置邮件异常:', error)
    return { success: false, error: '发送邮件失败' }
  }
} 