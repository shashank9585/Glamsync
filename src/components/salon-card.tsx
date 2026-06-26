import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, MapPin } from "lucide-react"

interface Salon {
  id: string
  name: string
  city: string
  rating: number
  priceRange: string
  image: string
  services: string[]
}

interface SalonCardProps {
  salon: Salon
}

export default function SalonCard({ salon }: SalonCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1 flex flex-col">
      <div className="relative h-48 overflow-hidden bg-muted">
        <img
          src={salon.image}
          alt={salon.name}
          className="w-full h-full object-cover"
        />
      </div>
      <CardContent className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-bold text-lg">{salon.name}</h3>
          <Badge variant="secondary">{salon.priceRange}</Badge>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
          <MapPin className="h-4 w-4" />
          <span>{salon.city}</span>
        </div>
        <div className="flex flex-wrap gap-1 mb-4">
          {salon.services.map((service, i) => (
            <span key={i} className="text-xs bg-muted px-2 py-1 rounded-md">
              {service}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between mt-auto pt-4 border-t">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold">{salon.rating}</span>
          </div>
          <Link href={`/salons/${salon.id}`}>
            <Button size="sm">View Details</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}