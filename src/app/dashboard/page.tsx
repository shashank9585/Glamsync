"use client"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Star, Sparkles, MapPin, Clock, Settings, XCircle } from "lucide-react"

// Mock data
const mockBookings = [
  { id: "1", salonName: "Luxe Hair Studio", serviceName: "Hair Color & Cut", date: "2026-07-15", time: "2:00 PM", status: "CONFIRMED" },
  { id: "2", salonName: "Glow Spa & Salon", serviceName: "Facial Treatment", date: "2026-07-20", time: "11:00 AM", status: "PENDING" }
]

const mockSavedSalons = [
  { id: "1", name: "Beauty Bliss", city: "Bangalore", rating: 4.9, image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400&q=80" },
  { id: "2", name: "Luxe Hair Studio", city: "Mumbai", rating: 4.8, image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&q=80" }
]

const mockAIPlans = [
  { id: "1", type: "BRIDAL", goal: "Wedding in 45 days", createdAt: "2026-06-20" },
  { id: "2", type: "BEAUTY", goal: "Summer glow transformation", createdAt: "2026-06-18" }
]

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [bookings, setBookings] = useState(mockBookings)

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login")
  }, [status, router])

  const handleCancelBooking = (id: string) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      setBookings(bookings.filter(b => b.id !== id))
      alert("Booking cancelled successfully. (Mock)")
    }
  }

  if (status === "loading") return <div className="container mx-auto py-10 px-4 text-center">Loading...</div>
  if (!session) return null

  return (
    <div className="container mx-auto py-10 px-4 max-w-5xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-bold mb-2">Welcome back, {session.user?.name}!</h1>
          <p className="text-muted-foreground">Manage your bookings, saved salons, and beauty plans</p>
        </div>
        <Link href="/dashboard/profile">
          <Button variant="outline">
            <Settings className="mr-2 h-4 w-4" /> Profile Settings
          </Button>
        </Link>
      </div>

      <Tabs defaultValue="bookings" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
          <TabsTrigger value="bookings">My Bookings</TabsTrigger>
          <TabsTrigger value="saved">Saved</TabsTrigger>
          <TabsTrigger value="plans">AI Plans</TabsTrigger>
        </TabsList>

        <TabsContent value="bookings" className="space-y-4">
          {bookings.length === 0 ? (
            <Card><CardContent className="p-6 text-center text-muted-foreground">No active bookings.</CardContent></Card>
          ) : (
            bookings.map((booking) => (
              <Card key={booking.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row items-start justify-between gap-4">
                    <div className="space-y-1">
                      <h3 className="font-bold text-lg">{booking.salonName}</h3>
                      <p className="text-muted-foreground">{booking.serviceName}</p>
                      <div className="flex items-center gap-4 mt-2 text-sm">
                        <div className="flex items-center gap-1"><Calendar className="h-4 w-4" /><span>{booking.date}</span></div>
                        <div className="flex items-center gap-1"><Clock className="h-4 w-4" /><span>{booking.time}</span></div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant={booking.status === "CONFIRMED" ? "default" : "secondary"}>{booking.status}</Badge>
                      {booking.status !== "CANCELLED" && (
                        <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700 hover:bg-red-50" onClick={() => handleCancelBooking(booking.id)}>
                          <XCircle className="mr-1 h-4 w-4" /> Cancel
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="saved" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {mockSavedSalons.map((salon) => (
              <Card key={salon.id} className="overflow-hidden hover:shadow-lg transition cursor-pointer">
                <div className="relative h-32 overflow-hidden"><img src={salon.image} alt={salon.name} className="w-full h-full object-cover" /></div>
                <CardContent className="p-4">
                  <h3 className="font-bold mb-1">{salon.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2"><MapPin className="h-3 w-3" /><span>{salon.city}</span></div>
                  <div className="flex items-center gap-1"><Star className="h-4 w-4 fill-yellow-400 text-yellow-400" /><span className="font-semibold text-sm">{salon.rating}</span></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="plans" className="space-y-4">
          <div className="grid gap-4">
            {mockAIPlans.map((plan) => (
              <Card key={plan.id} className="hover:shadow-lg transition cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center"><Sparkles className="h-6 w-6 text-primary" /></div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline">{plan.type}</Badge>
                        <span className="text-xs text-muted-foreground">Created {plan.createdAt}</span>
                      </div>
                      <h3 className="font-bold text-lg">{plan.goal}</h3>
                      <p className="text-sm text-muted-foreground mt-1">Click to view your personalized beauty roadmap</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}