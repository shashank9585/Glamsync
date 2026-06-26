"use client"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, ArrowLeft, Scissors, Calendar, Phone, Clock } from "lucide-react"
import dynamic from "next/dynamic"

// Dynamically import map to avoid SSR issues
const MapView = dynamic(() => import("@/components/map-view"), { ssr: false })

interface Salon {
  id: string
  name: string
  city: string
  rating: number
  priceRange: string
  image: string
  services?: string[]
  servicesWithPrices?: { name: string; price: number }[]
  description?: string
  stylists?: string[]
  lat?: number
  lng?: number
}

export default function SalonDetailPage() {
  const params = useParams()
  const [salon, setSalon] = useState<Salon | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (params.id) {
      fetch(`/api/salons/${params.id}`)
        .then((res) => res.json())
        .then((data) => {
          setSalon(data)
          setLoading(false)
        })
        .catch((error) => {
          console.error("Failed to fetch salon:", error)
          setLoading(false)
        })
    }
  }, [params.id])

  if (loading) return <div className="container mx-auto py-10 px-4 text-center">Loading salon details...</div>
  if (!salon) return <div className="container mx-auto py-10 px-4 text-center">Salon not found.</div>

  return (
    <div className="container mx-auto py-10 px-4 max-w-6xl">
      <Link href="/salons" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" /> Back to Salons
      </Link>

      {/* Hero Section with Image */}
      <div className="relative h-64 md:h-96 rounded-xl overflow-hidden mb-8 shadow-2xl">
        <img src={salon.image} alt={salon.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end p-6">
          <div className="text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-3">{salon.name}</h1>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-1">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="font-semibold text-lg">{salon.rating}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-5 w-5" />
                <span>{salon.city}</span>
              </div>
              <Badge variant="secondary" className="bg-white/20 text-white border-0 text-lg px-3 py-1">
                {salon.priceRange}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="md:col-span-2 space-y-6">
          {/* About Section */}
          {salon.description && (
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">About the Salon</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed text-lg">{salon.description}</p>
              </CardContent>
            </Card>
          )}

          {/* Services with Prices */}
          {salon.servicesWithPrices && salon.servicesWithPrices.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Services & Pricing</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {salon.servicesWithPrices.map((service, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg border hover:bg-muted/50 transition">
                      <span className="font-medium text-lg">{service.name}</span>
                      <Badge variant="secondary" className="text-lg font-bold px-4 py-1">
                        ₹{service.price}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Fallback: Services without prices */}
          {!salon.servicesWithPrices && salon.services && salon.services.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Services Offered</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {salon.services.map((service, i) => (
                    <Badge key={i} variant="outline" className="px-4 py-2 text-base">
                      {service}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Top Stylists */}
          {salon.stylists && salon.stylists.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Top Stylists</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {salon.stylists.map((stylist, i) => (
                    <div key={i} className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg hover:bg-muted/70 transition">
                      <Scissors className="h-6 w-6 text-primary" />
                      <span className="font-medium text-lg">{stylist}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Map Section */}
          {salon.lat && salon.lng && (
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <MapPin className="h-6 w-6 text-primary" />
                  Location
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg overflow-hidden border">
                  <MapView 
                    locations={[{ 
                      id: salon.id, 
                      name: salon.name, 
                      city: salon.city, 
                      lat: salon.lat, 
                      lng: salon.lng, 
                      rating: salon.rating 
                    }]} 
                    center={[salon.lat, salon.lng]} 
                  />
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="md:col-span-1">
          <Card className="sticky top-24 shadow-lg">
            <CardContent className="p-6 space-y-4">
              <h3 className="font-bold text-2xl">Ready to look your best?</h3>
              <p className="text-muted-foreground">
                Book your appointment today and let our experts take care of the rest.
              </p>
              <Link href={`/booking?salonId=${salon.id}`} className="block w-full">
                <Button className="w-full" size="lg">
                  <Calendar className="mr-2 h-5 w-5" /> Book Appointment
                </Button>
              </Link>
              
              <div className="pt-4 border-t space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>Open: 9:00 AM - 9:00 PM</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span>+91 9876543210</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}