import type { Metadata } from 'next'
import { ThemeProvider } from "@/components/providers/theme-provider"
import { AuthSessionProvider } from "@/components/providers/session-provider"
import { Analytics } from "@/components/seo/analytics"
import './globals.css'

export const dynamic = 'force-dynamic'
export const runtime = 'edge'


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        <Analytics />
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <AuthSessionProvider>
            {children}
          </AuthSessionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
