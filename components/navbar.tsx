"use client"

import { useState, useEffect } from "react"
import { useSession, signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { Menu, X, Globe, User, LogOut, Settings } from "lucide-react"
import { useRouter, usePathname } from "next/navigation"
import { useLocale, useTranslations } from "next-intl"
import Link from "next/link"
import Image from "next/image"
import { DemoBanner } from "@/components/demo-banner"

export function Navbar() {
  const { data: session, status } = useSession()
  const [mounted, setMounted] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()
  const locale = useLocale()
  const t = useTranslations("navbar")
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  

  const switchLocale = (newLocale: string) => {
    if (!pathname) return
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`)
    router.push(newPath)
  }

  const getLocalizedPath = (path: string) => {
    return `/${locale}${path}`
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    } else {
      const homePath = getLocalizedPath("/")
      router.push(`${homePath}#${sectionId}`)
    }
  }

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' })
  }

  return (
    <>
      <DemoBanner />
      
      <nav className="sticky top-0 z-50 w-full bg-gray-100/70 backdrop-blur supports-[backdrop-filter]:bg-gray-100/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <div className="relative w-8 h-8 sm:w-10 sm:h-10">
                <Image
                  src="/logo.png"
                  alt="AIArtPalette Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <span className="text-xl sm:text-2xl font-bold text-foreground">
                AIArtPalette
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("home")}
              className="text-muted-foreground hover:text-black transition-colors duration-300 font-medium hover:scale-105 transform"
            >
              {t("home")}
            </button>
            <Link
              href={getLocalizedPath("/features")}
              className="text-muted-foreground hover:text-black transition-colors duration-300 font-medium hover:scale-105 transform"
            >
              {t("features")}
            </Link>
            <button
              onClick={() => router.push(getLocalizedPath('/pricing'))}
              className="text-muted-foreground hover:text-black transition-colors duration-300 font-medium hover:scale-105 transform"
            >
              {t("pricing")}
            </button>
            
          </div>

          {/* Right side controls */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Switcher */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="transition-all duration-300">
                    <Globe className="h-5 w-5 mr-2 text-foreground" />
                    <span className="text-foreground">{locale === "zh" ? "中" : "EN"}</span>
                  </Button>
                </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => switchLocale("zh")} className="hover:bg-secondary hover:text-primary">中文</DropdownMenuItem>
                <DropdownMenuItem onClick={() => switchLocale("en")} className="hover:bg-secondary hover:text-primary">English</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            

            {/* Auth Section */}
            {status === "loading" ? (
              <div className="w-8 h-8 animate-pulse bg-secondary rounded-full" />
            ) : session ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex items-center space-x-2 transition-all duration-300">
                    <User className="h-5 w-5 text-foreground" />
                    <span className="hidden lg:inline font-medium text-foreground">{session.user?.name || session.user?.email}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild className="hover:bg-gray-100">
                    <Link href={getLocalizedPath("/profile")}>
                      <User className="mr-2 h-4 w-4" />
                      {t("profile")}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="hover:bg-gray-100">
                    <LogOut className="mr-2 h-4 w-4" />
                    {t("signOut")}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-3">
                <Button variant="outline" size="sm" asChild className="transition-all duration-300">
                  <Link href={getLocalizedPath("/auth/signin")} className="text-foreground">{t("signIn")}</Link>
                </Button>
                <Button className="transition-all duration-300" asChild>
                  <Link href={getLocalizedPath("/auth/signup")} className="text-primary-foreground">{t("signUp")}</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)} className="transition-all duration-300">
              {isMenuOpen ? <X className="h-6 w-6 text-foreground" /> : <Menu className="h-6 w-6 text-foreground" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-300/60">
              <button
                onClick={() => {
                  scrollToSection("home")
                  setIsMenuOpen(false)
                }}
                className="block px-3 py-2 text-base font-medium text-foreground hover:text-black hover:bg-gray-200/50 rounded-lg transition-all duration-300"
              >
                {t("home")}
              </button>
              <Link
                href={getLocalizedPath("/features")}
                onClick={() => setIsMenuOpen(false)}
                className="block px-3 py-2 text-base font-medium text-foreground hover:text-black hover:bg-gray-200/50 rounded-lg transition-all duration-300"
              >
                {t("features")}
              </Link>
              <button
                onClick={() => {
                  router.push(getLocalizedPath('/pricing'))
                  setIsMenuOpen(false)
                }}
                className="block px-3 py-2 text-base font-medium text-foreground hover:text-black hover:bg-gray-200/50 rounded-lg transition-all duration-300"
              >
                {t("pricing")}
              </button>
              

              <div className="border-t border-gray-300/60 pt-4 space-y-2">
                {/* Auth Section Mobile */}
                {session ? (
                  <div className="space-y-2">
                    <div className="px-3 py-2 text-sm text-muted-foreground">
                      {session.user?.name || session.user?.email}
                    </div>
                    <Button variant="ghost" size="sm" className="w-full justify-start" asChild>
                      <Link href={getLocalizedPath("/profile")}>
                        <User className="mr-2 h-4 w-4" />
                        {t("profile")}
                      </Link>
                    </Button>
                    <Button variant="ghost" size="sm" className="w-full justify-start" onClick={handleSignOut}>
                      <LogOut className="mr-2 h-4 w-4" />
                      {t("signOut")}
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full" asChild>
                      <Link href={getLocalizedPath("/auth/signin")} className="text-foreground">{t("signIn")}</Link>
                    </Button>
                    <Button className="w-full transition-all duration-300" asChild>
                      <Link href={getLocalizedPath("/auth/signup")} className="text-primary-foreground">{t("signUp")}</Link>
                    </Button>
                  </div>
                )}

                {/* Controls Mobile */}
                <div className="flex items-center space-x-2 px-3 py-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="transition-all duration-300">
                        <Globe className="h-4 w-4 mr-2 text-foreground" />
                        <span className="text-foreground">{locale === "zh" ? "中" : "EN"}</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-gray-100 border-gray-300/60">
                      <DropdownMenuItem onClick={() => switchLocale("zh")} className="text-foreground hover:bg-gray-200/50 hover:text-black">中文</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => switchLocale("en")} className="text-foreground hover:bg-gray-200/50 hover:text-black">English</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
    </>
  )
}
