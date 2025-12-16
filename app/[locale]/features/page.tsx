"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useParams } from "next/navigation"

export default function FeaturesPage() {
  const params = useParams()
  const locale = params.locale as string
  const isZh = locale === "zh"

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {isZh ? "功能特性" : "Features"}
            </h1>
            <p className="text-lg text-muted-foreground">
              {isZh
                ? "根据关键词快速生成艺术主题配色方案，支持纯色与渐变，一键复制HEX码"
                : "Generate artistic theme palettes from keywords, with solid colors and gradients, one-click HEX copy"}
            </p>
          </div>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 text-foreground">
              {isZh ? "输入与场景" : "Input & Scenarios"}
            </h2>
            <div className="space-y-3 text-muted-foreground">
              <p>
                {isZh
                  ? "单行文本输入，支持艺术家、画作、风格、场景、情绪等任意关键词，最长50字符"
                  : "Single-line text input for artist, artwork, style, scene, mood, max 50 characters"}
              </p>
              <p>
                {isZh
                  ? "示例：莫奈、梵高星空、赛博朋克霓虹、莫兰迪色系"
                  : "Examples: Monet, Van Gogh Starry Night, Cyberpunk Neon, Morandi palette"}
              </p>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 text-foreground">
              {isZh ? "功能介绍" : "User Guide"}
            </h2>
            <div className="space-y-4 text-muted-foreground">
              {isZh ? (
                <>
                  <p>AIArtPalette 是一个基于关键词的艺术主题配色生成工具。输入关键词即可得到可复制的纯色卡与渐变方案，适合灵感探索、品牌配色、界面设计等场景。</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>打开站点，选择 zh / en 语言。</li>
                    <li>在搜索框输入关键词（如：莫奈睡莲、赛博朋克霓虹）。</li>
                    <li>点击 生成，等待 AI 返回结果。</li>
                    <li>复制颜色：点击色卡右侧的按钮复制 HEX。</li>
                    <li>复制渐变：点击渐变条右侧的按钮复制 #XXXXXX → #YYYYYY。</li>
                  </ul>
                </>
              ) : (
                <>
                  <p>AIArtPalette generates art-themed color palettes from keywords. Get copy-ready solid swatches and gradient sets for inspiration, branding, and UI design.</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Open the site and choose zh / en.</li>
                    <li>Enter keywords in the search box (e.g., Monet Water Lilies, Cyberpunk Neon).</li>
                    <li>Click Generate and wait for AI results.</li>
                    <li>Copy colors: use the button beside swatches to copy HEX.</li>
                    <li>Copy gradients: use the button beside gradients to copy #XXXXXX → #YYYYYY.</li>
                  </ul>
                </>
              )}
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 text-foreground">
              {isZh ? "生成逻辑" : "Generation Logic"}
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>
                {isZh
                  ? "理解关键词对应的艺术风格与视觉意象，结合艺术史与现代设计趋势"
                  : "Interpret style and visual motifs; combine art history with modern design trends"}
              </li>
              <li>
                {isZh
                  ? "输出 5 个纯色（主色/辅助/点缀/背景/文字）"
                  : "Output 5 solid colors (primary/secondary/accent/background/text)"}
              </li>
              <li>
                {isZh
                  ? "输出 3–4 组线性渐变（适用于背景、按钮、卡片）"
                  : "Output 3–4 linear gradients (for backgrounds, buttons, cards)"}
              </li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 text-foreground">
              {isZh ? "输出与交互" : "Output & Interaction"}
            </h2>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>
                {isZh
                  ? "卡片式展示，纯色与渐变均显示完整 HEX 码，支持一键复制"
                  : "Card-based display; show full HEX for solids and gradients; one-click copy"}
              </li>
              <li>
                {isZh
                  ? "轻量动效与适配布局，桌面网格与移动纵向排版"
                  : "Lightweight animation and adaptive layouts: desktop grid, mobile vertical"}
              </li>
            </ul>
          </section>

          
        </div>
      </main>
      <Footer minimal />
    </div>
  )
}
