"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Loader2, Sparkles, Tag } from "lucide-react"

export default function InspirationPage() {
  const [description, setDescription] = useState("")
  const [loading, setLoading] = useState(false)
  const [analysis, setAnalysis] = useState<any>(null)

  const analyze = async () => {
    if (!description.trim()) return
    
    setLoading(true)
    try {
      const res = await fetch("/api/ai/inspiration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description })
      })
      
      const data = await res.json()
// API already returns parsed JSON
      setAnalysis(data.analysis)
    } catch (e) {
      console.error(e)
      alert("Failed to analyze. Please try again.")
    }
    setLoading(false)
  }

  return (
    <div className="container mx-auto py-10 px-4 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Inspiration Studio</h1>
        <p className="text-muted-foreground">
          Describe a hairstyle or makeup look you love. Our AI will analyze it and suggest the perfect services for you.
        </p>
      </div>

      <Card className="mb-8">
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label>Describe your inspiration</Label>
            <Textarea
              placeholder="e.g., Soft beachy waves with subtle highlights, natural makeup with glowing skin, elegant updo for a wedding..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
            />
          </div>
          
          <Button 
            onClick={analyze} 
            disabled={loading || !description.trim()} 
            className="w-full"
            size="lg"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing your look...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Analyze Look
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {analysis && (
        <Card>
          <CardContent className="pt-6 space-y-6">
            <div>
              <h3 className="font-bold text-xl mb-2">Look Analysis</h3>
              <p className="text-muted-foreground leading-relaxed">
                {analysis.lookDescription}
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-3 flex items-center gap-2">
                <Tag className="h-5 w-5" />
                Style Tags
              </h4>
              <div className="flex flex-wrap gap-2">
                {analysis.styleTags.map((tag: string, i: number) => (
                  <span 
                    key={i} 
                    className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Suggested Services</h4>
              <ul className="space-y-2">
                {analysis.suggestedServices.map((service: string, i: number) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span className="text-muted-foreground">{service}</span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}