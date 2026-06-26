import { NextResponse } from "next/server"

export async function GET() {
  const salons = [
    { 
      id: "1", 
      name: "Luxe Hair Studio", 
      city: "Mumbai", 
      rating: 4.8, 
      priceRange: "$$$", 
      services: ["Haircut", "Coloring", "Styling"],
      image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&q=80",
      lat: 19.076, 
      lng: 72.877 
    },
    { 
      id: "2", 
      name: "Glow Spa & Salon", 
      city: "Delhi", 
      rating: 4.5, 
      priceRange: "$$", 
      services: ["Facial", "Spa", "Manicure"],
      image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80",
      lat: 28.613, 
      lng: 77.209 
    },
    { 
      id: "3", 
      name: "Beauty Bliss", 
      city: "Bangalore", 
      rating: 4.9, 
      priceRange: "$$$$", 
      services: ["Bridal", "Makeup", "Hair"],
      image: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800&q=80",
      lat: 12.971, 
      lng: 77.594 
    },
    { 
      id: "4", 
      name: "Urban Cuts", 
      city: "Mumbai", 
      rating: 4.6, 
      priceRange: "$$", 
      services: ["Haircut", "Beard", "Styling"],
      image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&q=80",
      lat: 19.076, 
      lng: 72.877 
    }
  ]
  
  return NextResponse.json(salons)
}