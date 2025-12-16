"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Github, Twitter, Linkedin, Globe } from "lucide-react"
import { useRouter, usePathname } from "next/navigation"
import { useTranslations } from "next-intl"
import Link from 'next/link'
import { useLocale } from 'next-intl'
import Image from 'next/image'
import { SiGithub } from 'react-icons/si'

export function Footer({ minimal = false }: { minimal?: boolean }) {
  const locale = useLocale()
  const t = useTranslations("footer")
  const router = useRouter()
  const pathname = usePathname()

  // 获取当前年份
  const currentYear = new Date().getFullYear()

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
      // 如果当前页面没有该元素，跳转到首页
      const homePath = getLocalizedPath("/")
      router.push(`${homePath}#${sectionId}`)
    }
  }

  

  return (
    <footer className="relative bg-background border-t border-border">
      {/* 背景装饰 */}
      <div className="absolute inset-0 bg-background/50" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        {!minimal && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-8">
              <div className="space-y-4">
                <Link href={getLocalizedPath("/")} className="flex items-center space-x-3">
                  <div className="relative w-8 h-8">
                    <Image src="/logo.png" alt="AIArtPalette Logo" fill className="object-contain" />
                  </div>
                  <span className="text-xl font-bold text-primary">AIArtPalette</span>
                </Link>
                <p className="text-muted-foreground leading-relaxed max-w-sm">{t("description")}</p>
              </div>
            </div>

            <div className="space-y-8">
              <div className="space-y-4">
                <h4 className="font-semibold text-foreground text-lg">{t("services.title")}</h4>
                <ul className="space-y-3">
                  <li>
                    <Link href={getLocalizedPath("/features")} className="text-muted-foreground hover:text-primary transition-colors duration-300 flex items-center group">
                      <span className="w-1 h-1 bg-primary rounded-full mr-3 group-hover:w-2 transition-all duration-300" />
                      {t("services.features")}
                    </Link>
                  </li>
                <li>
                  <Link
                    href={getLocalizedPath("/pricing")}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 flex items-center group"
                  >
                    <span className="w-1 h-1 bg-primary rounded-full mr-3 group-hover:w-2 transition-all duration-300" />
                    {t("services.pricing")}
                  </Link>
                </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Bar */}
        <div className="border-t border-dark-600/50 mt-4 pt-4 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-4 mb-2 md:mb-0">
            <p className="text-muted-foreground text-sm">
              © {currentYear} {t("copyright")}
            </p>
          </div>

          {/* Social Links & Language Switcher */}
          <div className="flex items-center space-x-4">
            {/* Social Links */}
            <div className="flex space-x-3">
              <a
                href="https://x.com/zyailive"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-all duration-300 transform hover:scale-110"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://github.com/ItusiAI"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-all duration-300 transform hover:scale-110"
              >
                <SiGithub className="h-5 w-5" />
              </a>
            </div>

            {/* Language Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary hover:bg-secondary/50 transition-all duration-300">
                  <Globe className="h-4 w-4 mr-2" />
                  {locale === "zh" ? "中文" : "English"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-secondary border-border">
                <DropdownMenuItem
                  onClick={() => switchLocale("zh")}
                  className="text-foreground hover:text-primary hover:bg-secondary/50"
                >
                  中文
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => switchLocale("en")}
                  className="text-foreground hover:text-primary hover:bg-secondary/50"
                >
                  English
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </footer>
  )
}
