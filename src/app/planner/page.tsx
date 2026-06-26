"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sparkles, Loader2, Calendar, DollarSign } from "lucide-react"

export default function PlannerPage() {
  const [goal, setGoal] = useState("")
  const [type, setType] = useState("BEAUTY")
  const [loading, setLoading] = useState(false)
  const [plan, setPlan] = useState<any>(null)

  const generatePlan = async () => {
    if (!goal.trim()) return
    
    setLoading(true)
    try {
      const res = await fetch("/api/ai/planner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: goal, type })
      })
      const data = await res.json()
// API already returns parsed JSON, no need to clean/parse again
      setPlan(data.plan)
    } catch (e) {
      console.error(e)
      alert("Failed to generate plan. Please try again.")
    }
    setLoading(false)
  }

  return (
    <div className="container mx-auto py-10 px-4 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">AI Beauty Planner</h1>
        <p className="text-muted-foreground">
          Tell us your goal, and we'll create a personalized beauty roadmap with timeline and budget.
        </p>
      </div>

      <Card className="mb-8">
        <CardContent className="pt-6 space-y-4">
          <div>
            <Label>Plan Type</Label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="BEAUTY">General Beauty</SelectItem>
                <SelectItem value="BRIDAL">Bridal Journey</SelectItem>
                <SelectItem value="MENS">Men's Grooming</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label>Your Goal / Event</Label>
            <Input 
              placeholder="e.g., Wedding in 45 days, budget 20k" 
              value={goal} 
              onChange={(e) => setGoal(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && generatePlan()}
            />
          </div>
          
          <Button 
            onClick={generatePlan} 
            disabled={loading || !goal.trim()} 
            className="w-full"
            size="lg"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating your roadmap...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate Beauty Roadmap
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {plan && (
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">{plan.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-4 p-4 bg-primary/5 rounded-lg">
              <DollarSign className="h-6 w-6 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Estimated Budget</p>
                <p className="text-2xl font-bold">{String(plan.totalEstimatedBudget).replace('$', '').trim()}</p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Timeline
              </h3>
              <div className="space-y-2">
                {plan.timeline.map((step: any, i: number) => (
                  <div key={i} className="flex justify-between items-center p-4 bg-muted/50 rounded-lg">
                    <span className="font-medium text-primary">{step.day}</span>
                    <span className="text-muted-foreground text-right">{step.task}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Recommended Services</h3>
              <div className="flex flex-wrap gap-2">
                {plan.recommendedServices.map((service: string, i: number) => (
                  <span key={i} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
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