import { requireAdmin } from '@/lib/auth-utils'
import { NewsletterStats } from '@/components/newsletter/newsletter-stats'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { getTranslations } from 'next-intl/server'

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const t = await getTranslations({ locale: params.locale, namespace: 'admin.newsletter' })
  
  return {
    title: t('meta_title'),
    description: t('meta_description'),
  }
}

export default async function NewsletterAdminPage({ params }: { params: { locale: string } }) {
  // 验证管理员权限
  await requireAdmin()

  const t = await getTranslations({ locale: params.locale, namespace: 'admin.newsletter' })

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">{t('title')}</h1>
        <NewsletterStats />
      </div>
      <Footer />
    </div>
  )
} 