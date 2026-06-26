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
import { Calendar, DollarSign, Star, TrendingUp, X, Settings, Upload, Image as ImageIcon } from "lucide-react"

// Mock data - in production, fetch from database based on stylist's user ID
const mockStats = {
  totalBookings: 87,
  rating: 4.9,
  earnings: 68500,
  experience: 8
}

const mockBookings = [
  { id: "1", customer: "Priya Sharma", service: "Hair Color", date: "2026-06-28", time: "2:00 PM", status: "CONFIRMED" },
  { id: "2", customer: "Rahul Verma", service: "Haircut", date: "2026-06-28", time: "4:00 PM", status: "PENDING" },
  { id: "3", customer: "Ananya Patel", service: "Bridal Makeup Trial", date: "2026-06-29", time: "10:00 AM", status: "CONFIRMED" }
]

const mockPortfolio = [
  { id: "p1", imageUrl: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400&q=80" },
  { id: "p2", imageUrl: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&q=80" },
  { id: "p3", imageUrl: "https://images.unsplash.com/photo-1595476108010-b4d1f10d64b1?w=400&q=80" }
]

const mockReviews = [
  { id: "r1", customer: "Priya Sharma", rating: 5, comment: "Amazing work! Exactly what I wanted.", date: "2026-06-20" },
  { id: "r2", customer: "Rahul Verma", rating: 5, comment: "Best haircut I've ever had. Very professional.", date: "2026-06-18" },
  { id: "r3", customer: "Ananya Patel", rating: 4, comment: "Great service, would recommend!", date: "2026-06-15" }
]

export default function StylistDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [bookings, setBookings] = useState(mockBookings)
  const [portfolio, setPortfolio] = useState(mockPortfolio)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string>("")

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login")
  }, [status, router])

  // Handle File Selection and Base64 Conversion
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string) // This is the Base64 string!
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAddPortfolioImage = (e: React.FormEvent) => {
    e.preventDefault()
    if (previewUrl) {
      setPortfolio([...portfolio, {
        id: `p${portfolio.length + 1}`,
        imageUrl: previewUrl // In production, this Base64 string is saved directly to SQLite
      }])
      setSelectedFile(null)
      setPreviewUrl("")
      alert("Image converted to Base64 and added to portfolio! (Mock DB Save)")
    }
  }

  const handleRemovePortfolioImage = (id: string) => {
    if (window.confirm("Remove this image from your portfolio?")) {
      setPortfolio(portfolio.filter(p => p.id !== id))
      alert("Image removed! (Mock)")
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
          <h1 className="text-4xl font-bold mb-2">Stylist Dashboard</h1>
          <p className="text-muted-foreground">Manage your bookings, portfolio, and reviews</p>
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
            <p className="text-xs text-muted-foreground">+8% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.rating} ★</div>
            <p className="text-xs text-muted-foreground">Based on 45 reviews</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Earnings</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹{mockStats.earnings.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Experience</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockStats.experience} years</div>
            <p className="text-xs text-muted-foreground">Professional stylist</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="bookings" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:w-[600px]">
          <TabsTrigger value="bookings">My Bookings</TabsTrigger>
          <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>

        <TabsContent value="bookings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Appointments</CardTitle>
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
                          Accept
                        </Button>
                      )}
                      {booking.status === "CONFIRMED" && (
                        <Button size="sm" variant="outline" onClick={() => handleUpdateBookingStatus(booking.id, "COMPLETED")}>
                          Mark Complete
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="portfolio" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Add to Portfolio (Base64 Upload)</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddPortfolioImage} className="space-y-4 max-w-md">
                <div className="space-y-2">
                  <Label>Upload Image</Label>
                  <div className="flex items-center gap-4">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="flex-1"
                    />
                  </div>
                </div>
                
                {previewUrl && (
                  <div className="relative w-full h-48 rounded-lg overflow-hidden border">
                    <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}

                <Button type="submit" disabled={!previewUrl} className="w-full">
                  <Upload className="mr-2 h-4 w-4" /> Convert to Base64 & Save
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>My Portfolio ({portfolio.length} images)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {portfolio.map((item) => (
                  <div key={item.id} className="relative group aspect-square rounded-lg overflow-hidden border">
                    <img src={item.imageUrl} alt="Portfolio" className="w-full h-full object-cover" />
                    <button
                      onClick={() => handleRemovePortfolioImage(item.id)}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
              {portfolio.length === 0 && (
                <p className="text-center text-muted-foreground py-8">No images in portfolio yet.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reviews" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Customer Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockReviews.map((review) => (
                  <div key={review.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold">{review.customer}</h3>
                        <p className="text-xs text-muted-foreground">{review.date}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'}`} />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{review.comment}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}