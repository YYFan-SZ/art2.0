import { NextResponse } from "next/server"
import { aiClient } from "@/lib/ai"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export const runtime = "nodejs"

function hslToHex(h: number, s: number, l: number) {
  s /= 100
  l /= 100
  const k = (n: number) => (n + h / 30) % 12
  const a = s * Math.min(l, 1 - l)
  const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))
  const toHex = (x: number) => Math.round(255 * x).toString(16).padStart(2, "0")
  return (`#${toHex(f(0))}${toHex(f(8))}${toHex(f(4))}`).toUpperCase()
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
  const hues = [0, 18, -18, 40, -40].map((d) => (baseHue + d + 360) % 360)
  const sats = [62, 48, 52, 40, 70]
  const lights = [58, 92, 30, 96, 44]
  const pure = hues.map((h, i) => hslToHex(h, sats[i % sats.length], lights[i % lights.length]))
  const gradients = [
    [hslToHex(hues[0], 60, 60), hslToHex(hues[1], 50, 50)],
    [hslToHex(hues[2], 55, 65), hslToHex(hues[3], 45, 45)],
    [hslToHex(hues[4], 70, 55), hslToHex(hues[0], 50, 40)],
  ]
  return { pure, gradients }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: "未登录" }, { status: 401 })
    }
    const body = await req.json()
    const keyword: string = (body?.keyword || "莫奈").toString().slice(0, 50)
    const locale: string = (body?.locale || "zh").toString()

    const systemPrompt = locale === "zh"
      ? "你是艺术配色专家。根据输入关键词，仅返回JSON（不要包含说明文字）。JSON结构为：{\"title\": string, \"colors\": [{\"hex\": string, \"name\": string, \"description\": string}...5项], \"gradients\": [{\"stops\": [string,string,(string)], \"name\": string, \"description\": string}...3-4项]}。要求：\n1) 纯色5项分别对应主色/辅助/点缀/背景/文字；\n2) 渐变为2-3色线性渐变，方向左上到右下，现代UI审美；\n3) 所有颜色均为HEX大写；\n4) 名称与简介贴合关键词的艺术语境；\n5) 严格输出合法JSON。"
      : "You are a color expert. Return ONLY JSON (no prose): {\"title\": string, \"colors\": [{\"hex\": string, \"name\": string, \"description\": string}...5], \"gradients\": [{\"stops\": [string,string,(string)], \"name\": string, \"description\": string}...3-4]}. Requirements: 5 solid colors (primary/secondary/accent/background/text), 2-3 stop linear gradients (top-left to bottom-right) with modern UI aesthetics, HEX uppercase, names and descriptions contextual to the keyword, valid JSON only."

    const userPrompt = locale === "zh"
      ? `关键词：${keyword}。请生成高辨识度方案，兼顾艺术史与现代设计。`
      : `Keyword: ${keyword}. Generate a high-recognition palette blending art history and modern design.`

    let errorDetail: string | null = null
    let completion
    let model = process.env.AI_MODEL || "deepseek-chat"
    try {
      completion = await aiClient.chat.completions.create({
        model: model,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.7,
      })
    } catch (err: any) {
      errorDetail = String(err?.message || err)
      if (/model/i.test(errorDetail) || /not\s*found/i.test(errorDetail)) {
        try {
          model = model === "deepseek-chat" ? "deepseek/deepseek-chat" : "deepseek-chat"
          completion = await aiClient.chat.completions.create({
            model: model,
            messages: [
              { role: "system", content: systemPrompt },
              { role: "user", content: userPrompt },
            ],
            temperature: 0.7,
          })
        } catch (e2: any) {
          errorDetail = String(e2?.message || e2)
          completion = { choices: [{ message: { content: "{}" } }] } as any
        }
      } else {
        completion = { choices: [{ message: { content: "{}" } }] } as any
      }
    }

    const content = completion.choices?.[0]?.message?.content || "{}"
    let data: any = {}
    let parsed = false
    const m = content.match(/\{[\s\S]*\}/)
    if (m) {
      try {
        data = JSON.parse(m[0])
        parsed = true
      } catch {}
    }

    if (!parsed) {
      try {
        const resp: any = await aiClient.responses.create({
          model,
          input: `${systemPrompt}\n\n${userPrompt}`,
        })
        const text = (resp as any).output_text || (resp?.choices?.[0]?.message?.content ?? "")
        const m2 = String(text).match(/\{[\s\S]*\}/)
        if (m2) {
          data = JSON.parse(m2[0])
        }
      } catch (err) {
        if (!errorDetail) errorDetail = String((err as any)?.message || err)
      }
    }

    if (!Array.isArray(data?.colors) || !Array.isArray(data?.gradients)) {
      const fb = generateSeededPalette(keyword)
      const colors = fb.pure.slice(0, 5).map((hex, i) => ({
        hex,
        name: (locale === "zh" ? "色块" : "Swatch") + ` ${i + 1}`,
        description: locale === "zh" ? `来自“${keyword}”的配色` : `Palette from "${keyword}"`,
      }))
      const gradients = fb.gradients.slice(0, 4).map((stops, i) => ({
        stops,
        name: (locale === "zh" ? "渐变" : "Gradient") + ` ${i + 1}`,
        description: locale === "zh" ? `来自“${keyword}”的渐变组` : `Gradient set from "${keyword}"`,
      }))
      return NextResponse.json({ title: keyword, colors, gradients, meta: { fallback: true, source: "fallback", error: "invalid_response", detail: errorDetail, baseURL: process.env.AI_BASE_URL || "https://api.deepseek.com", model } })
    }

    const isCn = (text: string) => /[\u4e00-\u9fa5]/.test(text)
    const colors = (data.colors as any[])
      .slice(0, 5)
      .map((c, i) => {
        const hex = String(c.hex || "#000000").toUpperCase()
        let name = String(c.name || (locale === "zh" ? "色块" : "Swatch"))
        let description = String(c.description || (locale === "zh" ? `来自“${keyword}”的配色` : `Palette from "${keyword}"`))
        if (locale === "en" && (isCn(name) || isCn(description))) {
          name = `Swatch ${i + 1}`
          description = `Palette from "${keyword}"`
        }
        return { hex, name, description }
      })

    const gradients = (data.gradients as any[])
      .slice(0, 4)
      .map((g, i) => {
        const stops = Array.isArray(g.stops) ? g.stops.map((s: any) => String(s).toUpperCase()) : []
        let name = String(g.name || (locale === "zh" ? "渐变" : "Gradient"))
        let description = String(g.description || (locale === "zh" ? `来自“${keyword}”的渐变组` : `Gradient set from "${keyword}"`))
        if (locale === "en" && (isCn(name) || isCn(description))) {
          name = `Gradient ${i + 1}`
          description = `Gradient set from "${keyword}"`
        }
        return { stops, name, description }
      })

    return NextResponse.json({ title: data.title || keyword, colors, gradients, meta: { fallback: false, source: "ai", baseURL: process.env.AI_BASE_URL || "https://api.deepseek.com", model } })
  } catch (e: any) {
    const fb = generateSeededPalette("")
    const colors = fb.pure.slice(0, 5).map((hex, i) => ({ hex, name: `Swatch ${i + 1}`, description: "" }))
    const gradients = fb.gradients.slice(0, 4).map((stops, i) => ({ stops, name: `Gradient ${i + 1}`, description: "" }))
    const hasKey = !!(process.env.DEEPSEEK_API_KEY || process.env.DEEPSEEK_A || process.env.OPENROUTER_API_KEY)
    const reason = hasKey ? "request_failed" : "missing_api_key"
    return NextResponse.json({ title: "Palette", colors, gradients, meta: { fallback: true, source: "fallback", error: reason, detail: String(e?.message || e), baseURL: process.env.AI_BASE_URL || "https://api.deepseek.com", model: process.env.AI_MODEL || "deepseek-chat" } })
  }
}
