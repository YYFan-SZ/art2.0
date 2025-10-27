import { Navbar } from '@/components/navbar'
import { Footer } from '@/components/footer'
import { BlogHeader } from '@/components/blog/blog-header'
import { ContactPost } from '@/components/blog/contact-post'
import { OtherPosts } from '@/components/blog/other-posts'

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <BlogHeader />
          <OtherPosts />
          <ContactPost />
        </div>
      </main>

      <Footer />
    </div>
  )
}