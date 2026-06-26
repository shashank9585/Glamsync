"use client"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, ArrowLeft, Calendar, Scissors, Award, Clock } from "lucide-react"

interface Stylist {
  id: string
  name: string
  specialty: string
  experience: number
  rating: number
  image: string
  bio: string
  portfolio?: string[]
}

export default function StylistDetailPage() {
  const params = useParams()
  const [stylist, setStylist] = useState<Stylist | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (params.id) {
      fetch(`/api/stylists/${params.id}`)
        .then((res) => res.json())
        .then((data) => {
          setStylist(data)
          setLoading(false)
        })
        .catch((error) => {
          console.error("Failed to fetch stylist:", error)
          setLoading(false)
        })
    }
  }, [params.id])

  if (loading) return <div className="container mx-auto py-10 px-4 text-center">Loading stylist details...</div>
  if (!stylist) return <div className="container mx-auto py-10 px-4 text-center">Stylist not found.</div>

  return (
    <div className="container mx-auto py-10 px-4 max-w-6xl">
      <Link href="/stylists" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" /> Back to Stylists
      </Link>

      {/* Profile Header */}
      <Card className="mb-8 shadow-lg">
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
            <img 
              src={stylist.image} 
              alt={stylist.name} 
              className="w-40 h-40 rounded-full object-cover border-4 border-primary/20 shadow-xl" 
            />
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl font-bold mb-4">{stylist.name}</h1>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-4">
                <Badge variant="outline" className="text-base px-4 py-1 flex items-center gap-2">
                  <Scissors className="h-4 w-4" /> {stylist.specialty}
                </Badge>
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold text-lg">{stylist.rating}</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Award className="h-5 w-5" />
                  <span className="text-lg">{stylist.experience} years experience</span>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed text-lg">{stylist.bio}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="md:col-span-2 space-y-6">
          {/* Portfolio Gallery */}
          {stylist.portfolio && stylist.portfolio.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Portfolio Gallery</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {stylist.portfolio.map((img, i) => (
                    <div key={i} className="relative aspect-square rounded-lg overflow-hidden group shadow-md">
                      <img 
                        src={img} 
                        alt={`Portfolio ${i + 1}`} 
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" 
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="md:col-span-1">
          <Card className="sticky top-24 shadow-lg">
            <CardContent className="p-6 space-y-4">
              <h3 className="font-bold text-2xl">Book with {stylist.name}</h3>
              <p className="text-muted-foreground">
                Ready for a new look? Schedule your appointment directly with {stylist.name}.
              </p>
              <Link href={`/booking?stylistId=${stylist.id}`} className="block w-full">
                <Button className="w-full" size="lg">
                  <Calendar className="mr-2 h-5 w-5" /> Book Appointment
                </Button>
              </Link>
              
              <div className="pt-4 border-t space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>Available: Mon-Sat, 10 AM - 8 PM</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>Top rated specialist</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}