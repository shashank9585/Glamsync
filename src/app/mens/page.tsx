"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sparkles, Loader2, Briefcase, Scissors } from "lucide-react"

export default function MensPage() {
  const [occasion, setOccasion] = useState("")
  const [goal, setGoal] = useState("")
  const [loading, setLoading] = useState(false)
  const [plan, setPlan] = useState<any>(null)

  const generatePlan = async () => {
    if (!occasion || !goal) return
    
    setLoading(true)
    try {
      const prompt = `Occasion: ${occasion}, Goal: ${goal}`
      const res = await fetch("/api/ai/planner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, type: "MENS" })
      })
      
      const data = await res.json()
// API already returns parsed JSON, no need to clean/parse again
      setPlan(data.plan)
    } catch (e) {
      console.error(e)
      alert("Failed to generate grooming plan")
    }
    setLoading(false)
  }

  return (
    <div className="container mx-auto py-10 px-4 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
          <Scissors className="h-10 w-10 text-blue-600" />
          Men's Grooming Hub
        </h1>
        <p className="text-muted-foreground">
          Professional grooming plans tailored to your occasion and goals.
        </p>
      </div>

      <Card className="mb-8 border-blue-200 bg-gradient-to-br from-blue-50 to-white">
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label>What's the occasion?</Label>
            <Select value={occasion} onValueChange={setOccasion}>
              <SelectTrigger>
                <SelectValue placeholder="Select an occasion" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Job Interview">Job Interview</SelectItem>
                <SelectItem value="Wedding">Wedding (Groom)</SelectItem>
                <SelectItem value="Corporate Event">Corporate Event</SelectItem>
                <SelectItem value="Date Night">Date Night</SelectItem>
                <SelectItem value="Casual">Casual / Everyday</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label>Your Grooming Goal</Label>
            <Input
              placeholder="e.g., Clean professional look, modern beard styling, hair transformation..."
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
            />
          </div>
          
          <Button
            onClick={generatePlan}
            disabled={loading || !occasion || !goal}
            className="w-full"
            size="lg"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating your grooming plan...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate Grooming Plan
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {plan && (
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Briefcase className="h-6 w-6 text-blue-600" />
              {plan.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-muted-foreground mb-1">Estimated Budget</p>
              <p className="text-3xl font-bold text-blue-600">₹{plan.totalEstimatedBudget}</p>
            </div>

            <div>
              <h3 className="font-semibold mb-3 text-lg">Your Grooming Timeline</h3>
              <div className="space-y-3">
                {plan.timeline.map((step: any, i: number) => (
                  <div key={i} className="flex gap-4 p-4 bg-muted/30 rounded-lg border-l-4 border-blue-400">
                    <div className="h-6 w-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {i + 1}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-blue-700">{step.day}</p>
                      <p className="text-muted-foreground">{step.task}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3 text-lg">Recommended Services</h3>
              <div className="flex flex-wrap gap-2">
                {plan.recommendedServices.map((service: string, i: number) => (
                  <span key={i} className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
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