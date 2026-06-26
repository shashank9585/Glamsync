import { NextResponse } from "next/server"

const salons = [
  { 
    id: "1", name: "Luxe Hair Studio", city: "Mumbai", rating: 4.8, priceRange: "$$$", 
    services: ["Haircut", "Coloring", "Styling", "Keratin Treatment"],
    servicesWithPrices: [
      { name: "Haircut & Styling", price: 800 }, { name: "Global Hair Color", price: 3500 },
      { name: "Keratin Treatment", price: 6000 }, { name: "Hair Spa", price: 1500 }
    ],
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1200&q=80",
    lat: 19.076, lng: 72.877,
    description: "A premium hair studio specializing in modern cuts and vibrant colors.",
    stylists: ["Priya Sharma", "Rahul Verma"]
  },
  { 
    id: "2", name: "Glow Spa & Salon", city: "Delhi", rating: 4.5, priceRange: "$$", 
    services: ["Facial", "Spa", "Manicure", "Pedicure", "Body Massage"],
    servicesWithPrices: [
      { name: "Classic Facial", price: 1200 }, { name: "Gold Facial", price: 2500 },
      { name: "Full Body Massage", price: 3000 }, { name: "Manicure & Pedicure", price: 1000 }
    ],
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200&q=80",
    lat: 28.613, lng: 77.209,
    description: "Relax and rejuvenate at Glow Spa. We offer a wide range of therapeutic massages.",
    stylists: ["Ananya Patel"]
  },
  { 
    id: "3", name: "Beauty Bliss", city: "Bangalore", rating: 4.9, priceRange: "$$$$", 
    services: ["Bridal Makeup", "Party Makeup", "Hair Styling", "Draping"],
    servicesWithPrices: [
      { name: "Bridal Makeup (HD)", price: 15000 }, { name: "Party Makeup", price: 4500 },
      { name: "Hair Updo/Styling", price: 2000 }, { name: "Saree Draping", price: 1000 }
    ],
    image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=1200&q=80",
    lat: 12.971, lng: 77.594,
    description: "The ultimate destination for bridal and party makeup.",
    stylists: ["Ananya Patel", "Karan Singh"]
  },
  { 
    id: "4", name: "Urban Cuts", city: "Mumbai", rating: 4.6, priceRange: "$$", 
    services: ["Haircut", "Beard Trim", "Shaving", "Hair Coloring"],
    servicesWithPrices: [
      { name: "Classic Haircut", price: 400 }, { name: "Beard Trim & Shape", price: 200 },
      { name: "Hot Towel Shave", price: 300 }, { name: "Men's Hair Color", price: 800 }
    ],
    image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=1200&q=80",
    lat: 19.076, lng: 72.877,
    description: "Classic barbershop vibes with modern styling.",
    stylists: ["Rahul Verma", "Karan Singh"]
  }
]

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const salon = salons.find((s) => s.id === id)
  if (!salon) return NextResponse.json({ error: "Salon not found" }, { status: 404 })
  return NextResponse.json(salon)
}