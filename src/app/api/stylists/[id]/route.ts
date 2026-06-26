import { NextResponse } from "next/server"

const stylists = [
  {
    id: "1",
    name: "Priya Sharma",
    specialty: "Hair Coloring",
    experience: 8,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&q=80",
    bio: "Expert in balayage, highlights, and modern coloring techniques. I love transforming hair and boosting confidence.",
    portfolio: [
      "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=400&q=80",
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&q=80",
      "https://images.unsplash.com/photo-1595476108010-b4d1f10d64b1?w=400&q=80"
    ]
  },
  {
    id: "2",
    name: "Rahul Verma",
    specialty: "Men's Haircuts",
    experience: 5,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&q=80",
    bio: "Specializing in modern fades, classic cuts, and beard styling. Precision and attention to detail are my top priorities.",
    portfolio: [
      "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400&q=80",
      "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=400&q=80",
      "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=400&q=80"
    ]
  },
  {
    id: "3",
    name: "Ananya Patel",
    specialty: "Bridal Makeup",
    experience: 10,
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&q=80",
    bio: "Award-winning bridal makeup artist. I create timeless, elegant looks that make you feel like the best version of yourself on your big day.",
    portfolio: [
      "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400&q=80",
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&q=80",
      "https://images.unsplash.com/photo-1526045478516-99145907023c?w=400&q=80"
    ]
  },
  {
    id: "4",
    name: "Karan Singh",
    specialty: "Beard Styling",
    experience: 6,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
    bio: "Master barber specializing in beard design, shaping, and grooming. I help men achieve the perfect facial hair look.",
    portfolio: [
      "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=400&q=80",
      "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400&q=80",
      "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=400&q=80"
    ]
  }
]

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const stylist = stylists.find((s) => s.id === params.id)
  
  if (!stylist) {
    return NextResponse.json({ error: "Stylist not found" }, { status: 404 })
  }
  
  return NextResponse.json(stylist)
}