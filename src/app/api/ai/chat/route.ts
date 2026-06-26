import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { message } = await req.json()
    
    const response = await fetch(process.env.FREE_LLM_ENDPOINT!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.FREE_LLM_API_KEY}`
      },
      body: JSON.stringify({ 
        message: `You are a helpful, friendly beauty assistant for BeautyOS. Keep your answers short, helpful, and suggest booking a salon or stylist if relevant. User asks: ${message}` 
      })
    })
    
    const data = await response.json()
    return NextResponse.json({ response: data.response })
  } catch (error) {
    return NextResponse.json({ error: "Failed to chat" }, { status: 500 })
  }
}