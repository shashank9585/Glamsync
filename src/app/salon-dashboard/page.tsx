"use client"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar, DollarSign, Users, TrendingUp, Plus, Settings } from "lucide-react"

// Mock data - in production, fetch from database based on salon owner's ID
const mockStats = {
  totalBookings: 142,
  activeStylists: 8,
  revenue: 124500,
  avgRating: 4.7
}

const mockBookings = [
  { id: "1", customer: "Priya Sharma", service: "Hair Color", date: "2026-06-28", time: "2:00 PM", status: "CONFIRMED" },
  { id: "2", customer: "Rahul Verma", service: "Haircut", date: "2026-06-28", time: "3:30 PM", status: "PENDING" },
  { id: "3", customer: "Ananya Patel", service: "Facial", date: "2026-06-29", time: "11:00 AM", status: "CONFIRMED" }
]

const mockServices = [
  { id: "s1", name: "Haircut & Styling", price: 500, duration: 45 },
  { id: "s2", name: "Hair Coloring", price: 1500, duration: 90 },
  { id: "s3", name: "Facial Treatment", price: 800, duration: 60 }
]

export default function SalonDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [bookings, setBookings] = useState(mockBookings)
  const [services, setServices] = useState(mockServices)
  const [newService, setNewService] = useState({ name: "", price: "", duration: "" })

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login")
  }, [status, router])

  const handleAddService = (e: React.FormEvent) => {
    e.preventDefault()
    if (newService.name && newService.price && newService.duration) {
      setServices([...services, {
        id: `s${services.length + 1}`,
        name: newService.name,
        price: parseInt(newService.price),
        duration: parseInt(newService.duration)
      }])
      setNewService({ name: "", price: "", duration: "" })
      alert("Service added successfully! (Mock)")
    }
  }

  const handleUpdateBookingStatus = (id: string, newStatus: string) => {
    setBookings(bookings.map(b => b.id === id ? { ...b, status: newStatus } : b))
    alert(`Booking ${newStatus.toLowerCase()}! (Mock)`)
  }

  if (status === "loading") return <div className="container mx-auto py-10 px-4 text-center">Loading...</div>
  if (!session) return null

  return (
    <div className="container mx-auto py-10 px-4 max-w-7xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-bold mb-2">Salon Dashboard</h1>
          <p className="text-muted-foreground">Manage your salon, bookings, and services</p>
        </div>
        <Link href="/dashboard/profile">
          <Button variant="outline">
            <Settings className="mr-2 h-4 w-4" /> Settings
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.totalBookings}</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Stylists</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.activeStylists}</div>
            <p className="text-xs text-muted-foreground">+2 new this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{mockStats.revenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+8% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Rating</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.avgRating} ★</div>
            <p className="text-xs text-muted-foreground">Based on 89 reviews</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="bookings" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:w-[600px]">
          <TabsTrigger value="bookings">Manage Bookings</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="stylists">My Stylists</TabsTrigger>
        </TabsList>

        <TabsContent value="bookings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {bookings.map((booking) => (
                  <div key={booking.id} className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 border rounded-lg gap-4">
                    <div className="space-y-1">
                      <h3 className="font-semibold">{booking.customer}</h3>
                      <p className="text-sm text-muted-foreground">{booking.service}</p>
                      <p className="text-sm text-muted-foreground">{booking.date} at {booking.time}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant={booking.status === "CONFIRMED" ? "default" : "secondary"}>
                        {booking.status}
                      </Badge>
                      {booking.status === "PENDING" && (
                        <Button size="sm" onClick={() => handleUpdateBookingStatus(booking.id, "CONFIRMED")}>
                          Confirm
                        </Button>
                      )}
                      {booking.status === "CONFIRMED" && (
                        <Button size="sm" variant="outline" onClick={() => handleUpdateBookingStatus(booking.id, "COMPLETED")}>
                          Complete
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="services" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Add New Service</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddService} className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Service Name</Label>
                  <Input 
                    value={newService.name} 
                    onChange={(e) => setNewService({...newService, name: e.target.value})} 
                    placeholder="e.g., Hair Spa"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Price (₹)</Label>
                  <Input 
                    type="number" 
                    value={newService.price} 
                    onChange={(e) => setNewService({...newService, price: e.target.value})} 
                    placeholder="e.g., 1200"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Duration (mins)</Label>
                  <Input 
                    type="number" 
                    value={newService.duration} 
                    onChange={(e) => setNewService({...newService, duration: e.target.value})} 
                    placeholder="e.g., 60"
                  />
                </div>
                <Button type="submit" className="md:col-span-3">
                  <Plus className="mr-2 h-4 w-4" /> Add Service
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Current Services</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {services.map((service) => (
                  <div key={service.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-semibold">{service.name}</h3>
                      <p className="text-sm text-muted-foreground">{service.duration} mins</p>
                    </div>
                    <Badge variant="secondary" className="text-lg">₹{service.price}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stylists" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>My Stylists</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Manage your salon's stylists here. (Coming soon)</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}