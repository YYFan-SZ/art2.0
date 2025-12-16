export const runtime = 'edge';
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
      return NextResponse.json({ error: "鏈櫥褰? }, { status: 401 })
    }
    const body = await req.json()
    const keyword: string = (body?.keyword || "鑾").toString().slice(0, 50)
    const locale: string = (body?.locale || "zh").toString()

    const systemPrompt = locale === "zh"
      ? "浣犳槸鑹烘湳閰嶈壊涓撳銆傛牴鎹緭鍏ュ叧閿瘝锛屼粎杩斿洖JSON锛堜笉瑕佸寘鍚鏄庢枃瀛楋級銆侸SON缁撴瀯涓猴細{\"title\": string, \"colors\": [{\"hex\": string, \"name\": string, \"description\": string}...5椤筣, \"gradients\": [{\"stops\": [string,string,(string)], \"name\": string, \"description\": string}...3-4椤筣}銆傝姹傦細\n1) 绾壊5椤瑰垎鍒搴斾富鑹?杈呭姪/鐐圭紑/鑳屾櫙/鏂囧瓧锛沑n2) 娓愬彉涓?-3鑹茬嚎鎬ф笎鍙橈紝鏂瑰悜宸︿笂鍒板彸涓嬶紝鐜颁唬UI瀹＄編锛沑n3) 鎵€鏈夐鑹插潎涓篐EX澶у啓锛沑n4) 鍚嶇О涓庣畝浠嬭创鍚堝叧閿瘝鐨勮壓鏈澧冿紱\n5) 涓ユ牸杈撳嚭鍚堟硶JSON銆?
      : "You are a color expert. Return ONLY JSON (no prose): {\"title\": string, \"colors\": [{\"hex\": string, \"name\": string, \"description\": string}...5], \"gradients\": [{\"stops\": [string,string,(string)], \"name\": string, \"description\": string}...3-4]}. Requirements: 5 solid colors (primary/secondary/accent/background/text), 2-3 stop linear gradients (top-left to bottom-right) with modern UI aesthetics, HEX uppercase, names and descriptions contextual to the keyword, valid JSON only."

    const userPrompt = locale === "zh"
      ? `鍏抽敭璇嶏細${keyword}銆傝鐢熸垚楂樿鲸璇嗗害鏂规锛屽吋椤捐壓鏈彶涓庣幇浠ｈ璁°€俙
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
        name: (locale === "zh" ? "鑹插潡" : "Swatch") + ` ${i + 1}`,
        description: locale === "zh" ? `鏉ヨ嚜鈥?{keyword}鈥濈殑閰嶈壊` : `Palette from "${keyword}"`,
      }))
      const gradients = fb.gradients.slice(0, 4).map((stops, i) => ({
        stops,
        name: (locale === "zh" ? "娓愬彉" : "Gradient") + ` ${i + 1}`,
        description: locale === "zh" ? `鏉ヨ嚜鈥?{keyword}鈥濈殑娓愬彉缁刞 : `Gradient set from "${keyword}"`,
      }))
      return NextResponse.json({ title: keyword, colors, gradients, meta: { fallback: true, source: "fallback", error: "invalid_response", detail: errorDetail, baseURL: process.env.AI_BASE_URL || "https://api.deepseek.com", model } })
    }

    const isCn = (text: string) => /[\u4e00-\u9fa5]/.test(text)
    const colors = (data.colors as any[])
      .slice(0, 5)
      .map((c, i) => {
        const hex = String(c.hex || "#000000").toUpperCase()
        let name = String(c.name || (locale === "zh" ? "鑹插潡" : "Swatch"))
        let description = String(c.description || (locale === "zh" ? `鏉ヨ嚜鈥?{keyword}鈥濈殑閰嶈壊` : `Palette from "${keyword}"`))
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
        let name = String(g.name || (locale === "zh" ? "娓愬彉" : "Gradient"))
        let description = String(g.description || (locale === "zh" ? `鏉ヨ嚜鈥?{keyword}鈥濈殑娓愬彉缁刞 : `Gradient set from "${keyword}"`))
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

