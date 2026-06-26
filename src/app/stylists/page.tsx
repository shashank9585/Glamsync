"use client"
import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import StylistCard from "@/components/stylist-card"

interface Stylist {
  id: string
  name: string
  specialty: string
  experience: number
  rating: number
  image: string
  bio: string
}

export default function StylistsPage() {
  const [stylists, setStylists] = useState<Stylist[]>([])
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStylists()
  }, [])

  const fetchStylists = async () => {
    try {
      const res = await fetch("/api/stylists")
      const data = await res.json()
      setStylists(data)
    } catch (error) {
      console.error("Failed to fetch stylists:", error)
    }
    setLoading(false)
  }

  const filteredStylists = stylists.filter(stylist =>
    stylist.name.toLowerCase().includes(search.toLowerCase()) ||
    stylist.specialty.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="container mx-auto py-10 px-4 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Find a Stylist</h1>
        <p className="text-muted-foreground">Discover talented stylists and book directly with them</p>
      </div>

      <div className="mb-6 relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by name or specialty..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 focus-visible:ring-2 focus-visible:ring-primary"
        />
      </div>

      {loading ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading stylists...</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredStylists.map((stylist) => (
            <StylistCard key={stylist.id} stylist={stylist} />
          ))}
        </div>
      )}

      {!loading && filteredStylists.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No stylists found matching your search.</p>
        </div>
      )}
    </div>
  )
}