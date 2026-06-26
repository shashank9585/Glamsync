"use client"
import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, SlidersHorizontal } from "lucide-react"
import SalonCard from "@/components/salon-card"

// FIX: Dynamically import MapView so it only loads in the browser (fixes "window is not defined")
const MapView = dynamic(() => import("@/components/map-view"), {
  ssr: false,
  loading: () => <div className="h-[500px] flex items-center justify-center bg-muted/30 rounded-xl">Loading map...</div>
})

interface Salon {
  id: string
  name: string
  city: string
  rating: number
  priceRange: string
  image: string
  services: string[]
  lat: number
  lng: number
}

export default function SalonsPage() {
  const [salons, setSalons] = useState<Salon[]>([])
  const [search, setSearch] = useState("")
  const [sortBy, setSortBy] = useState("rating")
  const [loading, setLoading] = useState(true)
  const [showMap, setShowMap] = useState(false)

  useEffect(() => {
    fetchSalons()
  }, [])

  const fetchSalons = async () => {
    try {
      const res = await fetch("/api/salons")
      const data = await res.json()
      setSalons(data)
    } catch (error) {
      console.error("Failed to fetch salons:", error)
    }
    setLoading(false)
  }

  const processedSalons = salons
    .filter(salon =>
      salon.name.toLowerCase().includes(search.toLowerCase()) ||
      salon.city.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating
      if (sortBy === "price-low") return a.priceRange.length - b.priceRange.length
      if (sortBy === "price-high") return b.priceRange.length - a.priceRange.length
      return 0
    })

  return (
    <div className="container mx-auto py-10 px-4 max-w-6xl">
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold mb-2">Discover Salons</h1>
          <p className="text-muted-foreground">Find the perfect salon for your beauty needs</p>
        </div>
        <Button variant="outline" onClick={() => setShowMap(!showMap)}>
          {showMap ? "Show List View" : "Show Map View"}
        </Button>
      </div>

      {showMap && (
        <div className="mb-8 border rounded-xl overflow-hidden shadow-sm">
          <MapView locations={processedSalons} center={[20.5937, 78.9629]} />
        </div>
      )}

      {!showMap && (
        <>
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by salon name or city..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 focus-visible:ring-2 focus-visible:ring-primary"
              />
            </div>
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading salons...</p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {processedSalons.map((salon) => (
                <SalonCard key={salon.id} salon={salon} />
              ))}
            </div>
          )}

          {!loading && processedSalons.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No salons found matching your search.</p>
            </div>
          )}
        </>
      )}
    </div>
  )
}