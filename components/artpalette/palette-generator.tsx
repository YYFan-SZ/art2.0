"use client"

import { useEffect, useMemo, useState } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Copy, Check, Sparkles } from "lucide-react"
import { useSession } from "next-auth/react"

type PureColor = {
  hex: string
}

type Gradient = {
  from: string
  to: string
}

function clampText(input: string, max = 50) {
  if (input.length <= max) return { text: input, truncated: false }
  return { text: input.slice(0, max), truncated: true }
}

function hexToRgb(hex: string) {
  const s = hex.replace('#', '')
  const bigint = parseInt(s, 16)
  const r = (bigint >> 16) & 255
  const g = (bigint >> 8) & 255
  const b = bigint & 255
  return { r, g, b }
}

function luminance(hex: string) {
  const { r, g, b } = hexToRgb(hex)
  const [R, G, B] = [r, g, b].map(v => {
    const c = v / 255
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  })
  return 0.2126 * R + 0.7152 * G + 0.0722 * B
}

function contrastText(hex: string) {
  return luminance(hex) > 0.5 ? "#111111" : "#FFFFFF"
}

function hslToHex(h: number, s: number, l: number) {
  s /= 100
  l /= 100
  const k = (n: number) => (n + h / 30) % 12
  const a = s * Math.min(l, 1 - l)
  const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))
  const to255 = (x: number) => Math.round(255 * x)
  const r = to255(f(0))
  const g = to255(f(8))
  const b = to255(f(4))
  const hex = `#${[r, g, b]
    .map(v => v.toString(16).padStart(2, "0"))
    .join("")}`
  return hex.toUpperCase()
}

function hashSeed(str: string) {
  let h = 2166136261 >>> 0
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

function generateSeededPalette(keyword: string) {
  const seed = hashSeed(keyword)
  const baseHue = seed % 360
  const hues = [0, 18, -18, 40, -40].map(delta => (baseHue + delta + 360) % 360)
  const sats = [62, 48, 52, 40, 70]
  const lights = [58, 92, 30, 96, 44]
  const pure: PureColor[] = hues.map((h, i) => ({ hex: hslToHex(h, sats[i % sats.length], lights[i % lights.length]) }))
  const gradients: Gradient[] = [
    { from: hslToHex(hues[0], 60, 60), to: hslToHex(hues[1], 50, 50) },
    { from: hslToHex(hues[2], 55, 65), to: hslToHex(hues[3], 45, 45) },
    { from: hslToHex(hues[4], 70, 55), to: hslToHex(hues[0], 50, 40) },
  ]
  return { pure, gradients }
}

const presets: Record<string, { pure: PureColor[]; gradients: Gradient[] }> = {
  // 莫奈 - 睡莲系列，淡蓝、淡绿、淡粉紫
  "莫奈": {
    pure: ["#A8C0D6", "#BFD7C1", "#D3C2D6", "#E8F1F8", "#6C7FA3"].map(hex => ({ hex })),
    gradients: [
      { from: "#A8C0D6", to: "#D3C2D6" },
      { from: "#BFD7C1", to: "#E8F1F8" },
      { from: "#A8C0D6", to: "#BFD7C1" },
    ],
  },
  // 梵高星空 - 深蓝与金黄对比
  "梵高星空": {
    pure: ["#0F3A64", "#1F5DA0", "#2552A3", "#F2C744", "#F59E0B"].map(hex => ({ hex })),
    gradients: [
      { from: "#0F3A64", to: "#1F5DA0" },
      { from: "#2552A3", to: "#F2C744" },
      { from: "#1F5DA0", to: "#F59E0B" },
    ],
  },
  // 日式和风 - 柔和中性色
  "日式和风": {
    pure: ["#D9CFC1", "#BFAE9F", "#8C8579", "#5C5B57", "#F5EFE6"].map(hex => ({ hex })),
    gradients: [
      { from: "#D9CFC1", to: "#BFAE9F" },
      { from: "#8C8579", to: "#F5EFE6" },
      { from: "#5C5B57", to: "#D9CFC1" },
    ],
  },
  // 赛博朋克霓虹 - 高饱和蓝紫粉
  "赛博朋克": {
    pure: ["#00F0FF", "#7A5CF6", "#FF3EA5", "#0D0D0D", "#1A1A1A"].map(hex => ({ hex })),
    gradients: [
      { from: "#00F0FF", to: "#7A5CF6" },
      { from: "#FF3EA5", to: "#7A5CF6" },
      { from: "#00F0FF", to: "#FF3EA5" },
    ],
  },
  // 莫兰迪色系 - 低饱和复古
  "莫兰迪": {
    pure: ["#C0B2A0", "#B7C4B2", "#C2B7C9", "#D6CFC7", "#8E9CA7"].map(hex => ({ hex })),
    gradients: [
      { from: "#C0B2A0", to: "#B7C4B2" },
      { from: "#C2B7C9", to: "#D6CFC7" },
      { from: "#8E9CA7", to: "#C2B7C9" },
    ],
  },
  // 秋天枫叶 - 温暖橙红棕
  "秋天枫叶": {
    pure: ["#D4552D", "#E07A3F", "#F2B55E", "#7A4B32", "#F5E0C8"].map(hex => ({ hex })),
    gradients: [
      { from: "#D4552D", to: "#E07A3F" },
      { from: "#E07A3F", to: "#F2B55E" },
      { from: "#7A4B32", to: "#F5E0C8" },
    ],
  },
}

function getPalette(keyword: string) {
  const key = keyword.trim()
  const entry = Object.keys(presets).find(k => key.includes(k))
  if (entry) return presets[entry]
  return generateSeededPalette(keyword)
}

export function PaletteGenerator() {
  const params = useParams()
  const locale = (params?.locale as string) || "en"
  const { status } = useSession()

  const [input, setInput] = useState("")
  const [prompt, setPrompt] = useState("")
  const [copiedHex, setCopiedHex] = useState<string | null>(null)
  const [copiedGradient, setCopiedGradient] = useState<string | null>(null)
  const [ai, setAi] = useState<{
    title: string
    colors: { hex: string; name: string; description: string }[]
    gradients: { stops: string[]; name: string; description: string }[]
  } | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { text: displayPrompt, truncated } = useMemo(() => clampText(prompt), [prompt])

  const palette = useMemo(() => {
    const key = input.trim() || "莫奈"
    return getPalette(key)
  }, [input])

  useEffect(() => {
    const timer = setTimeout(() => {
      setCopiedHex(null)
      setCopiedGradient(null)
    }, 1200)
    return () => clearTimeout(timer)
  }, [copiedHex, copiedGradient])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (status !== "authenticated") {
      setError(locale === "zh" ? "请先登录后再生成" : "Please sign in before generating")
      return
    }
    const next = (prompt || "莫奈").trim()
    const { text } = clampText(next)
    setLoading(true)
    setError(null)
    try {
      const res = await fetch("/api/palette", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ keyword: text, locale }),
      })
      if (!res.ok) {
        throw new Error("api_error")
      }
      const data = await res.json()
      if (Array.isArray(data?.colors) && Array.isArray(data?.gradients)) {
        setAi({
          title: (data.title as string) || text,
          colors: (data.colors as { hex: string; name: string; description: string }[]).slice(0, 5),
          gradients: (data.gradients as { stops: string[]; name: string; description: string }[]).slice(0, 4),
        })
        setInput(text)
        const err = (data?.meta?.fallback && data?.meta?.error) ? String(data.meta.error) : null
        if (err) {
          const zh = {
            missing_api_key: "AI密钥缺失，请在.env配置 DEEPSEEK_API_KEY",
            request_failed: "AI请求失败，可能是网络或密钥无效",
            invalid_response: "AI返回内容非合法JSON",
          } as const
          const en = {
            missing_api_key: "API key missing. Set DEEPSEEK_API_KEY in .env",
            request_failed: "AI request failed. Check network or key validity",
            invalid_response: "AI returned invalid JSON",
          } as const
          const dict = locale === "zh" ? zh : en
          const detail = typeof data?.meta?.detail === "string" ? data.meta.detail : null
          const base = dict[err as keyof typeof zh] || (locale === "zh" ? "AI生成失败" : "AI generation failed")
          setError(detail ? `${base}：${detail}` : base)
        } else {
          setError(null)
        }
      } else {
        throw new Error("invalid_payload")
      }
    } catch (err) {
      setAi(null)
      setError(locale === "zh" ? "AI生成失败，已使用本地备选方案" : "AI generation failed, using local fallback")
    } finally {
      setLoading(false)
    }
  }

  const copyText = async (text: string, type: "hex" | "gradient") => {
    try {
      await navigator.clipboard.writeText(text)
      if (type === "hex") setCopiedHex(text)
      else setCopiedGradient(text)
    } catch {}
  }

  const title = locale === "zh" ? "艺术主题配色方案" : "Art Theme Palette"
  const placeholder = locale === "zh" ? "输入关键词，例如：莫奈、赛博朋克、秋天枫叶" : "Enter keywords e.g. Monet, Cyberpunk, Autumn Maple"
  const copiedLabel = locale === "zh" ? "已复制！" : "Copied!"
  const truncatedLabel = locale === "zh" ? "已截断至50字符" : "Truncated to 50 chars"

  const suggestions = locale === "zh" 
    ? ["莫奈睡莲", "赛博朋克霓虹", "韦斯·安德森粉彩", "秋日枫叶林", "极简包豪斯"]
    : ["Claude Monet Water Lilies", "Cyberpunk Neon City", "Wes Anderson Pastel", "Autumn Maple Forest", "Minimalist Bauhaus"]

  return (
    <section className="pt-24 pb-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* 顶部：搜索框 + 标题 */}
        <div className="max-w-4xl mx-auto mb-8">
          <form onSubmit={handleSubmit} className="flex gap-3">
            <input
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={placeholder}
              className="flex-1 px-4 py-3 rounded-lg border border-primary/30 bg-white text-foreground shadow-sm focus:outline-none focus:ring-0"
            />
            <Button type="submit" disabled={loading || status !== "authenticated"} className="px-8 font-semibold">
              {loading ? (locale === "zh" ? "生成中…" : "Generating…") : (locale === "zh" ? "生成" : "Generate")}
            </Button>
          </form>
          {truncated && (
            <div className="mt-2 text-xs text-muted-foreground">{truncatedLabel}</div>
          )}
          {status !== "authenticated" && (
            <div className="mt-2 text-sm text-muted-foreground">
              {locale === "zh" ? "请登录后使用功能" : "Please sign in to use this feature"}
            </div>
          )}
          {error && (
            <div className="mt-2 text-xs text-destructive">{error}</div>
          )}
          {loading && (
            <div className="mt-2 text-base font-semibold text-muted-foreground">{locale === "zh" ? "等待生成……" : "Waiting to generate…"}</div>
          )}

          {/* 搜索建议标签 */}
          <div className="mt-4 flex flex-wrap gap-2 justify-center">
            {suggestions.map((s) => (
              <Button
                key={s}
                type="button"
                size="sm"
                variant="outline"
                className="rounded-full px-3 py-1.5"
                onClick={() => setPrompt(s)}
              >
                {s}
              </Button>
            ))}
          </div>
        </div>

        {/* 标题卡片 */}
        <div className="max-w-4xl mx-auto mb-6">
          <div className="w-full rounded-xl bg-secondary/70 border border-primary/20 backdrop-blur-sm shadow-sm px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-primary" />
              <div className="text-lg font-semibold text-foreground">
                {locale === "zh"
                  ? `「${(ai?.title || input.trim() || "莫奈")}」${title}`
                  : `Palette for "${(ai?.title || input.trim() || "Monet")}"`}
              </div>
            </div>
          </div>
        </div>

        {/* 纯色区：上方色块 + 下方HEX/名称/简介 */}
        <div className="max-w-4xl mx-auto mb-10">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {(ai ? ai.colors : palette.pure.slice(0, 5).map((c, i) => ({
              hex: c.hex,
              name: (['主色','辅助','点缀','背景','文字'][i] || (locale==='zh'?'色块':'Swatch')) + ` ${i+1}`,
              description: locale === 'zh' ? `来自“${input || '莫奈'}”的主题色` : `Theme color from "${input || 'Monet'}"`,
            }))).map((item, idx) => {
              const id = `copy-hex-${idx}-${item.hex}`
              return (
                <div key={id} className="group flex flex-col">
                  <div 
                    className="w-full aspect-square rounded-xl shadow-sm hover:scale-[1.02] transition-transform mb-3" 
                    style={{ backgroundColor: item.hex }}
                  />
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-bold font-mono text-foreground">{item.hex}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7 rounded-md shrink-0"
                        onClick={() => copyText(item.hex, "hex")}
                        title={locale === "zh" ? "复制颜色" : "Copy color"}
                      >
                        {copiedHex === item.hex ? (
                          <Check className="w-3.5 h-3.5" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </Button>
                    </div>
                    <div className="text-sm font-semibold text-foreground">{item.name}</div>
                    <div className="text-xs text-muted-foreground leading-snug line-clamp-2">{item.description}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* 渐变区：上方渐变条 + 下方HEX序列/名称/简介 */}
        <div className="max-w-4xl mx-auto space-y-6">
          {(ai ? ai.gradients : palette.gradients.map((g, i) => ({
            stops: [g.from, g.to],
            name: (locale==='zh'?`渐变`:'Gradient') + ` ${i+1}`,
            description: locale==='zh'?`来自“${input || '莫奈'}”的渐变组`:`Gradient set from "${input || 'Monet'}"`,
          }))).map((g, idx) => {
            const gradId = `grad-${idx}-${g.stops.join("-")}`
            const label = g.stops.join(" → ")
            const gradientStyle = {
              background: `linear-gradient(to right, ${g.stops.join(", ")})`
            }
            return (
              <div key={gradId} className="flex flex-col">
                <div 
                  className="w-full h-[100px] rounded-xl shadow-sm hover:scale-[1.01] transition-transform mb-3" 
                  style={gradientStyle}
                />
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-bold font-mono text-foreground">{label}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-7 w-7 rounded-md shrink-0"
                      onClick={() => copyText(label, "gradient")}
                      title={locale === "zh" ? "复制渐变色" : "Copy gradient"}
                    >
                      {copiedGradient === label ? (
                        <Check className="w-3.5 h-3.5" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </Button>
                  </div>
                  <div className="text-sm font-semibold text-foreground">{g.name}</div>
                  <div className="text-xs text-muted-foreground leading-snug">{g.description}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
