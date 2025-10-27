import { PaymentSuccess } from '@/components/dashboard/payment-success'
import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { PageBackground } from '@/components/page-background'

export default function DashboardPage() {
  return (
    <PageBackground>
      <Navbar />
      <main className="relative z-10">
        <PaymentSuccess />
      </main>
      <Footer />
    </PageBackground>
  )
} 