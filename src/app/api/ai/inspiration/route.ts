import { NextResponse } from "next/server"
import { analyzeInspiration } from "@/lib/ai"

export async function POST(req: Request) {
  try {
    const { description } = await req.json()
    
    const rawResponse = await analyzeInspiration(description)
    
    let cleanJson = rawResponse
      .replace(/```json\n?/g, "")
      .replace(/```\n?/g, "")
      .trim()

    const parsedAnalysis = JSON.parse(cleanJson)

    return NextResponse.json({ analysis: parsedAnalysis })
  } catch (error) {
    console.error("Inspiration API Error:", error)
    return NextResponse.json({ error: "Failed to analyze inspiration. AI response was invalid." }, { status: 500 })
  }
}