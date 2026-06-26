import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, Scissors } from "lucide-react"

interface Stylist {
  id: string
  name: string
  specialty: string
  experience: number
  rating: number
  image: string
  bio: string
}

interface StylistCardProps {
  stylist: Stylist
}

export default function StylistCard({ stylist }: StylistCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all hover:-translate-y-1 flex flex-col">
      <CardContent className="p-0 flex flex-col flex-1">
        <div className="relative h-64 overflow-hidden bg-muted">
          <img
            src={stylist.image}
            alt={stylist.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 right-3">
            <Badge className="bg-white text-black hover:bg-white">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 mr-1" />
              {stylist.rating}
            </Badge>
          </div>
        </div>
        <div className="p-5 flex flex-col flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Scissors className="h-4 w-4 text-primary" />
            <Badge variant="outline">{stylist.specialty}</Badge>
          </div>
          <h3 className="font-bold text-lg mb-1">{stylist.name}</h3>
          <p className="text-sm text-muted-foreground mb-3">
            {stylist.experience} years experience
          </p>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">
            {stylist.bio}
          </p>
          <Link href={`/stylists/${stylist.id}`} className="w-full block mt-auto">
            <Button className="w-full" size="sm">View Portfolio</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}