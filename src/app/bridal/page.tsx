"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sparkles, Loader2, Heart, Calendar, CheckCircle } from "lucide-react"

export default function BridalPage() {
  const [weddingDate, setWeddingDate] = useState("")
  const [budget, setBudget] = useState("")
  const [loading, setLoading] = useState(false)
  const [plan, setPlan] = useState<any>(null)

  const generatePlan = async () => {
    if (!weddingDate || !budget) return
    setLoading(true)
    try {
      const prompt = `Wedding date: ${weddingDate}, Budget: ₹${budget}`
      const res = await fetch("/api/ai/planner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, type: "BRIDAL" })
      })
      const data = await res.json()
      // API already returns parsed JSON, no need to clean/parse again
      setPlan(data.plan)
    } catch (e) {
      console.error(e)
      alert("Failed to generate bridal plan")
    }
    setLoading(false)
  }

  return (
    <div className="container mx-auto py-10 px-4 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
          <Heart className="h-10 w-10 text-amber-500" />
          Bridal Hub
        </h1>
        <p className="text-muted-foreground">Your complete wedding beauty planning companion.</p>
      </div>

      <Card className="mb-8 border-amber-200 bg-gradient-to-br from-amber-50 to-white dark:from-amber-950/20 dark:to-background">
        <CardContent className="pt-6 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Wedding Date</Label>
              <Input type="date" value={weddingDate} onChange={(e) => setWeddingDate(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Total Beauty Budget (₹)</Label>
              <Input type="number" placeholder="e.g., 50000" value={budget} onChange={(e) => setBudget(e.target.value)} />
            </div>
          </div>
          <Button
            onClick={generatePlan}
            disabled={loading || !weddingDate || !budget}
            className="w-full bg-amber-600 hover:bg-amber-700 text-white dark:bg-amber-500 dark:hover:bg-amber-600"
            size="lg"
          >
            {loading ? (<><Loader2 className="mr-2 h-4 w-4 animate-spin" />Creating your bridal roadmap...</>) : (<><Sparkles className="mr-2 h-4 w-4" />Generate Bridal Plan</>)}
          </Button>
        </CardContent>
      </Card>

      {plan && (
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Calendar className="h-6 w-6 text-amber-500" />
              {plan.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-4 bg-amber-50 rounded-lg border border-amber-200 dark:bg-amber-950/20 dark:border-amber-800">
              <p className="text-sm text-muted-foreground mb-1">Estimated Budget</p>
              <p className="text-3xl font-bold text-amber-600 dark:text-amber-400">₹{plan.totalEstimatedBudget}</p>
            </div>

            <div>
              <h3 className="font-semibold mb-3 text-lg">Your Bridal Timeline</h3>
              <div className="space-y-3">
                {plan.timeline.map((step: any, i: number) => (
                  <div key={i} className="flex gap-4 p-4 bg-muted/30 rounded-lg border-l-4 border-amber-400">
                    <CheckCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-medium text-amber-700 dark:text-amber-400">{step.day}</p>
                      <p className="text-muted-foreground mt-1">{step.task}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3 text-lg">Recommended Services & Experts</h3>
              <div className="flex flex-wrap gap-2">
                {plan.recommendedServices.map((service: string, i: number) => (
                  <span key={i} className="px-4 py-2 bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 rounded-full text-sm font-medium">
                    {service}
                  </span>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}