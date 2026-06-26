import { NextResponse } from "next/server"
import { generateBeautyPlan } from "@/lib/ai"

export async function POST(req: Request) {
  try {
    const { prompt, type } = await req.json()
    
    const rawResponse = await generateBeautyPlan(prompt, type)
    
    // The AI might return markdown code blocks. Let's clean it up.
    let cleanJson = rawResponse
      .replace(/```json\n?/g, "")
      .replace(/```\n?/g, "")
      .trim()

    // Try to parse it to ensure it's valid JSON before sending to frontend
    const parsedPlan = JSON.parse(cleanJson)

    return NextResponse.json({ plan: parsedPlan })
  } catch (error) {
    console.error("Planner API Error:", error)
    return NextResponse.json({ error: "Failed to generate plan. AI response was invalid." }, { status: 500 })
  }
}